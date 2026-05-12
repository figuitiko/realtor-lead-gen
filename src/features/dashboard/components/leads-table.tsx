import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeadStatusBadge, FollowUpBadge } from "./lead-status-badge";
import { formatDate } from "@/lib/utils";
import { ExternalLink, Inbox } from "lucide-react";
import type { Lead } from "@prisma/client";

interface LeadsTableProps {
  leads: Lead[];
  hasFilters?: boolean;
}

const budgetLabels: Record<string, string> = {
  BUDGET_300K_500K: "$300K–$500K",
  BUDGET_500K_1M: "$500K–$1M",
  BUDGET_1M_PLUS: "$1M+",
};

const followUpSummary: Record<string, string> = {
  NEW: "Needs first outreach",
  CONTACTED: "Conversation started",
  APPOINTMENT_SCHEDULED: "Meeting on the calendar",
  NOT_QUALIFIED: "Not a fit right now",
  CLOSED: "Converted or completed",
};

export function LeadsTable({ leads, hasFilters = false }: LeadsTableProps) {
  if (leads.length === 0) {
    return (
      <div className="rounded-2xl border bg-card p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Inbox className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-semibold">{hasFilters ? "No leads match these filters" : "No leads yet"}</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          {hasFilters
            ? "Try a broader status or follow-up filter to bring more leads back into view."
            : "Once the funnel starts collecting inquiries, qualified buyers will appear here with their score, timing, and next action."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-card shadow-sm">
        <div className="hidden overflow-x-auto md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Follow-up</TableHead>
                <TableHead>Submitted</TableHead>
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
                  <TableCell className="text-sm">{budgetLabels[lead.budget] ?? lead.budget}</TableCell>
                  <TableCell>
                    <span className="font-semibold">{lead.score}</span>
                  </TableCell>
                  <TableCell>
                    <LeadStatusBadge status={lead.status} />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <FollowUpBadge status={lead.followUpStatus} />
                      <p className="text-xs text-muted-foreground">{followUpSummary[lead.followUpStatus]}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatDate(lead.createdAt)}</TableCell>
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

        <div className="grid gap-3 p-4 md:hidden">
          {leads.map((lead) => (
            <div key={lead.id} className="rounded-2xl border bg-background p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{lead.name}</p>
                  <p className="text-sm text-muted-foreground">{lead.email}</p>
                </div>
                <Button asChild variant="ghost" size="icon" className="shrink-0">
                  <Link href={`/dashboard/leads/${lead.id}`}>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Budget</p>
                  <p className="mt-1 font-medium">{budgetLabels[lead.budget] ?? lead.budget}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Score</p>
                  <p className="mt-1 font-medium">{lead.score}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Status</p>
                  <div className="mt-1"><LeadStatusBadge status={lead.status} /></div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Follow-up</p>
                  <div className="mt-1 space-y-1">
                    <FollowUpBadge status={lead.followUpStatus} />
                    <p className="text-xs text-muted-foreground">{followUpSummary[lead.followUpStatus]}</p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">Submitted {formatDate(lead.createdAt)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
