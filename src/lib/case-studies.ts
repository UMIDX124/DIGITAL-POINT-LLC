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
 behindTheScenes: 'Faizan rebuilds account structure end-to-end when he sees broad-targeting waste past $50K/month spend. The pattern repeats across e-commerce DTC accounts: declining ROAS while spend climbs, attribution mostly last-click, lookalikes seeded from order data instead of high-LTV cohorts. A founder watching new numbers land on Monday morning signals the restructure is taking hold.',
 },
 {
 slug: 'b2b-saas-attribution',
 title: 'B2B SaaS Company',
 industry: 'B2B SaaS',
 problem:
 "Can't prove which marketing channels drive pipeline",
 strategy:
 'Implemented multi-touch attribution with CRM integration, built custom dashboards connecting ad spend to closed revenue',
 results: [
 { label: 'Pipeline', value: '+89%' },
 { label: 'CAC', value: '-41%' },
 { label: 'Attribution', value: 'Full-funnel visibility' },
 ],
 highlightMetric: '+89%',
 highlightLabel: 'Pipeline',
 behindTheScenes: 'Anwaar runs attribution rebuilds for B2B SaaS accounts where pipeline data lives in 5+ tools without integration. The board-explanation moment from a CMO marks the deployment as sticking. If she can defend marketing\'s revenue impact 90 days in without engineering\'s help, the system is doing its job.',
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
 behindTheScenes: 'Faizan takes on lead-gen accounts with 200+ ad groups and no structure only when the operating team shows pattern recognition. The restructure-from-zero approach runs about two weeks. The signal that the work is landing is the operating team starting to ask why nobody fixed the structure sooner.',
 },
];
