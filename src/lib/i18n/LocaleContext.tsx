"use client";

import { createContext, useContext } from "react";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/catalog";

// I componenti di contenuto (capitolo-N.tsx, ecc.) sono già uno per lingua — non hanno mai
// bisogno di `locale` a runtime, e non lo passano mai a `OptionGroup`. Il quiz vocale (FASE 6)
// ne ha bisogno per capire la lingua della trascrizione — un contesto React, non un prop da
// far attraversare centinaia di file di contenuto, che è esattamente il problema già scartato
// per la dettatura nei singoli passi (vedi VOICE_ARCHITECTURE.md, FASE 4). ChapterRunner fa da
// unico Provider, ogni componente condiviso sotto di lui (OptionGroup, ecc.) legge con
// `useLocale()`.
const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export const LocaleProvider = LocaleContext.Provider;

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
