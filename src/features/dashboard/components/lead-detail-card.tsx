import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeadStatusBadge, FollowUpBadge } from "./lead-status-badge";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Calendar, DollarSign, Clock, CreditCard, Target, Flame } from "lucide-react";
import type { Lead } from "@prisma/client";

interface LeadDetailCardProps {
  lead: Lead;
}

const budgetLabels: Record<string, string> = {
  BUDGET_300K_500K: "$300K – $500K",
  BUDGET_500K_1M: "$500K – $1M",
  BUDGET_1M_PLUS: "$1M+",
};

const timelineLabels: Record<string, string> = {
  ZERO_TO_THREE_MONTHS: "0–3 months",
  THREE_TO_SIX_MONTHS: "3–6 months",
  EXPLORING: "Just exploring",
};

const financingLabels: Record<string, string> = {
  APPROVED_FINANCING: "Approved financing",
  NEED_FINANCING: "Needs financing",
  CASH: "Cash buyer",
  NOT_SURE: "Not sure",
};

const intentLabels: Record<string, string> = {
  LIVE: "Primary or second home",
  INVEST: "Investment opportunity",
};

export function LeadDetailCard({ lead }: LeadDetailCardProps) {
  return (
    <div className="space-y-4">
      <Card className="border-border/60 shadow-sm">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Lead summary</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">{lead.name}</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Submitted on {formatDate(lead.createdAt)} through the qualification funnel. Use this view to understand readiness, contact details, and the right next move.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:justify-end">
            <LeadStatusBadge status={lead.status} />
            <FollowUpBadge status={lead.followUpStatus} />
            <Badge variant="outline" className="gap-1">
              <Flame className="h-3 w-3" />
              Score {lead.score}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Contact details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${lead.email}`} className="font-medium hover:underline">{lead.email}</a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${lead.phone}`} className="font-medium hover:underline">{lead.phone}</a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{formatDate(lead.createdAt)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Qualification signals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span>Intent: <strong>{intentLabels[lead.intent]}</strong></span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>Budget: <strong>{budgetLabels[lead.budget]}</strong></span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Timeline: <strong>{timelineLabels[lead.timeline]}</strong></span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span>Financing: <strong>{financingLabels[lead.financing]}</strong></span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">How to read this score</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-4xl font-bold">{lead.score}</div>
              <p className="mt-1 text-sm text-muted-foreground">
                The score combines budget, timeline, and financing readiness into a single demo-friendly priority signal.
              </p>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong className="text-foreground">HOT</strong> = ready to move fast</p>
              <p><strong className="text-foreground">WARM</strong> = needs structured follow-up</p>
              <p><strong className="text-foreground">COLD</strong> = still early or underqualified</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
