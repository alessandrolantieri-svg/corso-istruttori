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

// Porta 1:1 situOutcome() del mockup caso-reale-13.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Te tomas la pregunta en serio y le ofreces una elección real y limitada, no simbólica («elige tú cuál de los dos ejercicios de piernas hacemos primero, el resto sigue como estaba previsto»), con un tono que demuestra que lo has pensado de verdad",
  },
  {
    value: "B",
    label:
      "Respondes de forma técnicamente correcta pero cortante («la programación la hago yo, cada ejercicio tiene un motivo»), cierto en el contenido pero dicho sin detenerte, casi molesto",
  },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Andrea elige, con más atención de la que habría puesto en un ejercicio impuesto — no era la elección en sí lo que importaba, era que lo tomaran en serio.",
  },
  B: {
    ok: false,
    text: "Andrea no insiste, pero durante el resto de la clase se mantiene distante. Recibió una respuesta correcta en el contenido, pero dicha con un tono cortante, casi molesto. Las palabras decían una cosa, el tono otra — y eso hizo que dejara de confiar.",
  },
};

export const casoReale13StepsEs: Step[] = [
  // 0 — intro
  {
    day: "caso real 13",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reales · Escenario 13 · el último de la biblioteca</div>
        <h1>El adolescente que quiere ser tratado como un adulto</h1>
        <p className="lede">
          Franja 14-18. Competencias: comunicación por edad (Cap. 2) · congruencia (Cap. 5). Último escenario de
          la biblioteca — cierra el arco 3-18 que empezó con Nicolò, 4 años, que solo necesitaba que lo miraran a
          los ojos.
        </p>
        <div className="card">
          Escenario breve y autónomo — no tiene una puntuación de examen: es material al que puedes volver
          cuando quieras.
        </div>
      </>
    ),
  },

  // 1 — situazione
  {
    day: "situación",
    pct: 30,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situación</div>
          <h1>Andrea, 16 años</h1>
          <p className="lede">
            Te pregunta, no para discutir sino en serio: «¿por qué nunca me dejas elegir nada de la
            programación? Sé perfectamente lo que necesito mejorar.»
          </p>
          <p className="prompt">¿Qué respondes — las palabras, y con qué tono?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Qué haces realmente, en la práctica</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — chiusura
  {
    day: "cierre — el último de la biblioteca",
    pct: 70,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Cierre — el último de la biblioteca</div>
        <h1>Mirando atrás, a los trece escenarios</h1>
        <p className="prompt">
          ¿Qué tienen en común un niño de 4 años que solo necesita que lo miren a los ojos, y un chico de 16 que
          pide elegir?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Reflexión libre, no cuenta para la puntuación.
        </p>
      </>
    ),
  },

  // 3 — come si legge
  {
    day: "cómo se lee esto",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "gestionada a la primera" : "no gestionada — la petición sigue sobre la mesa";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Escenario completado</div>
          <div className="exam-badge"><i className="ph-duotone ph-flag-checkered" aria-hidden="true" /> Biblioteca de los 13 Casos Reales completa</div>
          <div className="eyebrow">Cómo se lee este escenario</div>
          <h1>El adolescente que quiere ser tratado como un adulto</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Comunicación por edad + congruencia</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <div className="card quote">
            El hilo que atraviesa toda la biblioteca, del primer escenario al último: a cada edad la petición
            cambia de forma — una mirada, una pregunta, un «por qué» — pero es siempre lo mismo: sentirse visto
            por cómo se es en ese momento, no por la edad que se tiene.
          </div>
        </>
      );
    },
  },
];
