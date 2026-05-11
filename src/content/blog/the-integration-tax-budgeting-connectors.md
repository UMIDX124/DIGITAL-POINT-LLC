---
title: "The integration tax: budgeting for connectors when you adopt AI automation"
excerpt: "20% to 40% of any AI agent engagement is connector work. CRM, helpdesk, billing, identity, document storage. The integration tax is real, predictable, and often missing from agency proposals."
date: "2026-05-12"
lastModified: "2026-05-12"
author: "Digital Point LLC"
category: "Pricing Transparency"
tags:
  - integration cost
  - connector budgeting
  - CRM integration
indexable: true
---

Industry buyer guides put it consistently at 20-40%. A connector to your CRM. A connector to your helpdesk. A connector to your billing system. Auth flow into your identity provider. Webhook handlers for your document storage. The agent does not do work in isolation; it does work that touches every tool your team already runs. The integration tax is the line item most agency proposals understate. This post breaks down what it actually costs and how to scope it.

## What the integration tax covers

Five categories account for ~90% of integration cost.

1. CRM read/write. Your agent needs to query the CRM for context (account history, ownership, tags) and write back decisions (status updates, scores, activity logs). Standard CRMs (Salesforce, HubSpot, Pipedrive) have well-documented APIs but require auth setup, field mapping, and quota management. Effort: 4-12 engineering hours per workflow.

2. Helpdesk integration. If the agent touches support tickets (read, classify, route, draft responses), you need to integrate with Zendesk, Intercom, Freshdesk, or whatever platform handles your queue. Same shape as CRM integration. Effort: 4-10 hours per workflow.

3. Billing / payment data. For pricing decisions, churn prediction, or contract automation, the agent needs read access to billing (Stripe, Chargebee, custom ERP). Read-only is usually fine; write access is rare for safety reasons. Effort: 2-6 hours per workflow.

4. Identity + auth. If the agent's outputs route to specific humans, you need to know who those humans are. Integration with your IdP (Okta, Auth0, Azure AD, Google Workspace) for user resolution + permission scoping. Effort: 4-8 hours, mostly one-time across all workflows.

5. Document storage / shared drives. Document parsing, contract review, and statement extraction workflows need to read from Google Drive, Dropbox, S3, or whatever the team uses. Effort: 2-6 hours per workflow.

## Why proposals understate it

Three reasons agencies routinely under-budget integration:

The pitch is about the AI agent. The agent is the visible value prop. The connector layer is plumbing. Salespeople emphasize the visible part to keep the proposal lean.

Connectors are often "almost done." Most platforms have prebuilt integrations in n8n, Make, or Zapier. The salesperson sees the prebuilt connector and assumes integration is a checkbox click. The actual work is field mapping, edge case handling, retry logic, and conflict resolution between the connector's defaults and your specific schema.

Auth flows are deceptive. OAuth looks simple in documentation. In practice, configuring scopes correctly, handling token refresh, and routing through your IdP if you use one can take 3-5x the documented setup time on day one of an engagement.

## What 20-40% actually looks like on a real budget

For a $2,500 DPL pilot scoping one workflow that touches 2 systems (typical):

- Workflow build + agent prompt tuning: ~60%
- Connector setup for system 1: ~15%
- Connector setup for system 2: ~15%
- End-to-end testing + handover: ~10%

Connectors are 30% of the pilot. If the pilot touches 3-4 systems, connector share rises to 40-50%.

For a $5,000 multi-step workflow (more common in the build engagement):

- Agent prompt + orchestration logic: ~40%
- 3 connectors: ~35%
- Operator escalation queue + dashboard: ~15%
- Testing + handover: ~10%

## What to ask any agency before signing

Three questions:

1. How many distinct systems will the workflow touch? Get a list. If it is more than 3, expect connector cost to dominate.

2. Are any of those systems custom-built or legacy? Custom systems lack prebuilt connectors. You are paying for someone to write a new integration. This adds 8-30 hours of engineering work.

3. What is the auth flow? OAuth, API key, SSO, SAML. Each has different setup time. SAML in particular eats 4-12 hours that does not show on the workflow itself.

If the proposal does not name the systems and the auth flow, the connector budget is implicit and probably understated.

## The hidden recurring cost

Integration is not just a one-time cost. APIs change. Vendor schemas drift. New required fields get added without notice. A workflow shipped against a schema in March can break in October because the vendor renamed a field.

Ongoing connector maintenance: 1-3 hours per workflow per month for typical workflows, embedded in a retainer. Without a retainer, expect to budget the same time internally.

## The DPL approach

Our pilot and retainer pricing absorb the connector layer. When we quote $2,500 fixed for a pilot, that includes the 2-3 connectors typical for one workflow. We do not charge separately for OAuth setup, field mapping, or schema drift handling. If a pilot scope grows past 4 system integrations, we quote the additional connectors in writing before any work happens.

This is rare in the agency market. Most published rate cards exclude integration and quote it on an hourly add-on basis. We treat it as core to the workflow because we operate the workflow afterward, and a broken connector is our problem to fix, not yours.

## The takeaway

When someone quotes you a workflow cost, ask what the connector layer is. If they cannot name it, the proposal is incomplete. [Our pricing page](/pricing) is built around fixed-fee pilots that include connectors; [a free audit](/audit) names the specific systems and scopes accordingly.
