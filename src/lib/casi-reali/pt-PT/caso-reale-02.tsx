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

// Tradução para português europeu de caso-reale-02.tsx — as mesmas chapterId/chaves de
// resposta/valores internos do original italiano: muda apenas o texto visível.
// Porta 1:1 situOutcome()/needsRecupero() do mockup caso-reale-02.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}
function needsRecupero(a: Record<string, string>): boolean {
  return situOutcome(a) === "B";
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Colocas-te mesmo no campo de visão dele — não só ao lado, mas entre ele e a distração — à espera que os olhos dele cheguem aos teus antes de falares",
  },
  { value: "B", label: "Repetes a mesma instrução mais alto, da tua posição, sem captares o olhar dele" },
];
const REC_OPTIONS: Option[] = [
  { value: "sposti", label: "Deslocas-te fisicamente para o campo de visão dele e esperas o contacto visual antes de falares" },
  { value: "voce", label: "Voltas a levantar a voz, na esperança de que desta vez funcione" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Nicolò olha para ti. Dás a instrução uma vez, simples: «dá-me a mão, entramos juntos.» Ele segue-a.",
  },
  B: {
    ok: false,
    text: "Nicolò continua a olhar para o colega. A tua voz tornou-se parte do ruído de fundo — não deixou de te ouvir de propósito, simplesmente ainda não te ouviu mesmo.",
  },
};

const REC_FEEDBACK: Record<"sposti" | "voce", { ok: boolean; text: string }> = {
  sposti: { ok: true, text: "Nicolò repara em ti, um pouco surpreendido por te encontrar ali. Desta vez a instrução chega." },
  voce: {
    ok: false,
    text: "Nicolò volta-se, mas assustado pelo tom mais do que chamado pela instrução — entra na água, mas recuando, sem te estender a mão como pedido.",
  },
};

export const casoReale02StepsPtPT: Step[] = [
  // 0 — intro
  {
    day: "caso real 02",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reais · Cenário 02</div>
        <h1>A criança que não ouve</h1>
        <p className="lede">Faixa etária 3-5. Competências: sintonia (Cap. 4) · instruções (Cap. 5).</p>
        <div className="card">
          Cenário breve e autónomo — não tem uma pontuação de exame: é material a que podes voltar quando quiseres.
        </div>
      </>
    ),
  },

  // 1 — situazione
  {
    day: "situação",
    pct: 20,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situação</div>
          <h1>Nicolò, 4 anos</h1>
          <p className="lede">
            É o segundo mês de curso dele. Estás agachado ao nível dele, a explicar-lhe que agora é a vez dele
            entrar na água de mão dada contigo. Ele olha para outro lado — um colega a brincar com uma prancha — e
            não dá sinal de te ter ouvido.
          </p>
          <p className="prompt">O que fazes, antes de repetires a instrução?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>O que fazes mesmo, na prática</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — recupero, solo se esito B
  {
    day: "recuperação",
    pct: 45,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.rec,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const rec = answers.rec as "sposti" | "voce" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recuperação · só porque não funcionou</div>
          <h1>Nicolò continua virado para outro lado</h1>
          <p className="lede">Repetiste duas vezes, sem resultado.</p>
          <p className="prompt">O que fazes agora — diferente de voltar a repetir?</p>
          <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
          <h2>O que fazes mesmo, na prática</h2>
          <OptionGroup name="rec" options={REC_OPTIONS} selected={answers.rec} onPick={(v) => setResponse("rec", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 3 — chiusura
  {
    day: "encerramento",
    pct: 75,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Encerramento</div>
        <h1>O que levas contigo</h1>
        <p className="prompt">
          O que levas contigo, deste cenário, para a próxima vez que uma criança pequena parecer não te ouvir?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Reflexão livre, não entra em pontuação.
        </p>
      </>
    ),
  },

  // 4 — come si legge
  {
    day: "como se lê",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "resolvida à primeira" : answers.rec === "sposti" ? "errada, mas recuperada" : "errada, não recuperada";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="eyebrow">Como se lê este cenário</div>
          <h1>A criança que não ouve</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Sintonia (Cap. 4)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Dos 3 aos 5 anos, «não ouve» quase sempre significa «ainda não me viu» — a voz não é o problema, é o canal
            errado: sem primeiro o contacto visual, o resto custa a chegar.
          </p>
        </>
      );
    },
  },
];
