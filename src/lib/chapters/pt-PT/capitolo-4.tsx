import { OptionGroup, type Option } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Tradução em português europeu, não um capítulo independente: mesmos chapterId/chaves de
// resposta/valores internos do capítulo italiano (src/lib/chapters/capitolo-4.tsx) — só muda o
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

const K1_OPTIONS: Option[] = [
  { value: "via", label: "O teu sinal de avanço, antes de se lançar", correct: true },
  { value: "coraggio", label: "Coragem — acredita que não é suficientemente corajoso", correct: false },
];
const K2_OPTIONS: Option[] = [
  { value: "si", label: "Sim — olhar e compreender são praticamente a mesma coisa", correct: false },
  {
    value: "no",
    label: "Não — olhar é ver que aconteceu algo, compreender é decidir o que significa",
    correct: true,
  },
];
const K3_OPTIONS: Option[] = [
  { value: "no", label: "Não — às vezes falta ainda outra coisa, antes", correct: true },
  { value: "si", label: "Sim, necessariamente — se a causa for a certa a criança move-se logo", correct: false },
];
const K4_OPTIONS: Option[] = [
  { value: "si", label: "Sim, uma boa simulação já demonstra que a competência está adquirida", correct: false },
  { value: "no", label: "Não — é sempre precisa pelo menos uma piscina real", correct: true },
];
const K5_OPTIONS: Option[] = [
  { value: "no", label: "Não, os sinais mantêm-se sempre distintos", correct: false },
  {
    value: "si",
    label: "Sim — o sinal pode mudar enquanto observas, se a espera se prolongar",
    correct: true,
  },
];
const K6_OPTIONS: Option[] = [
  {
    value: "misto",
    label: "Uma mistura entre esperar o sinal de avanço e o embaraço de um grupo novo",
    correct: true,
  },
  { value: "dimenticato", label: "Tinha-se esquecido de como se faz o mergulho", correct: false },
];

const M1_OPTIONS: Option[] = [
  { value: "domanda", label: "Fazes-lhe uma pergunta direta para o fazer falar", correct: false },
  { value: "silenzio", label: "Por um momento, ficas parado e em silêncio também tu", correct: true },
];
const M2_OPTIONS: Option[] = [
  {
    value: "tirare",
    label: "Puxar alguém pelo braço que ainda não te está a seguir",
    correct: true,
  },
  { value: "esempio", label: "Dar o bom exemplo, assim ele segue-te quase logo", correct: false },
];
const M3_OPTIONS: Option[] = [
  {
    value: "torni",
    label: "Voltas atrás um passo: encontras o ritmo dele de novo, antes de propores de novo a direção",
    correct: true,
  },
  { value: "insisti", label: "Insistes — até há pouco corria tudo bem", correct: false },
];

const SIM_OPTIONS: Option[] = [
  { value: "diretta", label: "«Noa, queres entrar?»" },
  { value: "silenzio", label: "Sentas-te perto dela em silêncio, espelhando a sua imobilidade" },
];
const SIM2_OPTIONS: Option[] = [
  { value: "minimizza", label: "«Ora, é só água, não te preocupes»" },
  {
    value: "risolvi",
    label: "Propões-lhe uma touca, ou dizes-lhe que pode manter a cabeça fora de água por hoje",
  },
];

const T1_OPTIONS: Option[] = [
  { value: "prima", label: "Antes", correct: true },
  { value: "dopo", label: "Depois", correct: false },
];
const T2_OPTIONS: Option[] = [
  { value: "calma", label: "Dizer-lhe logo para se acalmar", correct: false },
  { value: "asseconda", label: "Acompanhar por um momento a sua energia, depois guiá-la", correct: true },
];
const T3_OPTIONS: Option[] = [
  { value: "no", label: "Não — funciona da mesma forma, ao contrário, com quem se agita", correct: true },
  {
    value: "si",
    label: "Sim — com quem se agita basta acalmá-lo, não acompanhá-lo",
    correct: false,
  },
];
const T4_OPTIONS: Option[] = [
  { value: "capito", label: "Não tenha percebido", correct: false },
  { value: "paura", label: "Tenha medo", correct: true },
];
const T5_OPTIONS: Option[] = [
  { value: "no", label: "Não — serve para criar as condições para que te ouça", correct: true },
  {
    value: "si",
    label: "Sim — é sobretudo uma questão de agradar à criança",
    correct: false,
  },
];
const T6_OPTIONS: Option[] = [
  { value: "si", label: "Sim, se tiveres razão", correct: false },
  { value: "no", label: "Não — mesmo tendo razão, normalmente não funciona", correct: true },
];
const T7_OPTIONS: Option[] = [
  { value: "insisti", label: "Insistir, porque até há pouco funcionava", correct: false },
  {
    value: "torna",
    label: "Voltar atrás um passo e encontrar o ritmo dele de novo, antes de propor de novo a direção",
    correct: true,
  },
];
const T8_OPTIONS: Option[] = [
  { value: "no", label: "Não — a forma muda com a idade, mas a ordem mantém-se igual", correct: true },
  { value: "si", label: "Sim, exatamente da mesma forma", correct: false },
];
const T9_OPTIONS: Option[] = [
  { value: "rassicurato", label: "Sente-se de qualquer forma tranquilizada", correct: false },
  { value: "richiude", label: "Fecha-se de novo — não se sentiu levada a sério", correct: true },
];

const DIARY_KEYS = ["q2", "q7", "q7b", "qtrasf", "t10"];

export const capitolo4StepsPtPT: Step[] = [
  // 0 — capa
  {
    day: "início",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 4 · A SINTONIA</div>
        <h1>Porque é que me havia de dar ouvidos?</h1>
        <p className="lede">
          Diante de uma criança fechada ou silenciosa — ou diante de uma agitada e eufórica — o
          instrutor põe-se ao seu ritmo por um momento antes de lhe pedir seja o que for, em vez de
          a pressionar ou de a apagar logo.
        </p>
      </>
    ),
  },

  // 1 — segunda-feira: reflexão + consolidação Capítulo 3
  {
    day: "segunda-feira · 10 min",
    pct: 12,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Segunda-feira</div>
        <h1>Como correu na piscina?</h1>
        <p className="lede">
          Na semana passada pedi-te que, à primeira criança que parasse ou hesitasse, parasses um
          segundo tu também, e decidisses qual das quatro causas te parecia mais provável. Como
          correu? A leitura foi a certa?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidação — o Capítulo 3 volta</h2>
        <p className="prompt">
          1. Uma criança para, procura-te com os olhos, o corpo não está tenso. O que lhe falta
          mais provavelmente?
        </p>
        <OptionGroup name="k1" options={K1_OPTIONS} selected={answers.k1} onPick={(v, c) => setResponse("k1", v, c)} />
        <p className="prompt">2. Olhar e compreender são a mesma coisa?</p>
        <OptionGroup name="k2" options={K2_OPTIONS} selected={answers.k2} onPick={(v, c) => setResponse("k2", v, c)} />
        <p className="prompt">
          3. Percebeste bem a causa, mas a criança continua a não se mexer. Quer dizer que tinhas
          errado a leitura?
        </p>
        <OptionGroup name="k3" options={K3_OPTIONS} selected={answers.k3} onPick={(v, c) => setResponse("k3", v, c)} />
        <p className="prompt">4. Para a competência do Capítulo 3, uma boa simulação basta para EXCELENTE?</p>
        <OptionGroup name="k4" options={K4_OPTIONS} selected={answers.k4} onPick={(v, c) => setResponse("k4", v, c)} />
        <p className="prompt">
          5. Uma criança que está só à espera do teu sinal de avanço pode, se esperares demasiado,
          começar a mostrar sinais de medo a sério?
        </p>
        <OptionGroup name="k5" options={K5_OPTIONS} selected={answers.k5} onPick={(v, c) => setResponse("k5", v, c)} />
        <p className="prompt">
          6. No exemplo da Nadia, 12 anos, o que estava por trás da sua hesitação diante de um
          grupo diferente do habitual?
        </p>
        <OptionGroup name="k6" options={K6_OPTIONS} selected={answers.k6} onPick={(v, c) => setResponse("k6", v, c)} />
      </>
    ),
  },

  // 2 — terça-feira: explicação + controlo de fim de dia
  {
    day: "terça-feira · 13 min",
    pct: 30,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Terça-feira</div>
        <h1>Primeiro o ritmo dele, depois o teu</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Mesmo quando lês bem a situação, às vezes a criança continua a não te dar ouvidos. Hoje
          aprendes porquê — e o que fazer, ainda antes de falar.
        </p>
        <p className="lede">
          <strong>A sintonia não é ser simpático.</strong> É criar, em poucos segundos, as
          condições para que uma criança esteja disposta a ouvir-te. Sem isso, até a instrução mais
          certa ressalta.
        </p>
        <p className="lede">
          <strong>Primeiro pões-te ao ritmo dela.</strong> Se está parada e silenciosa, por um
          instante ficas parado e silencioso também tu. Se está agitada e eufórica, por um instante
          acompanhas a energia em vez de a apagar com um «acalma-te». Não estás a imitar: estás a
          dizer, com o corpo, «estou aqui contigo, onde tu estás agora».
        </p>
        <p className="lede">
          <strong>Só depois é que a guias.</strong> Depois de ela ter sentido que estás ao seu
          passo, podes propor um pequeno passo na direção que queres.
        </p>
        <div className="card quote">
          Guiar antes de te teres posto ao ritmo dela é como puxar alguém pelo braço que ainda não
          te está a seguir: podes até ter razão, mas não funciona.
        </div>
        <p className="lede">
          Funciona com quem se fecha — e funciona da mesma forma, ao contrário, com quem se
          acende. O primeiro movimento é sempre o mesmo: ir na direção dela, não pedir-lhe que
          venha logo na tua direção.
        </p>
        <p className="lede">
          <strong>Uma última coisa, antes de avançar.</strong> A sintonia não é um interruptor que,
          uma vez ligado, fica ligado durante todo o turno: pode perder-se a meio caminho, e nesse
          caso tem de ser reconstruída, não forçada. Uma criança que te seguiu durante dois
          exercícios pode, no terceiro, fechar-se de novo — talvez esteja cansada, talvez o
          exercício novo a tenha desnorteado. A tentação é insistir («vá lá, corria tudo bem até há
          pouco»), mas é de novo o mesmo erro: estás a tentar guiá-la enquanto ela, neste momento,
          já não te está a seguir. Volta atrás um passo: encontra o ritmo dela de novo, antes de
          propores de novo a direção. Não precisas de recomeçar do zero: só tens de aplicar de novo
          a mesma regra de sempre.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controlo de fim de dia</h2>
        <p className="prompt">1. Uma criança está silenciosa e imóvel. O que fazes primeiro?</p>
        <OptionGroup name="m1" options={M1_OPTIONS} selected={answers.m1} onPick={(v, c) => setResponse("m1", v, c)} />
        <p className="prompt">2. Guiar antes de te teres posto ao ritmo dela é como:</p>
        <OptionGroup name="m2" options={M2_OPTIONS} selected={answers.m2} onPick={(v, c) => setResponse("m2", v, c)} />
        <p className="prompt">
          3. Uma criança que te seguia bem fecha-se de novo a meio do turno, num exercício novo. O
          que fazes?
        </p>
        <OptionGroup name="m3" options={M3_OPTIONS} selected={answers.m3} onPick={(v, c) => setResponse("m3", v, c)} />
      </>
    ),
  },

  // 3 — quarta-feira: cenas + reflexão + simulação com bifurcação
  {
    day: "quarta-feira",
    pct: 48,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "diretta" || !!a.sim2),
    render: ({ answers, setResponse, setReflection }: StepContext) => {
      const simFeedback =
        answers.sim === "diretta" ? (
          <div className="feedback retry">
            NOA: <em>(silêncio, não se mexe)</em>
            <br />
            Uma pergunta direta pediu-lhe para seguir um ritmo que ainda não era o dela.
          </div>
        ) : answers.sim === "silenzio" ? (
          <div className="feedback ok">
            NOA: <em>(ao fim de uns segundos, desvia o olhar para ti)</em> «...tenho medo do
            cabelo molhado.»
            <br />
            Pores-te ao ritmo dela não a «desbloqueou» com magia: deu-lhe o espaço para dizer o que
            realmente se passava.
          </div>
        ) : null;

      const sim2Feedback =
        answers.sim2 === "minimizza" ? (
          <div className="feedback retry">
            NOA fecha-se de novo, volta ao silêncio — tinha arriscado dizer-to, e não foi levada a
            sério.
          </div>
        ) : answers.sim2 === "risolvi" ? (
          <div className="feedback ok">
            NOA: «...está bem, vou tentar assim.» <em>(levanta-se, aproxima-se da berma)</em>
            <br />
            Abrir a porta com a sintonia não basta se, assim que a criança diz o que realmente se
            passa, a voltas a fechar tu com uma resposta genérica. O segundo movimento conta tanto
            como o primeiro.
          </div>
        ) : null;

      return (
        <>
          <div className="eyebrow">Quarta-feira</div>
          <h1>Uma criança fechada, uma agitada, uma adolescente distante</h1>
          <div className="card scene">
            <div className="who">Elia, 6 anos</div>
            <p>
              Primeiro dia com um grupo novo. Não responde, braços cruzados, olhar baixo. O
              instrutor senta-se ao lado dele, em silêncio, durante vinte segundos — mesma
              imobilidade, mesmo silêncio. Depois, devagar: «também a mim às vezes não me apetece
              falar.» Depois: «queres só molhar os pés, por agora?» O Elia não responde por
              palavras. Mas mete os pés na água.
            </p>
            <p>
              Se o instrutor tivesse guiado logo — «vá, vamos, vai ser divertido!» — teria pedido
              ao Elia para seguir um ritmo que ainda não era o dele. Aqueles vinte segundos ao seu
              ritmo não «convenceram» o Elia com um argumento: só lhe fizeram perceber que podia
              ficar onde estava. E a partir daí, um pequeno passo, deu-o ele sozinho.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Diego, 8 anos</div>
            <p>
              Chega à beira da piscina já a mil: salta, fala muito depressa. O instrutor, em vez de
              dizer «acalma-te», por um bocado acompanha-o: acena depressa, faz-lhe uma pergunta
              breve e rápida como o ritmo dele. Só depois, gradualmente, é ele que abranda o ritmo
              da conversa — e o Diego abranda com ele, até estar pronto para a primeira instrução.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Bianca, 15 anos</div>
            <p>
              Chega com a cara fechada, responde aos cumprimentos com um aceno mal esboçado, braços
              cruzados — não está fechada como o Elia, é o distanciamento de adolescente que não
              tem vontade de estar ali hoje. O instrutor não se senta ao lado dela em silêncio, aos
              15 anos seria estranho: fala-lhe pouco, com o mesmo tom seco dela — «ok, dia
              pesado?» A Bianca responde com um «...mais ou menos», mas já é alguma coisa: deixou
              que o instrutor a alcançasse, até onde ela estava disposta a abrir-se — nem mais. Só
              nessa altura chega o exercício, com um tom normal — nada de entusiasmo falso, que não
              faria sentido com o humor dela.
            </p>
          </div>
          <p className="lede">
            <strong>
              Uma criança fechada, uma agitada, uma adolescente distante — a forma muda, a ordem
              não: primeiro o ritmo dela, só depois o teu.
            </strong>
          </p>
          <p className="prompt">
            Uma criança de 8 anos chega à beira da piscina já muito agitada, fala depressa, não
            fica parada um segundo. O que fazes — ou dizes — nos primeiros trinta segundos, ANTES
            de lhe dares seja que instrução for?
          </p>
          <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
          {/* Nota para a correção, não mostrada ao instrutor: o sistema procura se está a
              acompanhar a energia por um momento antes de a baixar — não se a apaga logo com um
              «acalma-te». */}
          <h2>Simulação</h2>
          <p className="lede">
            <strong>NOA, 7 anos.</strong> Beira da piscina, silenciosa, não responde a perguntas
            diretas. O que fazes ou dizes primeiro?
          </p>
          <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
          {simFeedback}
          {answers.sim === "silenzio" && (
            <div>
              <p className="lede" style={{ marginTop: 14 }}>
                A cena continua. Agora que a Noa disse qual é o problema verdadeiro, é a tua vez de
                responder a <em>isso</em>.
              </p>
              <p className="prompt">Escreve o que lhe dizes ou propões agora.</p>
              <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
              <OptionGroup
                name="sim2"
                options={SIM2_OPTIONS}
                selected={answers.sim2}
                onPick={(v) => setResponse("sim2", v)}
              />
              {sim2Feedback}
            </div>
          )}
        </>
      );
    },
  },

  // 4 — quarta-feira à noite: controlo de fim de dia (transferência)
  {
    day: "quarta-feira à noite",
    pct: 62,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controlo de fim de dia — transferência</div>
        <h1>Uma cena diferente da de ontem</h1>
        <p className="lede">
          Uma criança de 10 anos chega a rir alto, empurra de brincadeira um colega, não consegue
          ficar parada na fila. Não parece zangada nem assustada: parece só cheia de energia.
        </p>
        <p className="prompt">
          Como abres o contacto com ela, ANTES de lhe pedires para se pôr na fila e ficar parada?
          Escreve o teu raciocínio, não só o movimento.
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: o sistema procura se reconhece isto
            como um caso de «agitado/eufórico» — acompanhar por um momento a sua energia, não
            pedir-lhe logo para se acalmar. */}
      </>
    ),
  },

  // 5 — na piscina
  {
    day: "na piscina",
    pct: 68,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> O teu turno na piscina</div>
        <h1>Um minuto ao ritmo dela</h1>
        <p className="lede">
          Esta semana, com a criança mais fechada — ou mais agitada — do grupo: põe-te ao seu ritmo
          durante um minuto antes de lhe pedires seja o que for. Parado se ela estiver parada,
          silencioso se estiver silenciosa; rápido se estiver rápida, aceso se estiver aceso. Só
          depois, propõe um passo pequeno.
        </p>
      </>
    ),
  },

  // 6 — sexta-feira: teste cumulativo
  {
    day: "sexta-feira · 11 min",
    pct: 85,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Sexta-feira — teste cumulativo: Capítulo 3 + Capítulo 4</div>
        <h1>O teste</h1>
        <p className="prompt">1. Pôr-se ao ritmo da criança vem antes ou depois de a guiar?</p>
        <OptionGroup name="t1" options={T1_OPTIONS} selected={answers.t1} onPick={(v, c) => setResponse("t1", v, c)} />
        <p className="prompt">2. Uma criança está eufórica e agitada. O primeiro movimento certo é:</p>
        <OptionGroup name="t2" options={T2_OPTIONS} selected={answers.t2} onPick={(v, c) => setResponse("t2", v, c)} />
        <p className="prompt">3. Pôr-se ao ritmo da criança funciona só com quem se fecha?</p>
        <OptionGroup name="t3" options={T3_OPTIONS} selected={answers.t3} onPick={(v, c) => setResponse("t3", v, c)} />
        <p className="prompt">
          4. <em>(do Capítulo 3)</em> Uma criança bloqueia-se, ombros tensos, olhar fixo na água. É
          mais provável que:
        </p>
        <OptionGroup name="t4" options={T4_OPTIONS} selected={answers.t4} onPick={(v, c) => setResponse("t4", v, c)} />
        <p className="prompt">5. A sintonia serve para seres simpático com a criança?</p>
        <OptionGroup name="t5" options={T5_OPTIONS} selected={answers.t5} onPick={(v, c) => setResponse("t5", v, c)} />
        <p className="prompt">6. Guiar antes de te teres posto ao ritmo dela costuma funcionar?</p>
        <OptionGroup name="t6" options={T6_OPTIONS} selected={answers.t6} onPick={(v, c) => setResponse("t6", v, c)} />
        <p className="prompt">
          7. Uma criança que te seguia bem fecha-se de novo a meio do turno. A coisa certa é:
        </p>
        <OptionGroup name="t7" options={T7_OPTIONS} selected={answers.t7} onPick={(v, c) => setResponse("t7", v, c)} />
        <p className="prompt">
          8. Com uma adolescente distante, a sintonia constrói-se da mesma forma que com uma
          criança de 6 anos?
        </p>
        <OptionGroup name="t8" options={T8_OPTIONS} selected={answers.t8} onPick={(v, c) => setResponse("t8", v, c)} />
        <p className="prompt">
          9. Uma criança revela qual é o seu medo verdadeiro, depois de te teres posto ao seu
          ritmo. Se respondes de forma genérica ou minimizas, o que costuma acontecer?
        </p>
        <OptionGroup name="t9" options={T9_OPTIONS} selected={answers.t9} onPick={(v, c) => setResponse("t9", v, c)} />
        <p className="prompt">
          10. Um jovem de 13 anos chega à beira da piscina em silêncio, sem cumprimentar ninguém.
          Escreve em duas linhas o que fazes nos primeiros dez segundos.
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 7 — feedback: explica como funciona a correção (§10, D34)
  {
    day: "sexta-feira · feedback",
    pct: 87,
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
          Respondeste que era para a acalmar logo. Mas um «acalma-te» dito a quem já está
          exaltado raramente funciona — porque não a alcançaste onde ela está, só lhe pediste para
          se deslocar sozinha. Acompanhar primeiro, mesmo que só por poucos segundos, abre a porta
          que depois podes fechar tu.
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
        t1: "prima", t2: "asseconda", t3: "no", t4: "paura", t5: "no",
        t6: "no", t7: "torna", t8: "no", t9: "richiude",
      };
      const erradas = Object.entries(corretas).filter(([k, v]) => a[k] !== v).length;
      return erradas >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperação — só porque o teste encontrou alguma dificuldade</div>
        <h1>Mais três cenas, para treinar a ordem</h1>
        <p className="lede">
          Não é um fracasso: é só o sinal de que vale a pena rever o ponto mais delicado deste
          capítulo com mais alguns exemplos — primeiro o ritmo dela, só depois o teu.
        </p>

        <div className="card scene">
          <div className="who">Samuele, 9 anos</div>
          <p>
            Primeiro dia com o grupo. Sentado na berma, pernas fora de água, braços cruzados, não
            responde a quem o cumprimenta.
          </p>
        </div>
        <p className="prompt">O que fazes primeiro?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "gioco", label: "Propões-lhe logo um jogo para quebrar o gelo", correct: false },
            {
              value: "silenzio",
              label: "Sentas-te perto dele, em silêncio, por um momento, antes de propor seja o que for",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Greta, 7 anos</div>
          <p>
            Chega à beira da piscina a saltitar, conta o fim de semana em catadupa sem acabar uma
            frase, não fica parada um segundo.
          </p>
        </div>
        <p className="prompt">O que fazes primeiro, antes de lhe dares a primeira instrução?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "calma", label: "Dizes-lhe para se acalmar, assim podes começar o exercício", correct: false },
            {
              value: "asseconda",
              label: "Por um momento acompanhas o ritmo dela — acenas depressa, uma pergunta breve na mesma energia",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Uma criança que te seguia bem</div>
          <p>
            Seguiu sem problemas os dois primeiros exercícios. No terceiro — novo, nunca feito
            antes — bloqueia-se de novo, fechada como no início do turno.
          </p>
        </div>
        <p className="prompt">O que fazes?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "insisti", label: "Insistes — até há pouco seguia-te, continuas pelo mesmo caminho", correct: false },
            {
              value: "torna",
              label: "Voltas atrás um passo: encontras o ritmo dela de novo, antes de propores de novo a direção",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Fechada, agitada, ou já a caminho e depois parada de novo — a forma muda, nunca a ordem:
          primeiro pões-te ao ritmo dela, só depois a guias.
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
                <td style={{ padding: "6px 0" }}>A resposta no §7</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Como alcançaste a Noa no §8, nas duas trocas</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>O relato de segunda-feira sobre o Capítulo 3</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Sintonia</td>
                <td style={{ padding: "6px 0" }}>O mais baixo dos anteriores</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
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
        <div className="done-badge">✓ Capítulo 4 concluído</div>
        <div className="eyebrow">Semana 4 de 10 · Capítulo 5 a chegar</div>
        <h1>A mensagem e a instrução</h1>
        <p className="lede">
          Hoje aprendeste a abrir a porta. Na próxima semana aprendes o que dizer, uma vez que está
          aberta — e porque é que as palavras, a voz e o corpo têm de dizer a mesma coisa.
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
          <div className="chip consolidata">
            <span className="name">3 · Observar e interpretar <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip acquisita">
            <span className="name">4 · Sintonia</span>
            <span className="state">adquirida</span>
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
