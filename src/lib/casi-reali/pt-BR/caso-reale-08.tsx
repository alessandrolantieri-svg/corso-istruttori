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

// Porta 1:1 situOutcome()/needsRecupero()/recuperato()/needsScelta2() del mockup caso-reale-08.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}
function needsRecupero(a: Record<string, string>): boolean {
  return situOutcome(a) === "B";
}
function recuperato(a: Record<string, string>): boolean {
  return a.rec === "nomini";
}
function needsScelta2(a: Record<string, string>): boolean {
  return situOutcome(a) === "A" || (situOutcome(a) === "B" && recuperato(a));
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Você reconhece a frustração (não é recusa, não é cansaço físico) e nomeia isso com calma antes de voltar para a técnica («é frustrante, eu vejo isso. Vamos tentar de novo uma coisa pequena, não tudo de uma vez»)",
  },
  { value: "B", label: "Você vai direto para a correção técnica, sem reconhecer o que ele está sentindo" },
];
const REC_OPTIONS: Option[] = [
  { value: "nomini", label: "Você volta atrás e nomeia o que está vendo, antes de voltar para a técnica" },
  {
    value: "tecnica",
    label: "Você insiste só na técnica, esperando que uma tentativa bem-sucedida resolva a frustração",
  },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Davide levanta o olhar, surpreso por ter sido notado antes de ser corrigido. Ele concorda com a cabeça, e tenta de novo com menos tensão nos ombros.",
  },
  B: {
    ok: false,
    text: "Davide executa de novo, mecanicamente, sem tentar se corrigir. Ninguém disse em voz alta o que ele está sentindo, e essa frustração começa a parecer resignação.",
  },
};

const REC_FEEDBACK: Record<"nomini" | "tecnica", { ok: boolean; text: string }> = {
  nomini: {
    ok: true,
    text: "Davide relaxa um pouco: «...é que eu nunca consigo.» Agora que foi dito, você pode trabalhar nisso.",
  },
  tecnica: {
    ok: false,
    text: "Davide continua executando sem esforço real — a frustração não enfrentada virou desinteresse.",
  },
};

export const casoReale08StepsPtBR: Step[] = [
  // 0 — intro
  {
    day: "caso real 08",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reais · Cenário 08</div>
        <h1>O garoto que erra e se fecha</h1>
        <p className="lede">
          Faixa 11-13 anos. Competências: observar e interpretar (Cap. 3) · o retorno (Cap. 7) — reenquadramento
          do erro.
        </p>
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
    pct: 16,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situação</div>
          <h1>Davide, 12 anos</h1>
          <p className="lede">
            Na quarta tentativa seguida de uma virada, ele erra de novo. Não protesta, não se recusa — bate uma
            mão na água e desvia o olhar, os ombros curvados.
          </p>
          <p className="prompt">O que você faz — o que você percebe primeiro, e o que você faz primeiro?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>O que você faz de verdade, na prática</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — recupero, solo se situ === "B"
  {
    day: "recuperação",
    pct: 34,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.rec,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const rec = answers.rec as "nomini" | "tecnica" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recuperação · só porque não funcionou</div>
          <h1>Davide executa mecanicamente</h1>
          <p className="lede">Sem mais tentar se corrigir.</p>
          <p className="prompt">O que você faz agora?</p>
          <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
          <h2>O que você faz de verdade, na prática</h2>
          <OptionGroup name="rec" options={REC_OPTIONS} selected={answers.rec} onPick={(v) => setResponse("rec", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 3 — scelta2, il ritorno dopo il tentativo riuscito, solo se needsScelta2
  {
    day: "escolha 2 — o retorno",
    pct: 55,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q2,
    visible: (a) => needsScelta2(a),
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Escolha 2 · O retorno, depois da tentativa bem-sucedida</div>
        <h1>Davide tenta de novo</h1>
        <p className="lede">E dessa vez a virada está quase correta.</p>
        <p className="prompt">Escreva o retorno que você dá a ele — específico, não um «muito bem» genérico.</p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
      </>
    ),
  },

  // 4 — chiusura
  {
    day: "encerramento",
    pct: 80,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Encerramento</div>
        <h1>O que você leva com você</h1>
        <p className="prompt">
          O que você leva com você, na próxima vez que um garoto de 11-13 anos não protestar mas parar de tentar se
          corrigir?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Reflexão livre, não entra na pontuação.
        </p>
      </>
    ),
  },

  // 5 — come si legge
  {
    day: "como interpretar",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "resolvida na primeira tentativa" : recuperato(answers) ? "errada, mas recuperada" : "errada, não recuperada";
      const showScelta2 = needsScelta2(answers);
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="eyebrow">Como interpretar este cenário</div>
          <h1>O garoto que erra e se fecha</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Observar e interpretar (Cap. 3)</span>
              <span className="esito">{esito}</span>
            </div>
            {showScelta2 && (
              <div className="result-row">
                <span className="comp">O retorno (Cap. 7)</span>
                <span className="esito">registrado <i className="ph-duotone ph-check" aria-hidden="true" /></span>
              </div>
            )}
          </div>
          <p className="lede">
            Aos 11-13 anos, a frustração muitas vezes não é dita em palavras: ela aparece no gesto (a mão na água, o
            olhar em outro lugar) antes de aparecer na voz. O instrutor precisa perceber isso antes de corrigir o
            erro.
          </p>
        </>
      );
    },
  },
];
