import { OptionGroup } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Tradução para o português brasileiro, não um capítulo independente: mesmos chapterId/chaves
// de resposta/valores internos do capítulo italiano (src/lib/chapters/capitolo-9.tsx) — só o
// texto visível muda.

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

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo9StepsPtBR: Step[] = [
  // 0 — capa
  {
    day: "início",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 9 · QUANDO ELA NÃO TOPA</div>
        <h1>Ela não consegue, ou ela não topa?</h1>
        <p className="lede">
          Diante de uma criança que recusa, se opõe ou desafia abertamente, o instrutor primeiro
          procura a intenção boa por trás da recusa — em vez de insistir ou entrar em confronto.
        </p>
      </>
    ),
  },

  // 1 — segunda-feira: reflexão + consolidação Cap.8
  {
    day: "segunda-feira · 10 min",
    pct: 11,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Segunda-feira</div>
        <h1>Como foi na piscina?</h1>
        <p className="lede">
          Na semana passada: três jeitos diferentes prontos para uma mesma coisa técnica, e
          mudar de rumo se o primeiro não funcionasse. Foi útil? Qual jeito você usou mais?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Reforço — o Capítulo 8 volta</h2>
        <p className="prompt">1. Se um jeito não funciona, a coisa certa é repetir mais forte?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "no", label: "Não — se tenta um jeito diferente", correct: true },
            { value: "si", label: "Sim — se você repetir com mais firmeza, geralmente funciona", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. Um bom repertório tem, para cada coisa importante, pelo menos três jeitos diferentes de dizê-la?</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "si", label: "Sim", correct: true },
            { value: "no", label: "Não, um bem feito já basta", correct: false },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">3. Se uma criança não consegue com um jeito, quer dizer que ela não consegue de jeito nenhum?</p>
        <OptionGroup
          name="k3"
          options={[
            { value: "no", label: "Não — quer dizer só que ainda não era o jeito certo", correct: true },
            { value: "si", label: "Sim — se um jeito não basta, quer dizer que a criança ainda não consegue", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">4. O repertório tem uma ordem fixa, válida para toda criança?</p>
        <OptionGroup
          name="k4"
          options={[
            { value: "si", label: "Sim — primeiro as palavras, depois o gesto, depois o contato, sempre nessa ordem", correct: false },
            { value: "no", label: "Não — depende da criança", correct: true },
          ]}
          selected={answers.k4}
          onPick={(v, correct) => setResponse("k4", v, correct)}
        />
        <p className="prompt">
          5. Você tentou os três canais com uma criança, sem resultado. A coisa certa é inventar
          uma quarta variação?
        </p>
        <OptionGroup
          name="k5"
          options={[
            { value: "no", label: "Não — é o momento de parar e olhar o que mais existe", correct: true },
            { value: "si", label: "Sim, é preciso insistir", correct: false },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. Um canal que funcionou em um exercício funciona automaticamente também no exercício
          seguinte?
        </p>
        <OptionGroup
          name="k6"
          options={[
            { value: "si", label: "Sim, uma vez encontrado continua sendo o certo", correct: false },
            { value: "no", label: "Não — cada exercício novo pode exigir um canal diferente", correct: true },
          ]}
          selected={answers.k6}
          onPick={(v, correct) => setResponse("k6", v, correct)}
        />
      </>
    ),
  },

  // 2 — terça-feira: explicação + verificação
  {
    day: "terça-feira · 13 min",
    pct: 27,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Terça-feira</div>
        <h1>«Não consegue» e «não topa» não são a mesma coisa</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Até agora você aprendeu o que fazer quando uma criança não consegue. Hoje você aprende
          a diferença — porque não é a mesma coisa — quando uma criança não topa.
        </p>
        <p className="lede">
          <strong>«Não consegue» é um problema didático.</strong> A criança quer fazer o que
          você pede, mas o caminho ainda não funciona — é o que você aprendeu no Capítulo 8: se
          muda de rumo.
        </p>
        <p className="lede">
          <strong>«Não topa» é uma coisa completamente diferente.</strong> Não é que o caminho
          esteja errado: é que ela, agora, não quer seguir por ele. Recusa, se opõe, às vezes
          desafia abertamente — principalmente na adolescência.
        </p>
        <p className="lede">
          Confundir as duas coisas é o segundo erro mais comum da profissão (o primeiro é o do
          Capítulo 8: repetir a mesma explicação em vez de mudar de rumo). O motivo é simples:
          diante de uma recusa, parece natural explicar de novo, talvez de forma mais clara. Essa
          jogada funciona para «não consegue». Mas não serve para nada em «não topa». Uma criança
          que recusa não precisa de outra explicação: precisa que você entenda por que ela está
          recusando.
        </p>
        <div className="card quote">
          Até o comportamento mais irritante — a recusa, a oposição, o desafio — quase sempre
          esconde uma intenção que, do ponto de vista de quem age assim, é positiva. Isso não
          justifica o comportamento. Mas dá a você uma alavanca diferente para puxar.
        </div>
        <p className="lede">
          A criança que recusa entrar na água frequentemente não está recusando você: está se
          protegendo de algo que teme. O garoto que desafia você na frente do grupo,
          frequentemente, não quer vencer você: quer ser visto como alguém que importa, na
          frente dos colegas. Ao encontrar a intenção, muitas vezes você também encontra um
          jeito de satisfazê-la sem ceder na substância.
        </p>
        <p className="lede">
          A recusa nem sempre é barulhenta: às vezes é um garoto desafiando em voz alta, outras
          vezes uma menina de 11 anos que, sem levantar a voz, se retrai e diz «nem vou
          tentar» — mesmo mecanismo, volume diferente.
        </p>
        <p className="lede">
          <strong>E se até a proposta que você oferece for recusada?</strong> Pode acontecer.
          Não é uma negociação infinita: você pode tentar uma segunda leitura, com calma — mas se
          nem essa levar a lugar nenhum, tudo bem parar e dizer claramente qual é o limite, sem
          dureza: «tudo bem, hoje deixamos esse exercício de lado — mas o turno continua.»
          Procurar a intenção boa não quer dizer persegui-la para sempre: quer dizer dar a ela
          uma tentativa de verdade, não zero tentativas.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Verificação de fim de dia</h2>
        <p className="prompt">1. «Não consegue» e «não topa» exigem a mesma resposta?</p>
        <OptionGroup
          name="m1"
          options={[
            { value: "no", label: "Não — um é didático, o outro é de relacionamento", correct: true },
            { value: "si", label: "Sim — nos dois casos a resposta certa é explicar de novo", correct: false },
          ]}
          selected={answers.m1}
          onPick={(v, correct) => setResponse("m1", v, correct)}
        />
        <p className="prompt">2. Encontrar a intenção boa por trás de uma recusa justifica o comportamento?</p>
        <OptionGroup
          name="m2"
          options={[
            { value: "si", label: "Sim — se você entende o motivo, então a recusa está tudo bem do jeito que é", correct: false },
            { value: "no", label: "Não — só dá a você uma alavanca diferente para puxar", correct: true },
          ]}
          selected={answers.m2}
          onPick={(v, correct) => setResponse("m2", v, correct)}
        />
        <p className="prompt">3. Se até a segunda proposta for recusada, é preciso continuar procurando outras para sempre?</p>
        <OptionGroup
          name="m3"
          options={[
            { value: "no", label: "Não — depois de uma segunda tentativa de verdade, tudo bem parar com calma", correct: true },
            { value: "si", label: "Sim, até encontrar a certa", correct: false },
          ]}
          selected={answers.m3}
          onPick={(v, correct) => setResponse("m3", v, correct)}
        />
      </>
    ),
  },

  // 3 — quarta-feira: três cenas + simulação Riccardo (duas trocas condicionais)
  {
    day: "quarta-feira",
    pct: 44,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "impone" || !!a.sim2),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Quarta-feira</div>
        <h1>Três recusas, três intenções diferentes</h1>
        <div className="card scene">
          <div className="who">Um garoto de 15 anos</div>
          <p>
            Ele para na borda da piscina, em voz alta, na frente do grupo: «esse exercício é
            besteira, eu não vou fazer.» Não é que ele não entenda a utilidade do exercício: ele
            acabou de testar, na frente de todos, se o instrutor tem o controle da situação. O
            instrutor responde, sem levantar a voz: «ok. Me mostra você como faria diferente.»
            Não é uma rendição — é dar um papel a ele, em vez de um confronto. O garoto propõe
            uma pequena variação, próxima o suficiente para ser aceita. A recusa não era sobre o
            exercício: era sobre quem decide.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Alice, 12 anos</div>
          <p>
            Mergulho de partida, nunca tentado na frente do grupo. Ela cruza os braços: «eu não
            vou fazer, é bobo.» Nenhum desafio em voz alta, só uma recusa seca. O instrutor
            entende que o problema não é o mergulho: é errar na frente das amigas. Ele propõe a
            ela, em voz baixa, tentar primeiro, enquanto os outros ainda ajeitam as toucas. Alice
            faz.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Uma criança de 8 anos</div>
          <p>
            Ele cruza os braços e não diz nada, vira para olhar a parede, diante de um exercício
            que já tinha feito sem problemas na semana passada. Nenhum desafio, nenhuma plateia
            para impressionar — só uma recusa silenciosa e firme. O instrutor, em vez de propor
            incentivos («vamos, depois a gente faz o jogo que você gosta») ou insistir, se
            abaixa ao nível dele: «hoje está sendo um dia meio pesado?» A criança concorda com um
            leve aceno — não é oposição, é um cansaço que aos 8 anos ela ainda não sabe dizer com
            as palavras certas. O instrutor reduz o exercício, sem fazer disso um problema. A
            criança faz.
          </p>
        </div>
        <p className="lede">
          <strong>
            Três recusas, três intenções diferentes — desafiar quem manda, se proteger do olhar
            dos colegas, ou simplesmente aguentar um cansaço que ela ainda não sabe explicar com
            palavras — e três respostas diferentes, cada uma voltada para a intenção real, não
            para a recusa em si.
          </strong>
        </p>
        <p className="prompt">
          Uma menina de 6 anos, na terceira tentativa de entrar na água, começa a chorar e diz
          «não, eu não quero, chega». Escreva o que você faz — não o que você diz para
          convencê-la, mas o que você faz para entender o que está por trás desse «não».
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: o sistema procura se ele tenta
            entender a causa (medo? cansaço? algo que aconteceu antes?) em vez de insistir
            diretamente em entrar na água. */}
        <h2>Simulação</h2>
        <p className="lede">
          <strong>RICCARDO, 16 anos.</strong> Ele cruza os braços: «não estou a fim de fazer
          esse exercício, ponto final.» O que você responde a ele?
        </p>
        <OptionGroup
          name="sim"
          options={[
            { value: "impone", label: "Você explica de novo por que o exercício é importante, ou diz que ele precisa fazer de qualquer jeito" },
            {
              value: "capisce",
              label: "Você procura o que está por trás, ou oferece a ele uma escolha dentro de um limite — ex.: «qual outro exercício você toparia tentar?»",
            },
          ]}
          selected={answers.sim}
          onPick={(v) => setResponse("sim", v)}
        />
        {answers.sim === "impone" && (
          <div className="feedback retry">
            RICCARDO: «Eu disse que não.» <em>(se afasta, fica de fora do exercício)</em>
          </div>
        )}
        {answers.sim === "capisce" && (
          <>
            <div className="feedback ok">
              RICCARDO: «...sei lá, talvez os mergulhos.» <em>(se aproxima de novo do grupo)</em>
              <br />
              Você não cedeu na substância — o treino continua. Você cedeu em quem escolhe, e aos
              16 anos costuma ser isso que realmente importa.
            </div>
            <p className="lede" style={{ marginTop: 14 }}>
              Depois de alguns mergulhos, Riccardo para de novo: «não, chega desse também, não
              estou a fim de nada hoje.»
            </p>
            <p className="prompt">Escreva o que você faz agora.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={[
                { value: "ancora", label: "Você procura ainda uma terceira alternativa, e depois uma quarta" },
                { value: "confine", label: "Depois de uma segunda tentativa de verdade já oferecida, você diz claramente qual é o limite, com calma" },
              ]}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "ancora" && (
              <div className="feedback retry">
                RICCARDO entende que recusar sempre funciona — cada «não» ganha uma proposta
                nova, sem nunca um limite real.
              </div>
            )}
            {answers.sim2 === "confine" && (
              <div className="feedback ok">
                RICCARDO: «...ok» <em>(fica no grupo, sem protestar mais)</em>
                <br />
                Procurar a intenção boa não quer dizer persegui-la para sempre: uma tentativa de
                verdade, não zero tentativas — e nem uma negociação sem fim.
              </div>
            )}
          </>
        )}
      </>
    ),
  },

  // 4 — quarta-feira à noite: transferência
  {
    day: "quarta-feira à noite",
    pct: 60,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Verificação de fim de dia — transferência</div>
        <h1>Ela não consegue, ou ela não topa?</h1>
        <p className="lede">
          Uma menina de 9 anos, sem levantar a voz, diz simplesmente: «nem vou tentar, afinal
          nunca consigo.» Ela não está brava, parece resignada.
        </p>
        <p className="prompt">
          É «não consegue» ou «não topa»? O que faz você pensar que é uma coisa em vez da outra?
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: não tem uma resposta óbvia — é
            proposital. O sistema verifica se ele raciocina sobre o sinal (resignação, não
            oposição ativa) em vez de aplicar automaticamente o padrão visto nos exemplos de
            hoje. Pode ser as duas coisas juntas: uma dificuldade técnica real que, repetida, se
            transformou em recusa de tentar de novo. */}
      </>
    ),
  },

  // 5 — turno na piscina
  {
    day: "na piscina",
    pct: 68,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Sua vez na piscina</div>
        <h1>Primeiro a intenção, depois a resposta</h1>
        <p className="lede">
          Esta semana, com quem recusar alguma coisa: antes de insistir, procure a intenção boa
          por trás da recusa. Ela não precisa justificar nada — só precisa dar a você uma
          alavanca diferente da que você estava prestes a usar.
        </p>
      </>
    ),
  },

  // 6 — sexta-feira: prova cumulativa Cap.8 + Cap.9
  {
    day: "sexta-feira · 11 min",
    pct: 86,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Sexta-feira — prova cumulativa: Capítulo 8 + Capítulo 9</div>
        <h1>A prova</h1>
        <p className="prompt">1. «Não consegue» e «não topa» são o mesmo problema?</p>
        <OptionGroup
          name="t1"
          options={[
            { value: "si", label: "Sim — na prática a recusa e a dificuldade se enfrentam do mesmo jeito", correct: false },
            { value: "no", label: "Não — um é didático, o outro é de relacionamento", correct: true },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. Uma criança que recusa precisa, acima de tudo:</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "capisce", label: "Que você entenda o que está por trás da recusa", correct: true },
            { value: "spiega", label: "De outra explicação mais clara", correct: false },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">3. Um garoto de 15 anos desafia você na frente do grupo. É provável que ele esteja testando o quê?</p>
        <OptionGroup
          name="t3"
          options={[
            { value: "tecnica", label: "Sua competência técnica", correct: false },
            { value: "controllo", label: "Se você tem o controle da situação", correct: true },
          ]}
          selected={answers.t3}
          onPick={(v, correct) => setResponse("t3", v, correct)}
        />
        <p className="prompt">4. Uma garota de 12 anos recusa um exercício novo na frente do grupo. O que ela mais provavelmente está protegendo?</p>
        <OptionGroup
          name="t4"
          options={[
            { value: "vergogna", label: "Ela não quer errar na frente das amigas", correct: true },
            { value: "sfida", label: "Ela quer desafiar a autoridade do instrutor", correct: false },
          ]}
          selected={answers.t4}
          onPick={(v, correct) => setResponse("t4", v, correct)}
        />
        <p className="prompt">
          5. <em>(do Capítulo 8)</em> Se um jeito não funciona, a coisa certa é:
        </p>
        <OptionGroup
          name="t5"
          options={[
            { value: "forte", label: "Repeti-lo mais forte", correct: false },
            { value: "diverso", label: "Usar um diferente", correct: true },
          ]}
          selected={answers.t5}
          onPick={(v, correct) => setResponse("t5", v, correct)}
        />
        <p className="prompt">6. A recusa é sempre barulhenta e em voz alta?</p>
        <OptionGroup
          name="t6"
          options={[
            { value: "no", label: "Não — também pode ser silenciosa, um retrair-se sem drama", correct: true },
            { value: "si", label: "Sim — uma recusa de verdade sempre aparece, senão não é real", correct: false },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">7. Uma criança de 8 anos cruza os braços e não responde, diante de um exercício que já sabia fazer. O que isso pode esconder, além de desafio ou vergonha?</p>
        <OptionGroup
          name="t7"
          options={[
            { value: "niente", label: "Nada, nessa idade é sempre birra", correct: false },
            { value: "stanchezza", label: "Também um cansaço que ela ainda não sabe expressar com palavras", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">8. Se até a segunda proposta for recusada, é preciso continuar procurando outras para sempre?</p>
        <OptionGroup
          name="t8"
          options={[
            { value: "si", label: "Sim, até encontrar a certa", correct: false },
            { value: "no", label: "Não — depois de uma segunda tentativa de verdade, tudo bem dizer claramente qual é o limite, com calma", correct: true },
          ]}
          selected={answers.t8}
          onPick={(v, correct) => setResponse("t8", v, correct)}
        />
        <p className="prompt">9. Dizer claramente qual é o limite, depois de uma tentativa de verdade de entender, contradiz «procurar a intenção boa»?</p>
        <OptionGroup
          name="t9"
          options={[
            { value: "si", label: "Sim, é preciso insistir até a recusa acabar", correct: false },
            { value: "no", label: "Não — procurar a intenção não quer dizer persegui-la para sempre", correct: true },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. Uma criança de 8 anos recusa um exercício que já tinha feito bem na semana
          passada. Escreva em duas linhas o que você faz antes de insistir.
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
        <h1>Veja o que suas respostas dizem</h1>
        <p className="lede">Não sobre você — sobre o que você fez nestas perguntas.</p>
        <p className="lede" style={{ fontSize: ".85rem", fontStyle: "italic" }}>
          Exemplo de feedback gerado, em caso de erro na pergunta 2:
        </p>
        <div className="card quote">
          Você respondeu que é preciso outra explicação mais clara. Mas se o problema não é que
          ela não entende — é que ela não quer — explicar de novo não muda nada, porque não é
          esse o ponto. Primeiro você entende o que está por trás, depois decide o que dizer.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          O feedback nunca diz só «você errou»: diz o que observar da próxima vez. O tom sempre
          fica sobre o comportamento observado, nunca sobre a pessoa — a mesma regra do Capítulo
          7.
        </p>
      </>
    ),
  },

  // 8 — recuperação: só se a prova de sexta-feira tiver muitos erros (§12, D25/D27)
  {
    day: "recuperação",
    pct: 91,
    nextLabel: "Continuar ▸",
    showBack: true,
    visible: (a) => {
      const corrette: Record<string, string> = {
        t1: "no", t2: "capisce", t3: "controllo", t4: "vergogna", t5: "diverso",
        t6: "no", t7: "stanchezza", t8: "no", t9: "no",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperação — só porque a prova encontrou alguma dificuldade</div>
        <h1>Três exemplos a mais, para treinar o limite</h1>
        <p className="lede">
          Não é um fracasso: é só o sinal de que vale a pena rever o ponto mais delicado deste
          capítulo com mais alguns exemplos — reconhecer a recusa antes de reagir.
        </p>

        <div className="card scene">
          <div className="who">Uma criança de 10 anos</div>
          <p>
            Ele para diante de um mergulho novo e diz, seco: «não vou fazer.» O instrutor, por
            hábito, repete a explicação técnica — mais devagar, mais detalhada — convencido de
            que basta se fazer entender melhor.
          </p>
        </div>
        <p className="prompt">Essa é a resposta certa para uma recusa?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "si", label: "Sim — se a explicação for mais clara, a recusa geralmente se desfaz", correct: false },
            {
              value: "no",
              label: "Não — uma recusa não se resolve com uma explicação mais clara: primeiro é preciso entender o que está por trás",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Alessia, 11 anos</div>
          <p>
            Durante o aquecimento, em voz alta, na frente do grupo: «eu não quero fazer
            brincadeirinha de criança pequena.» Na semana passada, exatamente nesse exercício,
            ela tinha errado na frente de todo mundo.
          </p>
        </div>
        <p className="prompt">O que a recusa dela mais provavelmente está protegendo?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "sfida", label: "Ela quer desafiar a autoridade do instrutor", correct: false },
            {
              value: "imbarazzo",
              label: "Ela está se protegendo de um constrangimento já vivido, não do exercício em si",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Davide, 14 anos</div>
          <p>
            Ele recusa a primeira proposta. O instrutor oferece uma segunda, bem calibrada:
            recusada também. Oferece uma terceira, depois começa uma quarta.
          </p>
        </div>
        <p className="prompt">É certo continuar oferecendo alternativas para sempre?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "si", label: "Sim, até encontrar a certa", correct: false },
            {
              value: "no",
              label: "Não — depois de uma segunda tentativa de verdade, tudo bem parar e dizer claramente qual é o limite, com calma",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          A recusa nunca é o pedido de verdade: é o sintoma. E procurar a intenção boa não quer
          dizer persegui-la para sempre — uma tentativa de verdade, não zero tentativas, e nem
          uma negociação sem fim.
        </p>
      </>
    ),
  },

  // 9 — resultado
  {
    day: "sexta-feira · resultado",
    pct: 95,
    nextLabel: "Ir para o Dashboard ▸",
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
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>knowledge_score</td>
                <td style={{ padding: "6px 0" }}>As 10 perguntas da prova</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>application_score</td>
                <td style={{ padding: "6px 0" }}>A resposta no §7</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Como você lidou com o Riccardo no §8, nas duas trocas</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>O relato de segunda-feira sobre o Capítulo 8</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Situações difíceis</td>
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
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ vakProfile, answers }: StepContext) => (
      <>
        <div className="done-badge">✓ Capítulo 9 concluído</div>
        <div className="eyebrow">Semana 9 de 10 · Capítulo 10 chegando</div>
        <h1>Deixar ir</h1>
        <p className="lede">
          Você aprendeu a ler, a entrar em sintonia, a comunicar, a verificar, a corrigir, a
          mudar de rumo, a lidar com a recusa. Na semana que vem fecha o ciclo: como fazer
          para que, um dia, você não seja mais necessário.
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
          <div className="chip acquisita">
            <span className="name">9 · Situações difíceis</span>
            <span className="state">adquirida</span>
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
