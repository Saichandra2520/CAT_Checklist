"use client";

import { differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";

export const CountdownWidget = ({ examDate }: { examDate: Date }) => {
  const [seconds, setSeconds] = useState(Math.max(0, differenceInSeconds(examDate, new Date())));

  useEffect(() => {
    const t = setInterval(() => setSeconds(Math.max(0, differenceInSeconds(examDate, new Date()))), 1000);
    return () => clearInterval(t);
  }, [examDate]);

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return (
    <div className="surface-card relative overflow-hidden rounded-[28px] border border-white/60 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] dark:border-white/10 dark:shadow-none">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-blue-500 to-emerald-500" />
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">Countdown</p>
      <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
        CAT 2026
      </h2>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          { label: "Days", value: days },
          { label: "Hours", value: hours },
          { label: "Minutes", value: minutes }
        ].map((item) => (
          <div key={item.label} className="rounded-2xl bg-slate-950 px-3 py-4 text-white dark:bg-white dark:text-slate-950">
            <p className="text-2xl font-bold">{item.value}</p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/65 dark:text-slate-500">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
