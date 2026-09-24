"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentLearner } from "@/lib/auth/session";
import { computeVak, vakIsComplete } from "@/lib/vak";
import { PATH_ID, COURSE_ID } from "@/lib/constants";

const CHAPTER_1_ID = "capitolo-1";

// Calcola il profilo VAK leggendo le risposte già salvate su DB (mai fidandosi del client),
// e lo scrive solo se non esiste già — il vincolo @unique su (learnerId,pathId,courseId) è la
// garanzia tecnica di "si calcola una sola volta, non si ricalcola mai più" (FASE 8 §3).
export async function computeVakProfile(): Promise<void> {
  const learner = await getCurrentLearner();
  if (!learner) throw new Error("Non autenticato.");
  const learnerId = learner.id;

  const existing = await prisma.initialProfile.findUnique({
    where: { learnerId_pathId_courseId: { learnerId, pathId: PATH_ID, courseId: COURSE_ID } },
  });
  if (existing) return;

  const rows = await prisma.assessmentResponse.findMany({
    where: {
      learnerId,
      pathId: PATH_ID,
      courseId: COURSE_ID,
      chapterId: CHAPTER_1_ID,
      key: { in: ["v1", "v2", "v3", "v4", "v5", "v6"] },
    },
  });

  const answers: Record<string, string> = {};
  for (const r of rows) answers[r.key] = r.value;

  if (!vakIsComplete(answers as never)) return;

  const result = computeVak(answers as never);

  await prisma.initialProfile.create({
    data: {
      learnerId,
      pathId: PATH_ID,
      courseId: COURSE_ID,
      kind: "vak",
      values: { mostra: result.mostra, dire: result.dire, sentire: result.sentire, prevalente: result.prevalente },
      rawAnswers: answers,
    },
  });
}
