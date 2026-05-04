"use client";

import initSqlJs, { Database, SqlJsStatic } from "sql.js";
import { schemaSQL } from "@/lib/schema";
import { syllabus } from "@/lib/data/syllabus";

const STORAGE_KEY = "cat_tracker_db";
let SQL: SqlJsStatic | null = null;
let db: Database | null = null;

const uint8ToBase64 = (u8: Uint8Array): string => {
  let str = "";
  u8.forEach((x) => {
    str += String.fromCharCode(x);
  });
  return btoa(str);
};

const base64ToUint8 = (b64: string): Uint8Array => {
  const binary = atob(b64);
  const arr = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) arr[i] = binary.charCodeAt(i);
  return arr;
};

const persistDB = (): void => {
  if (!db) return;
  localStorage.setItem(STORAGE_KEY, uint8ToBase64(db.export()));
};

const seedTopics = (): void => {
  if (!db) return;
  const stmt = db.prepare("SELECT COUNT(*) as count FROM topics");
  stmt.step();
  const count = Number(stmt.getAsObject().count ?? 0);
  stmt.free();
  if (count > 0) return;

  const ins = db.prepare("INSERT INTO topics (id, section, subsection, topic, difficulty, importance, status, flagged_for_revision, notes, last_updated) VALUES (?, ?, ?, ?, ?, ?, 'not_started', 0, '', '')");
  syllabus.forEach((t) => ins.run([t.id, t.section, t.subsection, t.topic, t.difficulty, t.importance]));
  ins.free();

  db.run("INSERT OR IGNORE INTO settings (key, value) VALUES ('exam_date', '2026-11-29')");
  db.run("INSERT OR IGNORE INTO settings (key, value) VALUES ('theme', 'system')");
  persistDB();
};

export const initDB = async (): Promise<Database> => {
  if (db) return db;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  SQL = await initSqlJs({
    locateFile: (file: string) => `${origin}${basePath}/${file}`.replace(/([^:]\/)\/+/g, "$1")
  });
  const saved = localStorage.getItem(STORAGE_KEY);
  db = saved ? new SQL.Database(base64ToUint8(saved)) : new SQL.Database();
  db.run(schemaSQL);
  seedTopics();
  return db;
};

export const getDB = (): Database => {
  if (!db) throw new Error("DB not initialized");
  return db;
};

export const saveDB = (): void => persistDB();

export const resetDB = async (): Promise<void> => {
  localStorage.removeItem(STORAGE_KEY);
  db = null;
  await initDB();
};
