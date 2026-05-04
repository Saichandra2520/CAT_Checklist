"use client";

import { useEffect } from "react";
import { ArrowUpRight, Sparkles, Target } from "lucide-react";
import { CountdownWidget } from "@/components/CountdownWidget";
import { MockScoreChart } from "@/components/MockScoreChart";
import { ProgressRing } from "@/components/ProgressRing";
import { TopicOfTheDay } from "@/components/TopicOfTheDay";
import { useDB } from "@/hooks/useDB";
import { useProgress } from "@/hooks/useProgress";

export default function DashboardPage() {
  const db = useDB();
  const progress = useProgress(db.topics);

  useEffect(() => {
    if (db.ready && !localStorage.getItem("cat_notice_shown")) {
      alert("Data lives on this device only.");
      localStorage.setItem("cat_notice_shown", "1");
    }
  }, [db.ready]);

  if (!db.ready) {
    return <div className="grid min-h-[60vh] place-items-center text-lg text-slate-600 dark:text-slate-300">Firing up your study engine...</div>;
  }

  const examDate = new Date(db.getSetting("exam_date") ?? "2026-11-29");

  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[32px] border border-white/60 bg-slate-950 p-6 text-white shadow-[0_30px_80px_rgba(15,23,42,0.2)] dark:border-white/10 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-200">
            <Sparkles className="h-4 w-4" />
            Prep command center
          </div>
          <h1 className="mt-4 max-w-2xl font-[var(--font-heading)] text-4xl font-bold tracking-tight sm:text-5xl">
            Make CAT prep feel sharp, visible, and manageable.
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Track completion, protect weak sections, and keep your mock feedback tied to real study action.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Completed topics", value: `${progress.completed}/${progress.total}` },
              { label: "Overall progress", value: `${progress.completedPct}%` },
              { label: "Revision flagged", value: `${progress.flagged.length}` }
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{item.label}</p>
                <p className="mt-2 text-2xl font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        <CountdownWidget examDate={examDate} />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="surface-card rounded-[28px] border border-white/60 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] dark:border-white/10 dark:shadow-none lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Master progress</p>
              <h2 className="mt-2 font-[var(--font-heading)] text-2xl font-bold tracking-tight">Overall completion</h2>
            </div>
            <Target className="h-5 w-5 text-slate-400" />
          </div>
          <p className="mt-4 text-4xl font-bold">{progress.completedPct}%</p>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div className="h-full rounded-full bg-gradient-to-r from-amber-400 via-blue-500 to-emerald-500" style={{ width: `${progress.completedPct}%` }} />
          </div>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{progress.completed} of {progress.total} topics completed</p>
        </div>

        <div className="surface-card rounded-[28px] border border-white/60 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] dark:border-white/10 dark:shadow-none lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Section balance</p>
              <h2 className="mt-2 font-[var(--font-heading)] text-2xl font-bold tracking-tight">Where your prep stands</h2>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              See all sections
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <ProgressRing value={progress.sectionPct.VARC} color="#F59E0B" label="VARC" />
            <ProgressRing value={progress.sectionPct.DILR} color="#3B82F6" label="DILR" />
            <ProgressRing value={progress.sectionPct.QA} color="#10B981" label="QA" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <TopicOfTheDay topic={progress.topicOfTheDay} />
        <div className="surface-card rounded-[28px] border border-white/60 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] dark:border-white/10 dark:shadow-none">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Mock trend</p>
          <h2 className="mt-2 font-[var(--font-heading)] text-2xl font-bold tracking-tight">Recent percentile movement</h2>
          <div className="mt-4 h-64">
            <MockScoreChart data={db.mocks.slice(-5).map((mock) => ({ name: mock.test_name, overall: mock.overall_percentile }))} />
          </div>
        </div>
      </section>
    </div>
  );
}
