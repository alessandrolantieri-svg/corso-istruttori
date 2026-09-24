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

// Tradução para português europeu, não é um turno independente: as mesmas chapterId/chaves de
// resposta/valores internos do turno italiano (src/lib/exam/esame-turno-3.tsx) — muda apenas o
// texto visível.
// Porta 1:1 beat1Outcome()/needsBeat2A()/matteoRecovered()/beat2Attention() do mockup
// esame-turno3.html: desfecho do Beat 1: A = razão real + tom coerente, B = razão real + tom
// incongruente, D = nenhuma razão real.
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
      "Dás um motivo ligado a um benefício concreto («alonga-te a braçada, experimenta e sente a diferença») com um tom que mostra que te importas mesmo com a resposta",
  },
  {
    value: "B",
    label:
      "Dizes a coisa certa («é útil para ti») mas suspirando, a olhar para outro lado, com um tom apressado que diz «não tenho tempo para isto»",
  },
  {
    value: "D",
    label: "«Porque eu disse» ou «anda, não compliques, faz-se e pronto» — nenhuma razão real",
  },
];
const BEAT2A_OPTIONS: Option[] = [
  {
    value: "recupero",
    label:
      "Reconheces que não deste um motivo verdadeiro, e dá-lo agora («tens razão, para um instante — digo-te a sério...»)",
  },
  { value: "insisti", label: "Insistes na autoridade («faz-se porque eu digo, ponto final»)" },
];
const ELENA_OPTIONS: Option[] = [
  { value: "silenzio", label: "Pedes-lhe a opinião, ou ficas em silêncio deixando que seja ela a avaliar-se" },
  { value: "corregge", label: "Corriges na mesma, por hábito, mesmo que a execução esteja certa" },
];
const TONO_OPTIONS: Option[] = [
  {
    value: "congruente",
    label:
      "Retorno específico e congruente — por ex. «impulsionaste bem com as pernas na volta, notou-se a diferença», dito a olhar para ele",
  },
  {
    value: "tradisce",
    label: "Retorno tecnicamente certo mas o tom trai-o — sarcástico, apressado, ou dito enquanto já te afastas",
  },
];

const BEAT1_FEEDBACK: Record<Exclude<Beat1Outcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Matteo faz as repetições com um empenho visível — não perfeito, mas real. No fim diz: «...ok, de facto sente-se diferente.»",
  },
  B: {
    ok: false,
    text: "Matteo faz, mas a meio gás: as palavras diziam uma coisa, o tom outra, e ele ficou preso a essa contradição em vez de ao conteúdo. «Está bem, como quiseres» — faz, mas sem procurar nada nisso.",
  },
  D: {
    ok: false,
    text: "Matteo faz uma volta sem energia, sem impulsionar mesmo — não é uma recusa aberta, é o mínimo indispensável. Um adolescente de 14-18 anos, sem um motivo, não executa mesmo (Capítulo 2) — executa só o suficiente para não se fazer notar.",
  },
};

const BEAT2A_FEEDBACK: Record<"recupero" | "insisti", { ok: boolean; text: string }> = {
  recupero: {
    ok: true,
    text: "Matteo abranda, olha para ti — um pouco surpreendido por teres voltado ao assunto em vez de deixares passar. Na volta seguinte, impulsiona mais.",
  },
  insisti: {
    ok: false,
    text: "Matteo não responde, mas faz o resto do treino distante, calado, no mínimo.",
  },
};

const ELENA_FEEDBACK: Record<"silenzio" | "corregge", { ok: boolean; text: string }> = {
  silenzio: {
    ok: true,
    text: "ELENA: «...acho que mantive melhor a posição desta vez. É verdade?» — já deu a sua opinião antes de pedir a tua.",
  },
  corregge: {
    ok: false,
    text: "ELENA: «...ok.» — volta a executar à espera, como sempre, do teu veredito final.",
  },
};

const TONO_FEEDBACK: Record<"congruente" | "tradisce", { ok: boolean; text: string }> = {
  congruente: {
    ok: true,
    text: "Matteo acena que sim, não diz muito — mas na volta seguinte o esforço mantém-se.",
  },
  tradisce: {
    ok: false,
    text: "Matteo volta a fechar-se — as palavras diziam uma coisa, o tom outra, e a contradição fez com que deixasse de confiar.",
  },
};

const BEAT2_ATTENTION_TEXT: Record<Beat2Attention, string> = {
  libera: "A atenção está livre, podes acompanhar a Elena sem distrações.",
  divisa:
    "Um olho fica em Matteo, que continua a nadar sem empenho ali ao lado: dar à Elena a atenção calma que merece custa mais quando uma parte de ti ainda o está a vigiar.",
};

export const esameTurno3StepsPtPT: Step[] = [
  // 0 — intro
  {
    day: "antes de começar",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Exame final · Turno 3</div>
        <h1>Os adolescentes, e quem já sabe fazer sozinho</h1>
        <p className="lede">
          Estás com um grupo de jovens de 14-18 anos. O aquecimento prevê repetições de viragem — não é o preferido
          de ninguém. O <strong>Matteo (16 anos)</strong> está no grupo há alguns meses. A{" "}
          <strong>Elena (17 anos)</strong> acompanha-te há três anos: na viragem, já não precisas de a observar
          sempre.
        </p>
        <div className="card warn">
          Isto não é um capítulo. Não há um botão «pergunta seguinte». Há apenas o que acontece depois daquilo que
          escolhes.
        </div>
        <p className="lede">
          Como nos turnos anteriores: o turno está dividido em <strong>beats</strong> — os
          momentos da mesma cena, um a seguir ao outro — e a nota vai de 80 a 100, com o{" "}
          <strong>100 com distinção</strong> reservado a quem também sabe recuperar bem de um erro
          em tempo real.
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
          <h1>«Porque é que temos sempre de fazer este exercício, é uma seca.»</h1>
          <p className="lede">
            Matteo para, não cruza os braços como faria um miúdo de doze anos — é mais uma pergunta verdadeira do
            que um desafio.
          </p>
          <p className="prompt">O que respondes — as palavras que usas, e com que tom?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>O que fazes mesmo, na prática</h2>
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
          <div className="eyebrow">Beat 2A · só porque não deste uma razão real</div>
          <h1>Matteo no mínimo</h1>
          <p className="lede">
            Matteo continua a nadar no mínimo, afastado do grupo cerca de um metro, sem impulsionar.
          </p>
          <p className="prompt">Tens uma segunda bifurcação. O que fazes agora?</p>
          <Field id="q2a" value={answers.q2a ?? ""} onChange={(v) => setReflection("q2a", v)} />
          <h2>O que fazes mesmo, na prática</h2>
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
          <div className="eyebrow">Beat 2 · Deixá-la seguir</div>
          <h1>A viragem da Elena</h1>
          <p className="lede">
            Entretanto, independentemente de como correu com Matteo — é um problema sem ligação, não uma
            consequência — chega o momento da Elena. Ela completa uma viragem tecnicamente limpa, aquela que há um
            ano corrigias quase sempre. Hoje não precisou disso.
          </p>
          <div className="card">{BEAT2_ATTENTION_TEXT[attn]}</div>
          <p className="prompt">O que lhe dizes, logo a seguir à viragem?</p>
          <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
          <h2>O que fazes mesmo, na prática</h2>
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
          <div className="eyebrow">Beat 3 · Congruência sob pressão</div>
          <h1>O primeiro esforço verdadeiro de Matteo, hoje</h1>
          <p className="lede">
            Perto do fim do turno, Matteo — seja qual for a versão a que chegaste — tenta pela primeira vez hoje com
            empenho real. Mesmo na versão «Matteo à distância», algo o move: vê a Elena receber confiança em vez de
            correções, e tenta. A execução não é perfeita, mas há, pela primeira vez hoje, um esforço verdadeiro.
          </p>
          <p className="prompt">
            Escreve o que lhe dizes — tem de ficar coerente: as palavras, o tom e o que o teu corpo comunica têm de
            dizer a mesma coisa.
          </p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
          <h2>O que fazes mesmo, na prática</h2>
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
        <div className="eyebrow">Encerramento do Turno 3 — o último dos três</div>
        <h1>Olhando para trás, aos três turnos juntos</h1>
        <p className="prompt">
          O que aprendeste sobre ti como instrutor, que não sabias olhando apenas para os dez capítulos um de cada
          vez?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Esta reflexão não entra na pontuação: é a última antes do resultado final do exame.
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
      const b1c5 = o === "A" ? "tom coerente" : o === "B" ? "tom incongruente" : "nenhuma razão dada";
      const b3c5 = answers.tono === "congruente" ? "retorno congruente" : "tom que trai as palavras";
      const c10 = answers.elena === "silenzio" ? "resolvida" : "oportunidade perdida, não um erro grave";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Turno 3 concluído</div>
          <div className="exam-badge"><i className="ph-duotone ph-flag-checkered" aria-hidden="true" /> Os três turnos estão encerrados</div>
          <div className="eyebrow">Como se lê o resultado</div>
          <h1>Os adolescentes, e quem já sabe fazer sozinho</h1>
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
              Recuar numa ordem dada mal, à frente do jovem que te pôs à prova, sem perderes a face e sem fazeres
              uma cena: é uma boa recuperação, feita sob observação. Exatamente o tipo de prova que é preciso para o
              100 com distinção.
            </div>
          )}
          <p className="lede">
            O turno encerra-se de qualquer forma, seja qual for o caminho que tenhas seguido — coerente com «não se
            pode falhar, só adiar». Com isto, os três turnos do exame final estão concluídos.
          </p>
        </>
      );
    },
  },
];
