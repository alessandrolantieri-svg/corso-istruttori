import { OptionGroup } from "@/components/OptionGroup";
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

const DIARY_KEYS = ["q2","q7","q7b","q13","t10"];

export const capitolo2Steps: Step[] = [
  // 0 — copertina
  {
    day: "inizio",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capitolo 2 · CHI HO DAVANTI</div>
        <h1>Cosa cambia fra un bambino di 4 anni e un ragazzo di 15</h1>
        <p className="lede">
          L&apos;istruttore riconosce la fascia di un allievo da come gli risponde — non dall&apos;età
          scritta sulla carta d&apos;identità — e sceglie di conseguenza la prima parola da
          usare.
        </p>
      </>
    ),
  },

  // 1 — lunedì: attivazione + consolidamento Cap1
  {
    day: "lunedì · 10 min",
    pct: 12,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lunedì</div>
        <h1>Bentornato. Com&apos;è andata in vasca?</h1>
        <p className="lede">
          La settimana scorsa ti ho chiesto una cosa sola: contare quante volte, in un turno,
          spieghi la stessa cosa nello stesso identico modo.
        </p>
        <p className="prompt">
          Quante volte l&apos;hai contato? E, ripensandoci: c&apos;era un momento in cui cambiare
          modo avrebbe forse funzionato meglio?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidamento — il Capitolo 1 torna</h2>
        <p className="prompt">1. Il test VAK ti dice chi sei come istruttore?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "no", label: "No — ti mostra un'abitudine, non un'identità", correct: true },
            { value: "si", label: "Sì, è una diagnosi affidabile", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. Il tuo canale meno usato è quello...</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "evita", label: "Che non ti serve imparare", correct: false },
            {
              value: "allena",
              label: "A cui rischi di non pensare sotto pressione — quello da allenare",
              correct: true,
            },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">
          3. Se un modo di spiegare non funziona, la cosa giusta è ripeterlo più lentamente?
        </p>
        <OptionGroup
          name="k3"
          options={[
            { value: "falso", label: "Falso — si cambia canale, non si rallenta lo stesso", correct: true },
            { value: "vero", label: "Vero — ripetere più lentamente aiuta a farsi capire meglio", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">
          4. Nell&apos;esempio del bambino di 8 anni e la rana, quale canale ha funzionato per
          ultimo?
        </p>
        <OptionGroup
          name="k4"
          options={[
            { value: "mostra", label: "Mostrare", correct: false },
            { value: "dice", label: "Dire", correct: false },
            { value: "sente", label: "Far sentire — solo dopo aver provato gli altri due", correct: true },
          ]}
          selected={answers.k4}
          onPick={(v, correct) => setResponse("k4", v, correct)}
        />
        <p className="prompt">
          5. In quell&apos;esempio, l&apos;istruttore aveva sbagliato le prime due volte che ha
          provato?
        </p>
        <OptionGroup
          name="k5"
          options={[
            { value: "si", label: "Sì, ha perso tempo inutilmente", correct: false },
            {
              value: "no",
              label:
                "No — ha solo usato, in fila, i suoi due canali più comodi, prima di arrivare a quello giusto",
              correct: true,
            },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. Il tuo profilo VAK mostra un punteggio alto su «Dire»: vuol dire che non devi mai
          usare «Mostrare»?
        </p>
        <OptionGroup
          name="k6"
          options={[
            {
              value: "no",
              label: "No — vuol dire solo che rischi di dimenticartelo sotto pressione, non che vada evitato",
              correct: true,
            },
            { value: "si", label: "Sì, meglio restare sul canale forte", correct: false },
          ]}
          selected={answers.k6}
          onPick={(v, correct) => setResponse("k6", v, correct)}
        />
      </>
    ),
  },

  // 2 — martedì: la tabella delle fasce
  {
    day: "martedì · 15 min",
    pct: 30,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.c1 && !!a.c2 && !!a.c3 && !!a.c4,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Martedì</div>
        <h1>Non l&apos;età. La fascia.</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Questa settimana impari a riconoscere non l&apos;età di un bambino, ma la sua fascia — e
          sono due cose diverse.
        </p>
        <p className="lede">
          Un bambino di 6 anni e uno di 9 sono nella stessa fascia. Uno di 10 e uno di 11, no. I
          confini non seguono il compleanno: seguono cosa un bambino può davvero fare con le
          parole che gli dai.
        </p>
        <div className="table-wrap">
          <table className="fasce">
            <tbody>
              <tr>
                <th>Fascia</th>
                <th>Cosa cambia, davvero</th>
              </tr>
              <tr>
                <td>3-5</td>
                <td>
                  Una cosa alla volta. Una consegna con due passaggi spesso si perde a metà. Il
                  gioco è il linguaggio stesso.
                </td>
              </tr>
              <tr>
                <td>6-10</td>
                <td>
                  Comincia a seguire due passaggi in sequenza. Il «bravo» funziona ancora,
                  semplice e diretto.
                </td>
              </tr>
              <tr>
                <td>11-13</td>
                <td>
                  Arriva l&apos;imbarazzo davanti al gruppo — una correzione ad alta voce può
                  chiudere un ragazzino per il resto della lezione.
                </td>
              </tr>
              <tr>
                <td>14-18</td>
                <td>
                  Pretende il perché. Una consegna senza motivo non viene eseguita: viene
                  discussa, o ignorata.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card quote">
          Riconosci la fascia da come ti risponde, non da quanti anni ha. È l&apos;unica cosa che
          devi davvero imparare oggi.
        </div>
        <p className="lede">
          Sbagliare fascia costa in entrambe le direzioni: trattare un tredicenne da piccolo lo fa
          sentire preso in giro; trattare un settenne da grande lo perde a metà frase.
        </p>
        <p className="lede">
          <strong>
            Una cosa che vale la pena sapere subito, e che complica un po&apos; la tabella — di
            proposito.
          </strong>{" "}
          La fascia non è un dato fisso, nemmeno per lo stesso bambino. Un ragazzo di 13 anni, da
          solo con te, senza il gruppo a guardare, può sembrare un&apos;altra persona: più aperto,
          più a suo agio. Non hai sbagliato a valutarlo la settimana scorsa. È cambiato il
          contesto, non lui. Un bambino di 9 anni molto sicuro di sé può già mostrare, in certe
          situazioni, l&apos;imbarazzo tipico
          degli 11-13. La tabella dice dove guardare. Il bambino che hai davanti in quel momento
          dice la risposta vera.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controllo di fine giornata</h2>
        <p className="prompt">
          1. Un bambino di 6 anni riesce a seguire una consegna in due passaggi in fila?
        </p>
        <OptionGroup
          name="c1"
          options={[
            { value: "no", label: "No, mai prima dei 10 anni", correct: false },
            { value: "si", label: "Sì — a 6 anni comincia proprio ora a riuscirci", correct: true },
          ]}
          selected={answers.c1}
          onPick={(v, correct) => setResponse("c1", v, correct)}
        />
        <p className="prompt">2. Cosa cambia davvero per un ragazzo di 15 anni rispetto a uno di 10?</p>
        <OptionGroup
          name="c2"
          options={[
            { value: "perche", label: "Pretende il perché — una consegna senza motivo non la esegue", correct: true },
            { value: "parole", label: "Capisce parole più difficili", correct: false },
          ]}
          selected={answers.c2}
          onPick={(v, correct) => setResponse("c2", v, correct)}
        />
        <p className="prompt">
          3. Un ragazzo di 13 anni, senza il gruppo intorno, si comporta più «da piccolo» del
          solito, aperto e senza imbarazzo. È una contraddizione?
        </p>
        <OptionGroup
          name="c3"
          options={[
            { value: "si", label: "Sì, vuol dire che avevi sbagliato la sua fascia d'età", correct: false },
            {
              value: "no",
              label: "No — la fascia d'età si legge anche dal contesto: senza il gruppo, l'imbarazzo pesa molto meno",
              correct: true,
            },
          ]}
          selected={answers.c3}
          onPick={(v, correct) => setResponse("c3", v, correct)}
        />
        <p className="prompt">
          4. Un bambino di 9 anni molto sicuro di sé può già mostrare, in certe situazioni,
          reazioni tipiche della fascia 11-13?
        </p>
        <OptionGroup
          name="c4"
          options={[
            {
              value: "si",
              label: "Sì — i confini sono indicativi: si legge la risposta, non l'anagrafe",
              correct: true,
            },
            { value: "no", label: "No, mai prima dei 10 anni compiuti", correct: false },
          ]}
          selected={answers.c4}
          onPick={(v, correct) => setResponse("c4", v, correct)}
        />
      </>
    ),
  },

  // 3 — mercoledì: esempio + applicazione + simulazione
  {
    day: "mercoledì · 20 min",
    pct: 55,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "pubblico" || !!a.sim2),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Mercoledì</div>
        <h1>Quattro bambini, quattro fasce, stessa attenzione</h1>
        <div className="card scene">
          <div className="who">Sofia, 5 anni</div>
          <p>
            Scivola male sul dorso. Invece di una lunga correzione tecnica, l&apos;istruttore
            dice: «fai la stella marina!» — un&apos;immagine, una parola sola. Sofia allarga le
            braccia e il corpo si distende da solo.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Tommaso, 9 anni</div>
          <p>
            Deve imparare un ingresso in due tempi. L&apos;istruttore dà la consegna intera, in
            fila: «prima allunghi le braccia, poi spingi con le gambe.» Tommaso la esegue in
            ordine — a 5 anni sarebbe stato quasi impossibile, a 9 è già normale.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Giacomo, 12 anni</div>
          <p>
            Sta sbagliando un esercizio tecnico. L&apos;istruttore, per abitudine, dice davanti a
            tutto il gruppo: «Giacomo, guarda che sei tutto storto, rilassa la schiena!» Giacomo
            arrossisce, si irrigidisce, ed evita l&apos;esercizio per il resto della lezione.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Andrea, 16 anni</div>
          <p>
            Sta imparando una virata più tecnica di quella che usava finora. Seguendo
            l&apos;abitudine presa con i più piccoli, l&apos;istruttore gli mostra il movimento e
            dice solo «fai così». Andrea lo prova meccanicamente, poi chiede: «ma perché si fa
            così, non era più veloce l&apos;altro modo?» L&apos;istruttore aggiunge, in due frasi,
            perché quella tecnica fa guadagnare tempo proprio dove lui perde velocità. Andrea
            annuisce, e stavolta ci mette impegno vero.
          </p>
        </div>
        <p className="lede">
          Lo stesso rispetto, applicato in quattro modi opposti — con Giacomo bastava avvicinarsi
          e dire la stessa cosa solo a lui; con Andrea bastava aggiungere il perché che la sua
          fascia pretende.
        </p>
        <p className="prompt">
          Giacomo sta ripetendo lo stesso errore. Il gruppo è vicino e può sentire. Riscrivi la
          correzione — stesso contenuto tecnico, ma nel modo giusto per la sua fascia.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota per la correzione, non mostrata all'istruttore: il sistema cerca due cose — che
            la correzione resti privata (ti avvicini, abbassi la voce, non urli da lontano) e che
            non tocchi la persona («sei tutto storto») ma il comportamento («la schiena si sta
            piegando»). */}
        <h2>Simulazione</h2>
        <p className="lede">
          <strong>GIACOMO, 12 anni.</strong> Ha appena sbagliato lo stesso esercizio. Il gruppo è
          vicino. Cosa fai?
        </p>
        <OptionGroup
          name="sim"
          options={[
            { value: "pubblico", label: "Glielo dico ad alta voce, da dove sono — è comunque corretto" },
            { value: "privato", label: "Mi avvicino e glielo dico a bassa voce, solo a lui" },
          ]}
          selected={answers.sim}
          onPick={(v) => setResponse("sim", v)}
        />
        {answers.sim === "pubblico" && (
          <div className="feedback retry">
            GIACOMO: <em>(non risponde, guarda altrove, le spalle si stringono)</em> «...ok.»{" "}
            <em>(l&apos;esercizio si chiude qui per oggi)</em>
            <br />
            Stesso contenuto, ma da lontano e davanti a tutti — a questa fascia costa più di
            quanto sembri.
          </div>
        )}
        {answers.sim === "privato" && (
          <div className="feedback ok">
            GIACOMO: <em>(riprova subito, senza aspettare)</em> «...ah, ok, provo.»
            <br />
            Stesso errore, stessa correzione — cambia solo dove e come l&apos;hai detta.
          </div>
        )}
        {answers.sim === "privato" && (
          <>
            <p className="lede" style={{ marginTop: 14 }}>
              Giacomo riprova. Il movimento migliora, ma non è ancora perfetto. Si volta verso di
              te, non del tutto sicuro: «...è già meglio, no?»
            </p>
            <p className="prompt">Scrivi cosa gli rispondi adesso.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={[
                { value: "specifico", label: "«Sì — le spalle sono già più basse, si vede la differenza»" },
                { value: "generico", label: "«Bravo, dai, continua così»" },
              ]}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "specifico" && (
              <div className="feedback ok">
                GIACOMO si illumina un po&apos;, e riprova con più sicurezza — sa esattamente cosa
                ha funzionato, non solo che «va meglio».
              </div>
            )}
            {answers.sim2 === "generico" && (
              <div className="feedback retry">
                GIACOMO annuisce, ma il dubbio resta lo stesso: non sa cosa esattamente sia
                migliorato, quindi non sa cosa ripetere apposta al tentativo dopo.
              </div>
            )}
          </>
        )}
      </>
    ),
  },

  // 4 — turno in vasca
  {
    day: "in vasca",
    pct: 62,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Il tuo turno in vasca</div>
        <h1>Indovina la fascia, prima di guardare l&apos;età</h1>
        <p className="lede">
          Questa settimana scegli un allievo e prova a indovinare la sua fascia dal modo in cui ti
          risponde — non dall&apos;età che sai già. Poi, solo dopo, controlla se avevi ragione.
        </p>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Non serve azzeccarla. Serve essersi fatto la domanda prima di dare per scontata
          l&apos;età.
        </p>
        <p className="prompt">
          Un ragazzo di 16 anni, durante il riscaldamento, chiede: «ma perché dobbiamo sempre fare
          questo esercizio noioso?» — non lo dice per protestare, sembra una domanda vera. Cosa
          rispondi, in una frase?
        </p>
        <Field id="q13" value={answers.q13 ?? ""} onChange={(v) => setReflection("q13", v)} />
        {/* Nota per la correzione, non mostrata all'istruttore: il sistema cerca un motivo
            pratico e diretto — non un ordine («perché lo dico io») né una lezione lunga. */}
      </>
    ),
  },

  // 5 — venerdì test cumulativo
  {
    day: "venerdì · 12 min",
    pct: 85,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Venerdì — test cumulativo: Capitolo 1 + Capitolo 2</div>
        <h1>Il test</h1>
        <p className="prompt">
          1. Marco ha 5 anni ed Elena 13 — entrambi non entrano in acqua da soli. Stessa frase per
          convincerli?
        </p>
        <OptionGroup
          name="t1"
          options={[
            { value: "si", label: "Sì, la paura è la stessa a ogni età", correct: false },
            {
              value: "no",
              label: "No — a 5 anni un gioco o una mano tesa, a 13 non essere guardata mentre esita",
              correct: true,
            },
            { value: "carattere", label: "Dipende solo dal carattere", correct: false },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. Un ragazzo di 15 anni chiede: «perché devo fare proprio questo esercizio?». Rispondi:</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "dico", label: "«Perché lo dico io, ora fallo»", correct: false },
            { value: "bracciata", label: "«Perché ti allunga la bracciata — prova e senti la differenza»", correct: true },
            { value: "ignoro", label: "Ignori la domanda e ripeti la consegna", correct: false },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">
          3. Vero o falso: la fascia d&apos;età si riconosce meglio da come risponde che dalla carta
          d&apos;identità.
        </p>
        <OptionGroup
          name="t3"
          options={[
            { value: "vero", label: "Vero", correct: true },
            { value: "falso", label: "Falso", correct: false },
          ]}
          selected={answers.t3}
          onPick={(v, correct) => setResponse("t3", v, correct)}
        />
        <p className="prompt">4. Un bambino di 6 anni riesce a seguire una consegna in due passaggi in fila?</p>
        <OptionGroup
          name="t4"
          options={[
            { value: "no", label: "No, non ancora", correct: false },
            { value: "si", label: "Sì — a 6 anni comincia proprio ora", correct: true },
          ]}
          selected={answers.t4}
          onPick={(v, correct) => setResponse("t4", v, correct)}
        />
        <p className="prompt">5. Trattare un bambino di 7 anni con una lunga spiegazione tecnica, come un adulto, funziona?</p>
        <OptionGroup
          name="t5"
          options={[
            { value: "no", label: "No — lo perde a metà, anche se sembra ascoltare", correct: true },
            { value: "si", label: "Sì, se è chiara", correct: false },
          ]}
          selected={answers.t5}
          onPick={(v, correct) => setResponse("t5", v, correct)}
        />
        <p className="prompt">
          6. <em>(dal Capitolo 1)</em> Il tuo canale VAK meno usato è quello da...
        </p>
        <OptionGroup
          name="t6"
          options={[
            { value: "evita", label: "Evitare, perché non ti riesce bene", correct: false },
            {
              value: "allena",
              label: "Allenare, perché è quello a cui rischi di non pensare sotto pressione",
              correct: true,
            },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">7. Sbagliare la fascia d&apos;età costa solo in una direzione?</p>
        <OptionGroup
          name="t7"
          options={[
            { value: "si", label: "Sì, solo se lo tratti troppo da piccolo", correct: false },
            { value: "no", label: "No — costa in entrambe le direzioni", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">
          8. Un ragazzo di 13 anni, senza il gruppo intorno, si comporta in modo più aperto e meno
          impacciato del solito. Cosa significa?
        </p>
        <OptionGroup
          name="t8"
          options={[
            {
              value: "contesto",
              label: "Che la fascia d'età si legge anche dal contesto — senza il gruppo, l'imbarazzo pesa molto meno",
              correct: true,
            },
            { value: "sbagliato", label: "Che avevi sbagliato a valutare la sua fascia d'età", correct: false },
          ]}
          selected={answers.t8}
          onPick={(v, correct) => setResponse("t8", v, correct)}
        />
        <p className="prompt">
          9. Andrea, 16 anni, esegue un esercizio nuovo in modo meccanico finché non gli spieghi
          anche il perché. Cosa gli mancava davvero?
        </p>
        <OptionGroup
          name="t9"
          options={[
            { value: "attenzione", label: "Attenzione", correct: false },
            {
              value: "motivo",
              label: "Un motivo — a questa età un'immagine o un ordine da soli spesso non bastano",
              correct: true,
            },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. Un bambino di 11 anni, davanti al gruppo, sbaglia un esercizio che sapeva già fare.
          Cosa fai per primo, prima ancora di correggerlo?
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 6 — feedback: spiega come funziona la correzione (§10, D34)
  {
    day: "venerdì · feedback",
    pct: 87,
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
          Hai risposto che serve la stessa frase per entrambi. Rileggi le due età: a 5 anni la
          paura si supera con un gioco o una presenza fisica vicina; a 13 anni, spesso, il
          problema non è più solo l&apos;acqua — è farsi vedere esitare dagli altri. Stessa
          emozione di partenza, ostacolo diverso.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Il feedback non dice mai «hai sbagliato» e basta: dice cosa guardare la prossima volta.
          Il tono è sempre sul comportamento osservato, mai sulla persona (vedi Capitolo 7, che
          riprenderà proprio questa regola).
        </p>
      </>
    ),
  },

  // 7 — recupero: solo se il test del venerdì ha troppi errori (§12, D25/D27)
  {
    day: "recupero",
    pct: 90,
    nextLabel: "Continua ▸",
    showBack: true,
    visible: (a) => {
      const corrette: Record<string, string> = {
        t1: "no", t2: "bracciata", t3: "vero", t4: "si", t5: "no",
        t6: "allena", t7: "no", t8: "contesto", t9: "motivo",
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
          questo capitolo con qualche esempio in più — stessa età, reazioni diverse.
        </p>

        <div className="card scene">
          <div className="who">Due bambini, entrambi 10 anni</div>
          <p>
            Stesso gruppo. Al primo, dopo un errore, dici davanti agli altri «dai, riprova,
            tranquillo» — alza le spalle e riprova subito. Al secondo dici la frase identica — si
            blocca, arrossisce, ed evita quell&apos;esercizio per il resto del turno.
          </p>
        </div>
        <p className="prompt">Sono nella stessa fascia funzionale?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "si", label: "Sì, hanno la stessa età", correct: false },
            {
              value: "no",
              label: "No — il primo risponde ancora come 6-10, il secondo ha già l'imbarazzo tipico di 11-13",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Martina, 11 anni</div>
          <p>
            In gruppo, una correzione ad alta voce la chiude per il resto della lezione — tipico
            11-13. La settimana dopo, da sola con te in un recupero individuale, la stessa identica
            correzione non la turba per niente: risponde e riprova subito, semplice, diretta.
          </p>
        </div>
        <p className="prompt">Hai sbagliato a valutare la sua fascia la prima volta?</p>
        <OptionGroup
          name="rec2"
          options={[
            {
              value: "no",
              label: "No — è cambiato il contesto (il gruppo che guarda), non lei",
              correct: true,
            },
            { value: "si", label: "Sì, la prima valutazione era sbagliata", correct: false },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Due ragazzi, entrambi 12 anni</div>
          <p>
            Dai a entrambi la stessa consegna in due passaggi in fila. Il primo la segue senza
            perdersi. Il secondo si perde a metà, come farebbe un bambino più piccolo, e ti chiede
            di ripetere solo la prima parte.
          </p>
        </div>
        <p className="prompt">Il secondo va trattato come se avesse 7 anni?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "si", label: "Sì, su questo va trattato da bambino piccolo", correct: false },
            {
              value: "no",
              label: "No — su questo compito specifico ha bisogno di un passaggio alla volta, ma resta 11-13 per tutto il resto",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          La tabella delle fasce dice dove guardare. Il bambino che hai davanti in quel momento, con
          quel gruppo, in quella giornata, dice la risposta vera.
        </p>
      </>
    ),
  },

  // 8 — risultato
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
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  knowledge_score
                </td>
                <td style={{ padding: "6px 0" }}>Le 10 domande del test</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  application_score
                </td>
                <td style={{ padding: "6px 0" }}>La correzione riscritta al §7</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  simulation_score
                </td>
                <td style={{ padding: "6px 0" }}>Come hai gestito Giacomo al §8, in entrambi gli scambi</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  reflection_score
                </td>
                <td style={{ padding: "6px 0" }}>Il racconto di lunedì sul Capitolo 1</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  transfer_score
                </td>
                <td style={{ padding: "6px 0" }}>La risposta al martedì, sul ragazzo di 16 anni</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  competency_score — Riconoscimento dell&apos;allievo
                </td>
                <td style={{ padding: "6px 0" }}>Il più basso dei precedenti</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },

  // 9 — dashboard
  {
    day: "dashboard",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ vakProfile, answers }: StepContext) => (
      <>
        <div className="done-badge">✓ Capitolo 2 completato</div>
        <div className="eyebrow">Settimana 2 di 10 · Capitolo 3 in arrivo</div>
        <h1>Guardare e capire</h1>
        <p className="lede">
          Oggi hai imparato a riconoscere chi hai davanti. La settimana prossima impari a leggere
          cosa gli sta succedendo in quel preciso momento.
        </p>
        <ChapterVakSection vakProfile={vakProfile} />
        <ChapterDiarySection answers={answers} keys={DIARY_KEYS} />
        <h2>Il tuo progresso</h2>
        <div className="chip-grid">
          <div className="chip consolidata">
            <span className="name">1 · Consapevolezza personale</span>
            <span className="state">consolidata</span>
          </div>
          <div className="chip acquisita">
            <span className="name">2 · Riconoscimento dell&apos;allievo</span>
            <span className="state">acquisita</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">3 · Osservare e interpretare <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">non acquisita</span>
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
