import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { LeadStatus, FollowUpStatus } from "@prisma/client";

interface LeadStatusBadgeProps {
  status: LeadStatus;
}

const statusStyles: Record<LeadStatus, string> = {
  HOT: "bg-red-100 text-red-700 border-red-200 hover:bg-red-100",
  WARM: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100",
  COLD: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100",
};

const statusEmoji: Record<LeadStatus, string> = {
  HOT: "🔥",
  WARM: "⭐",
  COLD: "❄️",
};

export function LeadStatusBadge({ status }: LeadStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn("font-medium", statusStyles[status])}
    >
      {statusEmoji[status]} {status}
    </Badge>
  );
}

interface FollowUpBadgeProps {
  status: FollowUpStatus;
}

const followUpStyles: Record<FollowUpStatus, string> = {
  NEW: "bg-slate-100 text-slate-700 border-slate-200",
  CONTACTED: "bg-blue-100 text-blue-700 border-blue-200",
  APPOINTMENT_SCHEDULED: "bg-green-100 text-green-700 border-green-200",
  NOT_QUALIFIED: "bg-red-100 text-red-700 border-red-200",
  CLOSED: "bg-purple-100 text-purple-700 border-purple-200",
};

const followUpLabels: Record<FollowUpStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  APPOINTMENT_SCHEDULED: "Appointment Scheduled",
  NOT_QUALIFIED: "Not Qualified",
  CLOSED: "Closed",
};

export function FollowUpBadge({ status }: FollowUpBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn("font-medium", followUpStyles[status])}
    >
      {followUpLabels[status]}
    </Badge>
  );
}
