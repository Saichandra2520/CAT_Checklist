"use client";

import Link from "next/link";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useDB } from "@/hooks/useDB";

export default function ErrorsPage() {
  const db = useDB();
  if (!db.ready) return <div>Loading...</div>;
  const counts = db.errors.reduce<Record<string, number>>((a, e) => ({ ...a, [e.topic_id]: (a[e.topic_id] ?? 0) + 1 }), {});
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([topic_id, count]) => ({ topic_id, count }));
  return <div className="space-y-4"><h1 className="text-2xl font-bold">Error Log</h1>{db.errors.length === 0 ? <div className="rounded-xl border p-8 text-center">No errors logged yet.</div> : <div className="rounded-xl border p-3 overflow-auto"><table className="w-full text-sm"><thead><tr><th>Date</th><th>Topic</th><th>Error</th><th>Root Cause</th></tr></thead><tbody>{db.errors.map((e) => <tr key={e.id}><td>{e.date}</td><td><Link href={`/topic/${e.topic_id}/`} className="underline">{e.topic_id}</Link></td><td>{e.error_description}</td><td>{e.root_cause}</td></tr>)}</tbody></table></div>}<div className="h-64 rounded-xl border p-3"><ResponsiveContainer><BarChart data={top}><XAxis dataKey="topic_id" /><YAxis /><Bar dataKey="count" fill="#10B981" /></BarChart></ResponsiveContainer></div></div>;
}