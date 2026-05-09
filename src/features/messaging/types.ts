import type {
  CreateLeadInput,
  LeadBudget,
  LeadFinancing,
  LeadIntent,
  LeadTimeline,
} from "@/features/lead-capture/types/lead.types";

export interface MessagePayload {
  to?: string;
  body: string;
}

export interface MessagingProvider {
  sendMessage(payload: MessagePayload): Promise<void>;
}

export interface LeadMessageInput extends CreateLeadInput {
  score: number;
  createdAt: Date;
}

export interface LeadMessageLabels {
  intent: Record<LeadIntent, string>;
  budget: Record<LeadBudget, string>;
  timeline: Record<LeadTimeline, string>;
  financing: Record<LeadFinancing, string>;
}
