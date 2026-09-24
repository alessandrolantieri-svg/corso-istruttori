import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { getLocale } from "@/lib/i18n/locale";
import { getA11yMode } from "@/lib/a11y/settings";
import "./globals.css";

// Redesign "bold playful sobrio" (settembre 2026): un'unica famiglia, Manrope, al posto
// del serif + sans precedenti. Variabili CSS invariate (--font-serif/--font-sans puntano
// entrambe a Manrope) — nessun altro file deve cambiare oltre a questo e a globals.css.
const heading = Manrope({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "La Chiave Giusta",
  description: "Un metodo per capire chi hai davanti e trovare il modo giusto per arrivare a lui.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [locale, a11yMode] = await Promise.all([getLocale(), getA11yMode()]);

  return (
    <html
      lang={locale}
      data-a11y={a11yMode === "low-vision" ? "low-vision" : undefined}
      className={`${heading.variable} ${body.variable}`}
    >
      <head>
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/duotone/style.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
