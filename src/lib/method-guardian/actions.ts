"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentLearner } from "@/lib/auth/session";
import { PATH_ID, COURSE_ID } from "@/lib/constants";
import { askClaude, AiNotConfiguredError } from "@/lib/ai/client";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/catalog";
import { buildMethodGuardianPrompt } from "./systemPrompt";
import { resolveSource } from "@/lib/feedback/sources";

async function requireLearnerId(): Promise<string> {
  const learner = await getCurrentLearner();
  if (!learner) throw new Error("Non autenticato.");
  return learner.id;
}

export interface MethodCheckResult {
  check: string | null;
  error?: "not_configured" | "api_error" | "not_found";
}

// Stessa fonte dell'agente Feedback (FreeReflection, spazio Mentoring) — lente diversa. Generato
// al momento, non salvato, stessa scelta di ambito degli altri agenti on-demand.
export async function checkReflectionAgainstMethod(
  chapterId: string,
  key: string,
  locale: Locale = DEFAULT_LOCALE,
  pathId: string = PATH_ID,
  courseId: string = COURSE_ID
): Promise<MethodCheckResult> {
  const learnerId = await requireLearnerId();
  const row = await prisma.freeReflection.findUnique({
    where: { learnerId_pathId_courseId_chapterId_key: { learnerId, pathId, courseId, chapterId, key } },
  });
  if (!row) return { check: null, error: "not_found" };

  const systemPrompt = buildMethodGuardianPrompt(resolveSource(chapterId, locale).label, locale);

  try {
    const check = await askClaude(systemPrompt, [{ role: "user", content: row.text }]);
    return { check };
  } catch (err) {
    if (err instanceof AiNotConfiguredError) return { check: null, error: "not_configured" };
    console.error("Controllo Contenuti: errore nella chiamata al modello", err);
    return { check: null, error: "api_error" };
  }
}
