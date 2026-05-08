"use client";

import { CheckCircle, Clock, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { LeadStatus } from "@/features/lead-capture/types/lead.types";

interface QualificationResultProps {
  status: LeadStatus;
  name: string;
}

const statusConfig = {
  HOT: {
    icon: Flame,
    color: "text-red-500",
    bg: "bg-red-50 border-red-200",
    title: "You qualify!",
    message: "You're exactly who we work with. Expect a call from our team within a few hours.",
  },
  WARM: {
    icon: CheckCircle,
    color: "text-amber-500",
    bg: "bg-amber-50 border-amber-200",
    title: "Good fit!",
    message: "You look like a great candidate. Our team will reach out within 24 hours.",
  },
  COLD: {
    icon: Clock,
    color: "text-blue-500",
    bg: "bg-blue-50 border-blue-200",
    title: "We received your info",
    message: "When you're ready to move forward, we'll be here to help.",
  },
};

export function QualificationResult({ status, name }: QualificationResultProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className={`rounded-full p-4 ${config.bg}`}>
          <Icon className={`h-12 w-12 ${config.color}`} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold">{config.title}</h2>
        <p className="mt-1 text-muted-foreground">
          {name ? `Thanks, ${name}. ` : ""}{config.message}
        </p>
      </div>

      <Card className={config.bg}>
        <CardContent className="pt-4 text-sm text-center text-muted-foreground">
          <p>Submitting your information now...</p>
        </CardContent>
      </Card>
    </div>
  );
}
