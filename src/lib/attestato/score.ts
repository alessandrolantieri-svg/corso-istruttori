// Punteggio reale dell'attestato — calcolato SOLO dagli esiti già registrati nei tre turni
// d'esame (AssessmentResponse, spazio Certificazione — mai le riflessioni libere, Muro 1).
//
// Non è il modello completo di FASE 4 §5: quel modello traccia lo stato di tutte e 22 le
// competenze lungo i dieci capitoli (NON ACQUISITA→ACQUISITA→CONSOLIDATA→ECCELLENTE) — un
// sotto-sistema che la fase stessa rimanda a un "Final Examiner" tecnico separato, mai costruito
// in questa app. Qui si applica la STESSA logica a livelli (passo 1bis) e la STESSA forma di
// soglie (passo 3), ma solo ai sette segnali di competenza che i tre turni d'esame producono
// davvero — vedi 01_ANALISI/DECISIONI PRESE.md, voce "attestato generato davvero" per la
// motivazione di questa scelta di ambito.
//
// Le soglie 81-89/90-99 di FASE 4 §5 passo 3 non specificano un punto di taglio numerico per
// "buono" vs "ottimo" nei quattro livelli del design approvato (D22) — scelta interpretativa
// dichiarata qui, non un dato che esisteva già da qualche parte.

export type CompetencyLevel = 1 | 2 | 3; // 1 = da rivedere, 2 = consolidata, 3 = eccellente

export interface CompetencyOutcome {
  label: string;
  level: CompetencyLevel;
  lodeEvidence?: boolean;
}

export type ExamAnswers = Record<string, string>;

function turno1Sintonia(a: ExamAnswers): CompetencyOutcome {
  const label = "Turno 1 · Sintonia (C4)";
  const aurora = a.aurora,
    diego = a.diego;
  if (aurora === "giusta" && diego === "giusta") return { label, level: 3 };
  if (aurora === "giusta" && diego === "sbagliata") return { label, level: 2 };
  if (aurora === "sbagliata" && diego === "giusta") return { label, level: 2 };
  // esito D: nessuna delle due letture giusta
  if (a.beat2a === "separi") return { label, level: 2, lodeEvidence: true };
  return { label, level: 1 };
}

function turno2SituazioniDifficili(a: ExamAnswers): CompetencyOutcome {
  const label = "Turno 2 · Situazioni difficili (C9)";
  if (a.beat1 === "A") return { label, level: 3 };
  if (a.beat1 === "B") return { label, level: 2 };
  // esito D
  if (a.beat2a === "cambia") return { label, level: 2, lodeEvidence: true };
  return { label, level: 1 };
}

function turno2CambiareStrada(a: ExamAnswers): CompetencyOutcome {
  const label = "Turno 2 · Cambiare strada (C8)";
  // Bivio unico, senza un secondo tentativo — come C10: "cambia" è la lettura corretta del
  // momento (due tentativi a parole hanno già fallito), "parole" è un vero vuoto, non una
  // sfumatura — il mockup lo chiama esplicitamente "da rinforzare".
  return { label, level: a.canale === "cambia" ? 3 : 1 };
}

function turno3ComunicazionePerEta(a: ExamAnswers): CompetencyOutcome {
  const label = "Turno 3 · Comunicazione per età (C2)";
  if (a.beat1 === "A" || a.beat1 === "B") return { label, level: 3 };
  // esito D
  if (a.beat2a === "recupero") return { label, level: 2, lodeEvidence: true };
  return { label, level: 1 };
}

function turno3CongruenzaBeat1(a: ExamAnswers): CompetencyOutcome {
  const label = "Turno 3 · Congruenza — beat 1 (C5)";
  if (a.beat1 === "A") return { label, level: 3 };
  if (a.beat1 === "B") return { label, level: 2 };
  return { label, level: 1 };
}

function turno3CongruenzaBeat3(a: ExamAnswers): CompetencyOutcome {
  const label = "Turno 3 · Congruenza — beat 3 (C5)";
  return { label, level: a.tono === "congruente" ? 3 : 1 };
}

function turno3Autonomia(a: ExamAnswers): CompetencyOutcome {
  const label = "Turno 3 · Autonomia (C10)";
  return { label, level: a.elena === "silenzio" ? 3 : 2 };
}

export function computeCompetencyOutcomes(turno1: ExamAnswers, turno2: ExamAnswers, turno3: ExamAnswers): CompetencyOutcome[] {
  return [
    turno1Sintonia(turno1),
    turno2SituazioniDifficili(turno2),
    turno2CambiareStrada(turno2),
    turno3ComunicazionePerEta(turno3),
    turno3CongruenzaBeat1(turno3),
    turno3CongruenzaBeat3(turno3),
    turno3Autonomia(turno3),
  ];
}

export type Tier = "sufficiente" | "buono" | "ottimo" | "lode";

export interface ExamScoreResult {
  score: number; // 80-100
  lode: boolean;
  tier: Tier;
  outcomes: CompetencyOutcome[];
}

// Porta la logica a soglie di FASE 4 §5 passo 3, applicata ai sette segnali disponibili qui
// invece che a 22 competenze:
//   80    → almeno un segnale "da rivedere" (livello 1), e non sono la maggioranza
//   81-89 → segnali "da rivedere" presenti, ma la maggioranza è consolidata o superiore
//   90-99 → nessun segnale "da rivedere"; resta almeno un segnale consolidato-ma-non-eccellente
//           che NON è un'evidenza di recupero riconosciuta
//   100   → nessun segnale "da rivedere"; ogni segnale è o eccellente o un'evidenza di recupero
//           riuscito — un recupero, per §5, "resta a CONSOLIDATA" per definizione: non conta
//           contro il 100 come lo conterebbe un consolidato qualunque, perché FASE 4 lo tratta
//           esplicitamente come il tipo di fatto che può valere la lode, non come un'imperfezione
//   100 e lode → come 100, con almeno un'evidenza di recupero riuscito effettivamente presente
export function computeExamScore(turno1: ExamAnswers, turno2: ExamAnswers, turno3: ExamAnswers): ExamScoreResult {
  const outcomes = computeCompetencyOutcomes(turno1, turno2, turno3);
  const n = outcomes.length;
  const countLevel1 = outcomes.filter((o) => o.level === 1).length;
  const countLevel3 = outcomes.filter((o) => o.level === 3).length;
  const countLevel2Plus = outcomes.filter((o) => o.level >= 2).length;
  const hasLodeEvidence = outcomes.some((o) => o.lodeEvidence);
  // Livello 2 "ordinario" (consolidato ma non eccellente, e non un recupero): l'unica cosa che
  // tiene un esame senza errori sotto il 100 pieno.
  const hasPlainConsolidated = outcomes.some((o) => o.level === 2 && !o.lodeEvidence);

  let score: number;
  if (countLevel1 > 0) {
    score = countLevel2Plus > n / 2 ? 85 : 80;
  } else if (!hasPlainConsolidated) {
    score = 100;
  } else {
    const ratio3 = countLevel3 / n;
    score = Math.min(99, 90 + Math.round(9 * ratio3));
  }

  const lode = score === 100 && hasLodeEvidence;

  let tier: Tier;
  if (lode) tier = "lode";
  else if (score === 100 || score >= 94) tier = "ottimo";
  else if (score >= 81) tier = "buono";
  else tier = "sufficiente";

  return { score, lode, tier, outcomes };
}
