---
name: plan-doc-review
description: >
  Prompts the agent to ask the user to save a completed plan into the docs folder for review before implementation.
  Trigger: After an implementation plan, phase plan, or execution plan is created and before implementation begins.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- After the agent has created a complete implementation plan
- After a phase plan is written in-chat and is ready to be persisted
- Before implementation starts, when the plan should be reviewed first
- When the project uses `docs/` as the place for saved plans

## Critical Patterns

- Do **not** jump straight from planning into implementation.
- After presenting the plan, explicitly ask the user if they want the plan saved into the `docs/` folder for review.
- Prefer naming the file with the same phase-based style already used by the project, such as:
  - `docs/phase-4-messaging-abstraction.md`
  - `docs/phase-5-multi-realtor-support.md`
- If the user confirms, save the plan before implementation begins.
- If the user does **not** confirm, keep the plan in-chat and wait.
- If the plan is a follow-up or verification checklist, use a clear suffix such as:
  - `phase-5-finalization-seed-and-verify.md`
- When asking, keep the wording direct and review-oriented:
  - “Do you want me to save this plan in `docs/` so you can review it before implementation?”

## Code Examples

### Good prompt after planning

```text
The plan is ready. Do you want me to save it in `docs/phase-6-demo-ready-polish.md` so you can review it before implementation?
```

### Good follow-up when the user says yes

```text
Saved in `docs/phase-6-demo-ready-polish.md`. Review it and then we can implement.
```

### Bad behavior

```text
Plan complete. I already started implementing it.
```

## Commands

```bash
ls docs
find docs -maxdepth 2 -type f | sort
```

## Resources

- **Documentation**: See [../../docs/](../../docs/) for existing plan naming patterns
