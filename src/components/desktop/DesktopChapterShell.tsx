import type { ReactNode } from "react";
import { loadSidebarNav } from "./sidebarData";
import { DesktopSidebar } from "./DesktopSidebar";
import type { Locale } from "@/lib/i18n/catalog";

// Cornice del pilota descritto in README.md di questa cartella — non è un layout nuovo per tutta
// l'app, solo la barra laterale a fianco del contenuto che le pagine già producono. Sotto la
// soglia desktop (globals.css), ".desktop-sidebar" è display:none e ".desktop-shell-content" non
// impone larghezze: ogni pagina resta pixel per pixel quella di prima di questa cartella.
export async function DesktopChapterShell({
  locale,
  currentKind,
  currentNum,
  children,
}: {
  locale: Locale;
  currentKind: string;
  currentNum: string;
  children: ReactNode;
}) {
  const nav = await loadSidebarNav(locale);

  return (
    <div className="desktop-shell">
      <DesktopSidebar nav={nav} locale={locale} currentKind={currentKind} currentNum={currentNum} />
      <div className="desktop-shell-content">{children}</div>
    </div>
  );
}
