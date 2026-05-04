"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const ErrorLogModal = ({ onAdd }: { onAdd: (desc: string, root: string) => void }) => {
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const [root, setRoot] = useState("");
  if (!open) return <Button onClick={() => setOpen(true)}>+ Add Error</Button>;
  return <div className="rounded-xl border p-4 space-y-2"><input className="w-full border p-2" placeholder="Error description" value={desc} onChange={(e) => setDesc(e.target.value)} /><input className="w-full border p-2" placeholder="Root cause" value={root} onChange={(e) => setRoot(e.target.value)} /><div className="flex gap-2"><Button onClick={() => { onAdd(desc, root); setOpen(false); }}>Save</Button><Button className="bg-slate-500" onClick={() => setOpen(false)}>Cancel</Button></div></div>;
};