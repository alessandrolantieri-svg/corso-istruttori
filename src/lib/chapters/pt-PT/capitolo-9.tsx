import { OptionGroup } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Tradução portuguesa europeia, não um capítulo independente: mesmos chapterId/chaves de
// resposta/valores internos do capítulo italiano (src/lib/chapters/capitolo-9.tsx) — só o texto
// visível muda.

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

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo9StepsPtPT: Step[] = [
  // 0 — capa
  {
    day: "início",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 9 · QUANDO NÃO QUER SABER</div>
        <h1>Não consegue, ou não quer saber?</h1>
        <p className="lede">
          Diante de uma criança que recusa, se opõe ou desafia abertamente, o instrutor procura
          primeiro a boa intenção por trás da recusa — em vez de insistir ou de entrar em confronto.
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
        <h1>Como correu na piscina?</h1>
        <p className="lede">
          Na semana passada: três modos diferentes prontos para a mesma coisa técnica, e mudar
          de rumo se o primeiro não funcionasse. Foi-te útil? Qual modo usaste mais?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidação — o Capítulo 8 regressa</h2>
        <p className="prompt">1. Se um modo não funciona, a coisa certa é repeti-lo mais alto?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "no", label: "Não — tenta-se um modo diferente", correct: true },
            { value: "si", label: "Sim — se o repetires com mais firmeza, normalmente resulta", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. Um bom repertório tem, para cada coisa importante, pelo menos três modos diferentes de a dizer?</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "si", label: "Sim", correct: true },
            { value: "no", label: "Não, um bem feito basta", correct: false },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">3. Se uma criança não consegue com um modo, quer dizer que não é capaz?</p>
        <OptionGroup
          name="k3"
          options={[
            { value: "no", label: "Não — quer dizer só que ainda não era o modo certo", correct: true },
            { value: "si", label: "Sim — se um modo não basta, quer dizer que a criança ainda não consegue", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">4. O repertório tem uma ordem fixa, válida para qualquer criança?</p>
        <OptionGroup
          name="k4"
          options={[
            { value: "si", label: "Sim — primeiro as palavras, depois o gesto, depois o contacto, sempre por esta ordem", correct: false },
            { value: "no", label: "Não — depende da criança", correct: true },
          ]}
          selected={answers.k4}
          onPick={(v, correct) => setResponse("k4", v, correct)}
        />
        <p className="prompt">
          5. Experimentaste os três canais com uma criança, sem resultado. A coisa certa é
          inventar uma quarta variação?
        </p>
        <OptionGroup
          name="k5"
          options={[
            { value: "no", label: "Não — é o momento de parar e ver o que mais há", correct: true },
            { value: "si", label: "Sim, é preciso insistir", correct: false },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. Um canal que funcionou num exercício funciona automaticamente também no exercício
          seguinte?
        </p>
        <OptionGroup
          name="k6"
          options={[
            { value: "si", label: "Sim, uma vez encontrado continua a ser o certo", correct: false },
            { value: "no", label: "Não — cada exercício novo pode exigir um canal diferente", correct: true },
          ]}
          selected={answers.k6}
          onPick={(v, correct) => setResponse("k6", v, correct)}
        />
      </>
    ),
  },

  // 2 — terça-feira: explicação + controlo
  {
    day: "terça-feira · 13 min",
    pct: 27,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Terça-feira</div>
        <h1>«Não consegue» e «não quer saber» não são a mesma coisa</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Até agora aprendeste o que fazer quando uma criança não consegue. Hoje aprendes a
          diferença — porque não é a mesma coisa — quando uma criança não quer saber.
        </p>
        <p className="lede">
          <strong>«Não consegue» é um problema didático.</strong> A criança quer fazer o que lhe
          pedes, mas o caminho ainda não funciona — foi o que aprendeste no Capítulo 8: muda-se
          de rumo.
        </p>
        <p className="lede">
          <strong>«Não quer saber» é uma coisa completamente diferente.</strong> Não é que o
          caminho esteja errado: é que ela, agora, não o quer percorrer. Recusa, opõe-se, por
          vezes desafia abertamente — sobretudo na adolescência.
        </p>
        <p className="lede">
          Confundir as duas coisas é o segundo erro mais comum da profissão (o primeiro é o do
          Capítulo 8: repetir a mesma explicação em vez de mudar de rumo). O motivo é simples:
          perante uma recusa, é natural explicar de novo, talvez de forma mais clara. Esta jogada
          funciona para «não consegue». Mas não serve de nada para «não quer saber». Uma criança
          que recusa não precisa de outra explicação: precisa que tu percebas porque recusa.
        </p>
        <div className="card quote">
          Mesmo o comportamento mais incómodo — a recusa, a oposição, o desafio — esconde quase
          sempre uma intenção que, do ponto de vista de quem o faz, é positiva. Não justifica o
          comportamento. Mas dá-te uma alavanca diferente para puxar.
        </div>
        <p className="lede">
          A criança que recusa entrar na água muitas vezes não te está a recusar a ti: está a
          proteger-se de algo que teme. O rapaz que te desafia à frente do grupo, muitas vezes,
          não quer vencer-te: quer ser visto como alguém que conta, à frente dos colegas.
          Encontrada a intenção, muitas vezes encontras também um modo de a satisfazer sem
          cederes na substância.
        </p>
        <p className="lede">
          A recusa nem sempre é ruidosa: por vezes é um rapaz que desafia em voz alta, outras
          vezes uma menina de 11 anos que, sem levantar a voz, recua e diz «nem sequer tento» —
          mesmo mecanismo, volume diferente.
        </p>
        <p className="lede">
          <strong>E se até a proposta que ofereces for recusada?</strong> Pode acontecer. Não é
          uma negociação infinita: podes tentar uma segunda leitura, com calma — mas se também
          essa não leva a lado nenhum, está bem parar e dizer claramente qual é o limite, sem
          dureza: «está bem, hoje deixamos este exercício de lado — mas o turno continua.»
          Procurar a boa intenção não quer dizer persegui-la infinitamente: quer dizer dar-lhe
          uma verdadeira tentativa, não zero tentativas.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controlo de fim de dia</h2>
        <p className="prompt">1. «Não consegue» e «não quer saber» exigem a mesma resposta?</p>
        <OptionGroup
          name="m1"
          options={[
            { value: "no", label: "Não — um é didático, o outro é de relação", correct: true },
            { value: "si", label: "Sim — em ambos os casos a resposta certa é explicar de novo", correct: false },
          ]}
          selected={answers.m1}
          onPick={(v, correct) => setResponse("m1", v, correct)}
        />
        <p className="prompt">2. Encontrar a boa intenção por trás de uma recusa justifica o comportamento?</p>
        <OptionGroup
          name="m2"
          options={[
            { value: "si", label: "Sim — se percebes o motivo, então a recusa está bem assim como é", correct: false },
            { value: "no", label: "Não — dá-te só uma alavanca diferente para puxar", correct: true },
          ]}
          selected={answers.m2}
          onPick={(v, correct) => setResponse("m2", v, correct)}
        />
        <p className="prompt">3. Se também a segunda proposta for recusada, é preciso continuar a procurar outras infinitamente?</p>
        <OptionGroup
          name="m3"
          options={[
            { value: "no", label: "Não — depois de uma verdadeira segunda tentativa, está bem parar com calma", correct: true },
            { value: "si", label: "Sim, até se encontrar a certa", correct: false },
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
          <div className="who">Um rapaz de 15 anos</div>
          <p>
            Pára à borda da piscina, em voz alta, à frente do grupo: «este exercício é uma
            treta, não o faço.» Não é que não perceba a utilidade do exercício: acabou de pôr à
            prova, à frente de todos, se o instrutor tem o controlo da situação. O instrutor
            responde, sem levantar a voz: «ok. Mostra-me tu como o farias de forma diferente.»
            Não é uma rendição — é dar-lhe um papel, em vez de um confronto. O rapaz propõe uma
            pequena variante, suficientemente próxima para poder ser aceite. A recusa não era
            sobre o exercício: era sobre quem decide.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Alice, 12 anos</div>
          <p>
            Mergulho de partida, nunca experimentado à frente do grupo. Cruza os braços: «não
            faço, é estúpido.» Nenhum desafio em voz alta, só uma recusa seca. O instrutor
            percebe que o problema não é o mergulho: é errá-lo à frente das amigas. Propõe-lhe,
            em voz baixa, experimentá-lo primeiro, enquanto os outros ainda ajeitam as toucas.
            Alice faz.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Uma criança de 8 anos</div>
          <p>
            Cruza os braços e não diz nada, vira-se para olhar a parede, perante um exercício que
            já tinha feito sem problemas na semana anterior. Nenhum desafio, nenhum público a
            impressionar — só uma recusa silenciosa e firme. O instrutor, em vez de propor
            incentivos («anda lá, depois fazemos o jogo de que gostas») ou insistir, baixa-se ao
            seu nível: «hoje é um dia um bocadinho pesado?» A criança acena que sim, ligeiramente
            — não é oposição, é cansaço que aos 8 anos ainda não sabe dizer com as palavras
            certas. O instrutor reduz o exercício, sem fazer disso um problema. A criança faz.
          </p>
        </div>
        <p className="lede">
          <strong>
            Três recusas, três intenções diferentes — desafiar quem manda, proteger-se do olhar
            dos colegas, ou simplesmente aguentar um cansaço que ainda não sabe explicar por
            palavras — e três respostas diferentes, cada uma dirigida à intenção verdadeira, não
            à recusa em si.
          </strong>
        </p>
        <p className="prompt">
          Uma menina de 6 anos, na terceira tentativa de entrar na água, começa a chorar e diz
          «não, não quero, chega». Escreve o que fazes — não o que lhe dizes para a convenceres,
          mas o que fazes para perceberes o que está por trás desse «não».
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: o sistema procura se tenta
            perceber a causa (medo? cansaço? algo que aconteceu antes?) em vez de insistir
            diretamente em entrar na água. */}
        <h2>Simulação</h2>
        <p className="lede">
          <strong>RICCARDO, 16 anos.</strong> Cruza os braços: «não me apetece fazer este
          exercício, pronto.» O que lhe respondes?
        </p>
        <OptionGroup
          name="sim"
          options={[
            { value: "impone", label: "Explicas de novo porque é que o exercício serve, ou dizes-lhe que tem de o fazer de qualquer forma" },
            {
              value: "capisce",
              label: "Procuras o que está por trás, ou ofereces-lhe uma escolha dentro de um limite — por exemplo: «que outro exercício te apetecia experimentar?»",
            },
          ]}
          selected={answers.sim}
          onPick={(v) => setResponse("sim", v)}
        />
        {answers.sim === "impone" && (
          <div className="feedback retry">
            RICCARDO: «Já disse que não.» <em>(afasta-se, fica fora do exercício)</em>
          </div>
        )}
        {answers.sim === "capisce" && (
          <>
            <div className="feedback ok">
              RICCARDO: «...sei lá, se calhar os mergulhos.» <em>(aproxima-se de novo do grupo)</em>
              <br />
              Não cedeste na substância — o treino continua. Cedeste em quem escolhe, e aos 16
              anos é muitas vezes isso que conta mesmo.
            </div>
            <p className="lede" style={{ marginTop: 14 }}>
              Depois de uns mergulhos, Riccardo pára outra vez: «não, chega também disto, hoje
              não me apetece mais nada.»
            </p>
            <p className="prompt">Escreve o que fazes agora.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={[
                { value: "ancora", label: "Procuras ainda uma terceira alternativa, e depois uma quarta" },
                { value: "confine", label: "Depois de uma verdadeira segunda tentativa já oferecida, dizes claramente qual é o limite, com calma" },
              ]}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "ancora" && (
              <div className="feedback retry">
                RICCARDO percebe que recusar funciona sempre — cada «não» obtém uma proposta
                nova, sem nunca um limite real.
              </div>
            )}
            {answers.sim2 === "confine" && (
              <div className="feedback ok">
                RICCARDO: «...ok» <em>(fica no grupo, sem protestar mais)</em>
                <br />
                Procurar a boa intenção não quer dizer persegui-la infinitamente: uma verdadeira
                tentativa, não zero tentativas — e nem uma negociação sem fim.
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
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controlo de fim de dia — transferência</div>
        <h1>Não consegue, ou não quer saber?</h1>
        <p className="lede">
          Uma menina de 9 anos, sem levantar a voz, diz simplesmente: «nem sequer tento, já que
          nunca consigo.» Não está zangada, parece resignada.
        </p>
        <p className="prompt">
          É «não consegue» ou «não quer saber»? O que te faz pensar que é uma coisa e não a
          outra?
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: não tem uma resposta óbvia — é
            intencional. O sistema verifica se raciocina sobre o sinal (resignação, não
            oposição ativa) em vez de aplicar automaticamente o padrão visto nos exemplos de
            hoje. Pode ser as duas coisas ao mesmo tempo: uma dificuldade técnica real que,
            repetida, se transformou em recusa de voltar a tentar. */}
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
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> O teu turno na piscina</div>
        <h1>Primeiro a intenção, depois a resposta</h1>
        <p className="lede">
          Esta semana, com quem recusar alguma coisa: antes de insistires, procura a boa intenção
          por trás da recusa. Não te tem de justificar nada — só te tem de dar uma alavanca
          diferente da que estavas prestes a usar.
        </p>
      </>
    ),
  },

  // 6 — sexta-feira: teste cumulativo Cap.8 + Cap.9
  {
    day: "sexta-feira · 11 min",
    pct: 86,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Sexta-feira — teste cumulativo: Capítulo 8 + Capítulo 9</div>
        <h1>O teste</h1>
        <p className="prompt">1. «Não consegue» e «não quer saber» são o mesmo problema?</p>
        <OptionGroup
          name="t1"
          options={[
            { value: "si", label: "Sim — na prática a recusa e a dificuldade enfrentam-se da mesma forma", correct: false },
            { value: "no", label: "Não — um é didático, o outro é de relação", correct: true },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. Uma criança que recusa precisa sobretudo de:</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "capisce", label: "Que tu percebas o que está por trás da recusa", correct: true },
            { value: "spiega", label: "Outra explicação mais clara", correct: false },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">3. Um rapaz de 15 anos desafia-te à frente do grupo. É provável que esteja a pôr à prova o quê?</p>
        <OptionGroup
          name="t3"
          options={[
            { value: "tecnica", label: "A tua competência técnica", correct: false },
            { value: "controllo", label: "Se tens o controlo da situação", correct: true },
          ]}
          selected={answers.t3}
          onPick={(v, correct) => setResponse("t3", v, correct)}
        />
        <p className="prompt">4. Uma rapariga de 12 anos recusa um exercício novo à frente do grupo. O que está mais provavelmente a proteger?</p>
        <OptionGroup
          name="t4"
          options={[
            { value: "vergogna", label: "Não quer errar à frente das amigas", correct: true },
            { value: "sfida", label: "Quer desafiar a autoridade do instrutor", correct: false },
          ]}
          selected={answers.t4}
          onPick={(v, correct) => setResponse("t4", v, correct)}
        />
        <p className="prompt">
          5. <em>(do Capítulo 8)</em> Se um modo não funciona, a coisa certa é:
        </p>
        <OptionGroup
          name="t5"
          options={[
            { value: "forte", label: "Repeti-lo mais alto", correct: false },
            { value: "diverso", label: "Usar um diferente", correct: true },
          ]}
          selected={answers.t5}
          onPick={(v, correct) => setResponse("t5", v, correct)}
        />
        <p className="prompt">6. A recusa é sempre ruidosa e em voz alta?</p>
        <OptionGroup
          name="t6"
          options={[
            { value: "no", label: "Não — pode também ser silenciosa, um recuar sem drama", correct: true },
            { value: "si", label: "Sim — uma recusa verdadeira nota-se sempre, senão não é real", correct: false },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">7. Uma criança de 8 anos cruza os braços e não responde, perante um exercício que já sabia fazer. O que pode esconder, além de desafio ou vergonha?</p>
        <OptionGroup
          name="t7"
          options={[
            { value: "niente", label: "Nada, nessa idade é sempre birra", correct: false },
            { value: "stanchezza", label: "Também um cansaço que ainda não sabe exprimir por palavras", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">8. Se também a segunda proposta for recusada, é preciso continuar a procurar outras infinitamente?</p>
        <OptionGroup
          name="t8"
          options={[
            { value: "si", label: "Sim, até se encontrar a certa", correct: false },
            { value: "no", label: "Não — depois de uma verdadeira segunda tentativa, está bem dizer claramente qual é o limite, com calma", correct: true },
          ]}
          selected={answers.t8}
          onPick={(v, correct) => setResponse("t8", v, correct)}
        />
        <p className="prompt">9. Dizer claramente qual é o limite, depois de uma verdadeira tentativa de perceber, contradiz «procurar a boa intenção»?</p>
        <OptionGroup
          name="t9"
          options={[
            { value: "si", label: "Sim, é preciso insistir até a recusa acabar", correct: false },
            { value: "no", label: "Não — procurar a intenção não quer dizer persegui-la infinitamente", correct: true },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. Uma criança de 8 anos recusa um exercício que já tinha feito bem na semana
          anterior. Escreve em duas linhas o que fazes antes de insistires.
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
          Respondeste que é preciso outra explicação mais clara. Mas se o problema não é que não
          percebe — é que não quer — explicar de novo não muda nada, porque não é esse o ponto.
          Primeiro percebes o que está por trás, depois decides o que dizer.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          O feedback nunca diz só «erraste»: diz o que observar da próxima vez. O tom mantém-se
          sempre sobre o comportamento observado, nunca sobre a pessoa — a mesma regra do
          Capítulo 7.
        </p>
      </>
    ),
  },

  // 8 — recuperação: só se o teste de sexta-feira teve muitos erros (§12, D25/D27)
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
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperação — só porque o teste encontrou alguma dificuldade</div>
        <h1>Mais três exemplos, para treinar o limite</h1>
        <p className="lede">
          Não é um fracasso: é só o sinal de que vale a pena rever o ponto mais delicado deste
          capítulo com mais alguns exemplos — reconhecer a recusa antes de reagires.
        </p>

        <div className="card scene">
          <div className="who">Uma criança de 10 anos</div>
          <p>
            Pára perante um mergulho novo e diz, seco: «não faço.» O instrutor, por hábito,
            repete a explicação técnica — mais devagar, mais detalhada — convencido de que basta
            fazer-se entender melhor.
          </p>
        </div>
        <p className="prompt">É a resposta certa a uma recusa?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "si", label: "Sim — se a explicação for mais clara, normalmente a recusa desfaz-se", correct: false },
            {
              value: "no",
              label: "Não — uma recusa não se resolve com uma explicação mais clara: primeiro é preciso perceber o que está por trás",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Alessia, 11 anos</div>
          <p>
            Durante o aquecimento, em voz alta, à frente do grupo: «não quero fazer joguinhos de
            crianças pequenas.» Na semana anterior, precisamente nesse exercício, tinha errado à
            frente de todos.
          </p>
        </div>
        <p className="prompt">O que protege, mais provavelmente, a sua recusa?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "sfida", label: "Quer desafiar a autoridade do instrutor", correct: false },
            {
              value: "imbarazzo",
              label: "Está a proteger-se de um embaraço já vivido, não do exercício em si",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Davide, 14 anos</div>
          <p>
            Recusa a primeira proposta. O instrutor oferece uma segunda, calibrada: também
            recusada. Oferece uma terceira, depois esboça uma quarta.
          </p>
        </div>
        <p className="prompt">É correto continuar a oferecer alternativas infinitamente?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "si", label: "Sim, até se encontrar a certa", correct: false },
            {
              value: "no",
              label: "Não — depois de uma verdadeira segunda tentativa, está bem parar e dizer claramente qual é o limite, com calma",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          A recusa nunca é o verdadeiro pedido: é o sintoma. E procurar a boa intenção não quer
          dizer persegui-la infinitamente — uma verdadeira tentativa, não zero tentativas, e nem
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
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>knowledge_score</td>
                <td style={{ padding: "6px 0" }}>As 10 perguntas do teste</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>application_score</td>
                <td style={{ padding: "6px 0" }}>A resposta ao §7</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Como geriste o Riccardo no §8, em ambas as trocas</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>O relato de segunda-feira sobre o Capítulo 8</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
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
        <div className="eyebrow">Semana 9 de 10 · Capítulo 10 a caminho</div>
        <h1>Deixar ir</h1>
        <p className="lede">
          Aprendeste a ler, a entrar em sintonia, a comunicar, a verificar, a corrigir, a mudar
          de rumo, a aguentar a recusa. Na próxima semana fecha-se o círculo: como fazes para
          que, um dia, deixes de ser necessário.
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
