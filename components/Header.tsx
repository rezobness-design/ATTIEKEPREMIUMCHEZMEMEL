import Link from "next/link";
import React from "react";
import CartButton from "./CartButton";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/nos-produits", label: "Nos Produits" },
  { href: "/blog", label: "Blog" },
  { href: "/devenir-distributeur", label: "Distributeur" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="w-full border-b border-memel-brown/10 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-xl font-bold tracking-wide text-memel-black">
          Attiéké Chez Memel
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-memel-brown transition hover:text-memel-gold">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/mon-compte" className="rounded-full border border-memel-brown/20 px-4 py-2 text-sm font-semibold text-memel-black transition hover:bg-ivory">
            Mon Compte
          </Link>
          <CartButton />
          <Link href="/nos-produits" className="rounded-full bg-memel-gold px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
            Commander
          </Link>
        </div>
      </div>
    </header>
  );
}
