import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client.ts";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const products = [
  { title: "Flayer", price: "15₼", icon: "🗞️", category: "Çap", active: true },
  { title: "Banner", price: "45₼", icon: "🎌", category: "Reklam", active: true },
  { title: "Roll-up", price: "89₼", icon: "📜", category: "Reklam", active: true },
  { title: "Vizit kart", price: "25₼", icon: "💳", category: "Çap", active: true },
];

const orders = [
  { id: "#001", customer: "Əli Həsənov", product: "Flayer", amount: "75₼", status: "Tamamlandı", date: "11 Mar 2026" },
  { id: "#002", customer: "Leyla Əliyeva", product: "Banner", amount: "135₼", status: "Hazırlanır", date: "11 Mar 2026" },
  { id: "#003", customer: "Murad Quliyev", product: "Vizit kart", amount: "50₼", status: "Gözləyir", date: "10 Mar 2026" },
  { id: "#004", customer: "Nigar Hüseynova", product: "Roll-up", amount: "178₼", status: "Tamamlandı", date: "10 Mar 2026" },
  { id: "#005", customer: "Tural Babayev", product: "Stiker", amount: "40₼", status: "Hazırlanır", date: "9 Mar 2026" },
];

const customers = [
  { name: "Əli Həsənov", email: "ali@gmail.com", orders: 5, total: "375₼", date: "Jan 2026" },
  { name: "Leyla Əliyeva", email: "leyla@gmail.com", orders: 3, total: "270₼", date: "Feb 2026" },
  { name: "Murad Quliyev", email: "murad@gmail.com", orders: 8, total: "640₼", date: "Dec 2025" },
  { name: "Nigar Hüseynova", email: "nigar@gmail.com", orders: 2, total: "178₼", date: "Mar 2026" },
  { name: "Tural Babayev", email: "tural@gmail.com", orders: 6, total: "480₼", date: "Nov 2025" },
];

const messages = [
  { name: "Əli Həsənov", email: "ali@gmail.com", service: "Flayer", message: "500 ədəd A4 flayer lazımdır. Qiymət necədir?", date: "11 Mar", read: false },
  { name: "Leyla Əliyeva", email: "leyla@gmail.com", service: "Banner", message: "3x1 metr banner istəyirəm. Neçə günə hazır olar?", date: "10 Mar", read: false },
  { name: "Murad Quliyev", email: "murad@gmail.com", service: "Vizit kart", message: "Şirkətimiz üçün 200 ədəd vizit kart lazımdır.", date: "9 Mar", read: true },
];

async function main() {
  await prisma.product.deleteMany();
  await prisma.order.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.message.deleteMany();

  await prisma.product.createMany({ data: products });
  await prisma.order.createMany({ data: orders });
  await prisma.customer.createMany({ data: customers });
  await prisma.message.createMany({ data: messages });

  console.log("Seeded products, orders, customers, messages.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
