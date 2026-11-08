"use client";

import { useCart, CartItem } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

export interface AddToCartProduct {
  _id?: string | { toString(): string };
  id?: string;
  title: string;
  price: number;
  images?: string[];
}

export function AddToCartButton({ product }: { product: AddToCartProduct }) {
  const { addToCart } = useCart();

  const productId = (product._id ? product._id.toString() : product.id) || "";

  const item: CartItem = {
    id: productId,
    title: product.title,
    price: product.price,
    image: product.images?.[0] || `https://picsum.photos/seed/saree${productId}/600/800`,
    quantity: 1,
  };

  return (
    <button 
      onClick={() => addToCart(item)}
      className="w-full bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all shadow-lg hover:shadow-amber-600/50 flex items-center justify-center gap-2"
    >
      <ShoppingBag className="h-5 w-5" /> Add to Cart
    </button>
  );
}
