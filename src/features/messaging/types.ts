import type {
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

export interface LeadMessageInput {
  name: string;
  email: string;
  phone: string;
  intent: LeadIntent;
  budget: LeadBudget;
  timeline: LeadTimeline;
  financing: LeadFinancing;
  score: number;
  createdAt: Date;
}

export interface LeadMessageLabels {
  intent: Record<LeadIntent, string>;
  budget: Record<LeadBudget, string>;
  timeline: Record<LeadTimeline, string>;
  financing: Record<LeadFinancing, string>;
}
