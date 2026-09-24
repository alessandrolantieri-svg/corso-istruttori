// Stessa architettura di ttsProvider.ts (spec voice-first §6, adattata all'ingresso): un
// motore astratto sopra il riconoscimento vocale nativo del browser (`SpeechRecognition` /
// `webkitSpeechRecognition`), nessun servizio a pagamento. L'audio non passa mai da questa app:
// il browser cattura, riconosce e restituisce solo il testo — coerente con §29 della specifica
// (minimizzare la conservazione delle registrazioni: qui non ce n'è proprio nessuna a conservare).

export interface SttResult {
  transcript: string;
  confidence: number;
  language: string;
}

export type SttError = "not-allowed" | "no-speech" | "other";

export interface SttProvider {
  readonly supported: boolean;
  startListening(opts: {
    lang: string;
    onResult: (result: SttResult) => void;
    onEnd: () => void;
    onError: (error: SttError) => void;
  }): void;
  stopListening(): void;
  cancel(): void;
}

export function mapError(code: string): SttError {
  if (code === "not-allowed" || code === "permission-denied" || code === "service-not-allowed") return "not-allowed";
  if (code === "no-speech") return "no-speech";
  return "other";
}

function createBrowserSttProvider(): SttProvider {
  const Ctor = typeof window !== "undefined" ? window.SpeechRecognition ?? window.webkitSpeechRecognition : undefined;
  const supported = !!Ctor;
  let recognition: SpeechRecognition | null = null;

  return {
    supported,
    startListening(opts) {
      if (!Ctor) return;
      recognition?.abort();
      recognition = new Ctor();
      recognition.lang = opts.lang;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const result = event.results[event.results.length - 1];
        const best = result[0];
        opts.onResult({ transcript: best.transcript, confidence: best.confidence, language: opts.lang });
      };
      recognition.onerror = (event) => {
        opts.onError(mapError(event.error));
      };
      recognition.onend = () => {
        opts.onEnd();
      };
      recognition.start();
    },
    stopListening() {
      recognition?.stop();
    },
    cancel() {
      recognition?.abort();
      recognition = null;
    },
  };
}

export const browserSttProvider: SttProvider = createBrowserSttProvider();

// Stesso principio di getTtsProvider() — un punto unico da cui l'app prende il motore attivo.
export function getSttProvider(): SttProvider {
  return browserSttProvider;
}
