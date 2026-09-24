"use client";

import { useState, useTransition } from "react";
import { sendTutorMessage, type TutorMessageView } from "@/lib/tutor/actions";
import { markTutorUsed } from "@/lib/tutor/clientSignal";
import type { Locale } from "@/lib/i18n/catalog";
import { t } from "@/lib/i18n/catalog";
import { DictationButton } from "@/components/DictationButton";

interface DisplayMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

function toDisplay(m: TutorMessageView): DisplayMessage {
  return { id: m.id, role: m.role, content: m.content };
}

export function TutorChat({ initialMessages, locale }: { initialMessages: TutorMessageView[]; locale: Locale }) {
  const [messages, setMessages] = useState<DisplayMessage[]>(initialMessages.map(toDisplay));
  const [input, setInput] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || pending) return;

    const userMsg: DisplayMessage = { id: `local-${Date.now()}`, role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    // Segna "aiuto chiesto" nel momento in cui l'istruttore invia il messaggio, non quando
    // arriva la risposta — è la richiesta d'aiuto che conta per FASE 8, non l'esito.
    markTutorUsed();

    startTransition(async () => {
      const result = await sendTutorMessage(text, locale);
      if (result.error === "not_configured") {
        setMessages((prev) => [
          ...prev,
          {
            id: `system-${Date.now()}`,
            role: "system",
            content: t("tutor.notConfigured", locale),
          },
        ]);
      } else if (result.error === "api_error") {
        setMessages((prev) => [
          ...prev,
          { id: `system-${Date.now()}`, role: "system", content: t("tutor.apiError", locale) },
        ]);
      } else if (result.reply) {
        setMessages((prev) => [...prev, { id: `reply-${Date.now()}`, role: "assistant", content: result.reply as string }]);
      }
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      <div role="log" aria-live="polite" style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        {messages.length === 0 && (
          <p className="lede" style={{ fontSize: ".9rem" }}>
            {t("tutor.emptyHint", locale)}
          </p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={m.role === "system" ? "feedback retry" : "card"}
            style={
              m.role === "user"
                ? { background: "var(--foam)", alignSelf: "flex-end", maxWidth: "85%" }
                : m.role === "assistant"
                  ? { maxWidth: "85%" }
                  : undefined
            }
          >
            {m.role !== "system" && (
              <div className="day-tag" style={{ marginBottom: 4 }}>
                {m.role === "user" ? t("tutor.you", locale) : t("tutor.tutorLabel", locale)}
              </div>
            )}
            <p style={{ margin: 0, whiteSpace: "pre-wrap", maxWidth: "none" }}>{m.content}</p>
          </div>
        ))}
        {pending && (
          <div className="card" style={{ maxWidth: "85%" }}>
            <div className="day-tag" style={{ marginBottom: 4 }}>
              {t("tutor.tutorLabel", locale)}
            </div>
            <p className="lede" style={{ margin: 0 }} aria-hidden="true">
              …
            </p>
            <span className="sr-only">{t("tutor.typing", locale)}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginTop: "auto" }}>
        <textarea
          className="field"
          style={{ flex: 1, minHeight: 44 }}
          placeholder={t("tutor.placeholder", locale)}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <DictationButton
          locale={locale}
          onTranscript={(text) => setInput((prev) => (prev.trim() ? `${prev.trim()} ${text}` : text))}
        />
        <button type="submit" className="btn btn-primary" style={{ flex: "0 0 90px" }} disabled={pending || !input.trim()}>
          {t("tutor.send", locale)}
        </button>
      </form>
    </div>
  );
}
