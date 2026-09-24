"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentLearner } from "@/lib/auth/session";
import { PATH_ID, COURSE_ID } from "@/lib/constants";
import { computeExamScore, type ExamScoreResult } from "./score";

const TURNO_IDS = ["esame-turno-1", "esame-turno-2", "esame-turno-3"] as const;

export interface AttestatoData {
  available: boolean; // tutti e tre i turni d'esame completati
  learnerName: string;
  completedAt: Date | null; // la più recente fra le tre date di completamento
  result: ExamScoreResult | null;
}

// Ricalcola sempre da zero, dai dati veri in DB — mai da un valore passato dal client:
// il punteggio dell'attestato non è mai qualcosa che il browser può dettare.
export async function loadAttestatoData(): Promise<AttestatoData> {
  const learner = await getCurrentLearner();
  if (!learner) throw new Error("Non autenticato.");

  const [progress, responses] = await Promise.all([
    prisma.progressState.findMany({
      where: { learnerId: learner.id, pathId: PATH_ID, courseId: COURSE_ID, chapterId: { in: [...TURNO_IDS] } },
    }),
    prisma.assessmentResponse.findMany({
      where: { learnerId: learner.id, pathId: PATH_ID, courseId: COURSE_ID, chapterId: { in: [...TURNO_IDS] } },
    }),
  ]);

  const allCompleted = TURNO_IDS.every((id) => progress.find((p) => p.chapterId === id)?.completedAt);
  if (!allCompleted) {
    return { available: false, learnerName: learner.name, completedAt: null, result: null };
  }

  const answersByTurno: Record<string, Record<string, string>> = {
    "esame-turno-1": {},
    "esame-turno-2": {},
    "esame-turno-3": {},
  };
  for (const r of responses) answersByTurno[r.chapterId][r.key] = r.value;

  const completedAt = progress
    .filter((p): p is typeof p & { completedAt: Date } => p.completedAt !== null)
    .map((p) => p.completedAt)
    .sort((a, b) => b.getTime() - a.getTime())[0];

  const result = computeExamScore(answersByTurno["esame-turno-1"], answersByTurno["esame-turno-2"], answersByTurno["esame-turno-3"]);

  return { available: true, learnerName: learner.name, completedAt, result };
}
