import Link from "next/link";
import { requireLearner } from "@/lib/auth/requireLearner";
import { loadAllProgress } from "@/lib/progressActions";
import { percorsoTestChapters, PERCORSO_TEST_CHAPTER_NUMS } from "@/lib/percorso-test/registry";
import { PERCORSO_TEST_PATH_ID, PERCORSO_TEST_COURSE_ID } from "@/lib/percorso-test/constants";

// Dashboard minima del percorso di prova — dimostra che loadAllProgress/loadChapterState
// funzionano identici sotto un pathId/courseId diverso da quello nuoto, non un secondo prodotto.
export default async function PercorsoTestDashboardPage() {
  const learner = await requireLearner();
  const progressRows = await loadAllProgress(PERCORSO_TEST_PATH_ID, PERCORSO_TEST_COURSE_ID);
  const progressByChapter = new Map(progressRows.map((p) => [p.chapterId, p]));

  return (
    <div className="app">
      <div className="topbar">
        <Link
          href="/dashboard"
          className="wordmark"
          style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: 6 }}
          aria-label="Torna alla Dashboard"
        >
          <i className="ph-duotone ph-house" aria-hidden="true" />
          La Chiave Giusta
        </Link>
      </div>

      <div className="stage">
        <div className="eyebrow">Percorso di prova · verifica tecnica</div>
        <h1>Ciao, {learner.name}</h1>
        <div className="card warn">
          Questo percorso non è un prodotto reale — esiste solo per verificare che la piattaforma
          regga un secondo percorso (D23) sullo stesso schema e sullo stesso motore del corso nuoto.
        </div>

        {PERCORSO_TEST_CHAPTER_NUMS.map((num) => {
          const def = percorsoTestChapters[num];
          const progress = progressByChapter.get(def.chapterId);
          const label = progress?.completedAt ? "Rivedi — completato ✓" : progress ? "Continua ▸" : "Inizia ▸";

          return (
            <div className="card" key={num}>
              <h2 style={{ marginTop: 0, fontSize: "1rem" }}>{def.title}</h2>
              <p className="lede" style={{ fontSize: ".9rem" }}>
                {progress?.completedAt ? "Completato." : progress ? `Sei allo step ${progress.currentStep + 1}.` : "Non ancora iniziato."}
              </p>
              <Link href={`/percorso-test/capitoli/${num}`} className="btn btn-primary" style={{ display: "block", textAlign: "center" }}>
                {label}
              </Link>
            </div>
          );
        })}

        <Link href="/dashboard" className="btn btn-ghost" style={{ display: "block", textAlign: "center", marginTop: 16 }}>
          Torna al percorso nuoto
        </Link>
      </div>
    </div>
  );
}
