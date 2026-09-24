"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createSession, destroySession } from "@/lib/auth/session";
import { APP_IN_CONSTRUCTION } from "@/lib/construction";

export interface LoginState {
  // Codice, non testo già in italiano — la traduzione la sceglie chi mostra l'errore (vedi
  // LoginForm.tsx + src/lib/i18n/catalog.ts, chiavi "login.error.*").
  error?: "missing" | "invalid";
}

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "missing" };
  }

  const learner = await prisma.learner.findUnique({ where: { email } });
  if (!learner || !verifyPassword(password, learner.passwordHash)) {
    return { error: "invalid" };
  }

  await createSession(learner.id);
  redirect("/dashboard");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/login");
}

// Accesso rapido per gli account demo — solo in sviluppo locale, mai in produzione: evita di
// dover digitare le credenziali ogni volta durante le prove. Non sostituisce il login vero,
// che resta sotto: l'isolamento multi-tenant è proprio ciò che questo campione doveva provare.
export async function quickLogin(email: string): Promise<void> {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Accesso rapido non disponibile in produzione.");
  }

  const learner = await prisma.learner.findUnique({ where: { email } });
  if (!learner) throw new Error("Account demo non trovato.");

  await createSession(learner.id);
  redirect("/dashboard");
}

// Accesso libero — D73: finché l'app è in costruzione e non esiste la registrazione (D64), chi
// apre il link pubblico entra senza account, sempre come l'istruttore demo Delfino. Diverso da
// quickLogin: nessuna email scelta dal client (in produzione resta vietato), un solo account
// fisso. Tutti i visitatori condividono quei progressi — è un'anteprima, da togliere prima di un
// lancio vero, insieme a /percorso-test (D23).
const FREE_ACCESS_EMAIL = "demo@delfino.it";

export async function freeAccess(): Promise<void> {
  if (!APP_IN_CONSTRUCTION) {
    throw new Error("Accesso libero disponibile solo mentre l'app è in costruzione.");
  }

  const learner = await prisma.learner.findUnique({ where: { email: FREE_ACCESS_EMAIL } });
  if (!learner) throw new Error("Account di prova non trovato.");

  await createSession(learner.id);
  redirect("/dashboard");
}
