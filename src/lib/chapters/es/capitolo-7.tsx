import { OptionGroup, type Option } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

function Field({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      className="field"
      id={id}
      placeholder="Escribe aquí..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

const K_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "k1",
    prompt: "1. «¿Entendiste?» ¿es una buena comprobación?",
    options: [
      { value: "no", label: "No — casi todos dicen que sí, pase lo que pase", correct: true },
      { value: "si", label: "Sí — si se lo preguntas con voz firme, el niño responde con sinceridad", correct: false },
    ],
  },
  {
    key: "k2",
    prompt: "2. La secuencia correcta es:",
    options: [
      { value: "ascolta", label: "Comunico → el niño escucha, y con el tiempo lo entiende solo", correct: false },
      { value: "fa", label: "Comunico → entiende → hace", correct: true },
    ],
  },
  {
    key: "k3",
    prompt: "3. Un niño dice «entendí» con seguridad. ¿Lo dejas hacer todo el ejercicio de una vez?",
    options: [
      { value: "no", label: "No — antes, un intento corto, observado", correct: true },
      { value: "si", label: "Sí — si lo dice con seguridad, el intento corto no hace falta", correct: false },
    ],
  },
  {
    key: "k4",
    prompt: "4. Con un niño de 4 años, ¿la comprobación correcta es preguntarle si entendió?",
    options: [
      { value: "si", label: "Sí — a esa edad basta con preguntárselo con palabras simples", correct: false },
      { value: "no", label: "No — un pequeño encargo inmediato: «enséñamelo ahora»", correct: true },
    ],
  },
  {
    key: "k5",
    prompt: "5. El primer intento observado no es claramente correcto ni claramente incorrecto. ¿Qué haces?",
    options: [
      { value: "secondo", label: "Miras un segundo intento, o haces el primero más claro", correct: true },
      { value: "chiedo", label: "Vuelves a preguntar «¿entendiste?», total ya respondió una vez", correct: false },
    ],
  },
  {
    key: "k6",
    prompt: "6. Después de dar una corrección, ¿la comprobación ya está completa?",
    options: [
      { value: "si", label: "Sí, la corrección sola ya basta, no hace falta nada más", correct: false },
      { value: "no", label: "No — la corrección también hay que comprobarla con la acción", correct: true },
    ],
  },
];

const M_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "m1",
    prompt: "1. «Estás distraído» ¿describe un momento o etiqueta a la persona?",
    options: [
      { value: "persona", label: "Etiqueta a la persona", correct: true },
      { value: "momento", label: "Describe solo lo que hizo en ese momento, no quién es", correct: false },
    ],
  },
  {
    key: "m2",
    prompt: "2. Un niño tragó agua durante el ejercicio. ¿Qué le pasó?",
    options: [
      { value: "fallito", label: "Se equivocó en el ejercicio, y hay que corregirlo enseguida", correct: false },
      { value: "veloce", label: "Intentó ir más rápido de lo que su cuerpo aguantaba todavía", correct: true },
    ],
  },
  {
    key: "m3",
    prompt: "3. Un intento mejora un detalle pero pierde otro. La respuesta correcta es:",
    options: [
      { value: "entrambe", label: "Nombrar las dos cosas, de forma específica", correct: true },
      { value: "uno", label: "Elegir solo elogio, o solo corrección, para no confundir", correct: false },
    ],
  },
];

const SIM_OPTIONS: Option[] = [
  { value: "persona", label: "«No prestas atención, tienes que esforzarte más»" },
  { value: "comportamento", label: "«Los brazos se abrieron demasiado pronto, mantenlos juntos un poco más»" },
];

const SIM2_OPTIONS: Option[] = [
  { value: "generico", label: "«¡Muy bien, mucho mejor!» — solo un elogio genérico" },
  { value: "entrambe", label: "Nombras tanto la mejora como el nuevo detalle, los dos de forma específica" },
];

const T_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "t1",
    prompt: "1. ¿«Estás distraído» y «ahora mismo mirabas la ventana» son lo mismo?",
    options: [
      { value: "si", label: "Sí — son dos formas distintas de decir lo mismo", correct: false },
      { value: "no", label: "No — la primera etiqueta a la persona, la segunda describe un momento", correct: true },
    ],
  },
  {
    key: "t2",
    prompt: "2. ¿«Muy bien» es un buen cumplido?",
    options: [
      { value: "no", label: "Es agradable, pero no enseña nada", correct: true },
      { value: "si", label: "Sí — es breve, pero el niño igual entiende qué hizo bien", correct: false },
    ],
  },
  {
    key: "t3",
    prompt: "3. Un niño tragó agua durante el ejercicio. ¿Es un fracaso?",
    options: [
      { value: "si", label: "Sí — tragar agua durante el ejercicio significa que no puede con él", correct: false },
      { value: "no", label: "No — es información", correct: true },
    ],
  },
  {
    key: "t4",
    prompt: "4. Un cumplido vago se olvida, uno específico...",
    options: [
      { value: "ripete", label: "Se repite — el niño sabe qué hizo para merecerlo", correct: true },
      { value: "uguale", label: "También se olvida, no hay diferencia — el niño lo recuerda igual", correct: false },
    ],
  },
  {
    key: "t5",
    prompt: "5. (del Capítulo 6) «¿Entendiste?» ¿es una buena comprobación?",
    options: [
      { value: "si", label: "Sí — si responde enseguida, quiere decir que entendió bien", correct: false },
      { value: "no", label: "No — hasta quien no entendió suele responder que sí", correct: true },
    ],
  },
  {
    key: "t6",
    prompt: "6. ¿La respuesta vaga le hace daño al niño?",
    options: [
      { value: "vuoto", label: "No le hace daño, pero no enseña nada", correct: true },
      { value: "male", label: "Sí, siempre — un niño que siempre oye el mismo comentario se apaga", correct: false },
    ],
  },
  {
    key: "t7",
    prompt: "7. Un intento mejora un detalle pero pierde otro. La respuesta correcta es:",
    options: [
      { value: "uno", label: "Elegir solo elogio, o solo corrección, para mantenerlo simple", correct: false },
      { value: "entrambe", label: "Nombrar las dos cosas, de forma específica", correct: true },
    ],
  },
  {
    key: "t8",
    prompt: "8. Con un adolescente, ¿un cumplido específico dicho con tono de porrista («¡genial, campeón!») funciona igual que con un niño pequeño?",
    options: [
      { value: "no", label: "No — a esa edad el tono importa tanto como el contenido: respetuoso, no de porrista", correct: true },
      { value: "si", label: "Sí, el entusiasmo funciona a cualquier edad", correct: false },
    ],
  },
  {
    key: "t9",
    prompt: "9. Si das una corrección y el niño mejora solo en parte, ¿basta un elogio genérico en el siguiente intento?",
    options: [
      { value: "si", label: "Sí, lo importante es animar", correct: false },
      { value: "no", label: "No — también hay que nombrar el detalle nuevo que aún falta corregir", correct: true },
    ],
  },
];

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo7StepsEs: Step[] = [
  // 0 — portada
  {
    day: "inicio",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 7 · EL FEEDBACK</div>
        <h1>¿Qué le digo después de que lo intenta?</h1>
        <p className="lede">
          El instructor da una respuesta — positiva o de corrección — describiendo el
          comportamiento observado, nunca etiquetando a la persona.
        </p>
      </>
    ),
  },

  // 1 — lunes: reflexión + consolidación Capítulo 6
  {
    day: "lunes · 10 min",
    pct: 12,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lunes</div>
        <h1>¿Cómo te fue en la piscina?</h1>
        <p className="lede">
          La semana pasada: un turno entero sin preguntarle a nadie «¿entendiste?». ¿Qué mirabas
          en su lugar, y qué descubriste?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidación — vuelve el Capítulo 6</h2>
        {K_QUESTIONS.map((q) => (
          <div key={q.key}>
            <p className="prompt">{q.prompt}</p>
            <OptionGroup name={q.key} options={q.options} selected={answers[q.key]} onPick={(v, correct) => setResponse(q.key, v, correct)} />
          </div>
        ))}
      </>
    ),
  },

  // 2 — martes: describir el comportamiento, no etiquetar a la persona
  {
    day: "martes · 13 min",
    pct: 30,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Martes</div>
        <h1>Lo que hizo, no quién es</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Viste la acción. Ahora: ¿qué le dices — después, cuando salió bien, y cuando no?
        </p>
        <p className="lede">
          «Estás distraído» habla de él como persona. «Ahora mismo mirabas la ventana» habla solo
          de lo que pasó en ese momento. Si repites la primera frase seguido, se convierte en una
          etiqueta que el niño carga consigo: al final deja de intentar demostrar lo contrario,
          porque es más fácil convertirse en lo que le dices que es. La segunda frase, en cambio,
          describe un momento preciso, que puede cambiar ya en el próximo intento.
        </p>
        <p className="lede">
          <strong>Vale también para los cumplidos.</strong> «Eres bueno» es agradable pero no
          enseña nada. «Mantuviste las piernas rectas durante todo el largo» le dice exactamente
          qué repetir.
        </p>
        <div className="card quote">
          Un niño que tragó agua durante el ejercicio no «se equivocó»: intentó ir más rápido de
          lo que su cuerpo estaba listo para aguantar todavía. Dicho así, el error se convierte en
          información para usar — no en una culpa que pagar.
        </div>
        <p className="lede">
          Incluso un cumplido genérico puede hacer tanto daño como una crítica genérica. Parece
          inofensivo — a nadie le molesta un «muy bien» — pero un niño que solo oye elogios vagos,
          capítulo tras capítulo, deja de saber qué es lo que realmente lo hace bueno. La respuesta
          vaga no hace daño: simplemente no enseña nada, y de todos modos es tiempo gastado sin
          construir nada.
        </p>
        <p className="lede">
          <strong>Y cuando el intento queda a mitad de camino</strong> — ¿ni claramente logrado ni
          claramente equivocado? Pasa más a menudo de lo que parece: un niño que mejora un detalle
          pero pierde otro. La tentación es elegir un solo mensaje — todo elogio, o toda corrección
          — pero ninguno de los dos es del todo cierto. La respuesta correcta nombra las dos cosas,
          siempre de forma específica: «mantuviste los brazos extendidos, eso es nuevo y está muy
          bien — pero la cabeza bajó un poco antes de tiempo, intenta mantenerla arriba un poco
          más.»
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Control de fin de día</h2>
        {M_QUESTIONS.map((q) => (
          <div key={q.key}>
            <p className="prompt">{q.prompt}</p>
            <OptionGroup name={q.key} options={q.options} selected={answers[q.key]} onPick={(v, correct) => setResponse(q.key, v, correct)} />
          </div>
        ))}
      </>
    ),
  },

  // 3 — miércoles: escenas + aplicación + simulación Tommaso (dos intentos)
  {
    day: "miércoles",
    pct: 46,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.sim && !!a.sim2,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Miércoles</div>
        <h1>Un cumplido vago se olvida</h1>
        <div className="card scene">
          <div className="who">Un niño de 9 años, «¡pero no prestas atención!»</div>
          <p>
            Sigue girando la cabeza demasiado tarde. A la tercera vez, el instructor dice «¡pero
            no prestas atención!» — el niño se cierra, se frena. Si hubiera dicho «giraste la
            cabeza un momento después del brazo — intenta girarla junto con el brazo, no
            después», el niño habría tenido una información precisa, sin etiqueta de la que
            defenderse.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Un niño de 11 años, el salto perfecto</div>
          <p>
            Completa por primera vez un salto de salida correcto. El instructor, con prisa, dice
            «¡muy bien!» sin detenerse. El niño no sabría decir qué hizo diferente — y en la
            próxima salida vuelve al movimiento anterior. Detenerse tres segundos — «te estiraste
            bien de los brazos, eso fue lo que cambió todo» — le habría dicho qué repetir.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Un chico de 16 años</div>
          <p>
            Acaba de mejorar el tiempo en un viraje, después de semanas por detrás del grupo. En
            el Capítulo 2 ya viste el error que hay que evitar: tratar a un adolescente con un
            tono de niño pequeño hace que se sienta ridiculizado. Por eso el instructor no dice
            «¡genial, campeón!». Dice, con tono normal, casi técnico: «empujaste con las piernas
            un momento antes del toque, ahí ganaste el tiempo.» El chico asiente, no sonríe de
            forma exagerada — pero la próxima vez repite el mismo movimiento a propósito.{" "}
            <strong>
              Lo específico funciona a cualquier edad — pero a los 16 el tono con el que es
              específico importa tanto como el contenido: respetuoso, no de porrista.
            </strong>
          </p>
        </div>
        <p className="lede">
          <strong>Tres escenas, la misma regla: nunca una etiqueta, nunca un elogio genérico —
          siempre el comportamiento preciso, a cualquier edad.</strong>
        </p>
        <p className="prompt">
          Un niño de 10 años acaba de completar por primera vez un salto de salida correcto,
          después de semanas de intentos. Escribe la respuesta que le darías — específica, sobre
          el comportamiento.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota para la corrección, no mostrada al instructor: el sistema busca una respuesta que
            nombre exactamente qué pasó, no un elogio genérico. */}
        <h2>Simulación</h2>
        <p className="lede">
          <strong>TOMMASO, 8 años.</strong> Acaba de equivocarse en el mismo ejercicio por segunda
          vez seguida. ¿Qué le dices?
        </p>
        <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
        {answers.sim === "persona" && (
          <div className="feedback retry">
            TOMMASO: <em>(baja la mirada)</em> «...perdón.» <em>(lo hace otra vez, igual que
            antes)</em>
            <br />
            Se disculpó, pero no recibió ninguna información sobre qué cambiar.
          </div>
        )}
        {answers.sim === "comportamento" && (
          <div className="feedback ok">
            TOMMASO: «Ah, vale» <em>(lo intenta de nuevo, cambiando algo)</em>
            <br />
            Recibió una instrucción precisa, y la usa.
          </div>
        )}
        {answers.sim && (
          <>
            <p className="lede" style={{ marginTop: 14 }}>
              Tommaso lo intenta de nuevo: los brazos se mantienen juntos más tiempo, una mejora
              real — pero ahora es la cabeza la que gira un poco demasiado pronto, un detalle
              nuevo, nunca corregido antes con él.
            </p>
            <p className="prompt">Escribe la respuesta que le das ahora.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup name="sim2" options={SIM2_OPTIONS} selected={answers.sim2} onPick={(v) => setResponse("sim2", v)} />
            {answers.sim2 === "generico" && (
              <div className="feedback retry">
                TOMMASO sonríe, pero en el siguiente intento la cabeza sigue girando demasiado
                pronto — no sabe que todavía hay algo que ajustar.
              </div>
            )}
            {answers.sim2 === "entrambe" && (
              <div className="feedback ok">
                TOMMASO: «...ok, entonces los brazos están bien pero la cabeza no» <em>(lo
                intenta de nuevo, esta vez atento a las dos cosas)</em>
              </div>
            )}
            <p className="lede" style={{ fontSize: ".85rem" }}>
              La respuesta sobre un intento a mitad de camino no es un cumplido debilitado ni una
              corrección disfrazada de elogio: son dos informaciones verdaderas, dichas las dos,
              de forma específica.
            </p>
          </>
        )}
      </>
    ),
  },

  // 4 — miércoles por la noche: transferencia de la regla a la respuesta positiva
  {
    day: "miércoles por la noche",
    pct: 62,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Control de fin de día — transferencia</div>
        <h1>También cuando sale bien</h1>
        <p className="lede">
          Una niña de 7 años acaba de hacer, por primera vez, una entrada al agua sin agarrarse al
          borde. Todavía no has decidido qué decirle.
        </p>
        <p className="prompt">Escribe el cumplido que le harías, específico, no genérico.</p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota para la corrección, no mostrada al instructor: no es la escena ya vista (que era
            sobre un error, no sobre un éxito) — es intencional. El sistema comprueba si aplica la
            misma regla de la especificidad también cuando la respuesta es positiva, no solo
            cuando es de corrección. */}
      </>
    ),
  },

  // 5 — el turno en la piscina
  {
    day: "en la piscina",
    pct: 70,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Tu turno en la piscina</div>
        <h1>Solo el comportamiento, nunca la persona</h1>
        <p className="lede">
          Esta semana, cada respuesta que des — positiva o de corrección — debe nombrar un
          comportamiento preciso, nunca a la persona. Nada de «muy bien» ni de «no prestas
          atención»: solo lo que pasó.
        </p>
      </>
    ),
  },

  // 6 — viernes: examen acumulativo Capítulo 6 + Capítulo 7
  {
    day: "viernes · 11 min",
    pct: 86,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Viernes — examen acumulativo: Capítulo 6 + Capítulo 7</div>
        <h1>El examen</h1>
        {T_QUESTIONS.map((q) => (
          <div key={q.key}>
            <p className="prompt">{q.prompt}</p>
            <OptionGroup name={q.key} options={q.options} selected={answers[q.key]} onPick={(v, correct) => setResponse(q.key, v, correct)} />
          </div>
        ))}
        <p className="prompt">
          10. Un chico de 14 años se equivoca en el mismo error técnico por cuarta vez y empieza a
          mostrar frustración. Escribe la respuesta que le darías.
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 7 — feedback: explica cómo funciona la corrección (§10, D34)
  {
    day: "viernes · feedback",
    pct: 88,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§10 · Feedback</div>
        <h1>Esto es lo que dicen tus respuestas</h1>
        <p className="lede">No sobre ti — sobre lo que hiciste en estas preguntas.</p>
        <p className="lede" style={{ fontSize: ".85rem", fontStyle: "italic" }}>
          Ejemplo de respuesta generada, en caso de error en la pregunta 1:
        </p>
        <div className="card quote">
          Respondiste que son lo mismo. Vuelve a leerlas: una dice quién es él («distraído»), la
          otra dice qué pasó en ese momento («mirabas la ventana»). La segunda se puede corregir
          al momento siguiente. La primera, repetida, se convierte en algo de lo que es difícil
          despegarse.
        </div>
      </>
    ),
  },

  // 8 — recuperación: solo si el examen del viernes tiene demasiados errores (§12, D25/D27)
  {
    day: "recuperación",
    pct: 90,
    nextLabel: "Continuar ▸",
    showBack: true,
    visible: (a) => {
      const correctas: Record<string, string> = {
        t1: "no", t2: "no", t3: "no", t4: "ripete", t5: "no",
        t6: "vuoto", t7: "entrambe", t8: "no", t9: "no",
      };
      const equivocadas = Object.entries(correctas).filter(([k, v]) => a[k] !== v).length;
      return equivocadas >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperación — solo porque el examen encontró alguna dificultad</div>
        <h1>Tres ejemplos más, para entrenar el ojo</h1>
        <p className="lede">
          No es un fracaso: es solo la señal de que vale la pena repasar el punto más delicado de
          este capítulo con algún ejemplo más — describir el comportamiento, no etiquetar a la
          persona, y decirlo de forma específica.
        </p>

        <div className="card scene">
          <div className="who">Un niño de 8 años, el estiramiento perfecto</div>
          <p>
            Por primera vez mantiene los brazos bien extendidos de espalda. El instructor solo le
            dice «¡Genial!» y pasa al siguiente alumno. El niño sonríe, pero en el siguiente largo
            vuelve a la posición anterior.
          </p>
        </div>
        <p className="prompt">¿Qué le faltó a este cumplido?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "niente", label: "Nada — el entusiasmo del «genial» basta para motivarlo", correct: false },
            {
              value: "cosa",
              label: "Saber exactamente qué hizo diferente — sin saberlo, no puede repetirlo",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Una niña de 10 años, el salto a mitad de camino</div>
          <p>
            En el salto de salida, por primera vez mantiene los brazos bien extendidos — una
            novedad. Pero levanta los pies demasiado pronto, un defecto que arrastra desde hace
            semanas. El instructor solo le dice «tienes que tener más cuidado con los pies»,
            ignorando la mejora.
          </p>
        </div>
        <p className="prompt">¿Qué falta en esta respuesta?</p>
        <OptionGroup
          name="rec2"
          options={[
            {
              value: "urgente",
              label: "Está bien así — corregir el defecto que queda es lo más urgente",
              correct: false,
            },
            {
              value: "entrambe",
              label:
                "Falta nombrar también lo que mejoró — los brazos extendidos — no solo el defecto que queda",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Un chico de 15 años, la brazada mejorada</div>
          <p>
            Después de semanas, por fin mejora la brazada. El instructor, entusiasmado, delante de
            todo el grupo, le grita con tono de porrista: «¡Genial, campeón, empujaste buenísimo
            con las piernas!»
          </p>
        </div>
        <p className="prompt">
          El contenido es específico («empujaste buenísimo con las piernas»). ¿Basta con eso a
          esta edad?
        </p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "si", label: "Sí — si el contenido es específico, el tono no importa", correct: false },
            {
              value: "no",
              label:
                "No — a esta edad el tono importa tanto como el contenido: mejor normal y respetuoso, no de porrista",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          El comportamiento descrito con precisión siempre deja algo que repetir. La etiqueta —
          buena o mala — no deja nada que usar.
        </p>
      </>
    ),
  },

  // 9 — resultado
  {
    day: "viernes · resultado",
    pct: 95,
    nextLabel: "Ir al Dashboard ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§11 · Resultado</div>
        <h1>Tu perfil se actualiza</h1>
        <div className="card">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".86rem" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>Puntuación</th>
                <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>De dónde viene</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>knowledge_score</td>
                <td style={{ padding: "6px 0" }}>Las 10 preguntas del examen</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>application_score</td>
                <td style={{ padding: "6px 0" }}>La respuesta escrita en el §7</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Cómo corregiste a Tommaso en el §8, en los dos intentos</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>El relato del lunes sobre el Capítulo 6</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Refuerzo y corrección</td>
                <td style={{ padding: "6px 0" }}>El más bajo de los anteriores</td>
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
        <div className="done-badge">✓ Capítulo 7 completado</div>
        <div className="eyebrow">Semana 7 de 10 · Capítulo 8 próximamente</div>
        <h1>Cambiar de rumbo</h1>
        <p className="lede">
          Hoy aprendiste a dar una buena respuesta. La semana que viene aprendes qué hacer cuando,
          a pesar de todo, lo que dices no funciona de todas formas.
        </p>
        <ChapterVakSection vakProfile={vakProfile} locale="es" />
        <ChapterDiarySection answers={answers} keys={DIARY_KEYS} locale="es" />
        <h2>Tu progreso</h2>
        <div className="chip-grid">
          <div className="chip consolidata">
            <span className="name">1 · Conciencia personal</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip consolidata">
            <span className="name">2 · Reconocimiento del alumno</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip consolidata">
            <span className="name">3 · Observar e interpretar <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip consolidata">
            <span className="name">4 · Sintonía</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip consolidata">
            <span className="name">5 · Instrucciones y congruencia</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip consolidata">
            <span className="name">6 · Verificar con la acción <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip acquisita">
            <span className="name">7 · El feedback</span>
            <span className="state">adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">8 · Cambiar de rumbo</span>
            <span className="state">no adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">9 · Situaciones difíciles</span>
            <span className="state">no adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">10 · Autonomía</span>
            <span className="state">no adquirida</span>
          </div>
        </div>
      </>
    ),
  },
];
