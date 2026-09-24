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

const K_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "k1",
    prompt: "1. «Hai capito?» è una buona verifica?",
    options: [
      { value: "no", label: "No — quasi tutti dicono sì a prescindere", correct: true },
      { value: "si", label: "Sì — se lo chiedi con un tono deciso, il bambino risponde sinceramente", correct: false },
    ],
  },
  {
    key: "k2",
    prompt: "2. La sequenza corretta è:",
    options: [
      { value: "ascolta", label: "Comunico → il bambino ascolta, poi capisce da solo con il tempo", correct: false },
      { value: "fa", label: "Comunico → comprende → fa", correct: true },
    ],
  },
  {
    key: "k3",
    prompt: "3. Un bambino dice «ho capito» con sicurezza. Lo lasci partire per l'esercizio intero?",
    options: [
      { value: "no", label: "No — prima un tentativo breve, osservato", correct: true },
      { value: "si", label: "Sì — se lo dice con sicurezza, il tentativo breve è superfluo", correct: false },
    ],
  },
  {
    key: "k4",
    prompt: "4. Con un bambino di 4 anni, la verifica corretta è chiedergli se ha capito?",
    options: [
      { value: "si", label: "Sì — alla sua età basta chiederglielo con parole semplici", correct: false },
      { value: "no", label: "No — un piccolo compito immediato: «fammelo vedere adesso»", correct: true },
    ],
  },
  {
    key: "k5",
    prompt: "5. Il primo tentativo osservato non è chiaramente giusto né chiaramente sbagliato. Cosa fai?",
    options: [
      { value: "secondo", label: "Guardi un secondo tentativo, o rendi il primo più esplicito", correct: true },
      { value: "chiedo", label: "Torni a chiedere «hai capito?», tanto ha già risposto una volta", correct: false },
    ],
  },
  {
    key: "k6",
    prompt: "6. Dopo aver dato una correzione, la verifica è già completa?",
    options: [
      { value: "si", label: "Sì, la correzione stessa basta, non serve altro", correct: false },
      { value: "no", label: "No — anche la correzione va riverificata con l'azione", correct: true },
    ],
  },
];

const M_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "m1",
    prompt: "1. «Sei distratto» descrive un momento o etichetta la persona?",
    options: [
      { value: "persona", label: "Etichetta la persona", correct: true },
      { value: "momento", label: "Descrive solo il comportamento di quel momento, non lui come persona", correct: false },
    ],
  },
  {
    key: "m2",
    prompt: "2. Un bambino ha bevuto durante l'esercizio. Cosa gli è successo?",
    options: [
      { value: "fallito", label: "Ha sbagliato l'esercizio, e va corretto subito", correct: false },
      { value: "veloce", label: "Ha provato ad andare più veloce di quanto il corpo reggesse ancora", correct: true },
    ],
  },
  {
    key: "m3",
    prompt: "3. Un tentativo migliora un dettaglio ma ne perde un altro. Il ritorno giusto è:",
    options: [
      { value: "entrambe", label: "Nominare entrambe le cose, in modo specifico", correct: true },
      { value: "uno", label: "Scegliere solo lode, o solo correzione, per non confondere", correct: false },
    ],
  },
];

const SIM_OPTIONS: Option[] = [
  { value: "persona", label: "«Non stai attento, devi impegnarti di più»" },
  { value: "comportamento", label: "«Le braccia si sono aperte troppo presto, tienile chiuse un attimo di più»" },
];

const SIM2_OPTIONS: Option[] = [
  { value: "generico", label: "«Bravo, molto meglio!» — solo una lode generica" },
  { value: "entrambe", label: "Nomini sia il miglioramento sia il nuovo dettaglio, entrambi in modo specifico" },
];

const T_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "t1",
    prompt: "1. «Sei distratto» e «adesso guardavi la finestra» sono la stessa cosa?",
    options: [
      { value: "si", label: "Sì — sono due modi diversi di dire la stessa cosa", correct: false },
      { value: "no", label: "No — la prima etichetta la persona, la seconda descrive un momento", correct: true },
    ],
  },
  {
    key: "t2",
    prompt: "2. «Bravo» è un buon complimento?",
    options: [
      { value: "no", label: "È piacevole ma non insegna niente", correct: true },
      { value: "si", label: "Sì — è breve ma il bambino capisce comunque cosa ha fatto bene", correct: false },
    ],
  },
  {
    key: "t3",
    prompt: "3. Un bambino ha bevuto durante l'esercizio. È un fallimento?",
    options: [
      { value: "si", label: "Sì — bere durante l'esercizio vuol dire che non ce la fa", correct: false },
      { value: "no", label: "No — è un'informazione", correct: true },
    ],
  },
  {
    key: "t4",
    prompt: "4. Un complimento vago si dimentica, uno specifico...",
    options: [
      { value: "ripete", label: "Si ripete — il bambino sa cosa ha fatto per meritarlo", correct: true },
      { value: "uguale", label: "Anche, non fa differenza — tanto il bambino si ricorda lo stesso", correct: false },
    ],
  },
  {
    key: "t5",
    prompt: "5. (dal Capitolo 6) «Hai capito?» è una buona verifica?",
    options: [
      { value: "si", label: "Sì — se risponde subito, vuol dire che ha capito bene", correct: false },
      { value: "no", label: "No — anche chi non ha capito risponde spesso di sì", correct: true },
    ],
  },
  {
    key: "t6",
    prompt: "6. Il ritorno vago fa male al bambino?",
    options: [
      { value: "vuoto", label: "Non fa male, ma non insegna niente", correct: true },
      { value: "male", label: "Sì, sempre — un bambino che sente sempre lo stesso commento si spegne", correct: false },
    ],
  },
  {
    key: "t7",
    prompt: "7. Un tentativo migliora un dettaglio ma ne perde un altro. Il ritorno giusto è:",
    options: [
      { value: "uno", label: "Scegliere solo lode, o solo correzione, per restare più semplice", correct: false },
      { value: "entrambe", label: "Nominare entrambe le cose, in modo specifico", correct: true },
    ],
  },
  {
    key: "t8",
    prompt: "8. Con un adolescente, un complimento specifico detto con tono da tifoseria («bravissimo, campione!») funziona come con un bambino piccolo?",
    options: [
      { value: "no", label: "No — a quell'età il tono conta quanto il contenuto: rispettoso, non da tifoseria", correct: true },
      { value: "si", label: "Sì, l'entusiasmo funziona a ogni età", correct: false },
    ],
  },
  {
    key: "t9",
    prompt: "9. Se dai una correzione e il bambino migliora solo in parte, basta una lode generica al tentativo successivo?",
    options: [
      { value: "si", label: "Sì, l'importante è incoraggiare", correct: false },
      { value: "no", label: "No — va nominato anche il dettaglio nuovo ancora da correggere", correct: true },
    ],
  },
];

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo7Steps: Step[] = [
  // 0 — copertina
  {
    day: "inizio",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capitolo 7 · IL RITORNO</div>
        <h1>Che cosa gli dico dopo che ha provato?</h1>
        <p className="lede">
          L&apos;istruttore dà un ritorno — positivo o correttivo — descrivendo il comportamento
          osservato, mai etichettando la persona.
        </p>
      </>
    ),
  },

  // 1 — lunedì: riflessione + consolidamento Capitolo 6
  {
    day: "lunedì · 10 min",
    pct: 12,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lunedì</div>
        <h1>Com&apos;è andata in vasca?</h1>
        <p className="lede">
          La settimana scorsa: un turno intero senza chiedere «hai capito?» a nessuno. Cosa hai
          guardato al suo posto, e cosa hai scoperto?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidamento — il Capitolo 6 torna</h2>
        {K_QUESTIONS.map((q) => (
          <div key={q.key}>
            <p className="prompt">{q.prompt}</p>
            <OptionGroup name={q.key} options={q.options} selected={answers[q.key]} onPick={(v, correct) => setResponse(q.key, v, correct)} />
          </div>
        ))}
      </>
    ),
  },

  // 2 — martedì: descrivere il comportamento, non etichettare la persona
  {
    day: "martedì · 13 min",
    pct: 30,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Martedì</div>
        <h1>Cosa ha fatto, non chi è</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Hai visto l&apos;azione. Ora: cosa gli dici — dopo, quando è andata bene, e quando no?
        </p>
        <p className="lede">
          «Sei distratto» parla di lui come persona. «Adesso stavi guardando la finestra» parla
          solo di quello che è successo in quel momento. Se ripeti spesso la prima frase, diventa
          un&apos;etichetta che il bambino si porta addosso: alla fine smette di provare a
          dimostrare il contrario, perché è più facile diventare quello che gli dici di essere. La
          seconda frase invece descrive un momento preciso, che può cambiare già al tentativo
          dopo.
        </p>
        <p className="lede">
          <strong>Vale anche per i complimenti.</strong> «Sei bravo» è piacevole ma non insegna
          niente. «Hai tenuto le gambe dritte per tutta la vasca» gli dice esattamente cosa rifare.
        </p>
        <div className="card quote">
          Un bambino che ha bevuto durante l&apos;esercizio non ha «sbagliato»: ha provato ad
          andare più veloce di quanto il corpo fosse ancora pronto a reggere. Detto così,
          l&apos;errore diventa un&apos;informazione da usare — non una colpa da scontare.
        </div>
        <p className="lede">
          Anche un complimento generico può fare tanto danno quanto una critica generica. Sembra
          innocuo —
          nessuno si offende per un «bravo» — ma un bambino che sente solo lodi vaghe, capitolo
          dopo capitolo, smette di sapere cosa lo rende davvero bravo. Il ritorno vago non fa male:
          semplicemente non insegna niente, ed è comunque tempo speso senza costruire nulla.
        </p>
        <p className="lede">
          <strong>E quando il tentativo è a metà strada</strong> — né chiaramente riuscito né
          chiaramente sbagliato? Succede più spesso di quanto sembri: un bambino che migliora un
          dettaglio ma ne perde un altro. La tentazione è scegliere un solo messaggio — tutto lode,
          o tutta correzione — ma nessuno dei due è vero fino in fondo. Il ritorno corretto nomina
          entrambe le cose, sempre in modo specifico: «hai tenuto le braccia distese, questo è
          nuovo e va benissimo — la testa però è scesa un attimo troppo presto, prova a tenerla su
          un po&apos; di più.»
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controllo di fine giornata</h2>
        {M_QUESTIONS.map((q) => (
          <div key={q.key}>
            <p className="prompt">{q.prompt}</p>
            <OptionGroup name={q.key} options={q.options} selected={answers[q.key]} onPick={(v, correct) => setResponse(q.key, v, correct)} />
          </div>
        ))}
      </>
    ),
  },

  // 3 — mercoledì: scene + applicazione + simulazione Tommaso (due tentativi)
  {
    day: "mercoledì",
    pct: 46,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.sim && !!a.sim2,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Mercoledì</div>
        <h1>Un complimento vago si dimentica</h1>
        <div className="card scene">
          <div className="who">Un bambino di 9 anni, «ma non stai attento!»</div>
          <p>
            Continua a girare la testa troppo tardi. Alla terza volta, l&apos;istruttore dice «ma
            non stai attento!» — il bambino si chiude, rallenta. Se avesse detto «hai girato la
            testa un attimo dopo il braccio — prova a girarla insieme al braccio, non dopo», il
            bambino avrebbe avuto un&apos;informazione precisa, senza etichetta da difendersi.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Un bambino di 11 anni, il tuffo perfetto</div>
          <p>
            Completa per la prima volta un tuffo di partenza corretto. L&apos;istruttore, di
            corsa, dice «bravo!» senza fermarsi. Il bambino non saprebbe dire cosa ha fatto di
            diverso — e alla prossima partenza torna al vecchio movimento. Fermarsi tre secondi —
            «ti sei allungato bene sulle braccia, è quello che ha cambiato tutto» — gli avrebbe
            detto cosa ripetere.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Un ragazzo di 16 anni</div>
          <p>
            Ha appena migliorato il tempo su una virata, dopo settimane indietro sul gruppo.
            Nel Capitolo 2 hai già visto l&apos;errore da evitare: trattare un adolescente con un
            tono da bambino piccolo lo fa sentire preso in giro. Per questo l&apos;istruttore non
            dice «bravissimo, campione!». Dice,
            con tono normale, quasi tecnico: «hai spinto con le gambe un attimo prima del tocco, è
            lì che hai guadagnato il tempo.» Il ragazzo annuisce, non sorride in modo plateale — ma
            la volta dopo ripete lo stesso movimento apposta.{" "}
            <strong>
              Specifico funziona a ogni età — ma a 16 anni il tono con cui è specifico conta quanto
              il contenuto: rispettoso, non da tifoseria.
            </strong>
          </p>
        </div>
        <p className="lede">
          <strong>Tre scene, la stessa regola: mai un&apos;etichetta, mai una lode generica —
          sempre il comportamento preciso, a qualunque età.</strong>
        </p>
        <p className="prompt">
          Un bambino di 10 anni ha appena completato per la prima volta un tuffo di partenza
          corretto, dopo settimane di tentativi. Scrivi il ritorno che gli daresti — specifico, sul
          comportamento.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota per la correzione, non mostrata all'istruttore: il sistema cerca un ritorno che
            nomini cosa è successo di preciso, non una lode generica. */}
        <h2>Simulazione</h2>
        <p className="lede">
          <strong>TOMMASO, 8 anni.</strong> Ha appena sbagliato lo stesso esercizio per la seconda
          volta di fila. Cosa gli dici?
        </p>
        <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
        {answers.sim === "persona" && (
          <div className="feedback retry">
            TOMMASO: <em>(abbassa lo sguardo)</em> «...scusa.» <em>(esegue di nuovo, allo stesso
            modo di prima)</em>
            <br />
            Si è scusato, ma non ha ricevuto nessuna informazione su cosa cambiare.
          </div>
        )}
        {answers.sim === "comportamento" && (
          <div className="feedback ok">
            TOMMASO: «Ah, ok» <em>(riprova, cambiando qualcosa)</em>
            <br />
            Ha ricevuto un&apos;istruzione precisa, e la usa.
          </div>
        )}
        {answers.sim && (
          <>
            <p className="lede" style={{ marginTop: 14 }}>
              Tommaso riprova: le braccia restano chiuse più a lungo, un miglioramento reale — ma
              adesso è la testa a girarsi un attimo troppo presto, un dettaglio nuovo, mai
              corretto prima con lui.
            </p>
            <p className="prompt">Scrivi il ritorno che gli dai adesso.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup name="sim2" options={SIM2_OPTIONS} selected={answers.sim2} onPick={(v) => setResponse("sim2", v)} />
            {answers.sim2 === "generico" && (
              <div className="feedback retry">
                TOMMASO sorride, ma al tentativo successivo la testa continua a girarsi troppo
                presto — non sa che c&apos;è ancora qualcosa da aggiustare.
              </div>
            )}
            {answers.sim2 === "entrambe" && (
              <div className="feedback ok">
                TOMMASO: «...ok, quindi le braccia vanno bene ma la testa no» <em>(riprova,
                stavolta attento a entrambe le cose)</em>
              </div>
            )}
            <p className="lede" style={{ fontSize: ".85rem" }}>
              Il ritorno su un tentativo a metà strada non è un complimento indebolito né una
              correzione travestita da lode: sono due informazioni vere, dette entrambe, in modo
              specifico.
            </p>
          </>
        )}
      </>
    ),
  },

  // 4 — mercoledì sera: trasferimento della regola al ritorno positivo
  {
    day: "mercoledì sera",
    pct: 62,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controllo di fine giornata — trasferimento</div>
        <h1>Anche quando va bene</h1>
        <p className="lede">
          Una bambina di 7 anni ha appena eseguito, per la prima volta, un ingresso in acqua senza
          aggrapparsi al bordo. Non hai ancora deciso cosa dirle.
        </p>
        <p className="prompt">Scrivi il complimento che le faresti, specifico, non generico.</p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota per la correzione, non mostrata all'istruttore: non è la scena già vista (che
            era su un errore, non su un successo) — è voluto. Il sistema controlla se applica la
            stessa regola della specificità anche quando il ritorno è positivo, non solo quando è
            correttivo. */}
      </>
    ),
  },

  // 5 — il turno in vasca
  {
    day: "in vasca",
    pct: 70,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Il tuo turno in vasca</div>
        <h1>Solo il comportamento, mai la persona</h1>
        <p className="lede">
          Questa settimana, ogni ritorno che dai — positivo o correttivo — deve nominare un
          comportamento preciso, mai la persona. Niente «bravo» e niente «non stai attento»: solo
          cosa è successo.
        </p>
      </>
    ),
  },

  // 6 — venerdì: test cumulativo Capitolo 6 + Capitolo 7
  {
    day: "venerdì · 11 min",
    pct: 86,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Venerdì — test cumulativo: Capitolo 6 + Capitolo 7</div>
        <h1>Il test</h1>
        {T_QUESTIONS.map((q) => (
          <div key={q.key}>
            <p className="prompt">{q.prompt}</p>
            <OptionGroup name={q.key} options={q.options} selected={answers[q.key]} onPick={(v, correct) => setResponse(q.key, v, correct)} />
          </div>
        ))}
        <p className="prompt">
          10. Un ragazzo di 14 anni sbaglia lo stesso errore tecnico per la quarta volta e comincia
          a mostrare frustrazione. Scrivi il ritorno che gli daresti.
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
          Hai risposto che sono la stessa cosa. Rileggile: una dice chi è lui («distratto»),
          l&apos;altra dice cosa è successo in quel momento («guardavi la finestra»). La seconda
          si può correggere il momento dopo. La prima, ripetuta, diventa qualcosa da cui è
          difficile staccarsi.
        </div>
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
        t1: "no", t2: "no", t3: "no", t4: "ripete", t5: "no",
        t6: "vuoto", t7: "entrambe", t8: "no", t9: "no",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recupero — solo perché il test ha trovato qualche difficoltà</div>
        <h1>Tre esempi in più, per allenare l&apos;occhio</h1>
        <p className="lede">
          Non è un fallimento: è solo il segnale che vale la pena rivedere il punto più delicato di
          questo capitolo con qualche esempio in più — descrivere il comportamento, non etichettare
          la persona, e dirlo in modo specifico.
        </p>

        <div className="card scene">
          <div className="who">Un bambino di 8 anni, l&apos;allungamento perfetto</div>
          <p>
            Per la prima volta tiene le braccia ben distese sul dorso. L&apos;istruttore gli dice
            solo «Bravissimo!» e passa al prossimo allievo. Il bambino sorride, ma alla vasca
            successiva torna alla vecchia posizione.
          </p>
        </div>
        <p className="prompt">Cosa gli è mancato, in questo complimento?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "niente", label: "Niente — l'entusiasmo del «bravissimo» basta a motivarlo", correct: false },
            {
              value: "cosa",
              label: "Sapere cosa esattamente ha fatto di diverso — senza saperlo, non può ripeterlo",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Una bambina di 10 anni, il tuffo a metà strada</div>
          <p>
            Nel tuffo di partenza, per la prima volta tiene le braccia ben distese — una novità. Ma
            stacca i piedi troppo presto, un difetto che ha già da settimane. L&apos;istruttore le
            dice solo «devi stare più attenta con i piedi», ignorando il miglioramento.
          </p>
        </div>
        <p className="prompt">Cosa manca in questo ritorno?</p>
        <OptionGroup
          name="rec2"
          options={[
            {
              value: "urgente",
              label: "Va bene così — la correzione sul difetto rimasto è la cosa più urgente",
              correct: false,
            },
            {
              value: "entrambe",
              label:
                "Manca nominare anche ciò che è migliorato — le braccia distese — non solo il difetto rimasto",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Un ragazzo di 15 anni, la bracciata migliorata</div>
          <p>
            Dopo settimane, migliora finalmente la bracciata. L&apos;istruttore, entusiasta,
            davanti a tutto il gruppo, gli grida con tono da tifoseria: «Bravissimo campione, hai
            spinto benissimo con le gambe!»
          </p>
        </div>
        <p className="prompt">
          Il contenuto è specifico («hai spinto benissimo con le gambe»). Basta questo per andare
          bene a questa età?
        </p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "si", label: "Sì — se il contenuto è specifico, il tono non conta", correct: false },
            {
              value: "no",
              label:
                "No — a questa età il tono conta quanto il contenuto: meglio normale e rispettoso, non da tifoseria",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Il comportamento descritto in modo preciso lascia sempre qualcosa da ripetere.
          L&apos;etichetta — buona o cattiva — non lascia niente da usare.
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
                <td style={{ padding: "6px 0" }}>Il ritorno scritto al §7</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Come hai corretto Tommaso al §8, in entrambi i tentativi</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>Il racconto di lunedì sul Capitolo 6</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Rinforzo e correzione</td>
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
        <div className="done-badge">✓ Capitolo 7 completato</div>
        <div className="eyebrow">Settimana 7 di 10 · Capitolo 8 in arrivo</div>
        <h1>Cambiare strada</h1>
        <p className="lede">
          Oggi hai imparato a dare un buon ritorno. La settimana prossima impari cosa fare quando,
          nonostante tutto, quello che dici non funziona lo stesso.
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
          <div className="chip acquisita">
            <span className="name">7 · Il ritorno</span>
            <span className="state">acquisita</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">8 · Cambiare strada</span>
            <span className="state">non acquisita</span>
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
