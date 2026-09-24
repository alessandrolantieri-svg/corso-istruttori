"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ProgressTopbar } from "@/components/ProgressTopbar";
import { FootBar } from "@/components/FootBar";
import { VoiceControls, type VoiceControlsHandle } from "@/components/VoiceControls";
import { VoiceCommandButton } from "@/components/VoiceCommandButton";
import type { VoiceIntent } from "@/lib/voice/commandEngine";
import { chaptersForLocale } from "@/lib/chapters/byLocale";
import { examTurnsForLocale } from "@/lib/exam/byLocale";
import { casiRealiForLocale } from "@/lib/casi-reali/byLocale";
import { percorsoTestChapters } from "@/lib/percorso-test/registry";
import { PERCORSO_TEST_PATH_ID, PERCORSO_TEST_COURSE_ID } from "@/lib/percorso-test/constants";
import { saveStep, saveResponse, saveReflection, markChapterCompleted, type VakProfileData } from "@/lib/progressActions";
import { wasTutorUsedRecently } from "@/lib/tutor/clientSignal";
import { DEFAULT_LOCALE, t, type Locale } from "@/lib/i18n/catalog";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";

export interface ChapterInitialState {
  step: number;
  answers: Record<string, string>;
  completedAt: string | null;
  vakProfile: VakProfileData | null;
}

const REFLECTION_DEBOUNCE_MS = 700;

// Riceve solo `num`/`kind` (stringhe) dal Server Component, mai gli step: sono funzioni, e le
// funzioni non attraversano il confine server→client come prop. Il registro (con gli step veri)
// viene importato qui, lato client. `kind` sceglie fra il registro dei capitoli, quello
// dell'esame finale, quello dei Casi Reali e quello del percorso di prova (D23: un secondo
// percorso, con un pathId/courseId diverso, sullo stesso motore) — stesso motore, contenuto
// diverso.
export function ChapterRunner({
  kind = "capitolo",
  num,
  initialState,
  locale = DEFAULT_LOCALE,
}: {
  kind?: "capitolo" | "esame" | "caso-reale" | "percorso-test";
  num: string;
  initialState: ChapterInitialState;
  locale?: Locale;
}) {
  const router = useRouter();
  // Il percorso di prova non ha una traduzione: è verifica tecnica, non contenuto reale (D23).
  const def =
    kind === "esame"
      ? examTurnsForLocale(locale)[num]
      : kind === "caso-reale"
        ? casiRealiForLocale(locale)[num]
        : kind === "percorso-test"
          ? percorsoTestChapters[num]
          : chaptersForLocale(locale)[num];
  const chapterId = def.chapterId;
  // I tre kind del percorso nuoto condividono pathId/courseId di default (progressActions.ts);
  // il percorso di prova passa i propri, dimostrando che nessuno dei due va cambiato per farlo.
  const pathId = kind === "percorso-test" ? PERCORSO_TEST_PATH_ID : undefined;
  const courseId = kind === "percorso-test" ? PERCORSO_TEST_COURSE_ID : undefined;
  const [step, setStep] = useState(initialState.step);
  const [answers, setAnswers] = useState<Record<string, string>>(initialState.answers);
  const reflectionTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const mainRef = useRef<HTMLElement>(null);
  const readableRef = useRef<HTMLDivElement>(null);
  const voiceRef = useRef<VoiceControlsHandle>(null);
  const isFirstRender = useRef(true);

  // Nei capitoli ogni step è sempre visibile (nessuno ha `visible`, il filtro è un no-op).
  // Nell'esame, uno step come Beat 2A compare solo su certi esiti del beat precedente — la
  // lista va quindi ricalcolata a ogni answers, esattamente come stepList() nei mockup.
  const steps = def.steps.filter((s) => !s.visible || s.visible(answers));
  const stepIndex = Math.min(step, steps.length - 1);
  const current = steps[stepIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    // Sposta il focus sul nuovo passo per chi naviga da tastiera o con uno screen reader — senza
    // questo, dopo "avanti" il focus resta su un bottone rimosso dal DOM e il lettore di schermo
    // non annuncia nulla del nuovo contenuto. Non al primo caricamento pagina (isFirstRender):
    // lì il focus deve restare dove il browser lo mette naturalmente.
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      mainRef.current?.focus();
    }
  }, [stepIndex]);

  // Niente useCallback: il React Compiler già attivo su questo progetto memoizza da solo, e su
  // pathId/courseId (derivati da un ternario, non stabili per riferimento) la memoizzazione
  // manuale non si lasciava comunque preservare dal compiler.
  function setResponse(key: string, value: string, correct?: boolean) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    const tutorAssisted = wasTutorUsedRecently();
    void saveResponse(chapterId, key, value, correct, tutorAssisted, pathId, courseId);
  }

  function setReflection(key: string, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    clearTimeout(reflectionTimers.current[key]);
    reflectionTimers.current[key] = setTimeout(() => {
      void saveReflection(chapterId, key, value, pathId, courseId);
    }, REFLECTION_DEBOUNCE_MS);
  }

  async function goNext() {
    if (current.onLeave) {
      await current.onLeave();
    }

    const nextStep = stepIndex + 1;
    if (nextStep >= steps.length) return;

    setStep(nextStep);
    void saveStep(chapterId, nextStep, pathId, courseId);

    if (nextStep === steps.length - 1) {
      await markChapterCompleted(chapterId, pathId, courseId);
      router.refresh();
    }
  }

  function goBack() {
    if (stepIndex === 0) return;
    const prevStep = stepIndex - 1;
    setStep(prevStep);
    void saveStep(chapterId, prevStep, pathId, courseId);
  }

  // FASE 5 (voice-first): il motore comandi (src/lib/voice/commandEngine.ts) ha già interpretato
  // la trascrizione — qui si decide solo COSA fare con l'intent, non come riconoscerlo. Solo gli
  // intent con un'azione vera oggi (leggere/mettere in pausa/spostarsi) sono collegati;
  // SELECT_ANSWER/CONFIRM/CANCEL sono già riconosciuti correttamente dal motore ma non hanno
  // ancora un'azione qui — arriveranno col quiz vocale vero (FASE 6), non prima.
  function handleVoiceCommand(intent: VoiceIntent) {
    switch (intent.intent) {
      case "READ":
      case "REPEAT":
        voiceRef.current?.read();
        break;
      case "PAUSE":
        voiceRef.current?.pause();
        break;
      case "RESUME":
        voiceRef.current?.resume();
        break;
      case "STOP":
        voiceRef.current?.stop();
        break;
      case "NEXT":
        void goNext();
        break;
      case "BACK":
        goBack();
        break;
      case "HELP":
        voiceRef.current?.speakText(t("voice.helpMessage", locale));
        break;
      default:
        break;
    }
  }

  const StepView = current.render;

  return (
    <LocaleProvider value={locale}>
    <div className="app" data-chapter={kind === "capitolo" ? num : undefined}>
      <ProgressTopbar
        pct={current.pct}
        dayTag={current.day}
        weekNum={kind === "capitolo" ? Number(num) : undefined}
        locale={locale}
      />
      <main className="stage fade-in" key={stepIndex} ref={mainRef} tabIndex={-1}>
        {/* targetRef punta solo al contenuto del passo (readableRef), non a VoiceControls stesso
            — altrimenti "Ascolta" leggerebbe anche i nomi dei propri bottoni. VoiceCommandButton
            pilota lo stesso lettore tramite voiceRef (FASE 5), non uno separato — passato come
            extraAction per stare sulla stessa riga di Ascolta/Pausa/Stop, non in una colonna a
            parte (il difetto di spaziatura asimmetrica segnalato dal proprietario). */}
        <VoiceControls
          ref={voiceRef}
          targetRef={readableRef}
          locale={locale}
          extraAction={<VoiceCommandButton locale={locale} onCommand={handleVoiceCommand} />}
        />
        <div ref={readableRef}>
          <StepView
            answers={answers}
            vakProfile={initialState.vakProfile}
            setResponse={setResponse}
            setReflection={setReflection}
          />
        </div>
      </main>
      <FootBar
        showBack={current.showBack}
        onBack={goBack}
        nextLabel={current.nextLabel}
        nextDisabled={!current.canNext(answers)}
        onNext={goNext}
        locale={locale}
      />
    </div>
    </LocaleProvider>
  );
}
