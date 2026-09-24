"use server";

import { getCurrentLearner } from "@/lib/auth/session";
import { PATH_ID, COURSE_ID } from "@/lib/constants";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/catalog";
import { askClaude, AiNotConfiguredError } from "@/lib/ai/client";
import { loadCorrectnessByChapter, type ChapterCorrectness } from "./stats";
import { buildProgressPrompt, formatCorrectnessForPrompt } from "./systemPrompt";

async function requireLearnerId(): Promise<string> {
  const learner = await getCurrentLearner();
  if (!learner) throw new Error("Non autenticato.");
  return learner.id;
}

// Spazio Certificazione (AssessmentResponse) — ma sono i dati DELL'ISTRUTTORE, mostrati a lui
// stesso: non è il confine che Muro 1 protegge (quello riguarda le riflessioni del Tutor mai
// lette da chi valuta), è lo stesso profilo che la Dashboard già mostra con i chip di stato.
export async function loadProgressStats(
  locale: Locale = DEFAULT_LOCALE,
  pathId: string = PATH_ID,
  courseId: string = COURSE_ID
): Promise<ChapterCorrectness[]> {
  const learnerId = await requireLearnerId();
  return loadCorrectnessByChapter(learnerId, locale, pathId, courseId);
}

export interface ProgressNarrativeResult {
  narrative: string | null;
  error?: "not_configured" | "api_error";
}

// Generato al momento, non salvato — stessa scelta di ambito dell'agente Feedback.
export async function getProgressNarrative(
  locale: Locale = DEFAULT_LOCALE,
  pathId: string = PATH_ID,
  courseId: string = COURSE_ID
): Promise<ProgressNarrativeResult> {
  const learnerId = await requireLearnerId();
  const stats = await loadCorrectnessByChapter(learnerId, locale, pathId, courseId);
  const systemPrompt = buildProgressPrompt(locale);

  try {
    const narrative = await askClaude(systemPrompt, [{ role: "user", content: formatCorrectnessForPrompt(stats) }]);
    return { narrative };
  } catch (err) {
    if (err instanceof AiNotConfiguredError) return { narrative: null, error: "not_configured" };
    console.error("Progresso: errore nella chiamata al modello", err);
    return { narrative: null, error: "api_error" };
  }
}
