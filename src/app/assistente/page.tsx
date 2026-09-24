import Link from "next/link";
import { requireLearner } from "@/lib/auth/requireLearner";
import { loadTutorHistory } from "@/lib/tutor/actions";
import { TutorChat } from "@/components/TutorChat";
import { loadReflectionsForFeedback } from "@/lib/feedback/actions";
import { ReflectionFeedbackList } from "@/components/ReflectionFeedbackList";
import { loadProgressStats } from "@/lib/progress-agent/actions";
import { ProgressNarrative } from "@/components/ProgressNarrative";
import { DashboardTabs, type DashboardTabDef } from "@/components/DashboardTabs";
import { DesktopChapterShell } from "@/components/desktop/DesktopChapterShell";
import { AI_IN_CONSTRUCTION } from "@/lib/construction";
import { getLocale } from "@/lib/i18n/locale";
import { t } from "@/lib/i18n/catalog";

// Prima tre pagine separate (/tutor, /riflessioni, /progresso) con lo stesso tono e la stessa
// garanzia ("non entra mai nell'esame") — un solo punto d'accesso, tre schede dentro, invece di
// tre righe quasi identiche in Dashboard. Ogni scheda apre con una riga che dice esattamente
// cosa fa, prima del contenuto vero — chi entra sa subito a cosa serve.
export default async function AssistentePage() {
  await requireLearner();
  const locale = await getLocale();

  // D76: finché le parti con l'IA sono ferme, niente schede e niente chiamate al modello —
  // solo l'avviso, così chi prova l'app non trova un errore.
  if (AI_IN_CONSTRUCTION) {
    return (
      <DesktopChapterShell locale={locale} currentKind="assistente" currentNum="">
      <div className="app">
        <header className="topbar">
          <Link
            href="/dashboard"
            className="wordmark"
            style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: 6 }}
            aria-label={t("nav.backToDashboard", locale)}
          >
            <i className="ph-duotone ph-house" aria-hidden="true" />
            La Chiave Giusta
          </Link>
        </header>
        <main className="stage">
          <h1>{t("assistente.title", locale)}</h1>
          <div className="card">
            <p className="lede" style={{ margin: 0 }}>{t("construction.aiNotice", locale)}</p>
          </div>
        </main>
      </div>
      </DesktopChapterShell>
    );
  }

  const [tutorMessages, reflectionItems, progressStats] = await Promise.all([
    loadTutorHistory(),
    loadReflectionsForFeedback(locale),
    loadProgressStats(locale),
  ]);

  const tutorPanel = (
    <>
      <p className="lede" style={{ marginBottom: 14 }}>
        {t("dashboard.tutorHint", locale)}
      </p>
      <TutorChat initialMessages={tutorMessages} locale={locale} />
    </>
  );

  const riflessioniPanel = (
    <>
      <p className="lede" style={{ marginBottom: 20 }}>
        {t("riflessioni.hint", locale)}
      </p>
      <ReflectionFeedbackList items={reflectionItems} locale={locale} />
    </>
  );

  const progressoPanel = (
    <>
      <p className="lede" style={{ marginBottom: 14 }}>
        {t("dashboard.progressHint", locale)}
      </p>
      {progressStats.length === 0 ? (
        <p className="lede">{t("progresso.empty", locale)}</p>
      ) : (
        <>
          <div className="card">
            {progressStats.map((s) => (
              <div className="result-row" key={s.chapterId}>
                <span className="comp">{s.title}</span>
                <span className="esito">
                  {s.correct}/{s.total} {t("progresso.correctSuffix", locale)}
                  {s.tutorAssisted > 0 && (
                    <span className="day-tag" style={{ marginLeft: 8 }}>
                      {s.tutorAssisted} {t("progresso.tutorAssistedSuffix", locale)}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
          <p className="lede" style={{ fontSize: ".85rem", marginBottom: 20 }}>
            {t("progresso.footnote", locale)}
          </p>
          <ProgressNarrative locale={locale} />
        </>
      )}
    </>
  );

  const tabs: DashboardTabDef[] = [
    { id: "tutor", label: t("dashboard.tutorTitle", locale), panel: tutorPanel },
    { id: "riflessioni", label: t("dashboard.feedbackTitle", locale), panel: riflessioniPanel },
    { id: "progresso", label: t("dashboard.progressTitle", locale), panel: progressoPanel },
  ];

  return (
    <DesktopChapterShell locale={locale} currentKind="assistente" currentNum="">
    <div className="app">
      <header className="topbar">
        <Link
          href="/dashboard"
          className="wordmark"
          style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: 6 }}
          aria-label={t("nav.backToDashboard", locale)}
        >
          <i className="ph-duotone ph-house" aria-hidden="true" />
          La Chiave Giusta
        </Link>
      </header>

      <main className="stage" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <h1>{t("assistente.title", locale)}</h1>
        <DashboardTabs tabs={tabs} />
      </main>
    </div>
    </DesktopChapterShell>
  );
}
