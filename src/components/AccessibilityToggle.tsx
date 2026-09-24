import { setA11yMode, type A11yMode } from "@/lib/a11y/settings";
import { t, type Locale } from "@/lib/i18n/catalog";

// Component Server puro, stesso schema di LocaleSwitcher: un form che chiama una Server Action
// con l'argomento già legato (.bind) — nessun JavaScript client richiesto per attivarla, utile
// proprio per chi ne ha più bisogno (una pagina che dipende da JS per essere accessibile è già
// un problema).
export function AccessibilityToggle({
  mode,
  path,
  locale,
  onLight = false,
}: {
  mode: A11yMode;
  path: string;
  locale: Locale;
  /** true quando il bottone sta su sfondo chiaro (es. la pagina di login), non sulla testata colorata. */
  onLight?: boolean;
}) {
  const active = mode === "low-vision";
  const next: A11yMode = active ? "default" : "low-vision";

  return (
    <form action={setA11yMode.bind(null, next, path)}>
      <button
        type="submit"
        className="pill pressable"
        aria-pressed={active}
        style={
          onLight
            ? {
                border: `1px solid ${active ? "var(--surface)" : "var(--ink)"}`,
                background: active ? "color-mix(in srgb, var(--surface) 12%, #fff)" : "#fff",
                color: active ? "var(--surface)" : "var(--ink)",
                cursor: "pointer",
                padding: "3px 9px",
                fontSize: "10.5px",
              }
            : {
                border: active ? "1px solid #fff" : "1px solid rgba(255,255,255,.5)",
                background: active ? "rgba(255,255,255,.28)" : "rgba(255,255,255,.16)",
                cursor: "pointer",
                padding: "3px 9px",
                fontSize: "10.5px",
              }
        }
      >
        {active && <i className="ph-duotone ph-check" aria-hidden="true" />}
        {t("a11y.lowVisionLabel", locale)}
      </button>
    </form>
  );
}
