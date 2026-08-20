"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function readCartCount() {
  const stored = typeof window !== "undefined" ? window.localStorage.getItem("memel-cart") : null;
  if (!stored) return 0;
  try {
    const parsed = JSON.parse(stored);
    return parsed.length || 0;
  } catch {
    return 0;
  }
}

export default function CartButton() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(readCartCount());

    const onCartUpdated = () => setCount(readCartCount());
    window.addEventListener("cart-updated", onCartUpdated);
    window.addEventListener("storage", onCartUpdated);
    return () => {
      window.removeEventListener("cart-updated", onCartUpdated);
      window.removeEventListener("storage", onCartUpdated);
    };
  }, []);

  return (
    <Link href="/panier" className="rounded-full bg-memel-black px-3 py-2 text-sm text-white transition hover:opacity-90">
      Panier ({count})
    </Link>
  );
}
