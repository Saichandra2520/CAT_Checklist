"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenText, ChartColumnBig, CircleAlert, Compass, House, Settings, Target } from "lucide-react";

const nav = [
  { label: "Home", href: "/", icon: House },
  { label: "VARC", href: "/varc/", icon: BookOpenText },
  { label: "DILR", href: "/dilr/", icon: Compass },
  { label: "QA", href: "/qa/", icon: Target },
  { label: "Mocks", href: "/mocks/", icon: ChartColumnBig },
  { label: "Errors", href: "/errors/", icon: CircleAlert },
  { label: "Strategy", href: "/strategy/", icon: BookOpenText },
  { label: "Settings", href: "/settings/", icon: Settings }
] as const;

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="hidden lg:flex lg:flex-col lg:border-r lg:border-white/40 lg:bg-white/45 lg:p-5 lg:backdrop-blur-2xl dark:lg:border-white/10 dark:lg:bg-slate-950/55">
        <div className="surface-card rounded-[28px] border border-white/60 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-white/10 dark:shadow-none">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">CAT 2026</p>
          <h1 className="mt-2 font-[var(--font-heading)] text-2xl font-bold tracking-tight">Preparation Tracker</h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Build daily momentum, tighten weak areas, and keep your prep calm and measurable.
          </p>
        </div>

        <nav className="mt-6 space-y-1">
          {nav.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-all ${
                  active
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/15 dark:bg-white dark:text-slate-900"
                    : "text-slate-700 hover:bg-white/70 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-semibold">{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto surface-card rounded-[24px] border border-white/60 p-5 text-sm dark:border-white/10">
          <p className="font-[var(--font-heading)] text-lg font-semibold">Stay consistent</p>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Small daily updates beat chaotic weekend catch-up. Keep the tracker alive even on light days.
          </p>
        </div>
      </aside>

      <main className="px-4 pb-28 pt-5 sm:px-6 lg:px-10 lg:pb-8 lg:pt-8">{children}</main>

      <nav className="fixed bottom-4 left-1/2 z-50 grid w-[min(94vw,520px)] -translate-x-1/2 grid-cols-5 rounded-full border border-white/70 bg-white/85 p-2 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/85 lg:hidden">
        {[
          { label: "Home", href: "/", icon: House },
          { label: "VARC", href: "/varc/", icon: BookOpenText },
          { label: "DILR", href: "/dilr/", icon: Compass },
          { label: "QA", href: "/qa/", icon: Target },
          { label: "More", href: "/planner/", icon: Settings }
        ].map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 rounded-full px-2 py-2 text-[11px] font-semibold ${
                active ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
