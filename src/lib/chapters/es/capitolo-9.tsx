import { OptionGroup } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Traduzione spagnola, non un capitolo indipendente: stessi chapterId/chiavi di risposta/valori
// interni del capitolo italiano (src/lib/chapters/capitolo-9.tsx) — solo il testo visibile
// cambia.

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

const DIARY_KEYS = ["q2", "q7", "q7b", "qtrasf", "t10"];

export const capitolo9StepsEs: Step[] = [
  // 0 — portada
  {
    day: "inicio",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 9 · CUANDO NO QUIERE</div>
        <h1>¿No puede, o no quiere?</h1>
        <p className="lede">
          Ante un niño que se niega, se opone o desafía abiertamente, el instructor busca primero
          la intención buena detrás del rechazo — en vez de insistir o de entrar en conflicto.
        </p>
      </>
    ),
  },

  // 1 — lunes: reflexión + repaso Cap.8
  {
    day: "lunes · 10 min",
    pct: 11,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lunes</div>
        <h1>¿Cómo te fue en la piscina?</h1>
        <p className="lede">
          La semana pasada: tres formas distintas preparadas para una misma cosa técnica, y
          cambiar de rumbo si la primera no funcionaba. ¿Te sirvió? ¿Qué forma usaste más?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Repaso — vuelve el Capítulo 8</h2>
        <p className="prompt">1. Si una forma no funciona, ¿lo correcto es repetirla más fuerte?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "no", label: "No — se prueba una diferente", correct: true },
            { value: "si", label: "Sí — si la repites con más firmeza, normalmente funciona", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. ¿Un buen repertorio tiene, para cada cosa importante, al menos tres formas distintas de decirla?</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "si", label: "Sí", correct: true },
            { value: "no", label: "No, con una bien hecha basta", correct: false },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">3. Si un niño no lo consigue con una forma, ¿quiere decir que no puede?</p>
        <OptionGroup
          name="k3"
          options={[
            { value: "no", label: "No — solo quiere decir que todavía no era la forma correcta", correct: true },
            { value: "si", label: "Sí — si una forma no basta, quiere decir que el niño todavía no puede", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">4. ¿El repertorio tiene un orden fijo, válido para todos los niños?</p>
        <OptionGroup
          name="k4"
          options={[
            { value: "si", label: "Sí — primero las palabras, luego el gesto, luego el contacto, siempre en ese orden", correct: false },
            { value: "no", label: "No — depende del niño", correct: true },
          ]}
          selected={answers.k4}
          onPick={(v, correct) => setResponse("k4", v, correct)}
        />
        <p className="prompt">
          5. Has probado los tres canales con un niño, sin resultado. ¿Lo correcto es inventar una
          cuarta variante?
        </p>
        <OptionGroup
          name="k5"
          options={[
            { value: "no", label: "No — es el momento de parar y mirar qué más hay", correct: true },
            { value: "si", label: "Sí, hay que insistir", correct: false },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. ¿Un canal que funcionó en un ejercicio funciona automáticamente también en el
          siguiente?
        </p>
        <OptionGroup
          name="k6"
          options={[
            { value: "si", label: "Sí, una vez encontrado sigue siendo el correcto", correct: false },
            { value: "no", label: "No — cada ejercicio nuevo puede necesitar un canal diferente", correct: true },
          ]}
          selected={answers.k6}
          onPick={(v, correct) => setResponse("k6", v, correct)}
        />
      </>
    ),
  },

  // 2 — martes: explicación + control
  {
    day: "martes · 13 min",
    pct: 27,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Martes</div>
        <h1>«No puede» y «no quiere» no son lo mismo</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Hasta ahora has aprendido qué hacer cuando un niño no puede. Hoy aprendes la diferencia —
          porque no es lo mismo — cuando un niño no quiere.
        </p>
        <p className="lede">
          <strong>«No puede» es un problema didáctico.</strong> El niño quiere hacer lo que le
          pides, pero el camino todavía no funciona — es lo que aprendiste en el Capítulo 8: se
          cambia de camino.
        </p>
        <p className="lede">
          <strong>«No quiere» es otra cosa muy distinta.</strong> No es que el camino esté
          equivocado: es que él, ahora, no quiere recorrerlo. Se niega, se opone, a veces desafía
          abiertamente — sobre todo en la adolescencia.
        </p>
        <p className="lede">
          Confundir las dos cosas es el segundo error más común del oficio (el primero es el del
          Capítulo 8: repetir la misma explicación en vez de cambiar de rumbo). El motivo es
          simple: ante un rechazo es natural explicar otra vez, quizá más claro. Ese movimiento
          funciona para «no puede». Pero no sirve de nada para «no quiere». Un niño que se niega no
          necesita otra explicación: necesita que tú entiendas por qué se niega.
        </p>
        <div className="card quote">
          Incluso el comportamiento más molesto — el rechazo, la oposición, el desafío — casi
          siempre esconde una intención que, desde el punto de vista de quien la tiene, es
          positiva. No justifica el comportamiento. Pero te da una palanca distinta que puedes
          usar.
        </div>
        <p className="lede">
          El niño que se niega a entrar muchas veces no te está rechazando a ti: se está
          protegiendo de algo que teme. El chico que te desafía delante del grupo, muchas veces, no
          quiere ganarte a ti: quiere que lo vean como alguien que cuenta, delante de sus
          compañeros. Una vez encontrada la intención, muchas veces también encuentras una forma de
          satisfacerla sin ceder en lo esencial.
        </p>
        <p className="lede">
          El rechazo no siempre es ruidoso: a veces es un chico que desafía en voz alta, otras
          veces una niña de 11 años que, sin levantar la voz, se echa atrás y dice «ni lo intento»
          — mismo mecanismo, volumen distinto.
        </p>
        <p className="lede">
          <strong>¿Y si también rechaza la propuesta que le ofreces?</strong> Puede pasar. No es
          una negociación infinita: puedes intentar una segunda lectura, con calma — pero si
          tampoco eso lleva a nada, está bien parar y decir claramente cuál es el límite, sin
          dureza: «vale, hoy dejamos este ejercicio — pero el turno continúa.» Buscar la intención
          buena no significa perseguirla sin fin: significa darle un intento real, no cero
          intentos.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Control de fin de día</h2>
        <p className="prompt">1. ¿«No puede» y «no quiere» necesitan la misma respuesta?</p>
        <OptionGroup
          name="m1"
          options={[
            { value: "no", label: "No — uno es didáctico, el otro es de relación", correct: true },
            { value: "si", label: "Sí — en ambos casos la respuesta correcta es explicar otra vez", correct: false },
          ]}
          selected={answers.m1}
          onPick={(v, correct) => setResponse("m1", v, correct)}
        />
        <p className="prompt">2. ¿Encontrar la intención buena detrás de un rechazo justifica el comportamiento?</p>
        <OptionGroup
          name="m2"
          options={[
            { value: "si", label: "Sí — si entiendes el motivo, entonces el rechazo está bien tal cual", correct: false },
            { value: "no", label: "No — solo te da una palanca distinta que puedes usar", correct: true },
          ]}
          selected={answers.m2}
          onPick={(v, correct) => setResponse("m2", v, correct)}
        />
        <p className="prompt">3. Si también rechaza la segunda propuesta, ¿hay que seguir buscando otras sin fin?</p>
        <OptionGroup
          name="m3"
          options={[
            { value: "no", label: "No — después de un segundo intento real, está bien parar con calma", correct: true },
            { value: "si", label: "Sí, hasta encontrar la correcta", correct: false },
          ]}
          selected={answers.m3}
          onPick={(v, correct) => setResponse("m3", v, correct)}
        />
      </>
    ),
  },

  // 3 — miércoles: tres escenas + simulación Riccardo (dos intercambios condicionales)
  {
    day: "miércoles",
    pct: 44,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "impone" || !!a.sim2),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Miércoles</div>
        <h1>Tres rechazos, tres intenciones distintas</h1>
        <div className="card scene">
          <div className="who">Un chico de 15 años</div>
          <p>
            Se para al borde de la piscina, en voz alta, delante del grupo: «este ejercicio es una
            tontería, no lo hago.» No es que no entienda para qué sirve el ejercicio: acaba de
            poner a prueba, delante de todos, si el instructor tiene el control de la situación. El
            instructor responde, sin levantar la voz: «vale. Enséñame tú cómo lo harías de otra
            forma.» No es una rendición — es darle un papel, en vez de un enfrentamiento. El chico
            propone una pequeña variante, lo bastante parecida como para poder aceptarla. El
            rechazo no era sobre el ejercicio: era sobre quién decide.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Alice, 12 años</div>
          <p>
            Salto de partida, nunca probado delante del grupo. Cruza los brazos: «no lo hago, es
            una tontería.» Sin desafío en voz alta, solo un rechazo seco. El instructor entiende que
            el problema no es el salto: es equivocarse delante de sus amigas. Le propone, en voz
            baja, probarlo la primera, mientras los demás todavía se ajustan el gorro. Alice lo
            hace.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Un niño de 8 años</div>
          <p>
            Cruza los brazos y no dice nada, se gira a mirar la pared, ante un ejercicio que ya
            había hecho sin problemas la semana anterior. Ningún desafío, ningún público que
            impresionar — solo un rechazo silencioso y firme. El instructor, en vez de ofrecer
            incentivos («venga, luego jugamos al juego que te gusta») o insistir, se agacha a su
            altura: «¿hoy es un día un poco pesado?» El niño asiente apenas — no es oposición, es
            cansancio que a los 8 años todavía no sabe decir con las palabras justas. El instructor
            reduce el ejercicio, sin hacer de ello un problema. El niño lo hace.
          </p>
        </div>
        <p className="lede">
          <strong>
            Tres rechazos, tres intenciones distintas — desafiar a quien manda, protegerse de la
            mirada de los compañeros, o simplemente sostener un cansancio que todavía no sabe
            explicar con palabras — y tres respuestas distintas, cada una dirigida a la intención
            real, no al rechazo en sí.
          </strong>
        </p>
        <p className="prompt">
          Una niña de 6 años, en su tercer intento de entrar al agua, se echa a llorar y dice «no,
          no quiero, basta». Escribe qué haces — no qué le dices para convencerla, sino qué haces
          para entender qué hay detrás de ese «no».
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota para la corrección, no se muestra al instructor: el sistema busca si intenta
            entender la causa (¿miedo? ¿cansancio? ¿algo que pasó antes?) en vez de insistir
            directamente en entrar al agua. */}
        <h2>Simulación</h2>
        <p className="lede">
          <strong>RICCARDO, 16 años.</strong> Cruza los brazos: «no tengo ganas de hacer este
          ejercicio, punto.» ¿Qué le respondes?
        </p>
        <OptionGroup
          name="sim"
          options={[
            { value: "impone", label: "Le explicas otra vez para qué sirve el ejercicio, o le dices que tiene que hacerlo igualmente" },
            {
              value: "capisce",
              label: "Buscas qué hay detrás, o le ofreces una elección dentro de un límite — por ejemplo: «¿qué otro ejercicio te apetecería probar?»",
            },
          ]}
          selected={answers.sim}
          onPick={(v) => setResponse("sim", v)}
        />
        {answers.sim === "impone" && (
          <div className="feedback retry">
            RICCARDO: «He dicho que no.» <em>(se aleja, se queda fuera del ejercicio)</em>
          </div>
        )}
        {answers.sim === "capisce" && (
          <>
            <div className="feedback ok">
              RICCARDO: «...no sé, a lo mejor los saltos.» <em>(se acerca de nuevo al grupo)</em>
              <br />
              No has cedido en lo esencial — el entrenamiento continúa. Has cedido en quién elige, y
              a los 16 años eso suele ser lo que de verdad importa.
            </div>
            <p className="lede" style={{ marginTop: 14 }}>
              Después de un par de saltos, Riccardo se para otra vez: «no, esto también lo dejo, hoy
              no me apetece nada.»
            </p>
            <p className="prompt">Escribe qué haces ahora.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={[
                { value: "ancora", label: "Buscas todavía una tercera alternativa, y luego una cuarta" },
                { value: "confine", label: "Después de un segundo intento real ya ofrecido, dices claramente cuál es el límite, con calma" },
              ]}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "ancora" && (
              <div className="feedback retry">
                RICCARDO aprende que negarse siempre funciona — cada «no» consigue una propuesta
                nueva, sin que haya nunca un límite real.
              </div>
            )}
            {answers.sim2 === "confine" && (
              <div className="feedback ok">
                RICCARDO: «...vale» <em>(se queda en el grupo, sin protestar más)</em>
                <br />
                Buscar la intención buena no significa perseguirla sin fin: un intento real, no
                cero intentos — y tampoco una negociación sin fin.
              </div>
            )}
          </>
        )}
      </>
    ),
  },

  // 4 — miércoles por la noche: transferencia
  {
    day: "miércoles por la noche",
    pct: 60,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Control de fin de día — transferencia</div>
        <h1>¿No puede, o no quiere?</h1>
        <p className="lede">
          Una niña de 9 años, sin levantar la voz, dice simplemente: «ni lo intento, total nunca me
          sale.» No está enfadada, parece resignada.
        </p>
        <p className="prompt">
          ¿Es «no puede» o «no quiere»? ¿Qué te hace pensar que es una cosa y no la otra?
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota para la corrección, no se muestra al instructor: no tiene una respuesta obvia — es
            intencionado. El sistema comprueba si razona sobre la señal (resignación, no oposición
            activa) en vez de aplicar automáticamente el esquema visto en los ejemplos de hoy.
            Podría ser las dos cosas a la vez: una dificultad técnica real que, repetida, se ha
            convertido en rechazo a volver a intentarlo. */}
      </>
    ),
  },

  // 5 — turno en la piscina
  {
    day: "en la piscina",
    pct: 68,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Tu turno en la piscina</div>
        <h1>Primero la intención, luego la respuesta</h1>
        <p className="lede">
          Esta semana, con quien se niegue a algo: antes de insistir, busca la intención buena bajo
          el rechazo. No tiene que justificarte nada — solo tiene que darte una palanca distinta de
          la que ibas a usar.
        </p>
      </>
    ),
  },

  // 6 — viernes: examen acumulativo Cap.8 + Cap.9
  {
    day: "viernes · 11 min",
    pct: 86,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Viernes — examen acumulativo: Capítulo 8 + Capítulo 9</div>
        <h1>El examen</h1>
        <p className="prompt">1. ¿«No puede» y «no quiere» son el mismo problema?</p>
        <OptionGroup
          name="t1"
          options={[
            { value: "si", label: "Sí — en la práctica el rechazo y la dificultad se afrontan igual", correct: false },
            { value: "no", label: "No — uno es didáctico, el otro es de relación", correct: true },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. Un niño que se niega necesita sobre todo:</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "capisce", label: "Que tú entiendas qué hay detrás del rechazo", correct: true },
            { value: "spiega", label: "Otra explicación más clara", correct: false },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">3. Un chico de 15 años te desafía delante del grupo. ¿Qué es probable que esté poniendo a prueba?</p>
        <OptionGroup
          name="t3"
          options={[
            { value: "tecnica", label: "Tu competencia técnica", correct: false },
            { value: "controllo", label: "Si tienes el control de la situación", correct: true },
          ]}
          selected={answers.t3}
          onPick={(v, correct) => setResponse("t3", v, correct)}
        />
        <p className="prompt">4. Una chica de 12 años rechaza un ejercicio nuevo delante del grupo. ¿Qué es lo que más probablemente protege?</p>
        <OptionGroup
          name="t4"
          options={[
            { value: "vergogna", label: "No quiere equivocarse delante de sus amigas", correct: true },
            { value: "sfida", label: "Quiere desafiar la autoridad del instructor", correct: false },
          ]}
          selected={answers.t4}
          onPick={(v, correct) => setResponse("t4", v, correct)}
        />
        <p className="prompt">
          5. <em>(del Capítulo 8)</em> Si una forma no funciona, lo correcto es:
        </p>
        <OptionGroup
          name="t5"
          options={[
            { value: "forte", label: "Repetirla más fuerte", correct: false },
            { value: "diverso", label: "Usar una diferente", correct: true },
          ]}
          selected={answers.t5}
          onPick={(v, correct) => setResponse("t5", v, correct)}
        />
        <p className="prompt">6. ¿El rechazo es siempre ruidoso y en voz alta?</p>
        <OptionGroup
          name="t6"
          options={[
            { value: "no", label: "No — también puede ser silencioso, un echarse atrás sin drama", correct: true },
            { value: "si", label: "Sí — un rechazo de verdad siempre se nota, si no, no es real", correct: false },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">7. Un niño de 8 años cruza los brazos y no responde, ante un ejercicio que ya sabía hacer. ¿Qué puede esconder, además de desafío o vergüenza?</p>
        <OptionGroup
          name="t7"
          options={[
            { value: "niente", label: "Nada, a esa edad siempre es un capricho", correct: false },
            { value: "stanchezza", label: "También un cansancio que todavía no sabe expresar con palabras", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">8. Si también rechaza la segunda propuesta, ¿hay que seguir buscando otras sin fin?</p>
        <OptionGroup
          name="t8"
          options={[
            { value: "si", label: "Sí, hasta encontrar la correcta", correct: false },
            { value: "no", label: "No — después de un segundo intento real, está bien decir claramente cuál es el límite, con calma", correct: true },
          ]}
          selected={answers.t8}
          onPick={(v, correct) => setResponse("t8", v, correct)}
        />
        <p className="prompt">9. ¿Decir claramente cuál es el límite, después de un intento real de entender, contradice «buscar la intención buena»?</p>
        <OptionGroup
          name="t9"
          options={[
            { value: "si", label: "Sí, hay que insistir hasta que el rechazo termine", correct: false },
            { value: "no", label: "No — buscar la intención no significa perseguirla sin fin", correct: true },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. Un niño de 8 años rechaza un ejercicio que ya había hecho bien la semana anterior.
          Escribe en dos líneas qué haces antes de insistir.
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
        <p className="lede">No sobre ti — sobre lo que has hecho en estas preguntas.</p>
        <p className="lede" style={{ fontSize: ".85rem", fontStyle: "italic" }}>
          Ejemplo de feedback generado, en caso de error en la pregunta 2:
        </p>
        <div className="card quote">
          Has respondido que hace falta otra explicación más clara. Pero si el problema no es que
          no entiende — es que no quiere — explicar otra vez no cambia nada, porque no es ese el
          punto. Primero entiende qué hay detrás, luego decide qué decir.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          El feedback nunca dice solo «te has equivocado»: dice qué mirar la próxima vez. El tono
          se mantiene siempre sobre el comportamiento observado, nunca sobre la persona — la misma
          regla del Capítulo 7.
        </p>
      </>
    ),
  },

  // 8 — recuperación: solo si el examen del viernes tiene demasiados errores (§12, D25/D27)
  {
    day: "recuperación",
    pct: 91,
    nextLabel: "Continuar ▸",
    showBack: true,
    visible: (a) => {
      const correctas: Record<string, string> = {
        t1: "no", t2: "capisce", t3: "controllo", t4: "vergogna", t5: "diverso",
        t6: "no", t7: "stanchezza", t8: "no", t9: "no",
      };
      const erroneas = Object.entries(correctas).filter(([k, v]) => a[k] !== v).length;
      return erroneas >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperación — solo porque el examen encontró alguna dificultad</div>
        <h1>Tres ejemplos más, para entrenar el límite</h1>
        <p className="lede">
          No es un fracaso: es solo la señal de que vale la pena repasar el punto más delicado de
          este capítulo con algún ejemplo más — reconocer el rechazo antes de reaccionar.
        </p>

        <div className="card scene">
          <div className="who">Un niño de 10 años</div>
          <p>
            Se para ante un salto nuevo y dice, seco: «no lo hago.» El instructor, por costumbre,
            repite la explicación técnica — más lenta, más detallada — convencido de que basta con
            explicarse mejor.
          </p>
        </div>
        <p className="prompt">¿Es la respuesta correcta ante un rechazo?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "si", label: "Sí — si la explicación es más clara, normalmente el rechazo se disuelve", correct: false },
            {
              value: "no",
              label: "No — un rechazo no se resuelve con una explicación más clara: primero hay que entender qué hay detrás",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Alessia, 11 años</div>
          <p>
            Durante el calentamiento, en voz alta, delante del grupo: «no quiero hacer jueguecitos
            de niños pequeños.» La semana pasada, precisamente en ese ejercicio, se había
            equivocado delante de todos.
          </p>
        </div>
        <p className="prompt">¿Qué protege, más probablemente, su rechazo?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "sfida", label: "Quiere desafiar la autoridad del instructor", correct: false },
            {
              value: "imbarazzo",
              label: "Se está protegiendo de una vergüenza ya vivida, no del ejercicio en sí",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Davide, 14 años</div>
          <p>
            Rechaza la primera propuesta. El instructor le ofrece una segunda, bien calibrada:
            también la rechaza. Ofrece una tercera, y empieza a esbozar una cuarta.
          </p>
        </div>
        <p className="prompt">¿Es correcto seguir ofreciendo alternativas sin fin?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "si", label: "Sí, hasta encontrar la correcta", correct: false },
            {
              value: "no",
              label: "No — después de un segundo intento real, está bien parar y decir claramente cuál es el límite, con calma",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          El rechazo nunca es la petición real: es el síntoma. Y buscar la intención buena no
          significa perseguirla sin fin — un intento real, no cero intentos, y tampoco una
          negociación sin fin.
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
                <td style={{ padding: "6px 0" }}>La respuesta en el §7</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Cómo gestionaste a Riccardo en el §8, en los dos intercambios</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>El relato del lunes sobre el Capítulo 8</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Situaciones difíciles</td>
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
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ vakProfile, answers }: StepContext) => (
      <>
        <div className="done-badge">✓ Capítulo 9 completado</div>
        <div className="eyebrow">Semana 9 de 10 · el Capítulo 10 llega la próxima semana</div>
        <h1>Dejar ir</h1>
        <p className="lede">
          Has aprendido a leer, a entrar en sintonía, a comunicar, a verificar, a corregir, a
          cambiar de rumbo, a sostener el rechazo. La semana que viene cierra el círculo: cómo
          haces que, un día, ya no hagas falta.
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
          <div className="chip acquisita">
            <span className="name">9 · Situaciones difíciles</span>
            <span className="state">adquirida</span>
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
