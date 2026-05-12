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
      <div className="flex flex-wrap items-center gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link href="/dashboard">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to dashboard
          </Link>
        </Button>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">{lead.name}</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          This detail view is built for demos and real follow-up: understand the buyer quickly, then capture the next action before moving on.
        </p>
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
