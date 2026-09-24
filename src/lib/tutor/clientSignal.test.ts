import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { markTutorUsed, wasTutorUsedRecently } from "./clientSignal";

// Ambiente "node" (vitest.config.ts), niente jsdom: localStorage non esiste di default. Una
// finta minima basta — qui si verifica la logica della finestra temporale, non l'API browser
// vera (quella non ha nulla da testare, è una singola riga di lettura/scrittura).
function fakeLocalStorage() {
  const store = new Map<string, string>();
  return {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  };
}

describe("clientSignal", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", fakeLocalStorage());
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("subito dopo markTutorUsed, risulta usato di recente", () => {
    markTutorUsed();
    expect(wasTutorUsedRecently()).toBe(true);
  });

  it("mai usato: risulta false, non un errore", () => {
    expect(wasTutorUsedRecently()).toBe(false);
  });

  it("dentro la finestra (20 minuti di default): ancora true", () => {
    markTutorUsed();
    vi.advanceTimersByTime(19 * 60 * 1000);
    expect(wasTutorUsedRecently()).toBe(true);
  });

  it("oltre la finestra: torna false", () => {
    markTutorUsed();
    vi.advanceTimersByTime(21 * 60 * 1000);
    expect(wasTutorUsedRecently()).toBe(false);
  });

  it("una finestra diversa da quella di default viene rispettata", () => {
    markTutorUsed();
    vi.advanceTimersByTime(5 * 60 * 1000);
    expect(wasTutorUsedRecently(2 * 60 * 1000)).toBe(false); // oltre una finestra di 2 minuti
    expect(wasTutorUsedRecently(10 * 60 * 1000)).toBe(true); // dentro una finestra di 10 minuti
  });

  it("localStorage non disponibile: degrada a false, non lancia un errore", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("storage non disponibile");
      },
      setItem: () => {
        throw new Error("storage non disponibile");
      },
    });
    expect(() => markTutorUsed()).not.toThrow();
    expect(wasTutorUsedRecently()).toBe(false);
  });
});
