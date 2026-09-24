import Link from "next/link";
import { requireLearner } from "@/lib/auth/requireLearner";
import { prisma } from "@/lib/prisma";
import { logout } from "@/app/login/actions";
import { PATH_ID, COURSE_ID } from "@/lib/constants";
import { chapters, CHAPTER_NUMS } from "@/lib/chapters/registry";
import { chaptersForLocale } from "@/lib/chapters/byLocale";
import { isChapterUnlocked } from "@/lib/chapters/unlock";
import { examTurns, EXAM_NUMS } from "@/lib/exam/registry";
import { examTurnsForLocale } from "@/lib/exam/byLocale";
import { isExamTurnUnlocked } from "@/lib/exam/unlock";
import { CASO_NUMS } from "@/lib/casi-reali/registry";
import { casiRealiForLocale } from "@/lib/casi-reali/byLocale";
import { VakBars } from "@/components/VakBars";
import { vakNounForLocale, type VakChannel } from "@/lib/vak";
import { getLocale } from "@/lib/i18n/locale";
import { getA11yMode } from "@/lib/a11y/settings";
import { t } from "@/lib/i18n/catalog";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { AccessibilityToggle } from "@/components/AccessibilityToggle";
import { TodayRecommendation } from "@/components/TodayRecommendation";
import { DashboardTabs, type DashboardTabDef } from "@/components/DashboardTabs";
import { DesktopChapterShell } from "@/components/desktop/DesktopChapterShell";
import { AI_IN_CONSTRUCTION } from "@/lib/construction";

// Icona per capitolo (README pacchetto grafico §2: un glifo Phosphor per ciascuno dei 10).
const CHAPTER_ICONS: Record<string, string> = {
  "1": "user",
  "2": "users",
  "3": "binoculars",
  "4": "waves",
  "5": "chat-circle-text",
  "6": "person-simple-swim",
  "7": "arrow-counter-clockwise",
  "8": "signpost",
  "9": "hand-palm",
  "10": "paper-plane-tilt",
};

export default async function DashboardPage() {
  const learner = await requireLearner();
  const [locale, a11yMode] = await Promise.all([getLocale(), getA11yMode()]);
  const localizedChapters = chaptersForLocale(locale);
  const localizedExamTurns = examTurnsForLocale(locale);
  const localizedCasiReali = casiRealiForLocale(locale);

  const [progressRows, profile] = await Promise.all([
    prisma.progressState.findMany({
      where: { learnerId: learner.id, pathId: PATH_ID, courseId: COURSE_ID },
    }),
    prisma.initialProfile.findUnique({
      where: { learnerId_pathId_courseId: { learnerId: learner.id, pathId: PATH_ID, courseId: COURSE_ID } },
    }),
  ]);

  const progressByChapter = new Map(progressRows.map((p) => [p.chapterId, p]));
  const completedChapterIds = new Set(progressRows.filter((p) => p.completedAt).map((p) => p.chapterId));
  const vakValues = profile?.values as { mostra: number; dire: number; sentire: number; prevalente: VakChannel } | undefined;

  const current = CHAPTER_NUMS.find((num) => {
    const p = progressByChapter.get(chapters[num].chapterId);
    return !p?.completedAt;
  }) ?? CHAPTER_NUMS[CHAPTER_NUMS.length - 1];

  const statusLabel = (progress: { completedAt: Date | null; currentStep: number } | undefined) =>
    progress?.completedAt
      ? t("dashboard.completed", locale)
      : progress
        ? `${t("dashboard.atStep", locale)} ${progress.currentStep + 1}.`
        : t("dashboard.notStarted", locale);

  const actionLabel = (progress: { completedAt: Date | null } | undefined) =>
    progress?.completedAt ? t("dashboard.reviewCompleted", locale) : progress ? t("dashboard.continue", locale) : t("dashboard.start", locale);

  const currentDef = localizedChapters[current];
  const currentProgress = progressByChapter.get(currentDef.chapterId);
  const currentTotalSteps = currentDef.steps.length;
  const currentPct = currentProgress?.completedAt
    ? 100
    : currentProgress
      ? Math.round(((currentProgress.currentStep + 1) / currentTotalSteps) * 100)
      : 0;

  const capitoliPanel = (
    <div className="grid3">
      {CHAPTER_NUMS.map((num) => {
        const def = localizedChapters[num];
        const progress = progressByChapter.get(def.chapterId);
        const isDone = !!progress?.completedAt;
        const isCurrent = num === current;
        const unlocked = isChapterUnlocked(num, completedChapterIds);
        const isLast = num === CHAPTER_NUMS[CHAPTER_NUMS.length - 1];

        const meta = !unlocked ? (
          <span className="tile-meta" title={`${t("dashboard.chapterUnlockPrefix", locale)} ${Number(num) - 1}.`}>
            <i className="ph-duotone ph-lock" aria-hidden="true" />
            {t("dashboard.chapterPrefix", locale)} {Number(num) - 1}
          </span>
        ) : isDone ? (
          <span className="tile-meta good">
            <i className="ph-duotone ph-check" aria-hidden="true" />
            {t("dashboard.completed", locale)}
          </span>
        ) : isCurrent ? (
          <span className="tile-meta" style={{ color: "var(--section, var(--surface))" }}>
            <i className="ph-duotone ph-play" aria-hidden="true" />
            {t("dashboard.atStep", locale)} {(progress?.currentStep ?? 0) + 1}
          </span>
        ) : (
          <span className="tile-meta">
            <i className="ph-duotone ph-circle-dashed" aria-hidden="true" />
            {t("dashboard.notStarted", locale)}
          </span>
        );

        const tileClass = `tile pressable${isCurrent && unlocked && !isDone ? " active" : ""}${!unlocked ? " locked" : ""}${isLast ? " tile-full" : ""}`;
        const iconEl = (
          <div className="icon-sq sm" style={unlocked ? { background: "color-mix(in srgb, var(--section, var(--surface)) 14%, #fff)", color: "var(--section, var(--surface))" } : undefined}>
            <i className={`ph-duotone ph-${!unlocked ? "lock" : CHAPTER_ICONS[num]}`} aria-hidden="true" />
          </div>
        );

        if (isLast) {
          return (
            <Link href={unlocked ? `/capitoli/${num}` : "#"} key={num} className={tileClass} data-chapter={num} aria-disabled={!unlocked}>
              {iconEl}
              <div className="row-body">
                <div className="tile-title">
                  {t("dashboard.chapterPrefix", locale)} {num} · {def.title}
                </div>
                {meta}
              </div>
            </Link>
          );
        }

        return (
          <Link href={unlocked ? `/capitoli/${num}` : "#"} key={num} className={tileClass} data-chapter={num} aria-disabled={!unlocked}>
            {iconEl}
            <div className="tile-title">
              {num} · {def.title}
            </div>
            {meta}
          </Link>
        );
      })}
    </div>
  );

  const esamePanel = (
    <div className="list">
      {EXAM_NUMS.map((turno) => {
        const def = localizedExamTurns[turno];
        const progress = progressByChapter.get(def.chapterId);
        const unlocked = isExamTurnUnlocked(turno, completedChapterIds);
        const isDone = !!progress?.completedAt;

        return (
          <Link href={unlocked ? `/esame/${turno}` : "#"} key={`esame-${turno}`} className="row pressable" aria-disabled={!unlocked}>
            <div className={`status ${!unlocked ? "lock" : isDone ? "done" : progress ? "now" : "todo"}`}>
              <i
                className={`ph-duotone ph-${!unlocked ? "lock" : isDone ? "check" : progress ? "play" : "circle-dashed"}`}
                aria-hidden="true"
                style={isDone && unlocked ? { color: "#fff" } : undefined}
              />
            </div>
            <div className="row-body">
              <div className="row-title">
                {t("dashboard.turnoPrefix", locale)} {turno} · {def.title}
              </div>
              <div className="row-meta">
                {unlocked
                  ? statusLabel(progress)
                  : turno === "1"
                    ? t("dashboard.examLockAllChapters", locale)
                    : `${t("dashboard.examLockPrevTurno", locale)} ${Number(turno) - 1}.`}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );

  const casiRealiPanel = (
    <>
      <p className="lede" style={{ fontSize: ".85rem", textAlign: "center", marginTop: 6 }}>
        {t("dashboard.casiRealiHint", locale)}
      </p>
      <div className="list">
        {CASO_NUMS.map((n) => {
          const def = localizedCasiReali[n];
          const progress = progressByChapter.get(def.chapterId);
          const isDone = !!progress?.completedAt;

          return (
            <Link href={`/casi-reali/${n}`} key={`caso-${n}`} className={`row pressable${isDone ? " tint-good" : ""}`}>
              <div className={`status ${isDone ? "done" : progress ? "now" : "todo"}`}>
                <i
                  className={`ph-duotone ph-${isDone ? "check" : progress ? "play" : "circle-dashed"}`}
                  aria-hidden="true"
                  style={isDone ? { color: "#fff" } : undefined}
                />
              </div>
              <div className="row-body">
                <div className="row-title">{def.title}</div>
                <div className="row-meta">{statusLabel(progress)}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );

  const profiloPanel = vakValues ? (
    <>
      <VakBars vak={vakValues} locale={locale} />
      <p className="lede" style={{ fontSize: ".85rem", marginTop: -6, textAlign: "center" }}>
        {t("dashboard.profilePrevalence", locale)} {vakNounForLocale(vakValues.prevalente, locale)}.
      </p>
    </>
  ) : (
    <p className="lede" style={{ textAlign: "center" }}>
      {t("dashboard.profileNotYet", locale)}
    </p>
  );

  const dashboardTabs: DashboardTabDef[] = [
    { id: "capitoli", label: t("dashboard.chaptersTitle", locale), panel: capitoliPanel },
    { id: "esame", label: t("dashboard.examTitle", locale), panel: esamePanel },
    { id: "casi-reali", label: t("dashboard.casiRealiTitle", locale), panel: casiRealiPanel },
    { id: "profilo", label: t("dashboard.profileTitle", locale), panel: profiloPanel },
  ];

  return (
    <DesktopChapterShell locale={locale} currentKind="dashboard" currentNum="">
    <div className="app">
      <header className="dash-head">
        <div className="dash-head-top">
          <span className="wordmark">La Chiave Giusta</span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <LocaleSwitcher locale={locale} path="/dashboard" />
              <form action={logout}>
                <button type="submit" className="pill" style={{ border: "1.5px solid rgba(255,255,255,.5)", cursor: "pointer" }}>
                  {t("dashboard.logout", locale)}
                </button>
              </form>
            </div>
            <AccessibilityToggle mode={a11yMode} path="/dashboard" locale={locale} />
          </div>
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", opacity: 0.85 }}>
          {t("dashboard.greeting", locale)}, {learner.name}
        </span>
        <h1>{t("dashboard.title", locale)}</h1>
        <p>{t("dashboard.tagline", locale)}</p>
      </header>

      <main className="stage" style={{ paddingTop: 14 }}>
        <TodayRecommendation locale={locale} />

        <div className="card card-evid top-panel" data-chapter={current}>
          <div className="evid-top">
            <div className="icon-sq lg">
              <i className={`ph-duotone ph-${CHAPTER_ICONS[current]}`} aria-hidden="true" />
            </div>
            <div className="evid-label">
              {t("dashboard.chapterPrefix", locale)} {current}
            </div>
            <div className="evid-title">{currentDef.title}</div>
            <div className="evid-meta">{statusLabel(currentProgress)}</div>
            <div className="progress">
              <span style={{ width: `${currentPct}%` }} />
            </div>
          </div>
          <Link href={`/capitoli/${current}`} className="btn btn-primary pressable" style={{ marginTop: 10, display: "block" }}>
            {actionLabel(currentProgress)}
          </Link>
        </div>

        <div className="list">
          <Link href="/assistente" className="row top-panel pressable">
            <div className="icon-sq md" style={{ background: "color-mix(in srgb, var(--c-teal) 14%, #fff)", color: "var(--c-teal)" }}>
              <i className="ph-duotone ph-chats-circle" aria-hidden="true" />
            </div>
            <div className="row-body">
              <div className="row-title">{t("dashboard.assistantTitle", locale)}</div>
              <div className="row-meta">
                {AI_IN_CONSTRUCTION ? t("construction.aiNotice", locale) : t("dashboard.assistantHint", locale)}
              </div>
            </div>
            <i className="ph-duotone ph-arrow-right chev" aria-hidden="true" />
          </Link>
        </div>

        <DashboardTabs tabs={dashboardTabs} />

        {EXAM_NUMS.every((turno) => completedChapterIds.has(examTurns[turno].chapterId)) && (
          <>
            <div className="section-label">{t("dashboard.attestatoTitle", locale)}</div>
            <div className="card">
              <p className="lede" style={{ marginBottom: 12 }}>
                {t("dashboard.attestatoReady", locale)}
              </p>
              <Link href="/attestato" className="btn btn-primary pressable" style={{ display: "block", textAlign: "center" }}>
                {t("dashboard.attestatoLink", locale)}
              </Link>
            </div>
          </>
        )}

        <p className="lede" style={{ fontSize: ".78rem", marginTop: 40, opacity: 0.6, textAlign: "center" }}>
          <Link href="/percorso-test/dashboard" style={{ color: "inherit" }}>
            {t("dashboard.percorsoTestLink", locale)}
          </Link>
        </p>
      </main>
    </div>
    </DesktopChapterShell>
  );
}
