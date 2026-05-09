import "server-only";

import type { MessagePayload, MessagingProvider } from "../types";

export const consoleProvider: MessagingProvider = {
  async sendMessage(payload: MessagePayload) {
    console.log(`[Messaging] ${payload.body}`);
  },
};
