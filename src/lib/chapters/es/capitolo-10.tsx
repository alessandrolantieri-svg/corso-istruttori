import { OptionGroup, type Option } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Traduzione spagnola, non un capitolo indipendente: stessi chapterId/chiavi di risposta/valori
// interni del capitolo italiano (src/lib/chapters/capitolo-10.tsx) — solo il testo visibile
// cambia. Ultimo capitolo del corso: ha uno step finale in più (11 — "chiusura"), con
// .exam-badge, prima dell'esame.

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

const SIM_OPTIONS: Option[] = [
  { value: "correggi", label: "Le das de todas formas una corrección técnica, por costumbre" },
  { value: "chiedi", label: "Le preguntas qué piensa ella, primero" },
];

const SIM2_OPTIONS: Option[] = [
  { value: "ancora", label: "Le respondes otra vez «¿tú qué piensas?», como en el ejercicio anterior" },
  { value: "indica", label: "Le das una indicación técnica, porque es un ejercicio nuevo, todavía no consolidado" },
];

const DIARY_KEYS = ["q2", "q7", "q7b", "qtrasf", "t10", "qchiusura"];

export const capitolo10StepsEs: Step[] = [
  // 0 — portada
  {
    day: "inicio",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 10 · DEJAR IR</div>
        <h1>El último capítulo</h1>
        <p className="lede">
          El instructor reconoce cuándo un alumno ya no lo necesita para algo concreto — y se
          aplica a sí mismo la misma regla que ha aprendido a dar a los niños: no existen
          fracasos, solo feedback.
        </p>
      </>
    ),
  },

  // 1 — lunes: repaso Capítulo 9
  {
    day: "lunes · 10 min",
    pct: 10,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lunes</div>
        <h1>¿Cómo te fue en la piscina?</h1>
        <p className="lede">
          La semana pasada: con quien se negaba a algo, buscar la intención buena antes de
          insistir. ¿Tuviste que hacerlo? ¿Cómo te fue?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Repaso — vuelve el Capítulo 9</h2>
        <p className="prompt">1. ¿«No puede» y «no quiere» son el mismo problema?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "no", label: "No — uno es un problema didáctico, el otro de relación", correct: true },
            { value: "si", label: "Sí — en la práctica se resuelven igual", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. Un niño que se niega necesita sobre todo:</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "spiega", label: "Una explicación más clara", correct: false },
            { value: "capisce", label: "Que tú entiendas qué hay detrás", correct: true },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">3. ¿Encontrar la intención buena detrás de un rechazo justifica el comportamiento?</p>
        <OptionGroup
          name="k3"
          options={[
            { value: "no", label: "No — solo te da una palanca distinta que puedes usar", correct: true },
            { value: "si", label: "Sí — si entiendes por qué lo hace, entonces está bien dejarlo hacerlo", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">4. ¿El rechazo es siempre ruidoso, en voz alta?</p>
        <OptionGroup
          name="k4"
          options={[
            { value: "si", label: "Sí — si no, ni te darías cuenta", correct: false },
            { value: "no", label: "No — también puede ser un echarse atrás silencioso", correct: true },
          ]}
          selected={answers.k4}
          onPick={(v, correct) => setResponse("k4", v, correct)}
        />
        <p className="prompt">
          5. Si también rechaza una segunda propuesta, ¿lo correcto es seguir buscando otras sin
          fin?
        </p>
        <OptionGroup
          name="k5"
          options={[
            { value: "no", label: "No — después de un segundo intento real, está bien parar con calma", correct: true },
            { value: "si", label: "Sí, hasta encontrar la correcta", correct: false },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. Un rechazo silencioso — brazos cruzados, ninguna palabra — ¿puede esconder
          simplemente cansancio, no desafío?
        </p>
        <OptionGroup
          name="k6"
          options={[
            { value: "si", label: "Sí — a veces no es oposición, solo cansancio que todavía no sabe decir con palabras", correct: true },
            { value: "no", label: "No, siempre es un capricho", correct: false },
          ]}
          selected={answers.k6}
          onPick={(v, correct) => setResponse("k6", v, correct)}
        />
      </>
    ),
  },

  // 2 — martes: saber cuándo dejar de ser necesario
  {
    day: "martes · 15 min",
    pct: 20,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3 && !!a.m4,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Martes</div>
        <h1>Saber cuándo dejar de ser necesario</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Has aprendido a leer, entrar en sintonía, comunicar, verificar, corregir, cambiar de
          rumbo, sostener el rechazo. La última competencia es la más difícil de todas: saber
          cuándo dejar de ser necesario.
        </p>
        <p className="lede">
          Todo lo que has aprendido en este curso — observar, entrar en sintonía, dar la
          instrucción correcta, cambiar de rumbo — tiene una única meta real: un niño que, en esa
          cosa, un día ya no te necesite.
        </p>
        <p className="lede">
          Es fácil olvidarlo, porque cada día tu trabajo se juzga por lo presente, atento y
          dispuesto a intervenir que estás. Pero un instructor que interviene siempre, incluso
          cuando ya no hace falta, está frenando justo lo que quería conseguir. Reconocer el
          momento en que un niño puede hacerlo solo — un ejercicio que antes seguías paso a paso,
          un gesto que antes corregías cada vez — es un acto de confianza, no de abandono.
          Significa decirle, sin palabras, «esto ya lo sabes hacer. Hazlo.»
        </p>
        <p className="lede">
          <strong>¿Pero cómo sabes si ya es ese momento, o si todavía es demasiado
          pronto?</strong> Una señal útil: el alumno ha hecho suyo un gesto de verdad cuando lo
          ejecuta igual incluso cuando no te siente cerca, y no se gira a buscar tu aprobación en
          cuanto termina. Si en cambio solo lo hace bien cuando sabe que lo estás mirando, o se
          queda bloqueado buscándote con los ojos a la espera de un veredicto, todavía es pronto:
          todavía no ha hecho suyo el gesto — se ha acostumbrado a tu presencia, no al movimiento.
          Dejarlo ir en ese momento no sería confianza: sería un riesgo disfrazado de confianza.
        </p>
        <div className="card quote">
          Y la misma regla que has enseñado a leer en el error del niño — no existen fracasos,
          solo feedback — hoy la aplicas a ti mismo. Cada turno que no salió como querías no es un
          fracaso tuyo: es información sobre qué probar de otra forma la próxima vez. El Capítulo 1
          te pidió descubrir cómo comunicas tú. Este capítulo te pide seguir descubriéndolo, cada
          semana, durante el resto de tu carrera — no solo durante este curso.
        </div>
        <p className="lede">
          Las dos mitades de este capítulo dicen lo mismo, vistas desde dos lados distintos. Dejar
          ir a un alumno que ya no te necesita, y dejar ir la idea de haber «fracasado» en un turno
          que salió mal: son el mismo gesto. En ambos casos se trata de confiar en que el ciclo —
          observar, probar, corregir — funciona incluso sin tu control continuo, sobre el niño o
          sobre ti mismo.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Control de fin de día</h2>
        <p className="prompt">1. Un instructor que interviene siempre, incluso cuando no hace falta, ¿está ayudando al alumno?</p>
        <OptionGroup
          name="m1"
          options={[
            { value: "no", label: "No — está frenando la autonomía que quería conseguir", correct: true },
            { value: "si", label: "Sí — cuanto más presente esté, mejor para el alumno", correct: false },
          ]}
          selected={answers.m1}
          onPick={(v, correct) => setResponse("m1", v, correct)}
        />
        <p className="prompt">2. ¿Un turno que salió mal es un fracaso del instructor?</p>
        <OptionGroup
          name="m2"
          options={[
            { value: "si", label: "Sí — si el turno sale mal, quiere decir que hizo algo mal", correct: false },
            { value: "no", label: "No — es información sobre qué probar de otra forma", correct: true },
          ]}
          selected={answers.m2}
          onPick={(v, correct) => setResponse("m2", v, correct)}
        />
        <p className="prompt">
          3. Un alumno ejecuta bien un gesto solo cuando siente al instructor cerca, y se queda
          bloqueado buscándolo con la mirada en cuanto termina. ¿Es el momento de dejarlo ir en esa
          cosa?
        </p>
        <OptionGroup
          name="m3"
          options={[
            { value: "no", label: "No — todavía no ha hecho suyo el gesto, se ha acostumbrado a tu presencia, no al movimiento", correct: true },
            { value: "si", label: "Sí — si lo ejecuta bien, quiere decir que el gesto está adquirido", correct: false },
          ]}
          selected={answers.m3}
          onPick={(v, correct) => setResponse("m3", v, correct)}
        />
        <p className="prompt">
          4. Un alumno repite el mismo gesto idéntico incluso cuando el instructor mira hacia otro
          lado, sin buscar confirmación. ¿Qué señala eso?
        </p>
        <OptionGroup
          name="m4"
          options={[
            { value: "fortuna", label: "Que solo ha tenido suerte", correct: false },
            { value: "suo", label: "Que el gesto ya es suyo, ya no está ligado a tu presencia", correct: true },
          ]}
          selected={answers.m4}
          onPick={(v, correct) => setResponse("m4", v, correct)}
        />
      </>
    ),
  },

  // 3 — miércoles: dos «dejar ir» + simulación Giulia
  {
    day: "miércoles",
    pct: 30,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "correggi" || !!a.sim2),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Miércoles</div>
        <h1>Dos «dejar ir», en el mismo turno</h1>
        <div className="card scene">
          <div className="who">Un niño de 10 años</div>
          <p>
            Un año antes necesitaba que el instructor lo mirara en cada brazada para corregirlo.
            Hoy nada un largo entero sin que nadie intervenga, y la técnica se sostiene. El
            instructor, por costumbre, se acerca igualmente al borde, listo para corregir algo en
            cuanto termine. Luego se detiene, y no dice nada: deja que el propio niño mire su
            largo, que se juzgue solo — «¿cómo te ha parecido?» — en vez de darle él el veredicto.
          </p>
          <p>
            No es que el instructor ya no tenga nada que decir. Es que, en esta cosa concreta,
            decirlo él en vez de dejar que el niño lo descubra sería un paso atrás, no adelante.
          </p>
        </div>
        <div className="card scene">
          <div className="who">El mismo instructor, esa noche</div>
          <p>
            Con otro niño del grupo había probado el mismo silencio — quedarse callado y dejar que
            se corrigiera solo. Pero con ese niño el error no se corrigió: se consolidó, repetido
            idéntico durante todo el largo. Por un momento piensa: «me equivoqué, debería haber
            intervenido.» Luego se detiene, y se aplica a sí mismo la misma regla que usaría con un
            alumno: no es un fracaso — es información. La próxima vez, antes de quedarse en
            silencio, mirará un poco más para asegurarse de que el ejercicio está de verdad ya
            adquirido, y no solo lo parece.
          </p>
          <p>
            Dos «dejar ir» en el mismo turno — uno logrado, otro por corregir — y el instructor
            trata el segundo exactamente como trataría el error de un niño: sin etiquetarse, solo
            tomando nota de qué cambiar.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Un chico de 15 años, Marco</div>
          <p>
            Desde hace dos meses nada los ochenta metros de espalda sin una sola corrección: la
            técnica ya es sólida, y el instructor lo sabe. Un turno, por costumbre, se aleja un
            poco más de lo habitual, mirando también a los otros niños del grupo. Marco, al llegar
            al borde, pregunta: «¿todo bien? No me has mirado ni una vez.» No es una pregunta
            técnica — es una duda sobre otra cosa: seguir siendo seguido. El instructor responde:
            «te he mirado, y de hecho no he dicho nada — quiere decir que iba bien.» Marco se queda
            callado un momento, luego sonríe.
          </p>
        </div>
        <p className="lede">
          <strong>
            Dejar ir no significa dejar de mirar: significa dejar de intervenir cuando mirar basta.
          </strong>{" "}
          Pero para el alumno, desde fuera, las dos cosas pueden parecer idénticas — y por eso, a
          veces, vale la pena decirlo en voz alta, no solo hacerlo en silencio.
        </p>
        <p className="prompt">
          Piensa en un alumno al que sigues desde hace tiempo, y en una cosa concreta que ya sabe
          hacer bien sin tu intervención constante. Escribe qué harías de otra forma, la próxima
          vez, para darle más espacio — sin desaparecer del todo.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota para la corrección, no se muestra al instructor: no hay una respuesta correcta. El
            sistema observa si describe un paso atrás gradual (observar en vez de corregir, pedir
            su juicio en vez de dar el tuyo) y no un abandono total ni un control que se mantiene
            idéntico. */}
        <h2>Simulación</h2>
        <p className="lede">
          <strong>GIULIA, 11 años.</strong> Acaba de completar un ejercicio técnico que, hasta hace
          un mes, necesitaba una corrección en cada intento. Hoy no la ha necesitado. ¿Qué le
          dices, justo después?
        </p>
        <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
        {answers.sim === "correggi" && (
          <div className="feedback retry">
            GIULIA: «...vale.» <em>(lo hace otra vez esperando, como siempre, tu veredicto final)</em>
          </div>
        )}
        {answers.sim === "chiedi" && (
          <div className="feedback ok">
            GIULIA: «...creo que esta vez me he estirado mejor. ¿Es verdad?»{" "}
            <em>(te mira, pero ya ha dado su propio juicio antes de pedir el tuyo)</em>
            <br />
            Pequeña diferencia, efecto grande: en el segundo caso Giulia está aprendiendo a
            evaluarse sola — que es, literalmente, el objetivo de todo este capítulo.
          </div>
        )}
        {answers.sim === "chiedi" && (
          <div>
            <p className="lede" style={{ marginTop: 14 }}>
              Justo después, Giulia prueba un segundo ejercicio — nunca hecho antes, un salto de
              partida. Lo ejecuta de forma insegura, luego se gira y espera, callada, tu veredicto.
            </p>
            <p className="prompt">Escribe qué haces ahora.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={SIM2_OPTIONS}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "ancora" && (
              <div className="feedback retry">
                GIULIA se queda quieta, insegura, sin saber si está bien o no. Dar espacio funciona
                cuando la base ya es sólida. En un gesto nuevo, el silencio no es confianza: es
                dejarla sola — justo la señal del martes, leída al revés.
              </div>
            )}
            {answers.sim2 === "indica" && (
              <div className="feedback ok">
                GIULIA asiente y lo intenta de nuevo, con la indicación en mente. Dejar ir no es
                una regla fija igual para cada ejercicio: depende de qué está ya adquirido y qué
                no.
              </div>
            )}
          </div>
        )}
      </>
    ),
  },

  // 4 — miércoles por la noche: transferencia
  {
    day: "miércoles por la noche",
    pct: 42,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Control de fin de día — transferencia</div>
        <h1>Cuando el silencio no basta</h1>
        <p className="lede">
          Has intentado, con un alumno, quedarte en silencio en un ejercicio que creías ya
          adquirido — pero él se ha equivocado igualmente, de una forma que no esperabas.
        </p>
        <p className="prompt">
          ¿Qué piensas, en ese momento — y qué haces la próxima vez? Escribe tu razonamiento, no
          solo la conclusión.
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota para la corrección, no se muestra al instructor: el sistema busca si se aplica a
            sí mismo la misma regla del martes — no un fracaso, información — en vez de concluir
            que «dejar ir» fue un error que no hay que repetir nunca más. */}
      </>
    ),
  },

  // 5 — en la piscina
  {
    day: "en la piscina",
    pct: 52,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Tu turno en la piscina</div>
        <h1>Empieza por el silencio</h1>
        <p className="lede">
          Esta semana, elige un ejercicio entero y no digas nada durante todo su desarrollo a un
          alumno que ya lo sabe hacer bien. Solo mira. Si hace falta intervenir, interviene — pero
          empieza por el silencio, no por el comentario.
        </p>
      </>
    ),
  },

  // 6 — viernes: examen acumulativo Capítulo 9 + Capítulo 10
  {
    day: "viernes · 11 min",
    pct: 70,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Viernes — examen acumulativo: Capítulo 9 + Capítulo 10</div>
        <h1>El examen</h1>
        <p className="prompt">1. Un instructor que interviene siempre, incluso cuando no hace falta, está:</p>
        <OptionGroup
          name="t1"
          options={[
            { value: "bene", label: "Haciendo bien su trabajo", correct: false },
            { value: "rallenta", label: "Frenando la autonomía que quería conseguir", correct: true },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. ¿Un turno que salió mal es un fracaso del instructor?</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "no", label: "No — es información sobre qué probar de otra forma", correct: true },
            { value: "si", label: "Sí — un turno que sale mal quiere decir que hizo algo mal", correct: false },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">3. Dar más espacio a un alumno que ya sabe hacer algo significa:</p>
        <OptionGroup
          name="t3"
          options={[
            { value: "sparire", label: "Desaparecer del todo", correct: false },
            { value: "graduale", label: "Un paso atrás gradual, no un abandono", correct: true },
          ]}
          selected={answers.t3}
          onPick={(v, correct) => setResponse("t3", v, correct)}
        />
        <p className="prompt">
          4. Las dos mitades de este capítulo — la autonomía del niño y el error del instructor —
          ¿están relacionadas?
        </p>
        <OptionGroup
          name="t4"
          options={[
            {
              value: "si",
              label: "Sí — son el mismo gesto: confiar en que el ciclo funciona sin control constante",
              correct: true,
            },
            { value: "no", label: "No, son dos temas distintos", correct: false },
          ]}
          selected={answers.t4}
          onPick={(v, correct) => setResponse("t4", v, correct)}
        />
        <p className="prompt">
          5. <em>(del Capítulo 9)</em> ¿«No puede» y «no quiere» son el mismo problema?
        </p>
        <OptionGroup
          name="t5"
          options={[
            { value: "si", label: "Sí — en la práctica se afrontan igual", correct: false },
            { value: "no", label: "No — uno es un problema didáctico, el otro de relación", correct: true },
          ]}
          selected={answers.t5}
          onPick={(v, correct) => setResponse("t5", v, correct)}
        />
        <p className="prompt">
          6. Si un turno salió mal porque dejaste ir demasiado pronto, ¿la conclusión correcta es
          «no volveré a dejar ir a nadie nunca más»?
        </p>
        <OptionGroup
          name="t6"
          options={[
            { value: "no", label: "No — la conclusión es calibrar mejor cuándo hacerlo, no dejar de hacerlo", correct: true },
            { value: "si", label: "Sí, mejor ser prudente", correct: false },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">
          7. Un alumno ejecuta bien un gesto solo cuando te siente cerca, y busca tu mirada en
          cuanto termina. ¿Es ya el momento de dejarlo ir en esa cosa?
        </p>
        <OptionGroup
          name="t7"
          options={[
            { value: "si", label: "Sí — si lo ejecuta bien, el gesto ya está adquirido", correct: false },
            { value: "no", label: "No — todavía no ha hecho suyo el gesto, se ha acostumbrado a tu presencia, no al movimiento", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">
          8. Un alumno nota que hoy lo miras menos de lo habitual y pregunta si todo va bien. El
          silencio, sobre un gesto ya bueno, es:
        </p>
        <OptionGroup
          name="t8"
          options={[
            { value: "complimento", label: "Un cumplido, no una distracción", correct: true },
            { value: "distrazione", label: "Una distracción que corregir", correct: false },
          ]}
          selected={answers.t8}
          onPick={(v, correct) => setResponse("t8", v, correct)}
        />
        <p className="prompt">
          9. <em>(del Capítulo 9)</em> Si también rechaza una segunda propuesta, ¿hay que seguir
          buscando otras sin fin?
        </p>
        <OptionGroup
          name="t9"
          options={[
            { value: "si", label: "Sí, hasta encontrar la correcta", correct: false },
            { value: "no", label: "No — después de un segundo intento real, está bien parar con calma", correct: true },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. Un alumno al que sigues desde hace dos años te pregunta, por primera vez, «¿cómo lo
          he hecho?» antes de que tú digas nada. Escribe en dos líneas cómo respondes.
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 7 — feedback: explica cómo funciona la corrección (§10)
  {
    day: "viernes · feedback",
    pct: 73,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§10 · Feedback</div>
        <h1>Esto es lo que dicen tus respuestas</h1>
        <p className="lede">No sobre ti — sobre lo que has hecho en estas preguntas.</p>
        <p className="lede" style={{ fontSize: ".85rem", fontStyle: "italic" }}>
          Ejemplo de feedback generado, en caso de error en la pregunta 1:
        </p>
        <div className="card quote">
          Has respondido que intervenir siempre es hacer bien tu trabajo. Es comprensible pensarlo
          — es lo que más se ve. Pero la meta de todo lo que enseñas es un alumno que, en esa cosa,
          ya no te necesite. Intervenir cuando no hace falta frena justamente eso.
        </div>
      </>
    ),
  },

  // 8 — recuperación: solo si el examen del viernes tiene demasiados errores (§12, D25/D27)
  {
    day: "recuperación",
    pct: 76,
    nextLabel: "Continuar ▸",
    showBack: true,
    visible: (a) => {
      const correctas: Record<string, string> = {
        t1: "rallenta", t2: "no", t3: "graduale", t4: "si", t5: "no",
        t6: "no", t7: "no", t8: "complimento", t9: "no",
      };
      const erroneas = Object.entries(correctas).filter(([k, v]) => a[k] !== v).length;
      return erroneas >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperación — solo porque el examen encontró alguna dificultad</div>
        <h1>Dos ejemplos más, para entrenar el silencio correcto</h1>
        <p className="lede">
          No es un fracaso: es solo la señal de que vale la pena repasar el punto más delicado de
          este capítulo con algún ejemplo más — reconocer cuándo callar es la respuesta correcta, y
          cuándo todavía no lo es.
        </p>

        <div className="card scene">
          <div className="who">Elena, 9 años</div>
          <p>
            Hace un mes, su viraje necesitaba una corrección casi en cada intento. Hoy lo ejecuta
            sola, se mira las manos bajo el agua y emerge sonriendo — sin buscar la mirada del
            instructor. Él se acerca de todas formas al borde, listo para decir algo.
          </p>
        </div>
        <p className="prompt">¿Cuál es lo correcto que hay que hacer?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "correggi", label: "Le da de todas formas un pequeño consejo técnico, por costumbre", correct: false },
            {
              value: "tace",
              label: "Se queda callado — la sonrisa sin buscar confirmación dice que el gesto ya es suyo",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Filippo, 13 años</div>
          <p>
            Ejecuta el mismo ejercicio técnicamente bien. Pero después de cada intento se gira de
            golpe hacia el instructor, buscando un gesto de aprobación, y se queda quieto hasta
            conseguirlo.
          </p>
        </div>
        <p className="prompt">¿Es ya el momento de dejarlo ir en este ejercicio?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "si", label: "Sí — si lo ejecuta bien técnicamente, el gesto está adquirido", correct: false },
            {
              value: "no",
              label: "No — todavía busca confirmación: todavía no ha hecho suyo el gesto, se ha acostumbrado a tu presencia, no al movimiento",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Dejar ir no es una regla igual para todos: es el silencio dicho en el momento justo. No
          demasiado pronto, cuando el alumno todavía te necesita. No demasiado tarde, cuando ya
          eres tú quien tiene la costumbre, no él la necesidad.
        </p>
      </>
    ),
  },

  // 9 — viernes: resultado
  {
    day: "viernes · resultado",
    pct: 82,
    nextLabel: "Continuar ▸",
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
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  knowledge_score
                </td>
                <td style={{ padding: "6px 0" }}>Las 9 preguntas del examen</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  application_score
                </td>
                <td style={{ padding: "6px 0" }}>La respuesta en el §7</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  simulation_score
                </td>
                <td style={{ padding: "6px 0" }}>Cómo respondiste a Giulia en el §8</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  reflection_score
                </td>
                <td style={{ padding: "6px 0" }}>El relato del lunes sobre el Capítulo 9</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  competency_score — Autonomía y mejora continua
                </td>
                <td style={{ padding: "6px 0" }}>La más baja de las anteriores</td>
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
        <div className="done-badge">✓ Capítulo 10 completado</div>
        <div className="eyebrow">Semana 10 de 10 · curso terminado</div>
        <h1>Los diez capítulos, cerrados</h1>
        <p className="lede">
          Has aprendido a leer, entrar en sintonía, comunicar, verificar, corregir, cambiar de
          rumbo, sostener el rechazo, dejar ir. Solo falta una última reflexión, antes del examen
          final.
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
          <div className="chip consolidata">
            <span className="name">7 · El feedback</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip consolidata">
            <span className="name">8 · Cambiar de rumbo</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip consolidata">
            <span className="name">9 · Situaciones difíciles</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip acquisita">
            <span className="name">10 · Autonomía y mejora</span>
            <span className="state">adquirida</span>
          </div>
        </div>
      </>
    ),
  },

  // 11 — cierre: el cierre, antes del examen
  {
    day: "cierre",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="exam-badge"><i className="ph-duotone ph-flag-checkered" aria-hidden="true" /> El cierre — antes del examen</div>
        <h1>Última pregunta, antes de seguir adelante</h1>
        <p className="lede">
          Has probado, esta semana, a quedarte en silencio en un ejercicio que un alumno ya sabía
          hacer. ¿Cómo te fue? Y, mirando atrás a las diez semanas: ¿cuál es la cosa que más ha
          cambiado — en un niño, o en ti?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Esta reflexión queda entre tú y tu perfil: quien evalúe tu examen final nunca la verá.
        </p>
        <div className="card quote">
          Desde aquí empieza el examen final. No es otra prueba más como las otras nueve: es el
          momento en que todo lo que has construido — no solo lo que sabes, sino lo que sabes hacer
          — se junta y se verifica de una sola vez, con calma. No puedes suspenderlo — solo puedes
          posponerlo. Si todavía no estás listo, se vuelve atrás, se refuerza lo que hace falta, y
          se vuelve a intentar. El estándar es el mismo para todos. El camino para llegar hasta
          ahí, como ha sido durante todo el curso, sigue siendo tuyo.
        </div>
      </>
    ),
  },
];
