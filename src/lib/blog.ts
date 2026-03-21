import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  tags: string[];
  date: string;
  lastModified?: string;
  author: string;
  readTime: string;
  image?: string;
  featured?: boolean;
  faqs?: { question: string; answer: string }[];
}

export type BlogCategory =
  | 'Marketing Attribution'
  | 'Paid Ads Benchmarks'
  | 'CAC ROAS Optimization'
  | 'Marketing Analytics'
  | 'Remote Workforce'
  | 'Growth Systems';

export const categoryMeta: Record<BlogCategory, { color: string; slug: string; description: string }> = {
  'Marketing Attribution': {
    color: '#c77dff',
    slug: 'marketing-attribution',
    description: 'Multi-touch attribution, tracking models, and measurement frameworks for modern marketers.',
  },
  'Paid Ads Benchmarks': {
    color: '#ff6b9d',
    slug: 'paid-ads-benchmarks',
    description: 'Industry benchmarks for CPC, CPM, CTR, ROAS, and conversion rates across ad platforms.',
  },
  'CAC ROAS Optimization': {
    color: '#a3e635',
    slug: 'cac-roas-optimization',
    description: 'Strategies to reduce customer acquisition cost and maximize return on ad spend.',
  },
  'Marketing Analytics': {
    color: '#7dd3fc',
    slug: 'marketing-analytics',
    description: 'Dashboards, KPIs, data infrastructure, and analytics tools for growth teams.',
  },
  'Remote Workforce': {
    color: '#fbbf24',
    slug: 'remote-workforce',
    description: 'Building, managing, and scaling high-performance remote marketing teams.',
  },
  'Growth Systems': {
    color: '#f472b6',
    slug: 'growth-systems',
    description: 'RevOps, automation, CRM, and operational systems that scale with your business.',
  },
};

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

  const posts = files
    .map((file) => {
      const slug = file.replace(/\.(md|mdx)$/, '');
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
      const { data, content } = matter(raw);
      const stats = readingTime(content);

      return {
        slug,
        title: data.title || slug,
        excerpt: data.excerpt || content.slice(0, 160).replace(/[#*_\n]/g, '').trim() + '...',
        content,
        category: data.category || 'Growth Systems',
        tags: data.tags || [],
        date: data.date || new Date().toISOString().split('T')[0],
        lastModified: data.lastModified,
        author: data.author || 'Digital Point LLC',
        readTime: stats.text,
        image: data.image,
        featured: data.featured || false,
        faqs: data.faqs,
      } as BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getAllCategories(): { name: BlogCategory; count: number }[] {
  const posts = getAllPosts();
  const counts: Partial<Record<BlogCategory, number>> = {};
  posts.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });
  return Object.entries(counts).map(([name, count]) => ({
    name: name as BlogCategory,
    count: count as number,
  }));
}

// Generate table of contents from markdown headings
export function generateTOC(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: { id: string; text: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[*_`]/g, '');
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    toc.push({ id, text, level });
  }

  return toc;
}

// Simple markdown to HTML (basic - headings, bold, lists, links, paragraphs)
export function markdownToHtml(content: string): string {
  let html = content
    // Headings with IDs for TOC linking
    .replace(/^### (.+)$/gm, (_, text) => {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return `<h3 id="${id}">${text}</h3>`;
    })
    .replace(/^## (.+)$/gm, (_, text) => {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return `<h2 id="${id}">${text}</h2>`;
    })
    // Bold and italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[#c77dff] hover:text-[#e0aaff] underline">$1</a>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Numbered lists
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr class="border-[rgba(157,78,221,0.15)] my-8" />')
    // Code blocks
    .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 rounded bg-[rgba(157,78,221,0.15)] text-[#e0aaff] text-sm font-mono">$1</code>');

  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul class="list-disc pl-6 space-y-2 text-[#b794c7]">$1</ul>');

  // Wrap remaining text lines in <p>
  html = html
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<')) return trimmed;
      return `<p>${trimmed}</p>`;
    })
    .join('\n');

  return html;
}
