import { notFound } from "next/navigation";
import { requireLearner } from "@/lib/auth/requireLearner";
import { loadChapterState } from "@/lib/progressActions";
import { percorsoTestChapters } from "@/lib/percorso-test/registry";
import { PERCORSO_TEST_PATH_ID, PERCORSO_TEST_COURSE_ID } from "@/lib/percorso-test/constants";
import { ChapterRunner } from "@/components/ChapterRunner";

// Percorso di prova (verifica tecnica D23) — nessuno sblocco: un solo capitolo segnaposto, non
// serve la stessa logica sequenziale del corso nuoto.
export default async function PercorsoTestChapterPage({ params }: { params: Promise<{ num: string }> }) {
  await requireLearner();
  const { num } = await params;

  const def = percorsoTestChapters[num];
  if (!def) notFound();

  const state = await loadChapterState(def.chapterId, PERCORSO_TEST_PATH_ID, PERCORSO_TEST_COURSE_ID);

  return <ChapterRunner kind="percorso-test" num={num} initialState={state} />;
}
