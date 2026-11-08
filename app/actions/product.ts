
"use server";

import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import mongoose from "mongoose";

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "admin";
}

type ProductUpdateData = {
  title: string;
  description: string;
  price: number;
  stock: number;
  fabric: string;
  type: string;
  images?: string[];
};

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Something went wrong";
}

export async function createProduct(formData: FormData) {
  try {
    if (!(await isAdmin())) {
      return { error: "Unauthorized" };
    }

    const title = formData.get("title");
    const description = formData.get("description");
    const priceValue = formData.get("price");
    const stockValue = formData.get("stock");
    const fabric = formData.get("fabric");
    const type = formData.get("type");
    const imageUrl = formData.get("imageUrl");

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof description !== "string" ||
      !description.trim() ||
      typeof fabric !== "string" ||
      !fabric.trim() ||
      typeof type !== "string" ||
      !type.trim()
    ) {
      return { error: "Please provide all required product details" };
    }

    const price = Number(priceValue);
    const stock = Number(stockValue);

    if (
      !Number.isFinite(price) ||
      price <= 0 ||
      !Number.isInteger(price * 100)
    ) {
      return { error: "Invalid product price" };
    }

    if (!Number.isInteger(stock) || stock < 0) {
      return { error: "Invalid stock quantity" };
    }

    await connectToDatabase();

    let finalImageUrl =
      typeof imageUrl === "string" ? imageUrl.trim() : "";

    if (finalImageUrl && !finalImageUrl.startsWith("http")) {
      finalImageUrl = finalImageUrl.replace(/^\/public/, "");
      finalImageUrl = finalImageUrl.replace(/ /g, "%20");
    }

    const randomSeed = Date.now().toString();

    const finalImages = finalImageUrl
      ? [finalImageUrl]
      : [`https://picsum.photos/seed/${randomSeed}/600/800`];

    const newProduct = new Product({
      title: title.trim(),
      description: description.trim(),
      price,
      stock,
      fabric: fabric.trim(),
      type: type.trim(),
      images: finalImages,
    });

    await newProduct.save();

    revalidatePath("/admin/products");
    revalidatePath("/shop");

    return { success: true };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}

export async function updateProduct(
  id: string,
  formData: FormData
) {
  try {
    if (!(await isAdmin())) {
      return { error: "Unauthorized" };
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { error: "Invalid product ID" };
    }

    const title = formData.get("title");
    const description = formData.get("description");
    const priceValue = formData.get("price");
    const stockValue = formData.get("stock");
    const fabric = formData.get("fabric");
    const type = formData.get("type");
    const imageUrl = formData.get("imageUrl");

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof description !== "string" ||
      !description.trim() ||
      typeof fabric !== "string" ||
      !fabric.trim() ||
      typeof type !== "string" ||
      !type.trim()
    ) {
      return { error: "Please provide all required product details" };
    }

    const price = Number(priceValue);
    const stock = Number(stockValue);

    if (
      !Number.isFinite(price) ||
      price <= 0 ||
      !Number.isInteger(price * 100)
    ) {
      return { error: "Invalid product price" };
    }

    if (!Number.isInteger(stock) || stock < 0) {
      return { error: "Invalid stock quantity" };
    }

    await connectToDatabase();

    const updateData: ProductUpdateData = {
      title: title.trim(),
      description: description.trim(),
      price,
      stock,
      fabric: fabric.trim(),
      type: type.trim(),
    };

    if (typeof imageUrl === "string" && imageUrl.trim()) {
      updateData.images = [imageUrl.trim()];
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return { error: "Product not found" };
    }

    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${id}/edit`);
    revalidatePath("/shop");
    revalidatePath(`/shop/${id}`);

    return { success: true };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}

export async function deleteProduct(id: string) {
  try {
    if (!(await isAdmin())) {
      return { error: "Unauthorized" };
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { error: "Invalid product ID" };
    }

    await connectToDatabase();

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return { error: "Product not found" };
    }

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath(`/shop/${id}`);

    return { success: true };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}
