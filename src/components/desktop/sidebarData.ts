import { loadAllProgress } from "@/lib/progressActions";
import { CHAPTER_NUMS } from "@/lib/chapters/registry";
import { chaptersForLocale } from "@/lib/chapters/byLocale";
import { isChapterUnlocked } from "@/lib/chapters/unlock";
import { EXAM_NUMS } from "@/lib/exam/registry";
import { examTurnsForLocale } from "@/lib/exam/byLocale";
import { isExamTurnUnlocked } from "@/lib/exam/unlock";
import { CASO_NUMS } from "@/lib/casi-reali/registry";
import { casiRealiForLocale } from "@/lib/casi-reali/byLocale";
import type { Locale } from "@/lib/i18n/catalog";

// Un solo posto che compone lo stato di navigazione per la barra laterale desktop, riusando le
// stesse funzioni già scritte per Dashboard/pagine capitolo (loadAllProgress, isChapterUnlocked,
// isExamTurnUnlocked) — nessuna nuova query Prisma, nessuna logica di sblocco duplicata.

export type NavStatus = "done" | "current" | "locked" | "todo";

export interface NavItem {
  num: string;
  title: string;
  status: NavStatus;
}

export interface SidebarNav {
  chapters: NavItem[];
  examTurns: NavItem[];
  casiReali: NavItem[];
}

export async function loadSidebarNav(locale: Locale): Promise<SidebarNav> {
  const allProgress = await loadAllProgress();
  const progressByChapter = new Map(allProgress.map((p) => [p.chapterId, p]));
  const completedChapterIds = new Set(allProgress.filter((p) => p.completedAt).map((p) => p.chapterId));

  const localizedChapters = chaptersForLocale(locale);
  const localizedExamTurns = examTurnsForLocale(locale);
  const localizedCasiReali = casiRealiForLocale(locale);

  const current = CHAPTER_NUMS.find((num) => {
    const p = progressByChapter.get(localizedChapters[num].chapterId);
    return !p?.completedAt;
  });

  const chapters: NavItem[] = CHAPTER_NUMS.map((num) => {
    const def = localizedChapters[num];
    const isDone = !!progressByChapter.get(def.chapterId)?.completedAt;
    const unlocked = isChapterUnlocked(num, completedChapterIds);
    const status: NavStatus = !unlocked ? "locked" : isDone ? "done" : num === current ? "current" : "todo";
    return { num, title: def.title, status };
  });

  const examTurns: NavItem[] = EXAM_NUMS.map((turno) => {
    const def = localizedExamTurns[turno];
    const isDone = !!progressByChapter.get(def.chapterId)?.completedAt;
    const unlocked = isExamTurnUnlocked(turno, completedChapterIds);
    const status: NavStatus = !unlocked ? "locked" : isDone ? "done" : "todo";
    return { num: turno, title: def.title, status };
  });

  const casiReali: NavItem[] = CASO_NUMS.map((num) => {
    const def = localizedCasiReali[num];
    const isDone = !!progressByChapter.get(def.chapterId)?.completedAt;
    return { num, title: def.title, status: isDone ? "done" : "todo" };
  });

  return { chapters, examTurns, casiReali };
}
