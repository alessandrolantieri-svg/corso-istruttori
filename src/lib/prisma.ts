import { PrismaClient } from "@/generated/prisma/client";
import { createDbAdapter } from "@/lib/db/adapter";

// Singleton standard per Next.js in dev (evita di aprire una nuova connessione
// ad ogni hot-reload del modulo).
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Database Postgres vero (Netlify DB, su Neon) al posto del file SQLite (D72: un file non regge
// su un hosting "usa e getta"). In locale `netlify dev` fornisce un Postgres di prova; quale
// adattatore usare e da dove prendere la stringa di connessione lo decide src/lib/db/adapter.ts.
const adapter = createDbAdapter();

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
