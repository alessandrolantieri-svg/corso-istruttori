import { getLocale } from "@/lib/i18n/locale";
import { getA11yMode } from "@/lib/a11y/settings";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { AccessibilityToggle } from "@/components/AccessibilityToggle";
import LoginForm from "./LoginForm";
import { APP_IN_CONSTRUCTION } from "@/lib/construction";

export default async function LoginPage() {
  const [locale, a11yMode] = await Promise.all([getLocale(), getA11yMode()]);

  return (
    <>
      <div style={{ position: "absolute", top: 16, right: 16, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
        <LocaleSwitcher locale={locale} path="/login" />
        <AccessibilityToggle mode={a11yMode} path="/login" locale={locale} onLight />
      </div>
      <LoginForm
        locale={locale}
        quickLoginEnabled={process.env.NODE_ENV !== "production"}
        freeAccessEnabled={APP_IN_CONSTRUCTION}
      />
    </>
  );
}
