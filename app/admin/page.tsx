import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import Product from "@/models/Product";
import Feedback from "@/models/Feedback";
import { Users, Package, MessageSquare } from "lucide-react";

export const dynamic = "force-dynamic";

async function getDashboardStats() {
  await connectToDatabase();
  const userCount = await User.countDocuments();
  const productCount = await Product.countDocuments();
  const feedbackCount = await Feedback.countDocuments();
  
  return { userCount, productCount, feedbackCount };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full text-blue-600">
            <Users className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Users</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.userCount}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4">
          <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-full text-amber-600">
            <Package className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Products</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.productCount}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4">
          <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full text-green-600">
            <MessageSquare className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Feedback</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.feedbackCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
