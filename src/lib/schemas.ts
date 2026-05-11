import { z } from 'zod';

export const LeadSubmissionSchema = z.object({
  sessionId: z.string().min(1),
  name: z.string().max(200).optional(),
  email: z.email().max(320).optional(),
  company: z.string().max(200).optional(),
  phone: z.string().max(50).optional(),
  interest: z.string().max(200).optional(),
  conversationSummary: z.string().max(20000).optional(),
});

export type LeadSubmission = z.infer<typeof LeadSubmissionSchema>;
