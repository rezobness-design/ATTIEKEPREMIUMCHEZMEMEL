"use client";

import { useEffect, useState } from "react";

export default function CartButton() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("memel-cart") : null;
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCount(parsed.length || 0);
      } catch {
        setCount(0);
      }
    }
  }, []);

  return <div className="rounded-full bg-memel-black px-3 py-2 text-sm text-white">Panier ({count})</div>;
}
