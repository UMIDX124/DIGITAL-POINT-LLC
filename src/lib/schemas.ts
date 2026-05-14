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

/**
 * Chat request schema accepts two payload shapes:
 *
 * 1. Legacy `{ messages: [{ role, content }] }` — the pre-X3 client used
 *    plain role/content tuples. Kept so existing callers keep working.
 * 2. AI SDK v6 UIMessage `{ id?, role, parts: [{ type: 'text', text }] }`
 *    — what useChat in X5 sends. The route normalizes to ModelMessages
 *    via convertToModelMessages at handle time, so the schema only needs
 *    to accept a permissive shape.
 *
 * `currentPath` lets the system prompt tailor itself to the page where
 * the panel was opened.
 */
const ChatPart = z.object({
  type: z.literal('text'),
  text: z.string().trim().min(1).max(4000),
});

const ChatMessageInput = z.union([
  z.object({
    id: z.string().max(120).optional(),
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().trim().min(1).max(4000),
  }),
  z.object({
    id: z.string().max(120).optional(),
    role: z.enum(['user', 'assistant', 'system']),
    parts: z.array(ChatPart).min(1).max(20),
  }),
]);

export const ChatRequestSchema = z.object({
  messages: z.array(ChatMessageInput).min(1).max(50),
  currentPath: z.string().trim().max(200).optional(),
});
export type ChatRequest = z.infer<typeof ChatRequestSchema>;

export const SupportTicketSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: z.string().trim().min(1).max(200),
  message: messageSchema,
  priority: z.enum(['normal', 'high']).default('normal'),
});
export type SupportTicketInput = z.infer<typeof SupportTicketSchema>;

export const NewsletterSchema = z.object({
  email: emailSchema,
  name: z.string().trim().max(200).optional(),
  source: optionalShortString,
});
export type NewsletterInput = z.infer<typeof NewsletterSchema>;

export const IndexNowRequestSchema = z.object({
  urls: z.array(z.string().url().max(2048)).min(1).max(10000),
});
export type IndexNowRequest = z.infer<typeof IndexNowRequestSchema>;

export const SubmissionsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).max(10000).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});
export type SubmissionsQuery = z.infer<typeof SubmissionsQuerySchema>;

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
