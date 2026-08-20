import Link from "next/link";
import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { prisma } from "../lib/prisma";

export default async function Home() {
  let products: Array<{ slug: string; title: string; price: number; category?: string | null; description: string; stock: number; images?: string | null }> = [];

  try {
    products = await prisma.product.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Erreur chargement produits home:", error);
  }

  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <Hero />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-memel-green">Notre marque</p>
            <h2 className="mt-2 text-3xl font-semibold">Attiéké Premium Chez Memel</h2>
          </div>
          <Link href="/notre-histoire" className="text-sm font-semibold text-memel-gold">
            Découvrir notre histoire →
          </Link>
        </div>
        <p className="max-w-3xl text-lg leading-relaxed text-memel-brown">
          Une expérience gourmande pensée pour valoriser les saveurs de Côte d’Ivoire, avec des produits artisanaux, élégants et accessibles à tous les moments de la vie.
        </p>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h3 className="text-2xl font-semibold">Produits phares</h3>
          <Link href="/nos-produits" className="text-sm font-semibold text-memel-gold">
            Voir tout →
          </Link>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))
          ) : (
            <div className="rounded-[2rem] border border-dashed border-memel-brown/20 bg-white/70 p-8 text-center text-memel-brown lg:col-span-3">
              <p className="text-lg font-semibold">Nos produits premium seront bientôt disponibles.</p>
              <p className="mt-2 text-sm">L’application reste accessible pendant la mise à jour du catalogue.</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white/70 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-3">
          {[
            { title: "Qualité artisanale", text: "Des recettes maîtrisées avec des matières premières soigneusement sélectionnées." },
            { title: "Livraison rapide", text: "Des commandes préparées avec sérieux pour une expérience premium jusqu’à votre porte." },
            { title: "Service client dédié", text: "Nous accompagnons chaque client, du premier achat à la fidélisation." },
          ].map((item) => (
            <div key={item.title} className="rounded-[2rem] border border-memel-brown/10 bg-ivory p-8 shadow-sm">
              <h4 className="text-xl font-semibold">{item.title}</h4>
              <p className="mt-3 text-sm leading-7 text-memel-brown">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
