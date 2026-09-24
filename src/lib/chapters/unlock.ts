import { chapters, CHAPTER_NUMS } from "./registry";
import { APP_IN_CONSTRUCTION } from "@/lib/construction";

// Un capitolo è sbloccato se è il primo, o se il capitolo immediatamente precedente risulta
// completato. Usata sia dalla Dashboard (per lo stato visivo) sia dalla pagina del capitolo
// (per il controllo vero — un link nascosto non basta, serve bloccare anche l'URL diretto).
// In fase di costruzione (D74) sono tutti aperti: chi costruisce deve poter aprire qualunque
// capitolo senza completare i precedenti. L'interruttore è uno solo, src/lib/construction.ts.
export function isChapterUnlocked(num: string, completedChapterIds: ReadonlySet<string>): boolean {
  if (APP_IN_CONSTRUCTION) return true;
  const idx = CHAPTER_NUMS.indexOf(num);
  if (idx <= 0) return true; // capitolo 1, o numero non riconosciuto (lascia decidere a notFound)
  const prevChapterId = chapters[CHAPTER_NUMS[idx - 1]].chapterId;
  return completedChapterIds.has(prevChapterId);
}
