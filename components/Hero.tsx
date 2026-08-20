import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center opacity-90"></div>
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
          L'Attiéké,
          <br />Notre Héritage.
          <br />Notre Fierté.
          <br />Notre Avenir.
        </h1>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/commander" className="rounded bg-memel-gold px-6 py-3 text-white shadow transition hover:opacity-90">
            Commander
          </Link>
          <Link href="/notre-histoire" className="rounded border border-white px-6 py-3 text-white transition hover:bg-white/10">
            Découvrir notre histoire
          </Link>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-memel-brown/40"></div>
    </section>
  );
}
