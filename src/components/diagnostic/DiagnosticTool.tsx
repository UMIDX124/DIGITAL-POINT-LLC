'use client';

import { useState } from 'react';
import Link from 'next/link';

type Answer = 'yes' | 'partial' | 'no';

type Question = {
  id: string;
  category: string;
  text: string;
  why: string;
};

const questions: Question[] = [
  {
    id: 'observability',
    category: 'Observability',
    text: 'Can you see every agent decision in real time, with PII redacted?',
    why: 'Without per-decision logs, drift and silent failures go invisible until cost or quality breaks.',
  },
  {
    id: 'retry-logic',
    category: 'Retry logic',
    text: 'Do you have exponential backoff + a dead-letter queue for failed tool calls?',
    why: 'Naive retries amplify outages and cost. Production agents need a controlled failure path.',
  },
  {
    id: 'drift-detection',
    category: 'Drift detection',
    text: 'Are you measuring output quality over time against a baseline?',
    why: 'Models shift, prompts age, vendors change defaults. Without baselining you cannot prove regression.',
  },
  {
    id: 'prompt-injection',
    category: 'Prompt injection',
    text: 'Are user-supplied inputs sanitized, and outputs guarded against tool-call hallucinations?',
    why: 'A pasted instruction can hijack an agent into leaking data or running unintended tools.',
  },
  {
    id: 'cost-guardrails',
    category: 'Cost guardrails',
    text: 'Is there a per-task cost ceiling that kills a runaway loop?',
    why: 'A single retry loop on an LLM can burn the monthly budget in hours without a kill-switch.',
  },
  {
    id: 'escalation',
    category: 'Escalation',
    text: 'When the agent cannot resolve a case, does it escalate to a named human within an SLA?',
    why: 'Production agents need a graceful handoff. Silent failure to user is worse than a slow human reply.',
  },
  {
    id: 'rollback',
    category: 'Rollback',
    text: 'Can you revert to the last-known-good prompt + tool config in under 5 minutes?',
    why: 'Hotfixes happen. Without versioned config you spend hours diagnosing instead of rolling back.',
  },
  {
    id: 'data-scope',
    category: 'Data scope',
    text: 'Does the agent run with read-only or least-privilege credentials by default?',
    why: 'Most agents inherit too much access. Scope creep is how a one-shot bug becomes a data incident.',
  },
  {
    id: 'evals',
    category: 'Evals',
    text: 'Do you run a fixed eval suite before every prompt or model change?',
    why: 'Without evals you cannot tell whether a tweak helped, hurt, or broke an edge case silently.',
  },
  {
    id: 'runbook',
    category: 'Runbook',
    text: 'Is there a written runbook a new operator can follow at 2 a.m. without paging you?',
    why: 'A workflow only one person understands is a single point of failure with no SLA.',
  },
];

const weights: Record<Answer, number> = { yes: 3, partial: 1, no: 0 };
const maxScore = questions.length * 3;

export function DiagnosticTool() {
  const [answers, setAnswers] = useState<Record<string, Answer | undefined>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = Object.values(answers).reduce(
    (acc, a) => acc + (a ? weights[a] : 0),
    0
  );
  const answered = Object.values(answers).filter(Boolean).length;
  const percent = Math.round((score / maxScore) * 100);

  const verdict =
    score >= 27
      ? {
          label: 'Production-grade',
          tone: 'success',
          body: 'Your agent stack is in the top tier. The remaining gaps are worth tracking but you are not in crisis territory. We are happy to vet any one specific area you want a second opinion on.',
        }
      : score >= 18
      ? {
          label: 'At risk',
          tone: 'warn',
          body: 'Most of the production gates are partially covered, but a single failure mode (drift, cost, prompt-injection, or rollback) can take you down. A 2-week diagnosis pinpoints which one is closest to breaking.',
        }
      : {
          label: 'Will break in production',
          tone: 'error',
          body: 'Your agent is missing more than half of the production safety gates we audit. This is the profile that becomes the 3 a.m. incident. Recovery starts with diagnosis: $5,000, 2 weeks, written report, walkthrough call.',
        };

  const gaps = questions.filter((q) => answers[q.id] !== 'yes');

  if (submitted) {
    return (
      <div className="container-wide" style={{ paddingBlock: '4rem' }}>
        <div style={{ maxWidth: '52rem' }}>
          <p className="eyebrow eyebrow--accent">Result · {verdict.label}</p>
          <h2
            className="section-title"
            style={{
              marginBlockStart: '0.75rem',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            }}
          >
            <span style={{ color: 'var(--color-accent)' }}>
              {score}
              <span style={{ color: 'var(--color-text-tertiary)' }}>/{maxScore}</span>
            </span>{' '}
            production-readiness
          </h2>
          <p
            className="section-desc"
            style={{ marginBlockStart: '1rem', maxWidth: '46rem' }}
          >
            {verdict.body}
          </p>

          <div
            style={{
              marginBlockStart: '2rem',
              padding: '1.5rem',
              border: '1px solid var(--color-line-faint)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--color-canvas-raised)',
            }}
          >
            <p
              className="font-mono"
              style={{
                fontSize: '0.6875rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-text-tertiary)',
              }}
            >
              Score breakdown
            </p>
            <p
              className="font-mono"
              style={{
                marginBlockStart: '0.5rem',
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--text-sm)',
              }}
            >
              {answered} of {questions.length} answered · {percent}% covered
            </p>
            <div
              style={{
                marginBlockStart: '0.75rem',
                height: 6,
                background: 'var(--color-line-faint)',
                borderRadius: 'var(--radius-pill)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${percent}%`,
                  height: '100%',
                  background: 'var(--color-accent)',
                  borderRadius: 'var(--radius-pill)',
                  transition: 'width 0.6s var(--ease-out)',
                }}
              />
            </div>
          </div>

          {gaps.length > 0 ? (
            <div style={{ marginBlockStart: '2.5rem' }}>
              <p
                className="font-mono"
                style={{
                  fontSize: '0.6875rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-tertiary)',
                  marginBlockEnd: '1rem',
                }}
              >
                Gaps to close ({gaps.length})
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                {gaps.map((g) => (
                  <li
                    key={g.id}
                    style={{
                      padding: '1rem 1.25rem',
                      border: '1px solid var(--color-line-faint)',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-canvas-raised)',
                    }}
                  >
                    <span
                      className="font-mono"
                      style={{
                        color: 'var(--color-accent)',
                        fontSize: '0.6875rem',
                        letterSpacing: '0.12em',
                      }}
                    >
                      {g.category.toUpperCase()}
                    </span>
                    <p
                      style={{
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--text-md)',
                        marginBlockStart: '0.25rem',
                      }}
                    >
                      {g.text}
                    </p>
                    <p
                      style={{
                        color: 'var(--color-text-tertiary)',
                        fontSize: 'var(--text-sm)',
                        marginBlockStart: '0.5rem',
                        lineHeight: 1.6,
                      }}
                    >
                      {g.why}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div
            className="hero-cta-row"
            style={{ marginBlockStart: '3rem', justifyContent: 'flex-start' }}
          >
            <Link href="/recovery" className="dpl-btn dpl-btn--ink">
              Start a recovery diagnosis
            </Link>
            <button
              type="button"
              className="dpl-btn dpl-btn--ghost"
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              Retake the diagnostic
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-wide" style={{ paddingBlock: '4rem' }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        style={{ maxWidth: '52rem' }}
      >
        <p
          className="font-mono"
          style={{
            fontSize: '0.6875rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--color-text-tertiary)',
          }}
        >
          {answered} / {questions.length} answered
        </p>
        <div
          style={{
            marginBlockStart: '0.75rem',
            height: 4,
            background: 'var(--color-line-faint)',
            borderRadius: 'var(--radius-pill)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${(answered / questions.length) * 100}%`,
              height: '100%',
              background: 'var(--color-accent)',
              borderRadius: 'var(--radius-pill)',
              transition: 'width 0.4s var(--ease-out)',
            }}
          />
        </div>

        <ol
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '2.5rem 0 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {questions.map((q, i) => (
            <li
              key={q.id}
              style={{
                padding: '1.5rem',
                border: '1px solid var(--color-line-faint)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-canvas-raised)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', gap: '0.875rem' }}>
                <span
                  className="font-mono"
                  style={{
                    color: 'var(--color-accent)',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.16em',
                    minWidth: '2rem',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div style={{ flex: 1 }}>
                  <span
                    className="font-mono"
                    style={{
                      color: 'var(--color-text-tertiary)',
                      fontSize: '0.6875rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {q.category}
                  </span>
                  <p
                    style={{
                      color: 'var(--color-text-primary)',
                      fontSize: 'var(--text-md)',
                      lineHeight: 1.5,
                      marginBlockStart: '0.25rem',
                    }}
                  >
                    {q.text}
                  </p>
                </div>
              </div>

              <div
                role="radiogroup"
                aria-label={q.text}
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                  marginInlineStart: '2.875rem',
                }}
              >
                {(['yes', 'partial', 'no'] as Answer[]).map((opt) => {
                  const selected = answers[q.id] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() =>
                        setAnswers((prev) => ({ ...prev, [q.id]: opt }))
                      }
                      style={{
                        padding: '0.5rem 0.875rem',
                        borderRadius: 'var(--radius-md)',
                        border: `1px solid ${
                          selected
                            ? 'var(--color-accent)'
                            : 'var(--color-line-soft)'
                        }`,
                        background: selected
                          ? 'var(--color-accent-faint)'
                          : 'transparent',
                        color: selected
                          ? 'var(--color-accent)'
                          : 'var(--color-text-secondary)',
                        fontSize: 'var(--text-sm)',
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition:
                          'background 0.16s var(--ease-out), color 0.16s var(--ease-out), border-color 0.16s var(--ease-out)',
                      }}
                    >
                      {opt === 'yes' ? 'Yes' : opt === 'partial' ? 'Partial' : 'No'}
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ol>

        <div
          className="hero-cta-row"
          style={{ marginBlockStart: '2.5rem', justifyContent: 'flex-start' }}
        >
          <button
            type="submit"
            className="dpl-btn dpl-btn--ink"
            disabled={answered === 0}
            style={{
              opacity: answered === 0 ? 0.5 : 1,
              cursor: answered === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            Score my agent
          </button>
          <p className="hero-microcopy" style={{ marginBlockStart: 0 }}>
            No email required · Result stays in your browser
          </p>
        </div>
      </form>
    </div>
  );
}

export default DiagnosticTool;
