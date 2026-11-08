
import mongoose, { ClientSession } from "mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";

export type VerificationOutcome =
  | "paid"
  | "already_paid"
  | "refund_required"
  | "not_found"
  | "conflict";

interface CapturedPayment {
  orderId: string;
  paymentId: string;
  amount: number;
  currency: string;
}

export async function reconcileCapturedPayment(
  payment: CapturedPayment,
  session: ClientSession
): Promise<VerificationOutcome> {
  const {
    orderId,
    paymentId,
    amount,
    currency,
  } = payment;

  const order = await Order.findOne({
    razorpay_order_id: orderId,
  }).session(session);

  if (!order) {
    return "not_found";
  }

  // Verify the exact expected amount and currency.
  if (
    !Number.isSafeInteger(order.amountPaise) ||
    amount !== order.amountPaise ||
    currency !== "INR"
  ) {
    throw new Error("Payment amount or currency mismatch.");
  }

  // Idempotency: accept the same payment again.
  if (
    order.reservationStatus === "paid" ||
    order.status === "paid"
  ) {
    return order.razorpay_payment_id === paymentId
      ? "already_paid"
      : "conflict";
  }

  if (order.reservationStatus === "refund_required") {
    return order.razorpay_payment_id === paymentId
      ? "refund_required"
      : "conflict";
  }

  const now = new Date();

  // Case 1: Reservation is active. Payment wins.
  if (
    order.reservationStatus === "reserved" &&
    order.expiresAt &&
    order.expiresAt > now &&
    !order.stockReleasedAt
  ) {
    const updated = await Order.findOneAndUpdate(
      {
        _id: order._id,
        status: "created",
        reservationStatus: "reserved",
        expiresAt: { $gt: now },
        stockReleasedAt: { $exists: false },
      },
      {
        $set: {
          status: "paid",
          reservationStatus: "paid",
          razorpay_payment_id: paymentId,
        },
      },
      {
        new: true,
        session,
      }
    );

    return updated ? "paid" : "conflict";
  }

  // Case 2: Deadline passed, but stock has not been released.
  if (
    order.reservationStatus === "reserved" &&
    order.expiresAt &&
    order.expiresAt <= now &&
    !order.stockReleasedAt
  ) {
    const expiredOrder = await Order.findOneAndUpdate(
      {
        _id: order._id,
        reservationStatus: "reserved",
        expiresAt: { $lte: now },
        stockReleasedAt: { $exists: false },
      },
      {
        $set: {
          reservationStatus: "refund_required",
          status: "failed",
          stockReleasedAt: now,
          razorpay_payment_id: paymentId,
        },
      },
      {
        new: true,
        session,
      }
    );

    if (!expiredOrder) {
      return "conflict";
    }

    // Restore inventory in the same transaction.
    for (const item of expiredOrder.items) {
      if (
        !item.id ||
        !/^[a-f\d]{24}$/i.test(item.id) ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        throw new Error("Invalid product data in expired order.");
      }

      const stockUpdate = await Product.updateOne(
        {
          _id: new mongoose.Types.ObjectId(item.id),
        },
        {
          $inc: { stock: item.quantity },
        },
        { session }
      );

      if (stockUpdate.modifiedCount !== 1) {
        throw new Error(
          `Could not restore stock for product ${item.id}.`
        );
      }
    }

    return "refund_required";
  }

  // Case 3: Expiry worker already restored stock.
  // Never restore it again.
  if (
    order.reservationStatus === "expired" ||
    order.reservationStatus === "released" ||
    (
      order.reservationStatus === "reserved" &&
      order.stockReleasedAt
    )
  ) {
    const updated = await Order.findOneAndUpdate(
      {
        _id: order._id,
        reservationStatus: order.reservationStatus,
        stockReleasedAt: { $exists: true },
      },
      {
        $set: {
          reservationStatus: "refund_required",
          status: "failed",
          razorpay_payment_id: paymentId,
        },
      },
      {
        new: true,
        session,
      }
    );

    return updated ? "refund_required" : "conflict";
  }

  // Legacy orders without reservation metadata are not
  // automatically fulfilled by this payment flow.
  return "conflict";
}
