"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentLearner } from "@/lib/auth/session";
import { PATH_ID, COURSE_ID } from "@/lib/constants";
import { askClaude, AiNotConfiguredError, type ChatTurn } from "@/lib/ai/client";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/catalog";
import { buildSystemPrompt } from "./systemPrompt";
import type { VakProfileData } from "@/lib/progressActions";

const HISTORY_LIMIT = 20; // turni recenti passati al modello — non l'intera cronologia, per costo e contesto

async function requireLearnerId(): Promise<string> {
  const learner = await getCurrentLearner();
  if (!learner) throw new Error("Non autenticato.");
  return learner.id;
}

export interface TutorMessageView {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export async function loadTutorHistory(pathId: string = PATH_ID, courseId: string = COURSE_ID): Promise<TutorMessageView[]> {
  const learnerId = await requireLearnerId();
  const rows = await prisma.tutorMessage.findMany({
    where: { learnerId, pathId, courseId },
    orderBy: { createdAt: "asc" },
  });
  return rows.map((r) => ({
    id: r.id,
    role: r.role as "user" | "assistant",
    content: r.content,
    createdAt: r.createdAt.toISOString(),
  }));
}

export interface SendTutorMessageResult {
  reply: string | null;
  error?: "not_configured" | "api_error";
}

// Spazio Mentoring (Muro 1): questa funzione non viene mai chiamata da, e non chiama mai, codice
// dello spazio Certificazione (esame, punteggio, attestato) — nessun collegamento, di proposito.
export async function sendTutorMessage(
  text: string,
  locale: Locale = DEFAULT_LOCALE,
  pathId: string = PATH_ID,
  courseId: string = COURSE_ID
): Promise<SendTutorMessageResult> {
  const learnerId = await requireLearnerId();
  const trimmed = text.trim();
  if (!trimmed) return { reply: null };

  await prisma.tutorMessage.create({
    data: { learnerId, pathId, courseId, role: "user", content: trimmed },
  });

  const [priorRows, initialProfile] = await Promise.all([
    prisma.tutorMessage.findMany({
      where: { learnerId, pathId, courseId },
      orderBy: { createdAt: "desc" },
      take: HISTORY_LIMIT,
    }),
    prisma.initialProfile.findUnique({
      where: { learnerId_pathId_courseId: { learnerId, pathId, courseId } },
    }),
  ]);

  const history: ChatTurn[] = priorRows
    .slice()
    .reverse()
    .map((r) => ({ role: r.role as "user" | "assistant", content: r.content }));

  const vakProfile = (initialProfile?.values as VakProfileData | undefined) ?? null;
  const systemPrompt = buildSystemPrompt(vakProfile, locale);

  try {
    const reply = await askClaude(systemPrompt, history);
    await prisma.tutorMessage.create({
      data: { learnerId, pathId, courseId, role: "assistant", content: reply },
    });
    return { reply };
  } catch (err) {
    if (err instanceof AiNotConfiguredError) {
      return { reply: null, error: "not_configured" };
    }
    console.error("Tutor: errore nella chiamata al modello", err);
    return { reply: null, error: "api_error" };
  }
}
