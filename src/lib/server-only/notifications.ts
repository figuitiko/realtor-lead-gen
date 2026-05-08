import "server-only";

export async function notifyHotLead(lead: {
  name: string;
  email: string;
  phone: string;
  score: number;
}) {
  // Placeholder — integrate email/SMS when Twilio/Resend is added
  console.log(`[HOT LEAD] ${lead.name} (${lead.email}) — score: ${lead.score}`);
}
