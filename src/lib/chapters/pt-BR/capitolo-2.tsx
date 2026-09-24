import { OptionGroup } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Tradução em português brasileiro, não um capítulo independente: mesmos chapterId/chaves de
// resposta/values internos do capítulo italiano (src/lib/chapters/capitolo-2.tsx) — só o texto
// visível muda.

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

const DIARY_KEYS = ["q2", "q7", "q7b", "q13", "t10"];

export const capitolo2StepsPtBR: Step[] = [
  // 0 — capa
  {
    day: "início",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 2 · QUEM TENHO NA MINHA FRENTE</div>
        <h1>O que muda entre uma criança de 4 anos e um adolescente de 15</h1>
        <p className="lede">
          O instrutor reconhece a faixa de um aluno pelo jeito como ele responde — não pela idade
          escrita na carteira de identidade — e escolhe a primeira palavra a usar de acordo com
          isso.
        </p>
      </>
    ),
  },

  // 1 — segunda-feira: ativação + reforço do Cap1
  {
    day: "segunda-feira · 10 min",
    pct: 12,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Segunda-feira</div>
        <h1>Que bom te ver de novo. Como foi na piscina?</h1>
        <p className="lede">
          Na semana passada eu pedi uma coisa só: contar quantas vezes, num turno, você explica a
          mesma coisa exatamente do mesmo jeito.
        </p>
        <p className="prompt">
          Quantas vezes você contou? E, pensando bem: teve algum momento em que mudar de jeito
          talvez tivesse funcionado melhor?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Reforço — o Capítulo 1 volta</h2>
        <p className="prompt">1. O teste VAK diz quem você é como instrutor?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "no", label: "Não — ele mostra um hábito, não uma identidade", correct: true },
            { value: "si", label: "Sim, é um diagnóstico confiável", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. Seu canal menos usado é aquele...</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "evita", label: "Que você não precisa aprender", correct: false },
            {
              value: "allena",
              label: "Que você corre o risco de esquecer sob pressão — o que precisa treinar",
              correct: true,
            },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">
          3. Se um jeito de explicar não funciona, o certo é repetir mais devagar?
        </p>
        <OptionGroup
          name="k3"
          options={[
            { value: "falso", label: "Falso — você troca de canal, não desacelera o mesmo", correct: true },
            { value: "vero", label: "Verdadeiro — repetir mais devagar ajuda a se fazer entender melhor", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">
          4. No exemplo da criança de 8 anos e o nado peito, qual canal funcionou por último?
        </p>
        <OptionGroup
          name="k4"
          options={[
            { value: "mostra", label: "Mostrar", correct: false },
            { value: "dice", label: "Dizer", correct: false },
            { value: "sente", label: "Fazer sentir — só depois de tentar os outros dois", correct: true },
          ]}
          selected={answers.k4}
          onPick={(v, correct) => setResponse("k4", v, correct)}
        />
        <p className="prompt">
          5. Nesse exemplo, o instrutor tinha errado nas duas primeiras vezes que tentou?
        </p>
        <OptionGroup
          name="k5"
          options={[
            { value: "si", label: "Sim, perdeu tempo à toa", correct: false },
            {
              value: "no",
              label:
                "Não — só usou, um atrás do outro, seus dois canais mais confortáveis, antes de chegar no certo",
              correct: true,
            },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. Seu perfil VAK mostra uma pontuação alta em «Dizer»: isso quer dizer que você nunca
          deve usar «Mostrar»?
        </p>
        <OptionGroup
          name="k6"
          options={[
            {
              value: "no",
              label: "Não — só quer dizer que você corre o risco de esquecer disso sob pressão, não que precise evitar",
              correct: true,
            },
            { value: "si", label: "Sim, melhor ficar no canal forte", correct: false },
          ]}
          selected={answers.k6}
          onPick={(v, correct) => setResponse("k6", v, correct)}
        />
      </>
    ),
  },

  // 2 — terça-feira: a tabela das faixas
  {
    day: "terça-feira · 15 min",
    pct: 30,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.c1 && !!a.c2 && !!a.c3 && !!a.c4,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Terça-feira</div>
        <h1>Não a idade. A faixa.</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Esta semana você aprende a reconhecer não a idade de uma criança, mas a faixa dela — e
          são duas coisas diferentes.
        </p>
        <p className="lede">
          Uma criança de 6 anos e uma de 9 estão na mesma faixa. Uma de 10 e uma de 11, não. Os
          limites não seguem o aniversário: seguem o que uma criança realmente consegue fazer com
          as palavras que você dá a ela.
        </p>
        <div className="table-wrap">
          <table className="fasce">
            <tbody>
              <tr>
                <th>Faixa</th>
                <th>O que muda, de verdade</th>
              </tr>
              <tr>
                <td>3-5</td>
                <td>
                  Uma coisa de cada vez. Uma instrução com dois passos costuma se perder na
                  metade. O jogo é a própria linguagem.
                </td>
              </tr>
              <tr>
                <td>6-10</td>
                <td>
                  Começa a conseguir seguir dois passos em sequência. O «muito bem» ainda funciona,
                  simples e direto.
                </td>
              </tr>
              <tr>
                <td>11-13</td>
                <td>
                  Chega a vergonha na frente do grupo — uma correção em voz alta pode fechar uma
                  criança pelo resto da aula.
                </td>
              </tr>
              <tr>
                <td>14-18</td>
                <td>
                  Exige o porquê. Uma instrução sem motivo não é cumprida: é discutida, ou
                  ignorada.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card quote">
          Reconheça a faixa pelo jeito como a criança responde, não pela idade dela. É a única
          coisa que você realmente precisa aprender hoje.
        </div>
        <p className="lede">
          Errar a faixa custa caro nos dois sentidos: tratar um adolescente de treze anos como
          criança pequena faz ele se sentir zoado; tratar uma criança de sete anos como adulto a
          perde no meio da frase.
        </p>
        <p className="lede">
          <strong>
            Uma coisa que vale a pena saber desde já, e que complica um pouco a tabela — de
            propósito.
          </strong>{" "}
          A faixa não é um dado fixo, nem para a mesma criança. Um adolescente de 13 anos, sozinho
          com você, sem o grupo olhando, pode parecer outra pessoa: mais aberto, mais à vontade.
          Você não errou ao avaliar ele na semana passada. Mudou o contexto, não ele. Uma criança
          de 9 anos muito segura de si já pode mostrar, em certas situações, a vergonha típica dos
          11-13. A tabela diz onde olhar. A criança que você tem na frente naquele momento dá a
          resposta de verdade.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Verificação de fim de dia</h2>
        <p className="prompt">
          1. Uma criança de 6 anos consegue seguir uma instrução com dois passos em sequência?
        </p>
        <OptionGroup
          name="c1"
          options={[
            { value: "no", label: "Não, nunca antes dos 10 anos", correct: false },
            { value: "si", label: "Sim — aos 6 anos ela está justamente começando a conseguir", correct: true },
          ]}
          selected={answers.c1}
          onPick={(v, correct) => setResponse("c1", v, correct)}
        />
        <p className="prompt">2. O que muda de verdade para um adolescente de 15 anos em relação a uma criança de 10?</p>
        <OptionGroup
          name="c2"
          options={[
            { value: "perche", label: "Exige o porquê — uma instrução sem motivo, ele não cumpre", correct: true },
            { value: "parole", label: "Entende palavras mais difíceis", correct: false },
          ]}
          selected={answers.c2}
          onPick={(v, correct) => setResponse("c2", v, correct)}
        />
        <p className="prompt">
          3. Um adolescente de 13 anos, sem o grupo por perto, se comporta mais «como criança
          pequena» do que o normal, aberto e sem vergonha. Isso é uma contradição?
        </p>
        <OptionGroup
          name="c3"
          options={[
            { value: "si", label: "Sim, quer dizer que você tinha errado a faixa etária dele", correct: false },
            {
              value: "no",
              label: "Não — a faixa etária também se lê pelo contexto: sem o grupo, a vergonha pesa muito menos",
              correct: true,
            },
          ]}
          selected={answers.c3}
          onPick={(v, correct) => setResponse("c3", v, correct)}
        />
        <p className="prompt">
          4. Uma criança de 9 anos muito segura de si já pode mostrar, em certas situações, reações
          típicas da faixa 11-13?
        </p>
        <OptionGroup
          name="c4"
          options={[
            {
              value: "si",
              label: "Sim — os limites são indicativos: você lê a resposta, não a certidão de nascimento",
              correct: true,
            },
            { value: "no", label: "Não, nunca antes de completar 10 anos", correct: false },
          ]}
          selected={answers.c4}
          onPick={(v, correct) => setResponse("c4", v, correct)}
        />
      </>
    ),
  },

  // 3 — quarta-feira: exemplo + aplicação + simulação
  {
    day: "quarta-feira · 20 min",
    pct: 55,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "pubblico" || !!a.sim2),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Quarta-feira</div>
        <h1>Quatro crianças, quatro faixas, a mesma atenção</h1>
        <div className="card scene">
          <div className="who">Sofia, 5 anos</div>
          <p>
            Desliza mal de costas. Em vez de uma longa correção técnica, o instrutor diz: «faz a
            estrela-do-mar!» — uma imagem, uma palavra só. Sofia abre os braços e o corpo se
            estica sozinho.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Tommaso, 9 anos</div>
          <p>
            Precisa aprender uma entrada na água em dois tempos. O instrutor dá a instrução
            inteira, de uma vez: «primeiro você estica os braços, depois empurra com as pernas.»
            Tommaso executa na ordem certa — aos 5 anos seria quase impossível, aos 9 já é normal.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Giacomo, 12 anos</div>
          <p>
            Está errando um exercício técnico. O instrutor, por hábito, diz na frente de todo o
            grupo: «Giacomo, olha que você está todo torto, relaxa as costas!» Giacomo fica
            vermelho, se enrijece, e evita o exercício pelo resto da aula.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Andrea, 16 anos</div>
          <p>
            Está aprendendo uma virada mais técnica do que a que usava até agora. Seguindo o
            hábito criado com os menores, o instrutor mostra o movimento e diz só «faz assim».
            Andrea tenta de forma mecânica, depois pergunta: «mas por que se faz assim, o outro
            jeito não era mais rápido?» O instrutor acrescenta, em duas frases, por que aquela
            técnica ganha tempo justamente onde ele perde velocidade. Andrea concorda com a
            cabeça, e dessa vez se esforça de verdade.
          </p>
        </div>
        <p className="lede">
          O mesmo respeito, aplicado de quatro jeitos opostos — com Giacomo bastava se aproximar e
          dizer a mesma coisa só para ele; com Andrea bastava acrescentar o porquê que a faixa dele
          exige.
        </p>
        <p className="prompt">
          Giacomo está repetindo o mesmo erro. O grupo está perto e pode ouvir. Reescreva a
          correção — mesmo conteúdo técnico, mas do jeito certo para a faixa dele.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: o sistema procura duas coisas — que a
            correção fique privada (você se aproxima, abaixa a voz, não grita de longe) e que não
            toque a pessoa («você está todo torto») e sim o comportamento («as costas estão se
            curvando»). */}
        <h2>Simulação</h2>
        <p className="lede">
          <strong>GIACOMO, 12 anos.</strong> Acabou de errar o mesmo exercício de novo. O grupo
          está perto. O que você faz?
        </p>
        <OptionGroup
          name="sim"
          options={[
            { value: "pubblico", label: "Digo em voz alta, de onde estou — de qualquer jeito está certo" },
            { value: "privato", label: "Me aproximo e digo baixinho, só para ele" },
          ]}
          selected={answers.sim}
          onPick={(v) => setResponse("sim", v)}
        />
        {answers.sim === "pubblico" && (
          <div className="feedback retry">
            GIACOMO: <em>(não responde, olha para outro lado, os ombros se fecham)</em> «...tá.»{" "}
            <em>(o exercício termina aqui por hoje)</em>
            <br />
            Mesmo conteúdo, mas de longe e na frente de todo mundo — para essa faixa isso custa
            mais do que parece.
          </div>
        )}
        {answers.sim === "privato" && (
          <div className="feedback ok">
            GIACOMO: <em>(tenta de novo na hora, sem esperar)</em> «...ah, tá, deixa eu tentar.»
            <br />
            Mesmo erro, mesma correção — muda só onde e como você disse.
          </div>
        )}
        {answers.sim === "privato" && (
          <>
            <p className="lede" style={{ marginTop: 14 }}>
              Giacomo tenta de novo. O movimento melhora, mas ainda não está perfeito. Ele se vira
              para você, não totalmente seguro: «...já tá melhor, né?»
            </p>
            <p className="prompt">Escreva o que você responde agora.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={[
                { value: "specifico", label: "«Sim — os ombros já estão mais baixos, dá para ver a diferença»" },
                { value: "generico", label: "«Isso aí, continua assim»" },
              ]}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "specifico" && (
              <div className="feedback ok">
                GIACOMO se anima um pouco, e tenta de novo com mais segurança — ele sabe
                exatamente o que funcionou, não só que «está melhorando».
              </div>
            )}
            {answers.sim2 === "generico" && (
              <div className="feedback retry">
                GIACOMO concorda com a cabeça, mas a dúvida continua a mesma: ele não sabe
                exatamente o que melhorou, então não sabe o que repetir de propósito na tentativa
                seguinte.
              </div>
            )}
          </>
        )}
      </>
    ),
  },

  // 4 — turno na piscina
  {
    day: "na piscina",
    pct: 62,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Seu turno na piscina</div>
        <h1>Adivinhe a faixa, antes de olhar a idade</h1>
        <p className="lede">
          Esta semana escolha um aluno e tente adivinhar a faixa dele pelo jeito como ele responde
          — não pela idade que você já sabe. Depois, só então, confira se você acertou.
        </p>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Não precisa acertar. Precisa ter se feito a pergunta antes de dar a idade como certa.
        </p>
        <p className="prompt">
          Um adolescente de 16 anos, durante o aquecimento, pergunta: «mas por que a gente sempre
          tem que fazer esse exercício chato?» — ele não fala isso para reclamar, parece uma
          pergunta de verdade. O que você responde, em uma frase?
        </p>
        <Field id="q13" value={answers.q13 ?? ""} onChange={(v) => setReflection("q13", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: o sistema procura um motivo prático e
            direto — não uma ordem («porque eu estou mandando») nem uma explicação longa. */}
      </>
    ),
  },

  // 5 — sexta-feira prova cumulativa
  {
    day: "sexta-feira · 12 min",
    pct: 85,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Sexta-feira — prova cumulativa: Capítulo 1 + Capítulo 2</div>
        <h1>A prova</h1>
        <p className="prompt">
          1. Marco tem 5 anos e Elena 13 — os dois não entram na água sozinhos. A mesma frase
          serve para convencer os dois?
        </p>
        <OptionGroup
          name="t1"
          options={[
            { value: "si", label: "Sim, o medo é o mesmo em qualquer idade", correct: false },
            {
              value: "no",
              label: "Não — aos 5 anos um jogo ou uma mão estendida, aos 13 não ser observada enquanto hesita",
              correct: true,
            },
            { value: "carattere", label: "Depende só do jeito de cada um", correct: false },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. Um adolescente de 15 anos pergunta: «por que eu tenho que fazer justo esse exercício?». Você responde:</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "dico", label: "«Porque eu estou mandando, agora faz»", correct: false },
            { value: "bracciata", label: "«Porque alonga sua braçada — tenta e sente a diferença»", correct: true },
            { value: "ignoro", label: "Você ignora a pergunta e repete a instrução", correct: false },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">
          3. Verdadeiro ou falso: a faixa etária se reconhece melhor pelo jeito como a criança
          responde do que pela carteira de identidade.
        </p>
        <OptionGroup
          name="t3"
          options={[
            { value: "vero", label: "Verdadeiro", correct: true },
            { value: "falso", label: "Falso", correct: false },
          ]}
          selected={answers.t3}
          onPick={(v, correct) => setResponse("t3", v, correct)}
        />
        <p className="prompt">4. Uma criança de 6 anos consegue seguir uma instrução com dois passos em sequência?</p>
        <OptionGroup
          name="t4"
          options={[
            { value: "no", label: "Não, ainda não", correct: false },
            { value: "si", label: "Sim — aos 6 anos ela está justamente começando", correct: true },
          ]}
          selected={answers.t4}
          onPick={(v, correct) => setResponse("t4", v, correct)}
        />
        <p className="prompt">5. Tratar uma criança de 7 anos com uma explicação técnica longa, como se fosse adulto, funciona?</p>
        <OptionGroup
          name="t5"
          options={[
            { value: "no", label: "Não — você a perde na metade, mesmo que pareça estar ouvindo", correct: true },
            { value: "si", label: "Sim, se for clara", correct: false },
          ]}
          selected={answers.t5}
          onPick={(v, correct) => setResponse("t5", v, correct)}
        />
        <p className="prompt">
          6. <em>(do Capítulo 1)</em> Seu canal VAK menos usado é aquele que você deve...
        </p>
        <OptionGroup
          name="t6"
          options={[
            { value: "evita", label: "Evitar, porque você não é bom nele", correct: false },
            {
              value: "allena",
              label: "Treinar, porque é aquele que você corre o risco de esquecer sob pressão",
              correct: true,
            },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">7. Errar a faixa etária custa caro só num sentido?</p>
        <OptionGroup
          name="t7"
          options={[
            { value: "si", label: "Sim, só se você tratar a criança como muito pequena", correct: false },
            { value: "no", label: "Não — custa caro nos dois sentidos", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">
          8. Um adolescente de 13 anos, sem o grupo por perto, se comporta de um jeito mais aberto
          e menos travado do que o normal. O que isso significa?
        </p>
        <OptionGroup
          name="t8"
          options={[
            {
              value: "contesto",
              label: "Que a faixa etária também se lê pelo contexto — sem o grupo, a vergonha pesa muito menos",
              correct: true,
            },
            { value: "sbagliato", label: "Que você tinha errado ao avaliar a faixa etária dele", correct: false },
          ]}
          selected={answers.t8}
          onPick={(v, correct) => setResponse("t8", v, correct)}
        />
        <p className="prompt">
          9. Andrea, 16 anos, executa um exercício novo de forma mecânica até você explicar também
          o porquê. O que faltava de verdade para ele?
        </p>
        <OptionGroup
          name="t9"
          options={[
            { value: "attenzione", label: "Atenção", correct: false },
            {
              value: "motivo",
              label: "Um motivo — nessa idade uma imagem ou uma ordem sozinhas costumam não bastar",
              correct: true,
            },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. Uma criança de 11 anos, na frente do grupo, erra um exercício que ela já sabia fazer.
          O que você faz primeiro, mesmo antes de corrigir?
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 6 — feedback: explica como funciona a correção (§10, D34)
  {
    day: "sexta-feira · feedback",
    pct: 87,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§10 · Feedback</div>
        <h1>Veja o que suas respostas dizem</h1>
        <p className="lede">Não sobre você — sobre o que você fez nessas perguntas.</p>
        <p className="lede" style={{ fontSize: ".85rem", fontStyle: "italic" }}>
          Exemplo de feedback gerado, em caso de erro na pergunta 1:
        </p>
        <div className="card quote">
          Você respondeu que a mesma frase serve para os dois. Releia as duas idades: aos 5 anos o
          medo se supera com um jogo ou uma presença física por perto; aos 13 anos, muitas vezes,
          o problema já não é mais só a água — é ser visto hesitando pelos outros. Mesma emoção de
          partida, obstáculo diferente.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          O feedback nunca diz só «você errou»: diz o que observar na próxima vez. O tom é sempre
          sobre o comportamento observado, nunca sobre a pessoa (veja o Capítulo 7, que vai
          retomar justamente essa regra).
        </p>
      </>
    ),
  },

  // 7 — recuperação: só se a prova de sexta teve muitos erros (§12, D25/D27)
  {
    day: "recuperação",
    pct: 90,
    nextLabel: "Continuar ▸",
    showBack: true,
    visible: (a) => {
      const corrette: Record<string, string> = {
        t1: "no", t2: "bracciata", t3: "vero", t4: "si", t5: "no",
        t6: "allena", t7: "no", t8: "contesto", t9: "motivo",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperação — só porque a prova encontrou alguma dificuldade</div>
        <h1>Mais três exemplos, para treinar o olhar</h1>
        <p className="lede">
          Não é um fracasso: é só o sinal de que vale a pena rever o ponto mais delicado deste
          capítulo com mais alguns exemplos — mesma idade, reações diferentes.
        </p>

        <div className="card scene">
          <div className="who">Duas crianças, ambas com 10 anos</div>
          <p>
            Mesmo grupo. Para a primeira, depois de um erro, você diz na frente das outras «vai,
            tenta de novo, tranquilo» — ela dá de ombros e tenta de novo na hora. Para a segunda
            você diz a mesma frase — ela trava, fica vermelha, e evita aquele exercício pelo resto
            do turno.
          </p>
        </div>
        <p className="prompt">Elas estão na mesma faixa funcional?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "si", label: "Sim, têm a mesma idade", correct: false },
            {
              value: "no",
              label: "Não — a primeira ainda responde como 6-10, a segunda já tem a vergonha típica de 11-13",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Martina, 11 anos</div>
          <p>
            Em grupo, uma correção em voz alta a fecha pelo resto da aula — típico 11-13. Na
            semana seguinte, sozinha com você numa reposição individual, a mesma correção idêntica
            não a incomoda nem um pouco: ela responde e tenta de novo na hora, simples, direta.
          </p>
        </div>
        <p className="prompt">Você errou ao avaliar a faixa dela na primeira vez?</p>
        <OptionGroup
          name="rec2"
          options={[
            {
              value: "no",
              label: "Não — mudou o contexto (o grupo observando), não ela",
              correct: true,
            },
            { value: "si", label: "Sim, a primeira avaliação estava errada", correct: false },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Dois adolescentes, ambos com 12 anos</div>
          <p>
            Você dá aos dois a mesma instrução com dois passos em sequência. O primeiro segue sem
            se perder. O segundo se perde na metade, como faria uma criança menor, e pede para
            você repetir só a primeira parte.
          </p>
        </div>
        <p className="prompt">O segundo deve ser tratado como se tivesse 7 anos?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "si", label: "Sim, nisso ele deve ser tratado como criança pequena", correct: false },
            {
              value: "no",
              label: "Não — nessa tarefa específica ele precisa de um passo de cada vez, mas continua 11-13 para tudo o mais",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          A tabela das faixas diz onde olhar. A criança que você tem na frente naquele momento, com
          aquele grupo, naquele dia, dá a resposta de verdade.
        </p>
      </>
    ),
  },

  // 8 — resultado
  {
    day: "sexta-feira · resultado",
    pct: 95,
    nextLabel: "Ir para o Dashboard ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§11 · Resultado</div>
        <h1>Seu perfil se atualiza</h1>
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
                <td style={{ padding: "6px 0" }}>As 10 perguntas da prova</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  application_score
                </td>
                <td style={{ padding: "6px 0" }}>A correção reescrita no §7</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  simulation_score
                </td>
                <td style={{ padding: "6px 0" }}>Como você lidou com Giacomo no §8, nas duas trocas</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  reflection_score
                </td>
                <td style={{ padding: "6px 0" }}>O relato de segunda-feira sobre o Capítulo 1</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  transfer_score
                </td>
                <td style={{ padding: "6px 0" }}>A resposta de terça-feira, sobre o adolescente de 16 anos</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  competency_score — Reconhecimento do aluno
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

  // 9 — dashboard
  {
    day: "dashboard",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ vakProfile, answers }: StepContext) => (
      <>
        <div className="done-badge">✓ Capítulo 2 concluído</div>
        <div className="eyebrow">Semana 2 de 10 · Capítulo 3 chegando</div>
        <h1>Olhar e entender</h1>
        <p className="lede">
          Hoje você aprendeu a reconhecer quem está na sua frente. Na próxima semana você aprende
          a ler o que está acontecendo com a criança naquele exato momento.
        </p>
        <ChapterVakSection vakProfile={vakProfile} locale="pt-BR" />
        <ChapterDiarySection answers={answers} keys={DIARY_KEYS} locale="pt-BR" />
        <h2>Seu progresso</h2>
        <div className="chip-grid">
          <div className="chip consolidata">
            <span className="name">1 · Autoconhecimento</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip acquisita">
            <span className="name">2 · Reconhecimento do aluno</span>
            <span className="state">adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">3 · Observar e interpretar <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">não adquirida</span>
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
            <span className="name">7 · O retorno</span>
            <span className="state">não adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">8 · Mudar de rumo</span>
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
