import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";
import { getConnectionString } from "@netlify/database";

// Un solo punto che decide COME ci si collega al database Postgres (D72) — usato da
// src/lib/prisma.ts (l'app) e da prisma/seed.ts (il seed), così non possono divergere.
//
// Due adattatori, perché i due ambienti parlano protocolli diversi:
// - su Netlify il database è Neon, che si raggiunge con il driver "serverless" (WebSocket/HTTP,
//   adatto alle funzioni usa-e-getta) — PrismaNeon;
// - in locale `netlify dev` avvia un Postgres di prova normale (PGlite su localhost): il driver
//   Neon lì fallisce con un errore WebSocket (visto dal vivo), serve il driver classico — PrismaPg.
// Netlify stesso dichiara il caso con NETLIFY_DB_DRIVER ("server" in locale); il controllo
// sull'host localhost è la rete di sicurezza se quella variabile un giorno mancasse.
export function resolveConnectionString(): string {
  return process.env.DATABASE_URL ?? getConnectionString();
}

export function createDbAdapter(connectionString = resolveConnectionString()) {
  const isLocalServer =
    process.env.NETLIFY_DB_DRIVER === "server" || /^[a-z]+:\/\/[^@]*@?(localhost|127\.0\.0\.1)[:/]/i.test(connectionString);
  return isLocalServer ? new PrismaPg({ connectionString }) : new PrismaNeon({ connectionString });
}
