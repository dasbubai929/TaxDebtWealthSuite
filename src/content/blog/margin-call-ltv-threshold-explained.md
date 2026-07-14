---
title: "Margin Call: How Lenders Calculate Your LTV Threshold"
description: "A margin call can force you to sell assets at the worst possible time. We explain exactly how lenders compute loan-to-value thresholds, what triggers a call, and how to model your buffer using the Buy, Borrow, Die calculator."
pubDate: 2026-06-29
author: "Mrittunjoy Das"
relatedTool: "buy-borrow-die-calculator"
---

A margin call happens when your **loan-to-value (LTV) ratio** crosses a threshold set by your lender — because the value of the securities securing your loan has dropped. It's the single most important number in the "borrow instead of sell" strategy, and it's what turns a well-laid plan into a forced liquidation at the worst possible time.

*(Note: This guide is part of our comprehensive **[Investing for Beginners](/blog/investing-for-beginners/)** series, exploring how to safely introduce leverage into a mature portfolio.)*

If you're using an SBLOC or considering one, understanding how LTV works isn't optional. It's the foundation of whether this strategy is viable or dangerous.

---

## How LTV is calculated

The formula is simple:

> **LTV = Loan Balance ÷ Current Market Value of Pledged Securities**

That's it. No complex derivatives. No hidden multipliers. Your lender takes the amount you owe and divides it by what your collateral is worth *right now*.

Here's a worked example. Say you have:

- A portfolio of diversified stocks worth **$500,000**
- An SBLOC with a loan balance of **$150,000**

Your LTV is:

> $150,000 ÷ $500,000 = **30%**

Most lenders are comfortable with that. You have a comfortable buffer between your loan and the value of your collateral. But what happens when the market drops?

If your portfolio falls to **$350,000** — a 30% decline, which is well within historical norms for a major correction — your LTV jumps:

> $150,000 ÷ $350,000 = **42.9%**

You haven't borrowed a penny more. Your loan balance hasn't changed. But your LTV has climbed from 30% to nearly 43% — just because the market moved. And if your lender's threshold is 40%, you're now in trouble.

This is the core risk: **LTV is driven by market forces you don't control.** A sharp decline in your portfolio value can push you past a threshold overnight, even if you've done nothing wrong.

---

## Typical threshold ranges

LTV thresholds are set by individual lenders, not by regulation — so they vary significantly based on the lender, the type of collateral, and how diversified your portfolio is (rates and terms vary by lender).

That said, here are the general ranges you'll see:

- **Diversified portfolios (broad index funds, 60/40 mix):** Initial maximum LTV around 50–70%, with maintenance thresholds (the point that triggers a margin call) around 65–75% (rates and terms vary by lender).
- **Concentrated single-stock positions:** Thresholds drop significantly — often 30–50% initial LTV, with maintenance thresholds as low as 40–50% (rates and terms vary by lender).
- **Highly volatile or speculative holdings:** Some lenders won't lend against these at all, or set thresholds so low that practical borrowing capacity is minimal.

The key takeaway: **the more concentrated or volatile your collateral, the lower your lender's threshold — and the less room you have before a margin call.**

A diversified portfolio gives you more cushion. A single-stock position gives you very little. This is one of the reasons why the "borrow instead of sell" strategy works much better for people with broad, diversified holdings than for someone whose wealth is tied up in one company.

---

## What actually happens during a margin call

When your LTV crosses the threshold, your lender sends a margin call. This is not a suggestion — it's a demand. You have two options:

1. **Deposit additional collateral or cash** — enough to bring your LTV back below the threshold.
2. **Repay part of the loan** — reducing the loan balance has the same effect.

If you do neither — or can't — the lender exercises its right to **force-sell your securities** to bring the LTV back into compliance (rates and terms vary by lender).

This is where the real damage happens. The forced sale occurs:

- **When prices are already down** — you're selling into a declining market, locking in losses
- **At a time you didn't choose** — you have no control over the timing or price
- **Often at unfavorable prices** — lenders may execute at market open or through bulk liquidation, not waiting for a recovery bounce

And here's the tax kicker: **that forced sale is a taxable event.** You now owe capital gains tax on whatever you sold — at the worst possible moment, when you have no cash and your portfolio just took a hit.

For people running the "borrow instead of sell" strategy, this is the nightmare scenario. The entire point was to avoid selling. A margin call forces you to sell anyway — on the lender's terms, not yours.

---

## How to reduce margin call risk before it happens

You can't eliminate margin call risk entirely — any leveraged strategy carries it. But you can meaningfully reduce the probability and severity.

**Borrow well below your maximum LTV.** Just because your lender approves you for 60% LTV doesn't mean you should borrow 60%. The further below the threshold you stay, the more room you have for market declines. A common rule of thumb is to keep your actual LTV at least 15–20 percentage points below your lender's maintenance threshold.

**Avoid single-stock concentration.** A diversified portfolio can drop 30% and still keep you within manageable LTV ranges. A single stock can drop 50% in a week. If a significant portion of your SBLOC collateral is one stock, your margin call risk is dramatically higher — even if your starting LTV looks conservative.

**Keep a cash buffer.** Having liquid cash reserves outside the portfolio means you can respond to a margin call without selling securities. It's the financial equivalent of a fire extinguisher — you hope you never need it, but you absolutely need it.

**Monitor your LTV regularly.** Don't wait for the lender to tell you your LTV is too high. Track it yourself, especially during volatile markets. A weekly check during market stress can give you time to act before a margin call is triggered.

---

## Check your own risk margin

Our [Buy, Borrow, Die Calculator](/buy-borrow-die-calculator/) includes a **margin call risk feature** that shows you exactly how much room you have before your LTV crosses a danger threshold:

- **Input your portfolio value and loan balance** to see your current LTV
- **Model different market decline scenarios** — see what a 20%, 30%, or 40% drop does to your LTV
- **Identify your cushion** — how far your current LTV is from typical maintenance thresholds
- **Test different borrowing levels** to see how much you can safely borrow without putting yourself at risk

This is the number that matters most in the "borrow instead of sell" strategy. Know it before you need it.

[→ Open the Buy, Borrow, Die Calculator](/buy-borrow-die-calculator/)

---

*This article is for informational purposes only and does not constitute financial or lending advice. Margin call thresholds, LTV requirements, and force-liquidation policies vary by lender — review your specific loan agreement and consult a qualified financial professional.*


### Related Financial Tools
- [Margin Loan vs Sell Calculator](/margin-loan-vs-sell-calculator/)
- [SBLOC Modeler](/sbloc-calculator/)
