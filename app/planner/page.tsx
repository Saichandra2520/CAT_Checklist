"use client";

import { useMemo, useState } from "react";
import { useDB } from "@/hooks/useDB";
import { usePlanner } from "@/hooks/usePlanner";

export const dynamic = "force-dynamic";

export default function PlannerPage() {
  const db = useDB();
  const [excludeWeekends, setExcludeWeekends] = useState(true);
  const [restDays, setRestDays] = useState<string[]>([]);
  const examDate = new Date(db.getSetting("exam_date") ?? "2026-11-29");
  const planner = usePlanner(db.topics, examDate, excludeWeekends);
  const plan = useMemo(() => planner.plan.filter((d) => !restDays.includes(d.date)), [planner.plan, restDays]);

  if (!db.ready) return <div>Loading...</div>;

  return <div className="space-y-4">
    <h1 className="text-2xl font-bold">Study Planner</h1>
    <label className="flex items-center gap-2"><input type="checkbox" checked={excludeWeekends} onChange={(e) => setExcludeWeekends(e.target.checked)} /> Exclude weekends</label>
    <div className="rounded-xl border p-3">Topics/week: {planner.topicsPerWeek} | Est. hours/week: {planner.hoursPerWeek}</div>
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{plan.slice(0, 21).map((d) => <div key={d.date} className="rounded-xl border p-3"><div className="flex justify-between"><p className="font-medium">{d.date}</p><button className="text-xs underline" onClick={() => setRestDays((x) => x.includes(d.date) ? x.filter((y) => y !== d.date) : [...x, d.date])}>Rest day</button></div>{d.topics.map((t) => <p key={t.id} className="text-sm mt-1">- {t.topic}</p>)}</div>)}</div>
    <button className="rounded bg-slate-900 text-white px-3 py-2" onClick={() => navigator.clipboard.writeText(plan.map((d) => `${d.date}: ${d.topics.map((t) => t.topic).join(", ")}`).join("\n"))}>Copy plan text</button>
  </div>;
}