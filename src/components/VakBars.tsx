import type { VakResult } from "@/lib/vak";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/catalog";

function pct(v: Pick<VakResult, "mostra" | "dire" | "sentire">, key: "mostra" | "dire" | "sentire") {
  const tot = v.mostra + v.dire + v.sentire || 1;
  return Math.round((v[key] / tot) * 100);
}

const LABELS: Record<Locale, { mostra: string; dire: string; sentire: string }> = {
  it: { mostra: "Mostrare", dire: "Dire", sentire: "Far sentire" },
  en: { mostra: "Showing", dire: "Telling", sentire: "Guiding by feel" },
  es: { mostra: "Mostrar", dire: "Decir", sentire: "Hacer sentir" },
  fr: { mostra: "Montrer", dire: "Dire", sentire: "Faire sentir" },
  "pt-PT": { mostra: "Mostrar", dire: "Dizer", sentire: "Fazer sentir" },
  "pt-BR": { mostra: "Mostrar", dire: "Dizer", sentire: "Fazer sentir" },
};

export function VakBars({
  vak,
  locale = DEFAULT_LOCALE,
}: {
  vak: Pick<VakResult, "mostra" | "dire" | "sentire">;
  locale?: Locale;
}) {
  const labels = LABELS[locale];
  return (
    <div className="bars">
      <div className="bar-row">
        <span className="lbl">{labels.mostra}</span>
        <div className="bar-track">
          <div className="bar-fill" style={{ width: `${pct(vak, "mostra")}%` }} />
        </div>
      </div>
      <div className="bar-row">
        <span className="lbl">{labels.dire}</span>
        <div className="bar-track">
          <div className="bar-fill" style={{ width: `${pct(vak, "dire")}%` }} />
        </div>
      </div>
      <div className="bar-row">
        <span className="lbl">{labels.sentire}</span>
        <div className="bar-track">
          <div className="bar-fill" style={{ width: `${pct(vak, "sentire")}%` }} />
        </div>
      </div>
    </div>
  );
}
