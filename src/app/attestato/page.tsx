import Link from "next/link";
import { requireLearner } from "@/lib/auth/requireLearner";
import { loadAttestatoData } from "@/lib/attestato/data";
import { TIER_WORD } from "@/lib/attestato/copy";
import { DesktopChapterShell } from "@/components/desktop/DesktopChapterShell";
import { getLocale } from "@/lib/i18n/locale";
import { t } from "@/lib/i18n/catalog";

export default async function AttestatoPage() {
  await requireLearner();
  const [data, locale] = await Promise.all([loadAttestatoData(), getLocale()]);

  return (
    <DesktopChapterShell locale={locale} currentKind="attestato" currentNum="">
    <div className="app">
      <header className="topbar">
        <Link
          href="/dashboard"
          className="wordmark"
          style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: 6 }}
          aria-label={t("nav.backToDashboard", locale)}
        >
          <i className="ph-duotone ph-house" aria-hidden="true" />
          La Chiave Giusta
        </Link>
      </header>

      <main className="stage">
        <div className="eyebrow">{t("attestato.eyebrow", locale)}</div>
        <h1>{t("dashboard.attestatoTitle", locale)}</h1>

        {!data.available ? (
          <>
            <p className="lede">{t("attestato.locked", locale)}</p>
            <Link href="/dashboard" className="btn btn-primary" style={{ display: "block", textAlign: "center", marginTop: 16 }}>
              {t("nav.backToDashboard", locale)}
            </Link>
          </>
        ) : (
          <>
            <p className="lede">
              {t("attestato.scoreLabel", locale)} <strong>{data.result!.score}</strong> — {TIER_WORD[locale][data.result!.tier]}
              {data.result!.lode ? (
                <i className="ph-duotone ph-confetti" aria-hidden="true" style={{ marginLeft: 6 }} />
              ) : null}
            </p>
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- immagine generata dinamicamente lato server, next/image non si applica */}
              <img src="/api/attestato/image" alt={t("attestato.imageAlt", locale)} style={{ width: "100%", display: "block" }} />
            </div>
            <a
              href="/api/attestato/image"
              className="btn btn-primary"
              style={{ display: "block", textAlign: "center", marginTop: 16 }}
            >
              {t("attestato.download", locale)}
            </a>
            <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
              {t("attestato.scoreHint", locale)}
            </p>
          </>
        )}
      </main>
    </div>
    </DesktopChapterShell>
  );
}
