"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="nav">
      <Link href="/">Products</Link>
      <Link href="/add">Add Product</Link>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
