---
title: "What we learned shipping a voice-AI SDR for a B2B client this month"
excerpt: "A B2B client asked us in February to replace two outsourced SDRs with a voice agent. Two months in, here is the actual data on connect rates, cost per dial, and the one rule we are not going to break again."
category: "Remote Workforce"
tags: ["voice AI", "AI SDR", "outbound sales", "B2B sales", "AI agents", "sales automation"]
date: "2026-04-28"
author: "M. Faizan Rafiq"
faqs:
  - question: "How much cheaper is a voice AI agent than a human SDR per dial?"
    answer: "On the engagement we describe in this post, the per-dial cost dropped from about $9.50 (loaded cost of two outsourced SDRs in the Philippines, including platform fees) to about $0.40 (Retell AI plus our LLM costs plus the dialer). The industry average we see across vendors in 2026 is $0.30 to $0.60 per AI call versus $7 to $12 per human-dialed call. The dial-cost ratio is real and large. Cost per booked meeting is the more honest metric, and that ratio is smaller than the per-dial number suggests because human SDRs convert engaged prospects at a higher rate."
  - question: "What can voice AI agents NOT do well in outbound yet?"
    answer: "Three categories. First, anything that requires multi-turn judgment about a complex objection. If a prospect says 'we tried something like this two years ago and it failed', a voice agent will rarely recover the call. Second, complex scheduling that involves multiple stakeholders or specific time-zone juggling. Voice agents handle simple booking well. Three-party coordination is still hand-off territory. Third, emotional read. The human SDR who hears the prospect getting irritated and pivots is doing something current voice agents do not yet do reliably. We use AI for volume and qualification, and we hand off engaged prospects to a human within minutes."
  - question: "How do you handle compliance for voice AI outbound calls?"
    answer: "Three things, all non-negotiable. First, the agent identifies as AI in the first ten seconds of every call. We test this monthly to make sure no prompt drift breaks it. Second, we honor do-not-call and revoked consent at the dialer level, not the agent level, so a single missed disclosure cannot keep a number in rotation. Third, we record only what the prospect explicitly consents to record, and we store transcripts encrypted with retention rules that match the client's industry (HIPAA-flavored for healthcare, lighter for general B2B SaaS). Most state laws in the US still treat AI-disclosed calls as legitimate, but the line moves quickly. We re-check the legal posture every quarter."
---

A client signed with us at the end of February. Two outsourced SDRs in the Philippines, $4,200 a month combined including the dialer and the platform overhead, hitting about 850 dials a week between them and booking around 14 meetings a month. They asked us a direct question. Could we replace the human team with a voice AI and save money without tanking the pipeline?

We took the project on the condition that we would publish what happened, good or bad. This is what we have, two months in.

## The setup

We built the agent on Retell AI with a Llama 3.3 70B prompt running through Groq for speed (the response latency is the difference between a call that feels human and one that feels robotic, and Groq is the only inference provider where we consistently land under 400ms first-token in production). The dialer was a Twilio integration we already had on the shelf. Lead list came from the client's existing Apollo seat, scoped to one ICP segment so we could measure cleanly.

The script went through four revisions before we shipped. Version one tried to do too much. The agent was supposed to qualify, handle objections, pitch the demo, and book. We had it doing all of that by week two and the booked-meeting rate was terrible. Version four narrowed the scope to qualify and book. If the prospect engaged, we routed them to a human in under three minutes via Slack ping plus a hot transfer to the client's AE. That change alone roughly doubled the booked-meeting conversion rate.

Compliance setup, in case it matters for your read: AI disclosure in the first ten seconds of every call (we tested it weekly), recording with consent only, do-not-call honored at the dialer layer, transcripts retained 90 days. The client is in B2B SaaS, not regulated, so the lift here was lighter than what we did for a healthcare engagement last year.

## What week one looked like

We launched on a Tuesday. By Friday we had run 1,140 dials and the data looked weird.

Connect rate was 31 percent, higher than the human team's 24 percent baseline. We think this is partly because the agent dials on a tighter schedule than humans (no coffee breaks, no end-of-day fatigue), and partly because some prospects who would not pick up for an unknown human number were curious enough to answer once they realized something different was happening on the line.

Conversation length averaged 47 seconds. Of those, about 18 percent ended with a "not interested" before the agent could complete its qualification check. That is high, and it told us version one of the prompt was leading too hard with the pitch instead of opening with a relevant observation about the prospect's company. We rewrote the opening to reference one specific data point from the lead's LinkedIn profile or company page, which the agent fetched from a small enrichment step before each call. Hang-up rate dropped to 11 percent the next week.

Booked meetings in week one: three. Two of them showed up. One of those two became a closed deal six weeks later. Not a stellar week one but not a disaster either.

## The cost math

Here is the actual line item, monthly, after eight weeks of running:

Retell AI subscription plus call minutes: $720
Groq inference for 13,400 calls (the agent uses about 3,200 tokens per call on average): $382
Twilio dialer minutes and number rentals: $290
Apollo data and enrichment hits: $480
Our managed-service fee: $2,800

Total: $4,672 a month.

That is slightly more than the $4,200 the client was paying for two human SDRs. We were upfront about that going in. The math that mattered was per-dial cost ($0.40 versus $9.50) and per-meeting cost. The agent booked 27 meetings in month one and 31 in month two. The human team had been booking 14 a month. So the cost per booked meeting dropped from roughly $300 to roughly $151. Pipeline coverage almost doubled. The client wrote about that yesterday on their internal Slack and forwarded it to us.

The broader industry numbers we have seen quoted in 2026 reports (3 to 5 times more conversations per rep, 40 to 60 percent reductions in cost per qualified lead) are roughly in line with what we measured, which surprised us slightly. Our default assumption with vendor-published numbers is that they are picked from the high end of the distribution.

## What we got wrong

Three things, in order of how much they hurt.

We underestimated how much the human hand-off mattered. The first version of the workflow let the agent attempt to book a meeting directly using the calendar tool. That worked technically. It also produced a 40 percent meeting no-show rate. When we changed it so the agent qualified and then routed to a live human within three minutes if the prospect was warm, no-shows dropped to 18 percent. The lesson is that prospects who agree to a meeting with an AI feel less bound to attend than prospects who confirm a meeting with a human voice in real time. We did not see that coming.

We tried to skip the dialer layer. Early on we let the agent place outbound calls directly through Retell's native dialing without going through our Twilio dialer. It was simpler to set up. It also meant we lost some of the call-quality controls and the unified do-not-call list management that the dialer gives you. We moved back to dialer-fronted calling in week three.

We did not budget enough for prompt iteration. We had four prompt revisions in eight weeks, and each one took about six hours of QA work to test against the prior week's call recordings. That is real time, and we had not scoped it properly. Going forward we are quoting voice-AI builds with explicit prompt-iteration hours baked in.

## What we would skip if we did it again

We would skip trying to make the agent handle nuanced objection handling. Objections about pricing and fit are still humans-only territory in our current opinion. The agent's job is to find the prospects who are warm enough to want to talk to a human, fast. That is it.

We would also skip the "let the AI do the whole call" benchmark. There is a press cycle around fully autonomous voice agents closing meetings and even sometimes closing deals. We have not seen this work reliably in B2B yet, and we have tested it on three engagements now. The math gets dramatically better when AI handles volume and humans handle depth. We are not the first to say this. We think it will keep being true through this year and probably next.

The client renewed for six months last week. We are about to add a second segment to the agent's scope and start an A/B test against the same prompt running on a different model. If you want to see the numbers when we have them, the next post will probably be in July.
