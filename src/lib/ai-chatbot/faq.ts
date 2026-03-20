// Extracted FAQ matching logic — used as fallback when AI is not available.

const FAQ_RESPONSES: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['service', 'services', 'what do you do', 'offer', 'help with'],
    answer:
      'Digital Point LLC offers three core services:\n\n1. **Performance Marketing** — Paid acquisition across Meta, Google, LinkedIn & more. We optimize CAC, ROAS, and scale ad spend profitably.\n\n2. **Remote Workforce** — Managed remote teams for marketing ops, creative production, analytics, and execution support.\n\n3. **Systems & Reporting** — CRM optimization, marketing automation, attribution dashboards, and RevOps infrastructure.\n\nWould you like to know more about any of these?',
  },
  {
    keywords: ['pricing', 'cost', 'how much', 'price', 'rate', 'budget', 'affordable', 'expensive'],
    answer:
      'Our pricing is customized based on scope, channels, and team size. We work with businesses of all sizes — from founder-led startups to growth-stage companies.\n\nThe best way to get a tailored quote is to book a **free growth audit** where we assess your current setup and recommend a plan.\n\nWould you like me to help you get started with an audit?',
  },
  {
    keywords: ['audit', 'free audit', 'growth audit', 'assessment', 'consultation'],
    answer:
      'Our **Free Growth Audit** is a no-obligation review of your current marketing setup. We look at:\n\n- Ad account structure & spend efficiency\n- Attribution & tracking gaps\n- Funnel conversion rates\n- Quick wins for revenue growth\n\nYou can request one directly on our website — just visit the **Free Growth Audit** page or I can help you create a support ticket to get started!',
  },
  {
    keywords: ['founder', 'who founded', 'ceo', 'owner', 'faizan', 'leadership', 'team lead'],
    answer:
      'Digital Point LLC was founded by **M Faizan Rafiq**, a performance marketing specialist with 8+ years of experience in the digital marketing space. He leads a team of specialists across paid acquisition, creative strategy, analytics, and remote operations.\n\nThe company partners with US-based businesses while delivering from a global team.',
  },
  {
    keywords: ['contact', 'reach', 'email', 'phone', 'get in touch', 'talk to someone'],
    answer:
      'You can reach Digital Point LLC through:\n\n- **Email:** info@digitalpointllc.com\n- **Founder:** admin@digitalpointllc.com\n- **Website:** digitalpointllc.com\n\nOr I can create a support ticket for you right now if you have a specific question or need!',
  },
  {
    keywords: ['location', 'where', 'based', 'office', 'country', 'pakistan', 'us', 'united states'],
    answer:
      'Digital Point LLC operates with a **US-based business entity** and delivers through a global remote team. Our founder is based in Pakistan, and we have team members across multiple time zones to ensure seamless coverage for our clients.\n\nWe serve clients primarily in the US, UK, and globally.',
  },
  {
    keywords: ['process', 'how do you work', 'workflow', 'onboarding', 'get started', 'start'],
    answer:
      'Our process is straightforward:\n\n1. **Discovery Call** — We learn about your business, goals, and current setup\n2. **Free Growth Audit** — We analyze your marketing stack and identify opportunities\n3. **Strategy & Proposal** — Custom plan tailored to your needs\n4. **Onboarding** — We set up tracking, dashboards, and campaign structures\n5. **Execution & Optimization** — Ongoing management with weekly reporting\n\nReady to start? Book a free audit!',
  },
  {
    keywords: ['remote workforce', 'remote team', 'outsource', 'virtual team', 'staff', 'hire'],
    answer:
      'Our **Remote Workforce** service provides fully managed team members for:\n\n- Marketing operations & campaign management\n- Creative production (design, video, copy)\n- Data analytics & reporting\n- Customer support & admin tasks\n\nAll team members are vetted, trained, and managed by Digital Point. You get dedicated resources without the overhead of traditional hiring.',
  },
  {
    keywords: ['performance marketing', 'paid ads', 'advertising', 'meta ads', 'google ads', 'ppc', 'paid media'],
    answer:
      'Our **Performance Marketing** service covers:\n\n- **Meta Ads** (Facebook & Instagram)\n- **Google Ads** (Search, Display, YouTube, Shopping)\n- **LinkedIn Ads** for B2B\n- **TikTok Ads** for emerging audiences\n\nWe focus on measurable outcomes — ROAS, CAC, and revenue growth. Our team manages everything from strategy to creative to daily optimization.',
  },
  {
    keywords: ['systems', 'reporting', 'dashboard', 'crm', 'automation', 'revops', 'analytics', 'tracking'],
    answer:
      'Our **Systems & Reporting** service includes:\n\n- CRM setup & optimization (HubSpot, Salesforce, etc.)\n- Marketing automation workflows\n- Attribution & tracking implementation\n- Custom reporting dashboards\n- RevOps infrastructure\n\nWe build the systems that give you clarity on what is working and what is not.',
  },
  {
    keywords: ['results', 'case study', 'roi', 'success', 'clients', 'portfolio', 'testimonial'],
    answer:
      'We have helped clients achieve significant results, including improved ROAS, reduced CAC, and scaled revenue growth. Our track record spans 8+ years with businesses across e-commerce, SaaS, and professional services.\n\nCheck out the Results section on our website for detailed metrics and client stories!',
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'sup', "what's up"],
    answer:
      'Hey there! Welcome to Digital Point LLC. I am your AI assistant and I am here to help you learn about our services, answer questions, or connect you with our team.\n\nWhat can I help you with today?',
  },
  {
    keywords: ['thank', 'thanks', 'appreciate', 'awesome', 'great', 'perfect'],
    answer:
      'You are welcome! If you have any other questions, feel free to ask. I am always here to help.\n\nIf you need to speak with a human, I can create a support ticket for you anytime!',
  },
  {
    keywords: ['ticket', 'support ticket', 'escalate', 'human', 'real person', 'agent', 'speak to someone'],
    answer:
      'I can create a support ticket for you right away! Just click the **ticket icon** (📄) next to the message input, fill in the details, and our team will get back to you promptly.\n\n- **Normal priority** tickets go to our support team\n- **High priority** tickets go directly to our founder\n\nWould you like to create a ticket now?',
  },
];

const FALLBACK_RESPONSE =
  "I'm not sure I have the answer to that one! But no worries — I can create a **support ticket** for you so our team can follow up personally.\n\nJust click the **ticket icon** (📄) next to the message input, or try asking about our services, pricing, process, or team!";

export function matchFAQ(input: string): string {
  const lower = input.toLowerCase().trim();

  let bestMatch: (typeof FAQ_RESPONSES)[number] | null = null;
  let bestScore = 0;

  for (const faq of FAQ_RESPONSES) {
    let score = 0;
    for (const keyword of faq.keywords) {
      if (lower.includes(keyword)) {
        score += keyword.split(' ').length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq;
    }
  }

  return bestMatch && bestScore > 0 ? bestMatch.answer : FALLBACK_RESPONSE;
}
