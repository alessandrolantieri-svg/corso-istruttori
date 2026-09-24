import Link from "next/link";
import type { NavItem, SidebarNav } from "./sidebarData";
import { t, type Locale } from "@/lib/i18n/catalog";

// Solo per schermi larghi (vedi globals.css, ".desktop-sidebar" sotto il breakpoint desktop) —
// su telefono questo componente è comunque nel DOM ma nascosto via CSS, mai renderizzato in un
// modo che cambi il comportamento mobile (nessun JS che decide se mostrarlo).

function statusIcon(status: NavItem["status"]) {
  if (status === "locked") return "ph-lock";
  if (status === "done") return "ph-check";
  if (status === "current") return "ph-play";
  return "ph-circle-dashed";
}

function NavList({
  items,
  hrefBase,
  currentKind,
  kind,
  currentNum,
}: {
  items: NavItem[];
  hrefBase: string;
  currentKind: string;
  kind: string;
  currentNum: string;
}) {
  return (
    <ul className="desktop-sidebar-list">
      {items.map((item) => {
        const isActive = currentKind === kind && currentNum === item.num;
        const isLocked = item.status === "locked";
        return (
          <li key={item.num}>
            <Link
              href={isLocked ? "#" : `${hrefBase}/${item.num}`}
              className={`desktop-sidebar-link status-${item.status}${isActive ? " active" : ""}`}
              aria-disabled={isLocked}
              aria-current={isActive ? "page" : undefined}
            >
              <i className={`ph-duotone ${statusIcon(item.status)}`} aria-hidden="true" />
              <span>{item.num} · {item.title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function DesktopSidebar({
  nav,
  locale,
  currentKind,
  currentNum,
}: {
  nav: SidebarNav;
  locale: Locale;
  currentKind: string;
  currentNum: string;
}) {
  return (
    <nav className="desktop-sidebar" aria-label={t("dashboard.chaptersTitle", locale)}>
      <Link href="/dashboard" className="desktop-sidebar-home">
        <i className="ph-duotone ph-house" aria-hidden="true" />
        La Chiave Giusta
      </Link>

      <div className="desktop-sidebar-section">
        <div className="desktop-sidebar-heading">{t("dashboard.chaptersTitle", locale)}</div>
        <NavList items={nav.chapters} hrefBase="/capitoli" currentKind={currentKind} kind="capitolo" currentNum={currentNum} />
      </div>

      <div className="desktop-sidebar-section">
        <div className="desktop-sidebar-heading">{t("dashboard.examTitle", locale)}</div>
        <NavList items={nav.examTurns} hrefBase="/esame" currentKind={currentKind} kind="esame" currentNum={currentNum} />
      </div>

      <div className="desktop-sidebar-section">
        <div className="desktop-sidebar-heading">{t("dashboard.casiRealiTitle", locale)}</div>
        <NavList items={nav.casiReali} hrefBase="/casi-reali" currentKind={currentKind} kind="caso-reale" currentNum={currentNum} />
      </div>

      <Link href="/assistente" className="desktop-sidebar-link" style={{ marginTop: 8 }}>
        <i className="ph-duotone ph-chats-circle" aria-hidden="true" />
        <span>{t("dashboard.assistantTitle", locale)}</span>
      </Link>
    </nav>
  );
}
