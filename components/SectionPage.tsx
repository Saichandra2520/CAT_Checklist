"use client";

import { useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { Filter } from "lucide-react";
import { TopicCard } from "@/components/TopicCard";
import { useDB } from "@/hooks/useDB";
import { Difficulty, Section, TopicStatus } from "@/types";

const sectionColors = {
  VARC: "from-amber-300 via-amber-100 to-white dark:from-amber-500/20 dark:via-transparent dark:to-transparent",
  DILR: "from-blue-300 via-blue-100 to-white dark:from-blue-500/20 dark:via-transparent dark:to-transparent",
  QA: "from-emerald-300 via-emerald-100 to-white dark:from-emerald-500/20 dark:via-transparent dark:to-transparent"
} as const;

export const SectionPage = ({ section }: { section: Section }) => {
  const db = useDB();
  const [statusFilter, setStatusFilter] = useState<"all" | TopicStatus | "flagged">("all");
  const [difficulty, setDifficulty] = useState<"all" | Difficulty>("all");

  const topics = useMemo(() => db.topics.filter((t) => t.section === section), [db.topics, section]);
  const filtered = topics
    .filter((t) => (statusFilter === "all" ? true : statusFilter === "flagged" ? t.flagged_for_revision === 1 : t.status === statusFilter))
    .filter((t) => (difficulty === "all" ? true : t.difficulty === difficulty));

  const done = topics.filter((t) => t.status === "completed").length;
  const progress = topics.length ? Math.round((done / topics.length) * 100) : 0;

  if (!db.ready) {
    return <div className="grid min-h-[50vh] place-items-center text-slate-600 dark:text-slate-300">Loading section...</div>;
  }

  if (done === topics.length && topics.length > 0) {
    confetti({ particleCount: 120, spread: 70 });
  }

  return (
    <div className="space-y-6">
      <section className={`rounded-[32px] border border-white/60 bg-gradient-to-br ${sectionColors[section]} p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] dark:border-white/10 dark:shadow-none`}>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{section} focus zone</p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-[var(--font-heading)] text-4xl font-bold tracking-tight">{section}</h1>
            <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
              Keep this section moving with clean status updates, active revision flags, and low-friction topic jumps.
            </p>
          </div>
          <div className="min-w-[220px] rounded-2xl bg-white/70 p-4 backdrop-blur dark:bg-slate-950/45">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{done}/{topics.length} topics completed</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div className="h-full rounded-full bg-slate-950 dark:bg-white" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </section>

      <section className="surface-card sticky top-4 z-10 rounded-[26px] border border-white/60 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-white/10 dark:shadow-none">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <Filter className="h-4 w-4" />
            Filters
          </div>
          <select
            className="rounded-xl border bg-white px-3 py-2 text-sm dark:bg-slate-900"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          >
            <option value="all">All topics</option>
            <option value="not_started">Not started</option>
            <option value="in_progress">In progress</option>
            <option value="completed">Completed</option>
            <option value="flagged">Flagged</option>
          </select>
          <select
            className="rounded-xl border bg-white px-3 py-2 text-sm dark:bg-slate-900"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as typeof difficulty)}
          >
            <option value="all">All difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <div className="ml-auto text-sm text-slate-600 dark:text-slate-300">{filtered.length} topics visible</div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((topic, index) => (
          <TopicCard key={topic.id} topic={topic} index={index} onCycle={db.setTopicStatus} onToggle={db.toggleRevision} />
        ))}
      </section>
    </div>
  );
};
