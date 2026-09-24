"use client";

import { useEffect, useRef, useState } from "react";
import { getSttProvider } from "@/lib/voice/sttProvider";
import { parseVoiceCommand, type VoiceIntent } from "@/lib/voice/commandEngine";
import { speechLangForLocale } from "@/lib/voice/settings";
import { t, type Locale } from "@/lib/i18n/catalog";

type State = "idle" | "listening" | "unknown" | "error";

// Bottone microfono per i comandi ("leggi", "avanti", "indietro"...) — diverso da
// DictationButton (che raccoglie testo libero): qui la trascrizione passa dal motore comandi
// (src/lib/voice/commandEngine.ts) prima di uscire, e chi lo usa riceve un intent già
// interpretato, non parole grezze. Non decide da solo cosa fare con l'intent — lo passa a
// `onCommand`, che resta a chi lo monta (ChapterRunner) collegare alle azioni vere.
export function VoiceCommandButton({
  locale,
  onCommand,
}: {
  locale: Locale;
  onCommand: (intent: VoiceIntent) => void;
}) {
  const [supported, setSupported] = useState(false);
  const [state, setState] = useState<State>("idle");
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
    setState("listening");
    provider.current.startListening({
      lang: speechLangForLocale(locale),
      onResult: (result) => {
        const intent = parseVoiceCommand(result.transcript, locale);
        if (intent.intent === "UNKNOWN") {
          setState("unknown");
        } else {
          setState("idle");
          onCommand(intent);
        }
      },
      onEnd: () => setState((s) => (s === "listening" ? "idle" : s)),
      onError: () => setState("error"),
    });
  }

  if (!supported) return null;

  // Posizione relative + messaggio in overlay assoluto: il messaggio di errore/non capito non
  // deve consumare altezza dentro la riga di controlli (altrimenti il gap fra bottone e messaggio,
  // anche quando il messaggio è vuoto, rubava qualche pixel al bottone — diverso in altezza dagli
  // altri due della riga, difetto segnalato dal proprietario con misure alla mano).
  return (
    <div style={{ position: "relative", height: "100%" }}>
      <button
        type="button"
        className="voice-control-btn pressable"
        style={{
          width: "100%",
          height: "100%",
          fontSize: 20,
          color: state === "listening" ? "#fff" : "var(--surface)",
          background: state === "listening" ? "var(--c-red)" : "#fff",
        }}
        aria-pressed={state === "listening"}
        aria-label={state === "listening" ? t("voice.listening", locale) : t("voice.command", locale)}
        onClick={toggle}
      >
        <i className={`ph-duotone ${state === "listening" ? "ph-waveform" : "ph-microphone"}`} aria-hidden="true" />
      </button>
      <div aria-live="polite" style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 20 }}>
        {state === "listening" && <span className="sr-only">{t("voice.listening", locale)}</span>}
        {state === "unknown" && (
          <div className="feedback retry" style={{ fontSize: ".78rem", padding: "6px 10px", maxWidth: 220 }}>
            {t("voice.commandNotUnderstood", locale)}
          </div>
        )}
        {state === "error" && (
          <div className="feedback retry" style={{ fontSize: ".78rem", padding: "6px 10px", maxWidth: 220 }}>
            {t("voice.micDenied", locale)}
          </div>
        )}
      </div>
    </div>
  );
}
