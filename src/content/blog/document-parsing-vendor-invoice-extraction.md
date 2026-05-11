---
title: "Document parsing pipelines: vendor invoice extraction in production"
excerpt: "The structured-output-plus-operator-review pattern that turns 200 PDF vendor invoices per month into clean accounting records without an ops hire. Token cost, accuracy thresholds, and the cases that always need a human."
date: "2026-05-12"
lastModified: "2026-05-12"
author: "Digital Point LLC"
category: "Workflow Automation"
tags:
  - document parsing
  - invoice automation
  - OCR
  - structured output
indexable: true
---

Vendor invoices arrive as PDFs, scans, photos, and the occasional emailed JPG. An ops associate spends 15-30 minutes per invoice on data entry. At 200 invoices per month, that is 50-100 hours of pure data entry per month, or one full-time hire. Document parsing pipelines eliminate 85-95% of that work and leave only the edge cases for human review. This post documents the production pattern.

## The five-stage pipeline

1. Capture: vendor invoice arrives via email, drag-and-drop into a portal, or scheduled fetch from a vendor portal. The capture stage normalizes to PDF and stores the raw file with a content hash.

2. OCR: a structured-OCR provider (AWS Textract, Google Document AI, or Claude's vision capability for native PDF) extracts text + bounding boxes. The output is JSON with positional information, not flat text.

3. LLM extraction: an agent prompt converts the OCR JSON into a canonical invoice record. Fields: vendor name, invoice number, invoice date, line items (description, quantity, unit price, total), subtotal, tax, total, payment terms. The prompt enforces a Zod schema; the agent's output is validated before any write.

4. Operator review: cases that fail schema validation or fall below a confidence threshold route to a human queue. Operator either corrects the extraction (and the correction trains the next eval) or rejects the document (wrong vendor, fraud suspicion, scope issue).

5. Write to accounting: validated records write to QuickBooks, Xero, NetSuite, or a custom ERP via the platform's API. The write is idempotent on (vendor name + invoice number), so retries do not duplicate.

## Accuracy targets

In production, the targets for a tuned pipeline are:

- Vendor name: 99%+ match against the known vendor list (use fuzzy matching on case + whitespace + abbreviations).
- Invoice number: 99%+ exact extraction.
- Invoice date: 98%+ exact extraction.
- Line items: 92-95% extraction with full schema compliance (a description + quantity + price + total that ties to the document subtotal).
- Total: 99%+ extraction (this is the high-stakes field; mismatches always route to operator).

Anything below 92% on line items indicates the pipeline needs tuning. Common causes: low-quality OCR on poor scans, table layouts the OCR misinterprets as paragraphs, multi-page invoices where the agent loses context across pages.

## Where operators always need to take over

Three patterns route to human review 100% of the time regardless of confidence.

New vendors: the first invoice from a vendor not in the known list always gets human eyes. Operator confirms the vendor exists, adds them to the master list, and the agent learns to recognize them on subsequent invoices.

Discrepancy between subtotal and line items: if extracted line items do not sum to the extracted subtotal (within rounding tolerance), operator review. Could be OCR failure, fraud, or a legitimate adjustment line the agent missed.

Amounts over a configurable threshold: typical threshold is $5,000-$25,000 per invoice depending on company size. Above the threshold, an operator approves before the write. Catches fraud, vendor errors, and the occasional duplicate.

## Token cost

For a typical vendor invoice (1-3 pages, 20-50 line items), the cost breakdown is approximately:

- OCR: $0.01-$0.03 (provider-dependent).
- LLM extraction (Claude Sonnet or GPT-4o-class model): $0.05-$0.15 per invoice.
- Validation + write: negligible.

Total per invoice: $0.06-$0.18. At 200 invoices/month: $12-$36/month in token + OCR cost. Compare to the operator hours saved at 50-100 hours per month.

## The pilot configuration

Every DPL document-parsing pilot ships with the same week-one configuration.

A 30-invoice eval suite assembled from the client's actual invoice history (with PII redacted). The agent is tuned against this suite during week 1. Pilot acceptance criterion: 92%+ line-item accuracy on the eval suite, 99%+ on critical fields (vendor, total, invoice number).

A documented confidence threshold for operator escalation, typically 0.75 for line items and 0.85 for critical fields.

A Slack channel for operator escalations with an acknowledgment SLA of 4 business hours.

A weekly dashboard tracking per-vendor accuracy, escalation rate, total cost, and operator-hour reduction vs the prior baseline.

A 30-day pilot at $2,500 fixed. Continuation into retainer at $2,500/month is decided at day 30 based on whether the pilot hit the accuracy targets and operator-hour reduction.

If you are running invoice data entry by hand and the volume crossed 50/month, [book a free audit](/audit) and we will scope the pilot.
