import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Topic } from "@/types";

const sectionStyles = {
  VARC: "bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-500/15 dark:text-amber-200 dark:border-amber-500/20",
  DILR: "bg-blue-100 text-blue-900 border-blue-200 dark:bg-blue-500/15 dark:text-blue-200 dark:border-blue-500/20",
  QA: "bg-emerald-100 text-emerald-900 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200 dark:border-emerald-500/20"
} as const;

export const TopicOfTheDay = ({ topic }: { topic: Topic | null }) => {
  if (!topic) return null;

  return (
    <div className="surface-card rounded-[28px] border border-white/60 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] dark:border-white/10 dark:shadow-none">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Topic of the day</p>
        <Badge className={sectionStyles[topic.section]}>{topic.section}</Badge>
      </div>
      <h3 className="mt-3 font-[var(--font-heading)] text-2xl font-bold tracking-tight">{topic.topic}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Use today’s momentum on one focused topic instead of spreading your attention thin.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge>{topic.status.replaceAll("_", " ")}</Badge>
        <Badge>{topic.difficulty}</Badge>
        <Badge>{topic.subsection}</Badge>
      </div>
      <Link
        href={`/topic/${topic.id}/`}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950"
      >
        Start now
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
};
