import { notFound } from "next/navigation";
import { requireLearner } from "@/lib/auth/requireLearner";
import { loadChapterState } from "@/lib/progressActions";
import { casiRealiForLocale } from "@/lib/casi-reali/byLocale";
import { ChapterRunner } from "@/components/ChapterRunner";
import { DesktopChapterShell } from "@/components/desktop/DesktopChapterShell";
import { getLocale } from "@/lib/i18n/locale";

// Nessun controllo di sblocco: i Casi Reali sono materiale richiamabile liberamente, in
// qualsiasi momento — non hanno un ordine né un capitolo precedente da completare.
export default async function CasoRealePage({ params }: { params: Promise<{ num: string }> }) {
  await requireLearner();
  const { num } = await params;
  const locale = await getLocale();

  const def = casiRealiForLocale(locale)[num];
  if (!def) notFound();

  const state = await loadChapterState(def.chapterId);

  return (
    <DesktopChapterShell locale={locale} currentKind="caso-reale" currentNum={num}>
      <ChapterRunner kind="caso-reale" num={num} initialState={state} locale={locale} />
    </DesktopChapterShell>
  );
}
