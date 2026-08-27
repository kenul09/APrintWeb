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

// Seeds the existing static portfolio images (apps/client/data/portfolioWorks.js)
// into the database so the client can be switched over to the API without
// losing what's already on disk under apps/client/public/portfolio.
async function seedPortfolio() {
  const count = await prisma.portfolio.count();
  if (count > 0) {
    console.log(`Portfolio already has ${count} item(s) (skipped)`);
    return;
  }

  const works: Array<{ title: string; category: string; image: string }> = [
    { title: "Flayer", category: "Flayer", image: "/portfolio/A4dce582da9e746a6b931cca49b9eb154K.png" },
    { title: "Flayer", category: "Flayer", image: "/portfolio/A592d4fd2be224f19b8ab5135598985edo.png" },
    { title: "Flayer", category: "Flayer", image: "/portfolio/Af616dc1a8227442a85d7b4dd7b82cdcan.png" },
    { title: "Vizit kart", category: "Vizit kart", image: "/portfolio/A50db8da16ff24ab68c8968dbfc5ec660n.png" },
    { title: "Vizit kart", category: "Vizit kart", image: "/portfolio/A26eea4f0379647529595bef2233e7632k.png" },
    { title: "Vizit kart", category: "Vizit kart", image: "/portfolio/Ab8b38d0f0d1b48f78286655b1a0e1b25i.png" },
    { title: "Vizit kart", category: "Vizit kart", image: "/portfolio/unnamed-1.jpg" },
    { title: "Vizit kart", category: "Vizit kart", image: "/portfolio/Gemini_Generated_Image_q0mchoq0mchoq0mc.png" },
    { title: "Vizit kart", category: "Vizit kart", image: "/portfolio/unnamed.jpg" },
    { title: "Menu", category: "Menu", image: "/portfolio/b18c471d-9746-49e3-a91d-e2fc2ea05356.png" },
    { title: "Menu", category: "Menu", image: "/portfolio/4ebaa5fe-9b5b-4c3a-a538-91280865bccb.png" },
    { title: "Menu", category: "Menu", image: "/portfolio/a9077bcc-2022-41c4-8fb7-6615494cf64a.png" },
    { title: "Menu", category: "Menu", image: "/portfolio/a6f0e1f4-c619-4d77-9e7a-54b103b4f43a.png" },
    { title: "Menu", category: "Menu", image: "/portfolio/64c9ee6f-5043-436f-8ebc-8706ecaf15fb.png" },
    { title: "Menu", category: "Menu", image: "/portfolio/872aba5f-4a70-4725-ad73-85576ea36f3c.png" },
    { title: "Menu", category: "Menu", image: "/portfolio/e58dd31b-e14a-4c07-a471-3d62b6ba3efb.png" },
    { title: "Menu", category: "Menu", image: "/portfolio/af04d7fa-bf59-45da-ab06-c9659bb58f7d.png" },
    { title: "Menu", category: "Menu", image: "/portfolio/236b9786-c541-48f9-aa07-dcf40b425087.png" },
    { title: "Roll Up", category: "Roll-up", image: "/portfolio/b2af5af4-3ba6-48d4-8525-7375914567f1.png" },
    { title: "Roll Up", category: "Roll-up", image: "/portfolio/4c42233b-2f06-468c-b8c8-b1d6d8783487.png" },
    { title: "Roll Up", category: "Roll-up", image: "/portfolio/e0de131f-f785-4e6b-a6c3-8f83f5d4fdc4.png" },
    { title: "Poster", category: "Poster", image: "/portfolio/23755a79-c8ed-4e87-9e69-30b1fe735400.png" },
    { title: "Poster", category: "Poster", image: "/portfolio/c18da116-17f0-4f27-a7e0-6b87cd73e697.png" },
    { title: "Poster", category: "Poster", image: "/portfolio/8e0e53ac-6c23-415a-a066-45b9f0273a08.png" },
    { title: "Sticker", category: "Sticker", image: "/portfolio/c602db84-5d02-4b7a-879a-480e67f37cc1.png" },
    { title: "Sticker", category: "Sticker", image: "/portfolio/4095ae57-3e5a-4451-8e9b-418c179f01f7.png" },
    { title: "Kataloq", category: "Kataloq", image: "/portfolio/132ba4e6-9a5b-46c5-a00a-c9d9de1de4f3.png" },
    { title: "Kataloq", category: "Kataloq", image: "/portfolio/9eab215a-2f1d-4dad-8bc7-2bb729c582bc.png" },
    { title: "Kitab", category: "Kitab", image: "/portfolio/cc849925-d1a4-4a85-a473-d1c0a7b85c69.png" },
  ];

  await prisma.portfolio.createMany({ data: works.map((w) => ({ ...w, isPublished: true })) });
  console.log(`Seeded ${works.length} portfolio items`);
}

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
  await seedPortfolio();
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
