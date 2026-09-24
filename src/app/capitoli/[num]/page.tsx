import { notFound, redirect } from "next/navigation";
import { requireLearner } from "@/lib/auth/requireLearner";
import { loadChapterState, loadAllProgress } from "@/lib/progressActions";
import { chaptersForLocale } from "@/lib/chapters/byLocale";
import { isChapterUnlocked } from "@/lib/chapters/unlock";
import { ChapterRunner } from "@/components/ChapterRunner";
import { DesktopChapterShell } from "@/components/desktop/DesktopChapterShell";
import { getLocale } from "@/lib/i18n/locale";

export default async function ChapterPage({ params }: { params: Promise<{ num: string }> }) {
  await requireLearner();
  const { num } = await params;
  const locale = await getLocale();

  const def = chaptersForLocale(locale)[num];
  if (!def) notFound();

  // Controllo vero, non solo un link nascosto nella Dashboard: un istruttore che prova ad aprire
  // l'URL di un capitolo non ancora sbloccato viene rimandato alla Dashboard. Lo sblocco dipende
  // solo dal chapterId (identico fra lingue), non dal registro scelto qui.
  const allProgress = await loadAllProgress();
  const completedChapterIds = new Set(allProgress.filter((p) => p.completedAt).map((p) => p.chapterId));
  if (!isChapterUnlocked(num, completedChapterIds)) {
    redirect("/dashboard");
  }

  const state = await loadChapterState(def.chapterId);

  return (
    <DesktopChapterShell locale={locale} currentKind="capitolo" currentNum={num}>
      <ChapterRunner num={num} initialState={state} locale={locale} />
    </DesktopChapterShell>
  );
}
