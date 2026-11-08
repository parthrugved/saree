
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import Order from "@/models/Order";
import {
  reserveInventory,
  releaseInventory,
} from "@/lib/inventory";
import type { IShippingDetails } from "@/models/Order";

type CartInput = {
  id: string;
  quantity: number;
};

function validateShippingDetails(
  value: unknown
): IShippingDetails | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const shipping = value as Record<string, unknown>;

  const fields = [
    "name",
    "email",
    "phone",
    "address",
    "city",
    "state",
    "pincode",
  ] as const;

  for (const field of fields) {
    if (
      typeof shipping[field] !== "string" ||
      !shipping[field].trim() ||
      shipping[field].length > 500
    ) {
      return null;
    }
  }

  const email = (shipping.email as string).trim().toLowerCase();
  const phone = (shipping.phone as string).replace(/\D/g, "");
  const pincode = (shipping.pincode as string).trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return null;
  }

  if (!/^[6-9]\d{9}$/.test(phone)) {
    return null;
  }

  if (!/^\d{6}$/.test(pincode)) {
    return null;
  }

  return {
    name: (shipping.name as string).trim(),
    email,
    phone,
    address: (shipping.address as string).trim(),
    city: (shipping.city as string).trim(),
    state: (shipping.state as string).trim(),
    pincode,
  };
}

export async function POST(req: Request) {
  let reservationId: string | null = null;

  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Payment service is not configured" },
        { status: 503 }
      );
    }

    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    const requestBody = body as Record<string, unknown>;
    const cart = requestBody.cart;

    if (!Array.isArray(cart) || cart.length === 0 || cart.length > 20) {
      return NextResponse.json(
        { error: "Invalid cart" },
        { status: 400 }
      );
    }

    const items: CartInput[] = [];

    for (const item of cart) {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        return NextResponse.json(
          { error: "Invalid cart item" },
          { status: 400 }
        );
      }

      const cartItem = item as Record<string, unknown>;

      if (
        typeof cartItem.id !== "string" ||
        !/^[a-f\d]{24}$/i.test(cartItem.id) ||
        !Number.isInteger(cartItem.quantity) ||
        (cartItem.quantity as number) < 1 ||
        (cartItem.quantity as number) > 99
      ) {
        return NextResponse.json(
          { error: "Invalid product or quantity" },
          { status: 400 }
        );
      }

      items.push({
        id: cartItem.id,
        quantity: cartItem.quantity as number,
      });
    }

    const shippingDetails = validateShippingDetails(
      requestBody.shippingDetails
    );

    if (!shippingDetails) {
      return NextResponse.json(
        { error: "Invalid shipping details" },
        { status: 400 }
      );
    }

    // Reserve stock and create the database order atomically.
    const reservation = await reserveInventory({
      items,
      shippingDetails,
    });

    reservationId = reservation.orderId;

    // Create the Razorpay order outside the MongoDB transaction.
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: reservation.amountPaise,
      currency: "INR",
      receipt: `sk_${reservation.orderId}`,
    });

    // Link the Razorpay order to the reservation.
    // Refuse to link if the reservation has already expired.
    const linkedOrder = await Order.findOneAndUpdate(
      {
        _id: reservation.orderId,
        reservationStatus: "reserved",
        expiresAt: { $gt: new Date() },
        razorpay_order_id: { $exists: false },
      },
      {
        $set: {
          razorpay_order_id: razorpayOrder.id,
        },
      },
      { new: true }
    );

    if (!linkedOrder) {
      await releaseInventory(reservation.orderId, "released");
      reservationId = null;

      return NextResponse.json(
        { error: "Your reservation expired. Please try checkout again." },
        { status: 409 }
      );
    }

    return NextResponse.json({
      orderId: razorpayOrder.id,
      dbOrderId: reservation.orderId,
      amount: reservation.amountPaise,
      currency: "INR",
      expiresAt: reservation.expiresAt,
    });
  } catch (error: unknown) {
    console.error("Error creating Razorpay order:", error);

    // If checkout failed after reserving stock, release it.
    if (reservationId) {
      try {
        await releaseInventory(reservationId, "released");
      } catch (releaseError) {
        console.error(
          "CRITICAL: Could not release inventory reservation:",
          releaseError
        );
      }
    }

    const message = error instanceof Error ? error.message : "";

    if (
      message.startsWith("Insufficient stock") ||
      message.includes("no longer available")
    ) {
      return NextResponse.json(
        { error: "One or more products are no longer available." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Unable to create payment order" },
      { status: 500 }
    );
  }
}
