import { TopicPageClient } from "@/components/TopicPageClient";
import { syllabus } from "@/lib/data/syllabus";

export function generateStaticParams() {
  return syllabus.map((t) => ({ id: t.id }));
}

export default function Page({ params }: { params: { id: string } }) {
  return <TopicPageClient id={params.id} />;
}