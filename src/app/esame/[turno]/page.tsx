import { notFound, redirect } from "next/navigation";
import { requireLearner } from "@/lib/auth/requireLearner";
import { loadChapterState, loadAllProgress } from "@/lib/progressActions";
import { examTurnsForLocale } from "@/lib/exam/byLocale";
import { isExamTurnUnlocked } from "@/lib/exam/unlock";
import { ChapterRunner } from "@/components/ChapterRunner";
import { DesktopChapterShell } from "@/components/desktop/DesktopChapterShell";
import { getLocale } from "@/lib/i18n/locale";

export default async function ExamTurnPage({ params }: { params: Promise<{ turno: string }> }) {
  await requireLearner();
  const { turno } = await params;
  const locale = await getLocale();

  const def = examTurnsForLocale(locale)[turno];
  if (!def) notFound();

  // Stesso controllo server-side dei capitoli: il Turno 1 richiede tutti e dieci i capitoli
  // completati, il Turno 2/3 richiedono il turno precedente — non solo un link nascosto.
  const allProgress = await loadAllProgress();
  const completedChapterIds = new Set(allProgress.filter((p) => p.completedAt).map((p) => p.chapterId));
  if (!isExamTurnUnlocked(turno, completedChapterIds)) {
    redirect("/dashboard");
  }

  const state = await loadChapterState(def.chapterId);

  return (
    <DesktopChapterShell locale={locale} currentKind="esame" currentNum={turno}>
      <ChapterRunner kind="esame" num={turno} initialState={state} locale={locale} />
    </DesktopChapterShell>
  );
}
