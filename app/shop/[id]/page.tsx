import Image from "next/image";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ShieldCheck, Truck, RefreshCw } from "lucide-react";

export const dynamic = "force-dynamic";

interface ProductDetail {
  _id: string;
  id?: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  fabric: string;
  type: string;
  stock?: number;
}

async function getProduct(id: string): Promise<ProductDetail | null> {
  await connectToDatabase();
  try {
    const product = await Product.findById(id).lean();
    if (!product) return null;
    return JSON.parse(JSON.stringify(product)) as ProductDetail;
  } catch {
    return null;
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dbProduct = await getProduct(id);

  const product: ProductDetail = dbProduct || {
    _id: id,
    id: id,
    title: `Premium Ready-to-Wear Saree`,
    description: "Experience the epitome of elegance with this premium ready-to-wear saree. Crafted from luxurious fabric, it comes pre-stitched with perfect pleats, allowing you to drape it flawlessly in just 15 seconds. Ideal for weddings, festivals, and special occasions.",
    price: 8999,
    images: [`https://picsum.photos/seed/saree${id}/600/800`],
    fabric: "Silk",
    type: "One-Minute"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Images */}
        <div className="relative h-[600px] w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900">
          <Image
            src={product.images?.[0] || `https://images.unsplash.com/photo-1583391733958-6115f52ce520?q=80&w=600&auto=format&fit=crop&sig=${id}`}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-sm font-medium text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full">
              {product.type} Saree
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mt-4 mb-2">
            {product.title}
          </h1>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            ₹{product.price.toLocaleString()}
          </p>

          <div className="prose prose-sm dark:prose-invert mb-8 text-gray-600 dark:text-gray-400">
            <p>{product.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Fabric Details</h3>
            <p className="text-gray-600 dark:text-gray-400">{product.fabric}</p>
          </div>

          <div className="mt-auto pt-8 border-t border-gray-200 dark:border-gray-800">
            <AddToCartButton product={product} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck className="h-6 w-6 text-amber-600" />
              <span className="text-sm font-medium">Premium Quality</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="h-6 w-6 text-amber-600" />
              <span className="text-sm font-medium">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RefreshCw className="h-6 w-6 text-amber-600" />
              <span className="text-sm font-medium">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
