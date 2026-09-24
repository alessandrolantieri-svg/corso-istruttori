"use server";

import { getCurrentLearner } from "@/lib/auth/session";
import { PATH_ID, COURSE_ID } from "@/lib/constants";
import { askClaude, AiNotConfiguredError } from "@/lib/ai/client";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/catalog";
import { loadStateSnapshot } from "./snapshot";
import { buildOrchestratorPrompt, formatSnapshotForPrompt } from "./systemPrompt";

async function requireLearnerId(): Promise<string> {
  const learner = await getCurrentLearner();
  if (!learner) throw new Error("Non autenticato.");
  return learner.id;
}

export interface TodayRecommendationResult {
  recommendation: string | null;
  error?: "not_configured" | "api_error";
}

// Generato al momento, non salvato — stessa scelta di ambito degli altri agenti on-demand
// (Feedback, Progresso): niente tabella nuova, niente cache, un consiglio fresco ogni volta.
export async function getTodayRecommendation(
  locale: Locale = DEFAULT_LOCALE,
  pathId: string = PATH_ID,
  courseId: string = COURSE_ID
): Promise<TodayRecommendationResult> {
  const learnerId = await requireLearnerId();
  const snapshot = await loadStateSnapshot(learnerId, pathId, courseId, locale);
  const systemPrompt = buildOrchestratorPrompt(locale);

  try {
    const recommendation = await askClaude(systemPrompt, [{ role: "user", content: formatSnapshotForPrompt(snapshot) }]);
    return { recommendation };
  } catch (err) {
    if (err instanceof AiNotConfiguredError) return { recommendation: null, error: "not_configured" };
    console.error("Orchestratore: errore nella chiamata al modello", err);
    return { recommendation: null, error: "api_error" };
  }
}
