"use client";

import { useActionState, useTransition } from "react";
import { login, quickLogin, freeAccess, type LoginState } from "./actions";
import { t, type Locale } from "@/lib/i18n/catalog";

const initialState: LoginState = {};

// quickLoginEnabled arriva dal server (page.tsx): l'accesso rapido è vietato in produzione da
// quickLogin() stessa — mostrare i bottoni lì significava un 500 ad ogni click (visto sul primo
// deploy Netlify, D72). Se il server non lo permette, i bottoni e la nota non compaiono.
export default function LoginForm({
  locale,
  quickLoginEnabled,
  freeAccessEnabled,
}: {
  locale: Locale;
  quickLoginEnabled: boolean;
  // Acceso solo in fase di costruzione (src/lib/construction.ts, D73).
  freeAccessEnabled: boolean;
}) {
  const [state, formAction, pending] = useActionState(login, initialState);
  // Stato "sto entrando" per l'accesso libero: su Netlify il primo accesso dopo qualche minuto di
  // inattività sveglia funzione e database (8-10 s dal telefono, visto dal proprietario) — senza
  // un segno immediato il tasto sembra rotto.
  const [entering, startEntering] = useTransition();

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1 className="wordmark" style={{ marginBottom: 4, marginTop: 0 }}>
          La Chiave Giusta
        </h1>
        <p className="lede" style={{ marginBottom: 20 }}>
          {t("login.tagline", locale)}
        </p>

        {quickLoginEnabled && (
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ flex: 1 }}
              onClick={() => quickLogin("demo@delfino.it")}
            >
              {t("login.quickDelfino", locale)}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ flex: 1 }}
              onClick={() => quickLogin("demo@airone.it")}
            >
              {t("login.quickAirone", locale)}
            </button>
          </div>
        )}

        {state.error && (
          <div className="auth-error" role="alert">
            {t(`login.error.${state.error}`, locale)}
          </div>
        )}

        <form action={formAction}>
          <div className="auth-field">
            <label htmlFor="email">{t("login.email", locale)}</label>
            <input
              className="field"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>
          <div className="auth-field">
            <label htmlFor="password">{t("login.password", locale)}</label>
            <input
              className="field"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={pending} style={{ width: "100%" }}>
            {pending ? t("login.submitPending", locale) : t("login.submit", locale)}
          </button>
        </form>

        {/* Accesso libero (D73): l'app è in costruzione, senza registrazione — un tasto per
            entrare e guardarla, sempre con lo stesso account di prova. */}
        {freeAccessEnabled && (
          <>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ width: "100%", marginTop: 12 }}
              disabled={entering}
              aria-busy={entering}
              onClick={() => startEntering(() => freeAccess())}
            >
              {entering ? t("login.freeAccessPending", locale) : t("login.freeAccess", locale)}
            </button>
            <p className="auth-hint">{t("login.freeAccessHint", locale)}</p>
          </>
        )}

        {quickLoginEnabled && <p className="auth-hint">{t("login.hint", locale)}</p>}
      </div>
    </main>
  );
}
