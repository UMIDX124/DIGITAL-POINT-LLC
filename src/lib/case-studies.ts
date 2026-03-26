export interface CaseStudyResult {
  label: string;
  value: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  problem: string;
  strategy: string;
  results: CaseStudyResult[];
  highlightMetric: string;
  highlightLabel: string;
  behindTheScenes: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ecommerce-facebook-ads-scaling',
    title: 'E-commerce Brand',
    industry: 'E-commerce / DTC',
    problem:
      'Scaling Facebook Ads past $50K/month with declining ROAS',
    strategy:
      'Rebuilt campaign architecture with proper attribution, lookalike audiences from CRM data, and creative testing framework',
    results: [
      { label: 'ROAS', value: '4.2x \u2192 6.8x' },
      { label: 'CAC', value: '-34%' },
      { label: 'Revenue', value: '+127% in 6 months' },
    ],
    highlightMetric: '6.8x',
    highlightLabel: 'ROAS',
    behindTheScenes: 'Faizan personally rebuilt this account\'s campaign structure over a weekend because he couldn\'t sleep knowing how much budget was being wasted on broad targeting. The client\'s founder called us on Monday morning wondering if the dashboard was broken — the numbers looked "too good." They weren\'t.',
  },
  {
    slug: 'b2b-saas-attribution',
    title: 'B2B SaaS Company',
    industry: 'B2B SaaS',
    problem:
      "Can't prove which marketing channels actually drive pipeline",
    strategy:
      'Implemented multi-touch attribution with CRM integration, built custom dashboards connecting ad spend to closed revenue',
    results: [
      { label: 'Pipeline', value: '+89%' },
      { label: 'CAC', value: '-41%' },
      { label: 'Attribution', value: 'Full-funnel visibility' },
    ],
    highlightMetric: '+89%',
    highlightLabel: 'Pipeline',
    behindTheScenes: 'This one was Anwaar\'s baby. The client had data in seven different tools that didn\'t talk to each other. He spent three weeks untangling their attribution mess and building a single source of truth. The CMO told us it was the first time in two years she could actually explain marketing\'s impact to the board.',
  },
  {
    slug: 'lead-gen-google-ads',
    title: 'Lead Generation Agency',
    industry: 'Lead Generation',
    problem:
      'Google Ads account bleeding money with 1.8x ROAS',
    strategy:
      'Audited account structure, rebuilt campaigns around profit-based bidding, optimized landing pages',
    results: [
      { label: 'ROAS', value: '1.8x \u2192 5.3x' },
      { label: 'CPL', value: '-52%' },
      { label: 'Conversions', value: '+210%' },
    ],
    highlightMetric: '5.3x',
    highlightLabel: 'ROAS',
    behindTheScenes: 'The first audit call was rough — the account had 200+ ad groups with no clear structure. We almost said no. But the team behind the business was genuinely great, just stuck with bad account management. Faizan restructured everything from scratch, and within two weeks the client asked, "Why didn\'t our last agency do this?" Good question.',
  },
];
