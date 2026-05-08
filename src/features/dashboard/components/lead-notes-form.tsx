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
        toast.success("Lead updated successfully");
      } else {
        toast.error(result.error || "Failed to update lead");
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Follow-up & Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label>Follow-up Status</Label>
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
            placeholder="Add notes about this lead..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={isPending}
            rows={4}
          />
        </div>

        <Button onClick={handleSubmit} disabled={isPending} className="w-full">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
