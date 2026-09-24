"use client";

import { useRef, useState, type ReactNode } from "react";

export interface DashboardTabDef {
  id: string;
  label: string;
  panel: ReactNode;
}

// N schede (Capitoli / Esame finale / Casi Reali / Il tuo profilo) invece di lunghe sezioni
// sempre visibili in coda alla Dashboard — il contenuto di ciascuna arriva già pronto dal Server
// Component padre, questo componente si limita a mostrarne una alla volta.
export function DashboardTabs({ tabs }: { tabs: DashboardTabDef[] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Frecce sinistra/destra spostano sia il focus sia la selezione fra le schede, con
  // avvolgimento (dall'ultima torna alla prima) — pattern "attivazione automatica" delle ARIA
  // Authoring Practices per role="tab", non solo un click.
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const index = tabs.findIndex((t) => t.id === activeId);
    const delta = e.key === "ArrowRight" ? 1 : -1;
    const next = tabs[(index + delta + tabs.length) % tabs.length];
    setActiveId(next.id);
    tabRefs.current[next.id]?.focus();
  }

  // Colonne uguali per ogni scheda, senza riga finale a metà larghezza: fino a 3 schede, tutte
  // sulla stessa riga; da 4 in su, 2 per riga (più colonne renderebbero ogni scheda troppo
  // stretta per etichette come "I tuoi 10 capitoli").
  const columns = tabs.length <= 3 ? tabs.length : 2;

  return (
    <>
      <div className="tabs" role="tablist" onKeyDown={onKeyDown} style={{ "--tab-columns": columns } as React.CSSProperties}>
        {tabs.map((tabDef) => (
          <button
            key={tabDef.id}
            ref={(el) => {
              tabRefs.current[tabDef.id] = el;
            }}
            type="button"
            id={`tab-${tabDef.id}`}
            role="tab"
            className="tab pressable"
            aria-selected={activeId === tabDef.id}
            aria-controls={`panel-${tabDef.id}`}
            tabIndex={activeId === tabDef.id ? 0 : -1}
            onClick={() => setActiveId(tabDef.id)}
          >
            {tabDef.label}
          </button>
        ))}
      </div>
      {tabs.map((tabDef) => (
        <div key={tabDef.id} id={`panel-${tabDef.id}`} role="tabpanel" aria-labelledby={`tab-${tabDef.id}`} hidden={activeId !== tabDef.id}>
          {tabDef.panel}
        </div>
      ))}
    </>
  );
}
