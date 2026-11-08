import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import Link from "next/link";
import { Plus } from "lucide-react";
import Image from "next/image";
import { ProductActions } from "@/components/ProductActions";
import { Types } from "mongoose";

export const dynamic = "force-dynamic";

interface AdminProductItem {
  _id: Types.ObjectId | string;
  title: string;
  type: string;
  price: number;
  stock: number;
  images?: string[];
}

export default async function AdminProducts() {
  await connectToDatabase();
  const products = (await Product.find({}).lean()) as AdminProductItem[];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
        <Link 
          href="/admin/products/new"
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="h-5 w-5" /> Add Product
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Product</th>
                <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Type</th>
                <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Price</th>
                <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Stock</th>
                <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No products found. Add one to get started.
                  </td>
                </tr>
              ) : (
                products.map((product: AdminProductItem) => (
                  <tr key={product._id.toString()} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 relative rounded bg-gray-100 dark:bg-gray-800 overflow-hidden">
                          {product.images?.[0] ? (
                            <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">No Img</div>
                          )}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white line-clamp-1">{product.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{product.type}</td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">₹{product.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{product.stock}</td>
                    <td className="px-6 py-4">
                      <ProductActions id={product._id.toString()} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
