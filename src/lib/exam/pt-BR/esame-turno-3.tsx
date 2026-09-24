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

// Tradução para o português (Brasil), não é uma rodada independente: mesmos chapterId/chaves de
// resposta/valores internos da rodada italiana (src/lib/exam/esame-turno-3.tsx) — muda apenas o
// texto visível.
// Porta 1:1 beat1Outcome()/needsBeat2A()/matteoRecovered()/beat2Attention() do mockup
// esame-turno3.html: resultado do Beat 1: A = motivo real + tom coerente, B = motivo real + tom
// incoerente, D = nenhum motivo real.
type Beat1Outcome = "A" | "B" | "D" | null;
function beat1Outcome(a: Record<string, string>): Beat1Outcome {
  return (a.beat1 as Beat1Outcome) || null;
}
function needsBeat2A(a: Record<string, string>): boolean {
  return beat1Outcome(a) === "D";
}
function matteoRecovered(a: Record<string, string>): boolean {
  return a.beat2a === "recupero";
}
type Beat2Attention = "libera" | "divisa";
function beat2Attention(a: Record<string, string>): Beat2Attention {
  const o = beat1Outcome(a);
  if (o === "A") return "libera";
  if (o === "D") return matteoRecovered(a) ? "libera" : "divisa";
  return "divisa"; // B
}

const BEAT1_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Você dá um motivo ligado a um benefício concreto («alonga sua braçada, tenta e sente a diferença») com um tom que mostra que você realmente se importa com a resposta",
  },
  {
    value: "B",
    label:
      "Você diz a coisa certa («é bom para você») mas suspirando, olhando para outro lugar, com um tom apressado que diz «não tenho tempo para isso»",
  },
  {
    value: "D",
    label: "«Porque eu mandei» ou «vai, para de encher, é só fazer» — nenhum motivo real",
  },
];
const BEAT2A_OPTIONS: Option[] = [
  {
    value: "recupero",
    label:
      "Você reconhece que não deu um motivo de verdade, e dá agora («você tem razão, espera um pouco — vou te dizer sério...»)",
  },
  { value: "insisti", label: "Você insiste na autoridade («faz porque eu mandei, e ponto»)" },
];
const ELENA_OPTIONS: Option[] = [
  { value: "silenzio", label: "Você pergunta a opinião dela, ou fica em silêncio deixando que ela mesma se avalie" },
  { value: "corregge", label: "Você a corrige de qualquer jeito, por hábito, mesmo que a observação dela esteja certa" },
];
const TONO_OPTIONS: Option[] = [
  {
    value: "congruente",
    label:
      "Retorno específico e coerente — ex.: «você empurrou com as pernas na virada, deu para ver a diferença», dito olhando para ele",
  },
  {
    value: "tradisce",
    label: "Retorno tecnicamente certo, mas o tom trai — sarcástico, apressado, ou dito enquanto você já está se afastando",
  },
];

const BEAT1_FEEDBACK: Record<Exclude<Beat1Outcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "O Matteo faz as repetições com um esforço visível — não perfeito, mas real. No final diz: «...ok, realmente parece diferente.»",
  },
  B: {
    ok: false,
    text: "O Matteo executa, mas pela metade: as palavras diziam uma coisa, o tom outra, e ele ficou preso nessa contradição em vez de prestar atenção no conteúdo. «Tá bom, como você quiser» — ele faz, mas sem buscar nada nisso.",
  },
  D: {
    ok: false,
    text: "O Matteo faz uma volta sem empenho, sem empurrar de verdade — não é uma recusa aberta, é o mínimo necessário. Um adolescente de 14-18 anos, sem um motivo, não executa de verdade (Capítulo 2) — executa só o suficiente para não chamar atenção.",
  },
};

const BEAT2A_FEEDBACK: Record<"recupero" | "insisti", { ok: boolean; text: string }> = {
  recupero: {
    ok: true,
    text: "O Matteo diminui o ritmo, olha para você — um pouco surpreso que você tenha voltado ao assunto em vez de deixar para lá. Na volta seguinte, empurra mais.",
  },
  insisti: {
    ok: false,
    text: "O Matteo não responde, mas passa o resto do treino distante, calado, no mínimo.",
  },
};

const ELENA_FEEDBACK: Record<"silenzio" | "corregge", { ok: boolean; text: string }> = {
  silenzio: {
    ok: true,
    text: "ELENA: «...acho que mantive melhor o alinhamento dessa vez. É verdade?» — ela já deu a opinião dela antes de pedir a sua.",
  },
  corregge: {
    ok: false,
    text: "ELENA: «...ok.» — ela executa de novo esperando, como sempre, o seu veredito final.",
  },
};

const TONO_FEEDBACK: Record<"congruente" | "tradisce", { ok: boolean; text: string }> = {
  congruente: {
    ok: true,
    text: "O Matteo concorda com a cabeça, não diz muita coisa — mas na volta seguinte o esforço continua.",
  },
  tradisce: {
    ok: false,
    text: "O Matteo se fecha de novo — as palavras diziam uma coisa, o tom outra, e a contradição fez ele parar de confiar.",
  },
};

const BEAT2_ATTENTION_TEXT: Record<Beat2Attention, string> = {
  libera: "A atenção está livre, você pode acompanhar a Elena sem distrações.",
  divisa:
    "Um olho continua no Matteo, que nada mesmo assim sem empenho ali perto: dar à Elena a atenção calma que ela merece custa mais quando parte de você ainda está de olho nele.",
};

export const esameTurno3StepsPtBR: Step[] = [
  // 0 — intro
  {
    day: "antes de começar",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Exame final · Rodada 3</div>
        <h1>Os adolescentes, e quem já sabe se virar sozinho</h1>
        <p className="lede">
          Você está com um grupo de adolescentes de 14 a 18 anos. O aquecimento tem repetições de virada — o exercício
          preferido de ninguém. <strong>Matteo (16 anos)</strong> está no grupo há alguns meses. <strong>Elena (17 anos)</strong>{" "}
          te acompanha há três anos: na virada, hoje em dia, você já não precisa mais olhar para ela toda vez.
        </p>
        <div className="card warn">
          Isso não é um capítulo. Não existe um botão «próxima pergunta». Só existe o que acontece depois do que você
          escolhe.
        </div>
        <p className="lede">
          Como nas rodadas anteriores: a rodada é dividida em <strong>beats</strong> — os momentos da mesma cena, um
          depois do outro — e a nota vai de 80 a 100, com o <strong>100 com louvor</strong> reservado para quem também
          sabe recuperar bem um erro em tempo real.
        </p>
      </>
    ),
  },

  // 1 — beat1
  {
    day: "beat 1",
    pct: 12,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.beat1,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = beat1Outcome(answers);
      const fb = outcome ? BEAT1_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Beat 1 · O porquê</div>
          <h1>«Por que a gente sempre tem que fazer esse exercício, é chato.»</h1>
          <p className="lede">
            O Matteo para, não cruza os braços como faria um garoto de doze anos — é mais uma pergunta de verdade do
            que um desafio.
          </p>
          <p className="prompt">O que você responde — as palavras que você usa, e com que tom?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>O que você faz de verdade, na prática</h2>
          <OptionGroup name="beat1" options={BEAT1_OPTIONS} selected={answers.beat1} onPick={(v) => setResponse("beat1", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — beat2a, solo se esito D
  {
    day: "beat 2a — recuperação",
    pct: 24,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q2a && !!a.beat2a,
    visible: (a) => needsBeat2A(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const val = answers.beat2a as "recupero" | "insisti" | undefined;
      const fb = val ? BEAT2A_FEEDBACK[val] : null;
      return (
        <>
          <div className="eyebrow">Beat 2A · só porque você não deu um motivo real</div>
          <h1>Matteo no mínimo</h1>
          <p className="lede">
            O Matteo continua nadando no mínimo, um metro afastado do grupo, sem empurrar.
          </p>
          <p className="prompt">Você tem uma segunda encruzilhada. O que você faz agora?</p>
          <Field id="q2a" value={answers.q2a ?? ""} onChange={(v) => setReflection("q2a", v)} />
          <h2>O que você faz de verdade, na prática</h2>
          <OptionGroup name="beat2a" options={BEAT2A_OPTIONS} selected={answers.beat2a} onPick={(v) => setResponse("beat2a", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 3 — beat2, la virata di Elena
  {
    day: "beat 2 — Elena",
    pct: 40,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q2 && !!a.elena,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const attn = beat2Attention(answers);
      const val = answers.elena as "silenzio" | "corregge" | undefined;
      const fb = val ? ELENA_FEEDBACK[val] : null;
      return (
        <>
          <div className="eyebrow">Beat 2 · Deixar ela seguir em frente</div>
          <h1>A virada da Elena</h1>
          <p className="lede">
            Enquanto isso, independente de como foi com o Matteo — é um problema sem relação, não uma consequência —
            chega a vez da Elena. Ela completa uma virada tecnicamente limpa, aquela que um ano atrás você corrigia
            quase toda vez. Hoje ela não precisou disso.
          </p>
          <div className="card">{BEAT2_ATTENTION_TEXT[attn]}</div>
          <p className="prompt">O que você diz a ela, logo depois da virada?</p>
          <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
          <h2>O que você faz de verdade, na prática</h2>
          <OptionGroup name="elena" options={ELENA_OPTIONS} selected={answers.elena} onPick={(v) => setResponse("elena", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 4 — beat3, congruenza sotto pressione
  {
    day: "beat 3 — Matteo",
    pct: 60,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q3 && !!a.tono,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const val = answers.tono as "congruente" | "tradisce" | undefined;
      const fb = val ? TONO_FEEDBACK[val] : null;
      return (
        <>
          <div className="eyebrow">Beat 3 · Coerência sob pressão</div>
          <h1>O primeiro esforço de verdade do Matteo, hoje</h1>
          <p className="lede">
            Perto do fim da rodada, o Matteo — seja qual for a versão pela qual você chegou até aqui — tenta pela
            primeira vez hoje uma tentativa com esforço real. Mesmo na versão «Matteo distante», alguma coisa o move:
            ele vê a Elena receber confiança em vez de correções, e tenta também. A execução não é perfeita, mas
            existe, pela primeira vez hoje, um esforço de verdade.
          </p>
          <p className="prompt">
            Escreva o que você diz a ele — precisa ficar coerente: as palavras, o tom e o que o seu corpo comunica
            precisam dizer a mesma coisa.
          </p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
          <h2>O que você faz de verdade, na prática</h2>
          <OptionGroup name="tono" options={TONO_OPTIONS} selected={answers.tono} onPick={(v) => setResponse("tono", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 5 — chiusura
  {
    day: "encerramento",
    pct: 82,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Encerramento da Rodada 3 — a última das três</div>
        <h1>Olhando para trás, para as três rodadas juntas</h1>
        <p className="prompt">
          O que você aprendeu sobre você mesmo como instrutor, que não sabia olhando só os dez capítulos um de cada
          vez?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Essa reflexão não entra na pontuação: é a última antes do resultado final do exame.
        </p>
      </>
    ),
  },

  // 6 — risultato
  {
    day: "resultado",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = beat1Outcome(answers);
      const c2 = o === "D" ? (matteoRecovered(answers) ? "errada, mas recuperada" : "errada, não recuperada") : "resolvida";
      const b1c5 = o === "A" ? "tom coerente" : o === "B" ? "tom incoerente" : "nenhum motivo dado";
      const b3c5 = answers.tono === "congruente" ? "retorno coerente" : "tom que trai as palavras";
      const c10 = answers.elena === "silenzio" ? "resolvida" : "oportunidade perdida, não um erro grave";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Rodada 3 concluída</div>
          <div className="exam-badge"><i className="ph-duotone ph-flag-checkered" aria-hidden="true" /> As três rodadas estão encerradas</div>
          <div className="eyebrow">Como interpretar o resultado</div>
          <h1>Os adolescentes, e quem já sabe se virar sozinho</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">C2 · Comunicação por idade (14-18)</span>
              <span className="esito">{c2}</span>
            </div>
            <div className="result-row">
              <span className="comp">C5 · Congruência</span>
              <span className="esito">
                Beat 1: {b1c5} · Beat 3: {b3c5}
              </span>
            </div>
            <div className="result-row">
              <span className="comp">C10 · Autonomia</span>
              <span className="esito">{c10}</span>
            </div>
          </div>
          {o === "D" && matteoRecovered(answers) && (
            <div className="card quote">
              Dar marcha à ré numa ordem mal dada, na frente do adolescente que colocou você à prova, sem perder a
              compostura e sem fazer cena: é uma boa recuperação, feita sob observação. Exatamente o tipo de prova que
              é preciso para o 100 com louvor.
            </div>
          )}
          <p className="lede">
            A rodada se encerra de qualquer forma, seja qual for o caminho que você tenha escolhido — coerente com «não
            se pode falhar, só adiar». Com isso, as três rodadas do exame final estão completas.
          </p>
        </>
      );
    },
  },
];
