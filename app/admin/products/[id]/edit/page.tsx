import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import { notFound } from "next/navigation";
import EditProductForm from "./EditProductForm";
import { Types } from "mongoose";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectToDatabase();
  const product = await Product.findById(id).lean<{
    _id: Types.ObjectId | string;
    title: string;
    description: string;
    price: number;
    stock: number;
    fabric: string;
    type: string;
    images: string[];
  }>();

  if (!product) notFound();

  return (
    <EditProductForm
      id={id}
      initialData={{
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        fabric: product.fabric,
        type: product.type,
        imageUrl: product.images?.[0] ?? "",
      }}
    />
  );
}
