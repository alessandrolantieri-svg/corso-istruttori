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

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo5Steps: Step[] = [
  // 0 — copertina
  {
    day: "inizio",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capitolo 5 · IL MESSAGGIO E LA CONSEGNA</div>
        <h1>Che cosa gli dico, e come glielo faccio vedere?</h1>
        <p className="lede">
          L&apos;istruttore dà consegne in positivo — dice cosa fare, non cosa non fare — e si
          assicura che parole, tono e corpo dicano la stessa cosa.
        </p>
      </>
    ),
  },

  // 1 — lunedì: riflessione + consolidamento Capitolo 4
  {
    day: "lunedì · 8 min",
    pct: 12,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Lunedì</div>
        <h1>Com&apos;è andata in vasca?</h1>
        <p className="lede">
          La settimana scorsa: con il bambino più chiuso — o più agitato — del gruppo, ti sei
          messo al suo ritmo per un minuto prima di chiedergli qualcosa. Cos&apos;hai notato — in
          lui, o in te?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidamento — il Capitolo 4 torna</h2>
        <p className="prompt">1. Mettersi al ritmo del bambino viene prima o dopo guidarlo?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "prima", label: "Prima", correct: true },
            { value: "dopo", label: "Dopo", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. Un bambino euforico: la prima mossa è calmarlo subito?</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "si", label: "Sì — se non lo calmi subito, rischia di scappargli di mano", correct: false },
            { value: "no", label: "No — prima si asseconda per un momento, poi si guida", correct: true },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">3. La sintonia serve a farsi ascoltare o a farsi apprezzare?</p>
        <OptionGroup
          name="k3"
          options={[
            { value: "ascoltare", label: "Farsi ascoltare — è una competenza professionale", correct: true },
            { value: "apprezzare", label: "Farsi apprezzare — se piace all'istruttore, ascolta di più", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">
          4. Mettersi al ritmo funziona solo con chi si chiude, mai con chi si accende?
        </p>
        <OptionGroup
          name="k4"
          options={[
            { value: "vero", label: "Vero — con chi è già agitato, assecondarlo lo agita di più", correct: false },
            { value: "falso", label: "Falso — funziona uguale, al contrario, con chi è agitato", correct: true },
          ]}
          selected={answers.k4}
          onPick={(v, correct) => setResponse("k4", v, correct)}
        />
        <p className="prompt">5. Un bambino che ti seguiva bene si richiude a metà turno. Cosa fai?</p>
        <OptionGroup
          name="k5"
          options={[
            { value: "torni", label: "Torni indietro di un passo: ritrovi il suo ritmo di nuovo", correct: true },
            { value: "insisti", label: "Insisti — fino a un attimo fa andava tutto bene", correct: false },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. Con un&apos;adolescente distaccata, la sintonia si costruisce nello stesso modo che
          con un bambino di 6 anni?
        </p>
        <OptionGroup
          name="k6"
          options={[
            { value: "si", label: "Sì, esattamente allo stesso modo", correct: false },
            { value: "no", label: "No — la forma cambia con l'età, l'ordine resta lo stesso", correct: true },
          ]}
          selected={answers.k6}
          onPick={(v, correct) => setResponse("k6", v, correct)}
        />
      </>
    ),
  },

  // 2 — martedì: spiegazione + controllo
  {
    day: "martedì · 13 min",
    pct: 30,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Martedì</div>
        <h1>Un bersaglio, non un ostacolo</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Ora che ti ascolta, cosa gli dici — e come — fa tutta la differenza.
        </p>
        <p className="lede">
          <strong>La consegna in positivo.</strong> «Non piegare le gambe» dice solo cosa non
          fare — e lascia tutto il resto aperto: il bambino potrebbe tenerle rigide come un asse, o
          non muoverle affatto, e la consegna resterebbe comunque «rispettata». Gli hai tolto una
          sola cosa da non fare, tra mille possibili, ma non gli hai detto cosa fare davvero.
          «Gambe dritte come un bastone» invece gli dà una sola cosa precisa da fare: è
          l&apos;unico movimento che il corpo può davvero eseguire per obbedire.
        </p>
        <p className="lede">
          <strong>Una ragione in più, specifica dell&apos;acqua.</strong> Un movimento si impara
          meglio quando l&apos;attenzione è su cosa deve succedere fuori dal corpo — l&apos;acqua
          da spingere indietro, il muro da raggiungere — non su quale muscolo muovere: tanti studi
          lo confermano, sempre nello stesso modo. «Spingi l&apos;acqua indietro» produce
          una bracciata migliore di «tendi il gomito», anche se descrivono lo stesso identico
          movimento.
        </p>
        <p className="lede">
          <strong>La coerenza fra parole, voce e corpo.</strong> Avrai sentito che le parole
          contano il 7%, il tono il 38%, il corpo il 55%. Non è vero — quello studio riguardava un
          caso molto ristretto: persone che ascoltavano una sola parola pronunciata in modi
          diversi e dovevano indovinare un sentimento, non la comunicazione in generale. Se lo
          fosse, potresti insegnare il nuoto in una lingua sconosciuta e funzionerebbe lo stesso il
          93% delle volte — non è così.
        </p>
        <div className="card quote">
          Quando le parole dicono una cosa e il corpo ne dice un&apos;altra, il bambino crede al
          corpo — non perché «conti di più» in generale, ma perché le parole si controllano
          facilmente, mentre il corpo no: è più difficile fingerlo.
        </div>
        <p className="lede">
          <strong>E quando il divieto sembra inevitabile?</strong> In un&apos;emergenza reale — un
          bambino che corre verso il bordo scivoloso — un «fermo!» secco è la mossa giusta: nessuno
          si ferma a riformulare in positivo. Fuori da lì, se hai anche solo un secondo per
          scegliere le parole, vale la pena spenderlo per un bersaglio invece che per un divieto.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controllo di fine giornata</h2>
        <p className="prompt">1. «Non piegare le gambe» dà al corpo un bersaglio o un ostacolo?</p>
        <OptionGroup
          name="m1"
          options={[
            { value: "bersaglio", label: "Un bersaglio — indica comunque quale gamba muovere", correct: false },
            { value: "ostacolo", label: "Un ostacolo da evitare — meno efficace di un bersaglio", correct: true },
          ]}
          selected={answers.m1}
          onPick={(v, correct) => setResponse("m1", v, correct)}
        />
        <p className="prompt">2. Perché il corpo «vince» sulle parole quando si contraddicono?</p>
        <OptionGroup
          name="m2"
          options={[
            { value: "falsificare", label: "Perché è più difficile falsificarlo", correct: true },
            { value: "conta", label: "Perché conta di più in assoluto", correct: false },
          ]}
          selected={answers.m2}
          onPick={(v, correct) => setResponse("m2", v, correct)}
        />
        <p className="prompt">
          3. In un&apos;emergenza reale — un bambino che corre verso un bordo scivoloso — è
          comunque sbagliato dire «fermo!» invece di riformulare in positivo?
        </p>
        <OptionGroup
          name="m3"
          options={[
            { value: "si", label: "Sì, la regola vale sempre, anche in emergenza", correct: false },
            { value: "no", label: "No — in un'emergenza reale la chiarezza immediata conta di più", correct: true },
          ]}
          selected={answers.m3}
          onPick={(v, correct) => setResponse("m3", v, correct)}
        />
      </>
    ),
  },

  // 3 — mercoledì: tre scene + trasferimento + simulazione con bivio
  {
    day: "mercoledì",
    pct: 47,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "generico" || !!a.sim2),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Mercoledì</div>
        <h1>Tre secondi allineati</h1>
        <div className="card scene">
          <div className="who">«Bravissimo!», detto guardando l&apos;orologio</div>
          <p>
            Un istruttore dice «bravissimo!» a un bambino — ma guardando l&apos;orologio, voce
            piatta, già voltato verso il prossimo. Il bambino sente la parola giusta, ma non si
            sente incoraggiato: ha percepito che l&apos;attenzione era già altrove.
          </p>
          <p>
            <strong>Corretto:</strong> l&apos;istruttore si ferma un secondo, si volta, guarda il
            bambino, dice «bravissimo» con un tono che sale. Tre secondi, non trenta — ma tutti e
            tre allineati.
          </p>
        </div>
        <div className="card scene">
          <div className="who">«Non affondare la testa», ripetuto senza effetto</div>
          <p>
            Un bambino di 7 anni continua ad affondare la testa, nonostante l&apos;istruttore
            ripeta «non affondare la testa». L&apos;istruttore cambia frase, non tono: «tieni un
            orecchio dentro e uno fuori, come se stessi origliando.» Alla bracciata successiva, la
            testa resta più alta.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Un ragazzo di 14 anni</div>
          <p>
            Ha appena migliorato di molto il tempo su una vasca. L&apos;istruttore dice «bel
            lavoro», ma con le braccia conserte, sguardo già sul cronometro, tono meccanico. Il
            ragazzo abbassa lo sguardo, si allontana senza espressione: a 14 anni un complimento
            detto così sembra una frase detta per abitudine, senza pensarci — non un
            riconoscimento vero — e brucia più
            del silenzio. La volta dopo, l&apos;istruttore si corregge: si ferma, lo guarda negli
            occhi, dice «hai tagliato tre secondi, l&apos;hai sentito anche tu?» — stavolta il
            ragazzo sorride appena, perché stavolta l&apos;istruttore c&apos;era davvero.
          </p>
        </div>
        <p className="lede">
          <strong>
            Tre scene, la stessa regola sotto: le parole aprono la porta, ma è la coerenza con
            voce e corpo a farla restare aperta — a 7 anni come a 14.
          </strong>
        </p>
        <p className="prompt">Riscrivi in positivo: «Non affondare la testa quando respiri.»</p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota per la correzione, non mostrata all'istruttore: il sistema cerca una consegna
            che descriva cosa fare — non una versione più educata dello stesso divieto. */}
        <h2>Simulazione</h2>
        <p className="lede">
          <strong>DAVIDE, 9 anni.</strong> Ha appena completato per la prima volta una vasca
          intera a rana. Cosa gli dici?
        </p>
        <OptionGroup
          name="sim"
          options={[
            { value: "generico", label: "«Bravo, dai andiamo avanti» — di corsa" },
            {
              value: "specifico",
              label: "Ti fermi, lo guardi: «ti sei fermato a respirare senza affondare, l'hai fatto tu da solo»",
            },
          ]}
          selected={answers.sim}
          onPick={(v) => setResponse("sim", v)}
        />
        {answers.sim === "generico" && (
          <div className="feedback retry">
            DAVIDE: <em>(si allontana, non sembra particolarmente soddisfatto)</em> «...ok.»
          </div>
        )}
        {answers.sim === "specifico" && (
          <div className="feedback ok">
            DAVIDE: <em>(sorride, resta lì un momento in più)</em> «...davvero? L&apos;ho fatto
            bene?»
            <br />
            Non è la lunghezza della frase a fare la differenza: è la specificità, e il fatto di
            esserti fermato.
          </div>
        )}
        {answers.sim === "specifico" && (
          <div>
            <p className="lede" style={{ marginTop: 14 }}>
              Un attimo dopo, Davide riparte per un secondo giro — ma questa volta piega troppo le
              braccia, un errore tecnico nuovo, mai corretto prima con lui.
            </p>
            <p className="prompt">
              Scrivi la consegna che gli dai adesso — in positivo, tono e corpo coerenti.
            </p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={[
                { value: "negativo", label: "Torni a una consegna in negativo, o la dici distrattamente" },
                { value: "positivo", label: "Dai un'immagine positiva, fermandoti a guardarlo" },
              ]}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "negativo" && (
              <div className="feedback retry">
                DAVIDE prova di nuovo, ma l&apos;errore resta identico — non ha ricevuto un
                bersaglio da raggiungere, solo un altro divieto.
              </div>
            )}
            {answers.sim2 === "positivo" && (
              <div className="feedback ok">
                DAVIDE allunga le braccia un po&apos; di più al tentativo successivo — piccolo, ma
                nella direzione giusta.
              </div>
            )}
          </div>
        )}
      </>
    ),
  },

  // 4 — mercoledì sera: trasferimento su errore nuovo
  {
    day: "mercoledì sera",
    pct: 63,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controllo di fine giornata — trasferimento</div>
        <h1>Un errore mai incontrato prima</h1>
        <p className="lede">
          Un bambino continua a tenere le dita aperte durante la bracciata, invece che unite. Devi
          dargli una consegna nuova — non hai ancora provato niente con lui.
        </p>
        <p className="prompt">
          Scrivi la consegna, in positivo, e prova a immaginare come la diresti — tono e corpo
          compresi — in modo che tutti e tre siano coerenti.
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota per la correzione, non mostrata all'istruttore: non è uno degli esempi già
            visti — è voluto. Il sistema controlla se applica la regola a un errore tecnico mai
            incontrato nel capitolo, non solo se ricorda le frasi già lette. */}
      </>
    ),
  },

  // 5 — in vasca
  {
    day: "in vasca",
    pct: 70,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Il tuo turno in vasca</div>
        <h1>Una consegna, fermandoti a guardare</h1>
        <p className="lede">
          Questa settimana, dai una sola consegna in positivo — dì cosa fare, mai cosa non fare —
          e fermati un secondo mentre la dici: guarda il bambino, non l&apos;orologio, non il
          gruppo.
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
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Venerdì — test cumulativo: Capitolo 4 + Capitolo 5</div>
        <h1>Il test</h1>
        <p className="prompt">1. «Non piegare le gambe» è una buona consegna?</p>
        <OptionGroup
          name="t1"
          options={[
            { value: "no", label: "No — meglio dire cosa fare", correct: true },
            { value: "si", label: "Sì, è chiara — dice comunque cosa evitare", correct: false },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. È vero che le parole contano solo il 7% della comunicazione?</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "si", label: "Sì, è una legge generale", correct: false },
            { value: "no", label: "No — quello studio riguardava un caso molto specifico", correct: true },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">3. Quando parole e corpo dicono cose diverse, il bambino crede a cosa?</p>
        <OptionGroup
          name="t3"
          options={[
            { value: "parole", label: "Alle parole — sono il messaggio esplicito, quindi il più affidabile", correct: false },
            { value: "corpo", label: "Al corpo — è il segnale più difficile da falsificare", correct: true },
          ]}
          selected={answers.t3}
          onPick={(v, correct) => setResponse("t3", v, correct)}
        />
        <p className="prompt">4. Una consegna in positivo dà al corpo un bersaglio o un ostacolo?</p>
        <OptionGroup
          name="t4"
          options={[
            { value: "bersaglio", label: "Un bersaglio", correct: true },
            { value: "ostacolo", label: "Un ostacolo", correct: false },
          ]}
          selected={answers.t4}
          onPick={(v, correct) => setResponse("t4", v, correct)}
        />
        <p className="prompt">
          5. <em>(dal Capitolo 4)</em> Mettersi al ritmo viene prima di guidare?
        </p>
        <OptionGroup
          name="t5"
          options={[
            { value: "si", label: "Sì", correct: true },
            { value: "no", label: "No", correct: false },
          ]}
          selected={answers.t5}
          onPick={(v, correct) => setResponse("t5", v, correct)}
        />
        <p className="prompt">
          6. «Bravissimo» detto con voce piatta, guardando altrove, funziona come incoraggiamento?
        </p>
        <OptionGroup
          name="t6"
          options={[
            { value: "no", label: "No — il bambino percepisce che l'attenzione era altrove", correct: true },
            { value: "si", label: "Sì, la parola conta comunque", correct: false },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">
          7. In un&apos;emergenza reale, è sbagliato dire «fermo!» invece di riformulare in
          positivo?
        </p>
        <OptionGroup
          name="t7"
          options={[
            { value: "si", label: "Sì, la regola vale sempre", correct: false },
            { value: "no", label: "No — in un'emergenza reale la chiarezza immediata conta di più", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">
          8. Un ragazzo di 14 anni riceve un complimento vero ma detto con tono meccanico, braccia
          conserte, sguardo altrove. Come lo vive più probabilmente?
        </p>
        <OptionGroup
          name="t8"
          options={[
            { value: "abitudine", label: "Come qualcosa detto per abitudine, non un riconoscimento vero", correct: true },
            { value: "sincero", label: "Come un complimento sincero, le parole bastano", correct: false },
          ]}
          selected={answers.t8}
          onPick={(v, correct) => setResponse("t8", v, correct)}
        />
        <p className="prompt">
          9. Un incoraggiamento specifico dato bene su un errore «vale» anche per l&apos;errore
          tecnico successivo, nello stesso minuto?
        </p>
        <OptionGroup
          name="t9"
          options={[
            { value: "si", label: "Sì, l'effetto si estende automaticamente", correct: false },
            { value: "no", label: "No — ogni nuova consegna va costruita di nuovo, positiva e coerente", correct: true },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. Devi correggere un bambino di 8 anni che piega i gomiti in modo scorretto durante la
          bracciata. Scrivi la consegna, in positivo, in una frase sola.
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
          Hai risposto che le parole contano davvero solo il 7%. Quel numero circola moltissimo,
          ma viene da uno studio su un caso molto ristretto — non è una legge generale della
          comunicazione. Quello che è vero, ed è utile, è un&apos;altra cosa: quando parole e corpo
          si contraddicono, vince il corpo.
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
        t1: "no", t2: "no", t3: "corpo", t4: "bersaglio", t5: "si",
        t6: "no", t7: "no", t8: "abitudine", t9: "no",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recupero — solo perché il test ha trovato qualche difficoltà</div>
        <h1>Tre frasi in negativo, riscritte davvero</h1>
        <p className="lede">
          Non è un fallimento: è solo il segnale che vale la pena allenare ancora l&apos;automatismo
          più delicato di questo capitolo — perché addolcire un divieto non è la stessa cosa che dare
          un bersaglio.
        </p>

        <div className="card scene">
          <div className="who">Un bambino a dorso, la testa che scivola indietro</div>
          <p>
            L&apos;istruttore ha ripetuto per due turni «non buttare indietro la testa» — niente
            cambia. Prova a riformularla in positivo.
          </p>
        </div>
        <p className="prompt">Quale delle due dà davvero un bersaglio, e non solo un divieto più gentile?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "morbida", label: "«Cerca di non buttarla così indietro»", correct: false },
            {
              value: "mento",
              label: "«Mento verso il petto, guarda le dita dei piedi»",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Una bambina a rana, le gambe rigide a forbice</div>
          <p>
            L&apos;istruttore ha detto «non tenere le gambe rigide» tre volte di fila — le gambe
            restano identiche.
          </p>
        </div>
        <p className="prompt">Quale delle due funziona meglio?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "irrigidire", label: "«Prova a non irrigidirle troppo»", correct: false },
            {
              value: "pedala",
              label: "«Gambe morbide, come se pedalassi piano in bicicletta»",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Un ragazzo a stile libero, senza fiato a metà vasca</div>
          <p>
            Trattiene il respiro per intere bracciate, poi emerge ansimando. L&apos;istruttore ha
            provato con «non trattenere il respiro» — nessun cambiamento.
          </p>
        </div>
        <p className="prompt">Quale frase gli dà un bersaglio da eseguire, non solo un divieto?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "trattenerlo", label: "«Cerca di non trattenerlo troppo a lungo»", correct: false },
            {
              value: "candela",
              label: "«Soffia piano sott'acqua, come se soffiassi su una candela lontana»",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Una frase in positivo non è solo una versione più gentile del divieto: è un bersaglio
          diverso, verso cui il corpo si muove da solo.
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
                <td style={{ padding: "6px 0" }}>La consegna riscritta al §7</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Il modo in cui hai parlato a Davide al §8, in entrambi i momenti</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>Il racconto di lunedì sul Capitolo 4</td>
                <td style={{ textAlign: "right" }}>registrato ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Congruenza e consegne</td>
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
        <div className="done-badge">✓ Capitolo 5 completato</div>
        <div className="eyebrow">Settimana 5 di 10 · Capitolo 6 in arrivo</div>
        <h1>Farlo agire, e vedere se è arrivato</h1>
        <p className="lede">
          Oggi hai imparato a dire le cose bene. La settimana prossima impari che non basta: la
          comunicazione non finisce quando il bambino ascolta, finisce quando fa.
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
          <div className="chip acquisita">
            <span className="name">5 · Consegne e congruenza</span>
            <span className="state">acquisita</span>
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
