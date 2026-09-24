import { OptionGroup, type Option } from "@/components/OptionGroup";
import type { Step, StepContext } from "@/lib/chapters/types";

function Field({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      className="field"
      id={id}
      placeholder="Escreve aqui..."
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
      "Observas uma primeira tentativa breve antes de o deixares continuar — mesmo que pareça seguro de si, pedes-lhe que te mostre só os primeiros metros",
  },
  { value: "B", label: "Confias na segurança com que ele fala e deixas-lo fazer o exercício todo" },
];

export const casoReale06StepsPtPT: Step[] = [
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
        <p className="lede">Faixa etária 6-10. Competência: verificar com a ação (Cap. 6 <i className="ph-duotone ph-trophy" aria-hidden="true" />).</p>
        <div className="card">
          Cenário breve e autónomo — não tem uma pontuação de exame: é material a que podes voltar sempre que
          quiseres.
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
            Acabaste de lhe explicar como manter o corpo esticado durante o deslize. Ele diz, com total
            confiança: «sim sim, sei fazer isso, faço sempre assim.»
          </p>
          <p className="prompt">O que fazes — antes de o deixares avançar para a piscina inteira?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>O que fazes mesmo, na prática</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {o === "A" && (
            <div className="feedback ok">
              Filippo desliza — o corpo curva-se ligeiramente a meio. Era um pormenor que nem ele notava,
              porque se sentia demasiado seguro. Tu vês logo, antes que se torne um hábito.
            </div>
          )}
          {o === "B" && (
            <div className="feedback retry">
              Filippo nada a piscina toda repetindo sempre o mesmo erro. Se o tivesses corrigido logo, teria
              bastado um instante. Descoberto só agora, já se tornou um hábito — e é mais difícil de
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
        <h1>O que levas contigo</h1>
        <p className="prompt">O que levas contigo, da próxima vez que um aluno te responder com total confiança?</p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Reflexão livre, não entra em pontuação.
        </p>
      </>
    ),
  },

  // 3 — come si legge
  {
    day: "como se lê",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "resolvida à primeira" : "não resolvida — a correção chegou tarde";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="eyebrow">Como se lê este cenário</div>
          <h1>A criança que diz que já sabe fazer</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Verificar com a ação (Cap. 6 <i className="ph-duotone ph-trophy" aria-hidden="true" />)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            A confiança com que uma criança responde não é mais fiável do que um «sim, percebi»: o Capítulo 6
            diz isto para a incerteza, mas vale exatamente ao contrário — também a confiança deve ser
            verificada com a ação, e não aceite pela palavra.
          </p>
        </>
      );
    },
  },
];
