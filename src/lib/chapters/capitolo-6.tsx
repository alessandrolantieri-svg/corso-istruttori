import type { ReactNode } from "react";
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

const K1_OPTIONS: Option[] = [
  { value: "no", label: "No — meglio dire cosa fare: «guarda di lato quando respiri»", correct: true },
  { value: "si", label: "Sì — è comunque chiaro, dice cosa evitare", correct: false },
];
const K2_OPTIONS: Option[] = [
  { value: "si", label: "Sì — è un dato reale, misurato in uno studio famoso", correct: false },
  { value: "no", label: "No, è un numero fuori contesto", correct: true },
];
const K3_OPTIONS: Option[] = [
  { value: "corpo", label: "Al corpo — è il segnale più difficile da falsificare", correct: true },
  { value: "parole", label: "Alle parole — sono il messaggio esplicito, quindi il più affidabile", correct: false },
];
const K4_OPTIONS: Option[] = [
  { value: "bersaglio", label: "Un bersaglio", correct: true },
  { value: "ostacolo", label: "Un ostacolo", correct: false },
];
const K5_OPTIONS: Option[] = [
  { value: "no", label: "No — in un'emergenza reale la chiarezza immediata conta di più", correct: true },
  { value: "si", label: "Sì, la regola vale sempre, anche in emergenza", correct: false },
];
const K6_OPTIONS: Option[] = [
  { value: "sincero", label: "Come un complimento sincero — le parole giuste bastano comunque", correct: false },
  { value: "abitudine", label: "Come qualcosa detto per abitudine, non un riconoscimento vero", correct: true },
];

const M1_OPTIONS: Option[] = [
  { value: "no", label: "No — risponde «sì» quasi sempre, a prescindere", correct: true },
  { value: "si", label: "Sì — se lo chiedi con calma, il bambino risponde onestamente", correct: false },
];
const M2_OPTIONS: Option[] = [
  { value: "ascolta", label: "Comunico → ascolta → fine", correct: false },
  { value: "fa", label: "Comunico → comprende → fa", correct: true },
];
const M3_OPTIONS: Option[] = [
  { value: "secondo", label: "Guardi un secondo tentativo, o rendi il primo più esplicito", correct: true },
  { value: "chiedo", label: "Torni a chiedere «hai capito?» — di solito basta a sciogliere il dubbio", correct: false },
];

const SIM_OPTIONS: Option[] = [
  { value: "chiedo", label: "Le chiedo se ha capito" },
  { value: "tentativo", label: "Le chiedo un primo tentativo breve, o di mostrartelo fermo sul bordo" },
];
const SIM2_OPTIONS: Option[] = [
  { value: "riparte", label: "Dai la correzione e la lasci ripartire, senza guardare il tentativo successivo" },
  { value: "osservi", label: "Dai la correzione e osservi il tentativo successivo prima di lasciarla andare avanti" },
];

const T1_OPTIONS: Option[] = [
  { value: "no", label: "No — quasi tutti rispondono «sì» a prescindere", correct: true },
  { value: "si", label: "Sì — se lo chiede con attenzione, la risposta è affidabile", correct: false },
];
const T2_OPTIONS: Option[] = [
  { value: "ascolta", label: "Comunico → il bambino ascolta → fine", correct: false },
  { value: "fa", label: "Comunico → comprende → fa", correct: true },
];
const T3_OPTIONS: Option[] = [
  { value: "osservi", label: "Osservi un primo tentativo breve", correct: true },
  { value: "parte", label: "Lo lasci partire per l'esercizio completo", correct: false },
];
const T4_OPTIONS: Option[] = [
  { value: "chiedo", label: "Chiedergli se ha capito, con parole semplici", correct: false },
  { value: "compito", label: "Un piccolo compito immediato: «fammelo vedere adesso»", correct: true },
];
const T5_OPTIONS: Option[] = [
  { value: "parole", label: "Alle parole — sono il messaggio esplicito, quindi il più affidabile", correct: false },
  { value: "corpo", label: "Al corpo — è il segnale più difficile da falsificare", correct: true },
];
const T6_OPTIONS: Option[] = [
  { value: "si", label: "Sì, l'importante è provare — l'errore si sistema strada facendo", correct: false },
  { value: "no", label: "No — l'errore si scopre più tardi, quando costa di più correggerlo", correct: true },
];
const T7_OPTIONS: Option[] = [
  { value: "no", label: "No — serve sempre almeno una vasca vera, raccontata e verificata", correct: true },
  { value: "si", label: "Sì, se le risposte sono corrette, il resto è solo formalità", correct: false },
];
const T8_OPTIONS: Option[] = [
  { value: "decidi", label: "Decidere comunque, un'informazione parziale basta", correct: false },
  { value: "secondo", label: "Guardare un secondo tentativo, o rendere il primo più esplicito", correct: true },
];
const T9_OPTIONS: Option[] = [
  { value: "si", label: "Sì, la correzione stessa basta, non serve altro controllo", correct: false },
  { value: "no", label: "No — anche la correzione va riverificata con l'azione", correct: true },
];

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo6Steps: Step[] = [
  // 0 — copertina
  {
    day: "inizio",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capitolo 6 · FARLO AGIRE, E VEDERE SE È ARRIVATO <i className="ph-duotone ph-trophy" aria-hidden="true" /></div>
        <h1>«Hai capito?» non serve a niente. E allora?</h1>
        <p className="lede">
          L&apos;istruttore verifica se un messaggio è arrivato osservando se il bambino fa quello
          che gli è stato chiesto — non chiedendogli se ha capito.
        </p>
        <div className="card warn">
          <strong>Standard più alto.</strong> Insieme al Capitolo 3, questa è una delle due
          competenze dell&apos;ascolto: qui non basta ACQUISITA, serve arrivare a{" "}
          <strong>ECCELLENTE</strong> prima dell&apos;esame finale — e la sola simulazione non
          basta mai: serve sempre almeno una vasca vera.
        </div>
      </>
    ),
  },

  // 1 — lunedì: riflessione + consolidamento Capitolo 5
  {
    day: "lunedì · 8 min",
    pct: 12,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lunedì</div>
        <h1>Com&apos;è andata in vasca?</h1>
        <p className="lede">
          La settimana scorsa: una consegna in positivo, detta fermandoti a guardare il bambino.
          Cos&apos;hai notato nella sua reazione, rispetto al solito?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidamento — il Capitolo 5 torna</h2>
        <p className="prompt">1. «Non affondare la testa» è una buona consegna?</p>
        <OptionGroup name="k1" options={K1_OPTIONS} selected={answers.k1} onPick={(v, correct) => setResponse("k1", v, correct)} />
        <p className="prompt">2. Le parole contano il 7% della comunicazione — è vero in generale?</p>
        <OptionGroup name="k2" options={K2_OPTIONS} selected={answers.k2} onPick={(v, correct) => setResponse("k2", v, correct)} />
        <p className="prompt">3. Se parole e corpo si contraddicono, il bambino crede...</p>
        <OptionGroup name="k3" options={K3_OPTIONS} selected={answers.k3} onPick={(v, correct) => setResponse("k3", v, correct)} />
        <p className="prompt">4. Una consegna in positivo dà al corpo un bersaglio o un ostacolo?</p>
        <OptionGroup name="k4" options={K4_OPTIONS} selected={answers.k4} onPick={(v, correct) => setResponse("k4", v, correct)} />
        <p className="prompt">
          5. In un&apos;emergenza reale, è sbagliato dire «fermo!» invece di riformulare in
          positivo?
        </p>
        <OptionGroup name="k5" options={K5_OPTIONS} selected={answers.k5} onPick={(v, correct) => setResponse("k5", v, correct)} />
        <p className="prompt">
          6. Un ragazzo di 14 anni riceve un complimento vero ma detto con tono meccanico e corpo
          distratto. Come lo vive più probabilmente?
        </p>
        <OptionGroup name="k6" options={K6_OPTIONS} selected={answers.k6} onPick={(v, correct) => setResponse("k6", v, correct)} />
      </>
    ),
  },

  // 2 — martedì: comunico → comprende → fa
  {
    day: "martedì · 13 min",
    pct: 30,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Martedì</div>
        <h1>Comunico → comprende → fa</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Hai detto la cosa giusta, nel modo giusto. Ma è davvero arrivata? Oggi impari a
          scoprirlo senza chiederlo.
        </p>
        <p className="lede">
          La sequenza vera non è «comunico → il bambino ascolta». <strong>L&apos;azione è la
          prova</strong>, non l&apos;ascolto. E la domanda più usata per verificare — «hai
          capito?» — è quasi inutile: un bambino risponde «sì» quasi sempre, che abbia capito o
          no.
        </p>
        <div className="card quote">
          La domanda giusta non si fa a parole: si fa con gli occhi. Dai la consegna, e guardi
          cosa succede — non se annuisce, ma se il corpo comincia a fare quello che hai chiesto.
        </div>
        <p className="lede">
          <strong>Un&apos;eccezione utile:</strong> con i più piccoli (fascia 3-5) puoi
          trasformare la verifica in un piccolo compito immediato — «fammi vedere come fai la
          stella» — invece di chiedere se hanno capito. È ancora la stessa regola: verifichi con
          l&apos;azione, non con la parola.
        </p>
        <p className="lede">
          <strong>E se il primo tentativo osservato non è chiaro?</strong> A volte il movimento
          che vedi non è né chiaramente giusto né chiaramente sbagliato — hai solo visto una
          parte, non abbastanza per essere sicuro. Non è colpa del metodo: guarda un secondo
          tentativo, o rendi il primo un po&apos; più esplicito («fallo di nuovo, un po&apos; più
          lento») — non tornare a chiedere «hai capito?», e non indovinare. Verificare con
          l&apos;azione non vuol dire che basti sempre un solo sguardo: vuol dire che a decidere è
          sempre quello che vedi — anche se a volte serve guardare due volte prima di essere
          sicuro.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controllo di fine giornata</h2>
        <p className="prompt">1. «Hai capito?» è affidabile perché il bambino risponde in modo sincero?</p>
        <OptionGroup name="m1" options={M1_OPTIONS} selected={answers.m1} onPick={(v, correct) => setResponse("m1", v, correct)} />
        <p className="prompt">2. La sequenza corretta è:</p>
        <OptionGroup name="m2" options={M2_OPTIONS} selected={answers.m2} onPick={(v, correct) => setResponse("m2", v, correct)} />
        <p className="prompt">
          3. Il primo tentativo osservato non è chiaramente giusto né chiaramente sbagliato. Cosa
          fai?
        </p>
        <OptionGroup name="m3" options={M3_OPTIONS} selected={answers.m3} onPick={(v, correct) => setResponse("m3", v, correct)} />
      </>
    ),
  },

  // 3 — mercoledì: scene + applicazione + simulazione Sara
  {
    day: "mercoledì",
    pct: 46,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.sim && !!a.sim2,
    render: ({ answers, setResponse, setReflection }: StepContext) => {
      const simFeedback: ReactNode =
        answers.sim === "chiedo" ? (
          <div className="feedback retry">
            SARA: «Sì, ho capito!» <em>(parte per la scivolata — le braccia si piegano subito)</em>
            <br />
            L&apos;errore lo scopri dopo, in mezzo all&apos;esercizio.
          </div>
        ) : answers.sim === "tentativo" ? (
          <div className="feedback ok">
            SARA: <em>(prova la posizione sul bordo — le braccia sono già piegate)</em> «...così?»
            <br />
            Lo vedi prima ancora che parta — e puoi correggerlo mentre costa ancora poco.
          </div>
        ) : null;

      const sim2Feedback: ReactNode =
        answers.sim2 === "riparte" ? (
          <div className="feedback retry">
            SARA riparte, e nessuno sa se l&apos;errore si è davvero corretto finché non è di
            nuovo a metà vasca — la correzione, da sola, non è ancora una verifica.
          </div>
        ) : answers.sim2 === "osservi" ? (
          <div className="feedback ok">
            SARA prova di nuovo: le braccia restano quasi distese. Adesso lo sai per certo — non
            perché lei l&apos;ha detto, ma perché l&apos;hai visto.
          </div>
        ) : null;

      return (
        <>
          <div className="eyebrow">Mercoledì</div>
          <h1>Si guarda il corpo, non si ascolta la risposta</h1>
          <div className="card scene">
            <div className="who">Un bambino di 8 anni, «sì, ho capito»</div>
            <p>
              Dopo la spiegazione della respirazione laterale, dice «sì, ho capito» con sicurezza.
              L&apos;istruttore lo lascia partire per la vasca intera. A metà vasca comincia a
              bere, si ferma, tossisce. Se avesse guardato la prima bracciata, avrebbe visto che
              girava la testa troppo tardi rispetto al braccio — visibile subito, non a metà
              vasca. Il «sì» non era una bugia: era solo inutile come informazione.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Emma, 4 anni</div>
            <p>
              L&apos;istruttore le ha appena mostrato come fare la stella. Con lei non ha senso
              chiedere «hai capito?» — le dice invece: «fammela vedere tu, adesso, sul bordo.»
              Emma allarga braccia e gambe, imperfetta ma nella direzione giusta — tre secondi, non
              dieci minuti.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Un ragazzo di 15 anni</div>
            <p>
              Dice «sì, ho capito, tranquillo» con tono un po&apos; spazientito, dopo la
              spiegazione di una virata tecnica — a quell&apos;età «hai capito?» può sembrare
              quasi un&apos;offesa. L&apos;istruttore non gliela ripete, e non gli chiede nemmeno
              «fammi vedere» come a Emma: gli propone, da pari a pari, «facciamo un passaggio
              lento sul bordo prima di buttarti, giusto per essere sicuri sul tempismo.» Nel farlo
              lentamente, il ragazzo esita proprio nel punto critico. Non è stato messo alla prova
              come un bambino: gli è stata offerta una verifica vestita da rifinitura tecnica.
            </p>
          </div>
          <p className="lede">
            <strong>
              Stessa regola, tre fasce diverse — cambia solo come la richiesta viene vestita per
              l&apos;età.
            </strong>
          </p>
          <p className="prompt">
            Hai appena dato una consegna a un bambino di 9 anni. Lui annuisce e dice «sì, ho
            capito». Cosa fai, prima di lasciarlo partire per l&apos;esercizio intero?
          </p>
          <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
          {/* Nota per la correzione, non mostrata all'istruttore: il sistema cerca se propone un
              primo tentativo breve da osservare, invece di fidarsi della parola e lasciarlo
              andare avanti per intero. */}
          <h2>Simulazione</h2>
          <p className="lede">
            <strong>SARA, 10 anni.</strong> Le hai appena spiegato come tenere le braccia distese
            durante la scivolata. Cosa fai per verificare se è arrivata la consegna?
          </p>
          <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
          {simFeedback}
          {answers.sim && (
            <>
              <p className="lede" style={{ marginTop: 14 }}>
                Qualunque sia stata la tua prima scelta, adesso hai visto l&apos;errore: le
                braccia di Sara sono piegate. Le dai una correzione in positivo, con tono e corpo
                coerenti.
              </p>
              <p className="prompt">
                Scrivi cosa fai subito dopo aver dato la correzione — non solo la correzione
                stessa.
              </p>
              <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
              <OptionGroup name="sim2" options={SIM2_OPTIONS} selected={answers.sim2} onPick={(v) => setResponse("sim2", v)} />
              {sim2Feedback}
            </>
          )}
        </>
      );
    },
  },

  // 4 — mercoledì sera: trasferimento fascia 3-5
  {
    day: "mercoledì sera",
    pct: 62,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controllo di fine giornata — trasferimento</div>
        <h1>Fascia 3-5, senza aver ancora provato niente</h1>
        <p className="lede">
          Un bambino di 5 anni, fascia 3-5, deve imparare a soffiare bolle sott&apos;acqua. Non
          hai ancora provato niente con lui.
        </p>
        <p className="prompt">
          Come verifichi se ha capito, rispettando la sua fascia — senza chiedergli «hai capito?»
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
      </>
    ),
  },

  // 5 — turno in vasca
  {
    day: "in vasca",
    pct: 69,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Il tuo turno in vasca</div>
        <h1>Un turno intero, senza «hai capito?»</h1>
        <p className="lede">
          Questa settimana, per un turno intero, non chiedere «hai capito?» a nessuno. Dai la
          consegna e guarda l&apos;azione. Solo quella.
        </p>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Se non hai un turno questa settimana: una simulazione rinforzata sblocca il passaggio,
          ma non basta a portare questa competenza a ECCELLENTE. Per quello, prima o poi, serve
          una vasca vera.
        </p>
      </>
    ),
  },

  // 6 — venerdì: test cumulativo Capitolo 5 + Capitolo 6
  {
    day: "venerdì · 11 min",
    pct: 86,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) =>
      ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Venerdì — test cumulativo: Capitolo 5 + Capitolo 6</div>
        <h1>Il test</h1>
        <p className="prompt">1. «Hai capito?» è una buona domanda di verifica?</p>
        <OptionGroup name="t1" options={T1_OPTIONS} selected={answers.t1} onPick={(v, correct) => setResponse("t1", v, correct)} />
        <p className="prompt">2. La sequenza corretta è:</p>
        <OptionGroup name="t2" options={T2_OPTIONS} selected={answers.t2} onPick={(v, correct) => setResponse("t2", v, correct)} />
        <p className="prompt">3. Un bambino dice «ho capito» con sicurezza. Cosa fai?</p>
        <OptionGroup name="t3" options={T3_OPTIONS} selected={answers.t3} onPick={(v, correct) => setResponse("t3", v, correct)} />
        <p className="prompt">4. Con un bambino di 4 anni, la verifica corretta è:</p>
        <OptionGroup name="t4" options={T4_OPTIONS} selected={answers.t4} onPick={(v, correct) => setResponse("t4", v, correct)} />
        <p className="prompt">
          5. <em>(dal Capitolo 5)</em> Quando parole e corpo si contraddicono, il bambino crede a:
        </p>
        <OptionGroup name="t5" options={T5_OPTIONS} selected={answers.t5} onPick={(v, correct) => setResponse("t5", v, correct)} />
        <p className="prompt">6. Credere al «sì» invece di guardare l&apos;azione è un errore neutro?</p>
        <OptionGroup name="t6" options={T6_OPTIONS} selected={answers.t6} onPick={(v, correct) => setResponse("t6", v, correct)} />
        <p className="prompt">7. Per questa competenza, una buona simulazione basta per ECCELLENTE?</p>
        <OptionGroup name="t7" options={T7_OPTIONS} selected={answers.t7} onPick={(v, correct) => setResponse("t7", v, correct)} />
        <p className="prompt">8. Il primo tentativo osservato non è chiaro. La cosa giusta è:</p>
        <OptionGroup name="t8" options={T8_OPTIONS} selected={answers.t8} onPick={(v, correct) => setResponse("t8", v, correct)} />
        <p className="prompt">9. Dopo aver dato una correzione, la verifica è già completa?</p>
        <OptionGroup name="t9" options={T9_OPTIONS} selected={answers.t9} onPick={(v, correct) => setResponse("t9", v, correct)} />
        <p className="prompt">
          10. Un ragazzo di 13 anni dice «ok, ho capito, dai andiamo» con un tono leggermente
          infastidito. Scrivi in due righe cosa fai prima di lasciarlo partire.
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
          Esempio di feedback generato, in caso di errore alla domanda 3:
        </p>
        <div className="card quote">
          Hai risposto di lasciarlo partire. Ma «ho capito» detto con sicurezza non è una
          garanzia — è solo una parola. La differenza fra scoprire un errore sul bordo o
          scoprirlo a metà vasca è un tentativo breve osservato prima, che costa pochi secondi.
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
        t1: "no", t2: "fa", t3: "osservi", t4: "compito", t5: "corpo",
        t6: "no", t7: "no", t8: "secondo", t9: "no",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recupero — solo perché il test ha trovato qualche difficoltà</div>
        <h1>Tre volte in cui fidarsi ha costato caro</h1>
        <p className="lede">
          Non è un fallimento: è solo il segnale che vale la pena rivedere il punto più delicato di
          questo capitolo con qualche esempio in più — fidarsi della parola, o fidarsi della
          correzione appena data, invece di guardare cosa succede davvero.
        </p>

        <div className="card scene">
          <div className="who">Un bambino di 9 anni, gomiti bassi nel dorso</div>
          <p>
            L&apos;istruttore spiega come tenere i gomiti alti, poi chiede «hai capito?». Il bambino
            risponde «sì» sicuro. Lo lascia partire per l&apos;intera vasca — a metà, i gomiti sono
            ancora bassi esattamente come prima: l&apos;errore si vede solo ora, quando è già costato
            mezza vasca.
          </p>
        </div>
        <p className="prompt">Cosa avrebbe dovuto fare l&apos;istruttore prima di lasciarlo partire?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "niente", label: "Niente — il «sì» era detto con sicurezza, bastava fidarsi", correct: false },
            {
              value: "tentativo",
              label: "Chiedergli un tentativo breve da osservare, prima della vasca intera",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Una correzione data, e poi lasciata lì</div>
          <p>
            L&apos;istruttore corregge la posizione della testa di un allievo — «tienila un po&apos;
            più bassa» — e si volta subito verso un altro bambino, senza guardare il tentativo
            successivo. Tre vasche dopo, la testa è ancora nella stessa posizione di prima: nessuno
            se n&apos;era accorto.
          </p>
        </div>
        <p className="prompt">La correzione, da sola, era già una verifica?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "si", label: "Sì — averla detta bene è già sufficiente", correct: false },
            {
              value: "no",
              label: "No — va vista rifare almeno una volta, altrimenti resta solo una parola detta",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">La stessa situazione, questa volta gestita bene</div>
          <p>
            Una ragazza dice «ho capito, tranquillo» con tono sicuro, prima di provare una virata a
            bandierine mai fatta. Stavolta l&apos;istruttore le chiede di mostrargliela lenta sul
            bordo prima — e vede subito che sbaglia il momento del giro, prima ancora che si tuffi.
          </p>
        </div>
        <p className="prompt">Perché ha funzionato, questa volta?</p>
        <OptionGroup
          name="rec3"
          options={[
            {
              value: "azione",
              label: "Perché ha guardato l'azione invece di fidarsi della parola",
              correct: true,
            },
            { value: "sincera", label: "Perché stavolta la ragazza ha detto la verità", correct: false },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Il «sì» non è mai la prova. La prova è sempre quello che il corpo fa — la prima volta che
          lo guardi, e ancora, la volta dopo.
        </p>
      </>
    ),
  },

  // 9 — venerdì: risultato
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
                <td style={{ padding: "6px 0" }}>La risposta al §7</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Come hai verificato Sara al §8, correzione compresa</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>Il racconto di lunedì sul Capitolo 5</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Guida all&apos;azione e verifica</td>
                <td style={{ padding: "6px 0" }}>Il più basso dei precedenti</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Per questa competenza specifica: lo stato ECCELLENTE non scatta senza almeno una vasca
          vera raccontata e verificata. Oggi resta ACQUISITA.
        </p>
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
        <div className="done-badge">✓ Capitolo 6 completato</div>
        <div className="eyebrow">Settimana 6 di 10 · Capitolo 7 in arrivo</div>
        <h1>Il ritorno</h1>
        <p className="lede">
          Oggi hai imparato a vedere se qualcosa è arrivato. La settimana prossima impari cosa
          dire dopo — quando è andata bene, e quando no.
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
          <div className="chip acquisita">
            <span className="name">6 · Verificare con l&apos;azione <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">acquisita</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">7 · Il ritorno</span>
            <span className="state">non acquisita</span>
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
