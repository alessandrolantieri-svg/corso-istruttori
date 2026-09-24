"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getSttProvider } from "@/lib/voice/sttProvider";
import { getTtsProvider } from "@/lib/voice/ttsProvider";
import { parseVoiceCommand } from "@/lib/voice/commandEngine";
import { speechLangForLocale } from "@/lib/voice/settings";
import { t } from "@/lib/i18n/catalog";

export interface Option {
  value: string;
  label: string;
  correct?: boolean;
}

interface OptionGroupProps {
  name: string;
  options: Option[];
  selected?: string;
  onPick: (value: string, correct?: boolean) => void;
}

// FASE 6 (voice-first): QUESTION → OPTIONS già esistevano (il componente stesso). Qui si
// aggiungono LISTEN → INTERPRET → CONFIRM → EVALUATE — EVALUATE è `onPick`, già lì, la stessa
// funzione che il tocco chiama da sempre. "Seleziona risposta" del motore comandi (FASE 5)
// restituisce un indice, mai una lettera (spec §37) — qui diventa `options[indice]`.
type VoiceState = "idle" | "listening" | "confirming" | "unclear";

// Porta 1:1 opt() + attachOptHandlers() + restoreSelections() dei mockup, in versione
// controllata da React invece che da manipolazione diretta del DOM.
export function OptionGroup({ name, options, selected, onPick }: OptionGroupProps) {
  const showCorrectness = options.some((o) => o.correct !== undefined);
  const locale = useLocale();
  const stt = useRef(getSttProvider());
  const tts = useRef(getTtsProvider());
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  // Rilevato solo dopo il mount, mai durante il render server (dove `window` non esiste) — stesso
  // motivo già documentato in VoiceControls/DictationButton: evita un disallineamento fra ciò che
  // il server ha reso e ciò che il browser vede al primo render.
  const [sttSupported, setSttSupported] = useState(false);

  useEffect(() => {
    setSttSupported(stt.current.supported);
  }, []);

  useEffect(() => {
    return () => {
      stt.current.cancel();
    };
  }, []);

  function pick(index: number) {
    const opt = options[index];
    if (!opt) return;
    onPick(opt.value, opt.correct);
  }

  function speak(text: string) {
    tts.current.speak(text, { lang: speechLangForLocale(locale), rate: 1, onStateChange: () => {} });
  }

  function listen() {
    setVoiceState("listening");
    stt.current.startListening({
      lang: speechLangForLocale(locale),
      onResult: (result) => {
        const intent = parseVoiceCommand(result.transcript, locale);
        const index = intent.intent === "SELECT_ANSWER" && intent.value !== undefined ? Number(intent.value) : -1;
        if (index < 0 || index >= options.length) {
          setVoiceState("unclear");
          return;
        }
        // Corrispondenza esatta ("A", "risposta A") → seleziona subito, coerente col principio
        // "un clic per agire" (spec §43): chi ha detto chiaramente la lettera non deve confermare
        // due volte. Corrispondenza per contenimento (una frase più lunga e meno certa) → chiede
        // conferma prima di scegliere (spec §13-14), a voce e a tocco insieme.
        if (intent.confidence >= 1) {
          pick(index);
          setVoiceState("idle");
        } else {
          setPendingIndex(index);
          setVoiceState("confirming");
          speak(`${t("voice.youSaid", locale)}: «${options[index].label}». ${t("voice.isThisRight", locale)}`);
        }
      },
      onEnd: () => setVoiceState((s) => (s === "listening" ? "idle" : s)),
      onError: () => setVoiceState("unclear"),
    });
  }

  function confirmPending() {
    if (pendingIndex !== null) pick(pendingIndex);
    setPendingIndex(null);
    setVoiceState("idle");
  }

  function cancelPending() {
    setPendingIndex(null);
    setVoiceState("idle");
  }

  return (
    <div>
      {options.map((o) => {
        const isPicked = selected === o.value;
        const classes = ["opt"];
        if (isPicked) classes.push("picked");
        if (isPicked && showCorrectness) classes.push(o.correct ? "correct" : "wrong");

        return (
          <label key={o.value} className={classes.join(" ")}>
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={isPicked}
              onChange={() => onPick(o.value, o.correct)}
            />
            <span>{o.label}</span>
          </label>
        );
      })}
      {sttSupported && (
        <div style={{ marginTop: 8 }}>
          {voiceState === "confirming" && pendingIndex !== null ? (
            <div className="feedback retry" role="alert">
              <p style={{ margin: "0 0 8px" }}>
                {t("voice.youSaid", locale)}: «{options[pendingIndex].label}». {t("voice.isThisRight", locale)}
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" className="btn btn-primary pressable" onClick={confirmPending}>
                  {t("voice.confirmYes", locale)}
                </button>
                <button type="button" className="btn btn-ghost pressable" onClick={cancelPending}>
                  {t("voice.confirmNo", locale)}
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="btn-ghost pressable"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                borderRadius: 14,
                fontSize: ".82rem",
                fontWeight: 800,
                color: voiceState === "listening" ? "#fff" : "var(--surface)",
                background: voiceState === "listening" ? "var(--c-red)" : "#fff",
              }}
              aria-pressed={voiceState === "listening"}
              onClick={listen}
            >
              <i className={`ph-duotone ${voiceState === "listening" ? "ph-waveform" : "ph-microphone"}`} aria-hidden="true" />
              {t("voice.answerByVoice", locale)}
            </button>
          )}
          <div aria-live="polite">
            {voiceState === "unclear" && (
              <div className="feedback retry" style={{ marginTop: 6 }}>
                {t("voice.answerNotUnderstood", locale)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
