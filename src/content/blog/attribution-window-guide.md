---
title: "Attribution Windows Explained: How to Choose the Right Lookback Period"
excerpt: "Learn how attribution windows work, why the default settings are costing you money, and how to choose the right lookback period for every channel and campaign type."
category: "Marketing Attribution"
tags: ["attribution windows", "lookback period", "marketing attribution", "conversion tracking", "ad platforms"]
date: "2025-08-22"
author: "Anwaar Tayyab"
faqs:
  - question: "What is an attribution window in marketing?"
    answer: "An attribution window (also called a lookback window) is the period of time after a user interacts with your ad during which a conversion can be credited to that ad. For example, a 7-day click attribution window means if someone clicks your ad and converts within 7 days, that conversion counts toward the ad's performance. After 7 days, the conversion wouldn't be attributed to that click."
  - question: "What is the best attribution window length?"
    answer: "There's no universal best length. It depends on your sales cycle, product price, and channel. E-commerce with products under $100 typically uses 7-day click windows. B2B with long sales cycles may need 30-90 day windows. The key is to match the window to your actual customer decision timeline, which you can determine by analyzing your time-to-conversion data."
  - question: "Why did Meta change its default attribution window?"
    answer: "Meta changed its default attribution window from 28-day click / 1-day view to 7-day click / 1-day view in January 2021, primarily due to Apple's iOS 14.5 privacy changes. The shorter window means Meta reports fewer conversions, which can make campaigns appear less effective than they actually are. Advertisers need to account for this when comparing current performance to historical data."
---

## What Are Attribution Windows?

An **attribution window** (sometimes called a lookback window or conversion window) defines the time period after someone interacts with your ad during which any resulting conversion gets credited to that ad. It's one of the most important settings in your ad accounts, yet most marketers never change the defaults.

Here's why that matters. If your attribution window is set to 7 days and a customer clicks your ad, browses your site, thinks about it for 10 days, and then buys — that sale never shows up in your ad reporting. As far as the platform is concerned, the ad didn't work. But it did.

For businesses with **meaningful paid media budgets** on paid media, misconfigured attribution windows can hide millions in revenue and lead to catastrophically wrong optimization decisions.

## How Attribution Windows Work Across Platforms

Every major ad platform has its own default attribution settings, and they're not the same. This creates a measurement mess when you're running campaigns across multiple channels.

### Platform Default Attribution Windows (2026)

| Platform | Default Click Window | Default View Window | Maximum Click Window |
|----------|---------------------|--------------------|--------------------|
| Meta (Facebook/Instagram) | 7 days | 1 day | 7 days |
| Google Ads | 30 days | N/A (YouTube: 30 days) | 90 days |
| TikTok | 7 days | 1 day | 28 days |
| LinkedIn | 30 days | 7 days | 180 days |
| Pinterest | 30 days | 1 day | 60 days |
| Snapchat | 28 days | 1 day | 28 days |
| Microsoft Ads | 30 days | N/A | 90 days |

Notice the inconsistency. If you're comparing Meta performance to Google Ads performance using default settings, you're comparing a 7-day click window against a 30-day click window. Google will naturally report more conversions — not because it performs better, but because it has a longer period to claim credit.

### Click-Through vs. View-Through Windows

Attribution windows typically have two components:

**Click-through attribution** credits conversions that happen after someone clicks your ad. This is the more straightforward measurement — someone clicked, then they converted.

**View-through attribution** credits conversions that happen after someone sees your ad but doesn't click it. The user saw your display ad, didn't click, but later visited your site and converted. The ad gets partial credit.

View-through attribution is more controversial because the causal link is weaker. Someone might have converted anyway, regardless of seeing your ad. However, dismissing view-through entirely ignores the real impact of awareness campaigns, especially for display, video, and Connected TV.

## Why Default Windows Are Probably Wrong for You

The default attribution window on any platform is set to benefit the platform, not your business. Shorter windows undercount conversions (making you think ads are underperforming), while excessively long windows overcount by claiming credit for conversions that would have happened organically.

### The Undercounting Problem

After Meta shortened its default window from 28-day click to 7-day click, many advertisers saw reported conversions drop by 20-40% overnight — even though actual sales hadn't changed. The ads were still working; the reporting window was just too short to capture the full impact.

This is particularly damaging for:

- **High-consideration purchases** ($500+) where buyers research for weeks
- **B2B products** with long sales cycles involving multiple stakeholders
- **Subscription services** where the signup decision takes time
- **Seasonal purchases** where someone clicks an ad in October but buys in November

### The Overcounting Problem

On the flip side, a 90-day attribution window on Google Ads might credit a conversion to a click that happened three months ago, even though the customer has had dozens of other marketing interactions since then. This inflates reported ROAS and makes you overinvest in channels that are getting undeserved credit.

### How to Find Your Ideal Window Length

The right attribution window should match your actual **time-to-conversion** data. Here's how to find it:

**Step 1: Analyze your conversion lag data.** In Google Ads, go to Tools > Attribution > Conversion Paths and look at the time lag report. This shows how many days pass between first interaction and conversion.

**Step 2: Find the 90th percentile.** If 90% of your conversions happen within 14 days of the first click, a 14-day window captures the vast majority of your conversion value without excessive overcounting.

**Step 3: Segment by product or campaign type.** Your branded search campaigns might convert in 1-2 days, while your prospecting display campaigns might take 21 days. One window doesn't fit all.

**Step 4: Account for offline conversions.** If you're importing CRM data or offline sales, make sure your window is long enough to capture those delayed signals.

## Attribution Window Recommendations by Business Type

Based on our work with clients spending $10K-$200K+ monthly on ads, here are the attribution window settings we typically recommend:

### E-Commerce (DTC, Average Order Value Under $200)

| Channel | Click Window | View Window |
|---------|-------------|-------------|
| Meta Ads | 7 days | 1 day |
| Google Search | 14-30 days | N/A |
| Google Shopping | 7-14 days | N/A |
| TikTok | 7 days | 1 day |
| Display/YouTube | 14 days | 1 day |

For lower-AOV e-commerce, the default Meta window is usually fine. Most impulse and semi-impulse purchases happen within a week. The bigger risk is overcounting with long windows on Google.

### High-Ticket E-Commerce (AOV $500+)

| Channel | Click Window | View Window |
|---------|-------------|-------------|
| Meta Ads | 7 days (max available) | 1 day |
| Google Search | 30-60 days | N/A |
| Google Shopping | 30 days | N/A |
| Display/YouTube | 30 days | 7 days |

With high-ticket items, the 7-day Meta window will significantly undercount. You need to supplement with server-side tracking or a third-party attribution tool to capture the full conversion timeline.

### B2B / SaaS

| Channel | Click Window | View Window |
|---------|-------------|-------------|
| Google Search | 60-90 days | N/A |
| LinkedIn | 90-180 days | 30 days |
| Meta Ads | 7 days | 1 day |
| Display/YouTube | 30-60 days | 7-14 days |

B2B sales cycles are long. A 90-day window on LinkedIn isn't unusual when enterprise deals take 3-6 months to close. The challenge is balancing accurate measurement against credit inflation.

### Lead Generation

| Channel | Click Window | View Window |
|---------|-------------|-------------|
| Google Search | 30 days | N/A |
| Meta Ads | 7 days | 1 day |
| Microsoft Ads | 30 days | N/A |
| Display | 14-30 days | 1-7 days |

Lead gen sits in the middle. The initial conversion (form fill) happens quickly, but the downstream revenue can take months. We recommend shorter windows for lead tracking and longer windows when optimizing to revenue.

## How to Change Attribution Windows

### In Meta Ads Manager

1. Go to your ad set or campaign settings
2. Click "Show more options" under the Optimization section
3. Find "Attribution setting"
4. Choose between 1-day click, 7-day click, 1-day click + 1-day view, or 7-day click + 1-day view

Note that changing the attribution window only affects **reporting**, not delivery optimization. Meta's algorithm still uses a broader set of signals to optimize.

### In Google Ads

1. Go to Tools & Settings > Measurement > Conversions
2. Select the conversion action you want to modify
3. Click "Edit settings"
4. Adjust the "Click-through conversion window" (1-90 days)
5. For YouTube/Display, adjust the "View-through conversion window" separately

### In Your Attribution Platform

If you're using a third-party attribution tool (like Triple Whale, Northbeam, or Rockerbox), you can typically set custom windows that override the platform defaults. This gives you a consistent measurement framework across all channels.

## Advanced Attribution Window Strategies

### Strategy 1: Use Different Windows for Different Funnel Stages

Don't apply the same window to prospecting and retargeting campaigns:

- **Prospecting campaigns** need longer windows because they're introducing your brand to cold audiences. It takes time for those users to convert.
- **Retargeting campaigns** should use shorter windows because these users are already warm. If they don't convert within a few days of seeing a retargeting ad, the ad probably wasn't the deciding factor.

### Strategy 2: Run Window Comparison Tests

Most platforms let you toggle between different attribution windows in your reporting. Run the same report with 1-day, 7-day, and 28-day windows to see how many incremental conversions each extended period captures.

If extending from 7 days to 28 days only adds 5% more conversions, the shorter window is probably sufficient. If it adds 40%, you're significantly undercounting with the shorter window.

### Strategy 3: Align Windows with Your Remarketing Strategy

Your attribution window should be at least as long as your remarketing window. If you're retargeting users for 30 days after they visit your site, but your attribution window is only 7 days, you can't properly measure the retargeting funnel.

### Strategy 4: Account for Attribution Window in Budget Decisions

When comparing channels with different windows, normalize the data. Calculate a "per-day conversion rate" for each window length:

- Channel A: 100 conversions in a 7-day window = 14.3 conversions per day
- Channel B: 150 conversions in a 30-day window = 5 conversions per day

Channel A is actually converting at a much higher daily rate, even though Channel B shows a higher total number.

## Common Attribution Window Mistakes

### Mistake 1: Comparing Channels with Different Windows

This is the most common error we see. Teams report that Google Ads has a 4x ROAS while Meta has a 2x ROAS, without realizing Google is using a 30-day window and Meta is using a 7-day window. Normalize windows before comparing.

### Mistake 2: Never Reviewing the Defaults

Platform defaults change. Meta's 2021 window change caught many advertisers off guard. Review your attribution settings quarterly, especially after major platform updates.

### Mistake 3: Using the Same Window for All Campaigns

A branded search campaign and a top-of-funnel video campaign shouldn't have the same attribution window. Segment your windows by campaign type and objective.

### Mistake 4: Ignoring View-Through for Awareness Campaigns

If you're running display, video, or CTV campaigns and only measuring click-through attribution, you're missing the majority of those campaigns' impact. Include view-through attribution (with a short window like 1 day) for awareness channels.

### Mistake 5: Setting It and Forgetting It

Your ideal attribution window changes as your business grows, your product mix evolves, and your customer behavior shifts. Re-analyze your time-to-conversion data at least quarterly.

## How Attribution Windows Interact with Attribution Models

Your attribution window defines **when** conversions are counted, while your attribution model defines **how** credit is distributed. These two settings interact:

- **Last-click model + short window** = Most conservative measurement. Only counts quick conversions and gives all credit to the final click.
- **Data-driven model + long window** = Most comprehensive measurement. Captures delayed conversions and distributes credit across touchpoints.
- **First-click model + long window** = Emphasizes the initial discovery touch, which can overvalue top-of-funnel channels.

The combination you choose should reflect your business goals. If you need to justify immediate ROI, use shorter windows with last-click. If you're building a long-term growth engine, use longer windows with data-driven or position-based models.

## Measuring What Attribution Windows Miss

No attribution window captures everything. Here are supplementary measurement approaches:

**Incrementality testing** — Run holdout tests to measure the true lift of your ads, independent of attribution window settings.

**Marketing mix modeling (MMM)** — Use statistical models that correlate marketing spend with business outcomes at an aggregate level, bypassing window limitations entirely.

**Post-purchase surveys** — Ask customers how they heard about you. This qualitative data fills gaps that pixel-based attribution misses.

**Matched market tests** — Compare performance in markets where you run ads versus similar markets where you don't.

## Getting Your Attribution Windows Right

Attribution windows aren't a set-and-forget setting. They require ongoing analysis and adjustment as your business, customers, and the ad platforms themselves evolve.

The stakes are high. A misconfigured attribution window can make a profitable campaign look like a loser, or make a losing campaign look like a winner. When you're spending tens or hundreds of thousands per month on ads, that misattribution translates directly into wasted budget.

If you're unsure whether your attribution windows are properly configured, or if your cross-channel reporting tells conflicting stories, **[get a free growth audit](/free-growth-audit)** from Digital Point LLC. We will analyze your current attribution setup, identify gaps, and recommend the exact window configurations for your business and sales cycle.
