"use client";

import { useState } from "react";
import { resetDB } from "@/lib/db";
import { useDB } from "@/hooks/useDB";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  const db = useDB();
  const [confirm, setConfirm] = useState("");
  const [importText, setImportText] = useState("");
  const examDate = db.getSetting("exam_date") ?? "2026-11-29";
  const theme = db.getSetting("theme") ?? "system";
  if (!db.ready) return <div>Loading...</div>;
  return <div className="space-y-4"><h1 className="text-2xl font-bold">Settings</h1><label className="block">Exam Date<input type="date" className="border p-2 ml-2" value={examDate} onChange={(e) => db.setSetting("exam_date", e.target.value)} /></label><label className="block">Theme<select className="border p-2 ml-2" value={theme} onChange={(e) => db.setSetting("theme", e.target.value)}><option value="light">Light</option><option value="dark">Dark</option><option value="system">System</option></select></label><button className="rounded bg-slate-900 text-white px-3 py-2" onClick={() => navigator.clipboard.writeText(db.exportJSON())}>Export JSON</button><textarea className="w-full border p-2" rows={6} value={importText} onChange={(e) => setImportText(e.target.value)} placeholder="Paste JSON to import" /><button className="rounded bg-blue-600 text-white px-3 py-2" onClick={() => db.importJSON(importText)}>Import JSON</button><div className="rounded border p-3"><p>Type RESET to clear all data</p><input className="border p-2" value={confirm} onChange={(e) => setConfirm(e.target.value)} /><button className="ml-2 rounded bg-red-600 text-white px-3 py-2" onClick={async () => { if (confirm === "RESET") { await resetDB(); location.reload(); } }}>Reset all data</button></div></div>;
}