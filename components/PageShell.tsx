import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface PageShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function PageShell({ title, description, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-ivory text-memel-black">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-memel-green">Attiéké Premium Chez Memel</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight">{title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-memel-brown">{description}</p>
        </section>
        {children}
      </main>
      <Footer />
    </div>
  );
}
