import { OptionGroup, type Option } from "@/components/OptionGroup";
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

// Traducción al español, no es un turno independiente: mismos chapterId/claves de respuesta/valores
// internos que el turno italiano (src/lib/exam/esame-turno-1.tsx) — solo cambia el texto visible.
// Porta 1:1 beat1Outcome()/beat2Version() del mockup esame-turno1.html: Aurora y Diego son dos
// lecturas sin relación, evaluadas por separado — cuatro resultados, no dos.
type Beat1Outcome = "A" | "B" | "C" | "D" | null;
function beat1Outcome(a: Record<string, string>): Beat1Outcome {
  const aurora = a.aurora,
    diego = a.diego;
  if (!aurora || !diego) return null;
  if (aurora === "giusta" && diego === "giusta") return "A";
  if (aurora === "giusta" && diego === "sbagliata") return "B";
  if (aurora === "sbagliata" && diego === "giusta") return "C";
  return "D";
}
function needsBeat2A(a: Record<string, string>): boolean {
  return beat1Outcome(a) === "D";
}
type Beat2Version = "pulita" | "diego-agitato" | "aurora-ferma" | "recupero-riuscito" | "mai-recuperato";
function beat2Version(a: Record<string, string>): Beat2Version {
  const o = beat1Outcome(a);
  if (o === "A") return "pulita";
  if (o === "B") return "diego-agitato";
  if (o === "C") return "aurora-ferma";
  if (o === "D") return a.beat2a === "separi" ? "recupero-riuscito" : "mai-recuperato";
  return "pulita";
}

const AURORA_OPTIONS: Option[] = [
  { value: "giusta", label: "Te acercas, te pones a su altura, le tiendes la mano sin decirle «entra»" },
  {
    value: "sbagliata",
    label: "Usas una tranquilización genérica o intentas que entre directamente («venga, no ha pasado nada, ven»)",
  },
];
const DIEGO_OPTIONS: Option[] = [
  { value: "giusta", label: "Le das una tarea que use su energía («¡tráeme tú las tablas, corre!»)" },
  {
    value: "sbagliata",
    label: "Te limitas a llamarle la atención («¡Diego, quieto!») sin darle dónde poner esa energía",
  },
];
const BEAT2A_OPTIONS: Option[] = [
  {
    value: "separi",
    label: "Separas los dos problemas — le das a Diego y a Elisa una tarea rápida y distinta, y solo después vuelves con Aurora con calma",
  },
  {
    value: "insisti",
    label: "Insistes con la misma jugada que ya no ha funcionado — vuelves a llamar la atención a todos en voz alta, o repites la misma tranquilización genérica",
  },
];

const BEAT1_FEEDBACK: Record<Exclude<Beat1Outcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Aurora, al sentirte cerca y sin sentirse presionada, mete el pie más adentro. Diego, con algo que hacer, canaliza esa energía y vuelve corriendo hacia el grupo, contento.",
  },
  B: {
    ok: false,
    text: "Aurora se relaja y mete el pie. Diego se detiene un segundo, pero casi enseguida vuelve a empujar — una llamada de atención no le ha dado nada que hacer con esa energía.",
  },
  C: {
    ok: false,
    text: "Diego se aleja contento con su tarea. Aurora se queda quieta — la tranquilización no la ha alcanzado: su causa era el miedo, no la duda, y para eso no basta convencerla con palabras.",
  },
  D: {
    ok: false,
    text: "Aurora no se mueve — la tranquilización genérica no la ha alcanzado. Diego, llamado en voz alta, se detiene un segundo pero enseguida vuelve a empezar: no necesitaba una orden, necesitaba descargar esa energía en algún sitio.",
  },
};

const BEAT2_VERSION_TEXT: Record<Beat2Version, string> = {
  pulita: "El grupo está tranquilo. Toda tu atención está libre para Marco.",
  "diego-agitato": "Diego sigue moviéndose al borde del grupo mientras intentas seguir a Marco: un ojo tiene que quedarse en él.",
  "aurora-ferma": "Aurora se ha quedado en el borde, no ha vuelto a entrar: un ojo tiene que quedarse en ella mientras trabajas con Marco.",
  "recupero-riuscito": "El grupo se ha vuelto a reunir, pero unos minutos más tarde de lo previsto: Marco ha esperado, un poco distraído por lo que pasó antes.",
  "mai-recuperato": "El grupo llega todavía agitado: Diego sigue molestando al borde mientras intentas trabajar con Marco.",
};

export const esameTurno1StepsEs: Step[] = [
  // 0 — intro
  {
    day: "antes de empezar",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Examen final · Turno 1</div>
        <h1>El grupo de los pequeños</h1>
        <p className="lede">
          Tienes delante un grupo de cuatro niños: <strong>Aurora (4 años)</strong>, <strong>Elisa (6 años)</strong>,{" "}
          <strong>Marco (7 años)</strong> y <strong>Diego (9 años)</strong>. Es el turno del miércoles: quince
          minutos de calentamiento, y luego el ejercicio de la semana.
        </p>
        <div className="card warn">
          Esto no es un capítulo. No hay un botón «siguiente pregunta». Solo está lo que pasa después de lo que
          eliges.
        </div>
        <p className="lede">
          El turno está dividido en <strong>beats</strong> — los momentos de la misma escena, uno tras otro: lo que
          eliges en un beat cambia el beat que sigue. No son preguntas separadas, es una escena única que se mueve
          contigo.
        </p>
        <p className="lede">
          La nota va de 80 a 100. El <strong>100 con honores</strong> es el nivel más alto: no basta con responder
          bien, hace falta también saber recuperar un error en tiempo real, delante del grupo — si te pasa, es una
          oportunidad, no un problema.
        </p>
      </>
    ),
  },

  // 1 — beat1
  {
    day: "beat 1",
    pct: 14,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.aurora && !!a.diego,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = beat1Outcome(answers);
      const fb = outcome ? BEAT1_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Beat 1 · Dos cosas a la vez</div>
          <h1>Aurora y Diego, en el mismo momento</h1>
          <p className="lede">
            Acabas de llegar al borde. <strong>Aurora</strong> está quieta, con el pie en el agua hasta el tobillo,
            sin moverse — los hombros arriba, tensos, los ojos fijos en el agua. En el mismo momento,{" "}
            <strong>Diego</strong> empieza a empujar a Marco en broma, riendo fuerte, y no puede quedarse quieto.
          </p>
          <p className="prompt">Tienes un instante. ¿Con quién empiezas, y qué haces primero?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Qué haces en realidad, en la práctica</h2>
          <p className="lede">
            Aurora y Diego son dos situaciones sin relación — se evalúan por separado, no como un bloque único.
          </p>
          <p className="prompt">Con Aurora:</p>
          <OptionGroup name="aurora" options={AURORA_OPTIONS} selected={answers.aurora} onPick={(v) => setResponse("aurora", v)} />
          <p className="prompt">Con Diego:</p>
          <OptionGroup name="diego" options={DIEGO_OPTIONS} selected={answers.diego} onPick={(v) => setResponse("diego", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — beat2a, solo si el resultado es D
  {
    day: "beat 2a — recuperación",
    pct: 28,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q2a && !!a.beat2a,
    visible: (a) => needsBeat2A(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Beat 2A · solo porque ninguna de las dos lecturas era correcta</div>
        <h1>El grupo empieza a desunirse</h1>
        <p className="lede">
          Aurora sigue quieta. Diego, mientras tanto, ha vuelto a empujar — esta vez a Elisa, que se aleja molesta.
          El grupo empieza a desunirse.
        </p>
        <p className="prompt">Tienes una segunda encrucijada. ¿Qué haces ahora?</p>
        <Field id="q2a" value={answers.q2a ?? ""} onChange={(v) => setReflection("q2a", v)} />
        <h2>Qué haces en realidad, en la práctica</h2>
        <OptionGroup name="beat2a" options={BEAT2A_OPTIONS} selected={answers.beat2a} onPick={(v) => setResponse("beat2a", v)} />
        {answers.beat2a === "separi" && (
          <div className="feedback ok">
            Diego se aleja contento con una tarea que hacer. Elisa, escuchada un momento a solas, se tranquiliza.
            Aurora, ya sin el alboroto alrededor, mete por fin el pie más adentro.
          </div>
        )}
        {answers.beat2a === "insisti" && (
          <div className="feedback retry">
            Elisa se aleja todavía más, ahora también enfurruñada. Diego, sin nada que hacer, vuelve a empujar.
            Aurora, al oír la voz alzada en el grupo, se pone más rígida en vez de relajarse.
          </div>
        )}
      </>
    ),
  },

  // 3 — beat2, la instrucción para Marco
  {
    day: "beat 2",
    pct: 45,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q2,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Beat 2 · La instrucción para Marco</div>
        <h1>El contexto con el que llegas</h1>
        <div className="card">{BEAT2_VERSION_TEXT[beat2Version(answers)]}</div>
        <p className="lede">
          <strong>Ahora le toca a Marco, 7 años.</strong> Tiene que aprender la entrada al agua en dos tiempos —
          brazos, luego piernas — un ejercicio nuevo para él.
        </p>
        <p className="prompt">
          Escribe la instrucción que le darías, en positivo, adecuada a su edad (6-10 años: puede seguir dos pasos
          seguidos).
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
      </>
    ),
  },

  // 4 — beat3, la comprobación que no se ve
  {
    day: "beat 3",
    pct: 62,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q3,
    render: ({ answers, setReflection }: StepContext) => {
      const v = beat2Version(answers);
      const noise =
        v === "diego-agitato" || v === "mai-recuperato" ? (
          <div className="card">
            Justo en ese momento Diego, al borde, se ríe fuerte por algo — Marco puede haberse parado por la duda
            técnica, o por haberse distraído al girarse hacia la risa. Leer las cuatro causas del Capítulo 3 es aquí
            genuinamente más difícil, no solo más estresante: un elemento más que descartar antes de llegar a la
            causa real.
          </div>
        ) : v === "aurora-ferma" ? (
          <div className="card">
            La atención está dividida entre Marco y Aurora — el riesgo no es un ruido que confunda la lectura, sino
            el tiempo: qué tan rápido notas la duda de Marco mientras un ojo se queda en ella.
          </div>
        ) : (
          <div className="card">El momento es claro, sin ruido alrededor — solo Marco y su duda.</div>
        );
      return (
        <>
          <div className="eyebrow">Beat 3 · La comprobación que no se ve</div>
          <h1>La duda de Marco</h1>
          <p className="lede">
            Marco lo hace. Parece correcto — pero se detiene un instante antes del segundo paso, con una expresión
            que no logras leer bien.
          </p>
          {noise}
          <p className="prompt">
            ¿Cuál de las cuatro causas del Capítulo 3 te parece más probable, y qué haces — no qué le preguntas con
            palabras, qué haces — para descubrirlo?
          </p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
        </>
      );
    },
  },

  // 5 — cierre
  {
    day: "cierre",
    pct: 80,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Cierre del Turno 1</div>
        <h1>Qué te llevas</h1>
        <p className="lede">
          El turno termina. El grupo sale del agua, Aurora sonriendo, Marco todavía un poco inseguro con el último
          ejercicio.
        </p>
        <p className="prompt">
          Una última pregunta, antes de pasar al Turno 2: ¿qué te llevas de este turno, para el siguiente?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Esta reflexión no cuenta para la nota: es la misma que has hecho durante diez semanas, la última vez antes
          del resultado.
        </p>
      </>
    ),
  },

  // 6 — resultado
  {
    day: "resultado",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = beat1Outcome(answers);
      const c4 =
        o === "A"
          ? "resuelta a la primera"
          : o === "B" || o === "C"
            ? "resuelta en parte"
            : answers.beat2a === "separi"
              ? "fallada, pero recuperada"
              : "fallada, sin recuperar";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Turno 1 completado</div>
          <div className="eyebrow">Cómo se lee el resultado</div>
          <h1>El grupo de los pequeños</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">C4 · Sintonía</span>
              <span className="esito">{c4}</span>
            </div>
            <div className="result-row">
              <span className="comp">C2 · Reconocimiento del alumno</span>
              <span className="esito">registrado <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            <div className="result-row">
              <span className="comp">C5 · Instrucción en positivo</span>
              <span className="esito">registrado <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            <div className="result-row">
              <span className="comp">C3 <i className="ph-duotone ph-trophy" aria-hidden="true" /> · Observar e interpretar</span>
              <span className="esito">registrado <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
          </div>
          {o === "D" && answers.beat2a === "separi" && (
            <div className="card quote">
              Un error bien recuperado no equivale a no haberse equivocado nunca — pero tampoco es un simple remedio.
              Demuestra que sabes adaptarte bien bajo presión: el camino hacia la nota máxima no pasa solo por un
              turno perfecto de principio a fin.
            </div>
          )}
          <p className="lede">
            El turno continúa en cualquier caso, sea cual sea el camino que hayas tomado — coherente con «no se
            puede fallar, solo posponer». El próximo turno te espera: <strong>Turno 2 — La situación difícil.</strong>
          </p>
        </>
      );
    },
  },
];
