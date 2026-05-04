"use client";

import { addDays, differenceInCalendarWeeks, format, isWeekend } from "date-fns";
import { Topic } from "@/types";

export const usePlanner = (topics: Topic[], examDate: Date, excludeWeekends: boolean) => {
  const today = new Date();
  const weeks = Math.max(1, differenceInCalendarWeeks(examDate, today));
  const pending = topics
    .filter((t) => t.status !== "completed")
    .sort((a, b) => (a.importance === b.importance ? a.difficulty.localeCompare(b.difficulty) : a.importance === "high" ? -1 : 1));

  const days = Array.from({ length: 7 * weeks }).map((_, i) => addDays(today, i));
  const activeDays = excludeWeekends ? days.filter((d) => !isWeekend(d)) : days;

  const plan = activeDays.map((d, i) => ({ date: format(d, "yyyy-MM-dd"), topics: pending.slice(i * 2, i * 2 + 2) }));
  return { weeks, plan, topicsPerWeek: Math.ceil(pending.length / weeks), hoursPerWeek: Math.ceil((Math.ceil(pending.length / weeks) * 45) / 60) };
};