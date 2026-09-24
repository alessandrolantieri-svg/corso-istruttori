import { OptionGroup, type Option } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "./types";

function Field({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      className="field"
      id={id}
      placeholder="Scrivi qui..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

const K1: Option[] = [
  { value: "no", label: "No — una etichetta la persona, l'altra descrive cosa è successo", correct: true },
  { value: "si", label: "Sì — è solo un altro modo di dire la stessa cosa", correct: false },
];
const K2: Option[] = [
  { value: "si", label: "Sì — vuol dire che non ha ancora la tecnica giusta", correct: false },
  { value: "no", label: "No — è un'informazione su cosa aggiustare, non un voto sul bambino", correct: true },
];
const K3: Option[] = [
  { value: "no", label: "No — un ritorno specifico insegna cosa rifare, un complimento generico no", correct: true },
  { value: "si", label: "Sì — se lo motiva, prima o poi capisce da solo cosa ha fatto bene", correct: false },
];
const K4: Option[] = [
  { value: "si", label: "Sì — un complimento vago è più facile da ricordare e riapplicare", correct: false },
  { value: "no", label: "No — è il contrario: quello specifico è quello che si può rifare", correct: true },
];
const K5: Option[] = [
  { value: "entrambe", label: "Nominare entrambe le cose, in modo specifico", correct: true },
  { value: "uno", label: "Scegliere solo lode, o solo correzione", correct: false },
];
const K6: Option[] = [
  { value: "no", label: "No — a quell'età il tono conta quanto il contenuto", correct: true },
  { value: "si", label: "Sì, l'entusiasmo funziona a ogni età", correct: false },
];

const M1: Option[] = [
  { value: "si", label: "Sì — prima le parole, poi il gesto, poi il contatto", correct: false },
  { value: "no", label: "No — dipende dal bambino, non c'è un ordine valido per tutti", correct: true },
];
const M2: Option[] = [
  { value: "no", label: "No — vuol dire solo che quella non era ancora la chiave giusta", correct: true },
  { value: "si", label: "Sì — se un modo semplice non funziona, il problema è nel bambino", correct: false },
];
const M3: Option[] = [
  { value: "no", label: "No — è il momento di fermarsi e guardare cos'altro c'è (Capitolo 3)", correct: true },
  { value: "si", label: "Sì, bisogna insistere sulla comunicazione", correct: false },
];

const SIM_OPTIONS: Option[] = [
  { value: "parole", label: "Riprovi con una spiegazione verbale, riformulata diversamente" },
  { value: "canale", label: "Le mostri il movimento, o la guidi con un contatto fisico" },
];
const SIM2_OPTIONS: Option[] = [
  { value: "stesso", label: "Insisti sullo stesso canale — con lei funziona sempre così" },
  { value: "diverso", label: "Provi un canale ancora diverso, come un problema nuovo" },
];

const T1: Option[] = [
  { value: "lento", label: "Ripeterlo più lentamente, scandendo meglio le parole", correct: false },
  { value: "diverso", label: "Usarne subito uno diverso", correct: true },
];
const T2: Option[] = [
  { value: "tre", label: "Tre modi diversi", correct: true },
  { value: "uno", label: "Un modo, ben preparato in anticipo", correct: false },
];
const T3: Option[] = [
  { value: "si", label: "Sì — se le parole non bastano, il problema è che non ce la fa", correct: false },
  { value: "no", label: "No — non era ancora la chiave giusta, non un limite del bambino", correct: true },
];
const T4: Option[] = [
  { value: "no", label: "No — dipende dal singolo bambino, non c'è un ordine uguale per tutti", correct: true },
  { value: "si", label: "Sì — prima le parole, poi il gesto, infine il contatto", correct: false },
];
const T5: Option[] = [
  { value: "si", label: "Sì — due modi diversi di dire la stessa cosa", correct: false },
  { value: "no", label: "No — una etichetta la persona, l'altra descrive il comportamento", correct: true },
];
const T6: Option[] = [
  { value: "no", label: "No — è servito per quel movimento in quel momento: gli altri due restano nel repertorio", correct: true },
  { value: "si", label: "Sì — una volta capito il suo canale, il repertorio per lui è chiuso", correct: false },
];
const T7: Option[] = [
  { value: "si", label: "Sì, bisogna insistere finché non trova quello giusto", correct: false },
  { value: "no", label: "No — è il momento di fermarsi e guardare cos'altro c'è", correct: true },
];
const T8: Option[] = [
  { value: "no", label: "No — a quell'età va adattato in qualcosa di rispettoso, restando lo stesso principio", correct: true },
  { value: "si", label: "Sì, il canale conta più della forma con cui lo usi", correct: false },
];
const T9: Option[] = [
  { value: "si", label: "Sì, una volta trovato per un bambino resta quello giusto", correct: false },
  { value: "no", label: "No — ogni esercizio nuovo può richiedere un canale diverso", correct: true },
];

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo8Steps: Step[] = [
  // 0 — copertina
  {
    day: "inizio",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capitolo 8 · CAMBIARE STRADA</div>
        <h1>Non ha funzionato. Adesso?</h1>
        <p className="lede">
          Quando un modo di spiegare non funziona, l&apos;istruttore ne prova subito un altro —
          invece di ripetere lo stesso più forte o più lentamente.
        </p>
      </>
    ),
  },

  // 1 — lunedì: riflessione + consolidamento Capitolo 7
  {
    day: "lunedì · 10 min",
    pct: 12,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Lunedì</div>
        <h1>Com&apos;è andata in vasca?</h1>
        <p className="lede">
          La settimana scorsa: ogni ritorno doveva nominare un comportamento, mai la persona. È
          stato facile o ti sei sorpreso a tornare alle vecchie abitudini?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidamento — il Capitolo 7 torna</h2>
        <p className="prompt">1. «Sei distratto» e «guardavi la finestra» dicono la stessa cosa?</p>
        <OptionGroup name="k1" options={K1} selected={answers.k1} onPick={(v, correct) => setResponse("k1", v, correct)} />
        <p className="prompt">2. Un bambino ha bevuto durante l&apos;esercizio: è un fallimento?</p>
        <OptionGroup name="k2" options={K2} selected={answers.k2} onPick={(v, correct) => setResponse("k2", v, correct)} />
        <p className="prompt">3. «Bravo» insegna cosa rifare?</p>
        <OptionGroup name="k3" options={K3} selected={answers.k3} onPick={(v, correct) => setResponse("k3", v, correct)} />
        <p className="prompt">4. Un complimento vago si ripete più facilmente di uno specifico?</p>
        <OptionGroup name="k4" options={K4} selected={answers.k4} onPick={(v, correct) => setResponse("k4", v, correct)} />
        <p className="prompt">
          5. Un tentativo migliora un dettaglio ma ne perde un altro. Il ritorno giusto è:
        </p>
        <OptionGroup name="k5" options={K5} selected={answers.k5} onPick={(v, correct) => setResponse("k5", v, correct)} />
        <p className="prompt">
          6. Con un adolescente, un complimento specifico detto con tono da tifoseria funziona come
          con un bambino piccolo?
        </p>
        <OptionGroup name="k6" options={K6} selected={answers.k6} onPick={(v, correct) => setResponse("k6", v, correct)} />
      </>
    ),
  },

  // 2 — martedì: repertorio dei tre canali
  {
    day: "martedì · 13 min",
    pct: 30,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Martedì</div>
        <h1>Se un modo non funziona, non lo ripeti — lo cambi</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Hai dato un buon ritorno, con la consegna giusta, nel momento giusto — e ancora non
          funziona. Adesso?
        </p>
        <p className="lede">
          Il primo istinto, quando qualcosa non funziona, è ripeterlo — più lentamente, più forte.
          È l&apos;errore più comune del mestiere: sotto pressione torniamo tutti al nostro modo
          preferito.
        </p>
        <p className="lede">
          <strong>Costruire un repertorio</strong> significa avere, per ogni cosa importante,
          almeno tre modi diversi di dirla: uno che mostri, uno che spieghi a parole, uno che si
          faccia sentire nel corpo — gli stessi tre canali del test VAK, applicati al contrario.
        </p>
        <div className="card quote">
          Non esiste un ordine fisso. Il repertorio non ti dice quale userai: ti garantisce solo
          che, quando il primo non funziona, ne hai già altri due pronti.
        </div>
        <div className="card">
          <strong>Il contatto fisico guidato ha una regola in più, prima del &quot;come&quot;: il
          permesso.</strong>
          <p>
            Prima di guidare le braccia o le gambe di un bambino, dillo a voce, in modo che lui e
            chi è vicino possano sentire — <em>&quot;ti prendo la caviglia, così senti il
            movimento&quot;</em>. Non partire dal contatto: parti dall&apos;annuncio.
          </p>
          <p>
            Guida solo dove serve tecnicamente (mani, braccia, caviglie, schiena per il
            galleggiamento) — mai il resto del corpo. Fallo in un punto visibile, non appartato:
            sul bordo, in vasca aperta, dove un collega o un genitore, se presente, può vedere cosa
            stai facendo.
          </p>
          <p>
            Se il bambino si ritrae, si irrigidisce o dice di no — anche senza dirlo a parole —
            quel canale è chiuso per quel momento: torna a mostrare o a spiegare. Non insistere per
            &quot;farlo abituare&quot;.
          </p>
          <p>
            Questo vale per ogni fascia d&apos;età, e la tua struttura può avere un proprio
            regolamento su questo punto: in quel caso, è il regolamento della struttura ad avere
            sempre l&apos;ultima parola.
          </p>
        </div>
        <p className="lede">
          <strong>Una fiducia di base ti serve per farlo:</strong> ogni bambino ha già dentro di sé
          le risorse per riuscire — la tua parte non è «dargli» la capacità, è trovare il modo che
          gliela fa uscire. Se il primo modo non funziona, non vuol dire che lui non ce la faccia:
          vuol dire solo che quella non era ancora la chiave giusta.
        </p>
        <p className="lede">
          <strong>E se hai provato tutti e tre i canali, e nessuno ha funzionato?</strong> A quel
          punto il problema probabilmente non è più «quale canale», ma qualcos&apos;altro — forse
          ha paura, forse non ha ancora capito, forse ha freddo, forse aspetta solo il tuo via
          libera: le stesse quattro cause del Capitolo 3. In quel momento, insistere con una quarta
          variazione non serve: è come continuare a bussare a una porta quando sai che chi è
          dentro non può risponderti adesso. Il
          repertorio ha tre modi, non infiniti — sapere quando fermarsi del tutto fa parte della
          stessa competenza.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controllo di fine giornata</h2>
        <p className="prompt">
          1. Il repertorio ha un ordine fisso — sempre prima le parole, poi il gesto, poi il
          contatto?
        </p>
        <OptionGroup name="m1" options={M1} selected={answers.m1} onPick={(v, correct) => setResponse("m1", v, correct)} />
        <p className="prompt">
          2. Se il primo modo non funziona con un bambino, vuol dire che lui non ce la fa?
        </p>
        <OptionGroup name="m2" options={M2} selected={answers.m2} onPick={(v, correct) => setResponse("m2", v, correct)} />
        <p className="prompt">
          3. Hai provato tutti e tre i canali, senza risultato. La cosa giusta è inventare una
          quarta variazione?
        </p>
        <OptionGroup name="m3" options={M3} selected={answers.m3} onPick={(v, correct) => setResponse("m3", v, correct)} />
      </>
    ),
  },

  // 3 — mercoledì: tre bambini, tre canali + simulazione Bianca (due momenti)
  {
    day: "mercoledì",
    pct: 46,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.sim && !!a.sim2,
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Mercoledì</div>
        <h1>Tre bambini, tre canali vincenti diversi</h1>
        <div className="card scene">
          <div className="who">Un bambino di 7 anni, la rana</div>
          <p>
            Non riesce a coordinare le gambe. L&apos;istruttore prova a parole tre volte. Niente
            cambia. Cambia canale: gli fa sentire il movimento muovendogli le caviglie fuori
            dall&apos;acqua. Il bambino lo rifà, quasi giusto, al primo tentativo.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Sara, 10 anni</div>
          <p>
            Con un altro istruttore, le parole erano sempre bastate — e questo lo aveva convinto
            che bastassero sempre. Con la virata continua a sbagliare. L&apos;istruttore prova a
            farle sentire il movimento: ancora niente. Al terzo tentativo, le mostra il movimento
            intero, in acqua. È quello a sbloccarla.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Un ragazzo di 15 anni</div>
          <p>
            Continua a sbagliare l&apos;entrata in acqua di un tuffo tecnico, nonostante
            dimostrazione e spiegazione a parole. Il terzo canale — il contatto fisico, naturale a
            7 anni — a 15 rischierebbe di sembrare fuori luogo. L&apos;istruttore adatta il canale
            alla sua età, senza cambiare principio: gli mostra un breve video del suo stesso
            tuffo. Guardandosi, il ragazzo capisce da solo dove il movimento si rompe.
          </p>
        </div>
        <p className="lede">
          <strong>
            Tre bambini, tre canali vincenti diversi — e in nessuno dei tre casi il canale, o la
            sua forma, era scontato in anticipo.
          </strong>
        </p>
        <p className="prompt">
          Hai spiegato a parole, due volte, come tenere il corpo disteso durante la scivolata. Il
          bambino continua a incurvare la schiena. Scrivi un modo diverso — non a parole — per
          fargli arrivare la stessa cosa.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota per la correzione, non mostrata all'istruttore: il sistema cerca un canale
            diverso da quello già provato — non una terza spiegazione verbale riformulata. */}
        <h2>Simulazione</h2>
        <p className="lede">
          <strong>BIANCA, 9 anni.</strong> Ha già sentito due volte la spiegazione a parole di come
          muovere le braccia nel dorso, e continua a sbagliare. Cosa provi adesso — deve essere
          diverso da «a parole».
        </p>
        <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
        {answers.sim === "parole" && (
          <div className="feedback retry">
            BIANCA: «...sì, ok» <em>(riprova, stesso errore di prima)</em>
          </div>
        )}
        {answers.sim === "canale" && (
          <div className="feedback ok">
            BIANCA: <em>(prova il movimento seguendo il gesto che le hai mostrato)</em> «...ah,
            così!»
            <br />
            Non stai facendo più fatica: stai solo usando un canale che prima non avevi provato.
          </div>
        )}
        {!!answers.sim && (
          <div>
            <p className="lede" style={{ marginTop: 14 }}>
              Un&apos;altra settimana. Bianca deve imparare un esercizio nuovo — la partenza in
              acqua. Provi lo stesso canale che ha funzionato con lei l&apos;ultima volta. Stavolta
              non funziona: resta incerta, come con le parole tempo fa.
            </p>
            <p className="prompt">Scrivi cosa fai adesso.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup name="sim2" options={SIM2_OPTIONS} selected={answers.sim2} onPick={(v) => setResponse("sim2", v)} />
            {answers.sim2 === "stesso" && (
              <div className="feedback retry">
                BIANCA continua a sbagliare — il canale che aveva funzionato una volta non era una
                scoperta definitiva, era solo quello giusto per quel movimento specifico.
              </div>
            )}
            {answers.sim2 === "diverso" && (
              <div className="feedback ok">
                BIANCA: <em>(prova il terzo canale rimasto)</em> «...ok, adesso ho capito.»
                <br />
                Il repertorio non si esaurisce alla prima scoperta: ogni esercizio nuovo può
                richiedere un canale diverso, anche con lo stesso bambino.
              </div>
            )}
          </div>
        )}
      </>
    ),
  },

  // 4 — mercoledì sera: trasferimento
  {
    day: "mercoledì sera",
    pct: 62,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controllo di fine giornata — trasferimento</div>
        <h1>Il terzo canale rimasto</h1>
        <p className="lede">
          Hai già provato «mostrare» e «far sentire» con lo stesso bambino, senza risultato, su un
          movimento tecnico mai discusso finora nel corso.
        </p>
        <p className="prompt">Cosa fai adesso, e perché è coerente con quello che hai imparato oggi?</p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota per la correzione, non mostrata all'istruttore: il sistema cerca se resta il
            terzo canale non ancora provato («dire», a parole) — non una quarta variazione dello
            stesso canale già escluso due volte. */}
      </>
    ),
  },

  // 5 — turno in vasca
  {
    day: "in vasca",
    pct: 70,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Il tuo turno in vasca</div>
        <h1>Tre modi, pronti prima di entrare</h1>
        <p className="lede">
          Questa settimana, prepara tre modi diversi di spiegare una stessa cosa tecnica prima di
          entrare in vasca. Se il primo non funziona con un bambino, usane subito un altro — non
          ripetere il primo più forte.
        </p>
      </>
    ),
  },

  // 6 — venerdì: test cumulativo
  {
    day: "venerdì · 11 min",
    pct: 86,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) =>
      ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Venerdì — test cumulativo: Capitolo 7 + Capitolo 8</div>
        <h1>Il test</h1>
        <p className="prompt">1. Se un modo di spiegare non funziona, la cosa giusta è:</p>
        <OptionGroup name="t1" options={T1} selected={answers.t1} onPick={(v, correct) => setResponse("t1", v, correct)} />
        <p className="prompt">2. Un buon repertorio ha, per ogni cosa importante, almeno:</p>
        <OptionGroup name="t2" options={T2} selected={answers.t2} onPick={(v, correct) => setResponse("t2", v, correct)} />
        <p className="prompt">3. Se un bambino non riesce con la spiegazione a parole, vuol dire che non ce la fa?</p>
        <OptionGroup name="t3" options={T3} selected={answers.t3} onPick={(v, correct) => setResponse("t3", v, correct)} />
        <p className="prompt">4. Il repertorio ha un ordine fisso, valido per ogni bambino?</p>
        <OptionGroup name="t4" options={T4} selected={answers.t4} onPick={(v, correct) => setResponse("t4", v, correct)} />
        <p className="prompt">
          5. <em>(dal Capitolo 7)</em> «Sei distratto» e «guardavi la finestra» sono la stessa cosa?
        </p>
        <OptionGroup name="t5" options={T5} selected={answers.t5} onPick={(v, correct) => setResponse("t5", v, correct)} />
        <p className="prompt">6. Un canale ha funzionato con un bambino su un esercizio. Vuol dire che gli altri due, con lui, non servono più?</p>
        <OptionGroup name="t6" options={T6} selected={answers.t6} onPick={(v, correct) => setResponse("t6", v, correct)} />
        <p className="prompt">
          7. Hai provato tutti e tre i canali con un bambino, senza risultato. La cosa giusta è
          inventare una quarta variazione?
        </p>
        <OptionGroup name="t7" options={T7} selected={answers.t7} onPick={(v, correct) => setResponse("t7", v, correct)} />
        <p className="prompt">8. Con un adolescente, il contatto fisico guidato è sempre la forma giusta del terzo canale?</p>
        <OptionGroup name="t8" options={T8} selected={answers.t8} onPick={(v, correct) => setResponse("t8", v, correct)} />
        <p className="prompt">
          9. Un canale che ha funzionato su un esercizio funziona automaticamente anche
          sull&apos;esercizio successivo?
        </p>
        <OptionGroup name="t9" options={T9} selected={answers.t9} onPick={(v, correct) => setResponse("t9", v, correct)} />
        <p className="prompt">
          10. Hai già provato due modi diversi con lo stesso bambino, e nessuno ha funzionato.
          Scrivi in due righe cosa fai adesso.
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 7 — feedback: spiega come funziona la correzione (§10, D34)
  {
    day: "venerdì · feedback",
    pct: 88,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§10 · Feedback</div>
        <h1>Ecco cosa dicono le tue risposte</h1>
        <p className="lede">Non su di te — su quello che hai fatto in queste domande.</p>
        <p className="lede" style={{ fontSize: ".85rem", fontStyle: "italic" }}>
          Esempio di feedback generato, in caso di errore alla domanda 1:
        </p>
        <div className="card quote">
          Hai risposto di ripeterlo più lentamente. È l&apos;istinto più naturale, ma se un modo
          non ha funzionato due volte, ripeterlo una terza raramente cambia qualcosa. Il tempo che
          passi a ripetere lo stesso modo è tempo che potresti passare a provarne uno diverso.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Il feedback non dice mai «hai sbagliato» e basta: dice cosa guardare la prossima volta.
          Il tono resta sempre sul comportamento osservato, mai sulla persona — la stessa regola
          del Capitolo 7.
        </p>
      </>
    ),
  },

  // 8 — recupero: solo se il test del venerdì ha troppi errori (§12, D25/D27)
  {
    day: "recupero",
    pct: 90,
    nextLabel: "Continua ▸",
    showBack: true,
    visible: (a) => {
      const corrette: Record<string, string> = {
        t1: "diverso", t2: "tre", t3: "no", t4: "no", t5: "no",
        t6: "no", t7: "no", t8: "no", t9: "no",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recupero — solo perché il test ha trovato qualche difficoltà</div>
        <h1>Tre esempi in più, per riconoscere un canale davvero diverso</h1>
        <p className="lede">
          Non è un fallimento: è solo il segnale che vale la pena rivedere il punto più delicato di
          questo capitolo con qualche esempio in più — cosa conta davvero come «un altro modo», e
          cosa è solo la stessa strada ripetuta.
        </p>

        <div className="card scene">
          <div className="who">Un bambino di 8 anni, la rana</div>
          <p>
            Non riesce a coordinare le gambe. L&apos;istruttore spiega a parole: «apri, spingi,
            chiudi». Non funziona. Riprova a parole, stavolta più lentamente. Ancora niente.
            Riprova una terza volta, scandendo ogni sillaba.
          </p>
        </div>
        <p className="prompt">Ha provato tre modi diversi?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "si", label: "Sì — ha cambiato ritmo e tono tre volte", correct: false },
            {
              value: "no",
              label: "No — sono tre variazioni dello stesso canale (dire), non tre canali diversi",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Una bambina di 9 anni, due esercizi diversi</div>
          <p>
            La settimana scorsa, farle sentire il movimento con le mani ha sbloccato la scivolata.
            Questa settimana deve imparare la virata, un esercizio mai affrontato prima.
            L&apos;istruttore, senza pensarci, la guida di nuovo con le mani — «tanto con lei
            funziona così». Non funziona: resta incerta, come le prime volte.
          </p>
        </div>
        <p className="prompt">Cosa ha sbagliato l&apos;istruttore, prima ancora di provare?</p>
        <OptionGroup
          name="rec2"
          options={[
            {
              value: "niente",
              label: "Niente — un canale che ha funzionato una volta è la scelta giusta anche dopo",
              correct: false,
            },
            {
              value: "nuovo",
              label:
                "Ha dato per scontato il canale invece di trattare la virata come un problema nuovo",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Un ragazzo di 14 anni, il tuffo tecnico</div>
          <p>
            Continua a sbagliare l&apos;entrata in acqua nonostante due spiegazioni a parole. Al
            terzo tentativo, l&apos;istruttore gli parla ancora — stavolta con termini tecnici più
            precisi, «l&apos;angolo di ingresso», «l&apos;estensione del bacino» — pensando di aver
            cambiato approccio.
          </p>
        </div>
        <p className="prompt">Ha davvero usato un canale nuovo?</p>
        <OptionGroup
          name="rec3"
          options={[
            {
              value: "si",
              label: "Sì — un linguaggio più tecnico è un modo diverso di spiegare",
              correct: false,
            },
            {
              value: "no",
              label:
                "No — è ancora «dire», solo con parole più difficili: resta lo stesso canale già escluso due volte",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Cambiare le parole non è cambiare canale. Il repertorio vale solo se i tre modi —
          mostrare, dire, far sentire — restano davvero diversi fra loro, ogni volta che servono.
        </p>
      </>
    ),
  },

  // 9 — risultato
  {
    day: "venerdì · risultato",
    pct: 95,
    nextLabel: "Vai alla Dashboard ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§11 · Risultato</div>
        <h1>Il tuo profilo si aggiorna</h1>
        <div className="card">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".86rem" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>Punteggio</th>
                <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>Da cosa nasce</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>knowledge_score</td>
                <td style={{ padding: "6px 0" }}>Le 10 domande del test</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>application_score</td>
                <td style={{ padding: "6px 0" }}>Il modo alternativo scritto al §7</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Come hai cambiato strada con Bianca al §8, in entrambe le situazioni</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>Il racconto di lunedì sul Capitolo 7</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Repertorio e adattamento</td>
                <td style={{ padding: "6px 0" }}>Il più basso dei precedenti</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },

  // 10 — dashboard
  {
    day: "dashboard",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ vakProfile, answers }: StepContext) => (
      <>
        <div className="done-badge">✓ Capitolo 8 completato</div>
        <div className="eyebrow">Settimana 8 di 10 · Capitolo 9 in arrivo</div>
        <h1>Quando non ci sta</h1>
        <p className="lede">
          Finora hai imparato cosa fare quando un bambino non ci riesce. La settimana prossima
          impari la differenza — perché non è la stessa cosa — quando un bambino non ci sta
          proprio.
        </p>
        <ChapterVakSection vakProfile={vakProfile} />
        <ChapterDiarySection answers={answers} keys={DIARY_KEYS} />
        <h2>Il tuo progresso</h2>
        <div className="chip-grid">
          <div className="chip consolidata">
            <span className="name">1 · Consapevolezza personale</span>
            <span className="state">consolidata</span>
          </div>
          <div className="chip consolidata">
            <span className="name">2 · Riconoscimento dell&apos;allievo</span>
            <span className="state">consolidata</span>
          </div>
          <div className="chip consolidata">
            <span className="name">3 · Osservare e interpretare <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">consolidata</span>
          </div>
          <div className="chip consolidata">
            <span className="name">4 · Sintonia</span>
            <span className="state">consolidata</span>
          </div>
          <div className="chip consolidata">
            <span className="name">5 · Consegne e congruenza</span>
            <span className="state">consolidata</span>
          </div>
          <div className="chip consolidata">
            <span className="name">6 · Verificare con l&apos;azione <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">consolidata</span>
          </div>
          <div className="chip consolidata">
            <span className="name">7 · Il ritorno</span>
            <span className="state">consolidata</span>
          </div>
          <div className="chip acquisita">
            <span className="name">8 · Cambiare strada</span>
            <span className="state">acquisita</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">9 · Situazioni difficili</span>
            <span className="state">non acquisita</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">10 · Autonomia</span>
            <span className="state">non acquisita</span>
          </div>
        </div>
      </>
    ),
  },
];
