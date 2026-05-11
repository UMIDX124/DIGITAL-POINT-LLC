---
title: "The 30-criteria production-readiness audit for AI agents"
excerpt: "Most agents shipped in 2024 fail at least eight of these. The full audit checklist DPL runs on every recovery engagement, with the why behind each gate and what failure looks like in production."
date: "2026-05-12"
lastModified: "2026-05-12"
author: "Digital Point LLC"
category: "AI Agents"
tags:
  - AI agent production readiness
  - AI agent audit
  - AI agent observability
  - AI agent recovery
  - prompt injection
indexable: true
faqs:
  - question: "What does 'production-ready' mean for an AI agent?"
    answer: "Production-ready means the agent can run a real workflow continuously without a human babysitting it. Concretely: every decision is logged with PII redaction, failures retry with exponential backoff and route to a dead-letter queue, drift is detected against a baseline, prompt-injection inputs are sanitized, cost has a per-task ceiling, escalation paths exist with named humans and SLAs, rollback to last-known-good config takes under 5 minutes, credentials are scoped to least-privilege, evals run before every model or prompt change, and a runbook exists that a new operator can follow at 2 a.m. without paging the founder."
  - question: "Why do AI agents drift in production?"
    answer: "Three causes account for most of it. First, the underlying model changes — vendors push silent updates that alter behavior on edge cases. Second, the input distribution shifts — your users start sending slightly different inputs as your product evolves, and the agent's prompt was tuned for the old distribution. Third, the tools the agent calls change — an API adds a new field, a CRM column gets renamed, a downstream service returns a slightly different error format, and the agent's tool-call contract silently breaks. Without drift detection, all three failure modes look like 'the agent is working' until a user complains."
  - question: "How long does a recovery diagnosis take?"
    answer: "Two weeks. Week 1 is read-only — we audit your code, prompts, tool definitions, logs, and incident history against 30 criteria. Week 2 is the writeup and walkthrough — a written report scoring each criterion, a prioritized fix list, and a 1-hour call with your team to defend the findings. If a fix is straightforward enough to ship inside the diagnosis window, we will, but the diagnosis price is fixed at $5,000 regardless of how much we manage to fix during the audit itself."
---

Most teams shipped an AI agent in 2024 or 2025. By mid-2026, [80% of enterprise applications now embed at least one AI agent](https://www.digitalapplied.com/blog/30-agentic-ai-predictions-h2-2026-forecast). The same Gartner data shows that only 31% of enterprises have an agent in actual production — meaning the gap between "we shipped one" and "it runs reliably" is enormous.

This is the 30-criteria checklist DPL runs on every recovery engagement. It is the same checklist that drives our [free 10-question diagnostic](/diagnostic) — the public version tests the ten highest-leverage criteria. The full checklist below is what an agent has to clear to be considered production-ready in our model.

If your agent is missing more than eight of these, you are in recovery territory. We diagnose in 2 weeks for $5,000, fix in 4 weeks for $10,000, and operate from there at the standard $2,500/month retainer.

## Observability — six criteria

1. **Per-decision logs.** Every agent decision, every tool call, every retry is logged with timestamp, input hash, output hash, and outcome. No exceptions. If you cannot answer "what did the agent do for user X at 3:47 a.m.?" in under 30 seconds, you fail.

2. **PII redaction in logs.** Logs must redact identifiers (email, phone, account numbers) before they hit your observability platform. If your Datadog or Sentry has raw user emails, you have a compliance liability waiting to surface.

3. **Cost per task tracked.** Every invocation logs token spend or platform-call cost against a per-task ceiling. Without per-task cost tracking, a single runaway loop can drain a month of budget in hours.

4. **Latency distribution.** P50, P95, P99 latency per agent action, persisted for at least 30 days. Agents that work at P50 and fail at P99 are the worst kind of broken — invisible until someone with a real workload notices.

5. **Failure mode categorization.** Failures are tagged at the source — "tool-call returned 503", "LLM refused to comply", "output failed schema validation", "operator overrode the suggestion". Untagged failures stack up as a generic "error" bucket and you cannot fix what you cannot categorize.

6. **Live client visibility.** A real-time channel (Slack Connect or equivalent) where the client sees every agent decision and operator intervention as it happens. Platforms hide what their agents do. Production-grade engagements show everything.

## Retry + failure handling — five criteria

7. **Exponential backoff on tool calls.** Naive retries amplify outages. Backoff with jitter is non-negotiable.

8. **Dead-letter queue.** Failed invocations after N retries land in a DLQ that a human can inspect and replay. Failures must not vanish.

9. **Per-workflow kill-switch.** Operator can pause a workflow in production without redeploying code. Important for runaway-cost scenarios.

10. **Rollback to last-known-good in under 5 minutes.** Prompts and tool definitions are versioned. Reverting a bad change is a one-command operation, not a code-archaeology session.

11. **Idempotency on writes.** If the agent writes to your CRM and the retry runs, you do not get duplicate records. This is where most "the agent broke our customer data" incidents come from.

## Drift detection — three criteria

12. **Baseline eval suite.** A fixed set of 20-50 representative inputs with expected outputs. Run before every prompt change. If the suite regresses, the change does not ship.

13. **Production sampling.** A small percentage of real production outputs sampled into a human-review queue weekly. Drift surfaces here long before users complain.

14. **Model-version pinning.** Your agent does not call "claude-3-5-sonnet" — it calls "claude-3-5-sonnet-20250619". Vendor model updates do not silently change your behavior.

## Security — five criteria

15. **Prompt injection resistance.** User-supplied inputs go through a sanitization layer. Outputs are guarded against unintended tool calls. Tested with a corpus of known injection patterns at deploy time.

16. **Least-privilege credentials.** The agent runs with read-only or read-write credentials scoped to exactly the resources it needs. No "service account with admin." This is how a one-shot prompt-injection bug becomes a data incident.

17. **Output validation.** Structured outputs validated against a schema (Zod, Pydantic, JSON Schema) before they reach a downstream tool. Hallucinated tool calls do not silently execute.

18. **Audit log retention.** 90-day minimum retention on all decision logs, with PII redacted. Some industries need longer; this is the floor.

19. **Secret rotation drill.** You have rotated the underlying API keys in the last 90 days and the agent did not break. If you have not run this drill, you do not know how brittle the deployment is.

## Operations — six criteria

20. **Documented runbook.** A new operator can answer "what does this agent do, how does it fail, how do I pause it, how do I roll back" by reading a single document. Not a Notion wiki of seven documents.

21. **Escalation matrix.** Every failure category routes to a named human or pager rotation. Silent failure to the end user is the worst outcome — slow human reply is fine.

22. **SLA on escalation.** "Operator picks up the case within X hours during business hours, within Y hours outside" is written somewhere and tracked.

23. **Operator UI.** When an escalation lands, the operator has a console showing the full context — input, agent reasoning, attempted actions, downstream state. Not "go check the logs."

24. **On-call coverage.** Production agents have a defined on-call rotation. "We will look at it Monday morning" is not on-call.

25. **Weekly narrative report.** A short written analysis of what ran, what broke, what improved. Numbers without narrative are insufficient.

## Cost + economics — three criteria

26. **Token budget per workflow.** Each workflow has a documented monthly token budget. Exceeding it pages someone.

27. **Cost-per-outcome attribution.** You can answer "what did this lead cost to qualify" or "what did this report cost to generate" — not just "we spent $X on LLM tokens this month".

28. **Build-vs-buy math refreshed.** Every quarter, the in-house alternative cost is recalculated. If the agent stops being the cheaper path, you should know within the quarter, not the year.

## Compliance + contractual — two criteria

29. **DPA signed.** A Data Processing Agreement is in place with the underlying model vendor (Anthropic, OpenAI, Groq, etc.). For regulated industries, this is non-negotiable.

30. **Recovery plan documented.** If the agent goes offline, the manual fallback is documented and the team has practiced it. Single-point-of-failure agents are an operational liability dressed as productivity.

## What to do with this checklist

Score your agent honestly. If you clear 27 or more, you are in the top tier — congratulations, the gaps left are worth tracking but not crisis territory. If you clear 18-26, you have a single failure mode away from a 3 a.m. incident, and a recovery diagnosis pinpoints which one. If you clear fewer than 18, your agent is the profile that becomes the incident in the next 90 days, and the time to fix it is now.

Run the [public 10-question version](/diagnostic) in under 2 minutes — it covers the highest-leverage criteria from the list above and gives you a triage score before you decide whether to engage with us or anyone else.

If the score comes back red, [book a recovery diagnosis](/recovery). $5,000 for the 30-criteria audit. Two weeks. Written report. No retainer commitment until you decide to engage on the fix.
