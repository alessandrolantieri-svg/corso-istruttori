import { t, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/catalog";

interface FootBarProps {
  showBack: boolean;
  onBack: () => void;
  nextLabel: string | null;
  nextDisabled: boolean;
  onNext: () => void;
  locale?: Locale;
}

// nextLabel arriva già tradotto da chi definisce lo step (es. "Continue ▸" in un capitolo
// inglese) — solo le due stringhe fisse di questo componente (indietro/completato) hanno
// bisogno del catalogo interfaccia.
export function FootBar({ showBack, onBack, nextLabel, nextDisabled, onNext, locale = DEFAULT_LOCALE }: FootBarProps) {
  return (
    <nav className="footbar" aria-label={t("chapter.stepNavigation", locale)}>
      <div className="footbar-inner">
        <button
          type="button"
          className="btn btn-ghost btn-back pressable"
          style={{ visibility: showBack ? "visible" : "hidden" }}
          onClick={onBack}
          aria-label={t("chapter.back", locale)}
        >
          <i className="ph-duotone ph-arrow-left" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="btn btn-primary pressable"
          disabled={nextLabel === null || nextDisabled}
          onClick={onNext}
        >
          {nextLabel === null ? t("chapter.completed", locale) : nextLabel}
        </button>
      </div>
    </nav>
  );
}
