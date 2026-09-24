import { setLocale } from "@/lib/i18n/locale";
import { LOCALES, type Locale } from "@/lib/i18n/catalog";

const LABEL: Record<Locale, string> = { it: "IT", en: "EN", es: "ES", fr: "FR", "pt-PT": "PT", "pt-BR": "BR" };

// Component Server puro: ogni lingua è un piccolo form che chiama la Server Action setLocale con
// argomenti già legati (.bind) — nessun JavaScript client richiesto per cambiare lingua.
export function LocaleSwitcher({ locale, path }: { locale: Locale; path: string }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {LOCALES.map((l) => (
        <form action={setLocale.bind(null, l, path)} key={l}>
          <button
            type="submit"
            className="day-tag"
            style={{
              background: "none",
              border: "none",
              cursor: l === locale ? "default" : "pointer",
              fontWeight: l === locale ? 700 : 400,
              opacity: l === locale ? 1 : 0.55,
              padding: 0,
            }}
            disabled={l === locale}
          >
            {LABEL[l]}
          </button>
        </form>
      ))}
    </div>
  );
}
