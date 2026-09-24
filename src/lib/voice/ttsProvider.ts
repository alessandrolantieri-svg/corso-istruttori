// Motore vocale → TTS Provider → Browser TTS | Cloud TTS | Provider futuro (spec voice-first §6).
// Oggi esiste solo il provider browser (Web Speech API nativa, nessun servizio a pagamento,
// nessuna registrazione inviata altrove — coerente con §9 della specifica, privacy). Un domani,
// aggiungere un provider Cloud TTS significa scrivere un secondo oggetto che soddisfa la stessa
// interfaccia, non riscrivere VoiceControls o ChapterRunner.

export type TtsState = "idle" | "speaking" | "paused";

export interface TtsProvider {
  readonly supported: boolean;
  speak(text: string, opts: { lang: string; rate: number; onStateChange: (state: TtsState) => void }): void;
  pause(): void;
  resume(): void;
  stop(): void;
  // Cambia la velocità della lettura in corso (bug segnalato dal proprietario: scegliere una
  // velocità diversa mentre si sta già ascoltando non aveva alcun effetto — il testo veniva
  // spezzato in frasi già in coda con la velocità di partenza, mai più riletta). L'API nativa non
  // permette di cambiare la velocità della frase che sta parlando in questo momento, solo delle
  // successive — non serve fermare e far ripartire tutto: da qui in poi basta.
  setRate(rate: number): void;
}

// Testo troppo lungo (un capitolo intero può superare i limiti pratici di alcuni motori del
// browser, che a volte si fermano in silenzio oltre una certa lunghezza) — va comunque spezzato,
// non letto tutto in un solo respiro. Ma spezzarlo frase per frase (una sola frase per ogni
// utterance) suonava innaturale anche con una buona voce: ogni nuova utterance riparte "a freddo",
// senza intonazione che lega la frase a quella prima — un difetto segnalato dal proprietario anche
// su Edge, con la voce buona. Qui si raggruppano più frasi vicine in un unico pezzo, fino a
// MAX_CHUNK_CHARS: il motore vocale sente più testo in una volta sola e può variare tono e ritmo
// da una frase all'altra dentro lo stesso pezzo, invece di azzerarli ad ogni frase. Non si spezza
// mai a metà di una frase — un confine di frase resta comunque un punto valido per fermarsi.
const MAX_CHUNK_CHARS = 300;

export function splitIntoChunks(text: string): string[] {
  const sentences = text
    .split(/(?<=[.!?…])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (sentences.length === 0) return [text];

  const chunks: string[] = [];
  let current = "";
  for (const sentence of sentences) {
    const candidate = current ? `${current} ${sentence}` : sentence;
    if (current && candidate.length > MAX_CHUNK_CHARS) {
      chunks.push(current);
      current = sentence;
    } else {
      current = candidate;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

// Parole che, nel nome di una voce di sistema, segnalano un motore neurale/fluido invece del
// sintetizzatore classico (es. "Microsoft Elsa Online (Natural)" contro il vecchio "Microsoft
// Cosimo" — stessa lingua, qualità molto diversa). Il browser non espone questa distinzione come
// dato strutturato, solo nel nome — è l'unico modo disponibile per sceglierla senza un servizio a
// pagamento. Se nessuna voce della lingua ha questi indizi, resta comunque la voce migliore
// possibile su quel dispositivo: non un fallback silenzioso a qualcosa di peggio.
const NATURAL_VOICE_HINTS = ["natural", "online", "neural", "premium"];

export function pickBestVoice(voices: SpeechSynthesisVoice[], lang: string): SpeechSynthesisVoice | undefined {
  if (voices.length === 0) return undefined;
  const wantedPrefix = lang.slice(0, 2).toLowerCase();
  const sameLang = voices.filter((v) => v.lang.toLowerCase() === lang.toLowerCase());
  const sameLanguageFamily = voices.filter((v) => v.lang.toLowerCase().startsWith(wantedPrefix));
  const pool = sameLang.length > 0 ? sameLang : sameLanguageFamily.length > 0 ? sameLanguageFamily : voices;
  const natural = pool.find((v) => NATURAL_VOICE_HINTS.some((hint) => v.name.toLowerCase().includes(hint)));
  if (natural) return natural;
  // Nessuna voce "naturale" su questo browser (capita fuori da Edge: la voce cloud non è
  // disponibile lì, solo le voci classiche del sistema) — fra quelle rimaste, evitare quella
  // marcata "default" dal sistema operativo. La voce di default è quasi sempre la più vecchia,
  // registrata per compatibilità; le voci aggiunte dopo (spesso migliori) non hanno quel flag.
  // Non è una garanzia, ma è meglio che prendere sempre e comunque la prima della lista, che
  // capitava spesso essere proprio la classica più datata (bug segnalato dal proprietario: su
  // Chrome/Brave sentiva sempre una voce maschile robotica invece di una femminile più fluida).
  const nonDefault = pool.find((v) => !v.default);
  return nonDefault ?? pool[0];
}

function createBrowserTtsProvider(): TtsProvider {
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  let queue: string[] = [];
  let queueIndex = 0;
  let currentLang = "it-IT";
  let currentRate = 1;
  let notify: (state: TtsState) => void = () => {};
  let currentState: TtsState = "idle";
  function setState(next: TtsState) {
    currentState = next;
    notify(next);
  }
  let selectedVoice: SpeechSynthesisVoice | undefined;
  // L'elenco voci del browser arriva spesso in modo asincrono (getVoices() può restituire un
  // array vuoto finché "voiceschanged" non è scattato almeno una volta) — questo contatore
  // scarta una scelta di voce arrivata in ritardo, dopo che un nuovo speak()/stop() l'ha già resa
  // obsoleta, invece di far ripartire una lettura che l'utente ha già interrotto.
  let generation = 0;

  function getVoicesAsync(): Promise<SpeechSynthesisVoice[]> {
    const existing = window.speechSynthesis.getVoices();
    if (existing.length > 0) return Promise.resolve(existing);
    return new Promise((resolve) => {
      const onChange = () => {
        window.speechSynthesis.removeEventListener("voiceschanged", onChange);
        resolve(window.speechSynthesis.getVoices());
      };
      window.speechSynthesis.addEventListener("voiceschanged", onChange);
      // Ripiego se "voiceschanged" non scatta mai (capita su alcuni browser): non blocca la
      // lettura in eterno, prosegue con qualunque voce risulti disponibile a quel punto.
      setTimeout(() => resolve(window.speechSynthesis.getVoices()), 1000);
    });
  }

  function speakNextChunk() {
    if (queueIndex >= queue.length) {
      setState("idle");
      return;
    }
    // Catturata qui, non riletta dentro onend/onerror: se setRate() interrompe questa stessa
    // frase per rileggerla alla nuova velocità (vedi setRate), genera un nuovo numero — l'utterance
    // appena cancellata non deve comunque far avanzare la coda quando il browser le chiama sopra.
    const myGeneration = generation;
    const utterance = new SpeechSynthesisUtterance(queue[queueIndex]);
    utterance.lang = currentLang;
    utterance.rate = currentRate;
    if (selectedVoice) {
      // Alcuni browser espongono voci che l'assegnazione nativa rifiuta (visto in test: un
      // TypeError sincrono su "Failed to convert value to 'SpeechSynthesisVoice'" anche con una
      // voce restituita da getVoices() stesso). Se capita, meglio leggere con la sola lingua
      // impostata — il comportamento di prima — che bloccare la lettura in silenzio.
      try {
        utterance.voice = selectedVoice;
      } catch {
        // ignorato di proposito — vedi commento sopra
      }
    }
    utterance.onend = () => {
      if (myGeneration !== generation) return; // superata da stop()/setRate(), non avanzare
      queueIndex++;
      speakNextChunk();
    };
    utterance.onerror = () => {
      if (myGeneration !== generation) return;
      // Un errore su un singolo pezzo (es. voce non disponibile per un istante) non deve
      // bloccare il resto della lettura — si passa al pezzo successivo invece di fermarsi.
      queueIndex++;
      speakNextChunk();
    };
    window.speechSynthesis.speak(utterance);
  }

  async function resolveVoiceAndSpeak(myGeneration: number, lang: string) {
    const voices = await getVoicesAsync();
    if (myGeneration !== generation) return; // superata da un speak()/stop() più recente
    selectedVoice = pickBestVoice(voices, lang);
    speakNextChunk();
  }

  return {
    supported,
    speak(text, opts) {
      if (!supported) return;
      window.speechSynthesis.cancel();
      generation++;
      queue = splitIntoChunks(text);
      queueIndex = 0;
      currentLang = opts.lang;
      currentRate = opts.rate;
      notify = opts.onStateChange;
      setState("speaking");
      void resolveVoiceAndSpeak(generation, opts.lang);
    },
    pause() {
      if (!supported) return;
      window.speechSynthesis.pause();
      setState("paused");
    },
    resume() {
      if (!supported) return;
      window.speechSynthesis.resume();
      setState("speaking");
    },
    stop() {
      if (!supported) return;
      generation++;
      window.speechSynthesis.cancel();
      queue = [];
      queueIndex = 0;
      setState("idle");
    },
    setRate(rate) {
      currentRate = rate;
      // Se non si sta ascoltando in questo momento, basta aver aggiornato currentRate: la
      // prossima frase (o una nuova lettura) la userà. Se invece si sta ascoltando, aspettare la
      // fine della frase in corso a volte significa "mai": un testo breve è tutto in un solo
      // pezzo, e in quel caso la lettura finiva prima che il cambio avesse mai effetto (bug
      // segnalato dal proprietario). Si interrompe la frase in corso e la si rilegge subito dallo
      // stesso punto (stesso queueIndex, non si salta avanti), alla nuova velocità.
      if (currentState === "speaking") {
        generation++;
        window.speechSynthesis.cancel();
        // Un istante dopo cancel(), non nello stesso turno: alcuni browser ignorano silenziosamente
        // uno speak() chiamato subito dopo un cancel(), nello stesso tick (stesso motivo per cui
        // speak() stesso passa comunque da un giro asincrono, resolveVoiceAndSpeak, prima di
        // arrivarci mai in modo sincrono).
        setTimeout(speakNextChunk, 0);
      }
    },
  };
}

export const browserTtsProvider: TtsProvider = createBrowserTtsProvider();

// Punto unico da cui l'app prende il provider attivo — oggi sempre quello del browser. Se in
// futuro un proprietario autorizza un servizio a pagamento, questa funzione sceglie fra i due,
// nessun chiamante (VoiceControls) deve cambiare.
export function getTtsProvider(): TtsProvider {
  return browserTtsProvider;
}
