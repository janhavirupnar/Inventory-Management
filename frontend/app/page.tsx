"use client";

import { useEffect, useState } from "react";
import API from "@/services/api";
import Link from "next/link";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    API.get("products/").then((res) => setProducts(res.data));
  }, []);

  const deleteProduct = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    await API.delete(`products/${id}/`);
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h1>Products</h1>

      <Link href="/add">
        <button className="btn-add">+ Add Product</button>
      </Link>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.supplier}</td>
              <td>{p.quantity}</td>
              <td>{p.price}</td>
              <td>
                <Link href={`/edit/${p.id}`}>
                  <button className="btn-edit">Edit</button>
                </Link>
                <button
                  className="btn-delete"
                  onClick={() => deleteProduct(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}