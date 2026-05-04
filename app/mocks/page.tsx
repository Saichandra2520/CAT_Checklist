"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useDB } from "@/hooks/useDB";

export default function MocksPage() {
  const db = useDB();
  const [form, setForm] = useState({ test_name: "", date: "", varc_score: 0, dilr_score: 0, qa_score: 0, varc_percentile: 0, dilr_percentile: 0, qa_percentile: 0, overall_percentile: 0, notes: "" });

  const totals = useMemo(() => ({
    best: Math.max(0, ...db.mocks.map((m) => m.total_score)),
    avg: db.mocks.length ? db.mocks.reduce((a, b) => a + b.overall_percentile, 0) / db.mocks.length : 0
  }), [db.mocks]);

  if (!db.ready) return <div>Loading...</div>;

  return <div className="space-y-4">
    <h1 className="text-2xl font-bold">Mock Tracker</h1>
    <div className="grid gap-2 md:grid-cols-3">{Object.keys(form).map((k) => <input key={k} className="border p-2" placeholder={k} value={String(form[k as keyof typeof form])} onChange={(e) => setForm((f) => ({ ...f, [k]: ["test_name", "date", "notes"].includes(k) ? e.target.value : Number(e.target.value) }))} />)}</div>
    <button className="rounded bg-slate-900 text-white px-3 py-2" onClick={() => db.addMock(form as never)}>Add Mock</button>
    <div className="rounded-xl border p-3 overflow-auto"><table className="w-full text-sm"><thead><tr><th>Name</th><th>Date</th><th>Total</th><th>Overall %ile</th><th /></tr></thead><tbody>{db.mocks.map((m) => <tr key={m.id}><td>{m.test_name}</td><td>{m.date}</td><td>{m.total_score}</td><td>{m.overall_percentile}</td><td><button onClick={() => db.deleteMock(m.id)}>Delete</button></td></tr>)}</tbody></table></div>
    <div className="grid md:grid-cols-2 gap-4"><div className="rounded-xl border p-3 h-64"><ResponsiveContainer><LineChart data={db.mocks}><XAxis dataKey="test_name" /><YAxis /><Line dataKey="overall_percentile" stroke="#3B82F6" /></LineChart></ResponsiveContainer></div><div className="rounded-xl border p-3 h-64"><ResponsiveContainer><BarChart data={db.mocks}><XAxis dataKey="test_name" /><YAxis /><Bar dataKey="varc_score" fill="#F59E0B" /><Bar dataKey="dilr_score" fill="#3B82F6" /><Bar dataKey="qa_score" fill="#10B981" /></BarChart></ResponsiveContainer></div></div>
    <div className="rounded-xl border p-3">Best score: {totals.best} | Avg percentile: {totals.avg.toFixed(2)} | <Link href="/qa/" className="underline">Weak section CTA</Link></div>
  </div>;
}