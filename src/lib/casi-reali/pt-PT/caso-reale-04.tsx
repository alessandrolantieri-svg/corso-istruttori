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

// Tradução para português europeu de caso-reale-04.tsx — as mesmas chapterId/chaves de
// resposta/valores internos do original italiano: muda apenas o texto visível.
// Porta 1:1 situOutcome()/needsRecupero() do mockup caso-reale-04.html.
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
      "Procuras a causa antes de insistires — aproximas-te, abrandas o ritmo, perguntas-lhe com calma se está cansado ou se prefere um jogo mais simples",
  },
  { value: "B", label: "Insistes no exercício previsto, talvez com um tom mais firme ou prometendo um prémio" },
];
const REC_OPTIONS: Option[] = [
  {
    value: "abbassi",
    label: "Paras, baixas as exigências e ofereces-lhe algo muito mais simples e lúdico, sem voltares a mencionar o exercício anterior",
  },
  { value: "insisti", label: "Continuas a insistir no exercício, à espera que o choro passe sozinho" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Samuele descontrai-se um pouco: «...estou cansado.» Não era uma recusa da água, era uma criança de 4 anos sem energia — e nesta idade, dizê-lo com um «não» é normal.",
  },
  B: {
    ok: false,
    text: "Samuele fecha-se ainda mais, repete «não» com mais força, e começa a chorar.",
  },
};

const REC_FEEDBACK: Record<"abbassi" | "insisti", { ok: boolean; text: string }> = {
  abbassi: {
    ok: true,
    text: "Samuele acalma-se, lentamente. Não vai fazer o exercício previsto hoje — mas volta a estar na água contigo, e isso já é muito.",
  },
  insisti: {
    ok: false,
    text: "Samuele fica fechado durante o resto da aula — o episódio não se resolveu, apenas parou.",
  },
};

export const casoReale04StepsPtPT: Step[] = [
  // 0 — intro
  {
    day: "caso real 04",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reais · Cenário 04</div>
        <h1>A criança que recusa a instrução</h1>
        <p className="lede">
          Faixa etária 3-5. Competências: situações difíceis (Cap. 9) · sintonia (Cap. 4). Nesta idade, «não quer
          saber» raramente é um desafio social — mais frequentemente é sobrecarga: demasiadas coisas ao mesmo
          tempo, pouca capacidade de o dizer por palavras.
        </p>
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
          <h1>Samuele, 4 anos</h1>
          <p className="lede">
            No terceiro exercício da aula, cruza os braços e diz, com voz pequena mas decidida: «não, não faço.»
            Não está zangado contigo — parece só exausto.
          </p>
          <p className="prompt">
            O que fazes — não o que lhe dizes para o convenceres, mas o que fazes para perceber o que há por trás
            desse «não»?
          </p>
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
      const rec = answers.rec as "abbassi" | "insisti" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recuperação · só porque não funcionou</div>
          <h1>Samuele chora, sentado na borda</h1>
          <p className="lede">Já não responde aos pedidos.</p>
          <p className="prompt">O que fazes agora?</p>
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
          O que levas contigo, para a próxima vez que uma criança pequena disser «não» sem parecer zangada?
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
      const esito = o === "A" ? "resolvida à primeira" : answers.rec === "abbassi" ? "errada, mas recuperada" : "errada, não recuperada";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="eyebrow">Como se lê este cenário</div>
          <h1>A criança que recusa a instrução</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Situações difíceis (Cap. 9)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Nem todos os «não», dos 3 aos 5 anos, são um problema de relação a resolver — às vezes são apenas uma forma
            simples de dizer uma coisa verdadeira: chega assim, por hoje.
          </p>
        </>
      );
    },
  },
];
