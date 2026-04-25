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
    eyebrow: 'REMOTE OPERATORS · AI WORKFLOWS · SINCE 2017',
    headline: 'Growth without the payroll.',
    subhead:
      "We deploy trained operators and AI workflows that run your marketing, your back-office, and your reporting — so you don't hire a full department to scale one. One team. Three practices. Measurable outcomes.",
    ctaPrimary: { label: 'Book a free audit', href: '/free-growth-audit' },
    ctaSecondary: { label: 'See what we run', href: '#services' },
  },

  /* ------------------------------------------------------------------
   * Phase 2: massive editorial service list displayed as huge serif type.
   * Each item carries an optional anchor so hover can route to the relevant
   * sub-page. Order matters — it is read top-to-bottom like a contents page.
   * ------------------------------------------------------------------ */
  servicesList: {
    eyebrow: 'WHAT WE OPERATE',
    headline: 'Five practices under one operating system.',
    items: [
      { label: 'Performance Marketing', href: '/performance-marketing' },
      { label: 'Remote Workforce', href: '/remote-workforce' },
      { label: 'Automation', href: '/automation' },
      { label: 'Systems & Reporting', href: '/systems-reporting' },
      { label: 'Post-Launch Monitoring', href: '/automation#monitoring' },
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
    // Backward-compat alias — kept until any downstream consumer is verified
    // to use the new dual-row arrays. Same content as marksRow1.
    marks: [
      'Atlas Health',
      'Northwind Capital',
      'Lumen Logistics',
      'Vertex AI',
      'Halcyon Studio',
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
    headline: 'Operated engagements, anonymized.',
    body: 'Representative results from pods we run today. Client identifiers removed at the clients\' request.',
    cases: [
      {
        id: 'ecom',
        industry: 'E-COMMERCE · PAID ACQUISITION',
        title: '6.8x blended ROAS across 14 markets',
        context:
          'Rebuilt creative testing, consolidated attribution, re-scoped the media mix. Spend rose from $180K to $640K a month without CAC drift.',
        metric: '6.8x',
        metricLabel: 'Blended ROAS',
        href: '/case-studies',
        viz: 'line-ascending' as const,
      },
      {
        id: 'saas',
        industry: 'B2B SAAS · LEAD OPERATIONS',
        title: '+89% qualified pipeline in 90 days',
        context:
          'Consolidated lead sources, built routing + enrichment, deployed an adaptive follow-up sequence. Sales stopped chasing bad leads.',
        metric: '+89%',
        metricLabel: 'Qualified pipeline',
        href: '/case-studies',
        viz: 'funnel-stages' as const,
      },
      {
        id: 'leadgen',
        industry: 'LEAD GEN · AGENCY DESK',
        title: '5.3x CPL reduction in two markets',
        context:
          'Killed 60% of underperforming campaigns, rebuilt landing pages against real search intent, tuned creative cadence. CPL fell from $84 to $16.',
        metric: '5.3x',
        metricLabel: 'CPL reduction',
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
    text: 'Every dollar you spend on marketing should be accountable.',
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

  /* ------------------------------------------------------------------
   * Phase 2: testimonials — same names as legacy (Sarah / Marcus / Jennifer)
   * but new layout + no stock photos. Amber initial avatars, varied card
   * sizes (one featured + two standard).
   * ------------------------------------------------------------------ */
  testimonials: {
    eyebrow: 'OPERATORS WE RUN FOR',
    headline: 'What clarity looks like.',
    items: [
      {
        featured: true,
        quote:
          'They built the tracking we had been avoiding for two years. Now I actually know where to spend, and the meeting where we justify the number is fifteen minutes long.',
        author: 'Sarah Chen',
        role: 'CEO, B2B SaaS',
        metric: '+127%',
        metricLabel: 'MRR in 6 months',
        initials: 'SC',
      },
      {
        featured: false,
        quote:
          'Got execution capacity without the hiring headaches. They own outcomes, not just tasks.',
        author: 'Marcus Thompson',
        role: 'Founder, E-commerce',
        metric: '3.1x',
        metricLabel: 'ROAS',
        initials: 'MT',
      },
      {
        featured: false,
        quote:
          'We went from no idea where leads come from to full attribution in three weeks.',
        author: 'Jennifer Walsh',
        role: 'CMO, Agency',
        metric: '-41%',
        metricLabel: 'CAC',
        initials: 'JW',
      },
    ] as const,
  },

  trustStrip: [
    'MEDIA BUYING',
    'LEAD OPERATIONS',
    'AUTOMATION',
    'REPORTING',
    'QA',
    'PORTFOLIO MONITORING',
  ],

  math: {
    eyebrow: 'THE MATH',
    headline:
      'An in-house team costs $400,000 a year. We cost a fraction of that, and we actually show up on Monday.',
    body:
      "A senior media buyer is $120K. An operations manager is $95K. A reporting analyst is $85K. Plus benefits, tools, turnover. Most growing businesses can't justify that. DPL runs all three functions as an operated service — pod-based humans, AI workflows behind them, transparent reporting on top. You pay for outcomes, not headcount.",
    anchor: { value: 400000, label: 'Fully-loaded in-house team (annual)', format: 'usd0' as const },
    pullQuote: 'Hire the output. Not the desk.',
    lineItems: [
      { role: 'Senior media buyer', usd: 120000 },
      { role: 'Operations manager', usd: 95000 },
      { role: 'Reporting analyst', usd: 85000 },
      { role: 'Benefits + tools + turnover', usd: 100000 },
    ],
  },

  pillars: {
    eyebrow: 'WHAT WE RUN',
    headline: 'One team. Three practices. Operated as a service.',
    body:
      "We don't sell seats and templates. We run the function — daily standups, weekly reviews, monthly reporting. You watch the outputs.",
    cards: [
      {
        order: 1,
        eyebrow: 'OPERATORS',
        title: 'Teams you trust without hiring',
        body:
          'Pre-vetted pods of media buyers, VAs, SDRs, and analysts. Structured onboarding, daily standups, weekly reviews, replacement guarantee.',
        stats: ['24–48h response', 'Weekly reviews', '100% output visibility'],
        href: '/remote-workforce',
        id: 'workforce',
      },
      {
        order: 2,
        eyebrow: 'WORKFLOWS',
        title: 'AI that runs the boring parts',
        body:
          'Lead capture, document intake, follow-up sequences, portfolio monitoring, reporting automation. Deployed on n8n and custom code. We operate the automations — you watch the outputs.',
        stats: ['8+ workflows in production', '24/7 runtime', 'Zero config on your end'],
        href: '/automation',
        id: 'automation',
      },
      {
        order: 3,
        eyebrow: 'CAMPAIGNS',
        title: 'Paid acquisition, tracked properly',
        body:
          "Meta, Google, YouTube. We run media only after attribution is solid — so we know what's actually working.",
        stats: ['$50M+ managed (representative)', '200+ audits', 'Avg 4.2x ROAS (representative)'],
        href: '/performance-marketing',
        id: 'marketing',
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
    headline: 'We started as a marketing firm. We evolved into an operated team.',
    body:
      "Digital Point LLC was founded in 2017 by M. Faizan Rafiq and Anwaar Tayyab. We started buying media for growth-stage businesses. Along the way we realized the bigger unlock was never the campaign — it was the team and the system behind the campaign. Today we operate three practices under one roof, and our founders still sign off on every engagement personally.",
    founders: [
      { name: 'M. Faizan Rafiq', role: 'Co-Founder' },
      { name: 'Anwaar Tayyab', role: 'Co-Founder' },
    ],
  },

  finalCta: {
    eyebrow: "LET'S WORK",
    headline: "Let's find what's draining your budget.",
    body:
      "A co-founder reviews your setup personally. Free. Written plan within 5 business days. If we can't help, we'll tell you — and usually point you to someone who can.",
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
