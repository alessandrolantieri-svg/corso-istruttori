// satori (il motore dietro next/og ImageResponse) legge solo font TTF/OTF, non WOFF2 — l'API
// css2 di Google Fonts serve WOFF2 di default. Uno User-Agent datato le fa rispondere con TTF,
// lo stesso trucco documentato per next/og. Risultato in cache in memoria per processo: la route
// dell'attestato viene chiamata raramente, ma non ha senso rifare il fetch a ogni richiesta.
const OLD_UA = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.9.7 Safari/534.34";

const cache = new Map<string, Promise<ArrayBuffer>>();

async function fetchGoogleFontTtf(family: string, weight: number, italic: boolean): Promise<ArrayBuffer> {
  const key = `${family}:${weight}:${italic ? "italic" : "normal"}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const promise = (async () => {
    const axis = italic ? `ital,wght@1,${weight}` : `wght@${weight}`;
    const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:${axis}&display=swap`;
    const css = await fetch(cssUrl, { headers: { "User-Agent": OLD_UA } }).then((r) => r.text());
    const match = css.match(/src: url\(([^)]+)\) format\('truetype'\)/) ?? css.match(/src: url\(([^)]+)\)/);
    if (!match) throw new Error(`Font TTF non trovato per ${family} ${weight} ${italic ? "italic" : ""}`);
    const fontRes = await fetch(match[1]);
    return fontRes.arrayBuffer();
  })();

  cache.set(key, promise);
  return promise;
}

export interface CertFont {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 500 | 600 | 700;
  style: "normal" | "italic";
}

export async function loadCertFonts(): Promise<CertFont[]> {
  const [serifRegular, serifBold, serifItalic, garamondItalicBold, manropeRegular, manropeBold] = await Promise.all([
    fetchGoogleFontTtf("Source Serif 4", 400, false),
    fetchGoogleFontTtf("Source Serif 4", 600, false),
    fetchGoogleFontTtf("Source Serif 4", 400, true),
    fetchGoogleFontTtf("EB Garamond", 600, true),
    fetchGoogleFontTtf("Manrope", 400, false),
    fetchGoogleFontTtf("Manrope", 700, false),
  ]);

  return [
    { name: "Source Serif 4", data: serifRegular, weight: 400, style: "normal" },
    { name: "Source Serif 4", data: serifBold, weight: 600, style: "normal" },
    { name: "Source Serif 4", data: serifItalic, weight: 400, style: "italic" },
    { name: "EB Garamond", data: garamondItalicBold, weight: 600, style: "italic" },
    { name: "Manrope", data: manropeRegular, weight: 400, style: "normal" },
    { name: "Manrope", data: manropeBold, weight: 700, style: "normal" },
  ];
}
