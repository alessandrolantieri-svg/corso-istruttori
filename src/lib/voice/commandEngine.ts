import type { Locale } from "@/lib/i18n/catalog";

// Motore comandi vocali (spec voice-first §35-37): prende una trascrizione già pronta (da
// sttProvider, FASE 4) e restituisce un intent strutturato — non decide nulla da solo su cosa
// fare, quello resta a chi lo chiama (ChapterRunner). "SELECT_ANSWER" restituisce sempre un
// indice ("0","1","2"...), mai una lettera: le lettere non sono universali fra le lingue (§37),
// l'indice sì.

export type VoiceIntentType =
  | "READ"
  | "REPEAT"
  | "PAUSE"
  | "RESUME"
  | "STOP"
  | "NEXT"
  | "BACK"
  | "HELP"
  | "SELECT_ANSWER"
  | "CONFIRM"
  | "CANCEL"
  | "UNKNOWN";

export interface VoiceIntent {
  intent: VoiceIntentType;
  value?: string;
  confidence: number;
}

interface CommandDef {
  intent: VoiceIntentType;
  value?: string;
  phrases: string[];
}

// Frasi in minuscolo, senza punteggiatura — normalize() porta la trascrizione nella stessa forma
// prima del confronto. Più varianti per intent (spec §36: "A" / "risposta A" / "la prima" /
// "scelgo la prima" devono valere tutte uguale), non una sintassi rigida da imparare a memoria.
const COMMANDS: Record<Locale, CommandDef[]> = {
  it: [
    { intent: "READ", phrases: ["leggi", "leggimi", "ascolta", "leggi ad alta voce"] },
    { intent: "REPEAT", phrases: ["ripeti", "ripetimi", "di nuovo", "ancora"] },
    { intent: "PAUSE", phrases: ["pausa", "fermati", "metti in pausa"] },
    { intent: "RESUME", phrases: ["riprendi", "riprendi a leggere", "riprendi ad ascoltare"] },
    { intent: "NEXT", phrases: ["continua", "avanti", "vai avanti"] },
    { intent: "BACK", phrases: ["indietro", "torna indietro"] },
    { intent: "STOP", phrases: ["stop", "ferma", "basta"] },
    { intent: "HELP", phrases: ["aiuto", "spiega", "non ho capito"] },
    { intent: "CONFIRM", phrases: ["si", "sì", "confermo", "esatto", "giusto"] },
    { intent: "CANCEL", phrases: ["annulla", "no", "non va bene"] },
    { intent: "SELECT_ANSWER", value: "0", phrases: ["a", "risposta a", "la prima", "prima risposta", "scelgo la prima"] },
    { intent: "SELECT_ANSWER", value: "1", phrases: ["b", "risposta b", "la seconda", "seconda risposta", "scelgo la seconda"] },
    { intent: "SELECT_ANSWER", value: "2", phrases: ["c", "risposta c", "la terza", "terza risposta", "scelgo la terza"] },
  ],
  en: [
    { intent: "READ", phrases: ["read", "read it", "listen", "read aloud"] },
    { intent: "REPEAT", phrases: ["repeat", "say it again", "again"] },
    { intent: "PAUSE", phrases: ["pause", "hold on", "wait"] },
    { intent: "RESUME", phrases: ["resume", "keep listening", "keep reading"] },
    { intent: "NEXT", phrases: ["continue", "next", "go on", "go ahead"] },
    { intent: "BACK", phrases: ["back", "go back"] },
    { intent: "STOP", phrases: ["stop", "halt", "that's enough"] },
    { intent: "HELP", phrases: ["help", "explain", "i didn't understand"] },
    { intent: "CONFIRM", phrases: ["yes", "confirm", "correct", "that's right"] },
    { intent: "CANCEL", phrases: ["cancel", "no", "that's wrong"] },
    { intent: "SELECT_ANSWER", value: "0", phrases: ["a", "answer a", "the first one", "first answer", "i choose the first"] },
    { intent: "SELECT_ANSWER", value: "1", phrases: ["b", "answer b", "the second one", "second answer", "i choose the second"] },
    { intent: "SELECT_ANSWER", value: "2", phrases: ["c", "answer c", "the third one", "third answer", "i choose the third"] },
  ],
  es: [
    { intent: "READ", phrases: ["lee", "léeme", "leeme", "escucha", "lee en voz alta"] },
    { intent: "REPEAT", phrases: ["repite", "repíteme", "repiteme", "otra vez", "de nuevo"] },
    { intent: "PAUSE", phrases: ["pausa", "espera un momento", "pon en pausa"] },
    { intent: "RESUME", phrases: ["reanuda", "continúa escuchando", "continua escuchando", "sigue leyendo"] },
    { intent: "NEXT", phrases: ["continúa", "continua", "siguiente", "adelante"] },
    { intent: "BACK", phrases: ["atrás", "atras", "vuelve atrás", "vuelve atras"] },
    { intent: "STOP", phrases: ["para", "detente", "basta"] },
    { intent: "HELP", phrases: ["ayuda", "explica", "no he entendido"] },
    { intent: "CONFIRM", phrases: ["si", "sí", "confirmo", "correcto", "exacto"] },
    { intent: "CANCEL", phrases: ["cancela", "no", "no es correcto"] },
    { intent: "SELECT_ANSWER", value: "0", phrases: ["a", "respuesta a", "la primera", "primera respuesta", "elijo la primera"] },
    { intent: "SELECT_ANSWER", value: "1", phrases: ["b", "respuesta b", "la segunda", "segunda respuesta", "elijo la segunda"] },
    { intent: "SELECT_ANSWER", value: "2", phrases: ["c", "respuesta c", "la tercera", "tercera respuesta", "elijo la tercera"] },
  ],
  fr: [
    { intent: "READ", phrases: ["lis", "écoute", "ecoute", "lis à voix haute", "lis a voix haute"] },
    { intent: "REPEAT", phrases: ["répète", "repete", "redis", "encore une fois"] },
    { intent: "PAUSE", phrases: ["pause", "attends un instant", "mets en pause"] },
    { intent: "RESUME", phrases: ["reprends", "continue d'écouter", "continue d ecouter", "reprends la lecture"] },
    { intent: "NEXT", phrases: ["continue", "suivant", "en avant"] },
    { intent: "BACK", phrases: ["retour", "reviens en arrière", "reviens en arriere"] },
    { intent: "STOP", phrases: ["stop", "arrête", "arrete", "ça suffit", "ca suffit"] },
    { intent: "HELP", phrases: ["aide", "explique", "je n'ai pas compris", "je n ai pas compris"] },
    { intent: "CONFIRM", phrases: ["oui", "je confirme", "exact", "c'est ça", "c est ca"] },
    { intent: "CANCEL", phrases: ["annule", "non", "ce n'est pas ça", "ce n est pas ca"] },
    { intent: "SELECT_ANSWER", value: "0", phrases: ["a", "réponse a", "reponse a", "la première", "la premiere", "je choisis la première"] },
    { intent: "SELECT_ANSWER", value: "1", phrases: ["b", "réponse b", "reponse b", "la deuxième", "la deuxieme", "je choisis la deuxième"] },
    { intent: "SELECT_ANSWER", value: "2", phrases: ["c", "réponse c", "reponse c", "la troisième", "la troisieme", "je choisis la troisième"] },
  ],
  "pt-PT": [
    { intent: "READ", phrases: ["lê", "le", "ouve", "lê em voz alta", "le em voz alta"] },
    { intent: "REPEAT", phrases: ["repete", "outra vez", "de novo"] },
    { intent: "PAUSE", phrases: ["pausa", "espera um momento", "põe em pausa", "poe em pausa"] },
    { intent: "RESUME", phrases: ["continua a ouvir", "retoma"] },
    { intent: "NEXT", phrases: ["continua", "avança", "avanca", "para a frente"] },
    { intent: "BACK", phrases: ["volta", "volta atrás", "volta atras"] },
    { intent: "STOP", phrases: ["para", "pára", "chega"] },
    { intent: "HELP", phrases: ["ajuda", "explica", "não percebi", "nao percebi"] },
    { intent: "CONFIRM", phrases: ["sim", "confirmo", "correto", "exato"] },
    { intent: "CANCEL", phrases: ["cancela", "não", "nao", "não está certo", "nao esta certo"] },
    { intent: "SELECT_ANSWER", value: "0", phrases: ["a", "resposta a", "a primeira", "primeira resposta", "escolho a primeira"] },
    { intent: "SELECT_ANSWER", value: "1", phrases: ["b", "resposta b", "a segunda", "segunda resposta", "escolho a segunda"] },
    { intent: "SELECT_ANSWER", value: "2", phrases: ["c", "resposta c", "a terceira", "terceira resposta", "escolho a terceira"] },
  ],
  "pt-BR": [
    { intent: "READ", phrases: ["leia", "ouça", "ouca", "leia em voz alta"] },
    { intent: "REPEAT", phrases: ["repita", "de novo", "outra vez"] },
    { intent: "PAUSE", phrases: ["pausa", "espera um pouco", "coloca em pausa"] },
    { intent: "RESUME", phrases: ["continua ouvindo", "retoma"] },
    { intent: "NEXT", phrases: ["continua", "avança", "avanca", "próximo", "proximo"] },
    { intent: "BACK", phrases: ["volta", "volta atrás", "volta atras"] },
    { intent: "STOP", phrases: ["para", "pare", "chega"] },
    { intent: "HELP", phrases: ["ajuda", "explica", "não entendi", "nao entendi"] },
    { intent: "CONFIRM", phrases: ["sim", "confirmo", "correto", "exato"] },
    { intent: "CANCEL", phrases: ["cancela", "não", "nao", "tá errado", "ta errado"] },
    { intent: "SELECT_ANSWER", value: "0", phrases: ["a", "resposta a", "a primeira", "primeira resposta", "escolho a primeira"] },
    { intent: "SELECT_ANSWER", value: "1", phrases: ["b", "resposta b", "a segunda", "segunda resposta", "escolho a segunda"] },
    { intent: "SELECT_ANSWER", value: "2", phrases: ["c", "resposta c", "a terceira", "terceira resposta", "escolho a terceira"] },
  ],
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:«»"']/g, "")
    .replace(/\s+/g, " ");
}

export function parseVoiceCommand(rawTranscript: string, locale: Locale): VoiceIntent {
  const normalized = normalize(rawTranscript);
  const defs = COMMANDS[locale];

  // 1. Corrispondenza esatta — l'intera frase è una delle frasi note, parola per parola.
  for (const def of defs) {
    if (def.phrases.includes(normalized)) {
      return { intent: def.intent, value: def.value, confidence: 1 };
    }
  }

  // 2. Contenimento — la trascrizione può essere più lunga ("per favore torna indietro"). Solo
  // frasi di almeno 4 caratteri: una singola lettera ("a") non deve scattare dentro una parola
  // che la contiene per caso ("aiuto"). Fra più corrispondenze vince la frase più lunga — è
  // l'indizio più forte di quale comando si intende davvero.
  let best: { def: CommandDef; phrase: string } | null = null;
  for (const def of defs) {
    for (const phrase of def.phrases) {
      if (phrase.length >= 4 && normalized.includes(phrase)) {
        if (!best || phrase.length > best.phrase.length) best = { def, phrase };
      }
    }
  }
  if (best) {
    return { intent: best.def.intent, value: best.def.value, confidence: 0.7 };
  }

  return { intent: "UNKNOWN", confidence: 0 };
}
