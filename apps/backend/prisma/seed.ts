import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seedAdmin() {
  // Named SEED_ADMIN_* (not ADMIN_*) to avoid colliding with ADMIN_EMAIL,
  // which is the contact-form notification recipient (see email.service.ts).
  const name = process.env.SEED_ADMIN_NAME;
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!name || !email || !password) {
    throw new Error("SEED_ADMIN_NAME, SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set to seed the first admin.");
  }

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin already exists: ${email} (skipped)`);
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  await prisma.admin.create({ data: { name, email, password: hashed } });
  console.log(`Created admin: ${email}`);
}

// Portfolio items are no longer seeded from a hardcoded array — they're
// created entirely through the admin panel's upload flow (see
// src/services/storage.service.ts and scripts/migrate-legacy-portfolio-images.ts
// for the one-time migration of what used to live here).

// Seeds the existing SQLite Product rows' shape (title/price/icon/category)
// as a starting price list so the client's PriceList component has data to
// show immediately after switching to the new backend.
async function seedProducts() {
  const count = await prisma.product.count();
  if (count > 0) {
    console.log(`Products already has ${count} item(s) (skipped)`);
    return;
  }

  const products = [
    { name: "Vizit kart (100 ədəd)", category: "Çap", price: "15₼", description: "Standart ölçü, birtərəfli çap" },
    { name: "A5 Flayer (100 ədəd)", category: "Çap", price: "20₼", description: "Rəngli, glossy kağız" },
    { name: "Roll-up banner", category: "Reklam", price: "45₼" },
    { name: "Poster (A2)", category: "Çap", price: "12₼" },
  ];

  for (const product of products) {
    const slug = product.name
      .toLowerCase()
      .replace(/[^a-z0-9əıöüğşç]+/gi, "-")
      .replace(/^-+|-+$/g, "");
    await prisma.product.create({ data: { ...product, slug, isActive: true } });
  }
  console.log(`Seeded ${products.length} products`);
}

async function main() {
  await seedAdmin();
  await seedProducts();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
