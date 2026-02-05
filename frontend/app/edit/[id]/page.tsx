"use client";

import { useEffect, useState } from "react";
import API from "@/services/api";
import { useParams, useRouter } from "next/navigation";

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    API.get(`products/${id}/`).then((res) => setForm(res.data));
  }, [id]);

  const update = async () => {
    await API.put(`products/${id}/`, form);
    router.push("/");
  };

  return (
    <div>
      <h1>Edit Product</h1>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          value={form[key]}
          onChange={(e) =>
            setForm({ ...form, [key]: e.target.value })
          }
        />
      ))}

      <button onClick={update}>Update</button>
    </div>
  );
}
