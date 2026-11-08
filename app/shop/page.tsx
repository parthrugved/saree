import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import { ShopProductGrid } from "@/components/ShopProductGrid";

export const dynamic = "force-dynamic";

async function getProducts() {
  await connectToDatabase();
  const products = await Product.find({}).lean();
  return products;
}

interface RawProductItem {
  _id: unknown;
  title: string;
  price: number;
  images?: string[];
  fabric: string;
  type: string;
}

export default async function ShopPage() {
  const products = await getProducts();

  // If no products in DB yet, use dummy data
  const displayProducts: RawProductItem[] = products.length > 0 ? products : Array.from({ length: 8 }).map((_, i) => ({
    _id: i.toString(),
    title: `Premium Ready-to-Wear Saree ${i + 1}`,
    price: 8999 + i * 500,
    images: [`https://picsum.photos/seed/saree${i}/600/800`],
    fabric: i % 2 === 0 ? "Silk" : "Georgette",
    type: "One-Minute"
  }));

  // Serialize for the client component (strip Mongoose document metadata)
  const serialized = displayProducts.map((p: RawProductItem) => ({
    _id: String(p._id),
    title: p.title,
    price: p.price,
    images: p.images || [],
    fabric: p.fabric,
    type: p.type,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ShopProductGrid products={serialized} />
    </div>
  );
}
