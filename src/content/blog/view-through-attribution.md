---
title: "View-Through Attribution: Should You Count Impressions as Conversions?"
excerpt: "Understand view-through attribution, when it inflates your numbers, when it captures real value, and how to configure it correctly across ad platforms."
category: "Marketing Attribution"
tags: ["view-through attribution", "impression tracking", "display advertising", "marketing measurement", "attribution models"]
date: "2026-03-15"
author: "M. Faizan Rafiq"
faqs:
  - question: "What is the difference between view-through and click-through attribution?"
    answer: "Click-through attribution credits a conversion to an ad that the user clicked before converting. View-through attribution credits a conversion to an ad the user saw (but didn't click) before converting. For example, if someone sees your display ad, doesn't click it, but visits your website the next day and purchases, view-through attribution would credit that display ad. Click-through wouldn't give it any credit."
  - question: "Is view-through attribution reliable?"
    answer: "View-through attribution is partially reliable. It captures real value from awareness channels like display, video, and CTV that drive conversions without clicks. However, it can also overcount by crediting ads that a user barely noticed. The key is to use short view-through windows (1 day), apply it selectively to awareness channels, and validate with incrementality tests."
  - question: "Should I turn off view-through attribution?"
    answer: "No, you shouldn't turn it off entirely, especially for display, video, and Connected TV campaigns. These channels are designed to build awareness and influence without requiring a click. Instead of turning it off, use a short view-through window (1 day), discount view-through conversions by 30-50% in your analysis, and validate with holdout tests to confirm real impact."
---

## What Is View-Through Attribution?

**View-through attribution** (VTA) counts a conversion when someone sees your ad, doesn't click it, and later converts on your website. The ad gets credit for the conversion even though the user never directly engaged with it.

This is one of the most debated topics in digital marketing measurement. On one side, marketers argue that view-through conversions are largely fabricated — the user was going to buy anyway, and the ad impression was incidental. On the other side, marketers point out that awareness advertising works precisely by being seen, not clicked, and ignoring view-through means ignoring the impact of entire channels.

The truth sits somewhere in between. For businesses putting **serious money into ads each month** on ads, getting view-through attribution right is worth hundreds of thousands of dollars in properly allocated budget.

## How View-Through Attribution Works

The mechanics are straightforward:

1. A user visits a website or app where your ad is displayed
2. The ad platform records that the user was served an impression
3. The user doesn't click the ad
4. Within the view-through attribution window (typically 1-24 hours), the user visits your site and converts
5. The ad platform credits that conversion as a "view-through conversion"

### The Technical Requirements

For view-through attribution to work, the ad platform needs to:

- **Identify the user** across the ad impression and the conversion event (via cookies, device IDs, or logged-in state)
- **Confirm the ad was viewable** — most platforms require the ad to meet MRC viewability standards (50% of pixels in view for at least 1 second for display, 2 seconds for video)
- **Match the impression to the conversion** within the defined time window

### Where View-Through Gets Complicated

The core challenge is **causation vs. correlation**. Just because someone saw your ad and later converted doesn't mean the ad caused the conversion. Consider these scenarios:

**Scenario A (Real impact):** A user sees your video ad while browsing YouTube. The ad introduces them to your brand. The next day, they search for your product name and buy. Without the ad, they never would have known about you.

**Scenario B (Inflated credit):** A user is already planning to buy your product. While browsing a news site, your retargeting display ad loads in a sidebar they never look at. They go to your site and buy. The ad gets view-through credit, but it had zero influence.

Both scenarios are counted the same way by the platform.

## View-Through Attribution by Platform

Each ad platform handles view-through differently:

| Platform | Default VTA Window | Adjustable? | Notes |
|----------|-------------------|-------------|-------|
| Meta (Facebook/Instagram) | 1 day | Yes (1 day or off) | Post-iOS 14, VTA is more limited |
| Google Display Network | 30 days | Yes (1-30 days) | Separate from click attribution |
| YouTube | 30 days | Yes (1-30 days) | Called "engaged-view" for 10+ sec views |
| TikTok | 1 day | Yes (off, 1 day, 7 days) | Default is off for some objectives |
| LinkedIn | 7 days | Yes (1-7-30-90 days) | Relatively generous default |
| The Trade Desk | 14 days | Yes (customizable) | Standard for programmatic |
| Amazon DSP | 14 days | Yes (1-14 days) | Important for product launches |
| Snapchat | 1 day | Yes (1 day or 28 days) | Swipe-up counts as click |
| Pinterest | 1 day | Yes (1 day or off) | Called "view-through" in reporting |

### The YouTube "Engaged View" Exception

Google introduced "engaged-view conversions" for YouTube, which sit between click-through and view-through. An engaged view is counted when someone watches at least 10 seconds of a skippable ad (or the full ad if shorter than 10 seconds) and then converts within 3 days. This is a more meaningful signal than a standard impression because the user actively chose to keep watching.

## When View-Through Attribution Is Valuable

View-through isn't universally good or bad. It's valuable in specific contexts:

### 1. Upper-Funnel Awareness Campaigns

Display, video, and CTV campaigns are designed to build awareness. Their primary goal isn't to generate clicks — it's to put your brand in front of the right audience. Measuring these campaigns only on clicks would be like judging a billboard by how many people pulled over to write down the phone number.

For awareness campaigns, view-through attribution captures the downstream impact of exposure. Without it, you would systematically undervalue your prospecting efforts and over-invest in bottom-funnel channels.

### 2. Connected TV (CTV) Advertising

CTV ads aren't clickable. There's no remote control button that takes you to a website. If you don't use view-through attribution for CTV, you can't measure CTV at all (at least not through platform-native reporting). VTA is essential for CTV measurement.

### 3. High-Frequency Brand Campaigns

When you're running brand campaigns at high frequency to specific audiences, the cumulative effect of repeated impressions drives action. View-through helps capture this cumulative impact that no single click can represent.

### 4. New Market or Product Launches

When launching in a new market, nobody knows your brand yet. Awareness advertising drives initial consideration, and view-through attribution is the only way to measure that early-stage impact through the ad platform.

## When View-Through Attribution Is Misleading

### 1. Retargeting Campaigns

This is where VTA is most commonly abused. Retargeting ads are shown to people who have already visited your site — many of whom were already going to buy. When a retargeting display ad loads in a banner they never notice, and they convert the same day, the retargeting campaign claims a view-through conversion. This inflates retargeting ROAS and makes it look like the best channel in your mix.

### 2. High-Volume Display Networks

Some display networks serve billions of impressions across low-quality placements. The sheer volume means they will overlap with a meaningful number of users who were already converting. VTA lets these networks claim credit for conversions they didn't influence.

### 3. Small-Spend Campaigns

If you're only spending $500/month on display, the number of view-through conversions is likely noise, not signal. VTA is most reliable at scale where statistical patterns become meaningful.

### 4. Comparison to Search Campaigns

If you're comparing display (with VTA) to search (without VTA), the comparison is unfair. Either include VTA for both or neither when making channel comparisons.

## How to Configure View-Through Attribution Correctly

### Step 1: Set Short Windows

Use the shortest practical view-through window:

- **1 day** for most display and social campaigns
- **3 days** for YouTube/video if using engaged-view metrics
- **7 days maximum** for CTV campaigns

The longer the window, the weaker the causal relationship between the impression and the conversion.

### Step 2: Separate VTA in Reporting

Never combine view-through and click-through conversions into a single metric. Your reporting should always show:

- Click-through conversions
- View-through conversions
- Total conversions (clearly labeled as combined)

This lets you assess each signal independently and apply appropriate discount factors.

### Step 3: Apply Discount Factors

Most sophisticated advertisers discount view-through conversions in their analysis:

| Campaign Type | Suggested VTA Discount |
|--------------|----------------------|
| Prospecting display | 50% (count half) |
| Retargeting display | 70-80% (count 20-30%) |
| YouTube (engaged view) | 30% (count 70%) |
| CTV | 40-50% (count 50-60%) |
| Social video | 40-50% (count 50-60%) |

These are starting points. Refine them based on your incrementality test results.

### Step 4: Validate with Incrementality Tests

The gold standard for validating view-through conversions is incrementality testing:

1. **Holdout test:** Stop running display ads to a random segment of your audience and compare conversion rates to the group that still sees ads. The difference is the true incremental lift.
2. **Ghost ad test:** Serve a blank or public service ad to a holdout group instead of your ad. Compare conversion rates.
3. **Geo-matched market test:** Turn off display ads in select markets and compare to similar markets where ads continue running.

If your incrementality test shows a 2% lift from display ads, but your view-through attribution claims a 15% conversion rate, you know VTA is overcounting by roughly 7.5x.

### Step 5: Use Platform-Specific Best Practices

**Meta:** Keep the 1-day view setting. Since iOS 14.5, Meta's view-through data is modeled rather than directly measured for opted-out users, which adds uncertainty.

**Google Display:** Reduce the default 30-day view-through window to 1-7 days. The 30-day default is aggressively long.

**YouTube:** Use engaged-view conversions rather than standard view-through. The 10-second watch threshold filters out users who immediately skipped.

**CTV:** Accept view-through as the primary measurement method, but supplement with brand lift studies, search lift analysis, and matched market tests.

## View-Through Attribution in a Privacy-First World

The accuracy of view-through attribution has declined significantly due to privacy changes:

### iOS 14.5+ Impact

Apple's App Tracking Transparency framework broke the user-level connection between ad impressions and conversions for opted-out users. Platforms now model view-through conversions using statistical methods rather than direct measurement. This modeling is directionally correct but less precise.

### Cookie Deprecation

As third-party cookies phase out, display networks lose the ability to match impressions to conversions across different websites. This further reduces VTA accuracy for web-based display campaigns.

### The Shift to Modeled Conversions

All major platforms now use some degree of modeling to fill gaps in their conversion data. For view-through attribution, the modeling is even more aggressive because the signal (an impression) is weaker than a click. Understanding that VTA numbers are increasingly modeled — not directly observed — is important for proper interpretation.

## Building a View-Through Measurement Framework

For brands spending significant budgets on awareness and display channels, here's a framework for measuring view-through impact:

### Tier 1: Platform-Reported VTA (Directional)
Use platform view-through data as a directional signal, discounted by 40-70% depending on channel and campaign type. This is your day-to-day optimization data.

### Tier 2: Cross-Platform Attribution (More Accurate)
Use a third-party attribution tool that can deduplicate view-through conversions across platforms. Platform-native VTA often double-counts when multiple platforms claim view-through credit for the same conversion.

### Tier 3: Incrementality Testing (Ground Truth)
Run quarterly incrementality tests to calibrate your VTA discount factors. This is the most accurate measurement but requires sufficient scale and statistical rigor.

### Tier 4: Marketing Mix Modeling (Holistic)
Use MMM to measure the aggregate impact of awareness spending, independent of user-level attribution. This captures effects that even view-through attribution misses, like brand halo and word-of-mouth.

## Making the Right Call on View-Through

View-through attribution is neither a scam nor gospel truth. It's a signal with known limitations. The right approach is to include it in your measurement framework with appropriate guardrails:

- Use short windows (1 day for most channels)
- Report VTA separately from click-through conversions
- Discount VTA conversions based on campaign type
- Validate with incrementality tests
- Never let retargeting VTA inflate your ROAS calculations unchallenged

If you're struggling to determine how much your display and video campaigns are actually contributing — or if your ROAS numbers seem too good to be true — **[request a free growth audit](/free-growth-audit)** from Digital Point LLC. We will help you build a measurement framework that captures the real value of every channel without overcounting.
