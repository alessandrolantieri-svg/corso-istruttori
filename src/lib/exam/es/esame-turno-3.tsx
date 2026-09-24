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
// internos que el turno italiano (src/lib/exam/esame-turno-3.tsx) — solo cambia el texto visible.
// Porta 1:1 beat1Outcome()/needsBeat2A()/matteoRecovered()/beat2Attention() del mockup
// esame-turno3.html: resultado del Beat 1: A = razón real + tono congruente, B = razón real + tono
// incongruente, D = ninguna razón real.
type Beat1Outcome = "A" | "B" | "D" | null;
function beat1Outcome(a: Record<string, string>): Beat1Outcome {
  return (a.beat1 as Beat1Outcome) || null;
}
function needsBeat2A(a: Record<string, string>): boolean {
  return beat1Outcome(a) === "D";
}
function matteoRecovered(a: Record<string, string>): boolean {
  return a.beat2a === "recupero";
}
type Beat2Attention = "libera" | "divisa";
function beat2Attention(a: Record<string, string>): Beat2Attention {
  const o = beat1Outcome(a);
  if (o === "A") return "libera";
  if (o === "D") return matteoRecovered(a) ? "libera" : "divisa";
  return "divisa"; // B
}

const BEAT1_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Das un motivo ligado a un beneficio concreto («te alarga la brazada, pruébalo y siente la diferencia») con un tono que dice que de verdad te importa la respuesta",
  },
  {
    value: "B",
    label:
      "Dices lo correcto («te viene bien») pero suspirando, mirando a otro lado, con un tono cortante que dice «no tengo tiempo para esto»",
  },
  {
    value: "D",
    label: "«Porque lo digo yo» o «venga, no me des la lata, se hace y punto» — ninguna razón real",
  },
];
const BEAT2A_OPTIONS: Option[] = [
  {
    value: "recupero",
    label:
      "Reconoces que no diste un motivo real, y se lo das ahora («tienes razón, espera un momento — te lo digo en serio...»)",
  },
  { value: "insisti", label: "Insistes con la autoridad («se hace porque lo digo yo, y punto»)" },
];
const ELENA_OPTIONS: Option[] = [
  { value: "silenzio", label: "Le pides su opinión, o te quedas en silencio dejando que sea ella quien se evalúe" },
  { value: "corregge", label: "La corriges de todos modos, por costumbre, aunque la observación sea correcta" },
];
const TONO_OPTIONS: Option[] = [
  {
    value: "congruente",
    label:
      "Feedback específico y congruente — p. ej. «has empujado con las piernas en el viraje, se ha notado la diferencia», dicho mirándolo",
  },
  {
    value: "tradisce",
    label: "Feedback técnicamente correcto pero el tono lo traiciona — sarcástico, cortante, o dicho mientras ya te alejas",
  },
];

const BEAT1_FEEDBACK: Record<Exclude<Beat1Outcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Matteo hace las repeticiones con un esfuerzo visible — no perfecto, pero real. Al final dice: «...vale, la verdad es que se nota diferente.»",
  },
  B: {
    ok: false,
    text: "Matteo lo hace, pero a medias: las palabras decían una cosa, el tono otra, y él se ha quedado en esa contradicción en vez del contenido. «Vale, como quieras» — lo hace, pero sin buscarle sentido.",
  },
  D: {
    ok: false,
    text: "Matteo hace un largo flojo, sin empujar de verdad — no es un rechazo abierto, es el mínimo indispensable. Un chico de 14 a 18 años, sin un motivo, no lo hace de verdad (Capítulo 2) — hace solo lo justo para no llamar la atención.",
  },
};

const BEAT2A_FEEDBACK: Record<"recupero" | "insisti", { ok: boolean; text: string }> = {
  recupero: {
    ok: true,
    text: "Matteo aminora, te mira — un poco sorprendido de que hayas vuelto sobre el tema en vez de dejarlo pasar. En el siguiente largo, empuja más.",
  },
  insisti: {
    ok: false,
    text: "Matteo no responde, pero hace el resto del entrenamiento desconectado, en silencio, al mínimo.",
  },
};

const ELENA_FEEDBACK: Record<"silenzio" | "corregge", { ok: boolean; text: string }> = {
  silenzio: {
    ok: true,
    text: "ELENA: «...creo que esta vez he mantenido mejor la posición. ¿Es verdad?» — ya ha dado su propio juicio antes de pedir el tuyo.",
  },
  corregge: {
    ok: false,
    text: "ELENA: «...vale.» — lo hace otra vez esperando, como siempre, tu veredicto final.",
  },
};

const TONO_FEEDBACK: Record<"congruente" | "tradisce", { ok: boolean; text: string }> = {
  congruente: {
    ok: true,
    text: "Matteo asiente, no dice mucho — pero en el siguiente largo el esfuerzo se mantiene.",
  },
  tradisce: {
    ok: false,
    text: "Matteo se cierra otra vez — las palabras decían una cosa, el tono otra, y la contradicción hizo que dejara de confiar.",
  },
};

const BEAT2_ATTENTION_TEXT: Record<Beat2Attention, string> = {
  libera: "Tu atención está libre, puedes seguir a Elena sin distracciones.",
  divisa:
    "Un ojo se queda en Matteo, que sigue nadando sin esfuerzo cerca de ahí: darle a Elena la atención tranquila que merece cuesta más cuando una parte de ti sigue vigilándolo a él.",
};

export const esameTurno3StepsEs: Step[] = [
  // 0 — intro
  {
    day: "antes de empezar",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Examen final · Turno 3</div>
        <h1>Los adolescentes, y quien ya sabe arreglárselas solo</h1>
        <p className="lede">
          Estás con un grupo de chicos de 14 a 18 años. El calentamiento incluye repeticiones de viraje — no es el
          favorito de nadie. <strong>Matteo (16 años)</strong> lleva unos meses en el grupo.{" "}
          <strong>Elena (17 años)</strong> entrena contigo desde hace tres años: con el viraje, ya no necesitas
          mirarla cada vez.
        </p>
        <div className="card warn">
          Esto no es un capítulo. No hay un botón «siguiente pregunta». Solo está lo que pasa después de lo que
          eliges.
        </div>
        <p className="lede">
          Como en los turnos anteriores: el turno está dividido en <strong>beats</strong> — los momentos de la
          misma escena, uno tras otro — y la nota va de 80 a 100, con el <strong>100 con honores</strong> reservado
          para quien también sabe recuperar bien un error en tiempo real.
        </p>
      </>
    ),
  },

  // 1 — beat1
  {
    day: "beat 1",
    pct: 12,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.beat1,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = beat1Outcome(answers);
      const fb = outcome ? BEAT1_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Beat 1 · El porqué</div>
          <h1>«Por qué siempre tenemos que hacer este ejercicio, es aburrido.»</h1>
          <p className="lede">
            Matteo se para, no cruza los brazos como haría un chico de doce años — es más una pregunta sincera que
            un desafío.
          </p>
          <p className="prompt">¿Qué respondes — las palabras que usas, y con qué tono?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Qué haces en realidad, en la práctica</h2>
          <OptionGroup name="beat1" options={BEAT1_OPTIONS} selected={answers.beat1} onPick={(v) => setResponse("beat1", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — beat2a, solo si el resultado es D
  {
    day: "beat 2a — recuperación",
    pct: 24,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q2a && !!a.beat2a,
    visible: (a) => needsBeat2A(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const val = answers.beat2a as "recupero" | "insisti" | undefined;
      const fb = val ? BEAT2A_FEEDBACK[val] : null;
      return (
        <>
          <div className="eyebrow">Beat 2A · solo porque no diste una razón real</div>
          <h1>Matteo al mínimo</h1>
          <p className="lede">
            Matteo sigue nadando al mínimo, un metro separado del grupo, sin empujar.
          </p>
          <p className="prompt">Tienes una segunda encrucijada. ¿Qué haces ahora?</p>
          <Field id="q2a" value={answers.q2a ?? ""} onChange={(v) => setReflection("q2a", v)} />
          <h2>Qué haces en realidad, en la práctica</h2>
          <OptionGroup name="beat2a" options={BEAT2A_OPTIONS} selected={answers.beat2a} onPick={(v) => setResponse("beat2a", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 3 — beat2, el viraje de Elena
  {
    day: "beat 2 — Elena",
    pct: 40,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q2 && !!a.elena,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const attn = beat2Attention(answers);
      const val = answers.elena as "silenzio" | "corregge" | undefined;
      const fb = val ? ELENA_FEEDBACK[val] : null;
      return (
        <>
          <div className="eyebrow">Beat 2 · Dejarla ir</div>
          <h1>El viraje de Elena</h1>
          <p className="lede">
            Mientras tanto, sin relación con cómo haya ido con Matteo — es un problema aparte, no una consecuencia —
            llega el momento de Elena. Completa un viraje técnicamente limpio, el tipo que hace un año corregías
            casi siempre. Hoy no lo ha necesitado.
          </p>
          <div className="card">{BEAT2_ATTENTION_TEXT[attn]}</div>
          <p className="prompt">¿Qué le dices, justo después del viraje?</p>
          <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
          <h2>Qué haces en realidad, en la práctica</h2>
          <OptionGroup name="elena" options={ELENA_OPTIONS} selected={answers.elena} onPick={(v) => setResponse("elena", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 4 — beat3, congruencia bajo presión
  {
    day: "beat 3 — Matteo",
    pct: 60,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q3 && !!a.tono,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const val = answers.tono as "congruente" | "tradisce" | undefined;
      const fb = val ? TONO_FEEDBACK[val] : null;
      return (
        <>
          <div className="eyebrow">Beat 3 · Congruencia bajo presión</div>
          <h1>El primer esfuerzo real de Matteo, hoy</h1>
          <p className="lede">
            Hacia el final del turno, Matteo — sea cual sea la versión a la que hayas llegado — intenta por primera
            vez hoy un esfuerzo real. Incluso en la versión «Matteo desconectado», algo lo mueve: ve que Elena
            recibe confianza en vez de correcciones, y lo intenta. La ejecución no es perfecta, pero hay, por
            primera vez hoy, un esfuerzo real.
          </p>
          <p className="prompt">
            Escribe qué le dices — tiene que ser congruente: las palabras, el tono y lo que comunica tu cuerpo
            tienen que decir lo mismo.
          </p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
          <h2>Qué haces en realidad, en la práctica</h2>
          <OptionGroup name="tono" options={TONO_OPTIONS} selected={answers.tono} onPick={(v) => setResponse("tono", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 5 — cierre
  {
    day: "cierre",
    pct: 82,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Cierre del Turno 3 — el último de los tres</div>
        <h1>Mirando atrás a los tres turnos juntos</h1>
        <p className="prompt">
          ¿Qué has aprendido sobre ti mismo como instructor, que no sabías mirando solo los diez capítulos uno por
          uno?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Esta reflexión no cuenta para la nota: es la última antes del resultado final del examen.
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
      const c2 = o === "D" ? (matteoRecovered(answers) ? "fallada, pero recuperada" : "fallada, sin recuperar") : "resuelta";
      const b1c5 = o === "A" ? "tono congruente" : o === "B" ? "tono incongruente" : "ninguna razón dada";
      const b3c5 = answers.tono === "congruente" ? "feedback congruente" : "tono que traiciona las palabras";
      const c10 = answers.elena === "silenzio" ? "resuelta" : "oportunidad perdida, no un error grave";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Turno 3 completado</div>
          <div className="exam-badge"><i className="ph-duotone ph-flag-checkered" aria-hidden="true" /> Los tres turnos están completos</div>
          <div className="eyebrow">Cómo se lee el resultado</div>
          <h1>Los adolescentes, y quien ya sabe arreglárselas solo</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">C2 · Comunicación por edad (14-18)</span>
              <span className="esito">{c2}</span>
            </div>
            <div className="result-row">
              <span className="comp">C5 · Congruencia</span>
              <span className="esito">
                Beat 1: {b1c5} · Beat 3: {b3c5}
              </span>
            </div>
            <div className="result-row">
              <span className="comp">C10 · Autonomía</span>
              <span className="esito">{c10}</span>
            </div>
          </div>
          {o === "D" && matteoRecovered(answers) && (
            <div className="card quote">
              Dar marcha atrás en una orden mal dada, delante del chico que te ha puesto a prueba, sin perder la
              cara y sin montar una escena: es una buena recuperación, hecha bajo observación. Exactamente el tipo
              de prueba que hace falta para el 100 con honores.
            </div>
          )}
          <p className="lede">
            El turno se cierra de todos modos, sea cual sea el camino que hayas tomado — coherente con «no se puede
            fallar, solo posponer». Con esto, los tres turnos del examen final están completos.
          </p>
        </>
      );
    },
  },
];
