"use client";

import { forwardRef, Fragment, useEffect, useImperativeHandle, useRef, useState, type ReactNode, type RefObject } from "react";
import { getTtsProvider, type TtsState } from "@/lib/voice/ttsProvider";
import { speechLangForLocale, loadVoiceSpeed, saveVoiceSpeed, VOICE_SPEEDS, type VoiceSpeed } from "@/lib/voice/settings";
import { t, type Locale } from "@/lib/i18n/catalog";

// Azioni esposte a chi controlla la lettura da fuori (FASE 5: i comandi vocali — "leggi",
// "pausa", "riprendi"... — pilotano lo stesso lettore di questi bottoni, non uno separato).
export interface VoiceControlsHandle {
  read: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  speakText: (text: string) => void;
}

// "Un clic per ascoltare" (spec voice-first §43) — legge il testo visibile dentro `targetRef`
// così com'è nel DOM, non un contenuto passato a mano: funziona su qualunque passo di qualunque
// capitolo/esame/Caso Reale senza dover toccare i singoli file di contenuto. `targetRef` è lo
// stesso mainRef che ChapterRunner usa già per spostare il focus tastiera (FASE 2) — un solo
// riferimento, due usi.
export const VoiceControls = forwardRef<
  VoiceControlsHandle,
  { targetRef: RefObject<HTMLElement | null>; locale: Locale; extraAction?: ReactNode }
>(function VoiceControls({ targetRef, locale, extraAction }, ref) {
    const [supported, setSupported] = useState(false);
    const [state, setState] = useState<TtsState>("idle");
    const [hasPlayed, setHasPlayed] = useState(false);
    const [speed, setSpeed] = useState<VoiceSpeed>(1);
    const [speedOpen, setSpeedOpen] = useState(false);
    const provider = useRef(getTtsProvider());
    const speedRef = useRef<HTMLDivElement>(null);

    // Rilevato solo dopo il mount (mai durante il render server, dove `window` non esiste) —
    // evita un disallineamento fra ciò che il server ha reso e ciò che il browser vede.
    useEffect(() => {
      setSupported(provider.current.supported);
      setSpeed(loadVoiceSpeed());
    }, []);

    // Cambiare passo (o lasciare la pagina) ferma sempre la lettura in corso — mai due voci
    // insieme, mai una lettura vecchia che continua sopra il passo nuovo (spec §32).
    useEffect(() => {
      return () => {
        provider.current.stop();
      };
    }, [targetRef]);

    function speak() {
      const text = targetRef.current?.innerText?.trim();
      if (!text) return;
      setHasPlayed(true);
      provider.current.speak(text, { lang: speechLangForLocale(locale), rate: speed, onStateChange: setState });
    }

    function speakText(text: string) {
      if (!text.trim()) return;
      provider.current.speak(text, { lang: speechLangForLocale(locale), rate: speed, onStateChange: setState });
    }

    // Il menu delle velocità si chiude da solo cliccando fuori o con Esc — così resta un tab a
    // discesa (richiesta del proprietario) e non una lista sempre aperta che occupa spazio.
    useEffect(() => {
      if (!speedOpen) return;
      function onDocClick(e: MouseEvent) {
        if (speedRef.current && !speedRef.current.contains(e.target as Node)) setSpeedOpen(false);
      }
      function onKey(e: KeyboardEvent) {
        if (e.key === "Escape") setSpeedOpen(false);
      }
      document.addEventListener("mousedown", onDocClick);
      document.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("mousedown", onDocClick);
        document.removeEventListener("keydown", onKey);
      };
    }, [speedOpen]);

    function changeSpeed(next: VoiceSpeed) {
      setSpeed(next);
      saveVoiceSpeed(next);
      // Se si sta già ascoltando, la nuova velocità si sente dalla prossima frase — cambiare
      // solo lo stato React non bastava: la lettura in corso continuava alla velocità di
      // partenza (bug segnalato dal proprietario).
      provider.current.setRate(next);
    }

    useImperativeHandle(ref, () => ({
      read: speak,
      pause: () => provider.current.pause(),
      resume: () => provider.current.resume(),
      stop: () => provider.current.stop(),
      speakText,
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }));

    // TTS (lettura) e STT (comando vocale, extraAction) sono due capacità indipendenti — un
    // browser può avere l'una senza l'altra. Se qui non c'è lettura, il microfono non deve
    // sparire con lei: resta da solo, senza il resto dei controlli di lettura.
    if (!supported) return extraAction ? <div className="voice-controls-actions">{extraAction}</div> : null;

    // Un solo bottone per stato, mai due contrastanti insieme (es. Ascolta e Pausa) — costruiti
    // qui invece che direttamente nel JSX per poter contare quanti sono e dare a "Ascolta",
    // microfono e Velocità tutti la stessa dimensione (richiesta del proprietario, stesso
    // trattamento a griglia delle schede "I tuoi 10 capitoli/Esame finale/..." in Dashboard),
    // invece di lasciarli in fila con larghezze diverse in base al testo.
    const stateButtons: ReactNode[] = [];
    if (state === "idle") {
      stateButtons.push(
        <button key="listen" type="button" className="voice-control-btn pressable" onClick={speak}>
          <i className="ph-duotone ph-play" aria-hidden="true" /> {t("voice.listen", locale)}
        </button>
      );
    }
    if (state === "speaking") {
      stateButtons.push(
        <button key="pause" type="button" className="voice-control-btn pressable" onClick={() => provider.current.pause()}>
          <i className="ph-duotone ph-pause" aria-hidden="true" /> {t("voice.pause", locale)}
        </button>,
        <button key="stop" type="button" className="voice-control-btn pressable" onClick={() => provider.current.stop()}>
          <i className="ph-duotone ph-stop" aria-hidden="true" /> {t("voice.stop", locale)}
        </button>
      );
    }
    if (state === "paused") {
      stateButtons.push(
        <button key="resume" type="button" className="voice-control-btn pressable" onClick={() => provider.current.resume()}>
          <i className="ph-duotone ph-play" aria-hidden="true" /> {t("voice.resume", locale)}
        </button>,
        <button key="repeat" type="button" className="voice-control-btn pressable" onClick={speak}>
          <i className="ph-duotone ph-repeat" aria-hidden="true" /> {t("voice.repeat", locale)}
        </button>,
        <button key="stop" type="button" className="voice-control-btn pressable" onClick={() => provider.current.stop()}>
          <i className="ph-duotone ph-stop" aria-hidden="true" /> {t("voice.stop", locale)}
        </button>
      );
    }
    if (state === "idle" && hasPlayed) {
      stateButtons.push(
        <button key="repeat-idle" type="button" className="voice-control-btn pressable" onClick={speak}>
          <i className="ph-duotone ph-repeat" aria-hidden="true" /> {t("voice.repeat", locale)}
        </button>
      );
    }

    const speedControl = (
      <div key="speed" className="voice-speed-dropdown" ref={speedRef}>
        <button
          type="button"
          className="voice-control-btn pressable"
          aria-haspopup="listbox"
          aria-expanded={speedOpen}
          onClick={() => setSpeedOpen((open) => !open)}
        >
          <i className="ph-duotone ph-gauge" aria-hidden="true" />
          {t("voice.speed", locale)}: {speed}×
          <i className={`ph-duotone ph-caret-${speedOpen ? "up" : "down"}`} aria-hidden="true" />
        </button>
        {speedOpen && (
          <div className="voice-speed-menu" role="listbox" aria-label={t("voice.speed", locale)}>
            {VOICE_SPEEDS.map((s) => (
              <button
                key={s}
                type="button"
                role="option"
                aria-selected={speed === s}
                className="chip pressable voice-speed-option"
                onClick={() => {
                  changeSpeed(s);
                  setSpeedOpen(false);
                }}
              >
                {s}×
              </button>
            ))}
          </div>
        )}
      </div>
    );

    const items = [...stateButtons, extraAction && <Fragment key="mic">{extraAction}</Fragment>, speedControl].filter(
      Boolean
    );
    const columns = items.length <= 3 ? items.length : 2;

    return (
      <div className="voice-controls" role="group" aria-label={t("voice.listen", locale)}>
        <div className="voice-controls-actions" style={{ "--voice-columns": columns } as React.CSSProperties}>
          {items}
        </div>
      </div>
    );
  }
);
