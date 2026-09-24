import { t, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/catalog";

// Riepilogo delle risposte scritte a mano (riflessioni libere) raccolte durante il capitolo.
// Mostrato di sola lettura nella schermata finale — è un'eco di quello che l'istruttore ha già
// scritto altrove nel capitolo, non nuovo contenuto.
export function ChapterDiarySection({
  answers,
  keys,
  locale = DEFAULT_LOCALE,
}: {
  answers: Record<string, string>;
  keys: string[];
  locale?: Locale;
}) {
  const entries = keys.map((k) => answers[k]).filter((v): v is string => !!v && v.trim().length > 0);
  if (entries.length === 0) return null;

  return (
    <>
      <h2>{t("chapter.yourDiary", locale)}</h2>
      {entries.map((text, i) => (
        <div className="card" key={i}>
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", margin: 0, maxWidth: "none" }}>
            «{text}»
          </p>
        </div>
      ))}
    </>
  );
}
