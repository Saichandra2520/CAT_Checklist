"use client";
import { Topic } from "@/types";
import { topicContent } from "@/lib/data/topicContent";

export const TopicDetailPanel = ({ topic }: { topic: Topic }) => {
  const content = topicContent[topic.id];
  return <div className="space-y-4"><p>{content?.conceptSummary}</p></div>;
};