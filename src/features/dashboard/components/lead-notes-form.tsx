"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FollowUpStatusSelect } from "./follow-up-status-select";
import { updateLeadFollowUpAction } from "@/actions/lead.actions";
import { Loader2, Save } from "lucide-react";
import type { Lead, FollowUpStatus } from "@prisma/client";

interface LeadNotesFormProps {
  lead: Lead;
}

const INITIAL_STATE = { ok: false as const, error: "" };

export function LeadNotesForm({ lead }: LeadNotesFormProps) {
  const [followUpStatus, setFollowUpStatus] = useState<FollowUpStatus>(lead.followUpStatus);
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    const formData = new FormData();
    formData.append("id", lead.id);
    formData.append("followUpStatus", followUpStatus);
    formData.append("notes", notes);

    startTransition(async () => {
      const result = await updateLeadFollowUpAction(INITIAL_STATE, formData);
      if (result.ok) {
        toast.success("Lead updated", {
          description: "Follow-up status and notes were saved for the next conversation.",
        });
      } else {
        toast.error(result.error || "We couldn’t save those changes.", {
          description: "Try again in a moment. Your current notes are still here.",
        });
      }
    });
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Follow-up plan</CardTitle>
        <p className="text-sm text-muted-foreground">
          Keep the next action obvious so this lead never gets lost after the demo.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label>Follow-up status</Label>
          <FollowUpStatusSelect
            value={followUpStatus}
            onChange={setFollowUpStatus}
            disabled={isPending}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Example: Buyer is flying in next week, wants Brickell condos, prefers WhatsApp after 4 PM."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={isPending}
            rows={6}
          />
          <p className="text-xs text-muted-foreground">
            Capture objections, preferred neighborhoods, or the exact next step for the handoff.
          </p>
        </div>

        <Button onClick={handleSubmit} disabled={isPending} className="w-full">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving updates...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save follow-up notes
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
