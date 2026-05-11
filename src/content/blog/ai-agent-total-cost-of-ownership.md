---
title: "AI agent total cost of ownership: the line items most teams miss"
excerpt: "Beyond the LLM token bill. Engineering time, integration cost, monitoring, drift detection, operator escalation, vendor relationships. The full TCO math for a production AI agent in 2026."
date: "2026-05-12"
lastModified: "2026-05-12"
author: "Digital Point LLC"
category: "Pricing Transparency"
tags:
  - AI agent TCO
  - cost analysis
  - build vs buy
indexable: true
---

Every "AI is cheap" pitch leaves out 70% of the bill. The token cost is usually the smallest line item in production agent operations. This post walks through the full TCO math for a typical production AI agent so you can compare apples-to-apples to the in-house alternative or to a managed-service retainer.

## The eight line items

A production AI agent in 2026 has eight cost line items. Most TCO writeups quote one of them.

1. Model inference (token cost). The visible LLM bill. For a moderate-volume workflow (10-100 invocations per day, average input + output 2-8K tokens), expect $50-$500 per workflow per month at 2026 Claude Sonnet or GPT-4o rates. High-throughput workflows scale to $2,000-$5,000 per workflow per month.

2. Orchestration platform. n8n self-hosted: $20/month for the VM. n8n Cloud: $50-$500/month depending on workflow volume. Make: $30-$300/month. Zapier at production volume: $400-$3,000/month. Pick badly here and orchestration becomes 30-50% of TCO.

3. Supporting infrastructure. Database (Postgres or equivalent) for state: $20-$200/month. Redis for ephemeral state: $10-$50/month. Vector store if the workflow uses retrieval: $20-$200/month. Webhooks and queues: $0-$100/month if hosted services.

4. Observability. Per-decision logs need persistence and indexing. Self-hosted (Grafana + Loki): $30-$100/month at moderate volume. Managed (Datadog, Honeycomb): $200-$2,000/month depending on event volume.

5. Engineering build. The one-time cost of building the workflow. Internal engineering at $150-$250/hour fully loaded, 40-120 hours typical = $6,000-$30,000. Or a fixed-fee agency pilot at $2,500-$15,000.

6. Engineering maintenance. Ongoing prompt tuning, eval suite updates, vendor change response. Internal at 5-15 hours/month = $750-$3,750/month. Or rolled into a $2,500/month retainer.

7. Operator hours. Cases the agent cannot resolve route to a human. For a tuned agent, 3-12% of cases escalate. At 5-30 minutes per escalation, this is 5-40 operator-hours per month per workflow. At $50/hour fully loaded = $250-$2,000/month.

8. Vendor relationships. Negotiating DPAs, monitoring vendor SLAs, responding to vendor incidents. Small but non-zero: $100-$500/month in time amortized across workflows.

## A worked example

A B2B SaaS doing lead routing and CRM enrichment. Two workflows. Moderate volume (300 inbound leads/month, 10,000 CRM records on enrichment rotation).

In-house build with one ops associate maintaining:

| Line item | Monthly |
|---|---|
| Inference (both workflows) | $120 |
| n8n Cloud at this volume | $80 |
| Database + Redis + vector | $90 |
| Datadog at this event volume | $400 |
| Engineering maintenance (8h/month) | $1,400 |
| Ops associate (50% of FTE on this) | $4,500 |
| Vendor management (amortized) | $200 |
| **Monthly TCO** | **$6,790** |

DPL retainer covering the same workflows:

| Line item | Monthly |
|---|---|
| Inference + supporting infra | absorbed |
| Orchestration platform | absorbed |
| Observability | absorbed |
| Engineering maintenance | absorbed |
| Operator hours | absorbed |
| Vendor management | absorbed |
| **Monthly retainer** | **$2,500** |

The retainer is 37% of the in-house TCO at the same coverage. The savings exist because we operate many client workflows on shared infrastructure (orchestration, observability, vendor relationships are mostly fixed costs that we amortize across the book) and because the operator hours are mixed across multiple workflows.

## The build cost

The retainer math leaves out the build cost. For the in-house team, the two workflows are $12,000-$30,000 of engineering build (40-120 hours per workflow × $150-$250/hour). DPL absorbs the build cost into a $2,500 pilot per workflow. The pilot is fixed-fee, scoped to one workflow, 30 days from kickoff to handover.

Two workflows = $5,000 in pilot fees. Compared to $12,000-$30,000 of internal build, the pilot is 17-42% of the cost and 4-6x faster.

## What the math does not capture

Three things favor the managed-service path that are hard to put on a spreadsheet.

Speed to production. The pilot ships in 30 days. Internal builds often slip to 60-120 days because the engineer building the workflow has other obligations.

Drift recovery. When a vendor pushes an update that breaks the agent, the in-house team triages on their own time. The agency catches it on the weekly eval cron and ships the fix without you knowing the incident happened.

Optionality. Cancel any month. No multi-year SaaS lock-in. If the workflow stops mattering, the retainer ends. If the business pivots, the retainer scope adjusts.

## What the math does favor for in-house

Three cases:

If the workflow uses proprietary models you cannot send through a third-party orchestrator.

If compliance requires the data and code to stay inside your VPC with zero outside personnel access.

If you have an internal AI platform team already operating multiple agents and the marginal cost of adding one more is genuinely negligible.

For everyone else, the math is the retainer.

## The takeaway

When someone quotes "AI is cheap, just $50/month in tokens," ask about the other seven line items. The math gets honest once all eight are on the table. [The pricing page](/pricing) shows our rate card; [a free audit](/audit) does the math on your specific workflows.
