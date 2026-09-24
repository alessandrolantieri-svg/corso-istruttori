import { PrismaClient } from "../src/generated/prisma/client";
import { createDbAdapter } from "../src/lib/db/adapter";
import { hashPassword } from "../src/lib/auth/password";

// Stesso adattatore dell'app (src/lib/db/adapter.ts). Su Netlify gli account demo arrivano già
// dalla migrazione 0002_seed_demo: questo seed serve a chi punta a un altro Postgres (DATABASE_URL)
// o al database di prova locale (`npx netlify dev:exec npm run db:seed`).
const prisma = new PrismaClient({ adapter: createDbAdapter() });

const DEMO_PASSWORD = "Chiave123!";

async function main() {
  const delfino = await prisma.organization.upsert({
    where: { slug: "delfino-demo" },
    update: {},
    create: { name: "Scuola Nuoto Delfino", slug: "delfino-demo" },
  });

  const airone = await prisma.organization.upsert({
    where: { slug: "airone-demo" },
    update: {},
    create: { name: "Scuola Nuoto Airone", slug: "airone-demo" },
  });

  const passwordHash = hashPassword(DEMO_PASSWORD);

  await prisma.learner.upsert({
    where: { email: "demo@delfino.it" },
    update: {},
    create: {
      email: "demo@delfino.it",
      passwordHash,
      name: "Istruttore Demo (Delfino)",
      organizationId: delfino.id,
    },
  });

  await prisma.learner.upsert({
    where: { email: "demo@airone.it" },
    update: {},
    create: {
      email: "demo@airone.it",
      passwordHash,
      name: "Istruttore Demo (Airone)",
      organizationId: airone.id,
    },
  });

  console.log("Seed completato:");
  console.log("  demo@delfino.it / " + DEMO_PASSWORD + " — Scuola Nuoto Delfino");
  console.log("  demo@airone.it  / " + DEMO_PASSWORD + " — Scuola Nuoto Airone");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
