export const schemaSQL = `
CREATE TABLE IF NOT EXISTS topics (
  id TEXT PRIMARY KEY,
  section TEXT NOT NULL,
  subsection TEXT NOT NULL,
  topic TEXT NOT NULL,
  status TEXT DEFAULT 'not_started',
  flagged_for_revision INTEGER DEFAULT 0,
  difficulty TEXT DEFAULT 'medium',
  importance TEXT DEFAULT 'high',
  notes TEXT DEFAULT '',
  last_updated TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS mock_tests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  test_name TEXT,
  date TEXT,
  varc_score INTEGER,
  dilr_score INTEGER,
  qa_score INTEGER,
  total_score INTEGER,
  varc_percentile REAL,
  dilr_percentile REAL,
  qa_percentile REAL,
  overall_percentile REAL,
  notes TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS error_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  topic_id TEXT,
  mock_test_id INTEGER,
  error_description TEXT,
  root_cause TEXT,
  date TEXT,
  FOREIGN KEY (topic_id) REFERENCES topics(id)
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);
`;