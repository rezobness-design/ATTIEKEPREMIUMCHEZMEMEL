import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductDetailClient from "../../../components/ProductDetailClient";
import { prisma } from "../../../lib/prisma";

interface ProductPageProps {
  params: { slug: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  if (!product) {
    notFound();
  }

  const images = (() => {
    try {
      return JSON.parse(product.images as string);
    } catch {
      return [];
    }
  })();

  return (
    <Suspense fallback={<div className="p-8 text-center text-memel-brown">Chargement...</div>}>
      <ProductDetailClient product={product} images={images} />
    </Suspense>
  );
}
