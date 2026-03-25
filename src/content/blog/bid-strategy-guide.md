---
title: "Bid Strategy Guide: Manual vs Automated Bidding Across Platforms"
excerpt: "Choosing the right bid strategy can make or break your ROAS. Learn when to use manual vs automated bidding, how each platform's algorithm works, and which strategy fits your goals."
category: "Paid Ads Benchmarks"
tags: ["bid strategy", "automated bidding", "manual bidding", "Google Ads bidding", "Meta Ads bidding", "campaign optimization"]
date: "2025-08-29"
author: "M. Faizan Rafiq"
faqs:
  - question: "Should I use manual or automated bidding?"
    answer: "For most advertisers in 2026, automated bidding outperforms manual bidding — but with important caveats. Automated bidding works best when you have at least 30-50 conversions per month per campaign, clean conversion tracking, and sufficient budget for the algorithm to learn. Manual bidding is better when you're just launching campaigns, have very low conversion volume, need precise control over specific placements, or when your conversion data is unreliable."
  - question: "How long does it take for automated bidding to learn?"
    answer: "Most platforms need a 'learning period' of 1-2 weeks or 50+ conversions before automated bidding stabilizes. During this period, performance is volatile and CPAs may be 2-3x higher than your target. Don't make major changes during the learning period as it resets the process. Google Ads typically needs 2-4 weeks, Meta needs 1-2 weeks, and LinkedIn needs 2-4 weeks of data before automated strategies perform reliably."
  - question: "What is the best bid strategy for Google Ads?"
    answer: "For most advertisers, Target ROAS or Target CPA are the best Google Ads bid strategies. Use Target ROAS if you sell products at different price points and want to maximize revenue efficiency. Use Target CPA if your conversions have relatively uniform value and you want to maximize conversion volume at a set cost. Maximize Conversions (without a target) works well for campaigns with ample budget that need to scale quickly, but it can overspend. Maximize Clicks is only recommended for top-of-funnel awareness campaigns."
---

## Why Bid Strategy Matters

Your bid strategy is the single most impactful setting in any ad account. It determines how much you pay for every click, impression, and conversion. Get it right, and you scale profitably. Get it wrong, and you burn through budget with nothing to show for it.

Things have changed fast. Five years ago, manual bidding was standard practice. Today, machine learning-powered automated bidding outperforms manual bidding in most scenarios — but "most" isn't "all." Understanding when to use each approach is critical for marketers with **significant monthly ad budgets** on paid media.

## Bid Strategy Options by Platform

### Google Ads Bid Strategies

| Strategy | Type | Optimizes For | Best When |
|----------|------|--------------|-----------|
| Manual CPC | Manual | Clicks at set price | Low volume, new campaigns, precise control |
| Enhanced CPC (eCPC) | Semi-auto | Conversions (adjusts manual bids) | Transitioning from manual to auto |
| Maximize Clicks | Automated | Click volume | Awareness, traffic campaigns |
| Maximize Conversions | Automated | Conversion volume | Sufficient budget, need scale |
| Target CPA | Automated | Conversions at target cost | Stable CPA goal, 30+ conv/month |
| Maximize Conversion Value | Automated | Total revenue | E-commerce, varied product values |
| Target ROAS | Automated | Revenue at target return | E-commerce, 50+ conv/month |
| Target Impression Share | Automated | Ad visibility | Brand, conquest campaigns |

**Google's recommendation path:**
1. Start with Manual CPC or Maximize Clicks for data collection
2. Move to Target CPA or Target ROAS once you have 30-50 conversions/month
3. Use portfolio bid strategies across campaigns with shared goals

### Meta Ads Bid Strategies

| Strategy | What It Does | Best When |
|----------|-------------|-----------|
| Lowest Cost (default) | Gets most results within budget | Starting out, uncapped budgets |
| Cost Cap | Targets a maximum CPA | Specific CPA targets, need efficiency |
| Bid Cap | Sets a maximum bid per auction | Precise auction-level control |
| ROAS Goal (Minimum ROAS) | Targets a minimum return | E-commerce, revenue optimization |

**Key difference from Google:** Meta's default "Lowest Cost" has no cap — it will spend your entire budget to get the most conversions possible, even if CPA rises. This works well during learning but can overshoot targets at scale.

### LinkedIn Ads Bid Strategies

| Strategy | What It Does | Best When |
|----------|-------------|-----------|
| Maximum Delivery | Spends budget to maximize results | Brand awareness, new campaigns |
| Cost Cap | Targets a maximum cost per result | Lead gen with CPA targets |
| Manual Bidding | You set the bid | Experienced advertisers, low volume |

LinkedIn's auction is less competitive than Google or Meta, but CPCs are significantly higher ($5-$15 average). Bid strategy matters more because each click is expensive.

### TikTok Ads Bid Strategies

| Strategy | What It Does | Best When |
|----------|-------------|-----------|
| Lowest Cost | Maximizes results within budget | Testing, scale |
| Cost Cap | Targets a maximum CPA | Efficiency-focused campaigns |
| Bid Cap | Maximum bid per impression | Precise control |
| Maximum Delivery | Spends budget as fast as possible | Short-term campaigns, promotions |

### Microsoft Ads Bid Strategies

Microsoft Ads mirrors Google's bid strategies closely:
- Manual CPC, Enhanced CPC, Maximize Clicks, Maximize Conversions, Target CPA, Target ROAS
- Performance often lags Google due to smaller auction volumes and less data for the algorithm

## When to Use Manual Bidding

Manual bidding still has its place in 2026:

### Scenario 1: New Campaigns with No Conversion Data

Automated bidding algorithms need data to learn. A brand-new campaign with zero conversion history gives the algorithm nothing to work with. Start manually, collect 30-50 conversions, then switch.

### Scenario 2: Very Low Conversion Volume

If a campaign generates fewer than 15-20 conversions per month, automated bidding doesn't have enough data to optimize reliably. The algorithm may make erratic decisions.

### Scenario 3: Niche or Specialized Campaigns

Campaigns targeting a tiny audience (like ABM campaigns targeting 50 specific companies on LinkedIn) don't benefit from automated bidding. Manual control lets you set appropriate bids for each target.

### Scenario 4: Unreliable Conversion Tracking

If your conversion tracking is broken, delayed, or incomplete, automated bidding will optimize toward bad data. Fix tracking first, then automate.

### Scenario 5: Impression Share Battles

If your primary goal is showing up for specific competitive searches (like your brand name or a competitor's name), manual bidding with aggressive bids can be more predictable than automated strategies.

## When to Use Automated Bidding

### The Case for Automation

Modern ad platforms process billions of signals per auction — user demographics, device type, time of day, search intent, browsing behavior, weather, and hundreds more. No human can process these signals in real-time, but algorithms can.

**Automated bidding outperforms manual when:**
- You have 30+ conversions per month per campaign
- Your conversion tracking is accurate and timely
- You have at least 2-4 weeks of data for learning
- You can afford some CPA volatility during learning periods
- Your budget allows for the algorithm to explore

### Performance Comparison

Based on aggregated data from accounts we manage:

| Metric | Manual Bidding | Automated Bidding | Improvement |
|--------|---------------|------------------|-------------|
| CPA | Baseline | -15 to -25% | Better efficiency |
| Conversion volume | Baseline | +20 to +40% | More conversions |
| ROAS | Baseline | +10 to +30% | Better returns |
| Time to optimize | Hours/week | Minutes/week | Less management |
| Consistency | Varies by manager | More consistent | Less human error |

These improvements compound over time as the algorithm accumulates more data.

## Implementing Automated Bidding: Best Practices

### Best Practice 1: Start with Realistic Targets

If your current CPA is $50, don't set a Target CPA of $20. The algorithm will restrict delivery severely, get minimal data, and fail to learn.

**Recommended approach:**
1. Run Maximize Conversions (no cap) for 2-4 weeks
2. Identify your average CPA during that period
3. Set your Target CPA at or slightly above that average
4. Gradually lower the target by 5-10% per week as the algorithm improves

### Best Practice 2: Respect the Learning Period

Every time you make a significant change, the algorithm re-enters a learning period:

**Changes that trigger learning resets:**
- Bid strategy changes
- Budget changes >20%
- Conversion action changes
- Targeting changes (major)
- Pausing and restarting campaigns

**During the learning period (1-2 weeks):**
- CPA will be volatile (expect 2-3x normal variance)
- Don't make additional changes
- Don't pause based on early results
- Monitor but don't intervene

### Best Practice 3: Feed the Algorithm Good Data

Automated bidding is only as good as the data you feed it:

**Use the right conversion action.** If you optimize for "Add to Cart" but care about "Purchase," the algorithm will find users who add to cart but never buy.

**Set accurate conversion values.** For Target ROAS, ensure your conversion values reflect actual revenue, not arbitrary numbers.

**Implement offline conversion imports.** If you're a B2B company where the real conversion happens in your CRM (SQL, opportunity), import these events back to the ad platform so the algorithm learns what a real conversion looks like.

**Use enhanced conversions.** Server-side data improves conversion matching by 10-25%, giving the algorithm significantly more signal.

### Best Practice 4: Structure Campaigns for Automation

Automated bidding works best with **consolidated campaign structures**:

- **Fewer, larger campaigns** outperform many small ones (more data per campaign)
- **Broad targeting** with smart bidding often outperforms narrow targeting with manual bidding
- **Avoid micro-segmentation** — let the algorithm find the best audiences within broader parameters

### Best Practice 5: Use Portfolio Bid Strategies

On Google Ads, portfolio bid strategies apply a single bid strategy across multiple campaigns. Benefits:

- Pools conversion data across campaigns for faster learning
- Allows the algorithm to reallocate budget toward the best-performing campaigns within the portfolio
- Smooths out performance volatility

Best for: Accounts with multiple campaigns targeting similar conversion goals.

## Platform-Specific Bid Strategy Recommendations

### Google Ads Strategy by Campaign Type

| Campaign Type | Recommended Strategy | Target Metric |
|--------------|---------------------|---------------|
| Brand Search | Target Impression Share (90%+) | Visibility |
| Non-Brand Search | Target CPA or Target ROAS | Efficiency |
| Shopping | Target ROAS | Revenue |
| Performance Max | Maximize Conversion Value | Revenue |
| Display (prospecting) | Maximize Conversions | Volume |
| Display (retargeting) | Target CPA | Efficiency |
| YouTube (awareness) | Target CPM or Max Views | Reach |
| YouTube (action) | Maximize Conversions | Volume |

### Meta Ads Strategy by Objective

| Objective | Recommended Strategy | When to Switch |
|-----------|---------------------|---------------|
| Awareness/Reach | Lowest Cost | Default, works well |
| Traffic | Lowest Cost | Default for most |
| Leads (low cost tolerance) | Cost Cap | When CPA exceeds target |
| Leads (scale priority) | Lowest Cost | When volume matters more |
| Sales (efficiency) | Minimum ROAS | Stable revenue tracking |
| Sales (scale) | Lowest Cost | Growth phase |

### LinkedIn Ads Strategy

| Objective | Recommended Strategy | Notes |
|-----------|---------------------|-------|
| Brand awareness | Maximum Delivery | Prioritize reach |
| Lead gen (early) | Maximum Delivery | Collect data first |
| Lead gen (scaled) | Cost Cap | After 30+ conversions |
| Website visits | Manual | Control high CPCs |

## Troubleshooting Bid Strategy Issues

### Issue: CPA Spiking After Switching to Automated

**Cause:** Learning period volatility or target set too aggressively.
**Fix:** Wait 2 weeks. If CPA doesn't stabilize, raise your target by 10-20%.

### Issue: Low Spend / Limited Delivery

**Cause:** Target CPA or ROAS too aggressive — the algorithm can't find enough auctions to win at your target.
**Fix:** Raise CPA target or lower ROAS target by 15-20%. Alternatively, broaden your targeting.

### Issue: Automated Bidding Overspending

**Cause:** Using Maximize Conversions without a CPA cap.
**Fix:** Add a CPA target or switch to Target CPA strategy.

### Issue: Performance Worse Than Manual

**Cause:** Insufficient data, bad conversion tracking, or too-frequent changes.
**Fix:** Audit conversion tracking, consolidate campaigns for more data, and commit to a 3-4 week test without changes.

## Bid Strategy Framework for Budget Allocation

When managing multiple campaigns with different bid strategies, allocate budget based on performance maturity:

| Campaign Maturity | Budget Allocation | Bid Strategy |
|------------------|------------------|-------------|
| New (0-30 conversions) | 10-15% of total | Manual or Maximize Conversions |
| Learning (30-100 conversions) | 20-25% | Target CPA at current average |
| Optimized (100+ conversions) | 60-70% | Target CPA/ROAS (tightened) |

This ensures most of your budget goes to campaigns where the algorithm has enough data to perform well, while newer campaigns get enough budget to learn.

If your bid strategies aren't delivering the ROAS you need, or if you're unsure whether to use manual or automated approaches, **[get a free growth audit](/free-growth-audit)** from Digital Point LLC. We will analyze your current bid strategy setup, identify optimization opportunities, and recommend the approach that maximizes your return on ad spend.
