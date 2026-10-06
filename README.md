---
title: "AI Greenhouse Event Page"
programme: "AI Greenhouse"
organisation: "SHC Tech Club"
timezone: "Asia/Hong_Kong (UTC+08:00)"
last_updated: "2026-10-07T01:08:52+08:00"
updated_by: "Carson Ching"
---

# AI Greenhouse Event Page

A responsive, standalone static website for SHC Tech Club. No installation, build step, external fonts, or third-party scripts are required.

## Live Website

[AI Greenhouse](https://ai-greenhouse.shc-tech-club.workers.dev/)

Published on Cloudflare by Carson. Following the manual restructure, the static site files are directly in this repository root (there is no `dist` folder). Keep the existing connected Cloudflare deployment settings.

## Update the content

- `index.html`: event copy, dates, FAQs, update notice, and last-updated date.
- `styles.css`: layout and visual styling.
- `config.js`: the LEARN registration URL, the two BUILD application URLs, and the BUILD template path.
- `site.js`: activates form links when valid HTTPS URLs are configured.
- `assets/shun-hing-college-logo.png`: Shun Hing College logo displayed in the page header.

LEARN online registration is closed; the page welcomes walk-ins for 7 October, 8:00–9:30 pm, at A-303A, with priority given to registered participants. Its registration URL is cleared. The LEARN card and Registration & Apply menu show grey, disabled registration buttons labelled closed; the card retains a separate Workshop details button. Both BUILD application routes remain connected. Proposal applicants can download the Markdown template from the BUILD card. The public download URL is [https://ai-greenhouse.shc-tech-club.workers.dev/download/BUILD_application_template.md](https://ai-greenhouse.shc-tech-club.workers.dev/download/BUILD_application_template.md). `worker.js` runs first only for `/download/*`. It reads `assets/BUILD_application_template.md` and responds with `Content-Disposition: attachment`, so that URL downloads from Google Forms, email, or the browser address bar. Pages, CSS, JavaScript, images, and `/assets/*` stay on Static Assets. Opening `/assets/BUILD_application_template.md` still displays the file. The page itself collects no participant data. SHARE has separate presenter and audience placeholders until those registration links are available. Public funding amounts and funded-team counts are intentionally omitted for now; the funding eligibility rules are included.

When each deadline passes, close the external form and update the page/button label; there is no automatic deadline enforcement.

The poster QR code and email link use https://ai-greenhouse.shc-tech-club.workers.dev/. QR assets are saved in the parent project’s `Programme/Communications/Shared/` folder.

## Local Preview

From this folder, run `python3 -m http.server 4173` and open `http://localhost:4173`. That preview does not apply the download header. To check it, run `npx wrangler dev` and request `http://localhost:8787/download/BUILD_application_template.md`.

## Debug Live Demo practice page

Open `/demo` directly for the Debug Live Demo exercise. The page lives in `demo/index.html`, with its interactions in `demo/demo.js`, page layout in `demo/demo.css`, and shared styling in `styles.css`. It has no entry popup or main-navigation link. The intentionally broken interactions are part of the exercise; Reset Demo restores their starting state.

The LEARN workshop-details panel reflects the latest Redesigned guest deck: Plan, Act, Verify, webpage and planner examples, prompting, testing, and privacy. The panel omits presenter names and individual segment times. The overall event time remains 8:00–9:30 pm. See the current deck record in `../Programme/LEARN/Speaker-Materials/`.

BUILD details have two pages: experience and project categories, followed by AI subsidy selection criteria. Deadline and application links remain on the main card. The criteria concern subsidy consideration, not admission to BUILD.
