import { prisma } from "@/lib/prisma";
import { PATH_ID, COURSE_ID } from "@/lib/constants";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/catalog";
import { CHAPTER_NUMS } from "@/lib/chapters/registry";
import { chaptersForLocale } from "@/lib/chapters/byLocale";
import { EXAM_NUMS } from "@/lib/exam/registry";
import { examTurnsForLocale } from "@/lib/exam/byLocale";
import { isExamTurnUnlocked } from "@/lib/exam/unlock";
import { CASO_NUMS } from "@/lib/casi-reali/registry";
import { casiRealiForLocale } from "@/lib/casi-reali/byLocale";
import { loadCorrectnessByChapter } from "@/lib/progress-agent/stats";

export interface StateSnapshot {
  chaptersCompleted: number;
  chaptersTotal: number;
  currentChapter: { num: string; title: string } | null;
  examUnlocked: boolean;
  examTurnsCompleted: number;
  examTotal: number;
  casiRealiCompleted: number;
  casiRealiTotal: number;
  attestatoAvailable: boolean;
  weakChapters: { title: string; ratio: number }[];
}

// Nessun dato nuovo: rilegge solo ciò che Dashboard, Progresso ed Esame calcolano già —
// l'Orchestratore non introduce una fonte di verità propria, la riassume.
export async function loadStateSnapshot(
  learnerId: string,
  pathId: string = PATH_ID,
  courseId: string = COURSE_ID,
  locale: Locale = DEFAULT_LOCALE
): Promise<StateSnapshot> {
  const chapters = chaptersForLocale(locale);
  const examTurns = examTurnsForLocale(locale);
  const casiReali = casiRealiForLocale(locale);

  const [progressRows, correctness] = await Promise.all([
    prisma.progressState.findMany({ where: { learnerId, pathId, courseId } }),
    loadCorrectnessByChapter(learnerId, locale, pathId, courseId),
  ]);
  const completedIds = new Set(progressRows.filter((p) => p.completedAt).map((p) => p.chapterId));

  const chaptersCompleted = CHAPTER_NUMS.filter((n) => completedIds.has(chapters[n].chapterId)).length;
  const currentNum = CHAPTER_NUMS.find((n) => !completedIds.has(chapters[n].chapterId));
  const currentChapter = currentNum ? { num: currentNum, title: chapters[currentNum].title } : null;

  const examTurnsCompleted = EXAM_NUMS.filter((t) => completedIds.has(examTurns[t].chapterId)).length;
  const examUnlocked = EXAM_NUMS.some((t) => isExamTurnUnlocked(t, completedIds));

  const casiRealiCompleted = CASO_NUMS.filter((n) => completedIds.has(casiReali[n].chapterId)).length;

  // Sotto il 60%, e con almeno 4 domande valutate — un campione troppo piccolo non conta come
  // segnale debole, solo come rumore.
  const weakChapters = correctness
    .filter((c) => c.total >= 4 && c.correct / c.total < 0.6)
    .map((c) => ({ title: c.title, ratio: c.correct / c.total }));

  return {
    chaptersCompleted,
    chaptersTotal: CHAPTER_NUMS.length,
    currentChapter,
    examUnlocked,
    examTurnsCompleted,
    examTotal: EXAM_NUMS.length,
    casiRealiCompleted,
    casiRealiTotal: CASO_NUMS.length,
    attestatoAvailable: examTurnsCompleted === EXAM_NUMS.length,
    weakChapters,
  };
}
