"use client";

import { useEffect, useRef, useState } from "react";
import { getSttProvider, type SttError } from "@/lib/voice/sttProvider";
import { speechLangForLocale } from "@/lib/voice/settings";
import { t, type Locale } from "@/lib/i18n/catalog";

type DictationState = "idle" | "listening" | "error";

// Bottone microfono riutilizzabile — non sa nulla di dove finisce il testo, chiama solo
// `onTranscript` col risultato. Non tiene una registrazione: il browser cattura, riconosce e
// restituisce solo la trascrizione (spec voice-first §29, privacy — niente da conservare).
export function DictationButton({
  locale,
  onTranscript,
}: {
  locale: Locale;
  onTranscript: (text: string) => void;
}) {
  const [supported, setSupported] = useState(false);
  const [state, setState] = useState<DictationState>("idle");
  const [error, setError] = useState<SttError | null>(null);
  const provider = useRef(getSttProvider());

  useEffect(() => {
    setSupported(provider.current.supported);
  }, []);

  useEffect(() => {
    return () => {
      provider.current.cancel();
    };
  }, []);

  function toggle() {
    if (state === "listening") {
      provider.current.stopListening();
      return;
    }
    setError(null);
    setState("listening");
    provider.current.startListening({
      lang: speechLangForLocale(locale),
      onResult: (result) => {
        if (result.transcript.trim()) onTranscript(result.transcript);
      },
      onEnd: () => setState((s) => (s === "error" ? s : "idle")),
      onError: (err) => {
        setError(err);
        setState("error");
      },
    });
  }

  if (!supported) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <button
        type="button"
        className="btn-ghost pressable"
        style={{
          width: 44,
          height: 44,
          padding: 0,
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          color: state === "listening" ? "#fff" : "var(--surface)",
          background: state === "listening" ? "var(--c-red)" : "#fff",
          borderColor: state === "listening" ? "var(--ink)" : "var(--ink)",
        }}
        aria-pressed={state === "listening"}
        aria-label={state === "listening" ? t("voice.listening", locale) : t("voice.dictate", locale)}
        onClick={toggle}
      >
        <i className={`ph-duotone ${state === "listening" ? "ph-waveform" : "ph-microphone"}`} aria-hidden="true" />
      </button>
      <div aria-live="polite">
        {state === "listening" && (
          <span className="sr-only">{t("voice.listening", locale)}</span>
        )}
        {error && (
          <div className="feedback retry" style={{ fontSize: ".78rem", padding: "6px 10px", maxWidth: 220 }}>
            {error === "not-allowed" ? t("voice.micDenied", locale) : t("voice.notUnderstood", locale)}
          </div>
        )}
      </div>
    </div>
  );
}
