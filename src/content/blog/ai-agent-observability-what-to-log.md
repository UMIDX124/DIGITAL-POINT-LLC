---
title: "AI agent observability: what to log, why, and what to redact"
excerpt: "The per-decision logging contract every production agent needs. Fields, retention, PII handling, and the queries you can answer in under 30 seconds when an incident lands."
date: "2026-05-12"
lastModified: "2026-05-12"
author: "Digital Point LLC"
category: "AI Agents"
tags:
  - AI agent observability
  - production logging
  - PII redaction
indexable: true
---

The fastest way to know if an AI agent is production-ready is to ask one question. If user X complained about response Y at 3:47 a.m. last Tuesday, can you reconstruct what the agent decided and why in under thirty seconds? If the answer is anything other than "yes, here is the decision log," your agent is not production-ready yet. This post documents the logging contract every DPL deployment ships with.

## The core record

Each agent decision writes one structured record. The fields are:

- timestamp in ISO-8601 with timezone
- workflow_id and run_id
- input_hash (SHA-256 of the canonical input, not the raw input)
- output_hash (SHA-256 of the canonical output)
- model_version pinned exactly (claude-3-5-sonnet-20250619, not claude-3-5-sonnet)
- token_count for input and output separately
- cost_usd computed at log time using the rate card pinned in the workflow config
- latency_ms split into model_latency and tool_latency
- tool_calls as an array of {tool, args_hash, status, retries}
- outcome enum: success / soft_failure / hard_failure / operator_handoff
- failure_reason free-text only when outcome != success

Hashing instead of storing the raw input solves two problems at once. PII does not leak into your observability platform, and you can still detect duplicate work by comparing hashes across runs.

## What to redact

If the raw input contains email addresses, phone numbers, account numbers, or any payload your DPA considers regulated, redact before hashing. The redaction is deterministic. The same email always reduces to the same hash, so you can still answer "did the agent see this user's record" without surfacing the email itself.

The redaction layer runs at the agent boundary, not inside the LLM call. By the time the prompt is built, sensitive fields are already replaced with stable tokens (USER_EMAIL_a3f2, ACCOUNT_4421). The LLM sees the tokens, your logs see the tokens, only the database layer ever holds the mapping back to real identifiers.

## Retention

90 days of full per-decision logs is the floor for B2B SaaS. Healthcare, finance, and legal regulated industries push to 12-24 months. Aggregate counts (without per-decision detail) retained indefinitely for trend analysis. The cost-benefit at 90 days is approximately $50-$200 per workflow per month in observability platform fees, well under one percent of the agent's total operating cost.

## The queries you should be able to run

A well-instrumented agent answers ten questions in under thirty seconds each, without anyone reading log files by hand.

1. What did the agent do for user X between time A and time B?
2. What is the per-task cost distribution this week vs last week?
3. Which workflow is responsible for the cost spike I see in the bill?
4. How many tool-call failures occurred in the last 24 hours, grouped by tool?
5. What percentage of cases escalated to a human this month?
6. What was the median latency at P50, P95, P99 by hour today?
7. Which prompt version is currently in production, and what was the previous version?
8. Has any user input pattern hit our injection-detection rules in the last hour?
9. Did the model output drift on our eval suite after the last prompt change?
10. Are there any workflows running today that have not run in the last 30 days (zombie runs)?

If your tooling cannot answer all ten in under thirty seconds, the gap is observability instrumentation, not log retention or query speed. DPL standard deployments ship Grafana dashboards pre-wired against these ten queries on day one of the engagement.

## Live observability vs forensics

Most teams confuse two distinct needs. Forensic logging answers "what happened" after an incident. Live observability answers "is the agent doing the right thing right now."

Live observability runs at higher cardinality and shorter retention. The DPL pattern: a Slack Connect channel posts every agent decision as it happens, redacted, with a one-line summary and a link into the dashboard. Forensic logs sit in the database. Most teams need both, sized differently. Live: full fidelity, 7-day retention, posted to operators and the client jointly. Forensic: hashed identifiers, 90-day retention, queried only on demand.

## The takeaway

Logging is not a place to save money. The cost of running solid observability is approximately 0.5-2% of the agent's total operating cost. The cost of not running it is the incident you cannot reconstruct, the cost spike you cannot attribute, and the drift you cannot prove. If you are running an agent in production without this layer, [a recovery diagnosis](/recovery) starts with wiring it up.
