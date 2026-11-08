"use client";

import { deleteProduct } from "@/app/actions/product";
import { Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function ProductActions({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      setIsDeleting(true);
      await deleteProduct(id);
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex justify-end gap-2">
      <Link href={`/admin/products/${id}/edit`} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
        <Edit className="h-4 w-4" />
      </Link>
      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded disabled:opacity-50"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
