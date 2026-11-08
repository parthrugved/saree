import connectToDatabase from "@/lib/db";
import Order, { IOrderItem, IShippingDetails } from "@/models/Order";
import Link from "next/link";
import { ArrowLeft, Package, MapPin, CreditCard, User } from "lucide-react";
import Image from "next/image";
import { MarkDeliveredButton } from "@/components/MarkDeliveredButton";

export const dynamic = "force-dynamic";

interface AdminOrderDetail {
  _id: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  amount: number;
  status: string;
  createdAt: string;
  shippingDetails?: IShippingDetails;
  items?: IOrderItem[];
}

async function getOrder(id: string): Promise<AdminOrderDetail | null> {
  await connectToDatabase();
  try {
    const order = await Order.findById(id).lean();
    if (!order) return null;
    return JSON.parse(JSON.stringify(order)) as AdminOrderDetail;
  } catch {
    return null;
  }
}

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return (
      <div>
        <Link href="/admin/orders" className="text-amber-600 hover:underline mb-4 inline-block">&larr; Back to Orders</Link>
        <h1 className="text-2xl font-bold">Order not found</h1>
      </div>
    );
  }

  const { shippingDetails, items } = order;

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <Link href="/admin/orders" className="flex items-center text-gray-500 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Orders
      </Link>
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Order Details</h1>
        <span className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 capitalize">
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Customer Details */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><User className="h-5 w-5 text-amber-600" /> Customer Information</h2>
            <div className="space-y-3 text-sm">
              <p><span className="text-gray-500">Name:</span> <span className="font-medium">{shippingDetails?.name || "N/A"}</span></p>
              <p><span className="text-gray-500">Email:</span> <span className="font-medium">{shippingDetails?.email || "N/A"}</span></p>
              <p><span className="text-gray-500">Phone:</span> <span className="font-medium">{shippingDetails?.phone || "N/A"}</span></p>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><MapPin className="h-5 w-5 text-amber-600" /> Shipping Address</h2>
            <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <p>{shippingDetails?.address || "No address provided"}</p>
              {shippingDetails?.city && (
                <p>{shippingDetails.city}, {shippingDetails.state} - {shippingDetails.pincode}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Payment Details */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><CreditCard className="h-5 w-5 text-amber-600" /> Payment Details</h2>
            <div className="space-y-3 text-sm">
              <p><span className="text-gray-500">Total Amount:</span> <span className="font-bold text-lg text-gray-900 dark:text-white">₹{order.amount.toLocaleString()}</span></p>
              <p><span className="text-gray-500">Razorpay Order ID:</span> <span className="font-mono text-xs">{order.razorpay_order_id}</span></p>
              <p><span className="text-gray-500">Razorpay Payment ID:</span> <span className="font-mono text-xs">{order.razorpay_payment_id || "N/A"}</span></p>
              <p><span className="text-gray-500">Date:</span> <span>{new Date(order.createdAt).toLocaleString()}</span></p>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Package className="h-5 w-5 text-amber-600" /> Order Items ({items?.length || 0})</h2>
            <div className="space-y-4">
              {items && items.map((item: IOrderItem, idx: number) => (
                <div key={idx} className="flex gap-4 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
                  <div className="h-16 w-16 relative rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                    {item.image && (
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm line-clamp-2">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                    <p className="font-semibold text-sm mt-1">₹{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <MarkDeliveredButton orderId={order._id} />
    </div>
  );
}
