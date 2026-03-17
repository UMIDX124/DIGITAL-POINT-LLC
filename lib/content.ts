export const siteConfig = {
  name: "DigitalPoint LLC",
  description:
    "DigitalPoint LLC is a B2B growth systems and marketing automation agency that helps companies improve revenue operations, execution support, and reporting clarity without operational drag.",
  siteUrl: "https://digitalpointllc.com",
  ogImage: "/opengraph-image",
  primaryCtaHref: "#strategy-call-form",
  bookingEmailHref: "mailto:digitalpointllc1122@gmail.com?subject=Strategy%20Call%20Request",
  email: "digitalpointllc1122@gmail.com",
  formApiPath: "/api/free-growth-audit",
  formSubmitAction: "https://formsubmit.co/ajax/digitalpointllc1122@gmail.com",
};

export const navigation = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#case-studies" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

export const trustBarItems = [
  "Growth systems design",
  "Revenue reporting clarity",
  "Execution support built into delivery",
  "Automation where it removes real friction",
  "Weekly KPI accountability",
] as const;

export const heroSignals = [
  {
    title: "Growth systems",
    description: "Reporting, workflows, and automation built so leadership can see performance and act faster.",
  },
  {
    title: "Revenue marketing",
    description: "Campaigns, funnels, and reporting tied to qualified pipeline instead of vanity metrics.",
  },
  {
    title: "Remote execution",
    description: "Reliable implementation support that keeps priorities moving without pulling the founder back in.",
  },
];

export const painPoints = [
  {
    title: "Revenue growth is not predictable",
    description:
      "Marketing is active, but pipeline quality, conversion rates, and follow-up performance change month to month with no stable operating rhythm.",
  },
  {
    title: "Execution depends on too many handoffs",
    description:
      "Leaders are still coordinating freelancers, internal teams, and tools by hand instead of running one system with clear ownership.",
  },
  {
    title: "Automation is underbuilt",
    description:
      "Too much work still runs through spreadsheets, inboxes, and manual reporting, which slows response time and hides bottlenecks.",
  },
  {
    title: "Founders still carry the execution load",
    description:
      "The business may be growing, but leadership is still too involved in delivery, reporting, and follow-through for scale to feel dependable.",
  },
];

export const services = [
  {
    title: "Growth Systems",
    description:
      "We build the reporting and operating layer that gives your team clearer numbers, cleaner handoffs, and fewer manual gaps.",
    bullets: ["KPI dashboards and scorecards", "CRM flow and lead routing", "Automation, SOPs, and weekly operating cadence"],
  },
  {
    title: "Revenue Marketing",
    description:
      "We improve the path from traffic to qualified pipeline with sharper messaging, stronger conversion points, and better reporting.",
    bullets: ["Paid and lifecycle strategy", "Landing pages and funnel optimization", "Attribution and pipeline reporting"],
  },
  {
    title: "Remote Execution",
    description:
      "We add structured execution support so campaigns, systems, reporting, and follow-through keep moving without founder dependency.",
    bullets: ["Remote support pods and coordination", "Weekly delivery accountability", "Execution across ops and marketing"],
  },
];

export const trustStats = [
  {
    value: 3,
    suffix: " core pillars",
    label: "under one operating model",
    description: "Systems, marketing, and execution aligned in one engagement instead of split across multiple vendors.",
  },
  {
    value: 1,
    suffix: " weekly cadence",
    label: "for visibility and follow-through",
    description: "A clear reporting rhythm that keeps priorities visible and follow-through measurable.",
  },
  {
    value: 90,
    suffix: " day roadmap",
    label: "to build the next scaling layer",
    description: "Clear priorities for what to fix, build, automate, and execute first.",
  },
];

// Legacy section compatibility exports
export const stats = trustStats;
export const solutionPillars = services;

export const industries = [
  "SaaS",
  "Professional Services",
  "Healthcare",
  "eCommerce",
  "Home Services",
  "Growth-Stage Operators",
];

export const caseStudies = [
  {
    title: "B2B service operator",
    category: "Growth systems + execution",
    summary:
      "Rebuilt reporting, handoff workflow, and weekly delivery routines so leadership could manage pipeline and execution from one view.",
    outcomes: ["42% increase in qualified pipeline", "31% faster lead response", "Weekly operator scorecard adopted company-wide"],
  },
  {
    title: "Founder-led B2B SaaS company",
    category: "Revenue marketing + remote execution",
    summary:
      "Combined campaign execution, CRM cleanup, and remote support to take day-to-day revenue operations off the founder's desk.",
    outcomes: ["27% lift in demo-to-opportunity rate", "22% lower acquisition waste", "Shared weekly scorecard across revenue teams"],
  },
  {
    title: "Growth-stage eCommerce team",
    category: "Automation + remote support",
    summary:
      "Built a remote support pod and automated operating flow so launches, customer operations, and reporting could scale together.",
    outcomes: ["2.4x faster launch velocity", "Backlog cleared in under 3 weeks", "Support workflows standardized across the team"],
  },
];

export const testimonials = [
  {
    quote:
      "DigitalPoint gave us one operating system instead of disconnected freelancers and tools. We finally had visibility, rhythm, and execution leadership could trust.",
    name: "COO",
    company: "Regional B2B services group",
  },
  {
    quote:
      "They did more than improve marketing. They fixed the reporting and execution layer that was making growth harder to manage behind the scenes.",
    name: "Founder",
    company: "Growth-stage SaaS company",
  },
  {
    quote:
      "The strategy call turned into a real operating plan. Within weeks, we had clearer reporting, better delegation, and stronger weekly momentum.",
    name: "Managing Partner",
    company: "Professional services firm",
  },
];

export const founderProfile = {
  eyebrow: "Founder-led partnership",
  title: "You work directly with the person shaping the strategy, priorities, and operating model.",
  description:
    "DigitalPoint stays founder-led so strategy does not get diluted between sales, account management, and delivery. You get direct thinking on what to fix first, what to automate, and what the team needs to execute next.",
  highlights: [
    "Direct strategic guidance from discovery through implementation",
    "Systems and execution decisions built for B2B operators",
    "Recommendations tied to pipeline, delivery, and team capacity",
  ],
  proofPoints: [
    "Founder stays close to discovery, system design, and priorities",
    "No handoff from sales deck to junior account layer",
    "Recommendations shaped around operational reality, not generic retainers",
  ],
};

export const processSteps = [
  {
    title: "Audit the growth engine",
    description:
      "We review goals, funnel health, team capacity, systems, and delivery friction to identify the biggest leverage points.",
  },
  {
    title: "Design the operating plan",
    description:
      "You get a clear roadmap covering priorities, roles, reporting, automations, and what needs to be built first.",
  },
  {
    title: "Deploy execution support",
    description:
      "We help implement the systems, remote support, campaigns, and operational structure required to move quickly.",
  },
  {
    title: "Optimize and scale",
    description:
      "Through a steady KPI rhythm, we improve performance, remove bottlenecks, and keep the business scaling with control.",
  },
];

export const benefits = [
  "Scale faster without bloating overhead",
  "Replace fragmented execution with one coordinated system",
  "Improve speed from strategy to delivery",
  "Gain clarity into pipeline, performance, and operational priorities",
  "Access expert remote support without building everything in-house",
  "Create durable systems that continue compounding as the business grows",
];

export const faqItems = [
  {
    question: "Who is this best for?",
    answer:
      "DigitalPoint is best for B2B founders, operators, and service-led teams that need clearer reporting, stronger execution, and a more reliable growth operating model.",
  },
  {
    question: "Do you only do marketing?",
    answer:
      "No. Marketing is one pillar, but the work also covers systems, automation, and execution support so revenue growth is easier to manage and sustain.",
  },
  {
    question: "What happens on the strategy call?",
    answer:
      "We review your current bottlenecks across pipeline, reporting, systems, and team execution so the next practical move is clear.",
  },
  {
    question: "Can you help with implementation too?",
    answer:
      "Yes. The work is designed to move beyond advice into implementation support across systems, marketing, reporting, and remote delivery.",
  },
];

export const siteSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    email: siteConfig.email,
    logo: `${siteConfig.siteUrl}/digitalpoint-logo.png`,
    areaServed: "Worldwide",
    knowsAbout: [
      "Marketing automation",
      "Revenue operations",
      "Growth systems",
      "B2B growth strategy",
      "Remote execution support",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "B2B Growth Systems and Marketing Automation Agency",
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    about: [
      "Growth systems",
      "Marketing automation",
      "Revenue operations",
      "B2B growth agency",
      "Remote execution support",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Growth systems, marketing automation, revenue operations, and remote execution support",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: "Worldwide",
    description: siteConfig.description,
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Core service pillars",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      description: service.description,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  },
];
