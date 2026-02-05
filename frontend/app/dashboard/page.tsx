"use client";

import { useEffect, useState } from "react";
import API from "@/services/api";

type CategoryCount = {
  category: string;
  count: number;
};

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [currency, setCurrency] = useState<any>(null);

  useEffect(() => {
    API.get("dashboard/").then((res) => setStats(res.data));
    API.get("currency/").then((res) => setCurrency(res.data));
  }, []);

  if (!stats || !currency) {
    return <h2>Loading dashboard...</h2>;
  }

  const categoryCounts: CategoryCount[] = stats.category_counts || [];

  return (
    <div>
      <h1>Dashboard</h1>

      {/* STAT CARDS */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div className="card">
          <h3>Total Products</h3>
          <p className="number">{stats.total_products}</p>
        </div>

        <div className="card warning">
          <h3>Low Stock</h3>
          <p className="number">{stats.low_stock}</p>
        </div>

        <div className="card success">
          <h3>USD → INR</h3>
          <p className="number">
            ₹ {currency?.rates?.INR ?? "N/A"}
          </p>
        </div>
      </div>

      {/* CATEGORY TABLE */}
      <h2>Category Wise Products</h2>

      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Count</th>
          </tr>
        </thead>

        <tbody>
          {categoryCounts.length === 0 ? (
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                No category data available
              </td>
            </tr>
          ) : (
            categoryCounts.map((item) => (
              <tr key={item.category}>
                <td>{item.category}</td>
                <td>{item.count}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
