import { formatISO } from "date-fns";
import { getDB, saveDB } from "@/lib/db";
import { ErrorLog, MockTest, Topic, TopicStatus } from "@/types";

const rows = <T,>(result: { columns: string[]; values: unknown[][] } | undefined): T[] => {
  if (!result) return [];
  return result.values.map((v) => Object.fromEntries(result.columns.map((c, i) => [c, v[i]])) as T);
};

export const getTopics = (): Topic[] => rows<Topic>(getDB().exec("SELECT * FROM topics ORDER BY section, subsection, topic")[0]);
export const getTopicById = (id: string): Topic | null => rows<Topic>(getDB().exec(`SELECT * FROM topics WHERE id='${id.replace(/'/g, "''")}'`)[0])[0] ?? null;

export const updateTopicStatus = (id: string, status: TopicStatus): void => {
  getDB().run("UPDATE topics SET status=?, last_updated=? WHERE id=?", [status, formatISO(new Date()), id]);
  getDB().run("INSERT OR REPLACE INTO settings (key, value) VALUES ('last_active_date', date('now'))");
  saveDB();
};

export const toggleTopicRevision = (id: string): void => {
  getDB().run("UPDATE topics SET flagged_for_revision=CASE flagged_for_revision WHEN 1 THEN 0 ELSE 1 END, last_updated=? WHERE id=?", [formatISO(new Date()), id]);
  saveDB();
};

export const updateTopicNotes = (id: string, notes: string): void => {
  getDB().run("UPDATE topics SET notes=?, last_updated=? WHERE id=?", [notes, formatISO(new Date()), id]);
  saveDB();
};

export const getMocks = (): MockTest[] => rows<MockTest>(getDB().exec("SELECT * FROM mock_tests ORDER BY date ASC, id ASC")[0]);
export const addMock = (m: Omit<MockTest, "id" | "total_score">): void => {
  const total = m.varc_score + m.dilr_score + m.qa_score;
  getDB().run("INSERT INTO mock_tests (test_name,date,varc_score,dilr_score,qa_score,total_score,varc_percentile,dilr_percentile,qa_percentile,overall_percentile,notes) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [m.test_name, m.date, m.varc_score, m.dilr_score, m.qa_score, total, m.varc_percentile, m.dilr_percentile, m.qa_percentile, m.overall_percentile, m.notes]);
  saveDB();
};
export const deleteMock = (id: number): void => { getDB().run("DELETE FROM mock_tests WHERE id=?", [id]); saveDB(); };

export const getErrors = (): ErrorLog[] => rows<ErrorLog>(getDB().exec("SELECT * FROM error_log ORDER BY date DESC, id DESC")[0]);
export const getErrorsByTopic = (topicId: string): ErrorLog[] => rows<ErrorLog>(getDB().exec(`SELECT * FROM error_log WHERE topic_id='${topicId.replace(/'/g, "''")}' ORDER BY date DESC`)[0]);
export const addError = (e: Omit<ErrorLog, "id">): void => { getDB().run("INSERT INTO error_log (topic_id,mock_test_id,error_description,root_cause,date) VALUES (?,?,?,?,?)", [e.topic_id, e.mock_test_id, e.error_description, e.root_cause, e.date]); saveDB(); };

export const getSetting = (key: string): string | null => rows<{ value: string }>(getDB().exec(`SELECT value FROM settings WHERE key='${key.replace(/'/g, "''")}'`)[0])[0]?.value ?? null;
export const setSetting = (key: string, value: string): void => { getDB().run("INSERT OR REPLACE INTO settings (key,value) VALUES (?,?)", [key, value]); saveDB(); };

export const exportDataJSON = (): string => JSON.stringify({
  topics: getTopics(),
  mocks: getMocks(),
  errors: getErrors(),
  settings: rows<{ key: string; value: string }>(getDB().exec("SELECT key, value FROM settings")[0])
}, null, 2);

export const importDataJSON = (json: string): void => {
  const parsed = JSON.parse(json) as { topics: Topic[]; mocks: MockTest[]; errors: ErrorLog[]; settings: { key: string; value: string }[] };
  const db = getDB();
  db.run("DELETE FROM topics"); db.run("DELETE FROM mock_tests"); db.run("DELETE FROM error_log"); db.run("DELETE FROM settings");
  const t = db.prepare("INSERT INTO topics (id, section, subsection, topic, status, flagged_for_revision, difficulty, importance, notes, last_updated) VALUES (?,?,?,?,?,?,?,?,?,?)");
  parsed.topics.forEach((x) => t.run([x.id, x.section, x.subsection, x.topic, x.status, x.flagged_for_revision, x.difficulty, x.importance, x.notes, x.last_updated])); t.free();
  const m = db.prepare("INSERT INTO mock_tests (id, test_name, date, varc_score, dilr_score, qa_score, total_score, varc_percentile, dilr_percentile, qa_percentile, overall_percentile, notes) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");
  parsed.mocks.forEach((x) => m.run([x.id, x.test_name, x.date, x.varc_score, x.dilr_score, x.qa_score, x.total_score, x.varc_percentile, x.dilr_percentile, x.qa_percentile, x.overall_percentile, x.notes])); m.free();
  const e = db.prepare("INSERT INTO error_log (id, topic_id, mock_test_id, error_description, root_cause, date) VALUES (?,?,?,?,?,?)");
  parsed.errors.forEach((x) => e.run([x.id, x.topic_id, x.mock_test_id, x.error_description, x.root_cause, x.date])); e.free();
  const s = db.prepare("INSERT INTO settings (key, value) VALUES (?,?)");
  parsed.settings.forEach((x) => s.run([x.key, x.value])); s.free();
  saveDB();
};