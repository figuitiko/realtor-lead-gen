import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { LeadStatusBadge, FollowUpBadge } from "./lead-status-badge";
import { formatDate } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import type { Lead } from "@prisma/client";

interface LeadsTableProps {
  leads: Lead[];
}

const budgetLabels: Record<string, string> = {
  BUDGET_300K_500K: "$300K–$500K",
  BUDGET_500K_1M: "$500K–$1M",
  BUDGET_1M_PLUS: "$1M+",
};

export function LeadsTable({ leads }: LeadsTableProps) {
  if (leads.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-12 text-center">
        <p className="text-muted-foreground">No leads found.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try adjusting your filters or wait for new submissions.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Follow-up</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-[60px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{lead.name}</div>
                  <div className="text-xs text-muted-foreground">{lead.email}</div>
                </div>
              </TableCell>
              <TableCell className="text-sm">
                {budgetLabels[lead.budget] ?? lead.budget}
              </TableCell>
              <TableCell>
                <span className="font-semibold">{lead.score}</span>
              </TableCell>
              <TableCell>
                <LeadStatusBadge status={lead.status} />
              </TableCell>
              <TableCell>
                <FollowUpBadge status={lead.followUpStatus} />
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDate(lead.createdAt)}
              </TableCell>
              <TableCell>
                <Button asChild variant="ghost" size="icon">
                  <Link href={`/dashboard/leads/${lead.id}`}>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
