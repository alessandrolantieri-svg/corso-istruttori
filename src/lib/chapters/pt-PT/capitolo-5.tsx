import { OptionGroup } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Tradução em português europeu, não um capítulo independente: mesmos chapterId/chaves de
// resposta/valores internos do capítulo italiano (src/lib/chapters/capitolo-5.tsx) — só muda o
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

const DIARY_KEYS = ["q2", "q7", "q7b", "qtrasf", "t10"];

export const capitolo5StepsPtPT: Step[] = [
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
        <h1>O que lhe digo, e como o faço ver?</h1>
        <p className="lede">
          O instrutor dá instruções pela positiva — diz o que fazer, não o que não fazer — e
          assegura-se de que palavras, tom e corpo dizem a mesma coisa.
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
        <h1>Como correu na piscina?</h1>
        <p className="lede">
          Na semana passada: com a criança mais fechada — ou mais agitada — do grupo, puseste-te ao
          seu ritmo durante um minuto antes de lhe pedires algo. O que reparaste — nela, ou em ti?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidação — o Capítulo 4 volta</h2>
        <p className="prompt">1. Pôr-se ao ritmo da criança vem antes ou depois de a guiar?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "prima", label: "Antes", correct: true },
            { value: "dopo", label: "Depois", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. Uma criança eufórica: o primeiro movimento é acalmá-la logo?</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "si", label: "Sim — se não a acalmares logo, arriscas perder o controlo", correct: false },
            { value: "no", label: "Não — primeiro acompanha-se por um momento, depois guia-se", correct: true },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">3. A sintonia serve para te fazeres ouvir ou para te fazeres apreciar?</p>
        <OptionGroup
          name="k3"
          options={[
            { value: "ascoltare", label: "Fazer-te ouvir — é uma competência profissional", correct: true },
            { value: "apprezzare", label: "Fazer-te apreciar — se agradar ao instrutor, ouve mais", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">
          4. Pôr-se ao ritmo funciona só com quem se fecha, nunca com quem se acende?
        </p>
        <OptionGroup
          name="k4"
          options={[
            { value: "vero", label: "Verdadeiro — com quem já está agitado, acompanhá-lo agita-o mais", correct: false },
            { value: "falso", label: "Falso — funciona da mesma forma, ao contrário, com quem está agitado", correct: true },
          ]}
          selected={answers.k4}
          onPick={(v, correct) => setResponse("k4", v, correct)}
        />
        <p className="prompt">5. Uma criança que te seguia bem fecha-se de novo a meio do turno. O que fazes?</p>
        <OptionGroup
          name="k5"
          options={[
            { value: "torni", label: "Voltas atrás um passo: encontras o ritmo dela de novo", correct: true },
            { value: "insisti", label: "Insistes — até há pouco corria tudo bem", correct: false },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. Com uma adolescente distante, a sintonia constrói-se da mesma forma que com uma
          criança de 6 anos?
        </p>
        <OptionGroup
          name="k6"
          options={[
            { value: "si", label: "Sim, exatamente da mesma forma", correct: false },
            { value: "no", label: "Não — a forma muda com a idade, a ordem mantém-se igual", correct: true },
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
    pct: 30,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Terça-feira</div>
        <h1>Um alvo, não um obstáculo</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Agora que te ouve, o que lhe dizes — e como — faz toda a diferença.
        </p>
        <p className="lede">
          <strong>A instrução pela positiva.</strong> «Não dobres as pernas» diz só o que não
          fazer — e deixa todo o resto em aberto: a criança podia mantê-las rígidas como uma tábua,
          ou não as mexer nada, e a instrução continuava, mesmo assim, «cumprida». Tiraste-lhe só
          uma coisa a não fazer, entre mil possíveis, mas não lhe disseste o que fazer de verdade.
          «Pernas direitas como um pau» dá-lhe, pelo contrário, uma única coisa precisa a fazer: é
          o único movimento que o corpo consegue mesmo executar para obedecer.
        </p>
        <p className="lede">
          <strong>Uma razão a mais, específica da água.</strong> Um movimento aprende-se melhor
          quando a atenção está em o que deve acontecer fora do corpo — a água a empurrar para
          trás, a parede a alcançar — não em qual músculo mexer: muitos estudos confirmam-no,
          sempre da mesma forma. «Empurra a água para trás» produz uma braçada melhor do que
          «estica o cotovelo», mesmo descrevendo o mesmo movimento exato.
        </p>
        <p className="lede">
          <strong>A coerência entre palavras, voz e corpo.</strong> Já deves ter ouvido que as
          palavras contam 7%, o tom 38%, o corpo 55%. Não é verdade — esse estudo dizia respeito a
          um caso muito restrito: pessoas que ouviam uma única palavra dita de formas diferentes e
          tinham de adivinhar um sentimento, não a comunicação em geral. Se fosse assim, poderias
          ensinar a nadar numa língua desconhecida e funcionaria na mesma 93% das vezes — não é o
          caso.
        </p>
        <div className="card quote">
          Quando as palavras dizem uma coisa e o corpo diz outra, a criança acredita no corpo — não
          porque «conte mais» em geral, mas porque as palavras controlam-se facilmente, enquanto o
          corpo não: é mais difícil fingi-lo.
        </div>
        <p className="lede">
          <strong>E quando a proibição parece inevitável?</strong> Numa emergência real — uma
          criança a correr em direção à berma escorregadia — um «para!» seco é o movimento certo:
          ninguém para para reformular pela positiva. Fora disso, se tiveres sequer um segundo para
          escolher as palavras, vale a pena gastá-lo num alvo em vez de numa proibição.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controlo de fim de dia</h2>
        <p className="prompt">1. «Não dobres as pernas» dá ao corpo um alvo ou um obstáculo?</p>
        <OptionGroup
          name="m1"
          options={[
            { value: "bersaglio", label: "Um alvo — indica na mesma qual perna mexer", correct: false },
            { value: "ostacolo", label: "Um obstáculo a evitar — menos eficaz do que um alvo", correct: true },
          ]}
          selected={answers.m1}
          onPick={(v, correct) => setResponse("m1", v, correct)}
        />
        <p className="prompt">2. Porque é que o corpo «ganha» às palavras quando se contradizem?</p>
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
          3. Numa emergência real — uma criança a correr em direção a uma berma escorregadia —
          continua a ser errado dizer «para!» em vez de reformular pela positiva?
        </p>
        <OptionGroup
          name="m3"
          options={[
            { value: "si", label: "Sim, a regra vale sempre, mesmo em emergência", correct: false },
            { value: "no", label: "Não — numa emergência real a clareza imediata conta mais", correct: true },
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
          <div className="who">«Muito bem!», dito a olhar para o relógio</div>
          <p>
            Um instrutor diz «muito bem!» a uma criança — mas a olhar para o relógio, voz plana, já
            virado para o próximo. A criança ouve a palavra certa, mas não se sente encorajada:
            percebeu que a atenção já estava noutro lado.
          </p>
          <p>
            <strong>Correto:</strong> o instrutor para um segundo, vira-se, olha para a criança,
            diz «muito bem» com um tom que sobe. Três segundos, não trinta — mas todos os três
            alinhados.
          </p>
        </div>
        <div className="card scene">
          <div className="who">«Não afundes a cabeça», repetido sem efeito</div>
          <p>
            Uma criança de 7 anos continua a afundar a cabeça, apesar de o instrutor repetir «não
            afundes a cabeça». O instrutor muda de frase, não de tom: «mantém uma orelha dentro e
            uma fora, como se estivesses a escutar às escondidas.» Na braçada seguinte, a cabeça
            fica mais alta.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Um jovem de 14 anos</div>
          <p>
            Acabou de melhorar muito o tempo numa piscina. O instrutor diz «bom trabalho», mas com
            os braços cruzados, olhar já no cronómetro, tom mecânico. O jovem baixa o olhar,
            afasta-se sem expressão: aos 14 anos, um elogio dito assim parece uma frase dita por
            hábito, sem pensar nisso — não um reconhecimento verdadeiro — e magoa mais do que o
            silêncio. Da vez seguinte, o instrutor corrige-se: para, olha-o nos olhos, diz «cortaste
            três segundos, também sentiste isso?» — desta vez o jovem sorri um pouco, porque desta
            vez o instrutor estava mesmo ali.
          </p>
        </div>
        <p className="lede">
          <strong>
            Três cenas, a mesma regra por baixo: as palavras abrem a porta, mas é a coerência com a
            voz e o corpo que a mantém aberta — aos 7 anos como aos 14.
          </strong>
        </p>
        <p className="prompt">Reescreve pela positiva: «Não afundes a cabeça quando respiras.»</p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: o sistema procura uma instrução que
            descreva o que fazer — não uma versão mais educada da mesma proibição. */}
        <h2>Simulação</h2>
        <p className="lede">
          <strong>DAVIDE, 9 anos.</strong> Acabou de completar pela primeira vez uma piscina inteira
          de bruços. O que lhe dizes?
        </p>
        <OptionGroup
          name="sim"
          options={[
            { value: "generico", label: "«Muito bem, vá, avançamos» — a correr" },
            {
              value: "specifico",
              label: "Paras, olhas para ele: «paraste para respirar sem afundar, conseguiste tu sozinho»",
            },
          ]}
          selected={answers.sim}
          onPick={(v) => setResponse("sim", v)}
        />
        {answers.sim === "generico" && (
          <div className="feedback retry">
            DAVIDE: <em>(afasta-se, não parece particularmente satisfeito)</em> «...ok.»
          </div>
        )}
        {answers.sim === "specifico" && (
          <div className="feedback ok">
            DAVIDE: <em>(sorri, fica ali mais um momento)</em> «...a sério? Fiz bem?»
            <br />
            Não é o tamanho da frase que faz a diferença: é a especificidade, e o facto de teres
            parado.
          </div>
        )}
        {answers.sim === "specifico" && (
          <div>
            <p className="lede" style={{ marginTop: 14 }}>
              Um instante depois, o Davide parte para uma segunda volta — mas desta vez dobra
              demasiado os braços, um erro técnico novo, nunca corrigido antes com ele.
            </p>
            <p className="prompt">
              Escreve a instrução que lhe dás agora — pela positiva, tom e corpo coerentes.
            </p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={[
                { value: "negativo", label: "Voltas a uma instrução pela negativa, ou dize-la distraidamente" },
                { value: "positivo", label: "Dás uma imagem positiva, parando para o olhar" },
              ]}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "negativo" && (
              <div className="feedback retry">
                DAVIDE tenta de novo, mas o erro mantém-se idêntico — não recebeu um alvo a
                alcançar, só mais uma proibição.
              </div>
            )}
            {answers.sim2 === "positivo" && (
              <div className="feedback ok">
                DAVIDE estica os braços um pouco mais na tentativa seguinte — pequeno, mas na
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
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controlo de fim de dia — transferência</div>
        <h1>Um erro nunca encontrado antes</h1>
        <p className="lede">
          Uma criança continua a manter os dedos abertos durante a braçada, em vez de unidos.
          Tens de lhe dar uma instrução nova — ainda não tentaste nada com ela.
        </p>
        <p className="prompt">
          Escreve a instrução, pela positiva, e tenta imaginar como a dirias — tom e corpo
          incluídos — de forma a que os três estejam coerentes.
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: não é um dos exemplos já vistos — é
            intencional. O sistema verifica se aplica a regra a um erro técnico nunca encontrado no
            capítulo, não só se se lembra das frases já lidas. */}
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
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> O teu turno na piscina</div>
        <h1>Uma instrução, parando para olhar</h1>
        <p className="lede">
          Esta semana, dá uma única instrução pela positiva — diz o que fazer, nunca o que não
          fazer — e para um segundo enquanto a dizes: olha para a criança, não para o relógio, não
          para o grupo.
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
    canNext: (a) =>
      ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Sexta-feira — teste cumulativo: Capítulo 4 + Capítulo 5</div>
        <h1>O teste</h1>
        <p className="prompt">1. «Não dobres as pernas» é uma boa instrução?</p>
        <OptionGroup
          name="t1"
          options={[
            { value: "no", label: "Não — é melhor dizer o que fazer", correct: true },
            { value: "si", label: "Sim, é clara — diz na mesma o que evitar", correct: false },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. É verdade que as palavras contam só 7% da comunicação?</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "si", label: "Sim, é uma lei geral", correct: false },
            { value: "no", label: "Não — esse estudo dizia respeito a um caso muito específico", correct: true },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">3. Quando as palavras e o corpo dizem coisas diferentes, a criança acredita em quê?</p>
        <OptionGroup
          name="t3"
          options={[
            { value: "parole", label: "Nas palavras — são a mensagem explícita, logo a mais fiável", correct: false },
            { value: "corpo", label: "No corpo — é o sinal mais difícil de falsificar", correct: true },
          ]}
          selected={answers.t3}
          onPick={(v, correct) => setResponse("t3", v, correct)}
        />
        <p className="prompt">4. Uma instrução pela positiva dá ao corpo um alvo ou um obstáculo?</p>
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
          5. <em>(do Capítulo 4)</em> Pôr-se ao ritmo vem antes de guiar?
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
          6. «Muito bem» dito com voz plana, a olhar para outro lado, funciona como encorajamento?
        </p>
        <OptionGroup
          name="t6"
          options={[
            { value: "no", label: "Não — a criança percebe que a atenção estava noutro lado", correct: true },
            { value: "si", label: "Sim, a palavra conta na mesma", correct: false },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">
          7. Numa emergência real, é errado dizer «para!» em vez de reformular pela positiva?
        </p>
        <OptionGroup
          name="t7"
          options={[
            { value: "si", label: "Sim, a regra vale sempre", correct: false },
            { value: "no", label: "Não — numa emergência real a clareza imediata conta mais", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">
          8. Um jovem de 14 anos recebe um elogio verdadeiro mas dito com tom mecânico, braços
          cruzados, olhar noutro lado. Como o vive mais provavelmente?
        </p>
        <OptionGroup
          name="t8"
          options={[
            { value: "abitudine", label: "Como algo dito por hábito, não um reconhecimento verdadeiro", correct: true },
            { value: "sincero", label: "Como um elogio sincero, as palavras bastam", correct: false },
          ]}
          selected={answers.t8}
          onPick={(v, correct) => setResponse("t8", v, correct)}
        />
        <p className="prompt">
          9. Um encorajamento específico bem dado sobre um erro «vale» também para o erro técnico
          seguinte, no mesmo minuto?
        </p>
        <OptionGroup
          name="t9"
          options={[
            { value: "si", label: "Sim, o efeito estende-se automaticamente", correct: false },
            { value: "no", label: "Não — cada nova instrução tem de ser construída de novo, positiva e coerente", correct: true },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. Tens de corrigir uma criança de 8 anos que dobra os cotovelos de forma incorreta
          durante a braçada. Escreve a instrução, pela positiva, numa única frase.
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
          Respondeste que as palavras contam mesmo só 7%. Esse número circula muitíssimo, mas vem
          de um estudo sobre um caso muito restrito — não é uma lei geral da comunicação. O que é
          verdade, e é útil, é outra coisa: quando as palavras e o corpo se contradizem, ganha o
          corpo.
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
        t1: "no", t2: "no", t3: "corpo", t4: "bersaglio", t5: "si",
        t6: "no", t7: "no", t8: "abitudine", t9: "no",
      };
      const erradas = Object.entries(corretas).filter(([k, v]) => a[k] !== v).length;
      return erradas >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperação — só porque o teste encontrou alguma dificuldade</div>
        <h1>Três frases pela negativa, reescritas a sério</h1>
        <p className="lede">
          Não é um fracasso: é só o sinal de que vale a pena treinar mais o automatismo mais
          delicado deste capítulo — porque suavizar uma proibição não é o mesmo que dar um alvo.
        </p>

        <div className="card scene">
          <div className="who">Uma criança de costas, a cabeça a escorregar para trás</div>
          <p>
            O instrutor repetiu, durante dois turnos, «não deites a cabeça tanto para trás» — nada
            muda. Tenta reformulá-la pela positiva.
          </p>
        </div>
        <p className="prompt">Qual das duas dá mesmo um alvo, e não só uma proibição mais gentil?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "morbida", label: "«Tenta não a deitar tanto para trás»", correct: false },
            {
              value: "mento",
              label: "«Queixo em direção ao peito, olha para os dedos dos pés»",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Uma menina a bruços, as pernas rígidas em tesoura</div>
          <p>
            O instrutor disse «não mantenhas as pernas rígidas» três vezes seguidas — as pernas
            continuam iguais.
          </p>
        </div>
        <p className="prompt">Qual das duas funciona melhor?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "irrigidire", label: "«Tenta não as enrijecer demasiado»", correct: false },
            {
              value: "pedala",
              label: "«Pernas moles, como se estivesses a pedalar devagar numa bicicleta»",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Um jovem em crol, sem fôlego a meio da piscina</div>
          <p>
            Prende a respiração durante braçadas inteiras, depois emerge ofegante. O instrutor
            tentou com «não prendas a respiração» — nenhuma mudança.
          </p>
        </div>
        <p className="prompt">Qual frase lhe dá um alvo a executar, não só uma proibição?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "trattenerlo", label: "«Tenta não a prender demasiado tempo»", correct: false },
            {
              value: "candela",
              label: "«Sopra devagar debaixo de água, como se soprasses uma vela ao longe»",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Uma frase pela positiva não é só uma versão mais gentil da proibição: é um alvo
          diferente, em direção ao qual o corpo se move sozinho.
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
                <td style={{ padding: "6px 0" }}>A instrução reescrita no §7</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>O modo como falaste ao Davide no §8, nos dois momentos</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>O relato de segunda-feira sobre o Capítulo 4</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
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

  // 10 — painel
  {
    day: "painel",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ vakProfile, answers }: StepContext) => (
      <>
        <div className="done-badge">✓ Capítulo 5 concluído</div>
        <div className="eyebrow">Semana 5 de 10 · Capítulo 6 a chegar</div>
        <h1>Fazê-la agir, e ver se chegou</h1>
        <p className="lede">
          Hoje aprendeste a dizer bem as coisas. Na próxima semana aprendes que não basta: a
          comunicação não acaba quando a criança ouve, acaba quando faz.
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
