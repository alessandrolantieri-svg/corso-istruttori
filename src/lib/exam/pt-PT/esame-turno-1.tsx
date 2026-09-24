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
// resposta/valores internos do turno italiano (src/lib/exam/esame-turno-1.tsx) — muda apenas o
// texto visível.
// Porta 1:1 beat1Outcome()/beat2Version() do mockup esame-turno1.html: Aurora e Diego são duas
// leituras sem ligação entre si, avaliadas separadamente — quatro desfechos, não dois.
type Beat1Outcome = "A" | "B" | "C" | "D" | null;
function beat1Outcome(a: Record<string, string>): Beat1Outcome {
  const aurora = a.aurora,
    diego = a.diego;
  if (!aurora || !diego) return null;
  if (aurora === "giusta" && diego === "giusta") return "A";
  if (aurora === "giusta" && diego === "sbagliata") return "B";
  if (aurora === "sbagliata" && diego === "giusta") return "C";
  return "D";
}
function needsBeat2A(a: Record<string, string>): boolean {
  return beat1Outcome(a) === "D";
}
type Beat2Version = "pulita" | "diego-agitato" | "aurora-ferma" | "recupero-riuscito" | "mai-recuperato";
function beat2Version(a: Record<string, string>): Beat2Version {
  const o = beat1Outcome(a);
  if (o === "A") return "pulita";
  if (o === "B") return "diego-agitato";
  if (o === "C") return "aurora-ferma";
  if (o === "D") return a.beat2a === "separi" ? "recupero-riuscito" : "mai-recuperato";
  return "pulita";
}

const AURORA_OPTIONS: Option[] = [
  { value: "giusta", label: "Aproximas-te, pões-te ao nível dela, estendes a mão sem lhe dizeres «entra»" },
  {
    value: "sbagliata",
    label: "Usas uma garantia genérica ou tentas fazê-la entrar diretamente («anda, não aconteceu nada, vem»)",
  },
];
const DIEGO_OPTIONS: Option[] = [
  { value: "giusta", label: "Dás-lhe uma tarefa que use essa energia («traz-me tu as pranchas, corre!»)" },
  {
    value: "sbagliata",
    label: "Limitas-te a chamá-lo à atenção («Diego, quieto!») sem lhe dares um sítio onde pôr essa energia",
  },
];
const BEAT2A_OPTIONS: Option[] = [
  {
    value: "separi",
    label: "Separas os dois problemas — dás a Diego e a Elisa uma tarefa rápida e distinta, e só depois voltas para junto de Aurora, com calma",
  },
  {
    value: "insisti",
    label: "Insistes na mesma jogada que já não funcionou — voltas a chamar todos em voz alta, ou repetes a mesma garantia genérica",
  },
];

const BEAT1_FEEDBACK: Record<Exclude<Beat1Outcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Aurora, sentindo-te por perto e sem se sentir pressionada, mete o pé mais fundo. Diego, com algo para fazer, canaliza a energia e volta a correr para o grupo, contente.",
  },
  B: {
    ok: false,
    text: "Aurora relaxa e mete o pé na água. Diego para um segundo, mas quase de imediato volta a empurrar — uma chamada de atenção não lhe deu nada para fazer com essa energia.",
  },
  C: {
    ok: false,
    text: "Diego afasta-se contente com a sua tarefa. Aurora fica parada — a garantia não chegou até ela: a causa era o medo, não a hesitação, e para isso não basta convencê-la com palavras.",
  },
  D: {
    ok: false,
    text: "Aurora não se mexe — a garantia genérica não chegou até ela. Diego, chamado em voz alta, para um segundo mas recomeça quase de imediato: não precisava de uma ordem, precisava de descarregar essa energia nalgum sítio.",
  },
};

const BEAT2_VERSION_TEXT: Record<Beat2Version, string> = {
  pulita: "O grupo está tranquilo. Toda a tua atenção está livre para o Marco.",
  "diego-agitato": "Diego continua a mexer-se à margem do grupo enquanto tentas acompanhar o Marco: um olho tem de ficar nele.",
  "aurora-ferma": "Aurora ficou na borda, não voltou a entrar: um olho tem de ficar nela enquanto trabalhas com o Marco.",
  "recupero-riuscito": "O grupo voltou a juntar-se, mas alguns minutos mais tarde do previsto: o Marco esperou, um pouco distraído com o que aconteceu antes.",
  "mai-recuperato": "O grupo chega ainda agitado: Diego continua a incomodar à margem enquanto tentas trabalhar com o Marco.",
};

export const esameTurno1StepsPtPT: Step[] = [
  // 0 — intro
  {
    day: "antes de começar",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Exame final · Turno 1</div>
        <h1>O grupo dos pequenos</h1>
        <p className="lede">
          Tens à tua frente um grupo de quatro crianças: <strong>Aurora (4 anos)</strong>, <strong>Elisa (6 anos)</strong>,{" "}
          <strong>Marco (7 anos)</strong> e <strong>Diego (9 anos)</strong>. É o turno de quarta-feira: quinze
          minutos de aquecimento, e depois o exercício da semana.
        </p>
        <div className="card warn">
          Isto não é um capítulo. Não há um botão «pergunta seguinte». Há apenas o que acontece depois daquilo que
          escolhes.
        </div>
        <p className="lede">
          O turno está dividido em <strong>beats</strong> — os momentos da mesma cena, um a seguir
          ao outro: o que escolhes num beat muda o beat seguinte. Não são perguntas separadas, é
          uma cena única que se move contigo.
        </p>
        <p className="lede">
          A nota vai de 80 a 100. O <strong>100 com distinção</strong> é o nível mais alto: não
          basta responder bem, é preciso também saber recuperar de um erro em tempo real, à frente
          do grupo — se isso te acontecer, é uma oportunidade, não um problema.
        </p>
      </>
    ),
  },

  // 1 — beat1
  {
    day: "beat 1",
    pct: 14,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.aurora && !!a.diego,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = beat1Outcome(answers);
      const fb = outcome ? BEAT1_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Beat 1 · Duas coisas ao mesmo tempo</div>
          <h1>Aurora e Diego, no mesmo momento</h1>
          <p className="lede">
            Acabaste de chegar à borda. <strong>Aurora</strong> está parada, com o pé na água até ao tornozelo, sem
            se mexer — os ombros para cima, tensos, os olhos fixos na água. No mesmo momento,{" "}
            <strong>Diego</strong> começa a empurrar o Marco na brincadeira, a rir alto, e não consegue ficar quieto.
          </p>
          <p className="prompt">Tens um instante. Com quem começas, e o que fazes primeiro?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>O que fazes mesmo, na prática</h2>
          <p className="lede">
            Aurora e Diego são duas situações sem ligação entre si — são avaliadas separadamente, não como um bloco
            único.
          </p>
          <p className="prompt">Com a Aurora:</p>
          <OptionGroup name="aurora" options={AURORA_OPTIONS} selected={answers.aurora} onPick={(v) => setResponse("aurora", v)} />
          <p className="prompt">Com o Diego:</p>
          <OptionGroup name="diego" options={DIEGO_OPTIONS} selected={answers.diego} onPick={(v) => setResponse("diego", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — beat2a, solo se esito D
  {
    day: "beat 2a — recuperação",
    pct: 28,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q2a && !!a.beat2a,
    visible: (a) => needsBeat2A(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Beat 2A · só porque nenhuma das duas leituras estava certa</div>
        <h1>O grupo começa a desunir-se</h1>
        <p className="lede">
          Aurora continua parada. Diego, entretanto, voltou a empurrar — desta vez a Elisa, que se afasta
          incomodada. O grupo começa a desunir-se.
        </p>
        <p className="prompt">Tens uma segunda bifurcação. O que fazes agora?</p>
        <Field id="q2a" value={answers.q2a ?? ""} onChange={(v) => setReflection("q2a", v)} />
        <h2>O que fazes mesmo, na prática</h2>
        <OptionGroup name="beat2a" options={BEAT2A_OPTIONS} selected={answers.beat2a} onPick={(v) => setResponse("beat2a", v)} />
        {answers.beat2a === "separi" && (
          <div className="feedback ok">
            Diego afasta-se contente com uma tarefa para fazer. Elisa, ouvida um momento à parte, acalma-se. Aurora,
            já sem a agitação à volta, mete finalmente o pé mais fundo.
          </div>
        )}
        {answers.beat2a === "insisti" && (
          <div className="feedback retry">
            Elisa afasta-se ainda mais, agora também amuada. Diego, sem nenhuma tarefa para fazer, volta a empurrar.
            Aurora, ao ouvir a voz levantada no grupo, fica ainda mais tensa em vez de menos.
          </div>
        )}
      </>
    ),
  },

  // 3 — beat2, la consegna a Marco
  {
    day: "beat 2",
    pct: 45,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q2,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Beat 2 · A instrução para o Marco</div>
        <h1>O contexto com que chegas</h1>
        <div className="card">{BEAT2_VERSION_TEXT[beat2Version(answers)]}</div>
        <p className="lede">
          <strong>Agora é a vez do Marco, 7 anos.</strong> Ele tem de aprender a entrada na água em dois tempos —
          braços, depois pernas — um exercício novo para ele.
        </p>
        <p className="prompt">
          Escreve a instrução que lhe darias, formulada de forma positiva, adequada à sua faixa etária (6-10 anos:
          consegue seguir dois passos seguidos).
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
      </>
    ),
  },

  // 4 — beat3, la verifica che non si vede
  {
    day: "beat 3",
    pct: 62,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q3,
    render: ({ answers, setReflection }: StepContext) => {
      const v = beat2Version(answers);
      const noise =
        v === "diego-agitato" || v === "mai-recuperato" ? (
          <div className="card">
            Justamente nesse momento Diego, à margem, ri alto por qualquer coisa — o Marco pode ter parado pela
            hesitação técnica, ou por se ter distraído ao virar-se para a risada. Ler as quatro causas do Capítulo 3
            é aqui genuinamente mais difícil, não só mais stressante: mais um elemento a descartar antes de chegar à
            causa verdadeira.
          </div>
        ) : v === "aurora-ferma" ? (
          <div className="card">
            A atenção está dividida entre o Marco e a Aurora — o risco não é um ruído que confunda a leitura, mas o
            tempo: quão depressa reparas na hesitação do Marco enquanto um olho fica nela.
          </div>
        ) : (
          <div className="card">O momento é claro, sem ruído à volta — só o Marco e a sua hesitação.</div>
        );
      return (
        <>
          <div className="eyebrow">Beat 3 · A verificação que não se vê</div>
          <h1>A hesitação do Marco</h1>
          <p className="lede">
            O Marco executa. Parece correto — mas para um instante antes do segundo passo, com uma expressão que não
            consegues ler bem.
          </p>
          {noise}
          <p className="prompt">
            Qual das quatro causas do Capítulo 3 te parece mais provável, e o que fazes — não o que lhe perguntas
            por palavras, o que fazes — para descobrir?
          </p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
        </>
      );
    },
  },

  // 5 — chiusura
  {
    day: "encerramento",
    pct: 80,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Encerramento do Turno 1</div>
        <h1>O que levas contigo</h1>
        <p className="lede">
          O turno termina. O grupo sai da água, Aurora a sorrir, Marco ainda um pouco inseguro quanto ao último
          exercício.
        </p>
        <p className="prompt">
          Uma última pergunta, antes de passares ao Turno 2: o que levas contigo, deste turno, para o próximo?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Esta reflexão não entra na pontuação: é a mesma que fizeste durante dez semanas, a última vez antes do
          resultado.
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
      const c4 =
        o === "A"
          ? "resolvida à primeira"
          : o === "B" || o === "C"
            ? "resolvida em parte"
            : answers.beat2a === "separi"
              ? "errada, mas recuperada"
              : "errada, não recuperada";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Turno 1 concluído</div>
          <div className="eyebrow">Como se lê o resultado</div>
          <h1>O grupo dos pequenos</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">C4 · Sintonia</span>
              <span className="esito">{c4}</span>
            </div>
            <div className="result-row">
              <span className="comp">C2 · Reconhecimento do aluno</span>
              <span className="esito">registado <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            <div className="result-row">
              <span className="comp">C5 · Instrução positiva</span>
              <span className="esito">registado <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            <div className="result-row">
              <span className="comp">C3 <i className="ph-duotone ph-trophy" aria-hidden="true" /> · Observar e interpretar</span>
              <span className="esito">registado <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
          </div>
          {o === "D" && answers.beat2a === "separi" && (
            <div className="card quote">
              Um erro bem recuperado não é o mesmo que nunca ter errado — mas também não é um simples remendo.
              Mostra que sabes adaptar-te bem sob pressão: o caminho para a pontuação máxima não passa só por um
              turno perfeito do início ao fim.
            </div>
          )}
          <p className="lede">
            O turno continua de qualquer forma, seja qual for o caminho que tenhas seguido — coerente com «não se
            pode falhar, só adiar». O próximo turno espera por ti: <strong>Turno 2 — A situação difícil.</strong>
          </p>
        </>
      );
    },
  },
];
