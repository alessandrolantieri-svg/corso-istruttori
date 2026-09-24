import { OptionGroup, type Option } from "@/components/OptionGroup";
import type { Step, StepContext } from "@/lib/chapters/types";

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

// Porta 1:1 situOutcome()/needsRecupero()/recuperato()/scelta2Version()/needsScelta3() del mockup
// caso-reale-01.html.
type SituOutcome = "A" | "B" | "D" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}
function needsRecupero(a: Record<string, string>): boolean {
  return situOutcome(a) === "D";
}
function recuperato(a: Record<string, string>): boolean {
  return a.scelta1b === "verifica";
}
type Scelta2Version = "pulita" | "errore-successo" | "recupero-riuscito" | "mai-recuperato";
function scelta2Version(a: Record<string, string>): Scelta2Version {
  const o = situOutcome(a);
  if (o === "A") return "pulita";
  if (o === "B") return "errore-successo";
  if (o === "D") return recuperato(a) ? "recupero-riuscito" : "mai-recuperato";
  return "pulita";
}
function needsScelta3(a: Record<string, string>): boolean {
  const v = scelta2Version(a);
  return v === "errore-successo" || v === "mai-recuperato";
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Non ripeti tutta la spiegazione da capo, ma controlli con una domanda breve e concreta cosa ha visto («dimmi tu: dove giro la testa per respirare?») invece di «hai capito?»",
  },
  { value: "B", label: "Proponi l'esercizio pensando che «tanto l'ha già fatto altre volte»" },
  {
    value: "D",
    label: "Pensi che non abbia voglia di fare l'esercizio, o che si sia dimenticato una cosa che sapeva («dai, lo sai fare, impegnati»)",
  },
];
const SCELTA1B_OPTIONS: Option[] = [
  {
    value: "verifica",
    label: "Ti fermi, abbassi il tono, gli chiedi cosa ha visto o sentito prima («quando sono arrivati quelli nuovi — hai fatto in tempo a sentire tutto?»)",
  },
  { value: "insiste", label: "Insisti sulla lettura sbagliata — ripeti che deve impegnarsi di più, magari con un tono più fermo" },
];
const CANALE_OPTIONS: Option[] = [
  {
    value: "cambia",
    label: "Cambi canale — una dimostrazione lenta sul bordo, o un contatto fisico guidato (la testa accompagnata nel movimento giusto)",
  },
  { value: "parole", label: "Ripeti ancora a parole" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Tommaso si volta di nuovo verso di te. Risponde, un po' incerto ma nella direzione giusta: «...di lato?» Hai recuperato l'informazione che ti serviva — sa la parte generale, gli manca il dettaglio che gli è sfuggito col rumore.",
  },
  B: {
    ok: false,
    text: "Tommaso prova, ma sbaglia proprio il dettaglio dell'ultima parte che non aveva sentito — gira la testa troppo tardi rispetto al braccio, un errore che non faceva più da settimane.",
  },
  D: {
    ok: false,
    text: "Tommaso pensa di essere stato rimproverato per pigrizia, ma non è colpa sua: semplicemente non aveva sentito. Si chiude un po', esegue l'esercizio in modo meccanico, senza provare a correggersi quando sbaglia.",
  },
};

const SCELTA2_VERSION_TEXT: Record<Scelta2Version, string> = {
  pulita: "Tommaso ha risposto bene alla domanda di verifica, prova l'esercizio con l'informazione corretta.",
  "errore-successo": "Tommaso ha sbagliato il dettaglio che gli era sfuggito, ma senza nessun rimprovero di mezzo.",
  "recupero-riuscito": "Tommaso sa di essere stato frainteso e poi capito: prova di nuovo, un po' più sicuro.",
  "mai-recuperato": "Tommaso ha smesso di provare a correggersi da solo, esegue in modo meccanico.",
};

export const casoReale01Steps: Step[] = [
  // 0 — intro
  {
    day: "caso reale 01",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casi Reali · Scenario 01</div>
        <h1>Il bambino che si distrae</h1>
        <p className="lede">
          Fascia 6-10. Competenze toccate: osservare e interpretare (Cap. 3) · sintonia (Cap. 4) · il ritorno (Cap.
          7) · cambiare strada (Cap. 8).
        </p>
        <div className="card">
          A differenza di un capitolo o di un turno d&apos;esame, questo scenario è breve e autonomo — non ha un
          punteggio d&apos;esame: è materiale che puoi richiamare quando vuoi.
        </div>
      </>
    ),
  },

  // 1 — situazione
  {
    day: "situazione",
    pct: 14,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situazione</div>
          <h1>Tommaso, 8 anni</h1>
          <p className="lede">
            Terza lezione della settimana. State lavorando sulla respirazione laterale a bordo vasca, un esercizio
            che ha già fatto altre volte. A metà spiegazione, Tommaso guarda verso la porta d&apos;ingresso — è
            arrivato un gruppo nuovo, fanno rumore mettendo giù le borse. Quando torna a guardarti, hai la
            sensazione che non abbia sentito l&apos;ultima parte di quello che hai detto.
          </p>
          <p className="prompt">Cosa fai — prima di fargli provare l&apos;esercizio?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Cosa fai davvero, in pratica</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — scelta1b, solo se esito D
  {
    day: "scelta 1b — recupero",
    pct: 28,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.scelta1b,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Scelta 1B · solo perché non hai riconosciuto la causa</div>
        <h1>Qualcosa non torna</h1>
        <p className="lede">
          Tommaso esegue l&apos;esercizio meccanicamente, sbagliando lo stesso dettaglio di prima senza provare a
          correggersi. Non sembra svogliato — sembra un po&apos; spento, come chi si aspetta un altro rimprovero.
        </p>
        <p className="prompt">Ti accorgi che qualcosa non torna nella tua prima lettura. Cosa fai adesso?</p>
        <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
        <h2>Cosa fai davvero, in pratica</h2>
        <OptionGroup name="scelta1b" options={SCELTA1B_OPTIONS} selected={answers.scelta1b} onPick={(v) => setResponse("scelta1b", v)} />
        {answers.scelta1b === "verifica" && (
          <div className="feedback ok">
            Tommaso si illumina un po&apos;: «...no, in realtà no.» Non era svogliatezza: gli era sfuggito un pezzo,
            e il rimprovero lo aveva solo scoraggiato di più.
          </div>
        )}
        {answers.scelta1b === "insiste" && (
          <div className="feedback retry">
            Tommaso esegue altri due tentativi, sempre uguali, senza più provare a correggersi da solo. Ha smesso di
            cercare — non perché non sappia, ma perché ha capito che il problema, secondo te, è lui e non il
            dettaglio che gli è sfuggito.
          </div>
        )}
      </>
    ),
  },

  // 3 — scelta2, il ritorno
  {
    day: "scelta 2 — il ritorno",
    pct: 45,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q2,
    render: ({ answers, setReflection }: StepContext) => {
      const v = scelta2Version(answers);
      const esito =
        v === "pulita" || v === "recupero-riuscito"
          ? "Tommaso prova l'esercizio, e lo fa quasi giusto."
          : "Tommaso prova l'esercizio, e ripete lo stesso errore sul dettaglio che gli era sfuggito.";
      return (
        <>
          <div className="eyebrow">Scelta 2 · Il ritorno</div>
          <h1>Il contesto con cui arrivi</h1>
          <div className="card">{SCELTA2_VERSION_TEXT[v]}</div>
          <p className="lede">{esito}</p>
          <p className="prompt">Scrivi il ritorno che gli dai adesso — specifico sul comportamento, mai sulla persona.</p>
          <Field id="q2" value={answers.q2 ?? ""} onChange={(v2) => setReflection("q2", v2)} />
        </>
      );
    },
  },

  // 4 — scelta3, cambiare strada, solo se serve
  {
    day: "scelta 3 — cambiare strada",
    pct: 65,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q3 && !!a.canale,
    visible: (a) => needsScelta3(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = answers.canale as "cambia" | "parole" | undefined;
      return (
        <>
          <div className="eyebrow">Scelta 3 · Cambiare strada</div>
          <h1>Stesso errore, una terza volta</h1>
          <p className="lede">
            Dopo il ritorno specifico, Tommaso riprova — stesso errore una terza volta. La spiegazione a parole,
            anche ripetuta con precisione, non sta bastando.
          </p>
          <p className="prompt">Cosa fai adesso — non ripetere ancora le stesse parole?</p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
          <h2>Cosa fai davvero, in pratica</h2>
          <OptionGroup name="canale" options={CANALE_OPTIONS} selected={answers.canale} onPick={(v) => setResponse("canale", v)} />
          {outcome === "cambia" && (
            <div className="feedback ok">
              Al tentativo successivo il movimento è quasi corretto — non perfetto, ma la testa gira nel momento
              giusto.
            </div>
          )}
          {outcome === "parole" && (
            <div className="feedback retry">
              Tommaso continua a sbagliare lo stesso dettaglio. Non è più un problema di distrazione: è diventato un
              problema di canale — e il canale «dire» ha già mostrato, tre volte, di non bastare.
            </div>
          )}
        </>
      );
    },
  },

  // 5 — chiusura
  {
    day: "chiusura",
    pct: 84,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Chiusura</div>
        <h1>Cosa porti con te</h1>
        <p className="prompt">
          In tutte le versioni: cosa porti con te, di questo scenario, la prossima volta che un allievo sembra
          distratto invece che in difficoltà?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Riflessione libera, non entra in nessun punteggio: i Casi Reali non sono un test, sono materiale di
          allenamento richiamabile in qualsiasi momento.
        </p>
      </>
    ),
  },

  // 6 — come si legge
  {
    day: "come si legge",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const oss =
        o === "A" ? "gestita al primo colpo" : o === "B" ? "gestita in parte" : recuperato(answers) ? "sbagliata, ma recuperata" : "sbagliata, non recuperata";
      const showScelta3 = needsScelta3(answers);
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completato</div>
          <div className="eyebrow">Come si legge questo scenario</div>
          <h1>Il bambino che si distrae</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Osservare e interpretare (Cap. 3)</span>
              <span className="esito">{oss}</span>
            </div>
            <div className="result-row">
              <span className="comp">Il ritorno (Cap. 7)</span>
              <span className="esito">registrato <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            {showScelta3 && (
              <div className="result-row">
                <span className="comp">Cambiare strada (Cap. 8)</span>
                <span className="esito">{answers.canale === "cambia" ? "gestita" : "da rinforzare"}</span>
              </div>
            )}
          </div>
          <p className="lede">
            La prima scelta ha tre esiti, non due: riconoscere la distrazione e agire bene non è la stessa cosa di
            riconoscerla e ignorarla. Un errore di lettura non chiude lo scenario — apre un secondo bivio, con un
            vero recupero possibile.
          </p>
        </>
      );
    },
  },
];
