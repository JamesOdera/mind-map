"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Megaphone,
  ChartColumn,
  FileText,
  Database,
  Settings,
  ChevronsLeft,
  type LucideIcon,
} from "lucide-react";
import WorkspaceSwitcher from "./workspace-switcher";

type Item = { label: string; href: string; icon: LucideIcon };
type Section = { title: string; items: Item[] };

const sections: Section[] = [
  {
    title: "Workspace",
    items: [{ label: "Home", href: "/", icon: House }],
  },
  {
    title: "Build",
    items: [{ label: "Campaigns", href: "/campaigns", icon: Megaphone }],
  },
  {
    title: "Reporting Center",
    items: [
      { label: "Analytics", href: "/analytics", icon: ChartColumn },
      { label: "Reports", href: "/reports", icon: FileText },
    ],
  },
  {
    title: "Configure",
    items: [{ label: "Data Hub", href: "/data-hub", icon: Database }],
  },
];

export default function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex flex-col overflow-hidden bg-white transition-[width] duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top: logo + collapse chevron */}
      <div
        className={`flex h-16 shrink-0 items-center ${
          collapsed ? "justify-center" : "justify-between px-6"
        }`}
      >
        {!collapsed && (
          <span className="whitespace-nowrap text-xl font-semibold tracking-tight">
            Media<span className="text-brand">flow</span>
          </span>
        )}
        <button
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
        >
          <ChevronsLeft
            size={18}
            className={`transition-transform duration-300 ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <WorkspaceSwitcher collapsed={collapsed} />

      {/* Nav */}
      <nav className="flex-1 space-y-6 overflow-y-auto overflow-x-hidden px-3 pb-6 pt-2">
        {sections.map((section, i) => (
          <div key={section.title ?? i}>
            {section.title &&
              (collapsed ? (
                <div className="mx-3 mb-3 h-px bg-zinc-200" />
              ) : (
                <p className="mb-2 whitespace-nowrap px-3 text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                  {section.title}
                </p>
              ))}
            <ul className="space-y-1">
              {section.items.map(({ label, href, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <li key={href} className="relative">
                    {active && (
                      <span className="absolute -left-3 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-brand" />
                    )}
                    <Link
                      href={href}
                      title={collapsed ? label : undefined}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors ${
                        collapsed ? "justify-center" : ""
                      } ${
                        active
                          ? "bg-brand/10 text-brand"
                          : "text-zinc-600 hover:bg-zinc-100"
                      }`}
                    >
                      <Icon size={18} strokeWidth={1.75} className="shrink-0" />
                      <span
                        className={`overflow-hidden whitespace-nowrap transition-opacity duration-200 ${
                          collapsed ? "hidden opacity-0" : "opacity-100"
                        }`}
                      >
                        {label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom left: settings cog */}
      <div
        className={`shrink-0 pb-5 pt-2 ${collapsed ? "flex justify-center" : "px-6"}`}
      >
        <Link
          href="/settings"
          aria-label="Settings"
          title="Settings"
          className={`inline-flex rounded-md p-1.5 transition-colors hover:bg-zinc-100 ${
            pathname === "/settings"
              ? "text-brand"
              : "text-zinc-400 hover:text-zinc-700"
          }`}
        >
          <Settings size={20} strokeWidth={1.75} />
        </Link>
      </div>
    </aside>
  );
}
