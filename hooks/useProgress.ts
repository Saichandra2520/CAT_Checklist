"use client";

import { differenceInCalendarDays, format } from "date-fns";
import { Topic } from "@/types";

export const useProgress = (topics: Topic[]) => {
  const total = topics.length;
  const completed = topics.filter((t) => t.status === "completed").length;
  const flagged = topics.filter((t) => t.flagged_for_revision === 1);

  const section = {
    VARC: topics.filter((t) => t.section === "VARC"),
    DILR: topics.filter((t) => t.section === "DILR"),
    QA: topics.filter((t) => t.section === "QA")
  };

  const sectionPct = Object.fromEntries(
    Object.entries(section).map(([k, arr]) => [k, arr.length ? Math.round((arr.filter((x) => x.status === "completed").length / arr.length) * 100) : 0])
  ) as Record<"VARC" | "DILR" | "QA", number>;

  const streakFromLastActive = (lastActive: string | null): number => {
    if (!lastActive) return 0;
    const days = differenceInCalendarDays(new Date(), new Date(lastActive));
    return days <= 1 ? Math.max(1, 7 - days) : 0;
  };

  const topicOfTheDay = topics.length ? topics[new Date().getDate() % topics.length] : null;

  return {
    total,
    completed,
    completedPct: total ? Math.round((completed / total) * 100) : 0,
    sectionPct,
    flagged,
    topicOfTheDay,
    today: format(new Date(), "yyyy-MM-dd"),
    streakFromLastActive
  };
};