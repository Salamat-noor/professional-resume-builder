import { BuilderWorkspace } from "@/components/builder";

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default async function BuilderPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ id: string }>;
  searchParams: Promise<{ template?: string }>;
}) {
  const { id } = await params;
  const { template } = await searchParams;

  return (
    <BuilderWorkspace 
      resumeId={id} 
      templateId={template || "executive"}
    />
  );
}
