---
title: "AI Greenhouse Event Page"
programme: "AI Greenhouse"
organisation: "SHC Tech Club"
timezone: "Asia/Hong_Kong (UTC+08:00)"
last_updated: "2026-10-05T16:48:08+08:00"
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
- `config.js`: the two registration form URLs.
- `site.js`: activates form links when valid HTTPS URLs are configured.
- `assets/shun-hing-college-logo.png`: Shun Hing College logo displayed in the page header.

The LEARN registration form is connected. The BUILD application has not been created or connected, so its button remains disabled and explicitly says **Coming Soon**. The page itself collects no participant data. Speaker lineup, support-community arrangements, and SHARE date remain Coming Soon. Public funding amounts and funded-team counts are intentionally omitted for now; the funding eligibility rules are included.

When forms open, add their links to `config.js` and update the latest announcement and the FAQ sentence that says the form is coming soon. When each deadline passes, close the external form and update the page/button label; there is no automatic deadline enforcement.

The poster QR code and email link use https://ai-greenhouse.shc-tech-club.workers.dev/. QR assets are saved in the parent project’s `Programme/Assets/` folder.

## Local Preview

From this folder, run `python3 -m http.server 4173` and open `http://localhost:4173`.
