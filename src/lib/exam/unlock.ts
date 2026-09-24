import { chapters, CHAPTER_NUMS } from "@/lib/chapters/registry";
import { APP_IN_CONSTRUCTION } from "@/lib/construction";
import { examTurns, EXAM_NUMS } from "./registry";

// Il Turno 1 non è "il capitolo 11": si sblocca solo quando tutti e dieci i capitoli sono
// completati, non dopo il capitolo precedente. Dal Turno 2 in poi torna sequenziale, come i
// capitoli — turno N richiede il turno N-1 completato.
// In fase di costruzione (D74) i tre turni sono tutti aperti (stesso interruttore dei capitoli,
// src/lib/construction.ts); un turno inesistente resta comunque chiuso.
export function isExamTurnUnlocked(turno: string, completedChapterIds: ReadonlySet<string>): boolean {
  const idx = EXAM_NUMS.indexOf(turno);
  if (idx < 0) return false;
  if (APP_IN_CONSTRUCTION) return true;
  if (idx === 0) {
    return CHAPTER_NUMS.every((n) => completedChapterIds.has(chapters[n].chapterId));
  }
  const prevTurnoId = examTurns[EXAM_NUMS[idx - 1]].chapterId;
  return completedChapterIds.has(prevTurnoId);
}

export function allChaptersCompleted(completedChapterIds: ReadonlySet<string>): boolean {
  return CHAPTER_NUMS.every((n) => completedChapterIds.has(chapters[n].chapterId));
}
