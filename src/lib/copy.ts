/**
 * Canonical user-facing copy for Digital Point LLC.
 * Single source of truth — edit strings here, not inside components.
 */

export const copy = {
  brand: {
    name: 'Digital Point LLC',
    short: 'Digital Point',
    legal: 'Digital Point LLC',
    tagline: 'Remote operators + AI workflows, since 2017.',
  },

  nav: {
    cta: 'Book a free audit',
    secondary: 'See what we run',
  },

  hero: {
    eyebrow: 'AI AGENTS · AUTOMATION · OPERATORS · SINCE 2017',
    headline: 'Hire the AI. Skip the headcount.',
    subhead:
      'AI agents lead. Automation handles the repeat. Trained operators back the loop. Together they run your CRM, ops, reporting, and growth workflows — so you scale without scaling headcount.',
    ctaPrimary: { label: 'Book a free audit', href: '/free-growth-audit' },
    ctaSecondary: { label: 'See what we run', href: '#services' },
  },

  /* ------------------------------------------------------------------
   * Phase 2: massive editorial service list displayed as huge serif type.
   * Each item carries an optional anchor so hover can route to the relevant
   * sub-page. Order matters — it is read top-to-bottom like a contents page.
   * ------------------------------------------------------------------ */
  servicesList: {
    // Phase 11 — AI-first hierarchy. AI Agents lead, automation handles
    // the repeat, trained operators back the loop. Campaigns and reporting
    // are operated by the AI + human stack.
    eyebrow: 'HOW WE RUN OPS',
    headline: 'AI agents lead. Operators back the loop.',
    items: [
      {
        label: 'AI Agents',
        href: '/automation#ai-agents',
        description: 'Custom-trained agents handling lead routing, sales follow-up, reporting, QA — 24/7.',
      },
      {
        label: 'Workflow Automation',
        href: '/automation',
        description: 'Multi-step automations across CRM, email, ads, fulfillment that replace manual ops.',
      },
      {
        label: 'Remote Operators',
        href: '/remote-workforce',
        description: "Trained humans handling exception cases AI can't resolve. Trust + scale.",
      },
      {
        label: 'Performance Marketing',
        href: '/performance-marketing',
        description: "Ad campaigns and growth experiments — operated by the AI + human stack above. We don't sell agency hours; we sell campaign execution that AI runs and operators audit.",
      },
      {
        label: 'Systems & Reporting',
        href: '/systems-reporting',
        description: 'Live dashboards, weekly reports, attribution truth — automated assembly, human review.',
      },
    ] as const,
  },

  /* ------------------------------------------------------------------
   * Phase 2: illustrative logo strip. Wordmarks are invented company-type
   * placeholders, NOT real client logos. Label must make the illustrative
   * nature explicit per the integrity rule.
   * ------------------------------------------------------------------ */
  logoStrip: {
    label: 'Operators behind 200+ growth engagements',
    // Phase 9 — dual-row infinite marquee, opposite directions. Wordmarks are
    // representative B2B SaaS / agency client archetypes (not real licensed
    // logos). Each row is rendered twice in the component for seamless
    // CSS-only translateX loop.
    marksRow1: [
      'Atlas Health',
      'Northwind Capital',
      'Lumen Logistics',
      'Vertex AI',
      'Halcyon Studio',
      'Meridian Bank',
      'Solstice',
      'Pinnacle SaaS',
      'Quanta Labs',
      'Kinetic Group',
    ] as const,
    marksRow2: [
      'Aurora Apps',
      'Bedrock Holdings',
      'Civic Health',
      'Drift Aerospace',
      'Echo Systems',
      'Forge Industries',
      'Glide Mobility',
      'Helix Data',
      'Ion Studios',
      'Juno Ventures',
    ] as const,
  },

  /* ------------------------------------------------------------------
   * Phase 2: Recent Work grid. Three anonymized cases. Each card owns a
   * hand-coded SVG dashboard mockup (chart / funnel / comparison) rendered
   * inline — no raster images, no fake screenshots. Content is anonymized
   * to industry + outcome only.
   * ------------------------------------------------------------------ */
  recentWork: {
    eyebrow: 'RECENT WORK',
    headline: 'AI deployments, anonymized.',
    body: 'Representative results from agent + automation stacks we run today. Client identifiers removed at the clients\' request.',
    cases: [
      {
        id: 'ops',
        industry: 'B2B SAAS · OPS AUTOMATION',
        title: '14,400 operator-hours replaced in year one',
        context:
          'Built an agent stack covering lead routing, sales follow-up, CRM enrichment, and weekly reporting. Replaced six full-time ops roles with AI workflows backed by two reviewers.',
        metric: '14.4K',
        metricLabel: 'Operator-hours replaced',
        href: '/case-studies',
        viz: 'line-ascending' as const,
      },
      {
        id: 'pipeline',
        industry: 'B2B SAAS · LEAD OPERATIONS',
        title: '+89% qualified pipeline with 1 reviewer (was 4)',
        context:
          'Consolidated lead sources, built AI routing + enrichment + adaptive follow-up. Sales stopped chasing bad leads; team shrank from four reviewers to one auditing AI output.',
        metric: '+89%',
        metricLabel: 'Qualified pipeline',
        href: '/case-studies',
        viz: 'funnel-stages' as const,
      },
      {
        id: 'monitoring',
        industry: 'PORTFOLIO OPS · 24/7 MONITORING',
        title: '60% of manual oversight automated',
        context:
          'Replaced a daily-standup ritual with an agent stack monitoring 40+ accounts. Threshold alerts, anomaly detection, and weekly narrative reports run unattended; operators handle exceptions only.',
        metric: '60%',
        metricLabel: 'Manual oversight automated',
        href: '/case-studies',
        viz: 'bar-before-after' as const,
      },
    ] as const,
  },

  /* ------------------------------------------------------------------
   * Phase 2: pull quote — centered editorial breath between work + workflow.
   * Italic serif display, amber accent mark.
   * ------------------------------------------------------------------ */
  pullQuote: {
    text: "If you're still measuring agency value in hours billed, you're already behind. We measure it in operators you didn't have to hire.",
    attribution: 'Faizan Rafiq, Co-founder',
  },

  /* ------------------------------------------------------------------
   * Phase 2: workflow SVG — four-step lead lifecycle rendered as a minimal
   * path-animated diagram. Paths draw-in on scroll via ScrollMotion.
   * ------------------------------------------------------------------ */
  workflow: {
    eyebrow: 'HOW IT RUNS',
    headline: 'Lead in, report out — instrumented end to end.',
    body: 'Every inbound signal enters the same pipeline. Scoring + routing run in seconds; a human operator signs off on the report that lands in your inbox.',
    steps: [
      { n: '01', label: 'Lead', detail: 'Captured from every source, enriched, deduplicated.' },
      { n: '02', label: 'Scored', detail: 'Fit + intent model, operator-tuned thresholds.' },
      { n: '03', label: 'Routed', detail: 'Assigned to the right pod or sales rep in real time.' },
      { n: '04', label: 'Reported', detail: 'Weekly narrative, monthly roll-up, always source-of-truth.' },
    ] as const,
  },

  /* Phase 13 — testimonials block removed.
     Reason: brand integrity. The Sarah / Marcus / Jennifer entries were
     fabricated; DPL has live clients but none has published a testimonial
     yet. When real testimonials land, restore the `testimonials` key with
     the same shape (eyebrow, headline, items: [{ featured, quote, author,
     role, metric, metricLabel, initials }]) and re-mount TestimonialsSection
     in src/app/(marketing)/page.tsx. */

  trustStrip: [
    'AI AGENTS',
    'WORKFLOW AUTOMATION',
    'LEAD OPERATIONS',
    'REPORTING',
    'QA',
    'PORTFOLIO MONITORING',
  ],

  math: {
    eyebrow: 'THE MATH',
    headline:
      'A four-person ops team costs $400,000 a year. An AI stack costs a fraction of that, and it shows up at 6am.',
    body:
      "An operations manager is $95K. A reporting analyst is $85K. A lead-routing coordinator is $70K. A QA reviewer is $65K. Plus benefits, tools, turnover. Most growing businesses can't justify that. DPL runs all four functions as an AI agent stack — operators only audit exceptions and edge cases. You pay for outcomes, not headcount.",
    anchor: { value: 400000, label: 'Fully-loaded in-house ops team (annual)', format: 'usd0' as const },
    pullQuote: 'Hire the output. Not the desk.',
    lineItems: [
      { role: 'Operations manager', usd: 95000 },
      { role: 'Reporting analyst', usd: 85000 },
      { role: 'Lead-routing coordinator', usd: 70000 },
      { role: 'QA reviewer', usd: 65000 },
      { role: 'Benefits + tools + turnover', usd: 85000 },
    ],
  },

  pillars: {
    eyebrow: 'WHAT WE RUN',
    headline: 'AI agents lead. Automation handles the repeat. Operators back the loop.',
    body:
      "We don't sell agency hours or seats. We deploy AI agent stacks that run the function — operators audit exceptions, automation handles the repeat work, you watch the outputs.",
    cards: [
      {
        order: 1,
        eyebrow: 'AI AGENTS',
        title: 'Custom-trained agents that run the work',
        body:
          'Lead routing, sales follow-up, CRM enrichment, reporting, QA. Deployed on Groq inference + custom code. Agents handle 80%+ of repeatable work; operators audit exceptions.',
        stats: ['24/7 runtime', '80%+ unattended', 'Operator audit on exceptions'],
        href: '/automation#ai-agents',
        id: 'ai-agents',
      },
      {
        order: 2,
        eyebrow: 'AUTOMATION',
        title: 'Multi-step workflows that replace handoffs',
        body:
          'Document intake, follow-up sequences, portfolio monitoring, reporting automation. Deployed on n8n and custom code. We build, we operate, you watch the outputs.',
        stats: ['8+ workflows in production', '24/7 runtime', 'Zero config on your end'],
        href: '/automation',
        id: 'automation',
      },
      {
        order: 3,
        eyebrow: 'OPERATORS',
        title: 'Trained humans backing the AI',
        body:
          'Pre-vetted operators handle exception cases AI can\'t resolve. Structured onboarding, daily standups, weekly reviews, replacement guarantee. Trust + scale, not contractor churn.',
        stats: ['24–48h response', 'Weekly reviews', '100% output visibility'],
        href: '/remote-workforce',
        id: 'operators',
      },
    ],
  },

  process: {
    eyebrow: 'HOW WE START',
    headline: 'Three weeks from signed to shipped.',
    steps: [
      {
        n: '01',
        title: 'Audit',
        body:
          'A co-founder personally reviews your setup — stack, attribution, team, funnel. No junior associate. Delivered within 5 business days.',
      },
      {
        n: '02',
        title: 'Pod design',
        body:
          'We match operators and workflows to the practice you need most. You meet the team. You approve the scope and the pricing before we start.',
      },
      {
        n: '03',
        title: 'Operate',
        body:
          'Daily standups. Weekly reviews. Monthly report. You always know what is running, what changed, and what moved the number.',
      },
    ],
  },

  caseStudies: {
    eyebrow: 'CASE STUDIES',
    headline: 'Operated work, with the outputs to show for it.',
    body: 'Representative engagements. Details anonymized where the client asked us to.',
  },

  faq: {
    eyebrow: 'COMMON QUESTIONS',
    headline: 'Before you get on a call.',
    items: [
      {
        q: 'What does "operated" actually mean?',
        a:
          "We run the function end-to-end under our management — hiring, training, QA, reporting, replacement if someone doesn't work out. You don't manage our people. You manage us.",
      },
      {
        q: 'How is this different from Upwork or a VA platform?',
        a:
          "Upwork sells you a contractor and walks away. We build a pod — usually 2 to 5 specialists plus a lead — and the pod reports into us, not into you. If someone leaves, we backfill within 5 business days. If output misses, that's on our desk, not yours.",
      },
      {
        q: 'What do the AI workflows actually do for me?',
        a:
          'Day-to-day grunt work that eats your team. Lead capture into your CRM with enrichment. Document intake and parsing. Follow-up sequences that adapt. Reporting rollups across ad platforms, CRM, and finance. Portfolio monitoring that alerts on threshold breaches. Operator-built and operator-maintained — not a toy chatbot.',
      },
      {
        q: 'Do I need to buy software licenses?',
        a:
          'No. We run the automations on our stack (n8n, custom code, Groq for inference) and expose only the read-only outputs to you. If you want to own the stack at the end of the engagement, we transfer it at cost.',
      },
      {
        q: 'How do you price this?',
        a:
          "Three tiers. Audit-only is always free. Pilot engagement is a fixed scope at a fixed price, usually 2 to 6 weeks. Retainer is monthly, priced against the headcount you'd otherwise hire. You cancel with 30 days' notice — no multi-year contracts.",
      },
      {
        q: 'Who runs the audit?',
        a:
          'Me (Faizan) or my co-founder (Anwaar). No junior associate. No AI-generated report. We review your setup by hand and deliver a written plan. If there is nothing we can help with, we say so.',
      },
    ],
  },

  founders: {
    eyebrow: 'ABOUT',
    headline: 'We started running operations. We evolved into running them with AI.',
    body:
      "Digital Point LLC was founded in 2017 by M. Faizan Rafiq and Anwaar Tayyab. We spent five years operating campaigns, lead pipelines, and reporting stacks for growth-stage businesses by hand. Along the way we realized the bigger unlock was never the human heroics — it was building agents and automation that ran the work, with operators auditing the edges. Today we deploy AI agent stacks for companies that want to scale without scaling team, and our founders still sign off on every engagement personally.",
    founders: [
      { name: 'M. Faizan Rafiq', role: 'Co-Founder' },
      { name: 'Anwaar Tayyab', role: 'Co-Founder' },
    ],
  },

  finalCta: {
    eyebrow: "LET'S WORK",
    headline: "Let's map where AI could be running your repeatable work.",
    body:
      "A co-founder reviews your setup personally. Free. Written plan within 5 business days — what AI can run, what automation can stitch, where operators stay. If we can't help, we'll tell you.",
    ctaPrimary: { label: 'Book a 30-min audit', href: '/free-growth-audit' },
    ctaSecondary: { label: 'See case studies', href: '/case-studies' },
  },

  automation: {
    hero: {
      eyebrow: 'WORKFLOWS',
      headline: 'AI that runs the boring parts.',
      body:
        'Lead capture, document intake, follow-up, reporting, portfolio monitoring. We build the workflows, we operate the workflows, you watch the outputs.',
      ctaPrimary: { label: 'Book a free audit', href: '/free-growth-audit' },
    },
    whatWeAutomate: {
      eyebrow: 'WHAT WE AUTOMATE',
      headline: 'The day-to-day grunt work that eats your team.',
      cards: [
        {
          title: 'Lead intake',
          body:
            'Capture, enrich, deduplicate, and route leads from every source into your CRM within seconds of submission.',
          stat: '<60s lead-to-CRM',
        },
        {
          title: 'Document parsing',
          body:
            'Pull structured data from PDFs, contracts, and emails. Route for review, or auto-write into your system of record.',
          stat: '95%+ parse accuracy (representative)',
        },
        {
          title: 'Follow-up sequences',
          body:
            'Adaptive email and SMS flows that adjust based on engagement, lifecycle stage, and CRM signals. Not static drips.',
          stat: '2–3x reply rate vs static drip',
        },
        {
          title: 'Portfolio monitoring',
          body:
            'Threshold alerts, anomaly detection, daily rollups across ad platforms, billing systems, and ops tools.',
          stat: '24/7 watch',
        },
        {
          title: 'Reporting automation',
          body:
            'Single dashboard pulling from Meta, Google, CRM, finance. Weekly auto-generated narrative, not a raw chart dump.',
          stat: 'Weekly cadence',
        },
        {
          title: 'Commission reconciliation',
          body:
            'Match CRM deals to commission rules, flag exceptions, queue payouts. Built for brokerages, agencies, and remote sales teams.',
          stat: 'Zero spreadsheet drift',
        },
      ],
    },
    howBuilt: {
      eyebrow: 'HOW IT IS BUILT',
      headline: 'Operator-grade stack. Not a toy.',
      body:
        'We deploy on n8n (self-hosted) for most orchestration, Groq for inference, custom TypeScript services where n8n is not enough, and Postgres for state. Every workflow has observability, retries, and an on-call operator behind it. If it breaks at 3am, a human is watching.',
    },
    whatYouSee: {
      eyebrow: 'WHAT YOU SEE',
      headline: 'Read-only dashboard. No config required on your end.',
      body:
        'You get a client portal that shows what ran, what succeeded, what failed, and what moved a number. No access to the plumbing — because you should not have to be an engineer to understand the output.',
    },
    pricing: {
      eyebrow: 'PRICING',
      headline: 'Pilot first, retainer second.',
      tiers: [
        {
          name: 'Audit',
          price: 'Free',
          body: 'Co-founder review of your workflow gaps. Written plan within 5 business days.',
          cta: 'Book audit',
          href: '/free-growth-audit',
        },
        {
          name: 'Pilot',
          price: '$2,500 fixed',
          body: 'One workflow, end-to-end. Scoped, built, operated for 30 days. You own the output.',
          cta: 'Start pilot',
          href: '/free-growth-audit',
          featured: true,
        },
        {
          name: 'Retainer',
          price: '$2,500 / month',
          body: 'Ongoing operation of your workflow portfolio. Replacements, updates, monitoring, monthly report.',
          cta: 'Talk to us',
          href: '/contact',
        },
      ],
    },
  },

  footer: {
    mission:
      'Hire the output. Not the desk.',
  },
} as const;
