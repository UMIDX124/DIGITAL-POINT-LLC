'use client';

import { useState, useEffect, createContext, useContext, useMemo, useCallback } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { PillarsSection } from '@/components/sections/PillarsSection';
import { ProofSection } from '@/components/sections/ProofSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { FounderFormSection } from '@/components/sections/FounderFormSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';
import { SystemSection } from '@/components/sections/SystemSection';
import { PerformanceMarketingPage } from '@/components/sections/PerformanceMarketingPage';
import { RemoteWorkforcePage } from '@/components/sections/RemoteWorkforcePage';
import { SystemsReportingPage } from '@/components/sections/SystemsReportingPage';
import { ResultsPage } from '@/components/sections/ResultsPage';
import { AuditPage } from '@/components/sections/AuditPage';
import { trackPageView } from '@/lib/analytics';
import type { PageRoute } from '@/types/navigation';
import { pathToPage, pageToPath, pageNames } from '@/types/navigation';

interface NavigationContextType {
  currentPage: PageRoute;
  navigateTo: (page: PageRoute) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const defaultNav: NavigationContextType = { currentPage: 'home', navigateTo: () => {} };

export function useNavigation() {
  return useContext(NavigationContext) ?? defaultNav;
}

// Pre-computed star positions (deterministic to avoid hydration mismatch)
const starPositions = Array.from({ length: 60 }, (_, i) => ({
  top: ((i * 17 + 7) % 100),
  left: ((i * 23 + 13) % 100),
  delay: (i % 5),
  duration: 2 + (i % 3),
}));

// Page Content Router
function PageContent({ currentPage }: { currentPage: PageRoute }) {
  switch (currentPage) {
    case 'performance-marketing':
      return <PerformanceMarketingPage />;
    case 'remote-workforce':
      return <RemoteWorkforcePage />;
    case 'systems-reporting':
      return <SystemsReportingPage />;
    case 'results':
      return <ResultsPage />;
    case 'free-growth-audit':
      return <AuditPage />;
    default:
      return (
        <>
          <HeroSection />
          <ProcessSection />
          <SystemSection />
          <ProofSection />
          <ProblemSection />
          <PillarsSection />
          <TestimonialsSection />
          <FounderFormSection />
          <FAQSection />
          <CTASection />
        </>
      );
  }
}

// Main App
export default function Home() {
  // Initialize from URL - lazy init function runs once on mount
  const [currentPage, setCurrentPage] = useState<PageRoute>(() => {
    if (typeof window === 'undefined') return 'home';
    return pathToPage[window.location.pathname] || 'home';
  });

  // Navigation function
  const navigateTo = useCallback((page: PageRoute) => {
    setCurrentPage(page);
    window.history.pushState({}, '', pageToPath[page]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackPageView(pageNames[page]);
  }, []);

  // Track initial page view
  useEffect(() => {
    trackPageView(pageNames[currentPage]);
  }, []);

  // Subscribe to browser navigation events
  useEffect(() => {
    const handlePopState = () => {
      const page = pathToPage[window.location.pathname] || 'home';
      setCurrentPage(page);
      trackPageView(pageNames[page]);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const contextValue = useMemo(() => ({ currentPage, navigateTo }), [currentPage, navigateTo]);

  return (
    <NavigationContext.Provider value={contextValue}>
      <div 
        className="relative min-h-screen flex flex-col"
        style={{ background: 'linear-gradient(180deg, #0d0815 0%, #080510 100%)' }}
      >
        {/* Cosmic background */}
        <div 
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(157, 78, 221, 0.08) 0%, transparent 50%)',
          }}
        />
        
        {/* Stars background - using pre-computed positions */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
          {starPositions.map((star, i) => (
            <div
              key={i}
              className="absolute w-px h-px bg-white rounded-full animate-twinkle"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ))}
        </div>
        
        {/* Main content wrapper */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1">
            <PageContent currentPage={currentPage} />
          </main>
          <Footer />
        </div>
      </div>
    </NavigationContext.Provider>
  );
}
