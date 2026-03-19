// Shared navigation types

export type PageRoute = 'home' | 'performance-marketing' | 'remote-workforce' | 'systems-reporting' | 'results' | 'free-growth-audit';

export interface NavigationItem {
  name: string;
  href: PageRoute;
}

export interface NavigationContextType {
  currentPage: PageRoute;
  navigateTo: (page: PageRoute) => void;
}

// Path to page mapping
export const pathToPage: Record<string, PageRoute> = {
  '/': 'home',
  '/performance-marketing': 'performance-marketing',
  '/remote-workforce': 'remote-workforce',
  '/systems-reporting': 'systems-reporting',
  '/results': 'results',
  '/free-growth-audit': 'free-growth-audit',
};

// Page to path mapping
export const pageToPath: Record<PageRoute, string> = {
  'home': '/',
  'performance-marketing': '/performance-marketing',
  'remote-workforce': '/remote-workforce',
  'systems-reporting': '/systems-reporting',
  'results': '/results',
  'free-growth-audit': '/free-growth-audit',
};

// Page names for analytics
export const pageNames: Record<PageRoute, string> = {
  'home': 'Home',
  'performance-marketing': 'Performance Marketing',
  'remote-workforce': 'Remote Workforce',
  'systems-reporting': 'Systems & Reporting',
  'results': 'Results',
  'free-growth-audit': 'Free Growth Audit',
};
