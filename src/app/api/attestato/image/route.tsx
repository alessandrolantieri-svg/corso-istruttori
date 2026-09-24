import { ImageResponse } from "next/og";
import { getCurrentLearner } from "@/lib/auth/session";
import { loadAttestatoData } from "@/lib/attestato/data";
import { loadCertFonts } from "@/lib/attestato/fonts";
import { CertificateImage } from "@/lib/attestato/CertificateImage";
import { getLocale } from "@/lib/i18n/locale";
import { t } from "@/lib/i18n/catalog";
import { speechLangForLocale } from "@/lib/voice/settings";

export async function GET() {
  const locale = await getLocale();
  const learner = await getCurrentLearner();
  if (!learner) {
    return new Response(t("attestato.apiNotAuthenticated", locale), { status: 401 });
  }

  const data = await loadAttestatoData();
  if (!data.available || !data.result || !data.completedAt) {
    return new Response(t("attestato.apiNotAvailable", locale), { status: 409 });
  }

  const completedAtLabel = new Intl.DateTimeFormat(speechLangForLocale(locale), { day: "numeric", month: "long", year: "numeric" }).format(
    data.completedAt
  );

  const fonts = await loadCertFonts();

  const image = new ImageResponse(
    (
      <CertificateImage
        learnerName={data.learnerName}
        completedAtLabel={completedAtLabel}
        score={data.result.score}
        tier={data.result.tier}
        locale={locale}
      />
    ),
    {
      width: 1600,
      height: 1131,
      fonts,
    }
  );

  const safeName = data.learnerName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const headers = new Headers(image.headers);
  headers.set("Content-Disposition", `attachment; filename="attestato-la-chiave-giusta-${safeName}.png"`);
  return new Response(image.body, { status: image.status, headers });
}
