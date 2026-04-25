'use client';

import Link from 'next/link';

interface AuthorInfo {
  name: string;
  initials: string;
  title: string;
  bio: string;
  expertise: string[];
}

const authors: Record<string, AuthorInfo> = {
  'M. Faizan Rafiq': {
    name: 'M. Faizan Rafiq',
    initials: 'MF',
    title: 'Co-Founder',
    bio: 'Faizan has spent 8+ years in the trenches of paid acquisition, scaling brands from five-figure to seven-figure monthly ad budgets. When he\'s not optimizing ad campaigns or arguing about attribution windows, he\'s probably testing yet another landing page variation "just to see." His team has learned that "quick experiment" means at least three hours of A/B testing.',
    expertise: ['Performance Marketing', 'Growth Strategy', 'Paid Acquisition'],
  },
  'Anwaar Tayyab': {
    name: 'Anwaar Tayyab',
    initials: 'AT',
    title: 'Co-Founder',
    bio: 'Anwaar is the person who will rebuild your entire reporting dashboard because one metric was slightly misleading. He turns messy ad spend data into clear, honest insights that growth teams actually use. Outside of data work, he\'s an avid problem-solver who treats every broken funnel like a puzzle that personally offends him.',
    expertise: ['Marketing Analytics', 'Attribution', 'Revenue Operations'],
  },
};

const defaultAuthor: AuthorInfo = {
  name: 'Digital Point LLC',
  initials: 'DP',
  title: 'Team',
  bio: 'We\'re a small, opinionated team that believes marketing should be measurable, honest, and actually drive revenue. We write from experience — the wins, the failures, and the "we probably should have tested that first" moments.',
  expertise: ['Digital Marketing', 'Growth', 'Analytics'],
};

export function AuthorBox({ authorName }: { authorName?: string }) {
  const author = (authorName && authors[authorName]) || defaultAuthor;

  return (
    <div
      className="rounded-2xl p-6 md:p-8 mt-12"
      style={{
        background: '#141416',
        border: '1px solid rgba(99,102,241, 0.2)',
      }}
    >
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        {/* Author avatar */}
        <div
          className="shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-display text-xl font-bold text-white"
          style={{
            background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
          }}
          aria-hidden="true"
        >
          {author.initials}
        </div>

        {/* Author info */}
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-wider text-[#71717A] mb-1">
            Written by
          </p>
          <h3 className="font-display text-lg font-semibold text-white">
            {author.name}
          </h3>
          <p className="text-[#6366F1] text-xs mb-1">{author.title}, Digital Point LLC</p>
          {/* Expertise tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {author.expertise.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{
                  background: 'rgba(129,140,248, 0.1)',
                  border: '1px solid rgba(129,140,248, 0.2)',
                  color: '#6366F1',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-[#D6D0C2] text-sm leading-relaxed mt-3">
            {author.bio}
          </p>

          {/* Links */}
          <div className="flex items-center gap-4 mt-4">
            <Link
              href="/about"
              className="text-[#6366F1] hover:text-[#818CF8] text-sm font-medium transition-colors"
            >
              About Us
            </Link>
            <a
              href="https://www.linkedin.com/company/digitalpointllc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#6366F1] hover:text-[#818CF8] text-sm font-medium transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
