
import connectToDatabase from "@/lib/db";
import Feedback from "@/models/Feedback";
import { Star } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminFeedback() {
  await connectToDatabase();

  const feedbacks = await Feedback.find({})
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Customer Feedback
      </h1>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Date</th>
                <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Customer</th>
                <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Rating</th>
                <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Message</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {feedbacks.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No feedback received yet.
                  </td>
                </tr>
              ) : (
                feedbacks.map((feedback) => (
                  <tr
                    key={feedback._id.toString()}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {feedback.createdAt
                        ? new Date(feedback.createdAt).toLocaleDateString()
                        : "—"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {feedback.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {feedback.email}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < feedback.rating
                                ? "fill-current"
                                : "text-gray-300 dark:text-gray-700"
                            }`}
                          />
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 max-w-md">
                      {feedback.message}
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
