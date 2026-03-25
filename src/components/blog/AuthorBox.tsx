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
    bio: 'Faizan leads growth strategy and performance marketing at Digital Point. With 8+ years in paid acquisition, he\'s helped brands scale from five-figure to seven-figure monthly ad budgets while keeping ROAS profitable.',
    expertise: ['Performance Marketing', 'Growth Strategy', 'Paid Acquisition'],
  },
  'Anwaar Tayyab': {
    name: 'Anwaar Tayyab',
    initials: 'AT',
    title: 'Co-Founder',
    bio: 'Anwaar drives analytics, attribution, and revenue operations at Digital Point. He specializes in building the data infrastructure that turns raw ad spend data into clear, actionable insights for growth teams.',
    expertise: ['Marketing Analytics', 'Attribution', 'Revenue Operations'],
  },
};

const defaultAuthor: AuthorInfo = {
  name: 'Digital Point LLC',
  initials: 'DP',
  title: 'Team',
  bio: 'The Digital Point team specializes in performance marketing, attribution, and revenue operations for growth-stage businesses. We help companies turn ad spend into predictable revenue.',
  expertise: ['Digital Marketing', 'Growth', 'Analytics'],
};

export function AuthorBox({ authorName }: { authorName?: string }) {
  const author = (authorName && authors[authorName]) || defaultAuthor;

  return (
    <div
      className="rounded-2xl p-6 md:p-8 mt-12"
      style={{
        background: '#13091e',
        border: '1px solid rgba(157, 78, 221, 0.2)',
      }}
    >
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        {/* Author avatar */}
        <div
          className="shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-display text-xl font-bold text-white"
          style={{
            background: 'linear-gradient(135deg, #9d4edd 0%, #c77dff 100%)',
          }}
          aria-hidden="true"
        >
          {author.initials}
        </div>

        {/* Author info */}
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-wider text-[#7c5a8a] mb-1">
            Written by
          </p>
          <h3 className="font-display text-lg font-semibold text-white">
            {author.name}
          </h3>
          <p className="text-[#c77dff] text-xs mb-1">{author.title}, Digital Point LLC</p>

          {/* Expertise tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {author.expertise.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{
                  background: 'rgba(199, 125, 255, 0.1)',
                  border: '1px solid rgba(199, 125, 255, 0.2)',
                  color: '#c77dff',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-[#b794c7] text-sm leading-relaxed mt-3">
            {author.bio}
          </p>

          {/* Links */}
          <div className="flex items-center gap-4 mt-4">
            <Link
              href="/about"
              className="text-[#c77dff] hover:text-[#e0aaff] text-sm font-medium transition-colors"
            >
              About Us
            </Link>
            <a
              href="https://www.linkedin.com/company/digitalpointllc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#c77dff] hover:text-[#e0aaff] text-sm font-medium transition-colors"
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
