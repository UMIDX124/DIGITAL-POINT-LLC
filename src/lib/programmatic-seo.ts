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
      "Most Google Ads accounts we audit are bleeding money , poor structure, lazy keyword targeting, and zero bid strategy. We fix that. Our management isn't about tweaking a few settings; it's about rebuilding your campaigns around what actually converts, then optimizing relentlessly.",
    shortDescription: "Google Ads management that's focused on profit, not vanity metrics.",
    benefits: [
      "Acquisition costs that drop fast , we've cut CPAs by 30-50% in the first 60 days for most accounts",
      "Quality scores that actually go up , we've taken accounts from 4/10 to 8/10 in weeks, which directly slashes your cost per click",
      "Keyword targeting built around buyer intent, not just search volume (there's a huge difference)",
      "Full conversion tracking so you know exactly which clicks turn into revenue , no more guessing",
      "Shopping, search, display, YouTube , all managed under one roof so nothing falls through the cracks",
    ],
  },
  {
    slug: 'facebook-ads-management',
    name: 'Facebook Ads Management',
    description:
      "Here's the thing about Meta ads: the algorithm is powerful, but it won't save a bad strategy. We build full-funnel campaigns , from cold audiences to retargeting , that give the algorithm what it needs to find your best customers. Creative testing, audience layering, and constant iteration are how we keep results compounding.",
    shortDescription: "Full-funnel Meta ads that actually scale without tanking your margins.",
    benefits: [
      "Lookalike audiences built from your real customer data , not some generic interest targeting that wastes budget",
      "We test 10-20 creative variations per cycle, so winning ads surface fast",
      "Retargeting sequences that turn window shoppers into buyers at a fraction of cold traffic costs",
      "Campaigns that work across Facebook, Instagram, and Audience Network simultaneously",
      "Automated rules that kill underperformers before they drain your budget , we've seen this save clients thousands per month",
    ],
  },
  {
    slug: 'marketing-attribution',
    name: 'Marketing Attribution',
    description:
      "If you don't know which channels are actually driving revenue, you're making budget decisions in the dark. Most teams we talk to are over-crediting last-click and under-investing in the channels doing the real work. We build attribution models that show you what's truly happening , not just what Google or Meta want you to believe.",
    shortDescription: "Finally see which marketing channels are earning their keep.",
    benefits: [
      "You'll know exactly which channels drive revenue and which ones are just burning cash",
      "Multi-touch models that capture the full journey , because nobody buys after one ad click",
      "We've helped clients reallocate 20-40% of budget away from channels that looked good on paper but weren't converting",
      "Attribution windows customized to how your customers actually buy, not some platform default",
      "Your CRM, ad platforms, and analytics all feeding into one unified view , no more spreadsheet gymnastics",
    ],
  },
  {
    slug: 'roas-optimization',
    name: 'ROAS Optimization',
    description:
      "Honestly, most accounts we take over have a ROAS problem they don't even fully see yet. It's not just about bidding , it's the landing pages, the audiences, the creative, all working together or working against each other. We dig into every layer and fix what's leaking money.",
    shortDescription: "Getting more revenue from every ad dollar , that's the whole job.",
    benefits: [
      "ROAS improvements you can actually see quarter over quarter, not just promises",
      "Bidding based on real profit margins, not just revenue , because a 5x ROAS means nothing if your margins are thin",
      "Landing pages that convert better (we've lifted conversion rates 20-60% with targeted page changes)",
      "Budget shifted toward customer segments that spend the most, not just click the most",
      "Reporting that ties every dollar of ad spend to actual revenue , full transparency, no hand-waving",
    ],
  },
  {
    slug: 'cac-reduction',
    name: 'CAC Reduction',
    description:
      "Your CAC is probably higher than it needs to be. That's not a knock on your team , it's just what happens when campaigns run without regular deep-dives into waste, targeting gaps, and funnel friction. We find the leaks and fix them, from the first click all the way through to close.",
    shortDescription: "Cut acquisition costs without cutting corners on lead quality.",
    benefits: [
      "Lower CAC by plugging the holes , wasted spend, bad targeting, broken funnels",
      "Better leads, not just more leads (your sales team will thank you)",
      "We figure out which channels are efficient and shift budget there , sounds simple, but most teams overlook this",
      "Landing page and form tweaks that lift conversion rates , sometimes a small change makes a surprising difference",
      "LTV context so you're not just chasing cheap leads that churn in 90 days",
    ],
  },
  {
    slug: 'marketing-dashboards',
    name: 'Marketing Dashboards',
    description:
      "How many hours does your team spend pulling data from different platforms into spreadsheets every week? That's time you won't get back. We build custom dashboards that pull everything together , ad platforms, CRM, analytics , into one live view so you can make decisions in minutes, not days.",
    shortDescription: "One dashboard to replace the spreadsheet chaos.",
    benefits: [
      "A single source of truth , no more conflicting numbers from different platforms",
      "Real-time data, so you're making decisions on what's happening now, not last week",
      "KPIs built around your actual business model, not generic vanity metrics",
      "Automated reports that show up in your inbox , no more manual pulls every Monday morning",
      "Executive summaries for leadership plus the granular views your ops team needs, all in one place",
    ],
  },
  {
    slug: 'paid-media-management',
    name: 'Paid Media Management',
    description:
      "Running ads on five platforms with five different strategies and five different reports? That's a mess. We manage Google, Meta, LinkedIn, TikTok, and programmatic as one coordinated system , so your budget goes where it performs, not where it's easiest to spend.",
    shortDescription: "All your paid channels managed together, not in silos.",
    benefits: [
      "One strategy that ties search, social, display, and video together instead of treating each like its own island",
      "Budget moves to whatever's working , we reallocate weekly based on real performance, not quarterly gut feels",
      "Centralized reporting so you can compare channels apples-to-apples for the first time",
      "Deep expertise on each platform, but always in service of the bigger picture",
      "When something's working, we scale it fast , no bureaucratic lag",
    ],
  },
  {
    slug: 'creative-testing',
    name: 'Creative Testing',
    description:
      "The reality is, most ad creative is chosen by whoever shouts loudest in the meeting. We replace opinions with data. Our testing frameworks run structured experiments across copy, visuals, and formats , so you know what works, why it works, and how to keep building on it.",
    shortDescription: "Stop guessing which ads work. Test and know for sure.",
    benefits: [
      "Creative decisions backed by real performance data, not someone's gut feeling",
      "Tests designed for statistical significance , we don't call a winner after 50 impressions",
      "Fresh creative every cycle, which keeps your audience from tuning out (ad fatigue is a bigger problem than most teams realize)",
      "Clear breakdowns of what messaging, visuals, and formats resonate with each audience segment",
      "A growing library of proven creative patterns your team can pull from for future campaigns",
    ],
  },
];

export const industries: Industry[] = [
  {
    slug: 'ecommerce',
    name: 'Ecommerce',
    description:
      "Ecommerce is brutal right now. CPCs keep climbing, margins keep shrinking, and every competitor is bidding on the same keywords. If you're an online retailer, you already know the pressure , the question is whether your ad strategy is keeping up.",
    painPoints: [
      "Google Shopping CPCs that feel like they go up every month",
      "You can't figure out which touchpoints actually led to the sale",
      "Cart abandonment eating into what should be profitable campaigns",
      "Seasonal swings that require constant budget adjustments (and fast ones)",
    ],
  },
  {
    slug: 'saas',
    name: 'SaaS',
    description:
      "SaaS marketing is a patience game with impatient stakeholders. Your sales cycles are long, your trial-to-paid conversion is never as high as the board wants, and the keywords you need keep getting more expensive. We've worked with enough SaaS companies to know these problems inside out.",
    painPoints: [
      "Sales cycles so long that proving ROI on this quarter's spend feels impossible",
      "CAC that's way too high compared to first-year contract value",
      "Trial and freemium users who never convert to paid",
      "Keyword costs that keep escalating because every competitor is bidding on the same terms",
    ],
  },
  {
    slug: 'lead-generation',
    name: 'Lead Generation',
    description:
      "You need leads. Not junk leads that waste your sales team's time , real, qualified leads that close. That's what every lead gen business says they want, and it's what most ad setups fail to deliver consistently.",
    painPoints: [
      "Lead quality that's all over the place , great one week, garbage the next",
      "No clear line between what you spent on ads and what actually closed as revenue",
      "People start filling out your form and bail halfway through",
      "Every time you try to scale volume, costs spike and quality tanks",
    ],
  },
  {
    slug: 'd2c',
    name: 'D2C Brands',
    description:
      "D2C was supposed to be the future of retail, but the economics have gotten harder , especially post-iOS 14. Acquisition costs are up, Meta targeting isn't what it used to be, and building a brand while hitting ROAS targets feels like a contradiction. Sound familiar?",
    painPoints: [
      "iOS privacy updates gutted your Meta targeting and you're still feeling it",
      "Acquisition costs on social channels climbing faster than your AOV",
      "You need brand awareness but leadership only wants to talk about ROAS",
      "First-party data is the answer, but actually collecting and using it at scale is the hard part",
    ],
  },
  {
    slug: 'b2b',
    name: 'B2B',
    description:
      "B2B marketing isn't like selling shoes online. You've got buying committees with 5-10 people, sales cycles that drag on for months, and a CRM full of MQLs that never become actual revenue. The playbooks that work in B2C don't translate here , you need a different approach.",
    painPoints: [
      "Getting in front of the actual decision-maker, not just random employees at target companies",
      "Proving that marketing influenced a deal that took 9 months to close",
      "Too many MQLs that sales doesn't want to touch",
      "Marketing reports that say one thing while sales reports say another",
    ],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    description:
      "Healthcare advertising is a minefield of compliance rules, platform restrictions, and patient trust issues. One wrong move with HIPAA and you've got a real problem. But here's the thing , you still need patients, and digital ads still work. You just need someone who knows the guardrails.",
    painPoints: [
      "HIPAA compliance that affects everything from your tracking pixels to your audience lists",
      "Ad platforms that restrict what you can target and say (and the rules keep changing)",
      "Patients who are skeptical of ads , trust has to be earned through careful messaging",
      "Every local competitor is bidding on the same procedure and condition keywords",
    ],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    description:
      "Real estate advertising is all about location , literally. You need leads in specific zip codes, not just \"nearby.\" And with every brokerage in town running Google Ads, the cost to show up keeps climbing. We've seen what works in this space and what's just burning money.",
    painPoints: [
      "You need leads in specific neighborhoods and zip codes, not a 50-mile radius",
      "Every agent and brokerage is bidding on the same search terms, driving costs through the roof",
      "Someone clicks your ad today and doesn't close for 6 months , tracking that is a nightmare",
      "Market seasonality means your budget strategy in March looks nothing like December",
    ],
  },
  {
    slug: 'education',
    name: 'Education',
    description:
      "Whether you're a university or an edtech startup, enrollment is everything , and it's seasonal, competitive, and increasingly expensive to drive through digital channels. The schools that win aren't spending more; they're spending smarter during the windows that matter.",
    painPoints: [
      "Enrollment cycles that mean you've got a narrow window to hit your numbers",
      "Program-specific keywords where every competitor is bidding aggressively",
      "Prospective students (and their parents) who take months to decide",
      "Knowing which ad or email actually drove the enrollment, not just the inquiry",
    ],
  },
  {
    slug: 'fintech',
    name: 'Fintech',
    description:
      "Fintech growth is a tightrope walk. You need users fast, but regulators are watching every ad claim, consumers don't trust new financial products easily, and your unit economics have to work or the whole model falls apart. We get it , this isn't a space where you can be sloppy with your ad strategy.",
    painPoints: [
      "Regulators that limit what you can say in ads (and platforms that add their own restrictions on top)",
      "Consumers who are naturally skeptical about handing money to a company they found through an ad",
      "Attribution that has to track from ad click to app install to signup to funded account , each step leaks data",
      "Growing fast enough to hit targets without blowing past sustainable CAC thresholds",
    ],
  },
  {
    slug: 'agencies',
    name: 'Agencies',
    description:
      "You're an agency. You know how to do great work. But scaling paid media across a growing client roster without hiring a dozen specialists? That's the hard part. We partner with agencies as a behind-the-scenes extension of your team , your clients never know we exist.",
    painPoints: [
      "More clients, same team , something's gotta give, and it's usually performance or sanity",
      "Keeping results consistent when your portfolio spans five different industries",
      "A client needs TikTok expertise and you don't have it in-house",
      "White-label reporting that actually looks like it came from your agency, not some generic template",
    ],
  },
];

export const cities: City[] = [
  { slug: 'new-york', name: 'New York', state: 'NY', description: "the biggest metro economy in the US , Fortune 500 headquarters everywhere, and one of the most cutthroat digital ad landscapes you'll find anywhere" },
  { slug: 'los-angeles', name: 'Los Angeles', state: 'CA', description: "a massive, sprawling market where entertainment, D2C brands, and an incredibly diverse consumer base all collide , and everyone's fighting for attention" },
  { slug: 'chicago', name: 'Chicago', state: 'IL', description: "the Midwest's business powerhouse, packed with B2B companies, manufacturers, and professional services firms that are all investing heavily in digital" },
  { slug: 'houston', name: 'Houston', state: 'TX', description: "a market that's growing fast, anchored by energy and healthcare but with a tech sector that's expanding quickly and driving up digital ad competition" },
  { slug: 'phoenix', name: 'Phoenix', state: 'AZ', description: "one of the fastest-growing metros in the country right now , new businesses are flooding in and the competition for local digital advertising is heating up fast" },
  { slug: 'philadelphia', name: 'Philadelphia', state: 'PA', description: "a major East Coast market where healthcare, education, and financial services all compete for digital visibility , and the ad costs reflect it" },
  { slug: 'san-antonio', name: 'San Antonio', state: 'TX', description: "a Texas metro that keeps growing, with military, healthcare, and tourism all driving strong local advertising demand" },
  { slug: 'san-diego', name: 'San Diego', state: 'CA', description: "a coastal market where biotech, defense, and tourism create a surprisingly competitive digital ad environment" },
  { slug: 'dallas', name: 'Dallas', state: 'TX', description: "a magnet for corporate relocations, with a diverse economy spanning finance, tech, and retail that makes it one of the most active ad markets in the South" },
  { slug: 'san-jose', name: 'San Jose', state: 'CA', description: "the heart of Silicon Valley , tech companies here compete aggressively for everything, and digital ad costs are some of the highest you'll see" },
  { slug: 'austin', name: 'Austin', state: 'TX', description: "a tech and startup hub that won't stop growing , digital-first companies here drive intense competition for online visibility, and it's only getting tougher" },
  { slug: 'jacksonville', name: 'Jacksonville', state: 'FL', description: "the largest city by area in the continental US, with financial services and logistics sectors that are investing more in digital marketing every year" },
  { slug: 'san-francisco', name: 'San Francisco', state: 'CA', description: "a global tech capital where SaaS companies, startups, and established brands battle over some of the highest-CPC keywords you'll find anywhere in the country" },
  { slug: 'miami', name: 'Miami', state: 'FL', description: "a dynamic international market with strong ties to Latin America, plus booming real estate, fintech, and D2C sectors that are all spending aggressively on digital" },
  { slug: 'denver', name: 'Denver', state: 'CO', description: "a market that's been attracting tech relocations and outdoor lifestyle brands for years now, and the digital advertising competition has followed" },
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

  const variant = (service.slug.length + industry.slug.length) % 3;

  let intro: string;
  let whyItMatters: string;
  let approach: string;
  let results: string;
  let howWeHelp: string[];

  if (variant === 0) {
    // Variant 0: Statement-led (refined original)
    intro = `${industry.name} companies deal with a specific set of headaches when it comes to paid media. ${industry.painPoints[0]}, and ${industry.painPoints[1].toLowerCase()}. That's exactly where solid ${service.name.toLowerCase()} makes a real difference.`;

    whyItMatters = `For ${industry.name.toLowerCase()} businesses, ${service.name.toLowerCase()} isn't a nice-to-have , it's a growth lever. ${service.description} When we apply this specifically to the ${industry.name.toLowerCase()} space, it means campaigns that actually account for ${industry.painPoints[2].toLowerCase()} and ${industry.painPoints[3].toLowerCase()}.`;

    approach = `Here's how we approach ${service.name.toLowerCase()} for ${industry.name.toLowerCase()}: we start by learning your business model, sales cycle, and who you're up against. Then we build campaigns around how ${industry.name.toLowerCase()} buyers actually behave , not some cookie-cutter playbook borrowed from a totally different industry.`;

    results = `What you end up with is a ${service.name.toLowerCase()} program that moves the numbers ${industry.name.toLowerCase()} businesses actually care about: lower acquisition costs, better ROAS, and a clear picture of what's driving revenue , not just clicks.`;

    howWeHelp = [
      `First, we audit what you've got. Honestly, most ${service.name.toLowerCase()} setups we look at have obvious waste and missed opportunities , especially in ${industry.name.toLowerCase()}.`,
      `Then we build a strategy from scratch that tackles ${industry.painPoints[0].toLowerCase()} head-on, while playing to the strengths of your ${industry.name.toLowerCase()} business model.`,
      `We set up proper tracking and attribution so there's no ambiguity about how ${service.name.toLowerCase()} impacts your bottom line.`,
      `From there, it's ongoing optimization , adapting to market shifts, competitive moves, and changes in how ${industry.name.toLowerCase()} buyers behave.`,
    ];
  } else if (variant === 1) {
    // Variant 1: Question-led
    intro = `What happens when ${industry.name.toLowerCase()} companies get ${service.name.toLowerCase()} right? They stop worrying about ${industry.painPoints[0].toLowerCase()} and start scaling with confidence. But getting there means solving for ${industry.painPoints[1].toLowerCase()} , and that takes more than surface-level optimization.`;

    whyItMatters = `In the ${industry.name.toLowerCase()} space, ${service.name.toLowerCase()} touches everything. ${service.description} The ${industry.name.toLowerCase()} angle matters because your buyers behave differently , they're dealing with ${industry.painPoints[2].toLowerCase()}, and your campaigns need to reflect that reality.`;

    approach = `We've worked with enough ${industry.name.toLowerCase()} companies to know the playbook. Generic strategies fall apart when you're up against ${industry.painPoints[3].toLowerCase()}. So we skip the templates and build ${service.name.toLowerCase()} programs around what actually moves the needle in your market.`;

    results = `The ${industry.name.toLowerCase()} clients we work with on ${service.name.toLowerCase()} don't just see better metrics , they get predictability. Revenue attribution they can trust, acquisition costs they can plan around, and campaigns that hold up as they scale.`;

    howWeHelp = [
      `We kick things off with a deep dive into your ${industry.name.toLowerCase()} business , your margins, your sales process, your competitive set. No generic questionnaire.`,
      `Next, we identify the biggest gaps in your current ${service.name.toLowerCase()} setup and prioritize fixes by revenue impact, not effort.`,
      `Our team builds out the infrastructure , tracking, audiences, creative frameworks , all calibrated for how ${industry.name.toLowerCase()} buyers actually convert.`,
      `Once campaigns are live, we run a continuous testing cycle: new angles, new segments, new bid strategies , always grounded in your ${industry.name.toLowerCase()} data.`,
    ];
  } else {
    // Variant 2: Problem-led
    intro = `Most ${industry.name.toLowerCase()} teams struggle with ${industry.painPoints[0].toLowerCase()}. Layer on ${industry.painPoints[1].toLowerCase()}, and it's no surprise that ${service.name.toLowerCase()} often ends up as an afterthought , running on autopilot while money leaks out the sides.`;

    whyItMatters = `Here's why that's costly: ${service.name.toLowerCase()} done right is one of the fastest ways to fix the economics of a ${industry.name.toLowerCase()} business. ${service.description} Apply that lens to ${industry.name.toLowerCase()} specifically, and you're solving for ${industry.painPoints[2].toLowerCase()} and ${industry.painPoints[3].toLowerCase()} at the same time.`;

    approach = `Our ${service.name.toLowerCase()} process for ${industry.name.toLowerCase()} starts differently than most agencies. We don't open with a keyword list or a campaign structure , we open with your P&L. Understanding what a customer is actually worth to your ${industry.name.toLowerCase()} business shapes every decision we make from there.`;

    results = `${industry.name} companies we've run ${service.name.toLowerCase()} for walk away with something rare: clarity. They know exactly what's working, what isn't, and where the next dollar of growth is coming from. No fog, no vanity metrics.`;

    howWeHelp = [
      `The engagement starts with a forensic audit of your current ${service.name.toLowerCase()} performance , we pull apart every campaign, every audience, every landing page to find where ${industry.name.toLowerCase()}-specific waste is hiding.`,
      `With that picture clear, we rebuild your strategy around the economics that matter: your real CAC targets, your LTV benchmarks, and the competitive dynamics unique to ${industry.name.toLowerCase()}.`,
      `Execution is hands-on , we launch, monitor, and iterate weekly, not monthly. ${industry.name} moves fast and your ${service.name.toLowerCase()} has to keep pace.`,
      `We wire everything into reporting that your team can actually use , live dashboards tied to revenue, not just impressions and clicks that don't tell you anything useful.`,
    ];
  }

  const benefits = service.benefits.map((benefit, index) => {
    const industryContext = [
      ` , and in ${industry.name.toLowerCase()}, where margins are tight, this matters a lot`,
      ` , especially when you're dealing with ${industry.painPoints[0].toLowerCase()}`,
      ` , shaped around how ${industry.name.toLowerCase()} buyers actually make decisions`,
      ` , which directly helps with ${industry.painPoints[1].toLowerCase()}`,
      ` , built to handle the scale and complexity ${industry.name.toLowerCase()} demands`,
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

  const variant = (service.slug.length + city.slug.length) % 3;

  let intro: string;
  let localContext: string;
  let approach: string;
  let results: string;

  if (variant === 0) {
    // Variant 0: City-description opening
    intro = `${city.name} is ${city.description}. If you're running a business here, you need ${service.name.toLowerCase()} that's built for this market's specific dynamics , and that's exactly what we bring to the table.`;

    localContext = `We work with clients across the country, but our ${service.name.toLowerCase()} for ${city.name}-based businesses isn't one-size-fits-all. We've studied the ${city.name} market , the competitive landscape, how people search locally, and the cost benchmarks you're up against in this metro.`;

    approach = `Our ${service.name.toLowerCase()} programs for ${city.name} businesses combine ${service.shortDescription.toLowerCase().replace(/\.$/, '')} with market-specific intelligence. ${service.description}`;

    results = `${city.name} businesses we've worked with on ${service.name.toLowerCase()} see real improvements , better campaign efficiency, clearer attribution, and growth that's actually predictable. Doesn't matter if you serve the local market or sell nationwide.`;
  } else if (variant === 1) {
    // Variant 1: Market-uniqueness opening
    intro = `The ${city.name} market has its own rules when it comes to ${service.name.toLowerCase()}. It's ${city.description} , which means the strategies that work in other metros won't necessarily hold up here. You need an approach shaped by what's actually happening on the ground in ${city.name}.`;

    localContext = `What makes ${city.name} different for ${service.name.toLowerCase()}? Cost benchmarks, audience behavior, and competitive density are all specific to this metro. We've dug into the data and built our ${city.name} playbook around those realities , not assumptions borrowed from national averages.`;

    approach = `For ${city.name} clients, our ${service.name.toLowerCase()} work starts with the local landscape. We map your competitors' spend patterns, identify the gaps they're leaving open, and build campaigns that exploit those openings. ${service.description}`;

    results = `Our ${city.name} clients don't just get better numbers , they get an edge over local competitors who are still running generic campaigns. That means stronger ROI, more efficient spend, and growth that compounds over time.`;
  } else {
    // Variant 2: Challenge-led opening
    intro = `Businesses in ${city.name} face a tough reality: it's ${city.description}. That competitive pressure drives up ad costs and makes sloppy ${service.name.toLowerCase()} expensive fast. If your campaigns aren't dialed in for this market, you're leaving money on the table every day.`;

    localContext = `The challenge in ${city.name} isn't just competition , it's that the market moves quickly. Consumer behavior shifts, new players enter, and ad costs fluctuate in ways that don't match national trends. Our ${service.name.toLowerCase()} for ${city.name} businesses is built to stay ahead of those shifts, not react to them after the damage is done.`;

    approach = `We tackle ${service.name.toLowerCase()} in ${city.name} by combining deep local market intelligence with proven frameworks that scale. ${service.shortDescription} ${service.description}`;

    results = `${city.name} businesses that work with us on ${service.name.toLowerCase()} gain something their competitors don't have: a program that adapts to local market conditions in real time. The result is consistent performance , not the boom-and-bust cycles that plague most ad accounts in competitive metros.`;
  }

  return {
    service,
    city,
    intro,
    localContext,
    approach,
    results,
  };
}
