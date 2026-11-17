# Submission notes — AI for Church Hackathon 2026

## Project

- **Name:** Shepherd's Study — AI Sermon & Small-Group Studio
- **Track:** Discipleship & Spiritual Growth
- **Team:** solo — Madara (madara200599)
- **Repo:** https://github.com/madara200599/shepherds-study
- **Live demo:** https://madara200599.github.io/shepherds-study/
- **Built:** 17 November 2026 (inside the Oct 30 – Nov 27, 2026 build window)

## What it does (one paragraph for the submission form)

Shepherd's Study turns one Bible passage into a complete Sunday package — a
sermon outline with supporting verses, a memory verse, application steps,
small-group discussion questions, and prayer points. A live AI draft comes
from a free public language-model API; every quoted verse is cross-checked
against a verbatim public-domain KJV library, and if the AI service is
unreachable an offline study engine on the device produces a complete study.
Everything is labelled an AI draft and the pastor stays in charge of what
gets preached.

## Demo video (≤ 5 minutes) — shot list

1. (0:00–0:20) The problem: a solo pastor, late night, blank page.
2. (0:20–1:00) Open the demo, type `Psalm 23`, theme "The Lord is my
   shepherd", press Generate — live AI draft appears.
3. (1:00–2:00) Walk through the output: title, big idea, memory verse,
   3-point outline with verses, application, 5 discussion questions, prayer.
4. (2:00–2:45) Show the offline fallback (block network / airplane mode) —
   a complete study still generates on-device.
5. (2:45–3:30) Export: Copy as Markdown / Download .md / Print.
6. (3:30–4:00) Responsible AI: KJV cross-check, "AI draft" labelling, no
   accounts, no data collection.
7. (4:00–4:30) Close: who it helps and the ask.

Record as a screen capture with voiceover; no facecam needed.

## Judging criteria mapping

- **Ministry Impact (30%)** — saves solo pastors hours weekly; small-group
  questions extend Sunday into the week.
- **Execution & Quality (25%)** — tested live AI path and offline fallback
  end-to-end; works with no account and no cost.
- **Innovation (20%)** — faithfulness guard (verbatim-KJV cross-check) +
  graceful offline degradation; AI that admits it is a draft.
- **Faithfulness & Responsible AI (15%)** — KJV with references, human in
  the loop, no personal data, honest labelling.
- **Presentation (10%)** — demo video + write-up above.

## Registration / submission status

- Registration on aiforchurch.com requires a Cloudflare Turnstile check and
  email verification, which need a live browser session. That step is NOT
  done from this VM — it must be completed in a browser (or by Madara),
  then the project is submitted from the hackathon dashboard with the repo
  link, demo link, and video above.
- No payment, no KYC, no bank info is involved at any step. Prize payout
  (if won) is by ACH/wire to the winner — Madara's decision if it happens.

## Files

- `index.html`, `styles.css`, `app.js` — the whole app (no build step).
- `README.md` — project readme.
- `SUBMISSION.md` — this file.
