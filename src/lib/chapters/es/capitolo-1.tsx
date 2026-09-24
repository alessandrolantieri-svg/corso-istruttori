import type { ReactNode } from "react";
import { OptionGroup, type Option } from "@/components/OptionGroup";
import { VakBars } from "@/components/VakBars";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import { computeVak, VAK_NOUN_ES, VAK_ADJ_ES } from "@/lib/vak";
import type { Step, StepContext } from "@/lib/chapters/types";
import { computeVakProfile } from "@/lib/chapters/capitolo-1-actions";

// Traducción española, no un capítulo independiente: mismos chapterId/claves de respuesta/valores
// internos del capítulo italiano (src/lib/chapters/capitolo-1.tsx) — solo cambia el texto visible.
// Los value de las opciones VAK ("mostra"/"dire"/"sentire") son siempre los mismos en todos los
// idiomas: los compara computeVak()/computeVakProfile(), no son texto para traducir.

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

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

const Q1_OPTIONS: Option[] = [
  { value: "vede", label: "Se lo vuelvo a mostrar" },
  { value: "dice", label: "Se lo explico otra vez con otras palabras" },
  { value: "sente", label: "Lo tomo de la mano y hago que lo sienta" },
  { value: "boh", label: "No lo sé, depende del momento" },
];

const V_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "v1",
    prompt: "1. Tienes que explicar un movimiento nuevo. ¿Qué haces primero, por instinto?",
    options: [
      { value: "mostra", label: "Lo demuestro yo mismo, en el agua, antes de decir nada" },
      { value: "dire", label: "Lo explico con palabras, paso a paso" },
      { value: "sentire", label: "Le tomo el brazo y hago que sienta el movimiento" },
    ],
  },
  {
    key: "v2",
    prompt: "2. Piensas en una clase que salió bien. ¿Qué recuerdas primero?",
    options: [
      { value: "mostra", label: "Cómo se veía el alumno moviéndose — su postura, su estela en el agua" },
      { value: "dire", label: "Las palabras que nos dijimos, el tono de la conversación" },
      { value: "sentire", label: "Cómo me sentí yo — la energía, la satisfacción física de ese momento" },
    ],
  },
  {
    key: "v3",
    prompt: "3. Un compañero te pide consejo sobre un ejercicio. ¿Cómo prefieres explicárselo?",
    options: [
      { value: "mostra", label: "Te lo muestro, ven al agua conmigo" },
      { value: "dire", label: "Te lo cuento, sentémonos cinco minutos" },
      { value: "sentire", label: "Hagámoslo juntos, lo entiendes probándolo" },
    ],
  },
  {
    key: "v4",
    prompt: "4. Cuando describes un error técnico a un compañero, ¿qué haces más a menudo?",
    options: [
      { value: "mostra", label: "Dibujo o imito el movimiento con las manos" },
      { value: "dire", label: "Lo cuento con palabras, con precisión" },
      { value: "sentire", label: "Lo repito yo mismo en el aire, con todo el cuerpo" },
    ],
  },
  {
    key: "v5",
    prompt: "5. Un padre te pregunta cómo va su hijo. ¿Qué haces para responder bien?",
    options: [
      { value: "mostra", label: "Le muestro un video, o se lo señalo desde el borde de la piscina la próxima vez" },
      { value: "dire", label: "Le cuento con palabras precisas qué ha cambiado" },
      { value: "sentire", label: "Le digo que baje al agua un momento con su hijo, para sentirlo él mismo" },
    ],
  },
  {
    key: "v6",
    prompt: "6. Tienes que memorizar una secuencia de pasos técnicos para un examen. ¿Cómo estudias mejor?",
    options: [
      { value: "mostra", label: "Mirando videos o imágenes de la secuencia" },
      { value: "dire", label: "Repitiéndola en voz alta, con mis propias palabras" },
      { value: "sentire", label: "Repitiendo el gesto con el cuerpo, incluso fuera del agua" },
    ],
  },
];

const DIARY_KEYS = ["q2", "q7", "q8a", "q8b"];

export const capitolo1StepsEs: Step[] = [
  // 0 — portada
  {
    day: "inicio",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 1 · YO</div>
        <h1>La comunicación es el resultado que obtienes</h1>
        <p className="lede">
          No importa lo que querías decir. Importa lo que llegó. Si un niño no hace lo que le
          pediste, la pregunta útil no es «por qué no me escucha» — es «cómo puedo decírselo de
          un modo que llegue».
        </p>
        <p className="lede">
          Todo LA LLAVE CORRECTA nace de esta sola frase. El resto son los modos de ponerla en
          práctica.
        </p>
      </>
    ),
  },

  // 1 — lunes §2
  {
    day: "lunes · 7 min",
    pct: 10,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lunes</div>
        <h1>Bienvenido a LA LLAVE CORRECTA</h1>
        <p className="lede">
          Dos preguntas — no hay una respuesta correcta, solo sirven para que notes algo sobre ti
          mismo, antes de leer una sola línea de teoría.
        </p>
        <p className="prompt">
          1. Cuando un niño no entiende lo que le pediste, ¿cuál es lo primero que haces, por
          instinto?
        </p>
        <OptionGroup name="q1" options={Q1_OPTIONS} selected={answers.q1} onPick={(v) => setResponse("q1", v)} />
        <p className="prompt">2. ¿Y cuando es un adulto el que no te entiende? ¿Es el mismo primer movimiento, o es distinto?</p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <p className="lede" style={{ marginTop: 14, fontStyle: "italic" }}>
          Ten ambas presentes — el test del miércoles vuelve sobre esto también.
        </p>
      </>
    ),
  },

  // 2 — martes explicación + control
  {
    day: "martes · 13 min",
    pct: 22,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.c1 && !!a.c2 && !!a.c3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Martes</div>
        <h1>Conocer cómo comunicas tú</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Esta semana aprendes una sola cosa, pero es la que sostiene todo lo demás: conocer cómo
          comunicas tú, antes de ocuparte de cómo comunica el niño.
        </p>
        <p className="lede">
          Tu ciclo de trabajo siempre empieza en el mismo punto — no en el niño, en ti:{" "}
          <strong>
            yo → reconozco al niño → observo → me pongo en sintonía → comunico → hago que actúe.
          </strong>
        </p>
        <p className="lede">
          Cada uno tiene un modo preferido de hacerse entender — quien muestra, quien explica con
          palabras, quien hace sentir el gesto. Ninguno está mal, pero si usas siempre y solo uno,
          el día en que ese modo no funcione no tienes un plan B.
        </p>
        <p className="lede">
          <strong>Estos tres modos tienen también un nombre técnico, que verás a menudo de aquí en adelante: VAK.</strong>{" "}
          La sigla viene del inglés — <em>Visual, Auditory, Kinesthetic</em> — en español Visual,
          Auditivo, Cinestésico (la sigla se mantiene igual): mostrar = visual, decir = auditivo,
          hacer sentir = cinestésico. Casi siempre usarás las palabras concretas, pero desde hoy,
          cuando leas «test VAK» o «perfil VAK», sabes a qué se refiere.
        </p>
        <div className="card quote">
          El test no te dice quién eres. Te muestra un hábito. Nunca encontrarás escrito «eres
          visual» — encontrarás «tu perfil muestra una tendencia hacia mostrar».
        </div>
        <p className="lede">
          <strong>Volvemos a la segunda pregunta del lunes</strong> — la del adulto. Para muchos
          instructores, el primer movimiento con un compañero o un padre es distinto del que
          tienen con un niño: quizás con un niño muestras, y con un adulto explicas con palabras,
          por costumbre social, no por elección consciente. Tu perfil VAK no es solo sobre niños:
          es el mismo automatismo que usas con cualquiera. Si con los adultos evitas un canal que
          con los niños usas a menudo — o al revés — significa una cosa: ese hábito no depende
          solo de la piscina. Es un automatismo tuyo, que llevas contigo a todas partes.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Control de fin de día</h2>
        <p className="prompt">1. ¿El test VAK te dice quién eres como instructor?</p>
        <OptionGroup
          name="c1"
          options={[
            { value: "no", label: "No — te muestra un hábito, no una identidad", correct: true },
            { value: "si", label: "Sí, es una fotografía definitiva", correct: false },
          ]}
          selected={answers.c1}
          onPick={(v, correct) => setResponse("c1", v, correct)}
        />
        <p className="prompt">2. Si usas siempre y solo un canal, ¿qué pasa?</p>
        <OptionGroup
          name="c2"
          options={[
            { value: "niente", label: "Nada, lo importante es ser claro", correct: false },
            { value: "terzo", label: "El día en que ese modo no funcione, no tienes un plan B", correct: true },
          ]}
          selected={answers.c2}
          onPick={(v, correct) => setResponse("c2", v, correct)}
        />
        <p className="prompt">3. ¿Tu automatismo comunicativo afecta solo al modo en que le hablas a los niños en la piscina?</p>
        <OptionGroup
          name="c3"
          options={[
            { value: "si", label: "Sí, es específico del contexto de la piscina", correct: false },
            { value: "no", label: "No — es el mismo automatismo que usas también con adultos, compañeros, padres", correct: true },
          ]}
          selected={answers.c3}
          onPick={(v, correct) => setResponse("c3", v, correct)}
        />
      </>
    ),
  },

  // 3 — miércoles ejemplo + aplicación
  {
    day: "miércoles · parte 1",
    pct: 34,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Miércoles</div>
        <h1>Tres intentos, tres canales</h1>
        <div className="card scene">
          <div className="who">Un instructor, un niño de 8 años, la braza</div>
          <p>
            El niño no logra coordinar las piernas. El instructor repite la demostración tres
            veces. Nada cambia. Prueba a decírselo con palabras — «empuja como si empujaras el
            agua». El niño lo intenta de nuevo: un poco mejor, pero todavía inseguro. Entonces el
            instructor le toma los tobillos fuera del agua y se los mueve él, pasivamente:{" "}
            <strong>hacer sentir</strong>. El niño lo repite, casi perfecto, al primer intento.
          </p>
        </div>
        <p className="lede">
          Tres intentos, tres canales — solo el tercero funcionó del todo. El instructor no había
          usado un método equivocado las primeras dos veces: solo había usado, uno detrás del
          otro, sus dos canales más cómodos.
        </p>
        <div className="card scene">
          <div className="who">El mismo instructor, esa noche, con un compañero nuevo</div>
          <p>
            Tiene que explicarle cómo organizar el material en el borde de la piscina antes de un
            turno con los pequeños. Empieza a hablar enseguida — enumera, describe, especifica
            cada detalle en voz alta. El compañero asiente, pero en la primera clase real olvida
            la mitad de las cosas. Es el mismo automatismo de antes, pero al revés. Con el niño,
            el instructor muestra o hace sentir primero, y dice después. Con el adulto va directo
            a «decir» — un canal que en el agua usa poco, pero que con las personas, fuera del
            agua, le sale natural. Solo cuando le muestra físicamente dónde va cada cosa, el
            compañero lo recuerda de verdad.
          </p>
        </div>
        <p className="lede">
          La misma persona, dos canales distintos, según el contexto — no según una elección
          consciente. Es exactamente el tipo de automatismo que el test de hoy empieza a mostrar.
        </p>
        <p className="prompt">
          Piensa en la última vez que tuviste que explicar algo y no llegó enseguida. ¿Qué
          hiciste primero — mostrar, decir, o guiar con las manos? ¿Y el segundo movimiento fue
          distinto del primero, o fue el mismo repetido más fuerte?
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota para la corrección, no mostrada al instructor: no hay una respuesta correcta. El
            sistema mira una sola cosa: si el segundo movimiento fue distinto del primero, o fue
            el mismo repetido más fuerte. */}
      </>
    ),
  },

  // 4 — el test VAK real
  {
    day: "miércoles · el test",
    pct: 50,
    nextLabel: "Ver tu perfil ▸",
    showBack: true,
    canNext: (a) => !!a.v1 && !!a.v2 && !!a.v3 && !!a.v4 && !!a.v5 && !!a.v6,
    onLeave: computeVakProfile,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Miércoles — el test</div>
        <h1>El test VAK</h1>
        <p className="lede">
          No hay respuestas correctas o incorrectas: cada pregunta pide qué harías — o qué
          recuerdas — primero.
        </p>
        {V_QUESTIONS.map((q) => (
          <div key={q.key}>
            <p className="prompt">{q.prompt}</p>
            <OptionGroup name={q.key} options={q.options} selected={answers[q.key]} onPick={(v) => setResponse(q.key, v)} />
          </div>
        ))}
        <p className="lede" style={{ fontStyle: "italic", fontSize: ".82rem" }}>
          Representativo — el conjunto completo de preguntas llega en la fase técnica.
        </p>
      </>
    ),
  },

  // 5 — miércoles: control de fin de día sobre el resultado recién obtenido
  {
    day: "miércoles · sobre el resultado",
    pct: 62,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => {
      const vak = computeVak(answers as never);
      return (
        <>
          <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Control de fin de día — sobre tu resultado</div>
          <h1>Mira el perfil que acabas de obtener</h1>
          <VakBars vak={vak} locale="es" />
          <p className="prompt">
            Piensa en un alumno que sigues desde hace un tiempo: con él, ¿cuál de los tres
            canales usas menos — justo el más bajo en tu perfil?
          </p>
          <Field id="q8a" value={answers.q8a ?? ""} onChange={(v) => setReflection("q8a", v)} />
          {/* Nota para la corrección, no mostrada al instructor: no es una pregunta con respuesta
              correcta o incorrecta: es la primera vez que el perfil toca a un niño real, no solo
              la teoría. El sistema registra si está conectando el dato abstracto con una persona
              real — es exactamente el paso que hace falta para usarlo de verdad, y no dejarlo en
              un número. */}
          <p className="prompt">
            Un pequeño paso más. Ahora que has nombrado ese canal, escribe una situación
            concreta — la próxima semana, con ese mismo alumno — en la que intentarás usarlo a
            propósito, aunque no te salga natural.
          </p>
          <Field id="q8b" value={answers.q8b ?? ""} onChange={(v) => setReflection("q8b", v)} />
          {/* Nota para la corrección, no mostrada al instructor: el sistema no juzga si lo
              consigue: solo mira si la situación descrita es concreta (un momento preciso, un
              ejercicio preciso) y no genérica («lo intentaré más a menudo»). Una intención
              genérica se olvida en el primer imprevisto del turno — una concreta se queda. */}
        </>
      );
    },
  },

  // 6 — viernes síntesis (perfil real)
  {
    day: "viernes · 7 min",
    pct: 78,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => a.cv === "giusta",
    render: ({ answers, setResponse }: StepContext) => {
      const vak = computeVak(answers as never);
      const noun = VAK_NOUN_ES[vak.prevalente];
      const adj = VAK_ADJ_ES[vak.prevalente];
      const cvFeedback: ReactNode =
        answers.cv === "giusta" ? (
          <div className="feedback ok">Exacto — un hábito se puede ampliar. Una etiqueta se queda pegada.</div>
        ) : answers.cv === "sbagliata" ? (
          <div className="feedback retry">No está mal ser breve — está mal decir que es quien eres. Vuelve a intentarlo.</div>
        ) : null;

      return (
        <>
          <div className="eyebrow">Viernes</div>
          <h1>Tu perfil</h1>
          <p className="lede">
            Así se lee, y así no se lee, tu resultado — el real, recién calculado a partir de tus
            respuestas.
          </p>
          <VakBars vak={vak} locale="es" />
          <div className="card quote">
            Tu perfil muestra una tendencia hacia <strong>{noun}</strong>. No significa que no
            sepas usar los otros canales — significa que, bajo presión, es en lo primero que
            piensas.
          </div>
          <p className="prompt">¿Qué frase usarías para contarle tu resultado a un compañero?</p>
          <OptionGroup
            name="cv"
            options={[
              {
                value: "giusta",
                label: `«Tu perfil muestra una tendencia hacia ${noun}» — describe un hábito`,
                correct: true,
              },
              { value: "sbagliata", label: `«Eres un instructor ${adj}» — es más corta`, correct: false },
            ]}
            selected={answers.cv}
            onPick={(v, correct) => setResponse("cv", v, correct)}
          />
          {cvFeedback}
        </>
      );
    },
  },

  // 7 — resultado + turno en la piscina
  {
    day: "viernes · resultado",
    pct: 92,
    nextLabel: "Ir al Panel ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers }: StepContext) => {
      const vak = computeVak(answers as never);
      return (
        <>
          <div className="eyebrow">§11 · Resultado</div>
          <h1>Tu perfil se crea, hoy</h1>
          <p className="lede">
            De aquí en adelante, cada capítulo cierra con una tabla como esta: cuatro fotografías
            distintas de la misma competencia, no una sola nota — cuánto sabes (del test), cuánto
            lo sabes aplicar por escrito, cómo te desenvuelves en una escena simulada, cuánto
            reflexionas sobre un turno real. Se quedan escritos con su nombre técnico, por
            transparencia.
          </p>
          <div className="card">
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".86rem" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>Puntuación</th>
                  <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>De dónde sale hoy</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                    application_score
                  </td>
                  <td style={{ padding: "6px 0" }}>Tu respuesta en §7 — ¿cambiaste de estrategia o la repetiste?</td>
                  <td style={{ textAlign: "right" }}>registrado ✓</td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                    VAK — perfil inicial
                  </td>
                  <td style={{ padding: "6px 0" }}>Las respuestas del test §8</td>
                  <td style={{ textAlign: "right" }}>{capitalize(VAK_NOUN_ES[vak.prevalente])} ✓</td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                    reflection_score
                  </td>
                  <td style={{ padding: "6px 0" }}>Todavía no — todavía no hay un turno real que contar</td>
                  <td style={{ textAlign: "right", color: "var(--ink-soft)" }}>todavía no</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Tu turno en la piscina</h2>
          <p className="lede">
            Esta semana no cambies nada. Solo cuenta cuántas veces explicas la misma cosa
            exactamente del mismo modo, a niños distintos. El número que encuentres no es una
            nota. Es el punto de partida.
          </p>
          <p className="lede" style={{ fontStyle: "italic" }}>
            Si no tienes un turno esta semana: haz el mismo ejercicio pensando en la última
            semana de trabajo que recuerdes bien.
          </p>
        </>
      );
    },
  },

  // 8 — panel
  {
    day: "panel",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const vak = computeVak(answers as never);
      return (
        <>
          <div className="done-badge">✓ Capítulo 1 completado</div>
          <div className="eyebrow">Semana 1 de 10 · Capítulo 2 próximamente</div>
          <h1>Quién tengo delante</h1>
          <p className="lede">
            Hoy te has mirado a ti mismo. La próxima semana aprendes a mirar al niño que tienes
            delante.
          </p>
          <h2>Tu perfil VAK</h2>
          <VakBars vak={vak} locale="es" />
          <ChapterDiarySection answers={answers} keys={DIARY_KEYS} locale="es" />
          <h2>Tu progreso</h2>
          <div className="chip-grid">
            <div className="chip in-sviluppo">
              <span className="name">1 · Conciencia personal</span>
              <span className="state">en desarrollo</span>
            </div>
            <div className="chip non-acquisita">
              <span className="name">2 · Reconocimiento del alumno</span>
              <span className="state">no adquirida</span>
            </div>
            <div className="chip non-acquisita">
              <span className="name">3 · Observar e interpretar <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
              <span className="state">no adquirida</span>
            </div>
            <div className="chip non-acquisita">
              <span className="name">4 · Sintonía</span>
              <span className="state">no adquirida</span>
            </div>
            <div className="chip non-acquisita">
              <span className="name">5 · Instrucciones y congruencia</span>
              <span className="state">no adquirida</span>
            </div>
            <div className="chip non-acquisita">
              <span className="name">6 · Verificar con la acción <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
              <span className="state">no adquirida</span>
            </div>
            <div className="chip non-acquisita">
              <span className="name">7 · El feedback</span>
              <span className="state">no adquirida</span>
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
      );
    },
  },
];
