"use client";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export const MockScoreChart = ({ data }: { data: { name: string; overall: number }[] }) => (
  <div className="h-48 w-full"><ResponsiveContainer><LineChart data={data}><XAxis dataKey="name" /><YAxis domain={[0, 100]} /><Line type="monotone" dataKey="overall" stroke="#3B82F6" strokeWidth={2} /></LineChart></ResponsiveContainer></div>
);