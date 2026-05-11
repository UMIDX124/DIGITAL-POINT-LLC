import { z } from 'zod';

export const emailSchema = z.string().trim().max(254).email();
export const nameSchema = z.string().trim().min(1).max(120);
export const messageSchema = z.string().trim().min(1).max(5000);
export const optionalShortString = z.string().trim().max(500).optional();

export const utmFields = z
  .object({
    utmSource: optionalShortString,
    utmMedium: optionalShortString,
    utmCampaign: optionalShortString,
  })
  .partial()
  .optional();

export const LeadSubmissionSchema = z.object({
  sessionId: z.string().min(1),
  name: z.string().trim().max(200).optional(),
  email: emailSchema.optional(),
  company: z.string().trim().max(200).optional(),
  phone: z.string().trim().max(50).optional(),
  interest: z.string().trim().max(200).optional(),
  conversationSummary: z.string().trim().max(20000).optional(),
});
export type LeadSubmission = z.infer<typeof LeadSubmissionSchema>;

export const FounderSubmissionSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  message: z.string().trim().min(10).max(5000),
  utmSource: optionalShortString,
  utmMedium: optionalShortString,
  utmCampaign: optionalShortString,
});
export type FounderSubmission = z.infer<typeof FounderSubmissionSchema>;

export const ChatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().trim().min(1).max(2000),
      })
    )
    .min(1)
    .max(50),
});
export type ChatRequest = z.infer<typeof ChatRequestSchema>;

export const AuditSubmissionSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  bottleneck: messageSchema,
  company: optionalShortString,
  website: optionalShortString,
  businessType: optionalShortString,
  adSpend: optionalShortString,
  teamSize: optionalShortString,
  services: z.array(z.string().trim().max(120)).max(20).optional(),
  notes: z.string().trim().max(5000).optional(),
  utmSource: optionalShortString,
  utmMedium: optionalShortString,
  utmCampaign: optionalShortString,
});
export type AuditSubmission = z.infer<typeof AuditSubmissionSchema>;
