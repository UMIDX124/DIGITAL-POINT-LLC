---
title: "n8n vs Lindy vs custom code: which AI agent stack should you actually pick"
excerpt: "An operator-level breakdown of the three real choices for shipping AI agents in 2026 — n8n self-hosted, a Lindy/Relevance/Stack platform, or custom TypeScript — with the cost curve, tradeoffs, and the decision rule we use on real engagements."
date: "2026-05-12"
lastModified: "2026-05-12"
author: "Digital Point LLC"
category: "Workflow Automation"
tags:
  - n8n
  - Lindy
  - Relevance AI
  - Stack AI
  - AI agent platform comparison
  - workflow automation
indexable: true
faqs:
  - question: "Should I use n8n self-hosted or n8n Cloud?"
    answer: "Self-host on a $20/month VM if you have anyone who can run a Linux service. The cost curve stays flat as workflow volume grows, your data does not leave your infrastructure, and the AI agent nodes are the deepest of the three major orchestration platforms. Use n8n Cloud only if compliance forbids self-hosting or if your team has zero infrastructure ownership."
  - question: "Is Lindy a competitor or a complement to a DPL engagement?"
    answer: "Lindy is a complement for a narrow slice of use cases (inbox, calendar, meeting follow-up). For anything that touches your CRM, billing, document parsing, or multi-step business workflows, it's a starting point that hits a ceiling fast. We have clients who use Lindy for the personal-assistant layer alongside a DPL-operated stack on the production-workflow layer."
  - question: "When does custom code actually beat both n8n and Lindy?"
    answer: "When the workflow needs sub-second latency, custom retry semantics, deep integration with internal services, or compliance posture that platform-hosted runners cannot offer. Roughly 15-20% of our deployments end up custom TypeScript on Vercel Functions or a self-hosted service. The other 80% is faster and cheaper to ship on n8n with a thin custom-code layer for the irregular bits."
---

The agency market produces a lot of "n8n vs Zapier vs Make" comparisons. They miss the real decision in 2026 because the relevant comparison is no longer between automation platforms. It is between three fundamentally different ways to ship an AI agent.

The three options are: open-source self-hosted orchestration (n8n is the dominant choice), commercial agent platforms (Lindy, Relevance AI, Stack AI, Beam), and custom code. Every production agent we have ever shipped at DPL falls into one of these three buckets, often combining two. Here is how to pick.

## The three options, named correctly

### Option 1: n8n self-hosted

n8n raised [$55M Series B in 2024](https://www.lindy.ai/blog/relevanceai-vs-n8n) and has since added a native AI Agent Tool Node, LangChain integration, support for self-hosted LLMs, and a managed cloud service for teams that do not want to run their own infrastructure. As of mid-2026 it is the default choice for technical automation agencies, including ours.

The headline feature for production work is data sovereignty: self-hosted n8n means your CRM data, customer records, and prompt content never leave your infrastructure. For healthcare, finance, legal, and EU-based GDPR-regulated businesses, this is the only orchestration option that clears the compliance bar without enterprise pricing.

The cost curve is the second headline feature. At moderate volume (10-50 workflow runs per minute), [Zapier is roughly 50× more expensive than self-hosted n8n](https://zapier.com/blog/n8n-vs-make/) and Make sits at 6-10× n8n. Multiplied across the 10-15 production workflows a mid-market company tends to run, the annual cost delta is the price of a junior hire.

### Option 2: A commercial agent platform

Lindy, Relevance AI, Stack AI, and Beam AI are the four most-discussed platforms in 2026. They serve different segments.

**Lindy** ($49.99/month entry, custom for enterprise) is the easiest to start with and the broadest in scope. It positions as a "personal AI work assistant" — inbox, meetings, calendar, follow-ups, ad hoc tool use. The deployment model is fully no-code. It is great for solo founders and small teams who need an AI layer on their personal workflows. It hits a ceiling fast on multi-step business workflows that touch your CRM at scale.

**Relevance AI** is closest in positioning to DPL — its hero copy is literally "Scale GTM results, without scaling headcount", which is almost identical to ours. The difference is they are a self-serve platform; you log in and configure agents yourself. The deployment is faster than custom code but locks you into their platform pricing as volume grows.

**Stack AI** targets regulated enterprises — finance, healthcare, legal, operations — with SOC 2 Type II, ISO 27001, HIPAA, and GDPR compliance baked in. Pricing is custom. If you are buying for a Fortune 500, this is on your shortlist. If you are a $1M-$50M ARR mid-market company, it is overkill and overpriced.

**Beam AI** anchors on "your 200-page SOP becomes a working agent" and serves Fortune 500 BPO, HR, banking, and insurance operations. Custom pricing, value-based. Strong if your problem is replacing a documented manual process; less applicable if you are inventing the workflow.

### Option 3: Custom code

Direct TypeScript or Python on top of the model SDKs (Anthropic, OpenAI, Groq), with PostgreSQL for state, hosted on Vercel Functions or a dedicated VM. This is what you fall back to when n8n cannot do something, or when sub-second latency, custom retry semantics, or compliance posture demand it.

Custom code is also where some agencies hide behind a "we built it from scratch" story when n8n + thin custom wrappers would have shipped the same workflow in a fifth of the time. Be skeptical of agency engagements that lead with "custom build" before validating that an off-the-shelf orchestrator cannot do it.

## The decision rule

We pick using three questions, in order:

**Question 1: Does the workflow need to run inside the client's infrastructure for compliance reasons?**

If yes, eliminate Lindy, Relevance, and Beam from consideration. Stack AI is the only platform with full on-prem and VPC deployment options. n8n self-hosted is the other option. Custom code on a self-hosted runner is the third.

If no, all options remain on the table.

**Question 2: Is this workflow one a solo user runs against their own tools, or a business workflow operating across multiple users' data?**

Solo-user workflows (a founder's inbox, a sales rep's calendar): Lindy or a custom AI assistant. The Relevance AI / Stack AI / n8n stack is overkill for personal productivity.

Business workflows (lead routing across the company's CRM, document parsing for the ops team, agent-driven reporting for the leadership team): n8n or custom code. Platforms position toward solo-user use cases and hit their natural ceiling in business-workflow scope.

**Question 3: How weird is the workflow?**

If it is a standard pattern with prebuilt nodes (Slack → Salesforce → Email, or Webhook → LLM → CRM update), n8n ships it in days. Pick n8n.

If it has unusual latency requirements, custom retry semantics, deep integration with an internal service, or a step that demands code you would not write in a no-code builder, mix n8n for the orchestration and custom TypeScript for the irregular bits. 15-20% of our production stacks end up here.

If the workflow is so unusual that 70%+ of the steps are custom code, skip the orchestrator entirely and write the whole thing as TypeScript. This is rare. We have shipped maybe four engagements in three years that justified going fully custom.

## What we run at DPL

Our default production stack is n8n self-hosted on a dedicated VM, Groq and Anthropic for inference, PostgreSQL for state, TypeScript custom services for the irregular steps, Vercel for hosted surfaces, Slack Connect for the live observability channel, and BotID for endpoint defense. [Our full stack page](/stack) documents every layer in detail.

We choose this stack because it clears all five compliance bars (data sovereignty, audit logs, retention, DPA, secret rotation), because the cost curve stays flat as we ship more workflows, and because the AI agent nodes in n8n are deep enough that we rarely need to drop down to raw TypeScript.

If you are deciding what to ship next on your stack, the fastest way to get our actual recommendation is to [run a free 45-minute audit](/audit) with a co-founder. We tell you which of the three options fits your specific workflow, and which platform we would pick if you were going to operate it without us.

If you already shipped an agent on one of these stacks and it has started breaking in production, [the recovery service](/recovery) handles diagnosis at $5,000 fixed in 2 weeks, fix at $10,000 fixed in 4 weeks, and operates the recovered stack from there.
