import { TIER_WORD, TIER_BODY, LODE_LINE, TAGLINE, CERT_LABELS } from "./copy";
import type { Tier } from "./score";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/catalog";

// Layout pensato per satori (il motore di next/og ImageResponse): niente pseudo-elementi, niente
// variabili CSS, niente aspect-ratio/clamp — solo flexbox e misure fisse. Porta 1:1 il design
// approvato in 06_ATTESTATO/attestato.html (D22), alla scala di questo canvas (1600×1131,
// stesso rapporto 1.4142 orizzontale).

const INK = "#1B2624";
const INK_SOFT = "#5B6B67";
const DEEP = "#0B4257";
const GOLD = "#9C6B15";
const GOLD_TINT = "#F4E8D2";
const GOLD_LINE = "#C79A44";
const STOCK = "#FAF6EE";
const RULE = "rgba(27,38,36,0.16)";

function Seal() {
  return (
    <svg width="64" height="64" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="47" stroke={GOLD_LINE} strokeWidth="1.5" />
      <circle cx="50" cy="50" r="40" stroke={DEEP} strokeWidth="1" />
      <g transform="translate(50,47)">
        <circle cx="0" cy="-10" r="9" stroke={GOLD} strokeWidth="2.4" />
        <rect x="-2.2" y="-2" width="4.4" height="22" fill={GOLD} />
        <rect x="-2.2" y="12" width="10" height="4" fill={GOLD} />
        <rect x="-2.2" y="19" width="7" height="4" fill={GOLD} />
      </g>
    </svg>
  );
}

export interface CertificateImageProps {
  learnerName: string;
  completedAtLabel: string;
  score: number;
  tier: Tier;
  locale?: Locale;
}

export function CertificateImage({ learnerName, completedAtLabel, score, tier, locale = DEFAULT_LOCALE }: CertificateImageProps) {
  const body = TIER_BODY[locale][tier];
  const labels = CERT_LABELS[locale];
  const scoreLabel = tier === "lode" ? "100" : String(score);

  return (
    <div
      style={{
        width: 1600,
        height: 1131,
        display: "flex",
        position: "relative",
        background: STOCK,
        padding: 40,
        fontFamily: "Manrope",
      }}
    >
      <div style={{ position: "absolute", inset: 22, border: `2px solid ${GOLD_LINE}`, display: "flex" }} />
      <div style={{ position: "absolute", inset: 32, border: `1.5px solid ${DEEP}`, opacity: 0.55, display: "flex" }} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "58px 96px 46px", position: "relative" }}>
        {/* top */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <Seal />
          <div
            style={{
              fontFamily: "Source Serif 4",
              fontWeight: 600,
              fontSize: 24,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: DEEP,
              marginTop: 14,
              marginBottom: 6,
            }}
          >
            La Chiave Giusta
          </div>
          <div style={{ fontFamily: "Manrope", fontSize: 15, color: INK_SOFT, maxWidth: 520, display: "flex" }}>{TAGLINE[locale]}</div>
        </div>

        {/* main */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Manrope",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: 26,
            }}
          >
            {labels.completionEyebrow}
          </div>

          <div style={{ fontFamily: "Source Serif 4", fontSize: 22, color: INK_SOFT, marginBottom: 8, display: "flex" }}>
            {labels.certifiesThat}
          </div>
          <div
            style={{
              fontFamily: "EB Garamond",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: 62,
              color: INK,
              lineHeight: 1.15,
              margin: "6px 0 26px",
              display: "flex",
              maxWidth: 900,
            }}
          >
            {learnerName}
          </div>
          <div style={{ width: 96, height: 2, background: GOLD_LINE, marginBottom: 26, display: "flex" }} />

          <div
            style={{
              fontFamily: "Source Serif 4",
              fontSize: 22,
              color: INK,
              lineHeight: 1.6,
              maxWidth: 660,
              marginBottom: 10,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <span>{body.pre}</span>
            <span style={{ fontWeight: 600, color: DEEP }}>{body.bold}</span>
            <span>{body.post}</span>
          </div>

          {tier === "lode" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontFamily: "Source Serif 4",
                fontStyle: "italic",
                fontSize: 18,
                color: GOLD,
                background: GOLD_TINT,
                border: `1px solid ${GOLD_LINE}`,
                padding: "8px 24px",
                borderRadius: 30,
                marginTop: 16,
              }}
            >
              {LODE_LINE[locale]}
            </div>
          )}
        </div>

        {/* footer */}
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", gap: 40 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ width: "100%", height: 1, background: RULE, marginBottom: 12, display: "flex" }} />
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: INK_SOFT, marginBottom: 6, display: "flex" }}>
              {labels.completedOnLabel}
            </div>
            <div style={{ fontFamily: "Source Serif 4", fontSize: 20, color: INK, display: "flex" }}>{completedAtLabel}</div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div style={{ width: "100%", height: 1, background: RULE, marginBottom: 12, display: "flex" }} />
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: INK_SOFT, marginBottom: 6, display: "flex" }}>
              {labels.finalScoreLabel}
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontFamily: "Source Serif 4", fontSize: 30, fontWeight: 600, color: DEEP, display: "flex" }}>{scoreLabel}</div>
              <div
                style={{
                  fontFamily: "Manrope",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: GOLD,
                  marginTop: 2,
                  display: "flex",
                }}
              >
                {TIER_WORD[locale][tier]}
              </div>
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end", textAlign: "right" }}>
            <div style={{ width: "100%", height: 1, background: RULE, marginBottom: 12, display: "flex" }} />
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: INK_SOFT, marginBottom: 6, display: "flex" }}>
              {labels.verifiedByLabel}
            </div>
            <div style={{ fontFamily: "EB Garamond", fontStyle: "italic", fontWeight: 600, fontSize: 26, color: DEEP, display: "flex" }}>
              La Chiave Giusta
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
