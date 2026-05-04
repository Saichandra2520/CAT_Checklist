"use client";

import { useEffect, useMemo, useState } from "react";
import { initDB } from "@/lib/db";
import * as q from "@/lib/queries";
import { ErrorLog, MockTest, Topic, TopicStatus } from "@/types";

export const useDB = () => {
  const [ready, setReady] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [mocks, setMocks] = useState<MockTest[]>([]);
  const [errors, setErrors] = useState<ErrorLog[]>([]);

  const refresh = () => {
    setTopics(q.getTopics());
    setMocks(q.getMocks());
    setErrors(q.getErrors());
  };

  useEffect(() => {
    initDB().then(() => {
      refresh();
      setReady(true);
    });
  }, []);

  const actions = useMemo(() => ({
    refresh,
    setTopicStatus: (id: string, status: TopicStatus) => { q.updateTopicStatus(id, status); refresh(); },
    toggleRevision: (id: string) => { q.toggleTopicRevision(id); refresh(); },
    saveNotes: (id: string, notes: string) => { q.updateTopicNotes(id, notes); refresh(); },
    addMock: q.addMock,
    deleteMock: (id: number) => { q.deleteMock(id); refresh(); },
    addError: (e: Omit<ErrorLog, "id">) => { q.addError(e); refresh(); },
    getSetting: q.getSetting,
    setSetting: (k: string, v: string) => { q.setSetting(k, v); refresh(); },
    exportJSON: q.exportDataJSON,
    importJSON: (json: string) => { q.importDataJSON(json); refresh(); }
  }), []);

  return { ready, topics, mocks, errors, ...actions };
};