import { OptionGroup, type Option } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Tradução para o português brasileiro, não um capítulo independente: mesmos chapterId/chaves
// de resposta/valores internos do capítulo italiano (src/lib/chapters/capitolo-10.tsx) — só o
// texto visível muda. Último capítulo do curso: tem um passo final a mais (9 — "fechamento"),
// com .exam-badge, antes da prova final.

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

const SIM_OPTIONS: Option[] = [
  { value: "correggi", label: "Você dá a ela uma correção técnica de qualquer jeito, por hábito" },
  { value: "chiedi", label: "Você pergunta o que ela acha, primeiro" },
];

const SIM2_OPTIONS: Option[] = [
  { value: "ancora", label: "Você ainda responde «o que você acha?», como no exercício anterior" },
  { value: "indica", label: "Você dá a ela uma indicação técnica, porque é um exercício novo, ainda não consolidado" },
];

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10","qchiusura"];

export const capitolo10StepsPtBR: Step[] = [
  // 0 — capa
  {
    day: "início",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 10 · DEIXAR IR</div>
        <h1>O último capítulo</h1>
        <p className="lede">
          O instrutor reconhece quando um aluno não precisa mais dele em uma coisa específica —
          e aplica a si mesmo a mesma regra que aprendeu a dar às crianças: não existem
          fracassos, só feedback.
        </p>
      </>
    ),
  },

  // 1 — segunda-feira: consolidação Capítulo 9
  {
    day: "segunda-feira · 10 min",
    pct: 10,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Segunda-feira</div>
        <h1>Como foi na piscina?</h1>
        <p className="lede">
          Na semana passada: com quem recusava alguma coisa, procurar a intenção boa antes de
          insistir. Aconteceu de você precisar fazer isso? Como foi?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Reforço — o Capítulo 9 volta</h2>
        <p className="prompt">1. «Não consegue» e «não topa» são o mesmo problema?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "no", label: "Não — um é um problema didático, o outro de relacionamento", correct: true },
            { value: "si", label: "Sim — na prática se resolvem do mesmo jeito", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. Uma criança que recusa precisa, acima de tudo:</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "spiega", label: "De uma explicação mais clara", correct: false },
            { value: "capisce", label: "Que você entenda o que está por trás", correct: true },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">3. Encontrar a intenção boa por trás de uma recusa justifica o comportamento?</p>
        <OptionGroup
          name="k3"
          options={[
            { value: "no", label: "Não — só dá a você uma alavanca diferente para puxar", correct: true },
            { value: "si", label: "Sim — se você entende por que ela faz isso, então tudo bem deixar ela fazer", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">4. A recusa é sempre barulhenta, em voz alta?</p>
        <OptionGroup
          name="k4"
          options={[
            { value: "si", label: "Sim — senão você nem notaria", correct: false },
            { value: "no", label: "Não — também pode ser um retrair-se silencioso", correct: true },
          ]}
          selected={answers.k4}
          onPick={(v, correct) => setResponse("k4", v, correct)}
        />
        <p className="prompt">
          5. Se até uma segunda proposta for recusada, a coisa certa é continuar procurando
          outras para sempre?
        </p>
        <OptionGroup
          name="k5"
          options={[
            { value: "no", label: "Não — depois de uma segunda tentativa de verdade, tudo bem parar com calma", correct: true },
            { value: "si", label: "Sim, até encontrar a certa", correct: false },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. Uma recusa silenciosa — braços cruzados, nenhuma palavra — pode simplesmente
          esconder cansaço, não desafio?
        </p>
        <OptionGroup
          name="k6"
          options={[
            { value: "si", label: "Sim — às vezes não é oposição, só cansaço que ela ainda não sabe dizer com palavras", correct: true },
            { value: "no", label: "Não, é sempre birra", correct: false },
          ]}
          selected={answers.k6}
          onPick={(v, correct) => setResponse("k6", v, correct)}
        />
      </>
    ),
  },

  // 2 — terça-feira: saber quando parar de ser necessário
  {
    day: "terça-feira · 15 min",
    pct: 20,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3 && !!a.m4,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Terça-feira</div>
        <h1>Saber quando parar de ser necessário</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Você aprendeu a ler, entrar em sintonia, comunicar, verificar, corrigir, mudar de
          rumo, lidar com a recusa. A última competência é a mais difícil de todas: saber
          quando parar de ser necessário.
        </p>
        <p className="lede">
          Tudo o que você aprendeu neste curso — observar, entrar em sintonia, dar a instrução
          certa, mudar de rumo — tem um único objetivo verdadeiro: uma criança que, naquela
          coisa, um dia não precisa mais de você.
        </p>
        <p className="lede">
          É fácil esquecer isso, porque todo dia seu trabalho é julgado por quão presente, quão
          atento, quão pronto para intervir você é. Mas um instrutor que sempre intervém, mesmo
          quando não é mais necessário, está atrasando exatamente aquilo que queria alcançar.
          Reconhecer o momento em que uma criança consegue fazer sozinha — um exercício que antes
          você acompanhava passo a passo, um gesto que antes você corrigia toda vez — é um ato
          de confiança, não de abandono. Quer dizer dizer a ela, sem palavras, «você já sabe
          fazer isso. Faça.»
        </p>
        <p className="lede">
          <strong>Mas como você sabe se já é esse momento, ou se ainda é cedo demais?</strong>{" "}
          Um sinal útil: o aluno realmente fez um gesto seu quando o executa igual mesmo sem
          sentir você por perto, e não se vira para procurar sua aprovação assim que termina. Se,
          ao contrário, ele executa bem só quando sabe que você está olhando, ou trava procurando
          você com os olhos, esperando um veredito, ainda é cedo: ele ainda não fez o gesto ser
          dele — se acostumou com sua presença, não com o movimento. Deixar ir nesse momento não
          seria confiança: seria um risco disfarçado de confiança.
        </p>
        <div className="card quote">
          E a mesma regra que você ensinou a ler no erro da criança — não existem fracassos, só
          feedback — hoje você aplica a si mesmo. Todo turno que não saiu como você queria não é
          um fracasso seu: é uma informação sobre o que tentar diferente da próxima vez. O
          Capítulo 1 pediu que você descobrisse como você se comunica. Este capítulo pede que
          você continue descobrindo isso, toda semana, pelo resto da sua carreira — não só
          durante este curso.
        </div>
        <p className="lede">
          As duas metades deste capítulo dizem a mesma coisa, vistas de dois lados diferentes.
          Deixar ir um aluno que não precisa mais de você, e deixar ir a ideia de ter
          «fracassado» em um turno que saiu mal: são o mesmo gesto. Nos dois casos, trata-se de
          confiar que o ciclo — observar, tentar, corrigir — funciona mesmo sem seu controle
          contínuo, seja sobre a criança ou sobre você mesmo.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Verificação de fim de dia</h2>
        <p className="prompt">1. Um instrutor que sempre intervém, mesmo quando não é necessário, está ajudando o aluno?</p>
        <OptionGroup
          name="m1"
          options={[
            { value: "no", label: "Não — está atrasando a autonomia que queria alcançar", correct: true },
            { value: "si", label: "Sim — quanto mais presente ele estiver, melhor para o aluno", correct: false },
          ]}
          selected={answers.m1}
          onPick={(v, correct) => setResponse("m1", v, correct)}
        />
        <p className="prompt">2. Um turno que saiu mal é um fracasso do instrutor?</p>
        <OptionGroup
          name="m2"
          options={[
            { value: "si", label: "Sim — se o turno sai mal, quer dizer que ele errou em algo", correct: false },
            { value: "no", label: "Não — é uma informação sobre o que tentar diferente", correct: true },
          ]}
          selected={answers.m2}
          onPick={(v, correct) => setResponse("m2", v, correct)}
        />
        <p className="prompt">
          3. Um aluno executa bem um gesto só quando sente o instrutor por perto, e trava
          procurando ele com o olhar assim que termina. É o momento de deixar ir nessa coisa?
        </p>
        <OptionGroup
          name="m3"
          options={[
            { value: "no", label: "Não — ele ainda não fez o gesto ser dele, se acostumou com sua presença, não com o movimento", correct: true },
            { value: "si", label: "Sim — se ele executa bem, quer dizer que o gesto está adquirido", correct: false },
          ]}
          selected={answers.m3}
          onPick={(v, correct) => setResponse("m3", v, correct)}
        />
        <p className="prompt">
          4. Um aluno repete o mesmo gesto idêntico mesmo quando o instrutor olha para outro
          lado, sem buscar confirmação. O que isso sinaliza?
        </p>
        <OptionGroup
          name="m4"
          options={[
            { value: "fortuna", label: "Que ele só teve sorte", correct: false },
            { value: "suo", label: "Que o gesto agora é dele, não está mais ligado à sua presença", correct: true },
          ]}
          selected={answers.m4}
          onPick={(v, correct) => setResponse("m4", v, correct)}
        />
      </>
    ),
  },

  // 3 — quarta-feira: dois «deixar ir» + simulação Giulia
  {
    day: "quarta-feira",
    pct: 30,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "correggi" || !!a.sim2),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Quarta-feira</div>
        <h1>Dois «deixar ir», no mesmo turno</h1>
        <div className="card scene">
          <div className="who">Uma criança de 10 anos</div>
          <p>
            Um ano antes ele precisava que o instrutor olhasse cada braçada para corrigi-lo.
            Hoje ele nada uma piscina inteira sem que ninguém intervenha, e a técnica se
            sustenta. O instrutor, por hábito, ainda se aproxima da borda, pronto para corrigir
            algo assim que ele terminar. Depois ele para, e não diz nada: deixa a própria criança
            olhar sua piscina, se julgar sozinha — «o que você achou?» — em vez de dar a ela o
            veredito.
          </p>
          <p>
            Não é que o instrutor não tenha mais nada a dizer. É que, nessa coisa específica,
            dizer ele mesmo em vez de deixar ela descobrir seria um passo para trás, não para
            frente.
          </p>
        </div>
        <div className="card scene">
          <div className="who">O mesmo instrutor, à noite</div>
          <p>
            Com outra criança do grupo ele tinha tentado o mesmo silêncio — ficar quieto e
            deixar ela se corrigir sozinha. Mas com essa criança o erro não se corrigiu: se
            consolidou, repetido idêntico por toda a piscina. Por um instante ele pensa: «eu
            errei, deveria ter intervindo.» Depois ele para, e aplica a si mesmo a mesma regra
            que usaria com um aluno: não é um fracasso — é uma informação. Da próxima vez, antes
            de ficar em silêncio, ele vai observar um pouco mais para ter certeza de que o
            exercício já está mesmo adquirido, e não só parece estar.
          </p>
          <p>
            Dois «deixar ir» no mesmo turno — um que deu certo, um para corrigir — e o instrutor
            trata o segundo exatamente como trataria o erro de uma criança: sem se rotular, só
            anotando o que mudar.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Um garoto de 15 anos, Marco</div>
          <p>
            Há dois meses ele nada os oitenta metros de costas sem uma única correção: o técnico
            já está sólido, e o instrutor sabe disso. Em um turno, por hábito, ele se afasta um
            pouco mais do que o normal, olhando também as outras crianças do grupo. Marco,
            chegando na borda, pergunta: «tudo bem? Você nem me olhou uma vez.» Não é uma
            pergunta técnica — é uma dúvida sobre outra coisa: ainda ser acompanhado. O instrutor
            responde: «eu te olhei, e foi justamente por isso que não disse nada — quer dizer
            que estava bom.» Marco fica quieto um instante, depois sorri.
          </p>
        </div>
        <p className="lede">
          <strong>
            Deixar ir não significa parar de olhar: significa parar de intervir quando olhar já
            basta.
          </strong>{" "}
          Mas para o aluno, de fora, as duas coisas podem parecer idênticas — e é por isso que,
          às vezes, vale a pena dizer isso em voz alta, não só fazer em silêncio.
        </p>
        <p className="prompt">
          Pense em um aluno que você acompanha há um tempo, e em uma coisa específica que ele já
          sabe fazer bem sem sua intervenção constante. Escreva o que você faria diferente, da
          próxima vez, para dar mais espaço a ele — sem desaparecer de vez.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: não existe uma resposta certa. O
            sistema observa se está descrevendo um passo atrás gradual (observar em vez de
            corrigir, pedir o julgamento dele em vez de dar o seu) e não um abandono total nem
            um controle que continua idêntico. */}
        <h2>Simulação</h2>
        <p className="lede">
          <strong>GIULIA, 11 anos.</strong> Ela acabou de completar um exercício técnico que, até
          um mês atrás, exigia uma correção a cada tentativa. Hoje ela não precisou de nenhuma. O
          que você diz a ela, logo depois?
        </p>
        <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
        {answers.sim === "correggi" && (
          <div className="feedback retry">
            GIULIA: «...ok.» <em>(faz de novo esperando, como sempre, seu veredito final)</em>
          </div>
        )}
        {answers.sim === "chiedi" && (
          <div className="feedback ok">
            GIULIA: «...acho que me estiquei melhor dessa vez. É verdade?»{" "}
            <em>(olha para você, mas já deu o julgamento dela antes de pedir o seu)</em>
            <br />
            Pequena diferença, efeito grande: no segundo caso Giulia está aprendendo a se
            avaliar sozinha — que é, literalmente, o objetivo deste capítulo inteiro.
          </div>
        )}
        {answers.sim === "chiedi" && (
          <div>
            <p className="lede" style={{ marginTop: 14 }}>
              Logo depois, Giulia tenta um segundo exercício — nunca feito antes, um mergulho de
              partida. Ela executa de forma insegura, depois se vira e espera, calada, seu
              veredito.
            </p>
            <p className="prompt">Escreva o que você faz agora.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={SIM2_OPTIONS}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "ancora" && (
              <div className="feedback retry">
                GIULIA fica parada, insegura, sem saber se está bom ou não. Dar espaço funciona
                quando a base já está sólida. Em um gesto novo, o silêncio não é confiança: é
                deixar ela sozinha — exatamente o sinal de terça-feira, lido ao contrário.
              </div>
            )}
            {answers.sim2 === "indica" && (
              <div className="feedback ok">
                GIULIA concorda e tenta de novo, com a indicação em mente. Deixar ir não é uma
                regra fixa igual para todo exercício: depende do que já está adquirido e do que
                não está.
              </div>
            )}
          </div>
        )}
      </>
    ),
  },

  // 4 — quarta-feira à noite: transferência
  {
    day: "quarta-feira à noite",
    pct: 42,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Verificação de fim de dia — transferência</div>
        <h1>Quando o silêncio não basta</h1>
        <p className="lede">
          Você tentou, com um aluno, ficar em silêncio em um exercício que você acreditava já
          estar adquirido — mas ele errou mesmo assim, de um jeito que você não esperava.
        </p>
        <p className="prompt">
          O que você pensa, nesse momento — e o que você faz na vez seguinte? Escreva seu
          raciocínio, não só a conclusão.
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: o sistema procura se ele aplica a
            si mesmo a mesma regra de terça-feira — não um fracasso, uma informação — em vez de
            concluir que «deixar ir» foi um erro para nunca mais repetir. */}
      </>
    ),
  },

  // 5 — na piscina
  {
    day: "na piscina",
    pct: 52,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Sua vez na piscina</div>
        <h1>Comece pelo silêncio</h1>
        <p className="lede">
          Esta semana, escolha um exercício inteiro e não diga nada durante toda a duração dele
          com um aluno que já sabe fazê-lo bem. Só observe. Se precisar intervir, intervenha —
          mas comece pelo silêncio, não pelo comentário.
        </p>
      </>
    ),
  },

  // 6 — sexta-feira: prova cumulativa Capítulo 9 + Capítulo 10
  {
    day: "sexta-feira · 11 min",
    pct: 70,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Sexta-feira — prova cumulativa: Capítulo 9 + Capítulo 10</div>
        <h1>A prova</h1>
        <p className="prompt">1. Um instrutor que sempre intervém, mesmo quando não é necessário, está:</p>
        <OptionGroup
          name="t1"
          options={[
            { value: "bene", label: "Fazendo bem o seu trabalho", correct: false },
            { value: "rallenta", label: "Atrasando a autonomia que queria alcançar", correct: true },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. Um turno que saiu mal é um fracasso do instrutor?</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "no", label: "Não — é uma informação sobre o que tentar diferente", correct: true },
            { value: "si", label: "Sim — um turno que sai mal quer dizer que ele errou em algo", correct: false },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">3. Dar mais espaço a um aluno que já sabe fazer algo significa:</p>
        <OptionGroup
          name="t3"
          options={[
            { value: "sparire", label: "Desaparecer de vez", correct: false },
            { value: "graduale", label: "Um passo atrás gradual, não um abandono", correct: true },
          ]}
          selected={answers.t3}
          onPick={(v, correct) => setResponse("t3", v, correct)}
        />
        <p className="prompt">
          4. As duas metades deste capítulo — a autonomia da criança e o erro do instrutor —
          estão ligadas?
        </p>
        <OptionGroup
          name="t4"
          options={[
            {
              value: "si",
              label: "Sim — são o mesmo gesto: confiar que o ciclo funciona sem controle constante",
              correct: true,
            },
            { value: "no", label: "Não, são dois assuntos diferentes", correct: false },
          ]}
          selected={answers.t4}
          onPick={(v, correct) => setResponse("t4", v, correct)}
        />
        <p className="prompt">
          5. <em>(do Capítulo 9)</em> «Não consegue» e «não topa» são o mesmo problema?
        </p>
        <OptionGroup
          name="t5"
          options={[
            { value: "si", label: "Sim — na prática se enfrentam do mesmo jeito", correct: false },
            { value: "no", label: "Não — um é um problema didático, o outro de relacionamento", correct: true },
          ]}
          selected={answers.t5}
          onPick={(v, correct) => setResponse("t5", v, correct)}
        />
        <p className="prompt">
          6. Se um turno saiu mal porque você deixou ir cedo demais, a conclusão certa é «nunca
          mais vou deixar ninguém ir»?
        </p>
        <OptionGroup
          name="t6"
          options={[
            { value: "no", label: "Não — a conclusão é calibrar melhor quando fazer isso, não parar de fazer", correct: true },
            { value: "si", label: "Sim, melhor ser prudente", correct: false },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">
          7. Um aluno executa bem um gesto só quando sente você por perto, e procura seu olhar
          assim que termina. Já é o momento de deixar ir nessa coisa?
        </p>
        <OptionGroup
          name="t7"
          options={[
            { value: "si", label: "Sim — se ele executa bem, o gesto já está adquirido", correct: false },
            { value: "no", label: "Não — ele ainda não fez o gesto ser dele, se acostumou com sua presença, não com o movimento", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">
          8. Um aluno percebe que hoje você olha menos para ele que o normal e pergunta se está
          tudo bem. O silêncio, sobre um gesto já bom, é:
        </p>
        <OptionGroup
          name="t8"
          options={[
            { value: "complimento", label: "Um elogio, não uma distração", correct: true },
            { value: "distrazione", label: "Uma distração a corrigir", correct: false },
          ]}
          selected={answers.t8}
          onPick={(v, correct) => setResponse("t8", v, correct)}
        />
        <p className="prompt">
          9. <em>(do Capítulo 9)</em> Se até uma segunda proposta for recusada, é preciso
          continuar procurando outras para sempre?
        </p>
        <OptionGroup
          name="t9"
          options={[
            { value: "si", label: "Sim, até encontrar a certa", correct: false },
            { value: "no", label: "Não — depois de uma segunda tentativa de verdade, tudo bem parar com calma", correct: true },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. Um aluno que você acompanha há dois anos pergunta a você, pela primeira vez, «como
          eu fui?» antes que você diga qualquer coisa. Escreva em duas linhas como você responde.
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 7 — feedback: explica como funciona a correção (§10)
  {
    day: "sexta-feira · feedback",
    pct: 73,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§10 · Feedback</div>
        <h1>Veja o que suas respostas dizem</h1>
        <p className="lede">Não sobre você — sobre o que você fez nestas perguntas.</p>
        <p className="lede" style={{ fontSize: ".85rem", fontStyle: "italic" }}>
          Exemplo de feedback gerado, em caso de erro na pergunta 1:
        </p>
        <div className="card quote">
          Você respondeu que intervir sempre é fazer bem o próprio trabalho. É compreensível
          pensar assim — é o que mais se vê. Mas o objetivo de tudo que se ensina é um aluno
          que, naquela coisa, não precisa mais de você. Intervir quando não é necessário atrasa
          exatamente isso.
        </div>
      </>
    ),
  },

  // 8 — recuperação: só se a prova de sexta-feira tiver muitos erros (§12, D25/D27)
  {
    day: "recuperação",
    pct: 76,
    nextLabel: "Continuar ▸",
    showBack: true,
    visible: (a) => {
      const corrette: Record<string, string> = {
        t1: "rallenta", t2: "no", t3: "graduale", t4: "si", t5: "no",
        t6: "no", t7: "no", t8: "complimento", t9: "no",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperação — só porque a prova encontrou alguma dificuldade</div>
        <h1>Dois exemplos a mais, para treinar o silêncio certo</h1>
        <p className="lede">
          Não é um fracasso: é só o sinal de que vale a pena rever o ponto mais delicado deste
          capítulo com mais alguns exemplos — reconhecer quando ficar quieto é a resposta certa,
          e quando ainda não é.
        </p>

        <div className="card scene">
          <div className="who">Elena, 9 anos</div>
          <p>
            Um mês atrás, a virada dela exigia uma correção quase a cada tentativa. Hoje ela faz
            sozinha, olha as próprias mãos debaixo d&apos;água e emerge sorrindo — sem procurar o
            olhar do instrutor. Ele se aproxima da borda de qualquer jeito, pronto para dizer
            alguma coisa.
          </p>
        </div>
        <p className="prompt">Qual é a coisa certa a fazer?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "correggi", label: "Ele dá a ela uma pequena sugestão técnica de qualquer jeito, por hábito", correct: false },
            {
              value: "tace",
              label: "Ele fica quieto — o sorriso sem buscar confirmação diz que o gesto já é dela",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Filippo, 13 anos</div>
          <p>
            Ele executa o mesmo exercício tecnicamente bem. Mas depois de cada tentativa se vira
            rapidamente para o instrutor, procurando um sinal, e fica parado até conseguir.
          </p>
        </div>
        <p className="prompt">Já é o momento de deixar ir nesse exercício?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "si", label: "Sim — se ele executa bem tecnicamente, o gesto está adquirido", correct: false },
            {
              value: "no",
              label: "Não — ele ainda procura confirmação: ainda não fez o gesto ser dele, se acostumou com sua presença, não com o movimento",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Deixar ir não é uma regra igual para todos: é o silêncio dito no momento certo. Nem
          cedo demais, quando o aluno ainda precisa de você. Nem tarde demais, quando já virou
          seu hábito, e não mais a necessidade dele.
        </p>
      </>
    ),
  },

  // 9 — sexta-feira: resultado
  {
    day: "sexta-feira · resultado",
    pct: 82,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§11 · Resultado</div>
        <h1>Seu perfil é atualizado</h1>
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
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  knowledge_score
                </td>
                <td style={{ padding: "6px 0" }}>As 9 perguntas da prova</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  application_score
                </td>
                <td style={{ padding: "6px 0" }}>A resposta no §7</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  simulation_score
                </td>
                <td style={{ padding: "6px 0" }}>Como você respondeu à Giulia no §8</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  reflection_score
                </td>
                <td style={{ padding: "6px 0" }}>O relato de segunda-feira sobre o Capítulo 9</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  competency_score — Autonomia e melhoria contínua
                </td>
                <td style={{ padding: "6px 0" }}>O mais baixo dos anteriores</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },

  // 10 — dashboard
  {
    day: "dashboard",
    pct: 92,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ vakProfile, answers }: StepContext) => (
      <>
        <div className="done-badge">✓ Capítulo 10 concluído</div>
        <div className="eyebrow">Semana 10 de 10 · curso concluído</div>
        <h1>Os dez capítulos, fechados</h1>
        <p className="lede">
          Você aprendeu a ler, entrar em sintonia, comunicar, verificar, corrigir, mudar de
          rumo, lidar com a recusa, deixar ir. Falta só uma última reflexão, antes da prova
          final.
        </p>
        <ChapterVakSection vakProfile={vakProfile} locale="pt-BR" />
        <ChapterDiarySection answers={answers} keys={DIARY_KEYS} locale="pt-BR" />
        <h2>Seu progresso</h2>
        <div className="chip-grid">
          <div className="chip consolidata">
            <span className="name">1 · Autoconhecimento</span>
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
          <div className="chip consolidata">
            <span className="name">4 · Sintonia</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip consolidata">
            <span className="name">5 · Instruções e congruência</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip consolidata">
            <span className="name">6 · Verificar com a ação <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip consolidata">
            <span className="name">7 · O retorno</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip consolidata">
            <span className="name">8 · Mudar de rumo</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip consolidata">
            <span className="name">9 · Situações difíceis</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip acquisita">
            <span className="name">10 · Autonomia e melhoria</span>
            <span className="state">adquirida</span>
          </div>
        </div>
      </>
    ),
  },

  // 11 — fechamento: o fechamento, antes da prova
  {
    day: "fechamento",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="exam-badge"><i className="ph-duotone ph-flag-checkered" aria-hidden="true" /> O fechamento — antes da prova</div>
        <h1>Última pergunta, antes de seguir em frente</h1>
        <p className="lede">
          Esta semana você tentou ficar em silêncio em um exercício que um aluno já sabia fazer.
          Como foi? E, olhando para trás, para todas as dez semanas: qual é a coisa que mais
          mudou — em uma criança, ou em você?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Esta reflexão fica entre você e seu perfil: quem avaliar sua prova final nunca vai
          vê-la.
        </p>
        <div className="card quote">
          A partir daqui começa a prova final. Não é mais uma prova como as outras nove: é o
          momento em que tudo o que você construiu — não só o que você sabe, mas o que você sabe
          fazer — é reunido e verificado de uma vez só, com calma. Você não pode reprovar nela —
          só pode adiá-la. Se ainda não estiver pronto, você volta atrás, reforça o que for
          preciso, e tenta de novo. O padrão é o mesmo para todos. O caminho para chegar lá, como
          foi durante todo o curso, continua sendo seu.
        </div>
      </>
    ),
  },
];
