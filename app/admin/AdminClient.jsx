"use client";

import { useState } from "react";
import data from "@/src/data/admin-products.json";

export default function AdminClient() {
  const [products, setProducts] = useState(data);
  const [copied, setCopied] = useState(false);

  function updatePrice(category, index, value) {
    const updated = { ...products };
    updated[category][index].price = Number(value);
    setProducts(updated);
  }

  function copyJSON() {
    navigator.clipboard.writeText(
      JSON.stringify(products, null, 2)
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold" }}>
        Admin Panel
      </h1>

      <button
        onClick={copyJSON}
        style={{
          margin: "15px 0",
          padding: "8px 14px",
          background: "#000",
          color: "#fff",
          borderRadius: 6,
        }}
      >
        📋 Copy JSON
      </button>

      {copied && <p style={{ color: "green" }}>Copied!</p>}

      {Object.entries(products).map(([category, items]) => (
        <div key={category} style={{ marginTop: 20 }}>
          <h2 style={{ fontWeight: "bold" }}>
            {category.replace("_", " ").toUpperCase()}
          </h2>

          {items.map((item, index) => (
            <div key={item.id} style={{ marginTop: 10 }}>
              <p>{item.name}</p>
              <input
                type="number"
                value={item.price}
                onChange={(e) =>
                  updatePrice(category, index, e.target.value)
                }
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
