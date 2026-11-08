
import { NextResponse } from "next/server";
import crypto from "crypto";
import mongoose from "mongoose";
import Razorpay from "razorpay";

import connectToDatabase from "@/lib/db";
// import Order from "@/models/Order";
import WebhookEvent from "@/models/WebhookEvent";
import { reconcileCapturedPayment } from "@/lib/payment-reconciliation";

export const dynamic = "force-dynamic";

function verifyWebhookSignature(
  rawBody: string,
  signature: string,
  secret: string
): boolean {
  if (!/^[a-f\d]{64}$/i.test(signature)) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest();

  const received = Buffer.from(signature, "hex");

  return (
    received.length === expected.length &&
    crypto.timingSafeEqual(received, expected)
  );
}

function isDuplicateKeyError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  );
}

export async function POST(req: Request) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!webhookSecret || !keyId || !keySecret) {
    return NextResponse.json(
      { error: "Webhook service is not configured" },
      { status: 503 }
    );
  }

  const rawBody = await req.text();

  const signature = req.headers.get("x-razorpay-signature");
  const eventId = req.headers.get("x-razorpay-event-id");

  if (!signature || !eventId) {
    return NextResponse.json(
      { error: "Missing webhook headers" },
      { status: 400 }
    );
  }

  if (!verifyWebhookSignature(rawBody, signature, webhookSecret)) {
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  if (eventId.length > 255) {
    return NextResponse.json(
      { error: "Invalid webhook event ID" },
      { status: 400 }
    );
  }

  let payload: Record<string, unknown>;

  try {
    const parsed: unknown = JSON.parse(rawBody);

    if (
      !parsed ||
      typeof parsed !== "object" ||
      Array.isArray(parsed)
    ) {
      throw new Error("Invalid payload");
    }

    payload = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Invalid webhook payload" },
      { status: 400 }
    );
  }

  const eventType = payload.event;

  if (typeof eventType !== "string") {
    return NextResponse.json(
      { error: "Invalid webhook event type" },
      { status: 400 }
    );
  }

  const supportedEvents = ["payment.captured", "order.paid"];

  const paymentPayload = payload.payload;

  let paymentId: string | undefined;
  let razorpayOrderId: string | undefined;

  if (
    paymentPayload &&
    typeof paymentPayload === "object" &&
    !Array.isArray(paymentPayload)
  ) {
    const paymentEntity = (
      paymentPayload as Record<string, unknown>
    ).payment;

    if (
      paymentEntity &&
      typeof paymentEntity === "object" &&
      !Array.isArray(paymentEntity)
    ) {
      const entity = (
        paymentEntity as Record<string, unknown>
      ).entity;

      if (
        entity &&
        typeof entity === "object" &&
        !Array.isArray(entity)
      ) {
        const paymentData = entity as Record<string, unknown>;

        if (typeof paymentData.id === "string") {
          paymentId = paymentData.id;
        }

        if (typeof paymentData.order_id === "string") {
          razorpayOrderId = paymentData.order_id;
        }
      }
    }
  }

  // Only captured-payment events can fulfil an order.
  // Other events are recorded as ignored.
  if (!supportedEvents.includes(eventType)) {
    try {
      await connectToDatabase();

      await WebhookEvent.create({
        eventId,
        eventType,
        status: "ignored",
        receivedAt: new Date(),
      });

      return NextResponse.json({ received: true });
    } catch (error: unknown) {
      if (isDuplicateKeyError(error)) {
        return NextResponse.json({ received: true, duplicate: true });
      }

      console.error("Webhook event recording error:", error);

      return NextResponse.json(
        { error: "Unable to record webhook event" },
        { status: 500 }
      );
    }
  }

  if (
    !paymentId ||
    !/^pay_[a-zA-Z0-9]+$/.test(paymentId) ||
    !razorpayOrderId ||
    !/^order_[a-zA-Z0-9]+$/.test(razorpayOrderId)
  ) {
    return NextResponse.json(
      { error: "Invalid captured payment data" },
      { status: 400 }
    );
  }

  try {
    // Independently fetch the payment from Razorpay.
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const payment = await razorpay.payments.fetch(paymentId);

    if (
      payment.order_id !== razorpayOrderId ||
      payment.status !== "captured" ||
      typeof payment.amount !== "number" ||
      !Number.isSafeInteger(payment.amount) ||
      payment.currency !== "INR"
    ) {
      return NextResponse.json(
        { error: "Payment is not a valid captured payment" },
        { status: 409 }
      );
    }

    await connectToDatabase();

    const session = await mongoose.startSession();

    try {
      await session.withTransaction(async () => {
        // Unique eventId prevents the same webhook event
        // from being processed more than once.
        await WebhookEvent.create(
          [
            {
              eventId,
              eventType,
              paymentId,
              razorpayOrderId,
              status: "received",
              receivedAt: new Date(),
            },
          ],
          { session }
        );

        const outcome = await reconcileCapturedPayment(
          {
            orderId: razorpayOrderId,
            paymentId,
            amount: payment.amount as number,
            currency: payment.currency,
          },
          session
        );

        if (
          outcome === "not_found" ||
          outcome === "conflict"
        ) {
          throw new Error(
            `Webhook payment reconciliation failed: ${outcome}`
          );
        }

        await WebhookEvent.updateOne(
          { eventId },
          {
            $set: {
              status: "processed",
              processedAt: new Date(),
            },
          },
          { session }
        );
      });

      return NextResponse.json({ received: true });
    } finally {
      await session.endSession();
    }
  } catch (error: unknown) {
    if (isDuplicateKeyError(error)) {
      return NextResponse.json({
        received: true,
        duplicate: true,
      });
    }

    console.error("Razorpay webhook processing error:", error);

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
