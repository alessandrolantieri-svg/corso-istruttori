import { prisma } from "@/lib/prisma";
import { chaptersForLocale } from "@/lib/chapters/byLocale";
import { PATH_ID, COURSE_ID } from "@/lib/constants";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/catalog";
import { t } from "@/lib/i18n/catalog";

export interface ChapterCorrectness {
  chapterId: string;
  title: string; // es. "Capitolo 3 · Guardare e capire"
  correct: number;
  total: number;
  // FASE 9 (Analytics): di queste `total`, quante sono arrivate entro 20 minuti da un uso del
  // Tutor IA (AssessmentResponse.tutorAssisted, D51/D52) — mai un giudizio su chi chiede aiuto,
  // solo un dato in più accanto a correttezza.
  tutorAssisted: number;
}

// Aggrega per capitolo, non per singola competenza: non esiste (di proposito, per non costruire
// il tracciamento completo a 22 competenze — vedi la voce "secondo percorso" in questo registro)
// una mappa domanda→competenza. Un capitolo è comunque costruito attorno a UNA competenza
// principale (visibile nei chip della Dashboard), quindi l'aggregazione per capitolo resta un
// segnale reale, solo meno fine di quanto FASE 5 immagina.
export async function loadCorrectnessByChapter(
  learnerId: string,
  locale: Locale = DEFAULT_LOCALE,
  pathId: string = PATH_ID,
  courseId: string = COURSE_ID
): Promise<ChapterCorrectness[]> {
  const chapters = chaptersForLocale(locale);
  const chapterPrefix = t("dashboard.chapterPrefix", locale);

  const rows = await prisma.assessmentResponse.findMany({
    where: { learnerId, pathId, courseId, isCorrect: { not: null } },
    select: { chapterId: true, isCorrect: true, tutorAssisted: true },
  });

  const byChapter = new Map<string, { correct: number; total: number; tutorAssisted: number }>();
  for (const r of rows) {
    const entry = byChapter.get(r.chapterId) ?? { correct: 0, total: 0, tutorAssisted: 0 };
    entry.total += 1;
    if (r.isCorrect) entry.correct += 1;
    if (r.tutorAssisted) entry.tutorAssisted += 1;
    byChapter.set(r.chapterId, entry);
  }

  const result: ChapterCorrectness[] = [];
  for (const [num, def] of Object.entries(chapters)) {
    const stats = byChapter.get(def.chapterId);
    if (!stats) continue; // capitolo non ancora affrontato — nessun dato, non un dato a zero
    result.push({ chapterId: def.chapterId, title: `${chapterPrefix} ${num} · ${def.title}`, ...stats });
  }
  return result;
}
