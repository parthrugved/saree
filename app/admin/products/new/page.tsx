"use client";

import { useState, useRef } from "react";
import { createProduct } from "@/app/actions/product";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Link2, Upload, X, ImageIcon } from "lucide-react";

import { compressImage } from "@/lib/image";

type ImageMode = "url" | "upload";

export default function AddProductPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [imageMode, setImageMode] = useState<ImageMode>("url");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedDataUrl, setUploadedDataUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = async (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");
      setStatus("error");
      return;
    }
    setStatus("idle");
    setUploadedFileName(file.name);
    try {
      const compressedDataUrl = await compressImage(file);
      setUploadedDataUrl(compressedDataUrl);
    } catch {
      setErrorMessage("Failed to process image file.");
      setStatus("error");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    handleFileChange(file);
  };

  const clearUpload = () => {
    setUploadedDataUrl(null);
    setUploadedFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const previewSrc = imageMode === "url" ? imageUrl : uploadedDataUrl ?? "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Inject the resolved image value into formData
    const finalImageUrl = imageMode === "url" ? imageUrl : (uploadedDataUrl ?? "");
    formData.set("imageUrl", finalImageUrl);

    const result = await createProduct(formData);

    if (result.error) {
      setStatus("error");
      setErrorMessage(result.error);
    } else {
      router.push("/admin/products");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/products" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Product</h1>
      </div>

      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === "error" && (
            <div className="bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-300 p-4 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input
                type="text"
                name="title"
                required
                className="w-full px-4 py-2 border rounded-lg bg-transparent dark:border-gray-700 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea
                name="description"
                required
                rows={4}
                className="w-full px-4 py-2 border rounded-lg bg-transparent dark:border-gray-700 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  className="w-full px-4 py-2 border rounded-lg bg-transparent dark:border-gray-700 focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock</label>
                <input
                  type="number"
                  name="stock"
                  required
                  min="0"
                  className="w-full px-4 py-2 border rounded-lg bg-transparent dark:border-gray-700 focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Fabric & Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fabric</label>
                <input
                  type="text"
                  name="fabric"
                  required
                  placeholder="e.g. Silk, Georgette"
                  className="w-full px-4 py-2 border rounded-lg bg-transparent dark:border-gray-700 focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                <input
                  type="text"
                  name="type"
                  required
                  placeholder="e.g. One-Minute, Pleated"
                  className="w-full px-4 py-2 border rounded-lg bg-transparent dark:border-gray-700 focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Image Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Image
              </label>

              {/* Mode Toggle */}
              <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-4 w-fit">
                <button
                  type="button"
                  onClick={() => setImageMode("url")}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                    imageMode === "url"
                      ? "bg-amber-600 text-white"
                      : "bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <Link2 className="h-4 w-4" />
                  Image URL
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode("upload")}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border-l border-gray-200 dark:border-gray-700 ${
                    imageMode === "upload"
                      ? "bg-amber-600 text-white"
                      : "bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <Upload className="h-4 w-4" />
                  Upload from Device
                </button>
              </div>

              {/* URL Input */}
              {imageMode === "url" && (
                <input
                  type="text"
                  name="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2 border rounded-lg bg-transparent dark:border-gray-700 focus:ring-2 focus:ring-amber-500"
                />
              )}

              {/* File Upload */}
              {imageMode === "upload" && (
                <div>
                  {!uploadedDataUrl ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      className={`relative flex flex-col items-center justify-center gap-3 w-full rounded-lg border-2 border-dashed cursor-pointer transition-colors py-10 ${
                        isDragging
                          ? "border-amber-500 bg-amber-50 dark:bg-amber-950/20"
                          : "border-gray-300 dark:border-gray-700 hover:border-amber-400 dark:hover:border-amber-500 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      }`}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/40">
                        <ImageIcon className="h-6 w-6 text-amber-600" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Click to browse or drag &amp; drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          Supports JPG, PNG, WEBP, GIF — from any device
                        </p>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                      />
                    </div>
                  ) : (
                    <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={uploadedDataUrl}
                        alt="Uploaded preview"
                        className="w-full h-48 object-cover"
                      />
                      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[80%]">
                          {uploadedFileName}
                        </span>
                        <button
                          type="button"
                          onClick={clearUpload}
                          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium"
                        >
                          <X className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Live Preview for URL mode */}
              {imageMode === "url" && previewSrc && (
                <div className="mt-3 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewSrc}
                    alt="Image preview"
                    className="w-full h-48 object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    onLoad={(e) => { (e.target as HTMLImageElement).style.display = ""; }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t dark:border-gray-800">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-70"
            >
              {status === "submitting" ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
