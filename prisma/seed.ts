import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Delete old data first (optional)
  await prisma.product.deleteMany();

  // Seed data
  await prisma.product.createMany({
    data: Array.from({ length: 25 }).map((_, i) => {
      const quantity = Math.floor(Math.random() * 50);
      const threshold = 5 * i;

      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - i * 3); // stagger dates

      return {
        userId: "a0548f47-f822-48f6-8553-0d851bfa173a",
        name: `Product ${i + 1}`,
        price: ((i + 1) * 10).toString(),
        quantity,
        lowStockThreshold: threshold,
        isLowStock: quantity <= threshold,
        createdAt, // ✅ override
      };
    }),
  });

  console.log("✅ Seed data created!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
