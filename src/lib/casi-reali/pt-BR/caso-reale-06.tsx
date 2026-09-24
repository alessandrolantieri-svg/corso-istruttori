import { OptionGroup, type Option } from "@/components/OptionGroup";
import type { Step, StepContext } from "@/lib/chapters/types";

function Field({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      className="field"
      id={id}
      placeholder="Escreva aqui..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

// Porta 1:1 situOutcome() del mockup caso-reale-06.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Você observa uma primeira tentativa curta antes de deixá-lo continuar — mesmo que ele pareça seguro, você pede para ele te mostrar só os primeiros metros",
  },
  { value: "B", label: "Você confia na segurança com que ele fala e o deixa seguir para o exercício inteiro" },
];

export const casoReale06StepsPtBR: Step[] = [
  // 0 — intro
  {
    day: "caso real 06",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reais · Cenário 06</div>
        <h1>A criança que diz que já sabe fazer</h1>
        <p className="lede">Faixa 6-10 anos. Competência: verificar com a ação (Cap. 6 <i className="ph-duotone ph-trophy" aria-hidden="true" />).</p>
        <div className="card">
          Cenário curto e independente — não tem pontuação de prova: é material que você pode revisitar quando
          quiser.
        </div>
      </>
    ),
  },

  // 1 — situazione
  {
    day: "situação",
    pct: 30,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const o = situOutcome(answers);
      return (
        <>
          <div className="eyebrow">Situação</div>
          <h1>Filippo, 9 anos</h1>
          <p className="lede">
            Você acabou de explicar para ele como manter o corpo esticado durante o deslizamento. Ele diz, com
            total segurança: «sim, sim, eu sei fazer isso, sempre faço assim.»
          </p>
          <p className="prompt">O que você faz — antes de deixá-lo ir para a piscina inteira?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>O que você faz de verdade, na prática</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {o === "A" && (
            <div className="feedback ok">
              Filippo desliza — o corpo se curva um pouco na metade do percurso. Era um detalhe que nem ele
              percebia, porque se sentia seguro demais. Você percebe na hora, antes que isso vire um hábito.
            </div>
          )}
          {o === "B" && (
            <div className="feedback retry">
              Filippo nada a piscina inteira repetindo sempre o mesmo erro. Se você tivesse corrigido na hora,
              teria bastado um instante. Descoberto só agora, já virou um hábito — e fica mais difícil de
              corrigir.
            </div>
          )}
        </>
      );
    },
  },

  // 2 — chiusura
  {
    day: "encerramento",
    pct: 70,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Encerramento</div>
        <h1>O que você leva com você</h1>
        <p className="prompt">O que você leva com você, na próxima vez que um aluno te responder com total segurança?</p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Reflexão livre, não entra na pontuação.
        </p>
      </>
    ),
  },

  // 3 — come si legge
  {
    day: "como interpretar",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "resolvida na primeira tentativa" : "não resolvida — a correção chegou tarde";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="eyebrow">Como interpretar este cenário</div>
          <h1>A criança que diz que já sabe fazer</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Verificar com a ação (Cap. 6 <i className="ph-duotone ph-trophy" aria-hidden="true" />)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            A segurança com que uma criança responde não é mais confiável do que um «sim, entendi»: o Capítulo 6
            fala isso sobre a incerteza, mas vale do mesmo jeito ao contrário — a confiança também precisa ser
            verificada com a ação, não aceita apenas pela palavra.
          </p>
        </>
      );
    },
  },
];
