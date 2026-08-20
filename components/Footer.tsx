import Link from "next/link";
import React from "react";

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-confidentialite", label: "Politique de confidentialité" },
  { href: "/conditions-generales", label: "Conditions générales" },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-memel-black py-12 text-ivory">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 px-6 md:flex-row">
        <div>
          <h3 className="text-xl font-bold">Attiéké Premium Chez Memel</h3>
          <p className="mt-2 text-sm text-gray-200">Excellence & tradition ivoirienne</p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-gray-200 md:items-end">
          {legalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-memel-gold">
              {link.label}
            </Link>
          ))}
          <p className="mt-2">© {new Date().getFullYear()} Memel. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
