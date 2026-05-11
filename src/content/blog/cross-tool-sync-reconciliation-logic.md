---
title: "Cross-tool sync with reconciliation logic, not just webhooks"
excerpt: "Webhooks lie. APIs miss events. Bi-directional sync between CRM, helpdesk, billing, and marketing tools needs reconciliation logic, not just a Zapier zap firing on update. The production pattern."
date: "2026-05-12"
lastModified: "2026-05-12"
author: "Digital Point LLC"
category: "Workflow Automation"
tags:
  - data sync
  - integration
  - n8n
  - bi-directional sync
indexable: true
---

The classic Zapier setup looks like this. A field updates in HubSpot. A webhook fires. A zap catches it. The same field updates in Salesforce. Most days, it works. Three days a quarter, it does not. A webhook gets lost, an API rate-limits, a network blip kills the in-flight update. The data drifts. Nobody notices until a sales rep argues about a discrepancy. This post documents the reconciliation pattern that catches what webhooks miss.

## The dual-loop pattern

Production cross-tool sync runs two loops in parallel. The fast loop is the webhook + immediate-write pattern. The slow loop is the periodic reconciliation pass.

Fast loop: an event fires in source-of-truth System A. A webhook arrives at the sync orchestrator (n8n, custom service, or platform). The orchestrator writes the corresponding field in System B within seconds. Most updates flow through here.

Slow loop: every 4-12 hours, a reconciliation job pulls the canonical state of both systems and compares. Discrepancies (records that should match but do not) get written to a reconciliation queue. The orchestrator processes the queue: if the discrepancy fits a known pattern (source-of-truth wins, recency wins, or merge per documented rule), auto-resolve. Otherwise escalate to operator review.

## Why webhooks alone are not enough

Three failure modes:

1. Lost events. Webhooks are best-effort delivery. Network blips, receiver downtime, and provider-side rate limits all cause occasional drops. SaaS platforms quote 99.5-99.9% webhook delivery, which sounds high until you compute: 0.1% drop rate × 100 events per day = 1 lost event per day, accumulating to ~365 per year.

2. Out-of-order arrival. Webhooks can arrive in a different order than the events occurred. Without reconciliation, a stale update written after a fresh one wins.

3. Schema drift. The source field changes shape (a single-select becomes multi-select). Webhooks keep firing with the old schema until you patch the receiver. Reconciliation catches the divergence the same day.

## What reconciliation logic actually does

The reconciliation pass is not just "compare and overwrite." It is a set of documented rules:

Source-of-truth rule: for each synced field, one system is the canonical source. Discrepancies always favor the source. Example: a deal's stage might be canonical in Salesforce; HubSpot mirrors it. If the two diverge, Salesforce wins.

Recency rule: for fields where both systems can legitimately update (notes, comments, custom fields), the most recently modified version wins. Requires both systems to expose accurate modification timestamps.

Merge rule: for list-shaped fields (tags, contacts, related deals), the merged union wins. Both sides keep what they have, and the canonical state is the union.

Escalate rule: for high-stakes fields (deal value, contract dates, contact ownership), any discrepancy routes to an operator. No auto-resolution.

The rule set is workflow-specific and gets documented in a sync policy doc during the pilot scope phase.

## Cost of running reconciliation

Reconciliation runs in the background. For a typical mid-market CRM + helpdesk sync at 5,000-20,000 records:

- API call cost: most platforms have generous rate limits for bulk reads. The reconciliation pass typically uses 100-500 API calls per cycle.
- Compute cost: $10-$40/month on a small VM or serverless function.
- LLM cost: only if escalation queue items need agent-assisted classification. Typically $5-$20/month.
- Total: $15-$60/month in infrastructure on top of the sync orchestrator itself.

Compared to the cost of a stale-data incident (a sales rep arguing with a customer over a field that does not match, or an executive dashboard showing wrong numbers), the math heavily favors running reconciliation.

## What the dashboard shows

Every DPL cross-tool sync engagement ships a weekly dashboard with five numbers.

1. Fast-loop event count by source and direction.
2. Slow-loop reconciliation cycles run and discrepancies found.
3. Auto-resolved discrepancies by rule (source-of-truth, recency, merge).
4. Operator-escalated discrepancies by category.
5. Time-to-resolution distribution on operator queue.

These numbers tell you whether the sync is drifting (auto-resolution rate dropping), whether the source systems are misbehaving (escalation rate spiking), and whether operator coverage is keeping pace (queue depth and time-to-resolution).

If your current sync setup is "a zap that mostly works" and you cannot answer these five questions, [a free audit](/audit) scopes what reconciliation would catch on your stack.
