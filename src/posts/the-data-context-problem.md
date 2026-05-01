---
title: The Data-Context Problem
excerpt: Numbers don't carry their own meaning. Context is not decoration — it is the substrate that makes the number interpretable at all.
category: box
published_date: 2026-01-12
---

Every number is a fraction of something unstated.

A 12% conversion rate is excellent or catastrophic depending on the industry, the product, the point in the funnel, and the quarter you're comparing it to. Without that context, 12% is noise wearing a number's clothing.

This is the data-context problem: the meaning of a datum is not intrinsic to the datum. It lives in the relationship between the number and everything surrounding it — the baseline, the comparison, the definition of terms, the source of measurement, the reason it was measured at all.

## Why this matters in practice

Most data communication failures are context failures, not data failures. The numbers are right. The context is missing.

I see three common patterns:

**The naked metric.** A single number presented without a reference point. Revenue grew 8%. Compared to what? Last quarter? Last year? Competitor average? Industry benchmark? The number tells you nothing alone.

**The unanchored trend.** A line chart showing movement over time, with no annotation explaining what happened. The line goes down in March. Why? Was that expected? Is it a problem? The reader is left to guess.

**The undefined denominator.** "40% of customers…" 40% of which customers? Active users? All registered accounts? People who bought in the last 30 days? The denominator defines the claim. Leave it out and the number is underdetermined.

## Context is not a footnote

The instinct is to treat context as supplementary — something you add after the visualization is done, if you have time. A footnote. A tooltip. A caption buried below the chart.

This is backwards. Context is structural. It should be decided before the visualization is designed, because it determines what the visualization needs to show.

The question isn't "what data do I have?" It's "what does the reader need to know to interpret this correctly?" Work backwards from that, and context stops being an afterthought.

## A working definition

For practical purposes, I think about context as four things:

1. **Reference points** — what should this number be compared to?
2. **Definitions** — how is the metric calculated, and what is excluded?
3. **Causation hints** — what explanations are worth surfacing?
4. **Confidence signals** — how reliable is this number, and at what granularity?

A visualization that addresses all four is doing real communicative work. One that addresses none of them is just a picture of a spreadsheet.
