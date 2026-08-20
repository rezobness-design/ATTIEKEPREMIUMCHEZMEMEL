const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        title: "Attiéké Origine",
        slug: "attieke-origine",
        description: "Attiéké premium en sachet 1 kg, préparé avec un savoir-faire artisanal et une texture inégalée.",
        price: 18.5,
        weight: "1 kg",
        stock: 24,
        category: "Classique",
        images: JSON.stringify(["/prod-sample.jpg"]),
      },
      {
        title: "Attiéké Prestige",
        slug: "attieke-prestige",
        description: "Édition premium enrichie d’épices locales et d’un parfum de fête, idéale pour les occasions spéciales.",
        price: 32,
        weight: "1.2 kg",
        stock: 12,
        category: "Édition limitée",
        images: JSON.stringify(["/prod-sample.jpg"]),
      },
      {
        title: "Attiéké Famille",
        slug: "attieke-famille",
        description: "Format économique et généreux pour le partage en famille ou en entreprise.",
        price: 12,
        weight: "800 g",
        stock: 40,
        category: "Format familial",
        images: JSON.stringify(["/prod-sample.jpg"]),
      },
    ],
  });

  console.log("Seed complete");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
