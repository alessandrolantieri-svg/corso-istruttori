import { OptionGroup } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Tradução em português europeu, não um capítulo independente: mesmos chapterId/chaves de
// resposta/valores internos do capítulo italiano (src/lib/chapters/capitolo-2.tsx) — só muda o
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

const DIARY_KEYS = ["q2", "q7", "q7b", "q13", "t10"];

export const capitolo2StepsPtPT: Step[] = [
  // 0 — capa
  {
    day: "início",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 2 · QUEM TENHO À MINHA FRENTE</div>
        <h1>O que muda entre uma criança de 4 anos e um jovem de 15</h1>
        <p className="lede">
          O instrutor reconhece a faixa etária de um aluno pela forma como responde — não pela
          idade escrita no cartão de cidadão — e escolhe em conformidade a primeira palavra a usar.
        </p>
      </>
    ),
  },

  // 1 — segunda-feira: ativação + consolidação Cap1
  {
    day: "segunda-feira · 10 min",
    pct: 12,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Segunda-feira</div>
        <h1>Bem-vindo de volta. Como correu na piscina?</h1>
        <p className="lede">
          Na semana passada pedi-te só uma coisa: contar quantas vezes, num turno, explicas a mesma
          coisa exatamente da mesma maneira.
        </p>
        <p className="prompt">
          Quantas vezes contaste? E, pensando bem: houve um momento em que mudar de modo talvez
          tivesse funcionado melhor?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidação — o Capítulo 1 volta</h2>
        <p className="prompt">1. O teste VAK diz-te quem és como instrutor?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "no", label: "Não — mostra-te um hábito, não uma identidade", correct: true },
            { value: "si", label: "Sim, é um diagnóstico fiável", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. O teu canal menos usado é aquele...</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "evita", label: "Que não precisas de aprender", correct: false },
            {
              value: "allena",
              label: "Que arriscas esquecer sob pressão — o que é preciso treinar",
              correct: true,
            },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">
          3. Se um modo de explicar não funciona, a coisa certa é repeti-lo mais devagar?
        </p>
        <OptionGroup
          name="k3"
          options={[
            { value: "falso", label: "Falso — muda-se de canal, não se abranda o mesmo", correct: true },
            { value: "vero", label: "Verdadeiro — repetir mais devagar ajuda a fazer-se entender melhor", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">
          4. No exemplo da criança de 8 anos e a bruços, qual canal funcionou por último?
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
            { value: "si", label: "Sim, perdeu tempo inutilmente", correct: false },
            {
              value: "no",
              label:
                "Não — usou apenas, um a seguir ao outro, os seus dois canais mais confortáveis, antes de chegar ao certo",
              correct: true,
            },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. O teu perfil VAK mostra uma pontuação alta em «Dizer»: quer dizer que nunca deves usar
          «Mostrar»?
        </p>
        <OptionGroup
          name="k6"
          options={[
            {
              value: "no",
              label: "Não — quer dizer só que arriscas esquecê-lo sob pressão, não que deva ser evitado",
              correct: true,
            },
            { value: "si", label: "Sim, é melhor ficar-se pelo canal forte", correct: false },
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
          Esta semana aprendes a reconhecer não a idade de uma criança, mas a sua faixa — e são
          duas coisas diferentes.
        </p>
        <p className="lede">
          Uma criança de 6 anos e uma de 9 estão na mesma faixa. Uma de 10 e uma de 11, não. As
          fronteiras não seguem o aniversário: seguem o que uma criança consegue mesmo fazer com as
          palavras que lhe dás.
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
                  Uma coisa de cada vez. Uma instrução com dois passos perde-se muitas vezes a meio.
                  O jogo é a própria linguagem.
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
                  Chega o embaraço diante do grupo — uma correção dita em voz alta pode fechar um
                  miúdo pelo resto da aula.
                </td>
              </tr>
              <tr>
                <td>14-18</td>
                <td>
                  Exige o porquê. Uma instrução sem motivo não é cumprida: é discutida, ou ignorada.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card quote">
          Reconhece a faixa pela forma como te responde, não pelos anos que tem. É a única coisa
          que precisas mesmo de aprender hoje.
        </div>
        <p className="lede">
          Errar a faixa custa em ambas as direções: tratar um jovem de 13 anos como pequeno faz com
          que se sinta gozado; tratar um de sete anos como adulto perde-o a meio da frase.
        </p>
        <p className="lede">
          <strong>
            Algo que vale a pena saber já, e que complica um pouco a tabela — de propósito.
          </strong>{" "}
          A faixa não é um dado fixo, nem sequer para a mesma criança. Um jovem de 13 anos, sozinho
          contigo, sem o grupo a olhar, pode parecer outra pessoa: mais aberto, mais à vontade. Não
          erraste a avaliá-lo na semana passada. Mudou o contexto, não ele. Uma criança de 9 anos
          muito segura de si pode já mostrar, em certas situações, o embaraço típico dos 11-13. A
          tabela diz onde olhar. A criança que tens à tua frente naquele momento dá a resposta
          verdadeira.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controlo de fim de dia</h2>
        <p className="prompt">
          1. Uma criança de 6 anos consegue seguir uma instrução com dois passos seguidos?
        </p>
        <OptionGroup
          name="c1"
          options={[
            { value: "no", label: "Não, nunca antes dos 10 anos", correct: false },
            { value: "si", label: "Sim — aos 6 anos começa mesmo agora a conseguir", correct: true },
          ]}
          selected={answers.c1}
          onPick={(v, correct) => setResponse("c1", v, correct)}
        />
        <p className="prompt">2. O que muda de verdade para um jovem de 15 anos em relação a um de 10?</p>
        <OptionGroup
          name="c2"
          options={[
            { value: "perche", label: "Exige o porquê — uma instrução sem motivo não a executa", correct: true },
            { value: "parole", label: "Entende palavras mais difíceis", correct: false },
          ]}
          selected={answers.c2}
          onPick={(v, correct) => setResponse("c2", v, correct)}
        />
        <p className="prompt">
          3. Um jovem de 13 anos, sem o grupo à volta, comporta-se mais «como pequeno» do que o
          habitual, aberto e sem embaraço. É uma contradição?
        </p>
        <OptionGroup
          name="c3"
          options={[
            { value: "si", label: "Sim, quer dizer que erraste a sua faixa etária", correct: false },
            {
              value: "no",
              label: "Não — a faixa etária também se lê pelo contexto: sem o grupo, o embaraço pesa muito menos",
              correct: true,
            },
          ]}
          selected={answers.c3}
          onPick={(v, correct) => setResponse("c3", v, correct)}
        />
        <p className="prompt">
          4. Uma criança de 9 anos muito segura de si pode já mostrar, em certas situações, reações
          típicas da faixa 11-13?
        </p>
        <OptionGroup
          name="c4"
          options={[
            {
              value: "si",
              label: "Sim — as fronteiras são indicativas: lê-se a resposta, não o registo civil",
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
            estrela do mar!» — uma imagem, uma única palavra. Sofia estica os braços e o corpo
            distende-se sozinho.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Tommaso, 9 anos</div>
          <p>
            Tem de aprender uma entrada em dois tempos. O instrutor dá a instrução inteira, em
            sequência: «primeiro esticas os braços, depois empurras com as pernas.» Tommaso
            executa-a por ordem — aos 5 anos teria sido quase impossível, aos 9 já é normal.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Giacomo, 12 anos</div>
          <p>
            Está a errar um exercício técnico. O instrutor, por hábito, diz diante de todo o grupo:
            «Giacomo, olha que estás todo torto, relaxa as costas!» Giacomo cora, enrijece-se, e
            evita o exercício pelo resto da aula.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Andrea, 16 anos</div>
          <p>
            Está a aprender uma virada mais técnica do que a que usava até agora. Seguindo o hábito
            adquirido com os mais pequenos, o instrutor mostra-lhe o movimento e diz só «faz
            assim». Andrea tenta-o mecanicamente, depois pergunta: «mas porque é que se faz assim,
            não era mais rápido o outro modo?» O instrutor acrescenta, em duas frases, porque é que
            essa técnica ganha tempo exatamente onde ele perde velocidade. Andrea concorda com a
            cabeça, e desta vez põe empenho a sério.
          </p>
        </div>
        <p className="lede">
          O mesmo respeito, aplicado de quatro formas opostas — com o Giacomo bastava aproximar-se
          e dizer a mesma coisa só a ele; com o Andrea bastava acrescentar o porquê que a sua faixa
          exige.
        </p>
        <p className="prompt">
          O Giacomo está a repetir o mesmo erro. O grupo está perto e pode ouvir. Reescreve a
          correção — mesmo conteúdo técnico, mas do modo certo para a sua faixa.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: o sistema procura duas coisas — que a
            correção fique privada (aproximares-te, baixares a voz, não gritares de longe) e que
            não atinja a pessoa («estás todo torto») mas o comportamento («as costas estão a
            dobrar-se»). */}
        <h2>Simulação</h2>
        <p className="lede">
          <strong>GIACOMO, 12 anos.</strong> Acabou de errar o mesmo exercício. O grupo está perto.
          O que fazes?
        </p>
        <OptionGroup
          name="sim"
          options={[
            { value: "pubblico", label: "Digo-lho em voz alta, de onde estou — continua a estar correto" },
            { value: "privato", label: "Aproximo-me e digo-lho em voz baixa, só a ele" },
          ]}
          selected={answers.sim}
          onPick={(v) => setResponse("sim", v)}
        />
        {answers.sim === "pubblico" && (
          <div className="feedback retry">
            GIACOMO: <em>(não responde, olha para outro lado, os ombros encolhem-se)</em> «...ok.»{" "}
            <em>(o exercício acaba aqui por hoje)</em>
            <br />
            Mesmo conteúdo, mas de longe e diante de todos — para esta faixa custa mais do que
            parece.
          </div>
        )}
        {answers.sim === "privato" && (
          <div className="feedback ok">
            GIACOMO: <em>(tenta logo de novo, sem esperar)</em> «...ah, ok, tento.»
            <br />
            Mesmo erro, mesma correção — só muda onde e como a disseste.
          </div>
        )}
        {answers.sim === "privato" && (
          <>
            <p className="lede" style={{ marginTop: 14 }}>
              O Giacomo tenta de novo. O movimento melhora, mas ainda não está perfeito. Vira-se
              para ti, não totalmente seguro: «...já está melhor, não está?»
            </p>
            <p className="prompt">Escreve o que lhe respondes agora.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={[
                { value: "specifico", label: "«Sim — os ombros já estão mais baixos, vê-se a diferença»" },
                { value: "generico", label: "«Muito bem, continua assim»" },
              ]}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "specifico" && (
              <div className="feedback ok">
                GIACOMO ilumina-se um pouco, e tenta de novo com mais segurança — sabe exatamente o
                que funcionou, não só que «está a correr melhor».
              </div>
            )}
            {answers.sim2 === "generico" && (
              <div className="feedback retry">
                GIACOMO acena com a cabeça, mas a dúvida fica na mesma: não sabe exatamente o que
                melhorou, logo não sabe o que repetir de propósito na tentativa seguinte.
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
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> O teu turno na piscina</div>
        <h1>Adivinha a faixa, antes de olhar para a idade</h1>
        <p className="lede">
          Esta semana escolhe um aluno e tenta adivinhar a sua faixa pela forma como te responde —
          não pela idade que já sabes. Depois, só depois, verifica se tinhas razão.
        </p>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Não é preciso acertar. É preciso ter feito a pergunta antes de dar a idade como garantida.
        </p>
        <p className="prompt">
          Um jovem de 16 anos, durante o aquecimento, pergunta: «mas porque é que temos sempre de
          fazer este exercício chato?» — não o diz para protestar, parece uma pergunta verdadeira.
          O que respondes, numa frase?
        </p>
        <Field id="q13" value={answers.q13 ?? ""} onChange={(v) => setReflection("q13", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: o sistema procura um motivo prático e
            direto — não uma ordem («porque eu digo») nem uma lição longa. */}
      </>
    ),
  },

  // 5 — sexta-feira teste cumulativo
  {
    day: "sexta-feira · 12 min",
    pct: 85,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Sexta-feira — teste cumulativo: Capítulo 1 + Capítulo 2</div>
        <h1>O teste</h1>
        <p className="prompt">
          1. O Marco tem 5 anos e a Elena 13 — nenhum dos dois entra na água sozinho. Mesma frase
          para convencer os dois?
        </p>
        <OptionGroup
          name="t1"
          options={[
            { value: "si", label: "Sim, o medo é o mesmo a qualquer idade", correct: false },
            {
              value: "no",
              label: "Não — aos 5 anos um jogo ou uma mão estendida, aos 13 não ser vista a hesitar",
              correct: true,
            },
            { value: "carattere", label: "Depende só da personalidade", correct: false },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. Um jovem de 15 anos pergunta: «porque é que tenho de fazer justamente este exercício?». Respondes:</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "dico", label: "«Porque eu digo, agora faz»", correct: false },
            { value: "bracciata", label: "«Porque te alonga a braçada — experimenta e sente a diferença»", correct: true },
            { value: "ignoro", label: "Ignoras a pergunta e repetes a instrução", correct: false },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">
          3. Verdadeiro ou falso: a faixa etária reconhece-se melhor pela forma como responde do que pelo
          cartão de cidadão.
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
        <p className="prompt">4. Uma criança de 6 anos consegue seguir uma instrução com dois passos seguidos?</p>
        <OptionGroup
          name="t4"
          options={[
            { value: "no", label: "Não, ainda não", correct: false },
            { value: "si", label: "Sim — aos 6 anos começa mesmo agora", correct: true },
          ]}
          selected={answers.t4}
          onPick={(v, correct) => setResponse("t4", v, correct)}
        />
        <p className="prompt">5. Tratar uma criança de 7 anos com uma longa explicação técnica, como um adulto, funciona?</p>
        <OptionGroup
          name="t5"
          options={[
            { value: "no", label: "Não — perde-a a meio, mesmo que pareça a ouvir", correct: true },
            { value: "si", label: "Sim, se for clara", correct: false },
          ]}
          selected={answers.t5}
          onPick={(v, correct) => setResponse("t5", v, correct)}
        />
        <p className="prompt">
          6. <em>(do Capítulo 1)</em> O teu canal VAK menos usado é aquele a...
        </p>
        <OptionGroup
          name="t6"
          options={[
            { value: "evita", label: "Evitar, porque não te sai bem", correct: false },
            {
              value: "allena",
              label: "Treinar, porque é aquele que arriscas esquecer sob pressão",
              correct: true,
            },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">7. Errar a faixa etária custa só numa direção?</p>
        <OptionGroup
          name="t7"
          options={[
            { value: "si", label: "Sim, só se a tratares demasiado como pequena", correct: false },
            { value: "no", label: "Não — custa em ambas as direções", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">
          8. Um jovem de 13 anos, sem o grupo à volta, comporta-se de forma mais aberta e menos
          embaraçada do que o habitual. O que significa?
        </p>
        <OptionGroup
          name="t8"
          options={[
            {
              value: "contesto",
              label: "Que a faixa etária também se lê pelo contexto — sem o grupo, o embaraço pesa muito menos",
              correct: true,
            },
            { value: "sbagliato", label: "Que tinhas errado a avaliar a sua faixa etária", correct: false },
          ]}
          selected={answers.t8}
          onPick={(v, correct) => setResponse("t8", v, correct)}
        />
        <p className="prompt">
          9. O Andrea, 16 anos, executa um exercício novo de forma mecânica até lhe explicares
          também o porquê. Do que sentia falta de verdade?
        </p>
        <OptionGroup
          name="t9"
          options={[
            { value: "attenzione", label: "Atenção", correct: false },
            {
              value: "motivo",
              label: "Um motivo — a esta idade, uma imagem ou uma ordem sozinhas muitas vezes não bastam",
              correct: true,
            },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. Uma criança de 11 anos, diante do grupo, erra um exercício que já sabia fazer. O que
          fazes primeiro, ainda antes de o corrigir?
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
        <h1>Eis o que dizem as tuas respostas</h1>
        <p className="lede">Não sobre ti — sobre o que fizeste nestas perguntas.</p>
        <p className="lede" style={{ fontSize: ".85rem", fontStyle: "italic" }}>
          Exemplo de feedback gerado, em caso de erro na pergunta 1:
        </p>
        <div className="card quote">
          Respondeste que serve a mesma frase para os dois. Relê as duas idades: aos 5 anos o medo
          supera-se com um jogo ou uma presença física próxima; aos 13 anos, muitas vezes, o
          problema já não é só a água — é ser vista a hesitar pelos outros. Mesma emoção de
          partida, obstáculo diferente.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          O feedback nunca diz só «erraste»: diz o que observar para a próxima vez. O tom é sempre
          sobre o comportamento observado, nunca sobre a pessoa (vê o Capítulo 7, que retoma
          exatamente esta regra).
        </p>
      </>
    ),
  },

  // 7 — recuperação: só se o teste de sexta-feira teve demasiados erros (§12, D25/D27)
  {
    day: "recuperação",
    pct: 90,
    nextLabel: "Continuar ▸",
    showBack: true,
    visible: (a) => {
      const corretas: Record<string, string> = {
        t1: "no", t2: "bracciata", t3: "vero", t4: "si", t5: "no",
        t6: "allena", t7: "no", t8: "contesto", t9: "motivo",
      };
      const erradas = Object.entries(corretas).filter(([k, v]) => a[k] !== v).length;
      return erradas >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperação — só porque o teste encontrou alguma dificuldade</div>
        <h1>Mais três exemplos, para treinar o olhar</h1>
        <p className="lede">
          Não é um fracasso: é só o sinal de que vale a pena rever o ponto mais delicado deste
          capítulo com mais alguns exemplos — mesma idade, reações diferentes.
        </p>

        <div className="card scene">
          <div className="who">Duas crianças, ambas com 10 anos</div>
          <p>
            Mesmo grupo. À primeira, depois de um erro, dizes diante dos outros «vá, tenta outra
            vez, tudo bem» — encolhe os ombros e tenta logo de novo. À segunda dizes a frase
            idêntica — bloqueia-se, cora, e evita esse exercício pelo resto do turno.
          </p>
        </div>
        <p className="prompt">Estão na mesma faixa funcional?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "si", label: "Sim, têm a mesma idade", correct: false },
            {
              value: "no",
              label: "Não — a primeira ainda responde como 6-10, a segunda já tem o embaraço típico dos 11-13",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Martina, 11 anos</div>
          <p>
            Em grupo, uma correção dita em voz alta fecha-a pelo resto da aula — típico dos 11-13.
            Na semana seguinte, sozinha contigo numa recuperação individual, a mesma correção
            idêntica não a perturba nada: responde e tenta de novo logo, simples, direta.
          </p>
        </div>
        <p className="prompt">Erraste a avaliar a sua faixa da primeira vez?</p>
        <OptionGroup
          name="rec2"
          options={[
            {
              value: "no",
              label: "Não — mudou o contexto (o grupo a olhar), não ela",
              correct: true,
            },
            { value: "si", label: "Sim, a primeira avaliação estava errada", correct: false },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Dois jovens, ambos com 12 anos</div>
          <p>
            Dás a ambos a mesma instrução em dois passos seguidos. O primeiro segue-a sem se
            perder. O segundo perde-se a meio, como faria uma criança mais nova, e pede-te para
            repetir só a primeira parte.
          </p>
        </div>
        <p className="prompt">O segundo deve ser tratado como se tivesse 7 anos?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "si", label: "Sim, nisto deve ser tratado como criança pequena", correct: false },
            {
              value: "no",
              label: "Não — nesta tarefa específica precisa de um passo de cada vez, mas continua 11-13 para tudo o resto",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          A tabela das faixas diz onde olhar. A criança que tens à tua frente naquele momento, com
          aquele grupo, naquele dia, dá a resposta verdadeira.
        </p>
      </>
    ),
  },

  // 8 — resultado
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
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  knowledge_score
                </td>
                <td style={{ padding: "6px 0" }}>As 10 perguntas do teste</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  application_score
                </td>
                <td style={{ padding: "6px 0" }}>A correção reescrita no §7</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  simulation_score
                </td>
                <td style={{ padding: "6px 0" }}>Como geriste o Giacomo no §8, nas duas trocas</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  reflection_score
                </td>
                <td style={{ padding: "6px 0" }}>O relato de segunda-feira sobre o Capítulo 1</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  transfer_score
                </td>
                <td style={{ padding: "6px 0" }}>A resposta de terça-feira, sobre o jovem de 16 anos</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
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

  // 9 — painel
  {
    day: "painel",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ vakProfile, answers }: StepContext) => (
      <>
        <div className="done-badge">✓ Capítulo 2 concluído</div>
        <div className="eyebrow">Semana 2 de 10 · Capítulo 3 a chegar</div>
        <h1>Olhar e compreender</h1>
        <p className="lede">
          Hoje aprendeste a reconhecer quem tens à tua frente. Na próxima semana aprendes a ler o
          que se está a passar com ele naquele preciso momento.
        </p>
        <ChapterVakSection vakProfile={vakProfile} locale="pt-PT" />
        <ChapterDiarySection answers={answers} keys={DIARY_KEYS} locale="pt-PT" />
        <h2>O teu progresso</h2>
        <div className="chip-grid">
          <div className="chip consolidata">
            <span className="name">1 · Consciência pessoal</span>
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
