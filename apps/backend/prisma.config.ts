// Prisma CLI configuration (replaces the deprecated package.json#prisma key).
// When this file exists Prisma no longer loads .env on its own, so dotenv
// does it here — the schema's env("DATABASE_URL") needs it.
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
});
