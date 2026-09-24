"use client";

import { useState, useTransition } from "react";
import { getProgressNarrative } from "@/lib/progress-agent/actions";
import type { Locale } from "@/lib/i18n/catalog";
import { t } from "@/lib/i18n/catalog";

export function ProgressNarrative({ locale }: { locale: Locale }) {
  const [narrative, setNarrative] = useState<string | null>(null);
  const [error, setError] = useState<"not_configured" | "api_error" | null>(null);
  const [pending, startTransition] = useTransition();

  function ask() {
    setError(null);
    startTransition(async () => {
      const result = await getProgressNarrative(locale);
      if (result.narrative) setNarrative(result.narrative);
      else setError(result.error ?? "api_error");
    });
  }

  return (
    <div>
      {!narrative && !error && (
        <button type="button" className="btn btn-primary" onClick={ask} disabled={pending}>
          {pending ? t("progresso.generating", locale) : t("progresso.generate", locale)}
        </button>
      )}
      <div aria-live="polite">
        {narrative && <div className="feedback ok">{narrative}</div>}
        {error === "not_configured" && (
          <div className="feedback retry">
            {t("progresso.notConfigured", locale)}
          </div>
        )}
        {error === "api_error" && (
          <div className="feedback retry">
            {t("riflessioni.somethingWrong", locale)}{" "}
            <button type="button" className="btn btn-ghost" onClick={ask}>
              {t("riflessioni.retry", locale)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
