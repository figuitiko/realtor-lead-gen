import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LeadDetailCard } from "@/features/dashboard/components/lead-detail-card";
import { LeadNotesForm } from "@/features/dashboard/components/lead-notes-form";
import { getDefaultRealtor, getLeadById } from "@/lib/server-only/lead.repository";
import { ArrowLeft } from "lucide-react";

interface LeadDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { id } = await params;
  const defaultRealtor = await getDefaultRealtor();
  if (!defaultRealtor) notFound();

  const lead = await getLeadById(id, defaultRealtor.id);

  if (!lead) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link href="/dashboard">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">{lead.name}</h1>
        <p className="text-muted-foreground text-sm">Lead submitted via qualification funnel</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <LeadDetailCard lead={lead} />
        </div>
        <div>
          <LeadNotesForm lead={lead} />
        </div>
      </div>
    </div>
  );
}
