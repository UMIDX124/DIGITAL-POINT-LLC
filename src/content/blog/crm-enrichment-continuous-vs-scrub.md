---
title: "CRM enrichment: continuous vs the one-time scrub"
excerpt: "Why most CRM data goes stale within 90 days and how a continuous AI agent enrichment pattern beats the quarterly cleanup project on cost and quality."
date: "2026-05-12"
lastModified: "2026-05-12"
author: "Digital Point LLC"
category: "Workflow Automation"
tags:
  - CRM enrichment
  - data quality
  - sales operations
indexable: true
---

Every B2B sales team eventually hires a consultant to do a CRM scrub. Fields get filled in. Duplicates merged. Stale records archived. Three months later the CRM is dirty again because nothing in the pipeline keeps it clean. The continuous enrichment pattern fixes the underlying problem. This post documents how it works.

## The decay rate

In a typical B2B SaaS CRM, the half-life of field accuracy is approximately 18 months for static fields (industry, founding year) and 60-90 days for dynamic fields (employee count, funding stage, primary contact title, tech stack). Without continuous enrichment, by month 6 post-scrub roughly 30-40% of records have at least one stale field. By month 12, the number climbs to 50-65%.

The one-time scrub solves the present-day picture and then immediately starts decaying. Continuous enrichment solves the underlying flow: every record stays fresh because the agent checks it on a rolling cadence.

## The continuous pattern

Every record in the CRM has a `last_enriched_at` timestamp. The continuous enrichment agent runs daily and picks records whose timestamp is older than the workflow's freshness window.

Freshness windows vary by field. Tier-1 accounts (active deals, top-tier ICP) get re-enriched every 14 days. Tier-2 accounts (open pipeline, secondary ICP) every 30 days. Tier-3 (closed-won renewals, cold leads, parked deals) every 90 days. The agent processes 50-200 records per day depending on the cadence and the total CRM size.

For each record, the agent:

1. Pulls the current CRM state.
2. Queries the enrichment provider for the latest data.
3. Compares field-by-field for differences above a meaningful threshold (employee count +/- 10%, funding stage change, technology stack additions or removals).
4. Writes the diff to the CRM as an update, with the source attribution in a custom field.
5. Optionally pings the account owner in Slack if a material change occurred (funding round, acquisition, leadership change in the account).

## Where it differs from a scrub

A scrub touches every record once. Continuous enrichment touches every record many times over its lifecycle. The cost trade-off is favorable: per-record cost is lower because the agent does smaller diff updates instead of full re-extraction, but total spend over a year is higher because the agent runs continuously.

For a CRM with 10,000 accounts:

- One-time scrub: $5,000-$15,000 project fee, 4-6 weeks duration, accuracy decays starting day 1.
- Continuous enrichment: $2,500/month retainer covering all 10,000 records on appropriate cadence. After 6 months, the accuracy is materially better than a scrub at the same point. After 12 months, the difference is large.

## What requires human review

Two patterns route to operator review in continuous enrichment.

Account ownership changes: if the agent detects the named primary contact has left the company (LinkedIn change, bounce on enrichment provider data, email autoresponder), the agent flags but does not auto-replace. Operator confirms with the account owner before any CRM update.

Company-level events: acquisitions, mergers, name changes, layoffs at scale. These are material to the sales motion and deserve human attention before being written as a routine update.

## The pilot configuration

DPL CRM enrichment pilots start with a sample of 500 records (mix of tiers). Week 1: agent tuning against the sample, accuracy baselining. Week 2-3: rolling enrichment across the full CRM. Week 4: handover with a weekly run dashboard showing records updated, fields changed, operator escalations, cost per record.

Pilot acceptance criteria:

- 90%+ enrichment success rate (provider returned a usable result).
- Zero unauthorized field overwrites (any operator-curated field is left alone unless explicitly flagged for refresh).
- Weekly dashboard live, account owner Slack notifications working.

Continuation into retainer at $2,500/month is decided at day 30. If the pilot did not deliver materially fresher data than the prior CRM state, no retainer.

If your CRM is decaying between scrubs and your sales reps are quietly working from stale data, [a free audit](/audit) scopes the workflow.
