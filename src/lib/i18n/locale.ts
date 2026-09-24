"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "./catalog";

const COOKIE_NAME = "lcg_locale";

// Preferenza per-browser, non per-account: un cookie, non una colonna su Learner. Cambiarla in
// una preferenza vera (legata all'account, sincronizzata fra dispositivi) è un passo a basso
// rischio quando servirà — stesso principio già usato per PATH_ID/COURSE_ID in constants.ts.
export async function getLocale(): Promise<Locale> {
  const jar = await cookies();
  const value = jar.get(COOKIE_NAME)?.value;
  return (LOCALES as readonly string[]).includes(value ?? "") ? (value as Locale) : DEFAULT_LOCALE;
}

export async function setLocale(locale: Locale, redirectTo: string): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE_NAME, locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  redirect(redirectTo);
}
