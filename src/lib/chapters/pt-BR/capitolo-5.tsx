import { OptionGroup } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Tradução para o português brasileiro, não um capítulo independente: mesmos chapterId/chaves
// de resposta/valores internos do capítulo italiano (src/lib/chapters/capitolo-5.tsx) — só o
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

export const capitolo5StepsPtBR: Step[] = [
  // 0 — capa
  {
    day: "início",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 5 · A MENSAGEM E A INSTRUÇÃO</div>
        <h1>O que eu digo a ele, e como mostro isso?</h1>
        <p className="lede">
          O instrutor dá instruções em forma positiva — diz o que fazer, não o que não fazer — e
          garante que palavras, tom e corpo digam a mesma coisa.
        </p>
      </>
    ),
  },

  // 1 — segunda-feira: reflexão + consolidação Capítulo 4
  {
    day: "segunda-feira · 8 min",
    pct: 12,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Segunda-feira</div>
        <h1>Como foi na piscina?</h1>
        <p className="lede">
          Na semana passada: com a criança mais fechada — ou mais agitada — do grupo, você se
          colocou no ritmo dela por um minuto antes de pedir alguma coisa. O que você notou —
          nela, ou em você?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Reforço — o Capítulo 4 volta</h2>
        <p className="prompt">1. Se colocar no ritmo da criança vem antes ou depois de guiá-la?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "prima", label: "Antes", correct: true },
            { value: "dopo", label: "Depois", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. Uma criança eufórica: o primeiro movimento é acalmá-la na hora?</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "si", label: "Sim — se você não acalmar na hora, ela pode fugir do controle", correct: false },
            { value: "no", label: "Não — primeiro se acompanha por um momento, depois se guia", correct: true },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">3. A sintonia serve para se fazer ouvir ou para ser apreciado?</p>
        <OptionGroup
          name="k3"
          options={[
            { value: "ascoltare", label: "Se fazer ouvir — é uma competência profissional", correct: true },
            { value: "apprezzare", label: "Ser apreciado — se a criança gosta do instrutor, escuta mais", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">
          4. Se colocar no ritmo funciona só com quem se fecha, nunca com quem se agita?
        </p>
        <OptionGroup
          name="k4"
          options={[
            { value: "vero", label: "Verdadeiro — com quem já está agitado, acompanhar deixa mais agitado ainda", correct: false },
            { value: "falso", label: "Falso — funciona do mesmo jeito, ao contrário, com quem está agitado", correct: true },
          ]}
          selected={answers.k4}
          onPick={(v, correct) => setResponse("k4", v, correct)}
        />
        <p className="prompt">5. Uma criança que estava te seguindo bem se fecha na metade do turno. O que você faz?</p>
        <OptionGroup
          name="k5"
          options={[
            { value: "torni", label: "Você volta um passo atrás: encontra o ritmo dela de novo", correct: true },
            { value: "insisti", label: "Você insiste — até um instante atrás estava tudo bem", correct: false },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. Com uma adolescente distante, a sintonia se constrói do mesmo jeito que com uma
          criança de 6 anos?
        </p>
        <OptionGroup
          name="k6"
          options={[
            { value: "si", label: "Sim, exatamente do mesmo jeito", correct: false },
            { value: "no", label: "Não — a forma muda com a idade, a ordem continua a mesma", correct: true },
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
    pct: 30,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Terça-feira</div>
        <h1>Um alvo, não um obstáculo</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Agora que ela te escuta, o que você diz — e como — faz toda a diferença.
        </p>
        <p className="lede">
          <strong>A instrução em forma positiva.</strong> «Não dobre as pernas» diz só o que não
          fazer — e deixa todo o resto em aberto: a criança poderia mantê-las rígidas como uma
          tábua, ou não movê-las de jeito nenhum, e a instrução continuaria «respeitada» de
          qualquer jeito. Você tirou uma única coisa para não fazer, entre mil possíveis, mas não
          disse o que fazer de verdade. «Pernas retas como um bastão», ao contrário, dá uma única
          coisa precisa para fazer: é o único movimento que o corpo pode realmente executar para
          obedecer.
        </p>
        <p className="lede">
          <strong>Uma razão a mais, específica da água.</strong> Um movimento se aprende melhor
          quando a atenção está no que precisa acontecer fora do corpo — a água a ser empurrada
          para trás, a parede a ser alcançada — não em qual músculo mover: muitos estudos
          confirmam isso, sempre do mesmo jeito. «Empurre a água para trás» produz uma braçada
          melhor do que «estique o cotovelo», mesmo que descrevam exatamente o mesmo movimento.
        </p>
        <p className="lede">
          <strong>A coerência entre palavras, voz e corpo.</strong> Você já deve ter ouvido que
          as palavras contam 7%, o tom 38%, o corpo 55%. Não é verdade — aquele estudo tratava de
          um caso bem específico: pessoas que ouviam uma única palavra pronunciada de jeitos
          diferentes e precisavam adivinhar um sentimento, não a comunicação em geral. Se fosse
          verdade, você poderia ensinar natação numa língua desconhecida e funcionaria do mesmo
          jeito 93% das vezes — não é assim.
        </p>
        <div className="card quote">
          Quando as palavras dizem uma coisa e o corpo diz outra, a criança acredita no corpo —
          não porque ele «conte mais» em geral, mas porque as palavras se controlam facilmente,
          enquanto o corpo não: é mais difícil fingi-lo.
        </div>
        <p className="lede">
          <strong>E quando a proibição parece inevitável?</strong> Numa emergência real — uma
          criança correndo em direção à borda escorregadia — um «pare!» seco é o movimento certo:
          ninguém para para reformular em forma positiva. Fora disso, se você tem ao menos um
          segundo para escolher as palavras, vale a pena gastá-lo com um alvo em vez de uma
          proibição.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Verificação de fim de dia</h2>
        <p className="prompt">1. «Não dobre as pernas» dá ao corpo um alvo ou um obstáculo?</p>
        <OptionGroup
          name="m1"
          options={[
            { value: "bersaglio", label: "Um alvo — de qualquer forma indica qual perna mover", correct: false },
            { value: "ostacolo", label: "Um obstáculo a evitar — menos eficaz do que um alvo", correct: true },
          ]}
          selected={answers.m1}
          onPick={(v, correct) => setResponse("m1", v, correct)}
        />
        <p className="prompt">2. Por que o corpo «vence» as palavras quando se contradizem?</p>
        <OptionGroup
          name="m2"
          options={[
            { value: "falsificare", label: "Porque é mais difícil falsificá-lo", correct: true },
            { value: "conta", label: "Porque conta mais em absoluto", correct: false },
          ]}
          selected={answers.m2}
          onPick={(v, correct) => setResponse("m2", v, correct)}
        />
        <p className="prompt">
          3. Numa emergência real — uma criança correndo em direção a uma borda escorregadia —
          ainda assim é errado dizer «pare!» em vez de reformular em forma positiva?
        </p>
        <OptionGroup
          name="m3"
          options={[
            { value: "si", label: "Sim, a regra vale sempre, mesmo em emergência", correct: false },
            { value: "no", label: "Não — em uma emergência real a clareza imediata importa mais", correct: true },
          ]}
          selected={answers.m3}
          onPick={(v, correct) => setResponse("m3", v, correct)}
        />
      </>
    ),
  },

  // 3 — quarta-feira: três cenas + transferência + simulação com bifurcação
  {
    day: "quarta-feira",
    pct: 47,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "generico" || !!a.sim2),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Quarta-feira</div>
        <h1>Três segundos alinhados</h1>
        <div className="card scene">
          <div className="who">«Muito bem!», dito olhando para o relógio</div>
          <p>
            Um instrutor diz «muito bem!» a uma criança — mas olhando para o relógio, voz sem
            entonação, já virado para a próxima. A criança ouve a palavra certa, mas não se sente
            incentivada: percebeu que a atenção já estava em outro lugar.
          </p>
          <p>
            <strong>Corrigido:</strong> o instrutor para um segundo, se vira, olha para a
            criança, diz «muito bem» com um tom que sobe. Três segundos, não trinta — mas os três
            alinhados.
          </p>
        </div>
        <div className="card scene">
          <div className="who">«Não afunde a cabeça», repetido sem efeito</div>
          <p>
            Uma criança de 7 anos continua afundando a cabeça, apesar de o instrutor repetir «não
            afunde a cabeça». O instrutor muda a frase, não o tom: «mantenha uma orelha dentro e
            outra fora, como se estivesse escutando escondido.» Na braçada seguinte, a cabeça
            fica mais alta.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Um garoto de 14 anos</div>
          <p>
            Acabou de melhorar muito o tempo numa piscina. O instrutor diz «bom trabalho», mas
            com os braços cruzados, olhar já no cronômetro, tom mecânico. O garoto abaixa o
            olhar, se afasta sem expressão: aos 14 anos, um elogio dito assim parece uma frase
            dita por hábito, sem pensar — não um reconhecimento de verdade — e machuca mais do
            que o silêncio. Na vez seguinte, o instrutor se corrige: para, olha nos olhos dele,
            diz «você cortou três segundos, sentiu isso também?» — dessa vez o garoto sorri de
            leve, porque dessa vez o instrutor estava realmente presente.
          </p>
        </div>
        <p className="lede">
          <strong>
            Três cenas, a mesma regra por trás: as palavras abrem a porta, mas é a coerência com
            voz e corpo que a mantém aberta — aos 7 anos como aos 14.
          </strong>
        </p>
        <p className="prompt">Reescreva em forma positiva: «Não afunde a cabeça quando respirar.»</p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: o sistema procura uma instrução que
            descreva o que fazer — não uma versão mais educada da mesma proibição. */}
        <h2>Simulação</h2>
        <p className="lede">
          <strong>DAVIDE, 9 anos.</strong> Acabou de completar pela primeira vez uma piscina
          inteira de peito. O que você diz a ele?
        </p>
        <OptionGroup
          name="sim"
          options={[
            { value: "generico", label: "«Isso aí, vamos seguir em frente» — de corrida" },
            {
              value: "specifico",
              label: "Você para, olha para ele: «você respirou sem afundar a cabeça, fez isso sozinho»",
            },
          ]}
          selected={answers.sim}
          onPick={(v) => setResponse("sim", v)}
        />
        {answers.sim === "generico" && (
          <div className="feedback retry">
            DAVIDE: <em>(se afasta, não parece particularmente satisfeito)</em> «...ok.»
          </div>
        )}
        {answers.sim === "specifico" && (
          <div className="feedback ok">
            DAVIDE: <em>(sorri, fica ali mais um momento)</em> «...sério? Eu fiz certo?»
            <br />
            Não é o tamanho da frase que faz a diferença: é a especificidade, e o fato de você
            ter parado.
          </div>
        )}
        {answers.sim === "specifico" && (
          <div>
            <p className="lede" style={{ marginTop: 14 }}>
              Um instante depois, Davide parte para uma segunda volta — mas dessa vez dobra
              demais os braços, um erro técnico novo, nunca corrigido antes com ele.
            </p>
            <p className="prompt">
              Escreva a instrução que você dá a ele agora — em forma positiva, com tom e corpo
              coerentes.
            </p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={[
                { value: "negativo", label: "Você volta a uma instrução em forma negativa, ou diz distraído" },
                { value: "positivo", label: "Você dá uma imagem positiva, parando para olhar para ele" },
              ]}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "negativo" && (
              <div className="feedback retry">
                DAVIDE tenta de novo, mas o erro continua idêntico — ele não recebeu um alvo para
                alcançar, só mais uma proibição.
              </div>
            )}
            {answers.sim2 === "positivo" && (
              <div className="feedback ok">
                DAVIDE estica um pouco mais os braços na tentativa seguinte — pequeno, mas na
                direção certa.
              </div>
            )}
          </div>
        )}
      </>
    ),
  },

  // 4 — quarta-feira à noite: transferência sobre erro novo
  {
    day: "quarta-feira à noite",
    pct: 63,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Verificação de fim de dia — transferência</div>
        <h1>Um erro nunca visto antes</h1>
        <p className="lede">
          Uma criança continua com os dedos abertos durante a braçada, em vez de unidos. Você
          precisa dar a ela uma instrução nova — ainda não tentou nada com ela.
        </p>
        <p className="prompt">
          Escreva a instrução, em forma positiva, e tente imaginar como você a diria — tom e
          corpo incluídos — de um jeito que os três fiquem coerentes.
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: não é um dos exemplos já vistos — é
            de propósito. O sistema verifica se ele aplica a regra a um erro técnico nunca
            encontrado no capítulo, não só se lembra das frases já lidas. */}
      </>
    ),
  },

  // 5 — na piscina
  {
    day: "na piscina",
    pct: 70,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Sua vez na piscina</div>
        <h1>Uma instrução, parando para olhar</h1>
        <p className="lede">
          Esta semana, dê uma única instrução em forma positiva — diga o que fazer, nunca o que
          não fazer — e pare um segundo enquanto a diz: olhe para a criança, não para o relógio,
          não para o grupo.
        </p>
      </>
    ),
  },

  // 6 — sexta-feira: prova cumulativa
  {
    day: "sexta-feira · 11 min",
    pct: 86,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) =>
      ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Sexta-feira — prova cumulativa: Capítulo 4 + Capítulo 5</div>
        <h1>A prova</h1>
        <p className="prompt">1. «Não dobre as pernas» é uma boa instrução?</p>
        <OptionGroup
          name="t1"
          options={[
            { value: "no", label: "Não — melhor dizer o que fazer", correct: true },
            { value: "si", label: "Sim, é clara — de qualquer forma diz o que evitar", correct: false },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. É verdade que as palavras contam só 7% da comunicação?</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "si", label: "Sim, é uma lei geral", correct: false },
            { value: "no", label: "Não — aquele estudo tratava de um caso bem específico", correct: true },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">3. Quando palavras e corpo dizem coisas diferentes, a criança acredita em quê?</p>
        <OptionGroup
          name="t3"
          options={[
            { value: "parole", label: "Nas palavras — são a mensagem explícita, logo a mais confiável", correct: false },
            { value: "corpo", label: "No corpo — é o sinal mais difícil de falsificar", correct: true },
          ]}
          selected={answers.t3}
          onPick={(v, correct) => setResponse("t3", v, correct)}
        />
        <p className="prompt">4. Uma instrução em forma positiva dá ao corpo um alvo ou um obstáculo?</p>
        <OptionGroup
          name="t4"
          options={[
            { value: "bersaglio", label: "Um alvo", correct: true },
            { value: "ostacolo", label: "Um obstáculo", correct: false },
          ]}
          selected={answers.t4}
          onPick={(v, correct) => setResponse("t4", v, correct)}
        />
        <p className="prompt">
          5. <em>(do Capítulo 4)</em> Se colocar no ritmo vem antes de guiar?
        </p>
        <OptionGroup
          name="t5"
          options={[
            { value: "si", label: "Sim", correct: true },
            { value: "no", label: "Não", correct: false },
          ]}
          selected={answers.t5}
          onPick={(v, correct) => setResponse("t5", v, correct)}
        />
        <p className="prompt">
          6. «Muito bem» dito com voz sem entonação, olhando para outro lugar, funciona como
          incentivo?
        </p>
        <OptionGroup
          name="t6"
          options={[
            { value: "no", label: "Não — a criança percebe que a atenção estava em outro lugar", correct: true },
            { value: "si", label: "Sim, a palavra conta de qualquer jeito", correct: false },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">
          7. Em uma emergência real, é errado dizer «pare!» em vez de reformular em forma
          positiva?
        </p>
        <OptionGroup
          name="t7"
          options={[
            { value: "si", label: "Sim, a regra vale sempre", correct: false },
            { value: "no", label: "Não — em uma emergência real a clareza imediata importa mais", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">
          8. Um garoto de 14 anos recebe um elogio verdadeiro, mas dito com tom mecânico, braços
          cruzados, olhar em outro lugar. Como ele provavelmente vive isso?
        </p>
        <OptionGroup
          name="t8"
          options={[
            { value: "abitudine", label: "Como algo dito por hábito, não um reconhecimento de verdade", correct: true },
            { value: "sincero", label: "Como um elogio sincero — as palavras certas bastam de qualquer jeito", correct: false },
          ]}
          selected={answers.t8}
          onPick={(v, correct) => setResponse("t8", v, correct)}
        />
        <p className="prompt">
          9. Um incentivo específico bem dado sobre um erro «vale» também para o erro técnico
          seguinte, no mesmo minuto?
        </p>
        <OptionGroup
          name="t9"
          options={[
            { value: "si", label: "Sim, o efeito se estende automaticamente", correct: false },
            { value: "no", label: "Não — cada nova instrução precisa ser construída de novo, positiva e coerente", correct: true },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. Você precisa corrigir uma criança de 8 anos que dobra os cotovelos de forma
          incorreta durante a braçada. Escreva a instrução, em forma positiva, em uma única
          frase.
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
          Você respondeu que as palavras contam mesmo só 7%. Esse número circula muito, mas vem
          de um estudo sobre um caso bem específico — não é uma lei geral da comunicação. O que é
          verdade, e é útil, é outra coisa: quando palavras e corpo se contradizem, vence o
          corpo.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          O feedback nunca diz só «você errou»: diz o que observar na próxima vez. O tom é sempre
          sobre o comportamento observado, nunca sobre a pessoa (veja o Capítulo 7, que vai
          retomar justamente essa regra).
        </p>
      </>
    ),
  },

  // 8 — recuperação: só se a prova de sexta-feira tiver muitos erros (§12, D25/D27)
  {
    day: "recuperação",
    pct: 90,
    nextLabel: "Continuar ▸",
    showBack: true,
    visible: (a) => {
      const corrette: Record<string, string> = {
        t1: "no", t2: "no", t3: "corpo", t4: "bersaglio", t5: "si",
        t6: "no", t7: "no", t8: "abitudine", t9: "no",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperação — só porque a prova encontrou alguma dificuldade</div>
        <h1>Três frases em forma negativa, reescritas de verdade</h1>
        <p className="lede">
          Não é um fracasso: é só o sinal de que vale a pena treinar mais o automatismo mais
          delicado deste capítulo — porque suavizar uma proibição não é a mesma coisa que dar um
          alvo.
        </p>

        <div className="card scene">
          <div className="who">Uma criança de costas, a cabeça escorregando para trás</div>
          <p>
            O instrutor repetiu por dois turnos «não jogue a cabeça para trás» — nada muda. Tente
            reformular em forma positiva.
          </p>
        </div>
        <p className="prompt">Qual das duas dá de verdade um alvo, e não só uma proibição mais gentil?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "morbida", label: "«Tenta não jogar tanto para trás»", correct: false },
            {
              value: "mento",
              label: "«Queixo em direção ao peito, olhe para os dedos dos pés»",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Uma menina de peito, as pernas rígidas em tesoura</div>
          <p>
            O instrutor disse «não deixe as pernas rígidas» três vezes seguidas — as pernas
            continuam iguais.
          </p>
        </div>
        <p className="prompt">Qual das duas funciona melhor?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "irrigidire", label: "«Tenta não deixá-las tão rígidas»", correct: false },
            {
              value: "pedala",
              label: "«Pernas soltas, como se você pedalasse devagar numa bicicleta»",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Um garoto de crawl, sem fôlego na metade da piscina</div>
          <p>
            Prende a respiração por braçadas inteiras, depois emerge ofegante. O instrutor
            tentou com «não prenda a respiração» — nenhuma mudança.
          </p>
        </div>
        <p className="prompt">Qual frase dá a ele um alvo para executar, não só uma proibição?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "trattenerlo", label: "«Tenta não prender por muito tempo»", correct: false },
            {
              value: "candela",
              label: "«Solte o ar devagar debaixo d'água, como se estivesse soprando uma vela distante»",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Uma frase em forma positiva não é só uma versão mais gentil da proibição: é um alvo
          diferente, na direção do qual o corpo se move sozinho.
        </p>
      </>
    ),
  },

  // 9 — sexta-feira: resultado
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
                <td style={{ padding: "6px 0" }}>A instrução reescrita no §7</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>O jeito como você falou com o Davide no §8, nos dois momentos</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>O relato de segunda-feira sobre o Capítulo 4</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Congruência e instruções</td>
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
        <div className="done-badge">✓ Capítulo 5 concluído</div>
        <div className="eyebrow">Semana 5 de 10 · Capítulo 6 chegando</div>
        <h1>Fazer agir, e ver se chegou</h1>
        <p className="lede">
          Hoje você aprendeu a dizer as coisas direito. Na semana que vem você aprende que isso
          não basta: a comunicação não termina quando a criança escuta, termina quando ela faz.
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
          <div className="chip acquisita">
            <span className="name">5 · Instruções e congruência</span>
            <span className="state">adquirida</span>
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
