
import { NextResponse } from "next/server";
import crypto from "crypto";
import mongoose from "mongoose";
import Razorpay from "razorpay";
import connectToDatabase from "@/lib/db";
import {
  reconcileCapturedPayment,
  type VerificationOutcome,
} from "@/lib/payment-reconciliation";

export async function POST(req: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Payment service is not configured" },
      { status: 503 }
    );
  }

  try {
    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid payment response" },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid payment response" },
        { status: 400 }
      );
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body as Record<string, unknown>;

    if (
      typeof razorpay_order_id !== "string" ||
      typeof razorpay_payment_id !== "string" ||
      typeof razorpay_signature !== "string" ||
      !/^order_[a-zA-Z0-9]+$/.test(razorpay_order_id) ||
      !/^pay_[a-zA-Z0-9]+$/.test(razorpay_payment_id) ||
      !/^[a-f\d]{64}$/i.test(razorpay_signature)
    ) {
      return NextResponse.json(
        { error: "Invalid payment response" },
        { status: 400 }
      );
    }

    // Verify the Razorpay Checkout signature.
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest();

    const receivedSignature = Buffer.from(
      razorpay_signature,
      "hex"
    );

    if (
      receivedSignature.length !== expectedSignature.length ||
      !crypto.timingSafeEqual(
        receivedSignature,
        expectedSignature
      )
    ) {
      return NextResponse.json(
        { error: "Payment signature verification failed" },
        { status: 400 }
      );
    }

    // Independently fetch payment details from Razorpay.
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const payment = await razorpay.payments.fetch(
      razorpay_payment_id
    );

    if (
      payment.order_id !== razorpay_order_id ||
      payment.status !== "captured"
    ) {
      return NextResponse.json(
        { error: "Payment is not captured for this order" },
        { status: 409 }
      );
    }
    if (
      typeof payment.amount !== "number" ||
      !Number.isSafeInteger(payment.amount)
    ) {
      return NextResponse.json(
        { error: "Invalid payment amount" },
        { status: 409 }
      );
    }
    const verifiedAmount = payment.amount;

    await connectToDatabase();

    const session = await mongoose.startSession();

    try {
      const result: { outcome: VerificationOutcome } = {
        outcome: "conflict",
      };

      await session.withTransaction(async () => {
        result.outcome = await reconcileCapturedPayment(
          {
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            amount: verifiedAmount,
            currency: payment.currency,
          },
          session
        );
      });

      switch (result.outcome) {
        case "paid":
          return NextResponse.json({
            message: "Payment verified successfully",
          });

        case "already_paid":
          return NextResponse.json({
            message: "Payment already verified",
          });

        case "refund_required":
          return NextResponse.json(
            {
              error:
                "Payment was captured after the inventory reservation expired. Refund review is required.",
              refundRequired: true,
            },
            { status: 409 }
          );

        case "not_found":
          return NextResponse.json(
            { error: "Order not found" },
            { status: 404 }
          );

        default:
          return NextResponse.json(
            {
              error:
                "Order could not be confirmed. Please contact support.",
            },
            { status: 409 }
          );
      }
    } finally {
      await session.endSession();
    }
  } catch (error: unknown) {
    console.error("Payment verification error:", error);

    return NextResponse.json(
      { error: "Unable to verify payment" },
      { status: 500 }
    );
  }
}
