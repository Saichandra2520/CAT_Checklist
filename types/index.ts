export type Section = "VARC" | "DILR" | "QA";
export type TopicStatus = "not_started" | "in_progress" | "completed";
export type Difficulty = "easy" | "medium" | "hard";
export type Importance = "low" | "medium" | "high";

export type TopicSeed = {
  id: string;
  section: Section;
  subsection: string;
  topic: string;
  difficulty: Difficulty;
  importance: Importance;
};

export type Topic = TopicSeed & {
  status: TopicStatus;
  flagged_for_revision: number;
  notes: string;
  last_updated: string;
};

export type Formula = {
  label: string;
  formula: string;
  example: string;
};

export type Question = {
  qText: string;
  options?: string[];
  answer: string;
  explanation: string;
};

export type TopicContent = {
  id: string;
  conceptSummary: string;
  keyFormulas?: Formula[];
  commonTraps: string[];
  sampleQuestions: Question[];
  quickTips: string[];
  studyOrder: number;
};

export type MockTest = {
  id: number;
  test_name: string;
  date: string;
  varc_score: number;
  dilr_score: number;
  qa_score: number;
  total_score: number;
  varc_percentile: number;
  dilr_percentile: number;
  qa_percentile: number;
  overall_percentile: number;
  notes: string;
};

export type ErrorLog = {
  id: number;
  topic_id: string;
  mock_test_id: number | null;
  error_description: string;
  root_cause: string;
  date: string;
};