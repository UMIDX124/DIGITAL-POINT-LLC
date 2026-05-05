---
title: "Your Google traffic is fine. Your ChatGPT traffic is the new variable."
excerpt: "We pulled analytics for ten clients last week and found something we did not expect. AI-engine referer traffic is now showing up in measurable volume, and the rules for getting cited are not the same rules that win Google."
category: "Marketing Analytics"
tags: ["GEO", "generative engine optimization", "AI search", "ChatGPT traffic", "AEO", "answer engine optimization"]
date: "2026-04-28"
author: "Anwaar Tayyab"
faqs:
  - question: "Is GEO the same thing as SEO with new keywords?"
    answer: "No, and treating it that way is what most teams are getting wrong. Traditional SEO optimizes for crawlers ranking pages against a keyword query. Generative engine optimization (GEO) optimizes for an LLM that has already decomposed your prospect's question into smaller sub-queries, pulled multiple sources, and is now choosing which ones to cite in a synthesized answer. The page that wins on Google has a strong title tag, dense keyword targeting, and a high-authority backlink profile. The page that gets cited by ChatGPT has direct, extractable answers near the top, structured data the model can lift, and presence on platforms the model trusts (Reddit, Wikipedia, LinkedIn, G2, depending on the engine). The overlap between the two used to be high. In 2026 it is not."
  - question: "Which AI engines should I optimize for first?"
    answer: "Look at your actual referer logs before you decide. We have seen the mix vary wildly by industry. B2B SaaS clients usually see ChatGPT and Perplexity dominate their AI-driven traffic, with Gemini a distant third. Consumer ecommerce sees more Gemini and Bing Copilot share. Each engine pulls from different platforms, so the optimization moves are not the same. ChatGPT cites Reddit and Wikipedia heavily. Perplexity cites Reddit, LinkedIn, and G2. If you are picking one to start, check which one is already sending you traffic and double down there before chasing the others."
  - question: "How do I measure GEO performance if AI engines do not always pass referers?"
    answer: "You need three sources of truth, not one. First, your analytics platform's referer data, which catches the engines that do pass it (chat.openai.com, perplexity.ai, gemini.google.com, etc). Second, brand-monitoring tools that query the AI engines directly with prompts your prospects might use, then log whether your site is cited (Profound, Brandlight, and Scrunch all do this in 2026). Third, qualitative signal from your sales calls. Ask new prospects how they found you. The answer 'I asked ChatGPT' has gone from anomaly to common in twelve months."
---

We pulled analytics for ten clients on Monday morning. Half of them had measurable referer traffic from chatgpt.com or perplexity.ai. Two had over 5 percent of new sessions coming from one of those sources. None of them had a content strategy that targeted those engines on purpose.

That is a real change from a year ago, and it is the reason GEO is not a buzzword anymore.

## What changed

The argument that "AI engines just send traffic to whoever ranks on Google" was true in 2023. It is not true now. Brandlight published research earlier in 2026 showing the overlap between top Google links and AI-cited sources has dropped from 70 percent to under 20 percent. We have seen this on client accounts where a page sits at position 14 on Google but gets cited verbatim in a ChatGPT answer for the same query. And the reverse, where a page-one Google result never shows up in any AI answer at all.

The reason is structural. A traditional search engine ranks documents against a query. An LLM decomposes the query into smaller sub-queries, pulls multiple sources for each one, and writes a synthesis. The page that wins is the one that has a clear, extractable answer the model can quote directly. Density of keywords does not matter. Backlinks matter less than they used to. Format and platform matter a lot.

## Where each engine goes for answers

This is the part most agencies are still guessing at. Here is what we are seeing in client tooling and citation logs as of April 2026:

**ChatGPT** leans heavily on Reddit, Wikipedia, and a long tail of niche forums. If your prospect is asking "what is the typical CAC for B2B SaaS in 2026", ChatGPT is more likely to cite a Reddit thread on r/SaaS than your benchmark report (unless your report has been linked into that thread or a similar one). The fix is not to spam Reddit. It is to be the kind of source other people quote on Reddit when the topic comes up.

**Perplexity** weights Reddit, LinkedIn, and G2 highly, with a strong preference for sources that have answers in the first paragraph. Perplexity's citation behavior is the easiest to predict because the platform shows you which sources it pulled. Run the queries your prospects would run. Read the citations. The pattern is usually obvious.

**Gemini** pulls more from Google's own surfaces (Google Business profiles, YouTube transcripts, Google Docs published as web pages) than the others. If you have ignored your Google Business profile, Gemini probably ignores you back.

**Bing Copilot** still leans on the Bing index, which makes it the closest cousin to traditional SEO of the four. If you rank well on Bing, you tend to get cited.

We have not seen a client where one engine dominates all AI-driven traffic. The mix shifts by industry, and you should look at your own referer data before you decide where to invest first.

## Topic targeting beats keyword targeting

Every GEO writeup published this year keeps repeating this line. Here is why it matters in production.

When an LLM decomposes a prospect's question, it does not search for the original phrase. It searches for the sub-questions inside it. So if a prospect asks ChatGPT "should I hire a remote SDR or use a voice AI agent", the model breaks that into things like "average cost of a remote SDR in 2026", "what tasks can voice AI handle in outbound", "comparison of voice AI agent vendors", and several more. Then it pulls a source for each sub-question and writes the synthesis.

If your content targets only the original phrase, you are competing for the visible query and ignoring the four invisible ones the model ran. The teams winning at GEO right now write content that covers the topic with enough breadth that the model finds extractable answers for several sub-queries on the same page.

In practice this looks like a longer page with sharper sub-headers, an FAQ block at the top instead of the bottom, and answer-first paragraphs. Burying the answer under three paragraphs of context fails the model, which is hunting for a 60-word quotable chunk.

## A test you can run this week

Pick five questions a prospect would ask before buying from you. Run each one through ChatGPT, Perplexity, and Gemini. Save the responses. Look at three things:

1. Are you cited? If yes, on how many of the five?
2. If you are not cited, who is? Make a list. These are the sources currently winning your category.
3. Of the cited sources, what format do they share? Comparison page, glossary entry, benchmark report, listicle? Match the format that is winning before you try to invent a new one.

We did this exercise for one of our remote-workforce clients three weeks ago. They were cited on zero of five queries when we started. They were cited on three of five eight days later, and they did not write a single new page. We rewrote three existing pages so the answer sat in the first 80 words, added a comparison table, and pushed the same content to LinkedIn as a long post. The platform-presence component matters more than people expect.

## What we are not doing

We are not adding "AI search optimization" as a separate service line. We do not think it deserves to be one yet. The work fits inside content strategy and analytics, and pretending it is a brand-new discipline is mostly an excuse to charge a markup. The teams winning at GEO are doing the same content work they were doing for SEO, with sharper structure and wider platform spread.

The real shift is in attribution. If 5 percent of your new traffic is coming from chatgpt.com today, it will probably be 15 percent by Q4. The customers who get a year ahead on this are the ones who started measuring it in April, not the ones who waited for a vendor deck.

Look at your referer report this week. The presence or absence of AI engines is the start of the plan.
