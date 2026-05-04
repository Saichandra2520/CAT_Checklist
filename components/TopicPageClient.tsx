"use client";

import { useEffect, useMemo, useState } from "react";
import { ErrorLogModal } from "@/components/ErrorLogModal";
import { topicContent } from "@/lib/data/topicContent";
import { useDB } from "@/hooks/useDB";

export const TopicPageClient = ({ id }: { id: string }) => {
  const db = useDB();
  const topic = useMemo(() => db.topics.find((t) => t.id === id), [db.topics, id]);
  const content = topic ? topicContent[topic.id] : null;
  const [notes, setNotes] = useState("");
  useEffect(() => { if (topic) setNotes(topic.notes); }, [topic]);
  if (!db.ready) return <div>Loading...</div>;
  if (!topic || !content) return <div>Topic not found.</div>;
  return <div className="space-y-4"><h1 className="text-2xl font-bold">{topic.topic}</h1><p>{content.conceptSummary}</p>{content.keyFormulas && <div className="grid gap-2">{content.keyFormulas.map((f) => <div key={f.label} className="rounded border p-2 font-mono text-sm"><p>{f.label}: {f.formula}</p><p className="font-sans">{f.example}</p></div>)}</div>}<div className="rounded-xl border p-3"><h2 className="font-semibold">Common Traps</h2>{content.commonTraps.map((t) => <p key={t}>?? {t}</p>)}</div><div className="space-y-2">{content.sampleQuestions.map((q, i) => <details key={q.qText} className="rounded border p-2"><summary>Q{i + 1}. {q.qText}</summary>{q.options?.map((o) => <label key={o} className="block"><input type="radio" name={`q-${i}`} /> {o}</label>)}<p className="mt-2"><strong>Answer:</strong> {q.answer}</p><p>{q.explanation}</p></details>)}</div><div className="flex gap-2 overflow-x-auto">{content.quickTips.map((t) => <div key={t} className="rounded-xl border p-3 min-w-60">{t}</div>)}</div><textarea className="w-full border p-3" rows={5} value={notes} onChange={(e) => setNotes(e.target.value)} onBlur={() => db.saveNotes(topic.id, notes)} /><ErrorLogModal onAdd={(desc, root) => db.addError({ topic_id: topic.id, mock_test_id: null, error_description: desc, root_cause: root, date: new Date().toISOString().slice(0, 10) })} /></div>;
};