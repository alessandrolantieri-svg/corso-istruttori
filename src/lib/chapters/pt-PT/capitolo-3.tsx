import { OptionGroup, type Option } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Tradução em português europeu, não um capítulo independente: mesmos chapterId/chaves de
// resposta/valores internos do capítulo italiano (src/lib/chapters/capitolo-3.tsx) — só muda o
// texto visível.

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

// Reproduz 1:1 a função simPath() do capítulo italiano: classifica a combinação das duas
// primeiras escolhas da simulação com o Luca num percurso "aberto" (há uma terceira troca, em
// texto livre) ou "fechado" (a cena fecha-se sem terceira troca).
function simPath(answers: Record<string, string>): "aperta" | "chiusa" {
  if (answers.sim1 === "curioso" && answers.sim2 === "scalda") return "aperta";
  if (answers.sim1 === "diretto" && answers.sim2 === "calma") return "aperta";
  return "chiusa";
}

const K1_OPTIONS: Option[] = [
  { value: "si", label: "Sim, o medo é o mesmo a qualquer idade", correct: false },
  { value: "no", label: "Não — aos 5 anos um jogo ou uma mão estendida, aos 13 não ser vista a hesitar", correct: true },
];
const K2_OPTIONS: Option[] = [
  { value: "bracciata", label: "«Porque te alonga a braçada — experimenta e sente a diferença»", correct: true },
  { value: "dico", label: "«Porque eu digo, agora faz»", correct: false },
];
const K3_OPTIONS: Option[] = [
  { value: "risponde", label: "Pela forma como responde", correct: true },
  { value: "carta", label: "Pelo cartão de cidadão", correct: false },
];
const K4_OPTIONS: Option[] = [
  { value: "eta", label: "Trata-lo segundo a idade civil", correct: false },
  { value: "comportamento", label: "Trata-lo segundo o comportamento que mostra", correct: true },
];
const K5_OPTIONS: Option[] = [
  { value: "no", label: "Não — a faixa etária também se lê pelo contexto", correct: true },
  { value: "si", label: "Sim, tinhas errado a avaliá-lo", correct: false },
];
const K6_OPTIONS: Option[] = [
  { value: "si", label: "Sim, se for clara", correct: false },
  { value: "no", label: "Não — perde-o a meio, mesmo que pareça a ouvir", correct: true },
];

const M1_OPTIONS: Option[] = [
  { value: "freddo", label: "Frio", correct: true },
  { value: "paura", label: "Medo", correct: false },
  { value: "via", label: "Espera o sinal de avanço", correct: false },
  { value: "capito", label: "Não percebeu", correct: false },
];
const M2_OPTIONS: Option[] = [
  { value: "paura", label: "Medo", correct: false },
  { value: "freddo", label: "Frio", correct: false },
  { value: "via", label: "Espera o sinal de avanço", correct: true },
  { value: "capito", label: "Não percebeu", correct: false },
];
const M3_OPTIONS: Option[] = [
  { value: "via", label: "Espera o sinal de avanço", correct: false },
  { value: "freddo", label: "Frio", correct: false },
  { value: "capito", label: "Não percebeu — a instrução ainda não é clara, é preciso reexplicar, não basta um aceno", correct: true },
  { value: "paura", label: "Medo", correct: false },
];
const M4_OPTIONS: Option[] = [
  { value: "no", label: "Não, os quatro sinais mantêm-se sempre distintos e fixos", correct: false },
  { value: "si", label: "Sim — o sinal pode mudar enquanto observas, se a espera se prolongar demasiado", correct: true },
];

const SIM1_OPTIONS: Option[] = [
  { value: "diretto", label: "«Vá lá Luca, já conseguiste antes, entra»" },
  { value: "curioso", label: "«Luca, o que sentes? Está fria ou tens uns arrepios?»" },
];
const SIM2_OPTIONS_DIRETTO: Option[] = [
  { value: "insisti", label: "«Vá lá Luca, tu sabes fazer isto, vá»" },
  { value: "calma", label: "Aproximas-te, baixas a voz, perguntas com calma o que sente" },
];
const SIM2_OPTIONS_CURIOSO: Option[] = [
  { value: "entra", label: "Fazes com que entre na mesma, dizendo que o frio passa dentro de água" },
  { value: "scalda", label: "Propões-lhe trinta segundos de movimento em seco na berma, como com a Giada" },
];

const T1_OPTIONS: Option[] = [
  { value: "capito", label: "Não percebeu", correct: false },
  { value: "paura", label: "Tem medo", correct: true },
  { value: "freddo", label: "Tem frio", correct: false },
  { value: "via", label: "Espera o sinal de avanço", correct: false },
];
const T2_OPTIONS: Option[] = [
  { value: "paura", label: "Tem medo", correct: false },
  { value: "capito", label: "Não percebeu", correct: false },
  { value: "via", label: "Espera o sinal de avanço", correct: true },
  { value: "freddo", label: "Tem frio", correct: false },
];
const T3_OPTIONS: Option[] = [
  { value: "calore", label: "Falta calor — provavelmente tem frio", correct: true },
  { value: "coraggio", label: "Falta coragem", correct: false },
  { value: "spiegazione", label: "Falta uma explicação mais clara", correct: false },
];
const T4_OPTIONS: Option[] = [
  { value: "tecnica", label: "Uma explicação técnica como a um adulto", correct: false },
  { value: "motivo", label: "Um motivo prático e direto", correct: true },
  { value: "niente", label: "Nenhuma resposta, executa-se", correct: false },
];
const T5_OPTIONS: Option[] = [
  { value: "si", label: "Sim — se olhares com atenção, percebes automaticamente o que se está a passar", correct: false },
  { value: "no", label: "Não — olhar é ver que aconteceu algo, compreender é decidir o que significa", correct: true },
];
const T6_OPTIONS: Option[] = [
  { value: "no", label: "Não — ensina sempre algo, muitas vezes o contrário", correct: true },
  { value: "si", label: "Sim, o importante é tentar", correct: false },
];
const T7_OPTIONS: Option[] = [
  { value: "si", label: "Sim, se as respostas estiverem certas", correct: false },
  { value: "no", label: "Não — é sempre precisa pelo menos uma piscina real", correct: true },
];
const T8_OPTIONS: Option[] = [
  { value: "no", label: "Não, os quatro sinais mantêm-se sempre distintos", correct: false },
  { value: "si", label: "Sim — o sinal pode mudar enquanto observas, se a espera se prolongar", correct: true },
];
const T9_OPTIONS: Option[] = [
  { value: "misto", label: "Uma mistura entre esperar o sinal de avanço e o embaraço de um grupo novo que olha", correct: true },
  { value: "dimenticato", label: "Esqueceu-se de como se faz o mergulho", correct: false },
  { value: "acqua", label: "Tem medo da água", correct: false },
];

const DIARY_KEYS = ["q2", "q7", "sim3", "qtrasf", "t10"];

export const capitolo3StepsPtPT: Step[] = [
  // 0 — capa
  {
    day: "início",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 3 · OLHAR E COMPREENDER <i className="ph-duotone ph-trophy" aria-hidden="true" /></div>
        <h1>Parou: tem medo ou não percebeu?</h1>
        <p className="lede">
          Diante de uma criança que para, se bloqueia ou hesita, o instrutor sabe distinguir entre
          quatro causas diferentes — e sabe que a cada uma responde de forma diferente.
        </p>
        <div className="card warn">
          <strong>Padrão mais alto.</strong> Cada competência deste curso passa por uma escala de
          níveis, por ordem: <strong>EM DESENVOLVIMENTO → ADQUIRIDA → CONSOLIDADA → EXCELENTE</strong> —
          mas só para duas, assinaladas com o símbolo <i className="ph-duotone ph-trophy" aria-hidden="true" />, o curso pede para ires mais além: até{" "}
          <strong>EXCELENTE</strong>. Esta (Olhar e compreender) e o Capítulo 6 (Verificar com a
          ação) são as duas competências da escuta: aqui não basta ADQUIRIDA, é preciso EXCELENTE
          antes do exame final — e a simulação sozinha nunca basta: é sempre precisa pelo menos uma
          piscina real.
        </div>
      </>
    ),
  },

  // 1 — segunda-feira: reflexão + consolidação Capítulo 2
  {
    day: "segunda-feira · 10 min",
    pct: 10,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Segunda-feira</div>
        <h1>Como correu na piscina?</h1>
        <p className="lede">
          Na semana passada o Capítulo 2 pediu-te só uma coisa: escolher um aluno e perceber a sua
          faixa pela forma como te respondia, não pela idade. Conta em duas linhas o que reparaste.
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidação — o Capítulo 2 volta</h2>
        <p className="prompt">1. O Marco (5a) e a Elena (13a) não entram na água sozinhos. Mesma frase para os dois?</p>
        <OptionGroup name="k1" options={K1_OPTIONS} selected={answers.k1} onPick={(v, correct) => setResponse("k1", v, correct)} />
        <p className="prompt">2. Um jovem de 15 anos pergunta: «porque é que tenho de fazer justamente este exercício?». Respondes:</p>
        <OptionGroup name="k2" options={K2_OPTIONS} selected={answers.k2} onPick={(v, correct) => setResponse("k2", v, correct)} />
        <p className="prompt">3. A faixa etária reconhece-se melhor pela forma como responde ou pelo cartão de cidadão?</p>
        <OptionGroup name="k3" options={K3_OPTIONS} selected={answers.k3} onPick={(v, correct) => setResponse("k3", v, correct)} />
        <p className="prompt">4. Uma criança de 10 anos comporta-se como uma de 12 — procura privacidade antes de ser corrigida. O que fazes?</p>
        <OptionGroup name="k4" options={K4_OPTIONS} selected={answers.k4} onPick={(v, correct) => setResponse("k4", v, correct)} />
        <p className="prompt">5. Um jovem de 13 anos, sozinho contigo sem o grupo, comporta-se mais aberto do que o habitual. É uma contradição?</p>
        <OptionGroup name="k5" options={K5_OPTIONS} selected={answers.k5} onPick={(v, correct) => setResponse("k5", v, correct)} />
        <p className="prompt">6. Tratar uma criança de 7 anos com uma longa explicação técnica, como um adulto, funciona?</p>
        <OptionGroup name="k6" options={K6_OPTIONS} selected={answers.k6} onPick={(v, correct) => setResponse("k6", v, correct)} />
      </>
    ),
  },

  // 2 — terça-feira: as quatro causas
  {
    day: "terça-feira · 14 min",
    pct: 28,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3 && !!a.m4,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Terça-feira</div>
        <h1>Olhar e compreender não são a mesma coisa</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Esta semana aprendes a fazer duas coisas que parecem uma só, e não são: olhar, e
          compreender o que olhas.
        </p>
        <p className="lede">
          Uma criança para na berma da piscina, um instante antes do mergulho que já fez dez vezes.{" "}
          <strong>Olhar</strong> é ver que parou — vê-o toda a gente. <strong>Compreender</strong> é
          a parte difícil: essa pausa pode querer dizer quatro coisas diferentes.
        </p>
        <div className="table-wrap">
          <table className="cause">
            <tbody>
              <tr>
                <th>Tem...</th>
                <th>E o sinal é...</th>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-waves" aria-hidden="true" /> Medo</td>
                <td>O corpo enrijece, os olhos ficam fixos na água, não em ti</td>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-question" aria-hidden="true" /> Não percebeu</td>
                <td>Olha para ti, com hesitação — espera um sinal que não chega</td>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-snowflake" aria-hidden="true" /> Frio</td>
                <td>Os braços apertam-se ao corpo, talvez treme um pouco — nenhuma rigidez, nenhuma procura do teu olhar</td>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-eye" aria-hidden="true" /> Espera o sinal de avanço</td>
                <td>Procura-te com os olhos antes de se mexer — precisa do teu sinal</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card quote">
          Se respondes com a coisa errada, essa criança aprende na mesma alguma coisa — só que não
          é o que lhe querias ensinar.
        </div>
        <p className="lede">
          <strong>
            Uma última coisa, antes de avançar: complica a tabela de propósito, como já a faixa
            etária no capítulo anterior.
          </strong>{" "}
          Uma criança não fica parada numa fotografia: o sinal pode mudar enquanto a observas,
          sobretudo se esperares demasiado antes de responder. Uma criança que ao início só espera
          o teu sinal de avanço — olhos em ti, corpo tranquilo — pode mudar se esperares demasiado
          a responder. O silêncio longo torna-se ele próprio um sinal: parece-lhe que algo não está
          bem. E assim aquilo que era «espera o sinal de avanço» começa a tornar-se medo a sério.
          Observar não é tirar uma fotografia uma única vez: é continuar a olhar mesmo depois de
          teres decidido uma resposta.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controlo de fim de dia</h2>
        <p className="prompt">1. Ombros apertados, ligeiro tremor, nenhuma procura do teu olhar.</p>
        <OptionGroup name="m1" options={M1_OPTIONS} selected={answers.m1} onPick={(v, correct) => setResponse("m1", v, correct)} />
        <p className="prompt">2. Procura-te com os olhos antes de se mexer, corpo não tenso.</p>
        <OptionGroup name="m2" options={M2_OPTIONS} selected={answers.m2} onPick={(v, correct) => setResponse("m2", v, correct)} />
        <p className="prompt">
          3. Acabaste de mostrar um exercício novo, nunca feito antes. A criança entra na água,
          para a meio, olha para ti — não está a esperar um aceno para continuar: parece mesmo não
          saber o que fazer agora.
        </p>
        <OptionGroup name="m3" options={M3_OPTIONS} selected={answers.m3} onPick={(v, correct) => setResponse("m3", v, correct)} />
        <p className="prompt">
          4. Uma criança que está só à espera do teu sinal de avanço pode, se esperares demasiado a
          responder-lhe, começar a mostrar sinais de medo a sério?
        </p>
        <OptionGroup name="m4" options={M4_OPTIONS} selected={answers.m4} onPick={(v, correct) => setResponse("m4", v, correct)} />
      </>
    ),
  },

  // 3 — quarta-feira: cinco crianças, cinco leituras + simulação Luca (três trocas)
  {
    day: "quarta-feira",
    pct: 44,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => {
      if (!a.sim1) return false;
      if (!a.sim2) return false;
      const path = simPath(a);
      if (path === "aperta") return !!a.sim3;
      return true;
    },
    render: ({ answers, setResponse, setReflection }: StepContext) => {
      const promptStyle = {
        fontSize: ".8rem",
        textTransform: "uppercase" as const,
        letterSpacing: ".03em",
        color: "var(--surface)",
        fontFamily: "var(--mono)",
        fontWeight: 700,
      };
      const sim2Options = answers.sim1 === "diretto" ? SIM2_OPTIONS_DIRETTO : SIM2_OPTIONS_CURIOSO;
      const path = answers.sim1 && answers.sim2 ? simPath(answers) : null;

      return (
        <>
          <div className="eyebrow">Quarta-feira</div>
          <h1>Cinco crianças, cinco leituras</h1>
          <div className="card scene">
            <div className="who">Sofia, 4 anos</div>
            <p>
              Pé na água até ao tornozelo, parada. Ombros para cima, apertados; olhos fixos na
              água, não te procura. É medo, não incompreensão. O instrutor põe-se ao lado, estende
              a mão: «vem, eu seguro-te.»
            </p>
          </div>
          <div className="card scene">
            <div className="who">Leo, 6 anos</div>
            <p>
              Acabou de ver o instrutor a mostrar duas vezes um exercício novo, nunca feito antes.
              Entra na água e para logo, corpo tranquilo, sem tremores. Olha para o instrutor — mas
              não com o olhar de quem espera um aceno: está à procura de algo que não encontra. Não
              percebeu, não precisa de um aceno: o instrutor refaz a sequência uma única vez, mais
              devagar, isolando só os braços. O Leo repete-a logo, sem voltar a parar.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Giada, 8 anos</div>
            <p>
              Braços apertados à volta do corpo, ombros curvados, um ligeiro tremor nas mãos. Não
              procura o olhar do instrutor, não tem os olhos fixos e assustados. É só frio. Trinta
              segundos de movimento em seco na berma, antes de a fazer entrar.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Nadia, 12 anos</div>
            <p>
              Tem de refazer um mergulho que já lhe saiu bem, mas hoje o grupo é diferente do
              habitual — alguns jovens mais velhos, chegados para uma substituição. Para na berma:
              não treme, o corpo não está tenso, mas procura o olhar do instrutor duas, três vezes,
              sem dizer nada. Não é medo do mergulho: isso já sabe fazer. E também não é só
              «espera o sinal de avanço». Há também o embaraço pelo grupo novo — o mesmo de que
              falava o Capítulo 2 para esta idade. O instrutor não diz nada em voz alta: faz-lhe só
              um pequeno aceno, o mesmo que lhe faria se o grupo fosse o habitual. A Nadia mergulha.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Matteo, 14 anos</div>
            <p>
              Parado no bloco de partida, o grupo olha para ele. O corpo está tenso de outra
              maneira, os olhos procuram o instrutor por um instante. Não é a água: é a fila que
              olha para ele. O instrutor baixa a voz, só para ele: «dá-te um segundo, eu espero.»
            </p>
          </div>
          <p className="lede">
            <strong>
              Mesma pausa, cinco crianças, cinco leituras diferentes — todas certas, precisamente
              porque diferentes.
            </strong>{" "}
            Com a Nadia, como com o Matteo, o aceno silencioso funcionou melhor do que qualquer
            frase. Com o Leo, pelo contrário, um aceno não teria servido de nada: faltava a
            explicação, não a permissão.
          </p>
          <p className="prompt">
            Criança de 7 anos, parada a meio da travessia a bruços. Não sabes se tem medo, se não se
            lembra do movimento, ou se espera um sinal teu. O que lhe dizes — ou o que lhe perguntas
            — para compreender, ANTES de lhe dares uma instrução nova?
          </p>
          <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
          {/* Nota para a correção, não mostrada ao instrutor: não existe uma única resposta
              certa. O sistema procura uma coisa — que esteja a perguntar, não a supor. Uma
              instrução direta fecha a informação, seja qual for a causa verdadeira. */}
          <h2>Simulação — três trocas para levar o Luca à água</h2>
          <p className="lede">
            <strong>LUCA, 9 anos.</strong> À beira da piscina, um pé dentro, não entra. O grupo
            espera.
          </p>
          <p className="prompt" style={promptStyle}>Primeira troca</p>
          <p className="lede">O que lhe dizes primeiro?</p>
          <OptionGroup name="sim1" options={SIM1_OPTIONS} selected={answers.sim1} onPick={(v) => setResponse("sim1", v)} />
          {answers.sim1 === "diretto" && (
            <div className="feedback retry">
              LUCA: <em>(afasta-se meio passo, o pé sai da água)</em> «...mas eu não quero.»
              <br />
              Uma instrução direta fechou a informação de que precisavas, seja qual fosse a causa
              verdadeira.
            </div>
          )}
          {answers.sim1 === "curioso" && (
            <div className="feedback ok">
              LUCA: <em>(aponta para os braços, aperta-se um pouco)</em> «...tenho arrepios.»
              <br />
              Uma pergunta aberta deu-te a informação: é frio, não medo. O Luca abre-se em vez de
              se fechar.
            </div>
          )}

          {answers.sim1 && (
            <>
              <p className="prompt" style={promptStyle}>Segunda troca</p>
              {answers.sim1 === "diretto" ? (
                <p className="lede">
                  O grupo continua à espera, e o Luca está agora mais longe da berma. O que lhe
                  dizes agora?
                </p>
              ) : (
                <p className="lede">
                  Continua com frio, e o grupo espera. O que fazes agora — não só o que dizes?
                </p>
              )}
              <OptionGroup name="sim2" options={sim2Options} selected={answers.sim2} onPick={(v) => setResponse("sim2", v)} />
              {answers.sim2 === "insisti" && (
                <div className="feedback retry">
                  LUCA afasta-se mais um passo, não responde mais — fica calado, olha para outro
                  lado.
                </div>
              )}
              {answers.sim2 === "calma" && (
                <div className="feedback ok">
                  LUCA: «...não sei, não me apetece e pronto.»{" "}
                  <em>(para, não se afasta mais — não é uma informação clara, mas o contacto voltou)</em>
                </div>
              )}
              {answers.sim2 === "entra" && (
                <div className="feedback retry">
                  LUCA hesita ainda mais, aperta-se mais — não se sente acreditado, e agora tem
                  ainda menos vontade de entrar do que antes.
                </div>
              )}
              {answers.sim2 === "scalda" && (
                <div className="feedback ok">
                  LUCA aquece, aperta-se um pouco menos, e começa a aproximar-se da berma sozinho,
                  sem que tenhas de lhe dizer outra vez.
                </div>
              )}
            </>
          )}

          {path === "aperta" && (
            <>
              <p className="prompt" style={promptStyle}>Terceira troca — o fecho</p>
              <p className="lede">
                O Luca está agora perto da berma, ainda um pouco hesitante mas não fechado. Escreve
                a última coisa que lhe dizes antes de ele entrar.
              </p>
              <Field id="sim3" value={answers.sim3 ?? ""} onChange={(v) => setReflection("sim3", v)} />
              <p className="lede" style={{ fontSize: ".85rem" }}>Qualquer resposta razoável fecha bem a cena.</p>
              <div className="feedback ok" style={{ marginTop: 10 }}>
                LUCA entra, um pé de cada vez, mas entra. Não ganhaste nada — só compreendeste, em
                vez de adivinhar.
              </div>
            </>
          )}
          {path === "chiusa" && (
            <>
              <p className="prompt" style={promptStyle}>A cena fecha-se aqui — não hoje</p>
              <div className="feedback retry">
                O grupo, entretanto, avançou sem o Luca. O Luca fica na berma, calado. Não é um
                fracasso: é uma informação. Seja o que fosse, hoje não a encontraste a tempo. O que
                conta é o que fazes da próxima vez que ele parar — não o que aconteceu desta vez.
              </div>
            </>
          )}
        </>
      );
    },
  },

  // 4 — quarta-feira à noite: transferência
  {
    day: "quarta-feira à noite",
    pct: 58,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controlo de fim de dia — transferência</div>
        <h1>Uma cena nunca vista</h1>
        <p className="lede">
          Uma criança de 10 anos para a meio de um exercício. Olha em frente, não treme, não te
          procura com os olhos — mas a respiração está mais curta do que o habitual.
        </p>
        <p className="prompt">Qual causa te parece mais provável, e porquê? Escreve o teu raciocínio, não só a resposta.</p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: não está na tabela de forma direta —
            é intencional: muitas vezes é cansaço, um caso que se parece com todas as quatro causas
            e não é exatamente nenhuma. O sistema verifica se ainda está a observar, não se tem a
            resposta exata. */}
      </>
    ),
  },

  // 5 — na piscina
  {
    day: "na piscina",
    pct: 66,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> O teu turno na piscina</div>
        <h1>Para tu primeiro, por um segundo</h1>
        <p className="lede">
          À primeira criança que parar ou hesitar, antes de dizeres o que quer que seja: para tu
          primeiro, por um segundo, e decide qual das quatro causas te parece mais provável. Depois
          responde a essa, não à primeira frase que te vier à cabeça.
        </p>
        <p className="lede" style={{ fontStyle: "italic" }}>Não é preciso acertar. É preciso ter feito a pergunta antes de falar.</p>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Se não tiveres um turno esta semana: o capítulo desbloqueia-se na mesma com uma
          simulação reforçada — mas não chega para levar esta competência a EXCELENTE. Para isso é
          preciso, mais cedo ou mais tarde, uma piscina real.
        </p>
      </>
    ),
  },

  // 6 — sexta-feira: teste cumulativo
  {
    day: "sexta-feira · 11 min",
    pct: 86,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Sexta-feira — teste cumulativo: Capítulo 2 + Capítulo 3</div>
        <h1>O teste</h1>
        <p className="prompt">
          1. Uma criança de 12 anos bloqueia-se antes de um mergulho já feito. Não olha para ti,
          fixa a água, ombros tensos para cima.
        </p>
        <OptionGroup name="t1" options={T1_OPTIONS} selected={answers.t1} onPick={(v, correct) => setResponse("t1", v, correct)} />
        <p className="prompt">2. Uma menina de 5 anos para e procura-te com os olhos, sem tensão no corpo.</p>
        <OptionGroup name="t2" options={T2_OPTIONS} selected={answers.t2} onPick={(v, correct) => setResponse("t2", v, correct)} />
        <p className="prompt">3. Treme ligeiramente, braços apertados ao corpo, mas não procura o teu olhar e não tem os ombros rígidos.</p>
        <OptionGroup name="t3" options={T3_OPTIONS} selected={answers.t3} onPick={(v, correct) => setResponse("t3", v, correct)} />
        <p className="prompt">
          4. <em>(do Capítulo 2)</em> Um jovem de 16 anos pergunta o porquê de um exercício. A
          resposta certa para a sua faixa etária é:
        </p>
        <OptionGroup name="t4" options={T4_OPTIONS} selected={answers.t4} onPick={(v, correct) => setResponse("t4", v, correct)} />
        <p className="prompt">5. Olhar e compreender são a mesma coisa?</p>
        <OptionGroup name="t5" options={T5_OPTIONS} selected={answers.t5} onPick={(v, correct) => setResponse("t5", v, correct)} />
        <p className="prompt">6. Responder à causa errada é um erro neutro?</p>
        <OptionGroup name="t6" options={T6_OPTIONS} selected={answers.t6} onPick={(v, correct) => setResponse("t6", v, correct)} />
        <p className="prompt">7. Para esta competência, uma boa simulação basta para EXCELENTE?</p>
        <OptionGroup name="t7" options={T7_OPTIONS} selected={answers.t7} onPick={(v, correct) => setResponse("t7", v, correct)} />
        <p className="prompt">
          8. Uma criança que está só à espera do teu sinal de avanço pode, se esperares demasiado a
          responder, começar a mostrar sinais de medo a sério?
        </p>
        <OptionGroup name="t8" options={T8_OPTIONS} selected={answers.t8} onPick={(v, correct) => setResponse("t8", v, correct)} />
        <p className="prompt">
          9. A Nadia, 12 anos, hesita diante de um mergulho que já sabe fazer, porque o grupo nesse
          dia é diferente do habitual. O que está por trás, mais provavelmente?
        </p>
        <OptionGroup name="t9" options={T9_OPTIONS} selected={answers.t9} onPick={(v, correct) => setResponse("t9", v, correct)} />
        <p className="prompt">
          10. Uma criança de 8 anos executa um exercício incorreto pela terceira vez seguida,
          sempre da mesma forma. O que observas, e o que começas a suspeitar?
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 7 — feedback: explica como funciona a correção (§10, D34)
  {
    day: "sexta-feira · feedback",
    pct: 88,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§10 · Feedback</div>
        <h1>Eis o que dizem as tuas respostas</h1>
        <p className="lede">Não sobre ti — sobre o que fizeste nestas perguntas.</p>
        <p className="lede" style={{ fontSize: ".85rem", fontStyle: "italic" }}>
          Exemplo de feedback gerado, em caso de erro na pergunta 2:
        </p>
        <div className="card quote">
          Na pergunta 2 respondeste «tem medo». Relê o sinal: nenhuma tensão no corpo, só o olhar
          que te procura. O medo normalmente vê-se no corpo antes de nos olhos. Quando o olhar só
          procura o teu, muitas vezes é só o sinal de avanço que falta — tenta oferecê-lo antes de
          oferecer tranquilidade.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          O feedback nunca diz só «erraste»: diz o que observar para a próxima vez. O tom é sempre
          sobre o comportamento observado, nunca sobre a pessoa (vê o Capítulo 7, que retoma
          exatamente esta regra).
        </p>
      </>
    ),
  },

  // 8 — recuperação: só se o teste de sexta-feira teve demasiados erros (§12, D25/D27)
  {
    day: "recuperação",
    pct: 90,
    nextLabel: "Continuar ▸",
    showBack: true,
    visible: (a) => {
      const corretas: Record<string, string> = {
        t1: "paura", t2: "via", t3: "calore", t4: "motivo", t5: "no",
        t6: "no", t7: "no", t8: "si", t9: "misto",
      };
      const erradas = Object.entries(corretas).filter(([k, v]) => a[k] !== v).length;
      return erradas >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperação — só porque o teste encontrou alguma dificuldade</div>
        <h1>Mais dois sinais, para não os confundires</h1>
        <p className="lede">
          Não é um fracasso: é só o sinal de que vale a pena rever os dois sinais mais parecidos
          deste capítulo — frio e espera o sinal de avanço — com mais um exemplo cada.
        </p>

        <div className="card scene">
          <div className="who">Samuele, 6 anos</div>
          <p>
            Parado na berma, braços apertados à volta do corpo, um ligeiro tremor nas mãos. Não
            procura o olhar do instrutor — olha distraído para a água, não para ele.
          </p>
        </div>
        <p className="prompt">O que lhe falta mais provavelmente?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "via", label: "O sinal de avanço — está à espera de um aceno", correct: false },
            {
              value: "freddo",
              label: "Calor — nenhuma procura do olhar, só o corpo que se aperta: é frio",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Bianca, 9 anos</div>
          <p>
            Parada na berma, corpo relaxado, sem tremores. Antes de pôr um pé na água, procura-te
            com os olhos duas vezes, sem dizer nada, como se esperasse um aceno teu.
          </p>
        </div>
        <p className="prompt">O que lhe falta mais provavelmente?</p>
        <OptionGroup
          name="rec2"
          options={[
            {
              value: "via",
              label: "O teu sinal de avanço — o corpo está tranquilo, procura só o teu aceno",
              correct: true,
            },
            { value: "freddo", label: "Calor — provavelmente tem frio", correct: false },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          O modo mais rápido de os distinguir: quem tem frio aperta-se e não te procura; quem
          espera o sinal de avanço fica tranquilo e procura-te com os olhos. Olha sobretudo para
          aí.
        </p>
      </>
    ),
  },

  // 9 — sexta-feira: resultado
  {
    day: "sexta-feira · resultado",
    pct: 95,
    nextLabel: "Ir para o Painel ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§11 · Resultado</div>
        <h1>O teu perfil atualiza-se</h1>
        <div className="card">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".86rem" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>Pontuação</th>
                <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>De onde nasce</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>knowledge_score</td>
                <td style={{ padding: "6px 0" }}>As 10 perguntas do teste</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>application_score</td>
                <td style={{ padding: "6px 0" }}>A frase que escreveste no §7</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Como levaste o Luca à água no §8, nas três trocas</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>O relato de segunda-feira sobre o Capítulo 2</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>transfer_score</td>
                <td style={{ padding: "6px 0" }}>A mesma reflexão, sobre a transferência real</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Observar e interpretar</td>
                <td style={{ padding: "6px 0" }}>O mais baixo dos anteriores fixa o teto</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Para esta competência específica: mesmo chegando a ADQUIRIDA ou CONSOLIDADA, o estado
          EXCELENTE não acontece sem pelo menos uma piscina real contada e verificada. Hoje fica em
          ADQUIRIDA — a piscina real chega com um turno verdadeiro, não com esta simulação.
        </p>
      </>
    ),
  },

  // 10 — painel
  {
    day: "painel",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ vakProfile, answers }: StepContext) => (
      <>
        <div className="done-badge">✓ Capítulo 3 concluído</div>
        <div className="eyebrow">Semana 3 de 10 · Capítulo 4 a chegar</div>
        <h1>A sintonia</h1>
        <p className="lede">
          Aprendeste a ler o que se passa numa criança. Na próxima semana aprendes porque é que,
          mesmo quando leste bem a situação, às vezes ela continua a não te dar ouvidos.
        </p>
        <ChapterVakSection vakProfile={vakProfile} locale="pt-PT" />
        <ChapterDiarySection answers={answers} keys={DIARY_KEYS} locale="pt-PT" />
        <h2>O teu progresso</h2>
        <div className="chip-grid">
          <div className="chip consolidata">
            <span className="name">1 · Consciência pessoal</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip consolidata">
            <span className="name">2 · Reconhecimento do aluno</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip acquisita">
            <span className="name">3 · Observar e interpretar <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">4 · Sintonia</span>
            <span className="state">não adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">5 · Instruções e congruência</span>
            <span className="state">não adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">6 · Verificar com a ação <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">não adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">7 · O regresso</span>
            <span className="state">não adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">8 · Mudar de caminho</span>
            <span className="state">não adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">9 · Situações difíceis</span>
            <span className="state">não adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">10 · Autonomia</span>
            <span className="state">não adquirida</span>
          </div>
        </div>
      </>
    ),
  },
];
