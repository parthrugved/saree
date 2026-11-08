import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview {
  userId?: string;
  userName?: string;
  rating?: number;
  comment?: string;
  createdAt?: Date | string;
}

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  fabric: string;
  type: string;
  reviews: IReview[];
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], default: [] },
    stock: { type: Number, required: true, default: 0 },
    fabric: { type: String, required: true },
    type: { type: String, required: true },
    reviews: { type: [Schema.Types.Mixed], default: [] },
  },
  { timestamps: true }
);

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
