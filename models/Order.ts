
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderItem {
  id?: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface IShippingDetails {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export type ReservationStatus =
  | "reserved"
  | "paid"
  | "expired"
  | "released"
  | "refund_required";

export interface IOrder extends Document {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;

  amount: number;
  amountPaise?: number;

  items: IOrderItem[];
  shippingDetails: IShippingDetails;

  status: "created" | "paid" | "failed" | "delivered";

  // Inventory reservation fields
  reservationStatus?: ReservationStatus;
  reservedAt?: Date;
  expiresAt?: Date;
  stockReleasedAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

const OrderSchema = new Schema(
  {
    razorpay_order_id: {
      type: String,
    },

    razorpay_payment_id: {
      type: String,
    },

    amount: {
      type: Number,
      required: true,
    },

    amountPaise: {
      type: Number,
      min: 0,
    },

    items: {
      type: [Schema.Types.Mixed],
      default: [],
    },

    shippingDetails: {
      type: Schema.Types.Mixed,
      default: {},
    },

    status: {
      type: String,
      enum: ["created", "paid", "failed", "delivered"],
      default: "created",
    },

    reservationStatus: {
      type: String,
      enum: [
        "reserved",
        "paid",
        "expired",
        "released",
        "refund_required",
      ],
    },

    reservedAt: {
      type: Date,
    },

    expiresAt: {
      type: Date,
    },

    stockReleasedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Supports efficient discovery of expired reservations.
OrderSchema.index({
  reservationStatus: 1,
  expiresAt: 1,
});

const Order: Model<IOrder> =
  mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
