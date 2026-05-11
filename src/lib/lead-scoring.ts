export interface LeadSignals {
  company?: string | null;
  phone?: string | null;
  interest?: string | null;
  conversationSummary?: string | null;
}

export function computeLeadQualityScore(signals: LeadSignals): number {
  let score = 0;
  if (signals.company && signals.company.trim().length > 0) score += 20;
  if (signals.phone && signals.phone.trim().length > 0) score += 20;
  if (signals.interest && signals.interest.trim().toLowerCase() === 'audit') score += 30;
  if (signals.conversationSummary && signals.conversationSummary.length > 200) score += 30;
  return Math.min(score, 100);
}
