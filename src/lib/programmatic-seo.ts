// Programmatic SEO data for Service x Industry and Service x City pages

export interface Service {
  slug: string;
  name: string;
  description: string;
  benefits: string[];
  shortDescription: string;
}

export interface Industry {
  slug: string;
  name: string;
  description: string;
  painPoints: string[];
}

export interface City {
  slug: string;
  name: string;
  state: string;
  description: string;
}

export const services: Service[] = [
  {
    slug: 'google-ads-management',
    name: 'Google Ads Management',
    description:
      'Strategic Google Ads management that maximizes return on ad spend through precise keyword targeting, bid optimization, and conversion-focused campaign architecture.',
    shortDescription: 'Expert Google Ads campaign management and optimization.',
    benefits: [
      'Lower cost per acquisition through continuous bid optimization',
      'Higher quality scores that reduce CPC and improve ad placement',
      'Granular keyword targeting that captures high-intent search traffic',
      'Conversion tracking and attribution for complete performance visibility',
      'Shopping, search, display, and YouTube campaign management under one roof',
    ],
  },
  {
    slug: 'facebook-ads-management',
    name: 'Facebook Ads Management',
    description:
      'Full-funnel Facebook and Instagram advertising that drives qualified traffic through advanced audience targeting, creative testing, and algorithmic optimization.',
    shortDescription: 'Full-funnel Meta advertising and creative optimization.',
    benefits: [
      'Lookalike and custom audiences built from first-party data',
      'Creative testing frameworks that identify winning ad variations fast',
      'Retargeting sequences that convert warm audiences at lower CPAs',
      'Cross-platform campaigns spanning Facebook, Instagram, and Audience Network',
      'Automated rules and bid strategies that protect ad spend from waste',
    ],
  },
  {
    slug: 'marketing-attribution',
    name: 'Marketing Attribution',
    description:
      'Multi-touch attribution modeling that reveals the true impact of every marketing channel, enabling data-driven budget allocation and strategy refinement.',
    shortDescription: 'Multi-touch attribution that reveals true channel performance.',
    benefits: [
      'Clear visibility into which channels actually drive revenue',
      'Multi-touch models that credit the full customer journey',
      'Elimination of wasted spend on underperforming channels',
      'Custom attribution windows tailored to your sales cycle',
      'Integration with CRM and ad platform data for unified reporting',
    ],
  },
  {
    slug: 'roas-optimization',
    name: 'ROAS Optimization',
    description:
      'Systematic return on ad spend improvement through bid management, audience refinement, creative optimization, and landing page conversion rate enhancements.',
    shortDescription: 'Systematic improvement of return on ad spend.',
    benefits: [
      'Consistent ROAS improvements through data-driven optimization cycles',
      'Profit-based bidding strategies that go beyond surface-level metrics',
      'Landing page optimization that increases conversion rates',
      'Audience segmentation that allocates spend to highest-value segments',
      'Transparent reporting on revenue attributed to every dollar spent',
    ],
  },
  {
    slug: 'cac-reduction',
    name: 'CAC Reduction',
    description:
      'Customer acquisition cost reduction programs that identify waste, improve targeting efficiency, and optimize the full conversion funnel from click to close.',
    shortDescription: 'Reducing customer acquisition costs without sacrificing volume.',
    benefits: [
      'Lower CAC through funnel optimization and waste elimination',
      'Improved lead quality that reduces sales team burden',
      'Channel mix optimization that shifts budget toward efficient sources',
      'Conversion rate improvements across landing pages and forms',
      'Lifetime value analysis that contextualizes acquisition costs',
    ],
  },
  {
    slug: 'marketing-dashboards',
    name: 'Marketing Dashboards',
    description:
      'Custom marketing dashboards that consolidate data from every ad platform, CRM, and analytics tool into real-time, actionable performance views.',
    shortDescription: 'Custom real-time dashboards for marketing performance.',
    benefits: [
      'Single source of truth across all marketing channels',
      'Real-time data that enables faster decision-making',
      'Custom KPIs and metrics tailored to your business model',
      'Automated reporting that eliminates manual spreadsheet work',
      'Executive-ready views alongside granular operational dashboards',
    ],
  },
  {
    slug: 'paid-media-management',
    name: 'Paid Media Management',
    description:
      'Cross-platform paid media management spanning Google, Meta, LinkedIn, TikTok, and programmatic channels, orchestrated for maximum impact and efficiency.',
    shortDescription: 'Cross-platform paid media strategy and execution.',
    benefits: [
      'Unified strategy across search, social, display, and video channels',
      'Budget allocation optimized across platforms based on performance data',
      'Centralized reporting and cross-channel attribution',
      'Platform-specific expertise combined with holistic media planning',
      'Rapid scaling capability when performance targets are met',
    ],
  },
  {
    slug: 'creative-testing',
    name: 'Creative Testing',
    description:
      'Structured creative testing programs that systematically identify high-performing ad concepts, copy variations, and visual treatments to maximize campaign results.',
    shortDescription: 'Systematic ad creative testing and optimization.',
    benefits: [
      'Data-driven creative decisions that eliminate guesswork',
      'Statistically significant testing frameworks for reliable results',
      'Rapid iteration cycles that keep creative fresh and fatigue-free',
      'Insights into messaging, visual, and format performance by audience',
      'Creative performance libraries that inform future campaign development',
    ],
  },
];

export const industries: Industry[] = [
  {
    slug: 'ecommerce',
    name: 'Ecommerce',
    description:
      'Online retailers and ecommerce brands competing for visibility in crowded marketplaces and fighting rising customer acquisition costs.',
    painPoints: [
      'Rising CPCs across Google Shopping and paid search',
      'Attribution challenges across multi-touch purchase journeys',
      'Cart abandonment rates eroding campaign profitability',
      'Seasonal demand fluctuations requiring agile budget management',
    ],
  },
  {
    slug: 'saas',
    name: 'SaaS',
    description:
      'Software-as-a-service companies navigating long sales cycles, trial-to-paid conversions, and the pressure to maintain efficient customer acquisition at scale.',
    painPoints: [
      'Long sales cycles that complicate attribution and ROI measurement',
      'High CAC relative to initial contract values',
      'Free trial and freemium conversion optimization',
      'Competitive keyword markets with escalating bid costs',
    ],
  },
  {
    slug: 'lead-generation',
    name: 'Lead Generation',
    description:
      'Businesses dependent on lead flow that need consistent, qualified pipeline from digital channels without wasting budget on unqualified prospects.',
    painPoints: [
      'Lead quality inconsistency across channels and campaigns',
      'Inability to connect ad spend to downstream revenue',
      'Form abandonment and landing page conversion rate issues',
      'Scaling lead volume without proportionally increasing costs',
    ],
  },
  {
    slug: 'd2c',
    name: 'D2C Brands',
    description:
      'Direct-to-consumer brands building customer relationships through digital channels while managing the economics of acquisition, retention, and lifetime value.',
    painPoints: [
      'iOS privacy changes reducing Meta ad targeting effectiveness',
      'Rising acquisition costs on primary social channels',
      'Building brand awareness while maintaining performance targets',
      'First-party data collection and activation at scale',
    ],
  },
  {
    slug: 'b2b',
    name: 'B2B',
    description:
      'Business-to-business companies with complex buying committees and extended sales cycles that demand sophisticated targeting and attribution.',
    painPoints: [
      'Reaching specific decision-makers within target accounts',
      'Attributing revenue across 6-12 month sales cycles',
      'Generating qualified pipeline, not just MQLs',
      'Aligning marketing metrics with sales outcomes',
    ],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    description:
      'Healthcare organizations navigating strict regulatory requirements, compliance constraints, and the need for patient trust in digital advertising.',
    painPoints: [
      'HIPAA compliance requirements in advertising and tracking',
      'Restricted targeting options on major ad platforms',
      'Building trust and credibility through compliant messaging',
      'Local competition for patient acquisition',
    ],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    description:
      'Real estate companies and agencies competing for buyer and seller leads in hyper-local markets with high lifetime deal values.',
    painPoints: [
      'Hyper-local targeting needs across specific markets and zip codes',
      'High competition for branded and non-branded search terms',
      'Long consideration periods from first click to closing',
      'Seasonal market fluctuations affecting demand and inventory',
    ],
  },
  {
    slug: 'education',
    name: 'Education',
    description:
      'Educational institutions and edtech companies competing for student enrollment through digital channels with cyclical enrollment periods.',
    painPoints: [
      'Enrollment cycle seasonality requiring precise campaign timing',
      'High competition for program-specific keywords',
      'Long decision-making processes involving multiple stakeholders',
      'Tracking enrollment outcomes back to marketing touchpoints',
    ],
  },
  {
    slug: 'fintech',
    name: 'Fintech',
    description:
      'Financial technology companies acquiring users in a regulated industry where trust, compliance, and unit economics are critical to growth.',
    painPoints: [
      'Regulatory restrictions on financial advertising claims',
      'Building consumer trust in a category with inherent skepticism',
      'Complex attribution across app installs, signups, and funded accounts',
      'Balancing growth velocity with sustainable unit economics',
    ],
  },
  {
    slug: 'agencies',
    name: 'Agencies',
    description:
      'Marketing agencies seeking white-label or partnership support to expand paid media capabilities without building in-house teams from scratch.',
    painPoints: [
      'Scaling client media management without proportional headcount growth',
      'Maintaining quality and performance across diverse client portfolios',
      'Accessing specialized platform expertise for client verticals',
      'White-label reporting and transparent collaboration frameworks',
    ],
  },
];

export const cities: City[] = [
  { slug: 'new-york', name: 'New York', state: 'NY', description: 'the largest metropolitan economy in the United States, home to Fortune 500 headquarters and a fiercely competitive digital advertising landscape' },
  { slug: 'los-angeles', name: 'Los Angeles', state: 'CA', description: 'a sprawling market driven by entertainment, D2C brands, and a massive consumer base spanning diverse demographics' },
  { slug: 'chicago', name: 'Chicago', state: 'IL', description: 'a major business hub in the Midwest with a dense concentration of B2B companies, manufacturers, and professional services firms' },
  { slug: 'houston', name: 'Houston', state: 'TX', description: 'a rapidly growing market anchored by energy, healthcare, and an expanding tech sector with increasing digital ad competition' },
  { slug: 'phoenix', name: 'Phoenix', state: 'AZ', description: 'one of the fastest-growing metros in the country, attracting new businesses and creating intense competition for local digital advertising' },
  { slug: 'philadelphia', name: 'Philadelphia', state: 'PA', description: 'a major East Coast market with deep roots in healthcare, education, and financial services, all competing for digital visibility' },
  { slug: 'san-antonio', name: 'San Antonio', state: 'TX', description: 'a growing Texas metro with a strong military, healthcare, and tourism presence driving local advertising demand' },
  { slug: 'san-diego', name: 'San Diego', state: 'CA', description: 'a thriving coastal market with biotech, defense, and tourism industries fueling competitive digital advertising' },
  { slug: 'dallas', name: 'Dallas', state: 'TX', description: 'a booming corporate relocation destination with a diverse economy spanning finance, tech, and retail' },
  { slug: 'san-jose', name: 'San Jose', state: 'CA', description: 'the heart of Silicon Valley where tech companies compete aggressively for talent and customer acquisition through digital channels' },
  { slug: 'austin', name: 'Austin', state: 'TX', description: 'a rapidly expanding tech and startup hub where digital-first companies drive intense competition for online visibility' },
  { slug: 'jacksonville', name: 'Jacksonville', state: 'FL', description: 'the largest city by area in the continental US, with a growing financial services and logistics sector driving digital marketing demand' },
  { slug: 'san-francisco', name: 'San Francisco', state: 'CA', description: 'a global tech capital where SaaS companies, startups, and established brands compete for some of the highest-CPC keywords in the country' },
  { slug: 'miami', name: 'Miami', state: 'FL', description: 'a dynamic international market serving Latin America and the Caribbean, with booming real estate, fintech, and D2C sectors' },
  { slug: 'denver', name: 'Denver', state: 'CO', description: 'a fast-growing market attracting tech relocations and outdoor lifestyle brands, with increasing digital advertising competition' },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getServiceIndustryContent(serviceSlug: string, industrySlug: string) {
  const service = getServiceBySlug(serviceSlug);
  const industry = getIndustryBySlug(industrySlug);

  if (!service || !industry) return null;

  const intro = `${industry.name} companies face a unique set of challenges when it comes to paid media and performance marketing. ${industry.painPoints[0]}, and ${industry.painPoints[1].toLowerCase()}. That is exactly where expert ${service.name.toLowerCase()} makes the difference.`;

  const whyItMatters = `For ${industry.name.toLowerCase()} businesses, ${service.name.toLowerCase()} is not a nice-to-have — it is a growth lever. ${service.description} When applied specifically to the ${industry.name.toLowerCase()} vertical, this expertise translates into campaigns that account for ${industry.painPoints[2].toLowerCase()} and ${industry.painPoints[3].toLowerCase()}.`;

  const approach = `Our approach to ${service.name.toLowerCase()} for ${industry.name.toLowerCase()} starts with understanding your specific business model, sales cycle, and competitive landscape. We build campaigns and systems that reflect how ${industry.name.toLowerCase()} buyers actually behave — not generic best practices pulled from a different vertical.`;

  const results = `The result is a ${service.name.toLowerCase()} program that delivers measurable improvements in the metrics that matter to ${industry.name.toLowerCase()} businesses: lower customer acquisition costs, higher return on ad spend, and a clearer picture of what is actually driving revenue.`;

  const howWeHelp = [
    `We start with a comprehensive audit of your current ${service.name.toLowerCase()} setup, identifying waste, missed opportunities, and quick wins specific to ${industry.name.toLowerCase()}.`,
    `Our team builds a custom strategy that addresses ${industry.painPoints[0].toLowerCase()} while leveraging the strengths of your ${industry.name.toLowerCase()} business model.`,
    `We implement rigorous tracking and attribution so you can see exactly how ${service.name.toLowerCase()} contributes to your bottom line.`,
    `Ongoing optimization cycles ensure your campaigns adapt to market shifts, competitive moves, and changes in ${industry.name.toLowerCase()} buyer behavior.`,
  ];

  const benefits = service.benefits.map((benefit, index) => {
    const industryContext = [
      ` — critical for ${industry.name.toLowerCase()} companies managing tight margins`,
      ` — especially important given ${industry.painPoints[0].toLowerCase()}`,
      ` — tailored to the ${industry.name.toLowerCase()} buying journey`,
      ` — addressing ${industry.painPoints[1].toLowerCase()}`,
      ` — built for ${industry.name.toLowerCase()} scale and complexity`,
    ];
    return benefit + (industryContext[index] || '');
  });

  return {
    service,
    industry,
    intro,
    whyItMatters,
    approach,
    results,
    howWeHelp,
    benefits,
  };
}

export function getServiceCityContent(serviceSlug: string, citySlug: string) {
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);

  if (!service || !city) return null;

  const intro = `${city.name} is ${city.description}. Businesses in ${city.name} need ${service.name.toLowerCase()} that accounts for this market's specific dynamics — and that is exactly what we deliver.`;

  const localContext = `While we serve clients remotely across the United States, our ${service.name.toLowerCase()} work for ${city.name}-based businesses is informed by deep understanding of the ${city.name} market. We know the competitive landscape, the local search behavior patterns, and the cost benchmarks that define success in this metro.`;

  const approach = `Our ${service.name.toLowerCase()} programs for ${city.name} businesses combine ${service.shortDescription.toLowerCase().replace(/\.$/, '')} with market-specific intelligence. ${service.description}`;

  const results = `${city.name} businesses that work with us on ${service.name.toLowerCase()} see measurable improvements in campaign efficiency, clearer attribution, and a more predictable growth trajectory — regardless of whether they serve local or national markets.`;

  return {
    service,
    city,
    intro,
    localContext,
    approach,
    results,
  };
}
