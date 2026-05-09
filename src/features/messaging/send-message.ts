import "server-only";

import { formatLeadMessage } from "./format-lead-message";
import { consoleProvider } from "./providers/console-provider";
import type { LeadMessageInput, MessagingProvider } from "./types";

function getMessagingProvider(): MessagingProvider {
  return consoleProvider;
}

export async function sendHotLeadMessage(lead: LeadMessageInput) {
  const provider = getMessagingProvider();

  await provider.sendMessage({
    body: formatLeadMessage(lead),
  });
}
