"use client";

import { useState, useTransition } from "react";
import { getTodayRecommendation } from "@/lib/orchestrator/actions";
import { t, type Locale } from "@/lib/i18n/catalog";
import { AI_IN_CONSTRUCTION } from "@/lib/construction";

export function TodayRecommendation({ locale }: { locale: Locale }) {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [error, setError] = useState<"not_configured" | "api_error" | null>(null);
  const [pending, startTransition] = useTransition();

  // D76: parti con l'IA ferme — l'avviso al posto del bottone, nessuna chiamata al modello.
  if (AI_IN_CONSTRUCTION) {
    return (
      <div className="card top-panel" style={{ borderColor: "var(--surface)" }}>
        <h2 style={{ marginTop: 0, fontSize: "1rem" }}>{t("dashboard.orchestratorTitle", locale)}</h2>
        <p className="lede" style={{ fontSize: ".9rem", margin: 0 }}>{t("construction.aiNotice", locale)}</p>
      </div>
    );
  }

  function ask() {
    setError(null);
    startTransition(async () => {
      const result = await getTodayRecommendation(locale);
      if (result.recommendation) setRecommendation(result.recommendation);
      else setError(result.error ?? "api_error");
    });
  }

  return (
    <div className="card top-panel" style={{ borderColor: "var(--surface)" }}>
      <h2 style={{ marginTop: 0, fontSize: "1rem" }}>{t("dashboard.orchestratorTitle", locale)}</h2>
      {!recommendation && !error && (
        <>
          <p className="lede" style={{ fontSize: ".9rem" }}>
            {t("dashboard.orchestratorHint", locale)}
          </p>
          <button type="button" className="btn btn-primary" onClick={ask} disabled={pending}>
            {pending ? t("dashboard.orchestratorPending", locale) : t("dashboard.orchestratorAsk", locale)}
          </button>
        </>
      )}
      <div aria-live="polite">
        {recommendation && <p className="lede" style={{ fontSize: ".95rem", color: "var(--ink)" }}>{recommendation}</p>}
        {error === "not_configured" && (
          <p className="lede" style={{ fontSize: ".9rem" }}>
            {t("dashboard.orchestratorNotConfigured", locale)}
          </p>
        )}
        {error === "api_error" && (
          <p className="lede" style={{ fontSize: ".9rem" }}>
            {t("dashboard.orchestratorError", locale)}{" "}
            <button type="button" className="btn btn-ghost" onClick={ask}>
              {t("dashboard.retry", locale)}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
