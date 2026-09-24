import Link from "next/link";
import { t, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/catalog";

// weekNum ha senso solo per i capitoli ("Settimana X di 10") — esame e Casi Reali passano
// undefined e la riga resta senza etichetta a sinistra, solo il day-tag a destra.
export function ProgressTopbar({
  pct,
  dayTag,
  weekNum,
  locale = DEFAULT_LOCALE,
}: {
  pct: number;
  dayTag: string;
  weekNum?: number;
  locale?: Locale;
}) {
  return (
    <header className="topbar">
      {/* Il wordmark portava già a /dashboard, ma niente lo segnalava — chi non sapeva che si
          poteva cliccare restava senza un modo esplicito per tornare alla home da qui (segnalato
          dal proprietario). L'icona casa rende visibile quello che il link faceva già. */}
      <Link
        href="/dashboard"
        className="wordmark"
        style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: 6 }}
        aria-label={t("nav.backToDashboard", locale)}
      >
        <i className="ph-duotone ph-house" aria-hidden="true" />
        La Chiave Giusta
      </Link>
      <div className="topbar-progress">
        <div className="topbar-progress-row">
          {weekNum !== undefined ? (
            <span className="week-tag">
              {t("chapter.week", locale)} {weekNum} {t("chapter.of10", locale)}
            </span>
          ) : (
            <span />
          )}
          <span className="day-tag">{dayTag}</span>
        </div>
        <div
          className="prog-track"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={dayTag}
        >
          <div className="prog-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </header>
  );
}
