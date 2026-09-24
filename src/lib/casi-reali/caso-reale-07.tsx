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

// Porta 1:1 situOutcome() del mockup caso-reale-07.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  { value: "A", label: "Le chiedi il suo giudizio prima del tuo, o resti in silenzio a guardare" },
  { value: "B", label: "Le dai comunque una correzione tecnica, per abitudine, anche se non sbagliata" },
];

export const casoReale07Steps: Step[] = [
  // 0 — intro
  {
    day: "caso reale 07",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casi Reali · Scenario 07</div>
        <h1>Il bambino che ha bisogno di autonomia</h1>
        <p className="lede">
          Fascia 6-10. Competenza: autonomia (Cap. 10) — qui applicata prima che negli esempi abituali, a
          dimostrare che non è solo una competenza per i più grandi.
        </p>
        <div className="card">
          Scenario breve e autonomo — non ha un punteggio d&apos;esame: è materiale che puoi richiamare quando
          vuoi.
        </div>
      </>
    ),
  },

  // 1 — situazione
  {
    day: "situazione",
    pct: 30,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const o = situOutcome(answers);
      return (
        <>
          <div className="eyebrow">Situazione</div>
          <h1>Vittoria, 10 anni</h1>
          <p className="lede">
            Da un mese esegue correttamente, senza errori, l&apos;ingresso in acqua che un tempo correggevi ogni
            volta. Sta per rifarlo davanti a te, come sempre.
          </p>
          <p className="prompt">Cosa fai, prima che lo esegua?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Cosa fai davvero, in pratica</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {o === "A" && (
            <div className="feedback ok">
              Vittoria esegue, poi ti guarda: «...credo di essere entrata bene. È vero?» — ha già dato il suo
              giudizio prima di chiedere il tuo.
            </div>
          )}
          {o === "B" && (
            <div className="feedback retry">
              Vittoria: «...ok.» Esegue di nuovo aspettando, come sempre, il tuo verdetto finale.
            </div>
          )}
        </>
      );
    },
  },

  // 2 — chiusura
  {
    day: "chiusura",
    pct: 70,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Chiusura</div>
        <h1>Cosa porti con te</h1>
        <p className="prompt">
          Cosa porti con te, la prossima volta che un allievo sa già fare bene qualcosa che prima correggevi ogni
          volta?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Riflessione libera, non entra in punteggio.
        </p>
      </>
    ),
  },

  // 3 — come si legge
  {
    day: "come si legge",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "gestita al primo colpo" : "occasione persa, non un errore grave";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completato</div>
          <div className="eyebrow">Come si legge questo scenario</div>
          <h1>Il bambino che ha bisogno di autonomia</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Autonomia (Cap. 10)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            L&apos;autonomia non è una competenza che si applica solo a fine percorso, con gli allievi più
            grandi: un bambino di 10 anni che sa già fare bene una cosa ha lo stesso bisogno — essere lasciato
            giudicarsi da solo — di un allievo di lunga data.
          </p>
        </>
      );
    },
  },
];
