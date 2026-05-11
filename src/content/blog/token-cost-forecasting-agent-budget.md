---
title: "Token cost forecasting: how to budget agent spend before it surprises you"
excerpt: "The three-tier forecasting model that prevents 4x cost spikes. Per-task cost ceilings, monthly burn budgets, and what to do when a vendor rate change blows through your forecast mid-month."
date: "2026-05-12"
lastModified: "2026-05-12"
author: "Digital Point LLC"
category: "Pricing Transparency"
tags:
  - token cost
  - LLM budgeting
  - cost control
indexable: true
---

The most common surprise in agent operations: the LLM bill came in 4x last month. Nobody knows why. The agent volume looks normal. The model has not changed. Yet the bill is 4x. This post documents the three-tier forecasting model that catches the problem before it lands in the bill.

## Tier 1: per-task cost ceiling

Every agent decision has a budget. The orchestrator enforces it. If a single task is about to exceed (typical ceilings: $0.05-$0.50 per task for most workflows), the agent stops, logs the over-budget event, and either falls back to a smaller model or escalates to operator.

How the ceiling gets set. Compute the median per-task token usage over a 30-day baseline. Set the ceiling at 3-5x the median. This gives the agent room to handle complex cases while catching runaway loops.

The data you need: model rate card (input cost per token, output cost per token), running average input + output tokens for this workflow, current model in use. Most agents already log these. If yours does not, that is the first gap to close.

## Tier 2: monthly burn budget

Set a workflow-level monthly budget. Track running burn against it. Alert at 75% and again at 100%. Above 100%, configure the workflow to fall back to a smaller model or pause new invocations until the start of the next month.

For a typical lead-routing workflow processing 300 leads/month, a reasonable monthly budget is $50-$150 (median per-task $0.15-$0.50 × 300). For a document-parsing workflow at 200 invoices/month, $30-$80. For a high-volume support triage agent at 5,000 tickets/month, $250-$800.

The budgets are sized using actual production data from comparable workflows. DPL retainers ship with budgets pre-set in the workflow config; clients see the burn against budget in their weekly engagement report.

## Tier 3: vendor rate-change response

Anthropic, OpenAI, and Groq update their rate cards 1-3 times per year. Usually rates go down (more inference for the same dollar). Occasionally they go up on specific models. Occasionally a model is deprecated and the recommended replacement has different rates.

The response pattern:

When a vendor publishes a rate change, the workflow config gets updated within 7 days. The eval suite runs against the new model + new rates. If the eval suite passes, the workflow continues on the new rates. If it fails, the workflow stays pinned to the deprecated model until the prompt is re-tuned for the replacement.

The risk of not having this pattern: a model deprecation forces an emergency migration. The replacement model behaves differently. Workflows that depended on the deprecated model's specific behavior break in production. The team scrambles to retune prompts under time pressure.

The cost of having the pattern: 1-3 hours of eval-suite review per vendor rate change per workflow.

## What causes the 4x bill

In the surprise-bill case, three causes account for 95% of incidents.

Retry loops. A downstream tool started failing intermittently. The agent retried. The retry also failed. The retry on the retry succeeded. Now every task that touches the flaky tool is consuming 3x the tokens. Without per-task ceiling tracking, the increased cost is invisible until the monthly bill.

Hallucinated tool calls. The agent invented a tool name. Each invented call costs tokens with no business value. Tracking shows a sudden uptick in `tool_calls_outcome=hard_failure` records. Without output validation logging this, the agent burns tokens silently.

Model drift. The vendor pushed an update. The same prompt now produces longer outputs (more tokens) or routes through a more expensive reasoning path. Without weekly eval-suite review, the change goes undetected for weeks.

## The dashboard line you must have

One chart, two lines. Per-task cost (median, P95) tracked daily. Per-month aggregate burn against budget. Watch both. The median tells you about typical-case cost; P95 tells you about edge cases burning silently; the monthly burn tells you whether the workflow's economics still hold.

A well-instrumented agent shows the chart in real time. A poorly-instrumented agent surprises you at month-end. The retrofit cost to add the chart is 4-8 hours of engineering work, well below the cost of one surprise month.

## The takeaway

Token cost is forecastable. The math is not hard once the three tiers are in place. If your current bill surprises you, [a recovery diagnosis](/recovery) audits where the gap is and ships the dashboard + ceilings in the fix engagement.
