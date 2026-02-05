"use client";

import { useState } from "react";
import API from "@/services/api";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    supplier: "", // ← Add supplier field
  });

  const submit = async () => {
    try {
      const payload = {
        name: form.name,
        category: form.category,
        quantity: Number(form.quantity),
        price: parseFloat(form.price),
        supplier: form.supplier, // ← Include supplier
      };

      console.log("Sending payload:", payload);
      const response = await API.post("products/", payload);
      console.log("Success:", response.data);
      
      router.push("/");
    } catch (error: any) {
      console.error("Full error object:", error);
      
      if (error.response) {
        alert(`Server error: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        alert("Cannot connect to server. Is Django running on port 8000?");
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h1>Add Product</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          placeholder="Product Name"
          value={form.name}
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Category"
          value={form.category}
          required
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          required
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />

        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={form.price}
          required
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          placeholder="Supplier"
          value={form.supplier}
          required
          onChange={(e) => setForm({ ...form, supplier: e.target.value })}
        />

        <button type="submit" className="btn-add">
          Save Product
        </button>
      </form>
    </div>
  );
}