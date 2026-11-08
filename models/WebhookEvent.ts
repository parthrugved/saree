
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWebhookEvent extends Document {
  eventId: string;
  eventType: string;
  paymentId?: string;
  razorpayOrderId?: string;
  status: "received" | "processing" | "processed" | "ignored" | "failed";
  receivedAt: Date;
  processedAt?: Date;
  lastError?: string;
}

const WebhookEventSchema = new Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    eventType: {
      type: String,
      required: true,
    },

    paymentId: {
      type: String,
    },

    razorpayOrderId: {
      type: String,
    },

    status: {
      type: String,
      enum: ["received", "processing", "processed", "ignored", "failed"],
      default: "received",
      required: true,
    },

    receivedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },

    processedAt: {
      type: Date,
    },

    lastError: {
      type: String,
    },
    },
  {
    timestamps: true,
  }
);

const WebhookEvent: Model<IWebhookEvent> =
  mongoose.models.WebhookEvent ||
  mongoose.model<IWebhookEvent>("WebhookEvent", WebhookEventSchema);

export default WebhookEvent;