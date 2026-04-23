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
    ctaSecondary: { label: 'See what we run', href: '#pillars' },
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
    headline: 'Book a 30-minute audit. Get a written plan.',
    body:
      "Free. A co-founder reviews your setup personally. If we can't help, we'll tell you — and usually point you to someone who can.",
    ctaPrimary: { label: 'Book a free audit', href: '/free-growth-audit' },
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
