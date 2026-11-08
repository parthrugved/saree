import connectToDatabase from "@/lib/db";
import Order from "@/models/Order";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface AdminOrderItem {
  _id: string;
  razorpay_order_id?: string;
  shippingDetails?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  amount: number;
  status: string;
  createdAt: string;
}

async function getOrders(): Promise<AdminOrderItem[]> {
  await connectToDatabase();
  const orders = await Order.find({ status: "paid" }).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(orders)) as AdminOrderItem[];
}

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Orders</h1>
      
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Order ID</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Customer</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order: AdminOrderItem) => (
                  <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {order.razorpay_order_id || order._id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white font-medium">
                        {order.shippingDetails?.name || "N/A"}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {order.shippingDetails?.email || ""}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {order.shippingDetails?.phone || ""}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      ₹{order.amount?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        order.status === "paid" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                        order.status === "failed" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Link 
                        href={`/admin/orders/${order._id}`}
                        className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center gap-1"
                      >
                        View Details
                      </Link>
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
