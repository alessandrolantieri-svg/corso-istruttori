import { OptionGroup, type Option } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Tradução portuguesa europeia, não um capítulo independente: mesmos chapterId/chaves de
// resposta/valores internos do capítulo italiano (src/lib/chapters/capitolo-10.tsx) — só o texto
// visível muda. Último capítulo do curso: tem um passo final a mais (11 — "encerramento"), com
// .exam-badge, antes do exame final.

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

const SIM_OPTIONS: Option[] = [
  { value: "correggi", label: "Dás-lhe na mesma uma correção técnica, por hábito" },
  { value: "chiedi", label: "Perguntas-lhe primeiro o que ela acha" },
];

const SIM2_OPTIONS: Option[] = [
  { value: "ancora", label: "Respondes-lhe ainda «tu, o que achas?», como para o exercício anterior" },
  { value: "indica", label: "Dás-lhe uma indicação técnica, porque é um exercício novo, ainda não consolidado" },
];

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10","qchiusura"];

export const capitolo10StepsPtPT: Step[] = [
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
          O instrutor reconhece quando um aluno já não precisa dele numa coisa específica — e
          aplica a si mesmo a mesma regra que aprendeu a dar às crianças: não existem fracassos,
          só feedback.
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
        <h1>Como correu na piscina?</h1>
        <p className="lede">
          Na semana passada: com quem recusasse alguma coisa, procurar a boa intenção antes de
          insistir. Aconteceu teres de o fazer? Como correu?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidação — o Capítulo 9 regressa</h2>
        <p className="prompt">1. «Não consegue» e «não quer saber» são o mesmo problema?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "no", label: "Não — um é um problema didático, o outro de relação", correct: true },
            { value: "si", label: "Sim — na prática resolvem-se da mesma forma", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. Uma criança que recusa precisa sobretudo de:</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "spiega", label: "Uma explicação mais clara", correct: false },
            { value: "capisce", label: "Que tu percebas o que está por trás", correct: true },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">3. Encontrar a boa intenção por trás de uma recusa justifica o comportamento?</p>
        <OptionGroup
          name="k3"
          options={[
            { value: "no", label: "Não — dá-te só uma alavanca diferente para puxar", correct: true },
            { value: "si", label: "Sim — se percebes porque o faz, então está bem deixá-lo fazer", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">4. A recusa é sempre ruidosa, em voz alta?</p>
        <OptionGroup
          name="k4"
          options={[
            { value: "si", label: "Sim — senão nem sequer a notarias", correct: false },
            { value: "no", label: "Não — pode também ser um recuar silencioso", correct: true },
          ]}
          selected={answers.k4}
          onPick={(v, correct) => setResponse("k4", v, correct)}
        />
        <p className="prompt">
          5. Se também uma segunda proposta for recusada, a coisa certa é continuar a procurar
          outras infinitamente?
        </p>
        <OptionGroup
          name="k5"
          options={[
            { value: "no", label: "Não — depois de uma verdadeira segunda tentativa, está bem parar com calma", correct: true },
            { value: "si", label: "Sim, até se encontrar a certa", correct: false },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. Uma recusa silenciosa — braços cruzados, nenhuma palavra — pode esconder
          simplesmente cansaço, não desafio?
        </p>
        <OptionGroup
          name="k6"
          options={[
            { value: "si", label: "Sim — por vezes não é oposição, só cansaço que ainda não sabe dizer por palavras", correct: true },
            { value: "no", label: "Não, é sempre birra", correct: false },
          ]}
          selected={answers.k6}
          onPick={(v, correct) => setResponse("k6", v, correct)}
        />
      </>
    ),
  },

  // 2 — terça-feira: saber quando deixar de ser necessário
  {
    day: "terça-feira · 15 min",
    pct: 20,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3 && !!a.m4,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Terça-feira</div>
        <h1>Saber quando deixar de ser necessário</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Aprendeste a ler, entrar em sintonia, comunicar, verificar, corrigir, mudar de rumo,
          aguentar a recusa. A última competência é a mais difícil de todas: saber quando deixar
          de ser necessário.
        </p>
        <p className="lede">
          Tudo o que aprendeste neste curso — observar, entrar em sintonia, dar a instrução
          certa, mudar de rumo — tem uma única meta verdadeira: uma criança que, nessa coisa, um
          dia deixa de precisar de ti.
        </p>
        <p className="lede">
          É fácil esquecer isto, porque todos os dias o teu trabalho é julgado por quão presente,
          atento, pronto a intervir estás. Mas um instrutor que intervém sempre, mesmo quando já
          não é preciso, está a atrasar exatamente aquilo que queria alcançar. Reconhecer o
          momento em que uma criança consegue fazer sozinha — um exercício que antes seguias
          passo a passo, um gesto que antes corrigias sempre — é um ato de confiança, não de
          abandono. Quer dizer dizer-lhe, sem palavras, «isto já sabes fazer. Faz.»
        </p>
        <p className="lede">
          <strong>Mas como sabes se já é esse momento, ou se ainda é cedo demais?</strong> Um
          sinal útil: o aluno fez mesmo seu um gesto quando o executa de forma idêntica mesmo sem
          te sentir por perto, e não se vira à procura da tua aprovação assim que termina. Se,
          pelo contrário, só executa bem quando sabe que estás a olhar, ou fica bloqueado a
          procurar-te com os olhos à espera de um veredito, ainda é cedo: ainda não fez seu o
          gesto — habituou-se à tua presença, não ao movimento. Deixá-lo ir nesse momento não
          seria confiança: seria um risco disfarçado de confiança.
        </p>
        <div className="card quote">
          E a mesma regra que ensinaste a ler no erro da criança — não existem fracassos, só
          feedback — hoje aplicas a ti mesmo. Cada turno que não correu como querias não é um
          fracasso teu: é uma informação sobre o que experimentar de forma diferente da próxima
          vez. O Capítulo 1 pediu-te para descobrires como comunicas tu. Este capítulo pede-te
          para continuares a descobri-lo, todas as semanas, pelo resto da tua carreira — não só
          durante este curso.
        </div>
        <p className="lede">
          As duas metades deste capítulo dizem a mesma coisa, vista de dois lados diferentes.
          Deixar ir um aluno que já não precisa de ti, e deixar ir a ideia de teres «falhado» um
          turno que correu mal: são o mesmo gesto. Em ambos os casos trata-se de confiares que o
          ciclo — observar, experimentar, corrigir — funciona mesmo sem o teu controlo contínuo,
          sobre a criança ou sobre ti mesmo.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controlo de fim de dia</h2>
        <p className="prompt">1. Um instrutor que intervém sempre, mesmo quando não é preciso, está a ajudar o aluno?</p>
        <OptionGroup
          name="m1"
          options={[
            { value: "no", label: "Não — está a atrasar a autonomia que queria alcançar", correct: true },
            { value: "si", label: "Sim — quanto mais presente estiver, melhor é para o aluno", correct: false },
          ]}
          selected={answers.m1}
          onPick={(v, correct) => setResponse("m1", v, correct)}
        />
        <p className="prompt">2. Um turno que correu mal é um fracasso do instrutor?</p>
        <OptionGroup
          name="m2"
          options={[
            { value: "si", label: "Sim — se o turno corre mal, quer dizer que errou nalguma coisa", correct: false },
            { value: "no", label: "Não — é uma informação sobre o que experimentar de forma diferente", correct: true },
          ]}
          selected={answers.m2}
          onPick={(v, correct) => setResponse("m2", v, correct)}
        />
        <p className="prompt">
          3. Um aluno executa bem um gesto só quando sente o instrutor por perto, e bloqueia à
          procura dele com o olhar assim que termina. É o momento de o deixares ir nessa coisa?
        </p>
        <OptionGroup
          name="m3"
          options={[
            { value: "no", label: "Não — ainda não fez seu o gesto, habituou-se à tua presença, não ao movimento", correct: true },
            { value: "si", label: "Sim — se executa bem, quer dizer que o gesto está adquirido", correct: false },
          ]}
          selected={answers.m3}
          onPick={(v, correct) => setResponse("m3", v, correct)}
        />
        <p className="prompt">
          4. Um aluno repete o mesmo gesto de forma idêntica mesmo quando o instrutor olha para
          outro lado, sem procurar confirmação. O que sinaliza isso?
        </p>
        <OptionGroup
          name="m4"
          options={[
            { value: "fortuna", label: "Que só teve sorte", correct: false },
            { value: "suo", label: "Que o gesto já é seu, já não está ligado à tua presença", correct: true },
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
            Um ano antes precisava que o instrutor o olhasse a cada braçada para o corrigir. Hoje
            nada uma piscina inteira sem que ninguém intervenha, e a técnica aguenta. O
            instrutor, por hábito, aproxima-se na mesma da borda, pronto para corrigir qualquer
            coisa assim que ele terminar. Depois pára, e não diz nada: deixa que a própria
            criança olhe para a sua piscina, se avalie sozinha — «que tal te pareceu?» — em vez
            de lhe dar ele o veredito.
          </p>
          <p>
            Não é que o instrutor já não tenha nada a dizer. É que, nesta coisa específica,
            dizê-lo ele em vez de o deixar descobrir seria um passo atrás, não em frente.
          </p>
        </div>
        <div className="card scene">
          <div className="who">O mesmo instrutor, à noite</div>
          <p>
            Com outra criança do grupo tinha experimentado o mesmo silêncio — ficar calado e
            deixar que se corrigisse sozinha. Mas com essa criança o erro não se corrigiu:
            consolidou-se, repetido de forma idêntica por toda a piscina. Por um instante pensa:
            «errei, devia ter intervindo.» Depois pára, e aplica a si mesmo a mesma regra que
            usaria com um aluno: não é um fracasso — é uma informação. Da próxima vez, antes de
            ficar em silêncio, vai observar mais um pouco para ter a certeza de que o exercício
            está mesmo já adquirido, e não apenas parece estar.
          </p>
          <p>
            Dois «deixar ir» no mesmo turno — um que resultou, um para corrigir — e o instrutor
            trata o segundo exatamente como trataria o erro de uma criança: sem se rotular, só
            tomando nota do que mudar.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Um rapaz de 15 anos, Marco</div>
          <p>
            Há dois meses nada os oitenta metros de costas sem uma única correção: o técnico já
            está sólido, e o instrutor sabe disso. Num turno, por hábito, afasta-se um pouco mais
            do que o habitual, olhando também para as outras crianças do grupo. Marco, ao chegar
            à borda, pergunta: «está tudo bem? Não me olhaste nem uma vez.» Não é uma pergunta
            técnica — é uma dúvida sobre outra coisa: continuar a ser acompanhado. O instrutor
            responde: «olhei para ti, e foi por isso mesmo que não disse nada — quer dizer que
            estava bem.» Marco fica um instante calado, depois sorri.
          </p>
        </div>
        <p className="lede">
          <strong>
            Deixar ir não significa deixar de olhar: significa deixar de intervir quando olhar já
            basta.
          </strong>{" "}
          Mas para o aluno, de fora, as duas coisas podem parecer idênticas — e é por isso que,
          por vezes, vale a pena dizê-lo em voz alta, não só fazê-lo em silêncio.
        </p>
        <p className="prompt">
          Pensa num aluno que acompanhas há algum tempo, e numa coisa específica que já sabe
          fazer bem sem a tua intervenção constante. Escreve o que farias de forma diferente, da
          próxima vez, para lhe dares mais espaço — sem desapareceres de vez.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: não há uma resposta certa. O
            sistema verifica se está a descrever um passo atrás gradual (observar em vez de
            corrigir, pedir a opinião dele em vez de dar a tua) e não um abandono total nem um
            controlo que se mantém idêntico. */}
        <h2>Simulação</h2>
        <p className="lede">
          <strong>GIULIA, 11 anos.</strong> Acabou de completar um exercício técnico que, até há
          um mês, exigia uma correção em cada tentativa. Hoje não precisou de nenhuma. O que lhe
          dizes, logo a seguir?
        </p>
        <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
        {answers.sim === "correggi" && (
          <div className="feedback retry">
            GIULIA: «...ok.» <em>(executa de novo à espera, como sempre, do teu veredito final)</em>
          </div>
        )}
        {answers.sim === "chiedi" && (
          <div className="feedback ok">
            GIULIA: «...acho que me estiquei melhor desta vez. É verdade?»{" "}
            <em>(olha para ti, mas já deu a sua opinião antes de pedir a tua)</em>
            <br />
            Pequena diferença, efeito grande: no segundo caso a Giulia está a aprender a
            avaliar-se sozinha — que é, literalmente, o objetivo deste capítulo inteiro.
          </div>
        )}
        {answers.sim === "chiedi" && (
          <div>
            <p className="lede" style={{ marginTop: 14 }}>
              Logo a seguir, a Giulia experimenta um segundo exercício — nunca feito antes, um
              mergulho de partida. Executa-o de forma incerta, depois vira-se e espera, calada, o
              teu veredito.
            </p>
            <p className="prompt">Escreve o que fazes agora.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={SIM2_OPTIONS}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "ancora" && (
              <div className="feedback retry">
                GIULIA fica parada, incerta, sem saber se está bem ou não. Dar espaço funciona
                quando a base já está sólida. Num gesto novo, o silêncio não é confiança: é
                deixá-la sozinha — exatamente o sinal de terça-feira, lido ao contrário.
              </div>
            )}
            {answers.sim2 === "indica" && (
              <div className="feedback ok">
                GIULIA acena que sim e tenta de novo, com a indicação em mente. Deixar ir não é
                uma regra fixa igual para todos os exercícios: depende do que já está adquirido e
                do que não está.
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
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controlo de fim de dia — transferência</div>
        <h1>Quando o silêncio não basta</h1>
        <p className="lede">
          Tentaste, com um aluno, ficar em silêncio num exercício que achavas já adquirido — mas
          ele errou na mesma, de uma forma que não esperavas.
        </p>
        <p className="prompt">
          O que pensas, nesse momento — e o que fazes da vez seguinte? Escreve o teu raciocínio,
          não só a conclusão.
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: o sistema procura se aplica a si
            mesmo a mesma regra de terça-feira — não um fracasso, uma informação — em vez de
            concluir que «deixar ir» foi um erro a nunca mais repetir. */}
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
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> O teu turno na piscina</div>
        <h1>Parte do silêncio</h1>
        <p className="lede">
          Esta semana, escolhe um exercício inteiro e não digas nada durante toda a sua duração a
          um aluno que já o sabe fazer bem. Limita-te a observar. Se for preciso intervir,
          intervém — mas parte do silêncio, não do comentário.
        </p>
      </>
    ),
  },

  // 6 — sexta-feira: teste cumulativo Capítulo 9 + Capítulo 10
  {
    day: "sexta-feira · 11 min",
    pct: 70,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Sexta-feira — teste cumulativo: Capítulo 9 + Capítulo 10</div>
        <h1>O teste</h1>
        <p className="prompt">1. Um instrutor que intervém sempre, mesmo quando não é preciso, está:</p>
        <OptionGroup
          name="t1"
          options={[
            { value: "bene", label: "A fazer bem o seu trabalho", correct: false },
            { value: "rallenta", label: "A atrasar a autonomia que queria alcançar", correct: true },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. Um turno que correu mal é um fracasso do instrutor?</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "no", label: "Não — é uma informação sobre o que experimentar de forma diferente", correct: true },
            { value: "si", label: "Sim — um turno que corre mal quer dizer que errou nalguma coisa", correct: false },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">3. Dar mais espaço a um aluno que já sabe fazer algo significa:</p>
        <OptionGroup
          name="t3"
          options={[
            { value: "sparire", label: "Desaparecer por completo", correct: false },
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
              label: "Sim — são o mesmo gesto: confiar que o ciclo funciona sem controlo constante",
              correct: true,
            },
            { value: "no", label: "Não, são dois assuntos diferentes", correct: false },
          ]}
          selected={answers.t4}
          onPick={(v, correct) => setResponse("t4", v, correct)}
        />
        <p className="prompt">
          5. <em>(do Capítulo 9)</em> «Não consegue» e «não quer saber» são o mesmo problema?
        </p>
        <OptionGroup
          name="t5"
          options={[
            { value: "si", label: "Sim — na prática enfrentam-se da mesma forma", correct: false },
            { value: "no", label: "Não — um é um problema didático, o outro de relação", correct: true },
          ]}
          selected={answers.t5}
          onPick={(v, correct) => setResponse("t5", v, correct)}
        />
        <p className="prompt">
          6. Se um turno correu mal porque deixaste ir cedo demais, a conclusão certa é «nunca
          mais deixo ninguém ir»?
        </p>
        <OptionGroup
          name="t6"
          options={[
            { value: "no", label: "Não — a conclusão é calibrar melhor quando o fazer, não deixar de o fazer", correct: true },
            { value: "si", label: "Sim, mais vale ser prudente", correct: false },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">
          7. Um aluno executa bem um gesto só quando te sente por perto, e procura o teu olhar
          assim que termina. Já é o momento de o deixares ir nessa coisa?
        </p>
        <OptionGroup
          name="t7"
          options={[
            { value: "si", label: "Sim — se o executa bem, o gesto já está adquirido", correct: false },
            { value: "no", label: "Não — ainda não fez seu o gesto, habituou-se à tua presença, não ao movimento", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">
          8. Um aluno repara que hoje olhas menos para ele do que o habitual e pergunta se está
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
          9. <em>(do Capítulo 9)</em> Se também uma segunda proposta for recusada, é preciso
          continuar a procurar outras infinitamente?
        </p>
        <OptionGroup
          name="t9"
          options={[
            { value: "si", label: "Sim, até se encontrar a certa", correct: false },
            { value: "no", label: "Não — depois de uma verdadeira segunda tentativa, está bem parar com calma", correct: true },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. Um aluno que acompanhas há dois anos pergunta-te, pela primeira vez, «como é que me
          saí?» antes de tu dizeres seja o que for. Escreve em duas linhas como respondes.
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
        <h1>Eis o que dizem as tuas respostas</h1>
        <p className="lede">Não sobre ti — sobre o que fizeste nestas perguntas.</p>
        <p className="lede" style={{ fontSize: ".85rem", fontStyle: "italic" }}>
          Exemplo de feedback gerado, em caso de erro na pergunta 1:
        </p>
        <div className="card quote">
          Respondeste que intervir sempre é fazer bem o próprio trabalho. É compreensível pensá-lo
          — é o que mais se vê. Mas a meta de tudo o que se ensina é um aluno que, nessa coisa,
          deixe de precisar de ti. Intervir quando não é preciso atrasa exatamente isso.
        </div>
      </>
    ),
  },

  // 8 — recuperação: só se o teste de sexta-feira teve muitos erros (§12, D25/D27)
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
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperação — só porque o teste encontrou alguma dificuldade</div>
        <h1>Mais dois exemplos, para treinar o silêncio certo</h1>
        <p className="lede">
          Não é um fracasso: é só o sinal de que vale a pena rever o ponto mais delicado deste
          capítulo com mais alguns exemplos — reconhecer quando calar é a resposta certa, e
          quando ainda não é.
        </p>

        <div className="card scene">
          <div className="who">Elena, 9 anos</div>
          <p>
            Há um mês, a sua viragem exigia uma correção quase a cada tentativa. Hoje executa-a
            sozinha, olha para as próprias mãos debaixo de água e emerge a sorrir — sem procurar
            o olhar do instrutor. Ele aproxima-se na mesma da borda, pronto para dizer alguma
            coisa.
          </p>
        </div>
        <p className="prompt">Qual é a coisa certa a fazer?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "correggi", label: "Dá-lhe na mesma uma pequena sugestão técnica, por hábito", correct: false },
            {
              value: "tace",
              label: "Fica calado — o sorriso sem procurar confirmação diz que o gesto já é dela",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Filippo, 13 anos</div>
          <p>
            Executa o mesmo exercício tecnicamente bem. Mas depois de cada tentativa vira-se de
            repente para o instrutor, à procura de um aceno, e fica parado até o obter.
          </p>
        </div>
        <p className="prompt">Já é o momento de o deixares ir neste exercício?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "si", label: "Sim — se o executa bem tecnicamente, o gesto está adquirido", correct: false },
            {
              value: "no",
              label: "Não — ainda procura confirmação: ainda não fez seu o gesto, habituou-se à tua presença, não ao movimento",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Deixar ir não é uma regra igual para todos: é o silêncio dito no momento certo. Nem
          cedo demais, quando o aluno ainda precisa de ti. Nem tarde demais, quando já é hábito
          teu, e não necessidade dele.
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
        <h1>O teu perfil atualiza-se</h1>
        <div className="card">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".86rem" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>Pontuação</th>
                <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>De onde vem</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  knowledge_score
                </td>
                <td style={{ padding: "6px 0" }}>As 9 perguntas do teste</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  application_score
                </td>
                <td style={{ padding: "6px 0" }}>A resposta ao §7</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  simulation_score
                </td>
                <td style={{ padding: "6px 0" }}>Como respondeste à Giulia no §8</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  reflection_score
                </td>
                <td style={{ padding: "6px 0" }}>O relato de segunda-feira sobre o Capítulo 9</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
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
          Aprendeste a ler, entrar em sintonia, comunicar, verificar, corrigir, mudar de rumo,
          aguentar a recusa, deixar ir. Falta só uma última reflexão, antes do exame final.
        </p>
        <ChapterVakSection vakProfile={vakProfile} locale="pt-PT" />
        <ChapterDiarySection answers={answers} keys={DIARY_KEYS} locale="pt-PT" />
        <h2>O teu progresso</h2>
        <div className="chip-grid">
          <div className="chip consolidata">
            <span className="name">1 · Autoconhecimento pessoal</span>
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
            <span className="name">7 · O feedback</span>
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

  // 11 — encerramento: o encerramento, antes do exame
  {
    day: "encerramento",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="exam-badge"><i className="ph-duotone ph-flag-checkered" aria-hidden="true" /> O encerramento — antes do exame</div>
        <h1>Última pergunta, antes de avançares</h1>
        <p className="lede">
          Tentaste, esta semana, ficar em silêncio num exercício que um aluno já sabia fazer.
          Como correu? E, olhando para trás, para as dez semanas: qual é a coisa que mudou mais —
          numa criança, ou em ti?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Esta reflexão fica entre ti e o teu perfil: quem avaliar o teu exame final nunca a
          verá.
        </p>
        <div className="card quote">
          Daqui em diante começa o exame final. Não é mais um teste como os outros nove: é o
          momento em que tudo o que construíste — não só o que sabes, mas o que sabes fazer — é
          reunido e verificado de uma só vez, com calma. Não podes reprovar nele — só podes
          adiá-lo. Se ainda não estiveres pronto, volta-se atrás, reforça-se o que for preciso, e
          tenta-se de novo. O padrão é o mesmo para todos. O caminho até lá, como foi durante
          todo o curso, continua a ser teu.
        </div>
      </>
    ),
  },
];
