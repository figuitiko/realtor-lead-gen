import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeadStatusBadge, FollowUpBadge } from "./lead-status-badge";
import { formatDate } from "@/lib/utils";
import { Mail, Phone, Calendar, DollarSign, Clock, CreditCard, Target } from "lucide-react";
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

export function LeadDetailCard({ lead }: LeadDetailCardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <a href={`tel:${lead.phone}`} className="hover:underline">{lead.phone}</a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(lead.createdAt)}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Qualification Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span>Intent: <strong>{lead.intent === "LIVE" ? "Live" : "Invest"}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>Budget: <strong>{budgetLabels[lead.budget]}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>Timeline: <strong>{timelineLabels[lead.timeline]}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span>Financing: <strong>{financingLabels[lead.financing]}</strong></span>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-base">Lead Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold">{lead.score}</div>
            <div className="space-y-1">
              <LeadStatusBadge status={lead.status} />
              <div className="text-xs text-muted-foreground">
                80+ = HOT · 50–79 = WARM · &lt;50 = COLD
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
