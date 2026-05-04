"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Topic, TopicStatus } from "@/types";

const nextStatus: Record<TopicStatus, TopicStatus> = {
  not_started: "in_progress",
  in_progress: "completed",
  completed: "not_started"
};

const statusStyles: Record<TopicStatus, string> = {
  not_started: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700",
  in_progress: "bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-500/15 dark:text-amber-200 dark:border-amber-500/20",
  completed: "bg-emerald-100 text-emerald-900 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200 dark:border-emerald-500/20"
};

const difficultyStyles = {
  easy: "text-emerald-700 dark:text-emerald-300",
  medium: "text-blue-700 dark:text-blue-300",
  hard: "text-rose-700 dark:text-rose-300"
} as const;

export const TopicCard = ({
  topic,
  index,
  onCycle,
  onToggle
}: {
  topic: Topic;
  index: number;
  onCycle: (id: string, status: TopicStatus) => void;
  onToggle: (id: string) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="surface-card group rounded-[26px] border border-white/60 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,23,42,0.12)] dark:border-white/10 dark:shadow-none"
  >
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${difficultyStyles[topic.difficulty]}`}>
          {topic.subsection}
        </p>
        <h3 className="mt-2 font-[var(--font-heading)] text-xl font-bold tracking-tight">{topic.topic}</h3>
      </div>
      <button
        onClick={() => onToggle(topic.id)}
        className={`rounded-full p-2 transition ${
          topic.flagged_for_revision ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300" : "bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-300"
        }`}
      >
        <Star className={`h-4 w-4 ${topic.flagged_for_revision ? "fill-current" : ""}`} />
      </button>
    </div>

    <div className="mt-4 flex flex-wrap gap-2">
      <Badge className={statusStyles[topic.status]}>{topic.status.replaceAll("_", " ")}</Badge>
      <Badge>{topic.difficulty}</Badge>
      {topic.importance === "high" && (
        <Badge className="bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-500/15 dark:text-rose-200 dark:border-rose-500/20">
          <Flame className="mr-1 h-3 w-3" />
          priority
        </Badge>
      )}
    </div>

    <div className="mt-5 flex items-center gap-3">
      <Button onClick={() => onCycle(topic.id, nextStatus[topic.status])}>Update status</Button>
      <Link href={`/topic/${topic.id}/`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition group-hover:text-slate-950 dark:text-slate-300 dark:group-hover:text-white">
        Open detail
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </motion.div>
);
