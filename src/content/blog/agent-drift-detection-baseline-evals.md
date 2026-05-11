---
title: "Agent drift detection: building the baseline eval suite"
excerpt: "How to catch model drift, prompt rot, and vendor silent updates before users complain. The 20-50 input fixed eval pattern that every production agent needs."
date: "2026-05-12"
lastModified: "2026-05-12"
author: "Digital Point LLC"
category: "AI Agents"
tags:
  - AI agent drift
  - model evaluation
  - regression testing
indexable: true
---

Three things make a production AI agent quietly stop working. The vendor pushes a silent model update. Your prompt slowly ages out as your product evolves. The downstream tools the agent calls change their behavior. All three look identical from outside: "the agent still runs, but something feels off." This post documents the baseline eval pattern that catches all three before users do.

## The 20-50 input suite

Start with a fixed set of representative inputs. Twenty for a narrow-scope agent, fifty for a multi-step workflow. Each input is paired with one of two expected output formats.

The strict format pairs an input with a single canonical correct output. Use for cases where there is one right answer. Lead-scoring agents: input = lead record, expected output = score in [1, 100] within a tolerance of plus-or-minus 3. CRM enrichment agents: input = company name, expected output = enriched record matching a frozen reference.

The contract format pairs an input with a structural assertion. Use for cases where multiple correct answers exist but all valid answers share a shape. Customer support triage: input = ticket text, contract = output JSON with intent in a fixed enum, urgency in a fixed enum, suggested_response as a non-empty string under 500 characters.

## When to run the suite

Before every prompt change. Before every model swap. Before every tool-definition update. Before every dependency upgrade. On a weekly cron regardless of changes, to catch vendor silent updates.

The cron run is the one teams skip and regret. Anthropic and OpenAI push behavioral updates to existing model versions on the order of every 4-8 weeks. The version string does not always change with the behavior. A claude-3-5-sonnet-20250619 today is not guaranteed to produce the same outputs as the same string did three months ago. Pinning the version helps but does not guarantee.

## What to measure on each run

Three metrics. Percent of inputs producing strict-match correct output. Percent of inputs producing contract-compliant output. Median per-input cost and latency.

Acceptable thresholds depend on the workflow. For lead scoring against a tolerance of plus-or-minus 3, expect 85-95% strict match. For triage contract compliance, expect 95-99%. Cost variance over time should stay within plus-or-minus 15% of baseline; latency within plus-or-minus 25%. Cross those thresholds and the suite fails, the change does not ship, and an alert opens.

## Where to store the suite

Version-controlled. The suite is code, not a Notion table. Inputs and expected outputs sit alongside the agent's source. Updates to the suite require a pull request that documents why the expectation changed. Without this discipline, the suite becomes the thing teams update to make broken agents look good.

DPL standard deployments use a /evals directory at the workflow's repository root. Each input is a JSON file with the input payload, the expected output (strict or contract), and a one-line rationale field. The eval runner is a small TypeScript service that takes the agent's production prompt + model config, runs the suite, and produces a markdown report. Run time for a 30-input suite is typically 2-4 minutes.

## The drift signal vs the noise signal

A single failed eval is noise. A pattern is signal. Production agents are non-deterministic at the margin even with temperature pinned to 0, because tool call ordering, context window pressure, and vendor-side load can vary.

The drift signal: more than 5% of evals fail across two consecutive cron runs without a code or prompt change. That is a vendor silent update or downstream tool change, and it needs investigation.

The prompt rot signal: a single eval that has passed for 60+ days suddenly fails after a prompt change. That is the prompt change introducing regression, and the prompt change does not ship until the eval passes again.

The tool-contract signal: an eval that previously passed now fails with a tool-call error. The downstream API changed. The tool definition needs updating.

## What it costs

Building a 30-input suite is a 4-8 hour engagement task. Maintaining it is a fixed 1-2 hours per week as the workflow evolves. Eval run costs (tokens per run × runs per week) typically land at $5-$30 per workflow per month at moderate scope. The trade is: pay $30/month in eval cost to avoid the incident that would cost a 2-day operator hunt plus user trust.

## The takeaway

If your agent does not have an eval suite, you are operating with a fundamentally untestable system. Drift will happen. The question is whether you catch it on a weekly cron or after a user complains. [Recovery audits](/recovery) score this gap in the first week and ship the suite as part of the fix engagement.
