// Analytics helper for tracking events
// Can be connected to GA4, Mixpanel, or any analytics provider

// Page names for analytics (previously in navigation.ts)
export const pageNames: Record<string, string> = {
  '/': 'Home',
  '/performance-marketing': 'Performance Marketing',
  '/remote-workforce': 'Remote Workforce',
  '/systems-reporting': 'Systems & Reporting',
  '/results': 'Results',
  '/free-growth-audit': 'Free Growth Audit',
};

type EventName =
  | 'page_view'
  | 'cta_click'
  | 'service_card_click'
  | 'case_study_open'
  | 'audit_form_start'
  | 'audit_form_submit'
  | 'audit_form_submit_success'
  | 'audit_form_error'
  | 'navigation_click'
  | 'outbound_click'
  | 'scroll_milestone'
  | 'form_step';

interface EventData {
  [key: string]: string | number | boolean | undefined;
}

// Track event - client-side
export function trackEvent(eventName: EventName, data?: EventData) {
  if (typeof window === 'undefined') return;
  
  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', eventName, {
      ...data,
      timestamp: new Date().toISOString(),
    });
  }
  
  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', eventName, data);
  }
  
  // Post to internal analytics endpoint (if you have one)
  // fetch('/api/analytics', { method: 'POST', body: JSON.stringify({ event: eventName, data }) });
}

// Track page view
export function trackPageView(pageName: string) {
  trackEvent('page_view', { page_name: pageName });
}

// Track CTA click
export function trackCTAClick(ctaName: string, destination?: string) {
  trackEvent('cta_click', { cta_name: ctaName, destination });
}

// Track service card click
export function trackServiceCardClick(service: string) {
  trackEvent('service_card_click', { service });
}

// Track case study open
export function trackCaseStudyOpen(caseStudyId: number, category: string) {
  trackEvent('case_study_open', { case_study_id: caseStudyId, category });
}

// Track form start
export function trackFormStart(formName: string) {
  trackEvent('audit_form_start', { form_name: formName });
}

// Track form submit
export function trackFormSubmit(formName: string) {
  trackEvent('audit_form_submit', { form_name: formName });
}

// Track form success
export function trackFormSuccess(formName: string) {
  trackEvent('audit_form_submit_success', { form_name: formName });
}

// Track form error
export function trackFormError(formName: string, errorType: string) {
  trackEvent('audit_form_error', { form_name: formName, error_type: errorType });
}

// Track scroll milestone
export function trackScrollMilestone(percentage: number) {
  trackEvent('scroll_milestone', { percentage });
}

// Declare gtag on window
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}
