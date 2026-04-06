// app/builder/[id]/page.tsx

import {BuilderWorkspace} from "@/components/builder";
import { TemplateId } from "@/types/builder";

export async function generateStaticParams() {
  return [
    { id: 'template-one' },
  ];
}

export default async function BuilderPage({ 
  params,
}: { 
  params: Promise<{ id: TemplateId }>;
  searchParams: Promise<{ template?: string }>;
}) {
  const { id } = await params;

  return (
    <BuilderWorkspace 
      resumeId={id || "template-one"} 
    />
  );
}