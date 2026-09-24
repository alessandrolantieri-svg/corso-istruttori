import type { ReactNode } from "react";
import type { VakProfileData } from "@/lib/progressActions";

export interface StepContext {
  answers: Record<string, string>;
  // Profilo VAK reale, calcolato una sola volta al Capitolo 1 — null finché non esiste ancora.
  // Disponibile in ogni capitolo per mostrare "il tuo profilo" nella dashboard di fine capitolo.
  vakProfile: VakProfileData | null;
  setResponse: (key: string, value: string, correct?: boolean) => void;
  setReflection: (key: string, value: string) => void;
}

export interface Step {
  day: string;
  pct: number;
  nextLabel: string | null;
  showBack: boolean;
  canNext: (answers: Record<string, string>) => boolean;
  render: (ctx: StepContext) => ReactNode;
  // Effetto collaterale eseguito lasciando questo step, prima di avanzare — es. il Capitolo 1
  // lo usa per calcolare e salvare il profilo VAK una sola volta, leggendo da DB.
  onLeave?: () => Promise<void> | void;
  // Assente in tutti i capitoli (10/10 hanno una scaletta fissa). Serve solo all'esame finale,
  // dove uno step intero (es. Beat 2A — il recupero) esiste solo su certi esiti del beat
  // precedente — porta 1:1 la stepList() dinamica dei mockup esame-turno-N.html.
  visible?: (answers: Record<string, string>) => boolean;
}

export interface ChapterDef {
  chapterId: string; // slug, es. "capitolo-1"
  title: string; // titolo del capitolo, per la Dashboard (es. "Io")
  steps: Step[];
}
