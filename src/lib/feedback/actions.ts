"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentLearner } from "@/lib/auth/session";
import { PATH_ID, COURSE_ID } from "@/lib/constants";
import { askClaude, AiNotConfiguredError } from "@/lib/ai/client";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/catalog";
import { buildFeedbackPrompt } from "./systemPrompt";
import { resolveSource } from "./sources";

async function requireLearnerId(): Promise<string> {
  const learner = await getCurrentLearner();
  if (!learner) throw new Error("Non autenticato.");
  return learner.id;
}

export interface ReflectionItem {
  chapterId: string;
  key: string;
  text: string;
  writtenAt: string;
  sourceLabel: string;
}

// Legge FreeReflection — spazio Mentoring, lo stesso del Tutor. Nessun collegamento, né qui né
// altrove, con AssessmentResponse o con qualunque codice di Certificazione (Muro 1).
export async function loadReflectionsForFeedback(
  locale: Locale = DEFAULT_LOCALE,
  pathId: string = PATH_ID,
  courseId: string = COURSE_ID
): Promise<ReflectionItem[]> {
  const learnerId = await requireLearnerId();
  const rows = await prisma.freeReflection.findMany({
    where: { learnerId, pathId, courseId },
    orderBy: { writtenAt: "desc" },
  });
  return rows.map((r) => ({
    chapterId: r.chapterId,
    key: r.key,
    text: r.text,
    writtenAt: r.writtenAt.toISOString(),
    sourceLabel: resolveSource(r.chapterId, locale).label,
  }));
}

export interface FeedbackResult {
  feedback: string | null;
  error?: "not_configured" | "api_error" | "not_found";
}

// Generato al momento, non salvato: una prima versione volutamente semplice — vedi
// 01_ANALISI/DECISIONI PRESE.md per la scelta di ambito.
export async function getReflectionFeedback(
  chapterId: string,
  key: string,
  locale: Locale = DEFAULT_LOCALE,
  pathId: string = PATH_ID,
  courseId: string = COURSE_ID
): Promise<FeedbackResult> {
  const learnerId = await requireLearnerId();
  const row = await prisma.freeReflection.findUnique({
    where: { learnerId_pathId_courseId_chapterId_key: { learnerId, pathId, courseId, chapterId, key } },
  });
  if (!row) return { feedback: null, error: "not_found" };

  const systemPrompt = buildFeedbackPrompt(resolveSource(chapterId, locale).label, locale);

  try {
    const feedback = await askClaude(systemPrompt, [{ role: "user", content: row.text }]);
    return { feedback };
  } catch (err) {
    if (err instanceof AiNotConfiguredError) return { feedback: null, error: "not_configured" };
    console.error("Feedback: errore nella chiamata al modello", err);
    return { feedback: null, error: "api_error" };
  }
}
