import "server-only";

import type { MessagePayload, MessagingProvider } from "../types";

export const twilioProviderStub: MessagingProvider = {
  async sendMessage(_payload: MessagePayload) {
    throw new Error("Twilio messaging provider is not implemented yet");
  },
};
