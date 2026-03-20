"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
  timestamp: Date;
}

interface TicketForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  priority: "normal" | "high";
}

// ─── FAQ Knowledge Base ──────────────────────────────────────────────────────
const FAQ_RESPONSES: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["service", "services", "what do you do", "offer", "help with"],
    answer:
      "Digital Point LLC offers three core services:\n\n1. **Performance Marketing** — Paid acquisition across Meta, Google, LinkedIn & more. We optimize CAC, ROAS, and scale ad spend profitably.\n\n2. **Remote Workforce** — Managed remote teams for marketing ops, creative production, analytics, and execution support.\n\n3. **Systems & Reporting** — CRM optimization, marketing automation, attribution dashboards, and RevOps infrastructure.\n\nWould you like to know more about any of these?",
  },
  {
    keywords: ["pricing", "cost", "how much", "price", "rate", "budget", "affordable", "expensive"],
    answer:
      "Our pricing is customized based on scope, channels, and team size. We work with businesses of all sizes — from founder-led startups to growth-stage companies.\n\nThe best way to get a tailored quote is to book a **free growth audit** where we assess your current setup and recommend a plan.\n\nWould you like me to help you get started with an audit?",
  },
  {
    keywords: ["audit", "free audit", "growth audit", "assessment", "consultation"],
    answer:
      "Our **Free Growth Audit** is a no-obligation review of your current marketing setup. We look at:\n\n- Ad account structure & spend efficiency\n- Attribution & tracking gaps\n- Funnel conversion rates\n- Quick wins for revenue growth\n\nYou can request one directly on our website — just scroll down to the audit section or I can help you create a support ticket to get started!",
  },
  {
    keywords: ["founder", "who founded", "ceo", "owner", "faizan", "leadership", "team lead"],
    answer:
      "Digital Point LLC was founded by **M Faizan Rafiq**, a performance marketing specialist with 8+ years of experience in the digital marketing space. He leads a team of specialists across paid acquisition, creative strategy, analytics, and remote operations.\n\nThe company partners with US-based businesses while delivering from a global team.",
  },
  {
    keywords: ["contact", "reach", "email", "phone", "get in touch", "talk to someone"],
    answer:
      "You can reach Digital Point LLC through:\n\n- **Email:** hello@digitalpointllc.com\n- **Website:** digitalpointllc.com\n- **LinkedIn:** linkedin.com/company/digitalpointllc\n\nOr I can create a support ticket for you right now if you have a specific question or need!",
  },
  {
    keywords: ["location", "where", "based", "office", "country", "pakistan", "us", "united states"],
    answer:
      "Digital Point LLC operates with a **US-based business entity** and delivers through a global remote team. Our founder is based in Pakistan, and we have team members across multiple time zones to ensure seamless coverage for our clients.\n\nWe serve clients primarily in the US, UK, and globally.",
  },
  {
    keywords: ["process", "how do you work", "workflow", "onboarding", "get started", "start"],
    answer:
      "Our process is straightforward:\n\n1. **Discovery Call** — We learn about your business, goals, and current setup\n2. **Free Growth Audit** — We analyze your marketing stack and identify opportunities\n3. **Strategy & Proposal** — Custom plan tailored to your needs\n4. **Onboarding** — We set up tracking, dashboards, and campaign structures\n5. **Execution & Optimization** — Ongoing management with weekly reporting\n\nReady to start? Book a free audit!",
  },
  {
    keywords: ["remote workforce", "remote team", "outsource", "virtual team", "staff", "hire"],
    answer:
      "Our **Remote Workforce** service provides fully managed team members for:\n\n- Marketing operations & campaign management\n- Creative production (design, video, copy)\n- Data analytics & reporting\n- Customer support & admin tasks\n\nAll team members are vetted, trained, and managed by Digital Point. You get dedicated resources without the overhead of traditional hiring.",
  },
  {
    keywords: ["performance marketing", "paid ads", "advertising", "meta ads", "google ads", "ppc", "paid media"],
    answer:
      "Our **Performance Marketing** service covers:\n\n- **Meta Ads** (Facebook & Instagram)\n- **Google Ads** (Search, Display, YouTube, Shopping)\n- **LinkedIn Ads** for B2B\n- **TikTok Ads** for emerging audiences\n\nWe focus on measurable outcomes — ROAS, CAC, and revenue growth. Our team manages everything from strategy to creative to daily optimization.",
  },
  {
    keywords: ["systems", "reporting", "dashboard", "crm", "automation", "revops", "analytics", "tracking"],
    answer:
      "Our **Systems & Reporting** service includes:\n\n- CRM setup & optimization (HubSpot, Salesforce, etc.)\n- Marketing automation workflows\n- Attribution & tracking implementation\n- Custom reporting dashboards\n- RevOps infrastructure\n\nWe build the systems that give you clarity on what is working and what is not.",
  },
  {
    keywords: ["results", "case study", "roi", "success", "clients", "portfolio", "testimonial"],
    answer:
      "We have helped clients achieve significant results, including improved ROAS, reduced CAC, and scaled revenue growth. Our track record spans 8+ years with businesses across e-commerce, SaaS, and professional services.\n\nCheck out the Results section on our website for detailed metrics and client stories!",
  },
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "sup", "what's up"],
    answer:
      "Hey there! Welcome to Digital Point LLC. I am your AI assistant and I am here to help you learn about our services, answer questions, or connect you with our team.\n\nWhat can I help you with today?",
  },
  {
    keywords: ["thank", "thanks", "appreciate", "awesome", "great", "perfect"],
    answer:
      "You are welcome! If you have any other questions, feel free to ask. I am always here to help.\n\nIf you need to speak with a human, I can create a support ticket for you anytime!",
  },
  {
    keywords: ["ticket", "support ticket", "escalate", "human", "real person", "agent", "speak to someone"],
    answer:
      "I can create a support ticket for you right away! Just click the **\"Create Ticket\"** button below the chat, fill in the details, and our team will get back to you promptly.\n\n- **Normal priority** tickets go to our support team\n- **High priority** tickets go directly to our founder\n\nWould you like to create a ticket now?",
  },
];

const GREETING_MESSAGE: Message = {
  id: "greeting",
  role: "bot",
  text: "Hey! I am **Cosmo**, Digital Point's AI assistant. I can help you learn about our services, pricing, process, and more.\n\nAsk me anything or create a support ticket if you need human help!",
  timestamp: new Date(),
};

const FALLBACK_RESPONSE =
  "I am not sure I have the answer to that one! But no worries — I can create a **support ticket** for you so our team can follow up personally.\n\nJust click the **\"Create Ticket\"** button below, or try asking about our services, pricing, process, or team!";

// ─── Helper: Match FAQ ───────────────────────────────────────────────────────
function matchFAQ(input: string): string {
  const lower = input.toLowerCase().trim();

  let bestMatch: (typeof FAQ_RESPONSES)[number] | null = null;
  let bestScore = 0;

  for (const faq of FAQ_RESPONSES) {
    let score = 0;
    for (const keyword of faq.keywords) {
      if (lower.includes(keyword)) {
        score += keyword.split(" ").length; // multi-word keywords score higher
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq;
    }
  }

  return bestMatch && bestScore > 0 ? bestMatch.answer : FALLBACK_RESPONSE;
}

// ─── Simple Markdown Renderer ────────────────────────────────────────────────
function renderMarkdown(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Bold
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-plum-light font-semibold">$1</strong>');

    // Bullet points
    if (line.match(/^- /)) {
      elements.push(
        <div key={i} className="flex gap-2 ml-1">
          <span className="text-plum-light shrink-0">•</span>
          <span dangerouslySetInnerHTML={{ __html: line.slice(2) }} />
        </div>
      );
      continue;
    }

    // Numbered lists
    const numMatch = line.match(/^(\d+)\.\s/);
    if (numMatch) {
      elements.push(
        <div key={i} className="flex gap-2 ml-1">
          <span className="text-plum-light shrink-0 font-semibold">{numMatch[1]}.</span>
          <span dangerouslySetInnerHTML={{ __html: line.slice(numMatch[0].length) }} />
        </div>
      );
      continue;
    }

    // Empty lines = spacer
    if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
      continue;
    }

    // Regular text
    elements.push(
      <span key={i} dangerouslySetInnerHTML={{ __html: line }} />
    );
    if (i < lines.length - 1 && lines[i + 1].trim() !== "") {
      elements.push(<br key={`br-${i}`} />);
    }
  }

  return <>{elements}</>;
}

// ─── Robot SVG Icon ──────────────────────────────────────────────────────────
function RobotIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Antenna */}
      <circle cx="32" cy="8" r="3" fill="#c77dff" />
      <rect x="30.5" y="10" width="3" height="8" rx="1.5" fill="#9d4edd" />

      {/* Head */}
      <rect x="14" y="18" width="36" height="24" rx="8" fill="#1a0f2e" stroke="#9d4edd" strokeWidth="2" />

      {/* Eyes */}
      <circle cx="24" cy="30" r="4" fill="#c77dff">
        <animate attributeName="r" values="4;3.5;4" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="40" cy="30" r="4" fill="#c77dff">
        <animate attributeName="r" values="4;3.5;4" dur="3s" repeatCount="indefinite" begin="0.2s" />
      </circle>
      <circle cx="24" cy="29" r="1.5" fill="#fff" />
      <circle cx="40" cy="29" r="1.5" fill="#fff" />

      {/* Smile */}
      <path d="M25 36 Q32 40 39 36" stroke="#ff6b9d" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Ears / side bolts */}
      <circle cx="12" cy="30" r="3" fill="#9d4edd" />
      <circle cx="52" cy="30" r="3" fill="#9d4edd" />

      {/* Body */}
      <rect x="20" y="44" width="24" height="14" rx="4" fill="#1a0f2e" stroke="#9d4edd" strokeWidth="2" />
      <rect x="26" y="48" width="12" height="3" rx="1.5" fill="#c77dff" opacity="0.6" />
      <rect x="28" y="53" width="8" height="2" rx="1" fill="#ff6b9d" opacity="0.5" />

      {/* Rocket flame for floating effect */}
      <path d="M28 58 L32 64 L36 58" fill="#ff6b9d" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="0.6s" repeatCount="indefinite" />
      </path>
      <path d="M30 58 L32 62 L34 58" fill="#c77dff" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.2;0.5" dur="0.4s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

// ─── Typing Indicator ────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-plum-light"
          animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Quick Action Chips ──────────────────────────────────────────────────────
const QUICK_ACTIONS = [
  "What services do you offer?",
  "How does pricing work?",
  "Tell me about the team",
  "Book a free audit",
  "Create a ticket",
];

// ─── Main Component ──────────────────────────────────────────────────────────
export default function SupportChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketSubmitting, setTicketSubmitting] = useState(false);
  const [ticketSuccess, setTicketSuccess] = useState(false);
  const [ticketError, setTicketError] = useState("");
  const [ticketForm, setTicketForm] = useState<TicketForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "normal",
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !showTicketForm) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, showTicketForm]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim()) return;

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        text: text.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);

      // Check if user wants to create a ticket
      const lower = text.toLowerCase();
      if (
        lower.includes("create a ticket") ||
        lower.includes("create ticket") ||
        lower.includes("open ticket") ||
        lower.includes("make a ticket")
      ) {
        setTimeout(() => {
          setIsTyping(false);
          const botMsg: Message = {
            id: `bot-${Date.now()}`,
            role: "bot",
            text: "Sure! I will open the ticket form for you right now.",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botMsg]);
          setTimeout(() => setShowTicketForm(true), 500);
        }, 800);
        return;
      }

      // Simulate typing delay
      const delay = 600 + Math.random() * 800;
      setTimeout(() => {
        setIsTyping(false);
        const response = matchFAQ(text);
        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          role: "bot",
          text: response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
      }, delay);
    },
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitting(true);
    setTicketError("");

    try {
      const res = await fetch("/api/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticketForm),
      });

      const data = await res.json();

      if (data.success) {
        setTicketSuccess(true);
        setTicketForm({ name: "", email: "", subject: "", message: "", priority: "normal" });
        setTimeout(() => {
          setShowTicketForm(false);
          setTicketSuccess(false);
          const botMsg: Message = {
            id: `bot-${Date.now()}`,
            role: "bot",
            text: "Your ticket has been submitted successfully! Our team will get back to you soon. Is there anything else I can help you with?",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botMsg]);
        }, 2000);
      } else {
        setTicketError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setTicketError("Network error. Please check your connection and try again.");
    } finally {
      setTicketSubmitting(false);
    }
  };

  return (
    <>
      {/* ── Floating Robot Button ── */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[60] w-16 h-16 rounded-full flex items-center justify-center cursor-pointer shadow-lg shadow-plum/30 border border-border-glass pb-[env(safe-area-inset-bottom)]"
        style={{
          background: "linear-gradient(135deg, #1a0f2e 0%, #2d1b4e 100%)",
        }}
        animate={{
          y: isOpen ? 0 : [0, -8, 0],
        }}
        transition={
          isOpen
            ? { duration: 0.2 }
            : {
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }
        }
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close support chat" : "Open support chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c77dff"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.div
              key="robot"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <RobotIcon className="w-10 h-10" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glow ring */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-plum-light"
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-24 right-6 z-[60] w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-8rem)] rounded-2xl overflow-hidden flex flex-col shadow-2xl shadow-plum/20"
            style={{
              background: "rgba(13, 8, 21, 0.95)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(157, 78, 221, 0.25)",
            }}
          >
            {/* ── Header ── */}
            <div
              className="shrink-0 px-5 py-4 flex items-center gap-3"
              style={{
                background: "linear-gradient(135deg, rgba(26, 15, 46, 0.9) 0%, rgba(45, 27, 78, 0.9) 100%)",
                borderBottom: "1px solid rgba(157, 78, 221, 0.2)",
              }}
            >
              <div className="relative">
                <RobotIcon className="w-9 h-9" />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#1a0f2e]" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-text-primary font-display">
                  Cosmo — Support Bot
                </h3>
                <p className="text-xs text-text-muted">
                  Digital Point LLC
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-muted hover:text-text-primary transition-colors p-1"
                aria-label="Minimize chat"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="2" y="7" width="12" height="2" rx="1" />
                </svg>
              </button>
            </div>

            {/* ── Messages Area or Ticket Form ── */}
            <AnimatePresence mode="wait">
              {showTicketForm ? (
                <motion.div
                  key="ticket-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 overflow-y-auto custom-scrollbar p-4"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <button
                      onClick={() => {
                        setShowTicketForm(false);
                        setTicketSuccess(false);
                        setTicketError("");
                      }}
                      className="text-text-muted hover:text-text-primary transition-colors"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 4L6 10L12 16" />
                      </svg>
                    </button>
                    <h4 className="text-sm font-semibold text-text-primary font-display">
                      Create Support Ticket
                    </h4>
                  </div>

                  {ticketSuccess ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center gap-3 py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center"
                      >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </motion.div>
                      <p className="text-sm text-text-primary font-medium text-center">Ticket submitted!</p>
                      <p className="text-xs text-text-muted text-center">Our team will get back to you soon.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleTicketSubmit} className="flex flex-col gap-3">
                      <div>
                        <label className="text-xs text-text-secondary mb-1 block">Name *</label>
                        <input
                          type="text"
                          required
                          maxLength={100}
                          value={ticketForm.name}
                          onChange={(e) => setTicketForm((p) => ({ ...p, name: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg text-sm bg-surface-elevated border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-plum-light transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-text-secondary mb-1 block">Email *</label>
                        <input
                          type="email"
                          required
                          maxLength={200}
                          value={ticketForm.email}
                          onChange={(e) => setTicketForm((p) => ({ ...p, email: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg text-sm bg-surface-elevated border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-plum-light transition-colors"
                          placeholder="you@company.com"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-text-secondary mb-1 block">Subject *</label>
                        <input
                          type="text"
                          required
                          maxLength={200}
                          value={ticketForm.subject}
                          onChange={(e) => setTicketForm((p) => ({ ...p, subject: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg text-sm bg-surface-elevated border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-plum-light transition-colors"
                          placeholder="Brief description of your issue"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-text-secondary mb-1 block">Message *</label>
                        <textarea
                          required
                          maxLength={2000}
                          rows={3}
                          value={ticketForm.message}
                          onChange={(e) => setTicketForm((p) => ({ ...p, message: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg text-sm bg-surface-elevated border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-plum-light transition-colors resize-none"
                          placeholder="Tell us more about your question or issue..."
                        />
                      </div>
                      <div>
                        <label className="text-xs text-text-secondary mb-1.5 block">Priority</label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setTicketForm((p) => ({ ...p, priority: "normal" }))}
                            className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                              ticketForm.priority === "normal"
                                ? "bg-plum/20 border-plum text-plum-light"
                                : "bg-surface-elevated border-border-subtle text-text-muted hover:border-border-glass"
                            }`}
                          >
                            Normal
                          </button>
                          <button
                            type="button"
                            onClick={() => setTicketForm((p) => ({ ...p, priority: "high" }))}
                            className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                              ticketForm.priority === "high"
                                ? "bg-signal/20 border-signal text-signal"
                                : "bg-surface-elevated border-border-subtle text-text-muted hover:border-border-glass"
                            }`}
                          >
                            High Priority
                          </button>
                        </div>
                      </div>

                      {ticketError && (
                        <p className="text-xs text-red-400 bg-red-400/10 rounded-lg px-3 py-2">{ticketError}</p>
                      )}

                      <button
                        type="submit"
                        disabled={ticketSubmitting}
                        className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          background: ticketSubmitting
                            ? "rgba(157, 78, 221, 0.3)"
                            : "linear-gradient(135deg, #9d4edd 0%, #7b2cbf 100%)",
                        }}
                      >
                        {ticketSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <motion.div
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            />
                            Submitting...
                          </span>
                        ) : (
                          "Submit Ticket"
                        )}
                      </button>
                    </form>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="chat-messages"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-3"
                >
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "rounded-2xl rounded-br-md text-white"
                            : "rounded-2xl rounded-bl-md text-text-primary"
                        }`}
                        style={
                          msg.role === "user"
                            ? {
                                background: "linear-gradient(135deg, #9d4edd 0%, #7b2cbf 100%)",
                              }
                            : {
                                background: "rgba(26, 15, 46, 0.8)",
                                border: "1px solid rgba(157, 78, 221, 0.15)",
                              }
                        }
                      >
                        {renderMarkdown(msg.text)}
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div
                        className="rounded-2xl rounded-bl-md"
                        style={{
                          background: "rgba(26, 15, 46, 0.8)",
                          border: "1px solid rgba(157, 78, 221, 0.15)",
                        }}
                      >
                        <TypingIndicator />
                      </div>
                    </motion.div>
                  )}

                  {/* Quick actions (show after greeting if only 1 message) */}
                  {messages.length === 1 && !isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap gap-2 mt-1"
                    >
                      {QUICK_ACTIONS.map((action) => (
                        <button
                          key={action}
                          onClick={() => sendMessage(action)}
                          className="text-xs px-3 py-1.5 rounded-full border border-border-glass text-text-secondary hover:text-plum-light hover:border-plum/50 transition-all bg-surface-glass"
                        >
                          {action}
                        </button>
                      ))}
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Input Bar (only in chat mode) ── */}
            {!showTicketForm && (
              <div
                className="shrink-0 px-4 py-3 flex items-center gap-2"
                style={{
                  borderTop: "1px solid rgba(157, 78, 221, 0.15)",
                  background: "rgba(19, 9, 30, 0.8)",
                }}
              >
                <button
                  onClick={() => setShowTicketForm(true)}
                  className="shrink-0 p-2 rounded-lg text-text-muted hover:text-signal hover:bg-signal/10 transition-all"
                  aria-label="Create support ticket"
                  title="Create Ticket"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                </button>
                <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    maxLength={500}
                    className="flex-1 px-3 py-2 rounded-lg text-sm bg-surface-elevated border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-plum-light transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="shrink-0 p-2 rounded-lg transition-all disabled:opacity-30"
                    style={{
                      background: input.trim()
                        ? "linear-gradient(135deg, #9d4edd 0%, #7b2cbf 100%)"
                        : "transparent",
                    }}
                    aria-label="Send message"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
