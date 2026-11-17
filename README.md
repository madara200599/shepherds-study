# Shepherd's Study — AI Sermon & Small-Group Studio

**AI for Church Hackathon 2026 · Track: Discipleship & Spiritual Growth**

Turn one Bible passage into a whole Sunday: a sermon outline, supporting
Scripture, application, small-group discussion questions, and prayer points —
drafted by AI, finished by a pastor.

## Live demo

https://madara200599.github.io/shepherds-study/

No sign-up, no cost, no tracking. Works in any modern browser.

## How it works

1. Enter a passage (e.g. `Psalm 23`, `Luke 15:11-32`), an optional theme,
   audience, sermon length, and how many points and questions you want.
2. **Live AI draft** — the app asks a language model (public Pollinations
   text API, free, no key, no account) for a structured study plan in JSON.
3. **Faithfulness guard** — every verse the model quotes is cross-checked
   against a curated, verbatim King James Version library (public domain) in
   the app. If the model paraphrased or abbreviated a verse we hold, the
   exact KJV text is substituted.
4. **Offline fallback** — if the AI service is unreachable, a built-in study
   engine (curated KJV verse library + sermon structure) generates a complete
   study entirely on your device. Nothing you type leaves the browser in
   offline mode.
5. Export the result as Markdown (copy or download) or print it.

## Why this matters (ministry impact)

Small-church pastors often prepare sermons alone, late at night, with no
staff. Shepherd's Study turns hours of blank-page preparation into a
reviewable first draft in under a minute — while keeping the pastor, not the
machine, in charge of what gets preached. Every output is labelled an AI
draft, every verse carries its reference, and the app tells the user to verify
all Scripture in their own Bible before preaching.

## Responsible AI

- AI drafts; humans decide. The app never presents generated content as
  finished teaching.
- Scripture is quoted from the public-domain KJV, with references, so anyone
  can verify it in seconds.
- No personal data is collected. No accounts. Demo data only — never real
  congregant information.
- The project was built with AI assistance (Muse) and all code, copy, and
  verse selections are original work created for this hackathon
  (Oct 30 – Nov 27, 2026 build window).

## Tech

- Static site: `index.html` + `styles.css` + `app.js`. No build step, no
  dependencies, no server.
- Live AI: `https://text.pollinations.ai/` (free public API, model `openai`).
- Offline engine: ~45-verse KJV library with topic matching and sermon
  structure templates, all client-side.

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Submission (AI for Church Hackathon 2026)

- Event: https://aiforchurch.com/hackathon
- Track: Discipleship & Spiritual Growth
- Demo video: ≤ 5 minutes (see `SUBMISSION.md`)
- Built: November 17, 2026 (inside the Oct 30 – Nov 27, 2026 window)

## License

Code: MIT. Scripture quotations: King James Version (public domain).
