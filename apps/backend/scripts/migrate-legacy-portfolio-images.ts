import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import { saveImage, storageBackend } from "../src/services/storage.service";

// One-time migration: apps/client/prisma/seed.ts originally seeded Portfolio
// rows pointing at "/portfolio/<file>" — static images living inside
// apps/client/public/portfolio. That couples the CMS to frontend source
// code (a new portfolio item required committing a file into the client
// app). This copies each of those files into the backend's own image
// storage (storage.service.ts — Vercel Blob if configured, else local disk)
// and repoints the DB record at the new permanent URL. Idempotent: rows
// already migrated (image no longer starting with "/portfolio/") are skipped,
// and the original files are left untouched in apps/client/public/portfolio
// so nothing is destroyed if this needs to be re-run or reviewed.
const CLIENT_PUBLIC_DIR = path.join(__dirname, "..", "..", "client", "public");

const MIME_BY_EXT: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

const prisma = new PrismaClient();

async function main() {
  console.log(`Storage backend: ${storageBackend}`);

  const legacyItems = await prisma.portfolio.findMany({
    where: { image: { startsWith: "/portfolio/" } },
  });

  if (legacyItems.length === 0) {
    console.log("No legacy /portfolio/* image references found — nothing to migrate.");
    return;
  }

  console.log(`Found ${legacyItems.length} portfolio record(s) referencing apps/client/public/portfolio.`);

  let migrated = 0;
  let skipped = 0;

  for (const item of legacyItems) {
    const relativePath = item.image; // e.g. "/portfolio/abc.png"
    const absolutePath = path.join(CLIENT_PUBLIC_DIR, relativePath);
    const ext = path.extname(relativePath).toLowerCase();
    const mimetype = MIME_BY_EXT[ext];

    if (!mimetype) {
      console.warn(`  SKIP "${item.title}" (${item.id}): unsupported extension "${ext}"`);
      skipped += 1;
      continue;
    }

    let buffer: Buffer;
    try {
      buffer = await fs.readFile(absolutePath);
    } catch {
      console.warn(`  SKIP "${item.title}" (${item.id}): file not found at ${absolutePath}`);
      skipped += 1;
      continue;
    }

    const newUrl = await saveImage(buffer, mimetype, path.basename(relativePath));
    // Local-disk mode returns a relative path; outside an Express request
    // there's no req.protocol/host to build from, so fall back to the same
    // localhost:PORT the dev server itself listens on (see src/server.ts).
    const absoluteUrl = newUrl.startsWith("http")
      ? newUrl
      : `http://localhost:${process.env.PORT || 5001}${newUrl}`;

    await prisma.portfolio.update({ where: { id: item.id }, data: { image: absoluteUrl } });
    console.log(`  OK   "${item.title}" (${item.id}): ${relativePath} -> ${absoluteUrl}`);
    migrated += 1;
  }

  console.log(`\nMigrated ${migrated} item(s), skipped ${skipped}.`);
  if (migrated > 0) {
    console.log("Original files were left in place under apps/client/public/portfolio.");
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
