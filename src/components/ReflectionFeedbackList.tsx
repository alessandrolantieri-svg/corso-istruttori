"use client";

import { useState, useTransition } from "react";
import { getReflectionFeedback, type ReflectionItem } from "@/lib/feedback/actions";
import { checkReflectionAgainstMethod } from "@/lib/method-guardian/actions";
import type { Locale } from "@/lib/i18n/catalog";
import { t } from "@/lib/i18n/catalog";

interface LensState {
  pending: boolean;
  result?: string;
  error?: "not_configured" | "api_error";
}

interface ItemState {
  feedback?: LensState;
  guardian?: LensState;
}

function itemKey(chapterId: string, key: string): string {
  return `${chapterId}:${key}`;
}

function Lens({
  label,
  pendingLabel,
  notConfiguredLabel,
  somethingWrongLabel,
  retryLabel,
  state,
  onAsk,
}: {
  label: string;
  pendingLabel: string;
  notConfiguredLabel: string;
  somethingWrongLabel: string;
  retryLabel: string;
  state: LensState | undefined;
  onAsk: () => void;
}) {
  if (!state?.result && !state?.error) {
    return (
      <button type="button" className="btn btn-ghost" onClick={onAsk} disabled={state?.pending}>
        {state?.pending ? pendingLabel : label}
      </button>
    );
  }
  return (
    <div aria-live="polite">
      {state.result && (
        <div className="feedback ok" style={{ marginTop: 4 }}>
          {state.result}
        </div>
      )}
      {state.error === "not_configured" && (
        <div className="feedback retry" style={{ marginTop: 4 }}>
          {notConfiguredLabel}
        </div>
      )}
      {state.error === "api_error" && (
        <div className="feedback retry" style={{ marginTop: 4 }}>
          {somethingWrongLabel}{" "}
          <button type="button" className="btn btn-ghost" onClick={onAsk}>
            {retryLabel}
          </button>
        </div>
      )}
    </div>
  );
}

export function ReflectionFeedbackList({ items, locale }: { items: ReflectionItem[]; locale: Locale }) {
  const [state, setState] = useState<Record<string, ItemState>>({});
  const [, startTransition] = useTransition();

  function askFeedback(item: ReflectionItem) {
    const k = itemKey(item.chapterId, item.key);
    setState((prev) => ({ ...prev, [k]: { ...prev[k], feedback: { pending: true } } }));
    startTransition(async () => {
      const result = await getReflectionFeedback(item.chapterId, item.key, locale);
      setState((prev) => ({
        ...prev,
        [k]: { ...prev[k], feedback: { pending: false, result: result.feedback ?? undefined, error: result.error as LensState["error"] } },
      }));
    });
  }

  function askGuardian(item: ReflectionItem) {
    const k = itemKey(item.chapterId, item.key);
    setState((prev) => ({ ...prev, [k]: { ...prev[k], guardian: { pending: true } } }));
    startTransition(async () => {
      const result = await checkReflectionAgainstMethod(item.chapterId, item.key, locale);
      setState((prev) => ({
        ...prev,
        [k]: { ...prev[k], guardian: { pending: false, result: result.check ?? undefined, error: result.error as LensState["error"] } },
      }));
    });
  }

  if (items.length === 0) {
    return (
      <p className="lede">
        {t("riflessioni.empty", locale)}
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {items.map((item) => {
        const k = itemKey(item.chapterId, item.key);
        const s = state[k];
        return (
          <div className="card" key={k}>
            <div className="day-tag" style={{ marginBottom: 6 }}>
              {item.sourceLabel}
            </div>
            <p style={{ fontStyle: "italic", margin: "0 0 10px" }}>«{item.text}»</p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Lens
                label={t("riflessioni.askFeedback", locale)}
                pendingLabel={t("riflessioni.askingFeedback", locale)}
                notConfiguredLabel={t("riflessioni.feedbackNotConfigured", locale)}
                somethingWrongLabel={t("riflessioni.somethingWrong", locale)}
                retryLabel={t("riflessioni.retry", locale)}
                state={s?.feedback}
                onAsk={() => askFeedback(item)}
              />
              <Lens
                label={t("riflessioni.askGuardian", locale)}
                pendingLabel={t("riflessioni.askingGuardian", locale)}
                notConfiguredLabel={t("riflessioni.guardianNotConfigured", locale)}
                somethingWrongLabel={t("riflessioni.somethingWrong", locale)}
                retryLabel={t("riflessioni.retry", locale)}
                state={s?.guardian}
                onAsk={() => askGuardian(item)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
