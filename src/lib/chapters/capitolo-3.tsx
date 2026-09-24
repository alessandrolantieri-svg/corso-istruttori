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

// Porta 1:1 la funzione simPath() del mockup: classifica la combinazione delle prime due
// scelte della simulazione con Luca in un percorso "aperta" (c'è un terzo scambio, a testo
// libero) o "chiusa" (la scena si chiude senza terzo scambio).
function simPath(answers: Record<string, string>): "aperta" | "chiusa" {
  if (answers.sim1 === "curioso" && answers.sim2 === "scalda") return "aperta";
  if (answers.sim1 === "diretto" && answers.sim2 === "calma") return "aperta";
  return "chiusa";
}

const K1_OPTIONS: Option[] = [
  { value: "si", label: "Sì, la paura è la stessa a ogni età", correct: false },
  { value: "no", label: "No — a 5 anni un gioco o una mano tesa, a 13 non essere guardata mentre esita", correct: true },
];
const K2_OPTIONS: Option[] = [
  { value: "bracciata", label: "«Perché ti allunga la bracciata — prova e senti la differenza»", correct: true },
  { value: "dico", label: "«Perché lo dico io, ora fallo»", correct: false },
];
const K3_OPTIONS: Option[] = [
  { value: "risponde", label: "Da come risponde", correct: true },
  { value: "carta", label: "Dalla carta d'identità", correct: false },
];
const K4_OPTIONS: Option[] = [
  { value: "eta", label: "Lo tratti secondo l'età anagrafica", correct: false },
  { value: "comportamento", label: "Lo tratti secondo il comportamento che mostra", correct: true },
];
const K5_OPTIONS: Option[] = [
  { value: "no", label: "No — la fascia d'età si legge anche dal contesto", correct: true },
  { value: "si", label: "Sì, avevi sbagliato a valutarlo", correct: false },
];
const K6_OPTIONS: Option[] = [
  { value: "si", label: "Sì, se è chiara", correct: false },
  { value: "no", label: "No — lo perde a metà, anche se sembra ascoltare", correct: true },
];

const M1_OPTIONS: Option[] = [
  { value: "freddo", label: "Freddo", correct: true },
  { value: "paura", label: "Paura", correct: false },
  { value: "via", label: "Aspetta il via libera", correct: false },
  { value: "capito", label: "Non ha capito", correct: false },
];
const M2_OPTIONS: Option[] = [
  { value: "paura", label: "Paura", correct: false },
  { value: "freddo", label: "Freddo", correct: false },
  { value: "via", label: "Aspetta il via libera", correct: true },
  { value: "capito", label: "Non ha capito", correct: false },
];
const M3_OPTIONS: Option[] = [
  { value: "via", label: "Aspetta il via libera", correct: false },
  { value: "freddo", label: "Freddo", correct: false },
  { value: "capito", label: "Non ha capito — la consegna non è ancora chiara, serve rispiegare, non basta un cenno", correct: true },
  { value: "paura", label: "Paura", correct: false },
];
const M4_OPTIONS: Option[] = [
  { value: "no", label: "No, i quattro segnali restano sempre distinti e fissi", correct: false },
  { value: "si", label: "Sì — il segnale può cambiare mentre osservi, se l'attesa si allunga troppo", correct: true },
];

const SIM1_OPTIONS: Option[] = [
  { value: "diretto", label: "«Dai Luca, ci sei già riuscito, entra»" },
  { value: "curioso", label: "«Luca, cosa senti? È fredda o hai un po' di tremarella?»" },
];
const SIM2_OPTIONS_DIRETTO: Option[] = [
  { value: "insisti", label: "«Dai Luca, lo sai fare, su»" },
  { value: "calma", label: "Ti avvicini, abbassi la voce, chiedi con calma cosa sente" },
];
const SIM2_OPTIONS_CURIOSO: Option[] = [
  { value: "entra", label: "Lo fai entrare comunque, dicendo che il freddo passerà in acqua" },
  { value: "scalda", label: "Gli proponi trenta secondi di movimento a secco sul bordo, come con Giada" },
];

const T1_OPTIONS: Option[] = [
  { value: "capito", label: "Non ha capito", correct: false },
  { value: "paura", label: "Ha paura", correct: true },
  { value: "freddo", label: "Ha freddo", correct: false },
  { value: "via", label: "Aspetta il via libera", correct: false },
];
const T2_OPTIONS: Option[] = [
  { value: "paura", label: "Ha paura", correct: false },
  { value: "capito", label: "Non ha capito", correct: false },
  { value: "via", label: "Aspetta il via libera", correct: true },
  { value: "freddo", label: "Ha freddo", correct: false },
];
const T3_OPTIONS: Option[] = [
  { value: "calore", label: "Manca calore — probabilmente ha freddo", correct: true },
  { value: "coraggio", label: "Manca coraggio", correct: false },
  { value: "spiegazione", label: "Manca una spiegazione più chiara", correct: false },
];
const T4_OPTIONS: Option[] = [
  { value: "tecnica", label: "Una spiegazione tecnica come a un adulto", correct: false },
  { value: "motivo", label: "Un motivo pratico e diretto", correct: true },
  { value: "niente", label: "Nessuna risposta, si esegue", correct: false },
];
const T5_OPTIONS: Option[] = [
  { value: "si", label: "Sì — se guardi con attenzione, capisci automaticamente cosa sta succedendo", correct: false },
  { value: "no", label: "No — guardare è vedere che è successo qualcosa, capire è decidere cosa significa", correct: true },
];
const T6_OPTIONS: Option[] = [
  { value: "no", label: "No — insegna comunque qualcosa, spesso il contrario", correct: true },
  { value: "si", label: "Sì, l'importante è provarci", correct: false },
];
const T7_OPTIONS: Option[] = [
  { value: "si", label: "Sì, se le risposte sono corrette", correct: false },
  { value: "no", label: "No — serve sempre almeno una vasca vera", correct: true },
];
const T8_OPTIONS: Option[] = [
  { value: "no", label: "No, i quattro segnali restano sempre distinti", correct: false },
  { value: "si", label: "Sì — il segnale può cambiare mentre osservi, se l'attesa si allunga", correct: true },
];
const T9_OPTIONS: Option[] = [
  { value: "misto", label: "Un misto fra aspettare il via libera e l'imbarazzo di un gruppo nuovo che guarda", correct: true },
  { value: "dimenticato", label: "Ha dimenticato come si fa il tuffo", correct: false },
  { value: "acqua", label: "Ha paura dell'acqua", correct: false },
];

const DIARY_KEYS = ["q2","q7","sim3","qtrasf","t10"];

export const capitolo3Steps: Step[] = [
  // 0 — copertina
  {
    day: "inizio",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capitolo 3 · GUARDARE E CAPIRE <i className="ph-duotone ph-trophy" aria-hidden="true" /></div>
        <h1>Si è fermato: ha paura o non ha capito?</h1>
        <p className="lede">
          Davanti a un bambino che si ferma, si blocca o esita, l&apos;istruttore sa distinguere
          fra quattro cause diverse — e sa che a ciascuna risponde in modo diverso.
        </p>
        <div className="card warn">
          <strong>Standard più alto.</strong> Ogni competenza di questo corso passa per una scala
          di livelli, in ordine: <strong>IN SVILUPPO → ACQUISITA → CONSOLIDATA → ECCELLENTE</strong> —
          ma per due soltanto, contrassegnate dal simbolo <i className="ph-duotone ph-trophy" aria-hidden="true" />, il corso chiede di arrivare oltre: a{" "}
          <strong>ECCELLENTE</strong>. Questa (Guardare e capire) e il Capitolo 6 (Verificare con
          l&apos;azione) sono le due competenze dell&apos;ascolto: qui non basta ACQUISITA, serve
          ECCELLENTE prima dell&apos;esame finale — e la sola simulazione non basta mai: serve
          sempre almeno una vasca vera.
        </div>
      </>
    ),
  },

  // 1 — lunedì: riflessione + consolidamento Capitolo 2
  {
    day: "lunedì · 10 min",
    pct: 10,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lunedì</div>
        <h1>Com&apos;è andata in vasca?</h1>
        <p className="lede">
          La settimana scorsa il Capitolo 2 ti ha chiesto una cosa sola: scegliere un allievo e
          capire la sua fascia dal modo in cui ti rispondeva, non dall&apos;età. Racconta in due
          righe cosa hai notato.
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidamento — il Capitolo 2 torna</h2>
        <p className="prompt">1. Marco (5a) ed Elena (13a) non entrano in acqua da soli. Stessa frase per entrambi?</p>
        <OptionGroup name="k1" options={K1_OPTIONS} selected={answers.k1} onPick={(v, correct) => setResponse("k1", v, correct)} />
        <p className="prompt">2. Un ragazzo di 15 anni chiede: «perché devo fare proprio questo esercizio?». Rispondi:</p>
        <OptionGroup name="k2" options={K2_OPTIONS} selected={answers.k2} onPick={(v, correct) => setResponse("k2", v, correct)} />
        <p className="prompt">3. La fascia d&apos;età si riconosce meglio da come risponde o dalla carta d&apos;identità?</p>
        <OptionGroup name="k3" options={K3_OPTIONS} selected={answers.k3} onPick={(v, correct) => setResponse("k3", v, correct)} />
        <p className="prompt">4. Un bambino di 10 anni si comporta come uno di 12 — cerca privacy prima di essere corretto. Cosa fai?</p>
        <OptionGroup name="k4" options={K4_OPTIONS} selected={answers.k4} onPick={(v, correct) => setResponse("k4", v, correct)} />
        <p className="prompt">5. Un ragazzo di 13 anni, da solo con te senza il gruppo, si comporta più aperto del solito. È una contraddizione?</p>
        <OptionGroup name="k5" options={K5_OPTIONS} selected={answers.k5} onPick={(v, correct) => setResponse("k5", v, correct)} />
        <p className="prompt">6. Trattare un bambino di 7 anni con una lunga spiegazione tecnica, come un adulto, funziona?</p>
        <OptionGroup name="k6" options={K6_OPTIONS} selected={answers.k6} onPick={(v, correct) => setResponse("k6", v, correct)} />
      </>
    ),
  },

  // 2 — martedì: le quattro cause
  {
    day: "martedì · 14 min",
    pct: 28,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3 && !!a.m4,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Martedì</div>
        <h1>Guardare e capire non sono la stessa cosa</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Questa settimana impari a fare due cose che sembrano una sola, e non lo sono: guardare,
          e capire quello che guardi.
        </p>
        <p className="lede">
          Un bambino si ferma sul bordo vasca, un attimo prima del tuffo che ha già fatto dieci
          volte. <strong>Guardare</strong> è vedere che si è fermato — lo vedono tutti.{" "}
          <strong>Capire</strong> è la parte difficile: quella pausa può voler dire quattro cose
          diverse.
        </p>
        <div className="table-wrap">
          <table className="cause">
            <tbody>
              <tr>
                <th>Ha...</th>
                <th>E il segno è...</th>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-waves" aria-hidden="true" /> Paura</td>
                <td>Il corpo si irrigidisce, gli occhi restano fissi sull&apos;acqua, non su di te</td>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-question" aria-hidden="true" /> Non ha capito</td>
                <td>Ti guarda, con un&apos;esitazione — aspetta un segnale che non arriva</td>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-snowflake" aria-hidden="true" /> Freddo</td>
                <td>Le braccia si stringono al corpo, magari trema un po&apos; — nessuna rigidità, nessuna ricerca del tuo sguardo</td>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-eye" aria-hidden="true" /> Aspetta il via libera</td>
                <td>Ti cerca con gli occhi prima di muoversi — gli serve il tuo via libera</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card quote">
          Se rispondi con la cosa sbagliata, quel bambino impara comunque qualcosa — solo che non
          è quello che volevi insegnargli.
        </div>
        <p className="lede">
          <strong>
            Un&apos;ultima cosa, prima di andare avanti: complica la tabella di proposito, come
            già la fascia d&apos;età nel capitolo scorso.
          </strong>{" "}
          Un bambino non resta fermo in una foto: il segnale può cambiare mentre lo osservi,
          soprattutto se aspetti troppo prima di rispondere. Un bambino che all&apos;inizio aspetta
          solo il tuo via libera — occhi su di te, corpo tranquillo — può cambiare se aspetti
          troppo a rispondere. Il silenzio lungo diventa lui stesso un segnale: gli sembra che
          qualcosa non vada. E così quello che era «aspetta il via libera» comincia a diventare
          paura vera. Osservare non è scattare una fotografia una volta sola: è
          continuare a guardare anche dopo aver deciso una risposta.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controllo di fine giornata</h2>
        <p className="prompt">1. Spalle strette, leggero tremore, nessuna ricerca del tuo sguardo.</p>
        <OptionGroup name="m1" options={M1_OPTIONS} selected={answers.m1} onPick={(v, correct) => setResponse("m1", v, correct)} />
        <p className="prompt">2. Ti cerca con gli occhi prima di muoversi, corpo non teso.</p>
        <OptionGroup name="m2" options={M2_OPTIONS} selected={answers.m2} onPick={(v, correct) => setResponse("m2", v, correct)} />
        <p className="prompt">
          3. Hai appena mostrato un esercizio nuovo, mai fatto prima. Il bambino entra in acqua,
          si ferma a metà, ti guarda — non sta aspettando un cenno per andare avanti: sembra
          proprio non sapere cosa fare adesso.
        </p>
        <OptionGroup name="m3" options={M3_OPTIONS} selected={answers.m3} onPick={(v, correct) => setResponse("m3", v, correct)} />
        <p className="prompt">
          4. Un bambino che sta solo aspettando il tuo via libera può, se aspetti troppo a
          rispondergli, cominciare a mostrare segnali di paura vera?
        </p>
        <OptionGroup name="m4" options={M4_OPTIONS} selected={answers.m4} onPick={(v, correct) => setResponse("m4", v, correct)} />
      </>
    ),
  },

  // 3 — mercoledì: cinque bambini, cinque letture + simulazione Luca (tre scambi)
  {
    day: "mercoledì",
    pct: 44,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => {
      if (!a.sim1) return false;
      if (!a.sim2) return false;
      const path = simPath(a);
      if (path === "aperta") return !!a.sim3;
      return true;
    },
    render: ({ answers, setResponse, setReflection }: StepContext) => {
      const promptStyle = {
        fontSize: ".8rem",
        textTransform: "uppercase" as const,
        letterSpacing: ".03em",
        color: "var(--surface)",
        fontFamily: "var(--mono)",
        fontWeight: 700,
      };
      const sim2Options = answers.sim1 === "diretto" ? SIM2_OPTIONS_DIRETTO : SIM2_OPTIONS_CURIOSO;
      const path = answers.sim1 && answers.sim2 ? simPath(answers) : null;

      return (
        <>
          <div className="eyebrow">Mercoledì</div>
          <h1>Cinque bambini, cinque letture</h1>
          <div className="card scene">
            <div className="who">Sofia, 4 anni</div>
            <p>
              Piede in acqua fino alla caviglia, ferma. Spalle su, strette; occhi fissi
              sull&apos;acqua, non lo cerca. È paura, non incomprensione. L&apos;istruttore si
              mette accanto, tende la mano: «vieni, ti tengo io.»
            </p>
          </div>
          <div className="card scene">
            <div className="who">Leo, 6 anni</div>
            <p>
              Ha appena visto l&apos;istruttore mostrare due volte un esercizio nuovo, mai fatto
              prima. Entra in acqua e si ferma subito, corpo tranquillo, nessun tremore. Guarda
              l&apos;istruttore — ma non con l&apos;occhio di chi aspetta un cenno: sta cercando
              qualcosa che non trova. Non ha capito, non gli serve un cenno: l&apos;istruttore
              rifà la sequenza una volta sola, più lenta, isolando solo le braccia. Leo la rifà
              subito, senza più fermarsi.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Giada, 8 anni</div>
            <p>
              Braccia strette intorno al corpo, spalle curve, un leggero tremore nelle mani. Non
              cerca lo sguardo dell&apos;istruttore, non ha occhi fissi e spaventati. È solo
              freddo. Trenta secondi di movimento a secco sul bordo, prima di farla entrare.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Nadia, 12 anni</div>
            <p>
              Deve rifare un tuffo che le è già venuto bene, ma oggi il gruppo è diverso dal
              solito — alcuni ragazzi più grandi, arrivati per una sostituzione. Si ferma sul
              bordo: non trema, il corpo non è teso, ma cerca lo sguardo dell&apos;istruttore due,
              tre volte, senza dire niente. Non è paura del tuffo: quello lo sa già fare. E non è
              nemmeno solo «aspetta il via libera». C&apos;è anche l&apos;imbarazzo per il gruppo
              nuovo — lo stesso di cui parlava il Capitolo 2 per questa età. L&apos;istruttore non
              dice niente ad alta voce: le fa solo un piccolo cenno, lo stesso che le farebbe se il
              gruppo fosse quello di sempre. Nadia si tuffa.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Matteo, 14 anni</div>
            <p>
              Fermo sul blocco di partenza, il gruppo lo guarda. Il corpo è teso in un altro modo,
              gli occhi cercano l&apos;istruttore per un attimo. Non è l&apos;acqua: è la fila che
              lo guarda. L&apos;istruttore abbassa la voce, solo per lui: «prenditi un secondo,
              aspetto io.»
            </p>
          </div>
          <p className="lede">
            <strong>
              Stessa pausa, cinque bambini, cinque letture diverse — giuste tutte e cinque,
              proprio perché diverse.
            </strong>{" "}
            Con Nadia, come con Matteo, il cenno silenzioso ha funzionato meglio di qualunque
            frase. Con Leo, invece, un cenno non sarebbe servito a niente: mancava la spiegazione,
            non il permesso.
          </p>
          <p className="prompt">
            Bambino di 7 anni, fermo a metà della traversata a rana. Non capisci se ha paura, se
            non ricorda il movimento, o se aspetta un tuo segnale. Cosa gli dici — o cosa gli
            chiedi — per capire, PRIMA di dargli una consegna nuova?
          </p>
          <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
          {/* Nota per la correzione, non mostrata all'istruttore: non esiste una sola risposta
              giusta. Il sistema cerca una cosa — che stia chiedendo, non supponendo. Una
              consegna diretta chiude l'informazione, qualunque fosse la causa vera. */}
          <h2>Simulazione — tre scambi per portare Luca in acqua</h2>
          <p className="lede">
            <strong>LUCA, 9 anni.</strong> A bordo vasca, un piede dentro, non entra. Il gruppo
            aspetta.
          </p>
          <p className="prompt" style={promptStyle}>Primo scambio</p>
          <p className="lede">Cosa gli dici per primo?</p>
          <OptionGroup name="sim1" options={SIM1_OPTIONS} selected={answers.sim1} onPick={(v) => setResponse("sim1", v)} />
          {answers.sim1 === "diretto" && (
            <div className="feedback retry">
              LUCA: <em>(si allontana di mezzo passo, il piede esce dall&apos;acqua)</em> «...ma io
              non voglio.»
              <br />
              Una consegna diretta ha chiuso l&apos;informazione che ti mancava, qualunque fosse la
              causa vera.
            </div>
          )}
          {answers.sim1 === "curioso" && (
            <div className="feedback ok">
              LUCA: <em>(indica le braccia, si stringe un po&apos;)</em> «...ha i brividi.»
              <br />
              Una domanda aperta ti ha dato l&apos;informazione: è freddo, non paura. Luca si apre
              invece di chiudersi.
            </div>
          )}

          {answers.sim1 && (
            <>
              <p className="prompt" style={promptStyle}>Secondo scambio</p>
              {answers.sim1 === "diretto" ? (
                <p className="lede">
                  Il gruppo aspetta ancora, e Luca è adesso più lontano dal bordo. Cosa gli dici
                  adesso?
                </p>
              ) : (
                <p className="lede">
                  Ha ancora freddo, e il gruppo aspetta. Cosa fai adesso — non solo cosa dici?
                </p>
              )}
              <OptionGroup name="sim2" options={sim2Options} selected={answers.sim2} onPick={(v) => setResponse("sim2", v)} />
              {answers.sim2 === "insisti" && (
                <div className="feedback retry">
                  LUCA si allontana di un altro passo, non risponde più — resta zitto, guarda
                  altrove.
                </div>
              )}
              {answers.sim2 === "calma" && (
                <div className="feedback ok">
                  LUCA: «...non lo so, non mi va e basta.»{" "}
                  <em>(si ferma, non si allontana più — non è un&apos;informazione chiara, ma il contatto è tornato)</em>
                </div>
              )}
              {answers.sim2 === "entra" && (
                <div className="feedback retry">
                  LUCA esita ancora di più, si stringe di più — non si sente creduto, e adesso ha
                  anche meno voglia di entrare di prima.
                </div>
              )}
              {answers.sim2 === "scalda" && (
                <div className="feedback ok">
                  LUCA si scalda, si stringe un po&apos; meno, e comincia ad avvicinarsi al bordo
                  da solo, senza che tu debba dirglielo di nuovo.
                </div>
              )}
            </>
          )}

          {path === "aperta" && (
            <>
              <p className="prompt" style={promptStyle}>Terzo scambio — la chiusura</p>
              <p className="lede">
                Luca è adesso vicino al bordo, ancora un po&apos; esitante ma non chiuso. Scrivi
                l&apos;ultima cosa che gli dici prima che entri.
              </p>
              <Field id="sim3" value={answers.sim3 ?? ""} onChange={(v) => setReflection("sim3", v)} />
              <p className="lede" style={{ fontSize: ".85rem" }}>Qualunque risposta ragionevole chiude bene la scena.</p>
              <div className="feedback ok" style={{ marginTop: 10 }}>
                LUCA entra, un piede alla volta, ma entra. Non hai vinto niente — hai solo capito,
                invece di indovinare.
              </div>
            </>
          )}
          {path === "chiusa" && (
            <>
              <p className="prompt" style={promptStyle}>La scena si chiude qui — non oggi</p>
              <div className="feedback retry">
                Il gruppo, nel frattempo, è andato avanti senza Luca. Luca resta sul bordo, zitto.
                Non è un fallimento: è un&apos;informazione. Qualunque cosa fosse, oggi non
                l&apos;hai trovata in tempo. Quello che conta è cosa fai la prossima volta che si
                ferma — non quello che è successo stavolta.
              </div>
            </>
          )}
        </>
      );
    },
  },

  // 4 — mercoledì sera: trasferimento
  {
    day: "mercoledì sera",
    pct: 58,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controllo di fine giornata — trasferimento</div>
        <h1>Una scena mai vista</h1>
        <p className="lede">
          Un bambino di 10 anni si ferma a metà di un esercizio. Guarda dritto avanti, non trema,
          non ti cerca con gli occhi — ma il respiro è più corto del solito.
        </p>
        <p className="prompt">Quale causa ti sembra più probabile, e perché? Scrivi il tuo ragionamento, non solo la risposta.</p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota per la correzione, non mostrata all'istruttore: non è nella tabella in modo
            diretto — è voluto: è spesso affaticamento, un caso che assomiglia a tutte le quattro
            cause e non è esattamente nessuna. Il sistema controlla se sta ancora osservando, non
            se ha la risposta esatta. */}
      </>
    ),
  },

  // 5 — in vasca
  {
    day: "in vasca",
    pct: 66,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Il tuo turno in vasca</div>
        <h1>Fermati un secondo tu per primo</h1>
        <p className="lede">
          Al primo bambino che si ferma o esita, prima di dire qualsiasi cosa: fermati un secondo
          tu per primo, e decidi quale delle quattro cause ti sembra più probabile. Poi rispondi a
          quella, non alla prima frase che ti viene in mente.
        </p>
        <p className="lede" style={{ fontStyle: "italic" }}>Non serve azzeccarla. Serve essersi fatto la domanda prima di parlare.</p>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Se non hai un turno questa settimana: il capitolo si sblocca comunque con una
          simulazione rinforzata — ma non basta a portare questa competenza a ECCELLENTE. Per
          quello serve, prima o poi, una vasca vera.
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
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Venerdì — test cumulativo: Capitolo 2 + Capitolo 3</div>
        <h1>Il test</h1>
        <p className="prompt">
          1. Un bambino di 12 anni si blocca prima di un tuffo già fatto. Non ti guarda, fissa
          l&apos;acqua, spalle tese verso l&apos;alto.
        </p>
        <OptionGroup name="t1" options={T1_OPTIONS} selected={answers.t1} onPick={(v, correct) => setResponse("t1", v, correct)} />
        <p className="prompt">2. Una bambina di 5 anni si ferma e ti cerca con gli occhi, senza tensione nel corpo.</p>
        <OptionGroup name="t2" options={T2_OPTIONS} selected={answers.t2} onPick={(v, correct) => setResponse("t2", v, correct)} />
        <p className="prompt">3. Trema leggermente, braccia strette al corpo, ma non cerca il tuo sguardo e non ha le spalle rigide.</p>
        <OptionGroup name="t3" options={T3_OPTIONS} selected={answers.t3} onPick={(v, correct) => setResponse("t3", v, correct)} />
        <p className="prompt">
          4. <em>(dal Capitolo 2)</em> Un ragazzo di 16 anni chiede il perché di un esercizio. La
          risposta giusta per la sua fascia d&apos;età è:
        </p>
        <OptionGroup name="t4" options={T4_OPTIONS} selected={answers.t4} onPick={(v, correct) => setResponse("t4", v, correct)} />
        <p className="prompt">5. Guardare e capire sono la stessa cosa?</p>
        <OptionGroup name="t5" options={T5_OPTIONS} selected={answers.t5} onPick={(v, correct) => setResponse("t5", v, correct)} />
        <p className="prompt">6. Rispondere alla causa sbagliata è un errore neutro?</p>
        <OptionGroup name="t6" options={T6_OPTIONS} selected={answers.t6} onPick={(v, correct) => setResponse("t6", v, correct)} />
        <p className="prompt">7. Per questa competenza, una buona simulazione basta per ECCELLENTE?</p>
        <OptionGroup name="t7" options={T7_OPTIONS} selected={answers.t7} onPick={(v, correct) => setResponse("t7", v, correct)} />
        <p className="prompt">
          8. Un bambino che sta solo aspettando il tuo via libera può, se aspetti troppo a
          rispondere, cominciare a mostrare segnali di paura vera?
        </p>
        <OptionGroup name="t8" options={T8_OPTIONS} selected={answers.t8} onPick={(v, correct) => setResponse("t8", v, correct)} />
        <p className="prompt">
          9. Nadia, 12 anni, esita davanti a un tuffo che sa già fare, perché il gruppo quel giorno
          è diverso dal solito. Cosa c&apos;è dietro, più probabilmente?
        </p>
        <OptionGroup name="t9" options={T9_OPTIONS} selected={answers.t9} onPick={(v, correct) => setResponse("t9", v, correct)} />
        <p className="prompt">
          10. Un bambino di 8 anni esegue un esercizio scorretto per la terza volta di fila,
          sempre nello stesso modo. Cosa guardi, e cosa inizi a sospettare?
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
          Esempio di feedback generato, in caso di errore alla domanda 2:
        </p>
        <div className="card quote">
          Alla domanda 2 hai risposto «ha paura». Rileggi il segnale: nessuna tensione nel corpo,
          solo lo sguardo che ti cerca. La paura di solito si vede nel corpo prima che negli
          occhi. Quando lo sguardo cerca il tuo e basta, spesso è solo il via libera che manca —
          prova a offrirlo prima di offrire rassicurazione.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Il feedback non dice mai «hai sbagliato» e basta: dice cosa guardare la prossima volta.
          Il tono è sempre sul comportamento osservato, mai sulla persona (vedi Capitolo 7, che
          riprenderà proprio questa regola).
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
        t1: "paura", t2: "via", t3: "calore", t4: "motivo", t5: "no",
        t6: "no", t7: "no", t8: "si", t9: "misto",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recupero — solo perché il test ha trovato qualche difficoltà</div>
        <h1>Due segnali in più, per non confonderli</h1>
        <p className="lede">
          Non è un fallimento: è solo il segnale che vale la pena rivedere i due segnali più simili
          di questo capitolo — freddo e aspetta il via libera — con un esempio in più ciascuno.
        </p>

        <div className="card scene">
          <div className="who">Samuele, 6 anni</div>
          <p>
            Fermo sul bordo, braccia strette intorno al corpo, un leggero tremore nelle mani. Non
            cerca lo sguardo dell&apos;istruttore — guarda distratto verso l&apos;acqua, non verso
            di lui.
          </p>
        </div>
        <p className="prompt">Cosa gli manca più probabilmente?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "via", label: "Il via libera — sta aspettando un cenno", correct: false },
            {
              value: "freddo",
              label: "Calore — niente ricerca dello sguardo, solo il corpo che si stringe: è freddo",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Bianca, 9 anni</div>
          <p>
            Ferma sul bordo, corpo rilassato, nessun tremore. Prima di mettere un piede in acqua, ti
            cerca con gli occhi due volte, senza dire niente, come se aspettasse un tuo cenno.
          </p>
        </div>
        <p className="prompt">Cosa le manca più probabilmente?</p>
        <OptionGroup
          name="rec2"
          options={[
            {
              value: "via",
              label: "Il tuo via libera — il corpo è tranquillo, cerca solo il tuo cenno",
              correct: true,
            },
            { value: "freddo", label: "Calore — probabilmente ha freddo", correct: false },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Il modo più veloce per separarli: chi ha freddo si stringe e non ti cerca; chi aspetta il
          via libera resta tranquillo e ti cerca con gli occhi. Guarda soprattutto lì.
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
                <td style={{ padding: "6px 0" }}>La frase che hai scritto tu al §7</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Come hai portato Luca in acqua al §8, nei tre scambi</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>Il racconto di lunedì sul Capitolo 2</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>transfer_score</td>
                <td style={{ padding: "6px 0" }}>La stessa riflessione, sul trasferimento reale</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Osservare e interpretare</td>
                <td style={{ padding: "6px 0" }}>Il più basso dei precedenti fissa il tetto</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Per questa competenza specifica: anche arrivando ad ACQUISITA o CONSOLIDATA, lo stato
          ECCELLENTE non scatta senza almeno una vasca vera raccontata e verificata. Oggi resta
          ACQUISITA — la vasca vera arriva con un turno vero, non con questa simulazione.
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
        <div className="done-badge">✓ Capitolo 3 completato</div>
        <div className="eyebrow">Settimana 3 di 10 · Capitolo 4 in arrivo</div>
        <h1>La sintonia</h1>
        <p className="lede">
          Hai imparato a leggere cosa succede in un bambino. La settimana prossima impari perché,
          anche quando l&apos;hai letto giusto, a volte non ti dà comunque retta.
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
          <div className="chip acquisita">
            <span className="name">3 · Osservare e interpretare <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">acquisita</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">4 · Sintonia</span>
            <span className="state">non acquisita</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">5 · Consegne e congruenza</span>
            <span className="state">non acquisita</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">6 · Verificare con l&apos;azione <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">non acquisita</span>
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
