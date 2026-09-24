"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentLearner } from "@/lib/auth/session";
import { PATH_ID, COURSE_ID } from "@/lib/constants";

async function requireLearnerId(): Promise<string> {
  const learner = await getCurrentLearner();
  if (!learner) throw new Error("Non autenticato.");
  return learner.id;
}

// pathId/courseId sono parametri opzionali, non una tabella Path/Course separata (D23: "una
// scelta a basso rischio quando arriverà il secondo percorso" — questo è quel momento). Il
// default resta il percorso nuoto, quindi ogni chiamata esistente (capitoli/esame/Casi Reali)
// continua a funzionare senza modifiche; un secondo percorso passa semplicemente valori diversi.

// currentStep aggiornato ad ogni avanti/indietro — è come il progresso resiste al reload.
export async function saveStep(chapterId: string, step: number, pathId: string = PATH_ID, courseId: string = COURSE_ID): Promise<void> {
  const learnerId = await requireLearnerId();
  await prisma.progressState.upsert({
    where: {
      learnerId_pathId_courseId_chapterId: { learnerId, pathId, courseId, chapterId },
    },
    create: { learnerId, pathId, courseId, chapterId, currentStep: step },
    update: { currentStep: step },
  });
}

export async function markChapterCompleted(chapterId: string, pathId: string = PATH_ID, courseId: string = COURSE_ID): Promise<void> {
  const learnerId = await requireLearnerId();
  await prisma.progressState.update({
    where: {
      learnerId_pathId_courseId_chapterId: { learnerId, pathId, courseId, chapterId },
    },
    data: { completedAt: new Date() },
  });
}

// Spazio Certificazione — risposte chiuse/valutabili (quiz, test).
export async function saveResponse(
  chapterId: string,
  key: string,
  value: string,
  isCorrect?: boolean,
  tutorAssisted?: boolean,
  pathId: string = PATH_ID,
  courseId: string = COURSE_ID
): Promise<void> {
  const learnerId = await requireLearnerId();
  await prisma.assessmentResponse.upsert({
    where: {
      learnerId_pathId_courseId_chapterId_key: { learnerId, pathId, courseId, chapterId, key },
    },
    create: { learnerId, pathId, courseId, chapterId, key, value, isCorrect: isCorrect ?? null, tutorAssisted: tutorAssisted ?? null },
    update: { value, isCorrect: isCorrect ?? null, tutorAssisted: tutorAssisted ?? null },
  });
}

// Spazio Mentoring — riflessioni libere. Tabella separata da AssessmentResponse per costruzione
// (Muro 1, D23): nessun percorso di codice della Certificazione ha motivo di leggere questa.
export async function saveReflection(
  chapterId: string,
  key: string,
  text: string,
  pathId: string = PATH_ID,
  courseId: string = COURSE_ID
): Promise<void> {
  const learnerId = await requireLearnerId();
  await prisma.freeReflection.upsert({
    where: {
      learnerId_pathId_courseId_chapterId_key: { learnerId, pathId, courseId, chapterId, key },
    },
    create: { learnerId, pathId, courseId, chapterId, key, text },
    update: { text },
  });
}

// Tutte le righe di progresso dell'istruttore corrente su un percorso — usata sia dalla
// Dashboard (per mostrare lo stato di ognuno) sia dal blocco sequenziale (per sapere se il
// capitolo precedente è stato completato prima di aprire questo).
export async function loadAllProgress(pathId: string = PATH_ID, courseId: string = COURSE_ID) {
  const learnerId = await requireLearnerId();
  return prisma.progressState.findMany({
    where: { learnerId, pathId, courseId },
  });
}

export interface VakProfileData {
  mostra: number;
  dire: number;
  sentire: number;
  prevalente: "mostra" | "dire" | "sentire";
}

export async function loadChapterState(chapterId: string, pathId: string = PATH_ID, courseId: string = COURSE_ID) {
  const learnerId = await requireLearnerId();
  const where = { learnerId, pathId, courseId, chapterId };

  const [progress, responses, reflections, initialProfile] = await Promise.all([
    prisma.progressState.findUnique({ where: { learnerId_pathId_courseId_chapterId: where } }),
    prisma.assessmentResponse.findMany({ where }),
    prisma.freeReflection.findMany({ where }),
    prisma.initialProfile.findUnique({
      where: { learnerId_pathId_courseId: { learnerId, pathId, courseId } },
    }),
  ]);

  const answers: Record<string, string> = {};
  for (const r of responses) answers[r.key] = r.value;
  for (const r of reflections) answers[r.key] = r.text;

  return {
    step: progress?.currentStep ?? 0,
    answers,
    completedAt: progress?.completedAt?.toISOString() ?? null,
    // Il profilo VAK è calcolato una sola volta al Capitolo 1 (FASE 8 §3) e da lì in avanti è
    // dato di sola lettura per ogni capitolo — reale, non più il valore finto ereditato che
    // usavano i mockup statici. Su un percorso diverso da quello nuoto resta null: un profilo
    // iniziale è un concetto per-percorso, non garantito altrove.
    vakProfile: (initialProfile?.values as VakProfileData | undefined) ?? null,
  };
}
