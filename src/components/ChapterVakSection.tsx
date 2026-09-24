import { VakBars } from "@/components/VakBars";
import type { VakProfileData } from "@/lib/progressActions";
import { t, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/catalog";

// Sezione "Il tuo profilo VAK" mostrata nella dashboard di fine capitolo, dal Capitolo 2 in poi.
// Il profilo è calcolato una sola volta al Capitolo 1 (FASE 8 §3) — qui è sempre di sola lettura,
// dato reale dal database (mai un valore finto ereditato come nei mockup statici).
export function ChapterVakSection({
  vakProfile,
  locale = DEFAULT_LOCALE,
}: {
  vakProfile: VakProfileData | null;
  locale?: Locale;
}) {
  if (!vakProfile) return null;

  return (
    <>
      <h2>{t("chapter.yourVakProfile", locale)}</h2>
      <p className="lede" style={{ fontSize: ".85rem", marginTop: -6 }}>
        {t("chapter.vakProfileHint", locale)}
      </p>
      <VakBars vak={vakProfile} locale={locale} />
    </>
  );
}
