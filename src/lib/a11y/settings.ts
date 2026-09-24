"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type A11yMode = "default" | "low-vision";

const COOKIE_NAME = "lcg_a11y";

// Stesso schema del cookie di lingua (src/lib/i18n/locale.ts): preferenza per-browser, non
// per-account. Un domani "voce sempre disponibile" (FASE 3+) si aggiungerà qui, non altrove.
export async function getA11yMode(): Promise<A11yMode> {
  const jar = await cookies();
  return jar.get(COOKIE_NAME)?.value === "low-vision" ? "low-vision" : "default";
}

export async function setA11yMode(mode: A11yMode, redirectTo: string): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE_NAME, mode, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  redirect(redirectTo);
}
