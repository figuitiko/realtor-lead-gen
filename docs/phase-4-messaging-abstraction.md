# Phase 4 — Messaging Abstraction for HOT Lead Notifications

## Summary
Add a server-only messaging feature under `src/features/messaging/` so HOT lead creation can format and send a future WhatsApp/Twilio-ready notification without coupling app code to Twilio. Use a console provider by default, and log-and-continue if notification sending fails so lead capture is never blocked.

## Key Changes
- Create `src/features/messaging/` with:
  - `types.ts`: `MessagePayload`, `MessagingProvider`, and `LeadMessageInput`.
  - `format-lead-message.ts`: formats the exact HOT lead summary message.
  - `providers/console-provider.ts`: server-only provider that logs message destination/body.
  - `providers/twilio-provider.stub.ts`: server-only stub implementing the same interface, no secrets, no Twilio SDK.
  - `send-message.ts`: server-only provider boundary; currently hard-codes console provider.
- Update HOT lead flow in `src/actions/lead.actions.ts`:
  - Replace `notifyHotLead` placeholder usage with the messaging feature.
  - Pass full lead fields required by the message: name, phone, email, intent, budget, timeline, financing, score, createdAt.
  - Wrap send in `try/catch`, log failure, continue redirect.
- Remove or stop using `src/lib/server-only/notifications.ts` after migration to avoid duplicate notification abstractions.

## Interfaces / Behavior
- `MessagingProvider` shape:
  - `sendMessage(payload: MessagePayload): Promise<void>`
- `MessagePayload` includes:
  - `to?: string`
  - `body: string`
- Message format must be exactly:

```txt
New HOT lead for Miami Realtor

Name:
Phone:
Email:
Intent:
Budget:
Timeline:
Financing:
Score:
Created at:
```

- `twilio-provider.stub.ts` must not read secrets or import Twilio; it should throw or clearly log that Twilio is not implemented yet.
- All messaging files that execute provider logic must include `import "server-only";`.

## Test Plan
- Add/adjust unit tests only if the existing test setup supports importing the formatter cleanly.
- Verify manually/static:
  - HOT lead path calls `sendHotLeadMessage` or equivalent.
  - WARM/COLD leads do not call messaging.
  - No client component imports `src/features/messaging/*`.
  - No Twilio env vars or secrets are exposed.
- Run targeted checks, not build:
  - `npx tsc --noEmit` if desired, noting existing unrelated Zod v4 errors may still fail.
  - Existing scoring tests are unrelated and may still have the known failing expectation.

## Assumptions
- Provider selection remains hard-coded to console for Phase 4.
- Messaging failure logs and does not block lead creation.
- Twilio integration, environment variables, delivery retries, and real WhatsApp destination routing are out of scope for this phase.
