"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export function MarkDeliveredButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeliver = async () => {
    if (!confirm("Are you sure this order has been delivered?")) return;

    try {
      setLoading(true);
      const res = await fetch("/api/orders/deliver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      if (res.ok) {
        router.push("/admin/orders");
      } else {
        alert("Failed to mark as delivered");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDeliver}
      disabled={loading}
      className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-medium transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
    >
      <CheckCircle className="h-5 w-5" />
      {loading ? "Updating..." : "Order Delivered"}
    </button>
  );
}
