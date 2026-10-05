---
title: "AI Greenhouse Event Page"
programme: "AI Greenhouse"
organisation: "SHC Tech Club"
timezone: "Asia/Hong_Kong (UTC+08:00)"
last_updated: "2026-10-05T17:20:00+08:00"
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
- `config.js`: the LEARN registration URL and the two BUILD application URLs.
- `site.js`: activates form links when valid HTTPS URLs are configured.
- `assets/shun-hing-college-logo.png`: Shun Hing College logo displayed in the page header.

The LEARN registration form and both BUILD application paths are connected. BUILD offers one form for applicants with a project proposal and another for residents who want to join a team without a proposal. The page itself collects no participant data. SHARE has separate presenter and audience placeholders until those registration links are available. Public funding amounts and funded-team counts are intentionally omitted for now; the funding eligibility rules are included.

When forms open, add their links to `config.js` and update the latest announcement and the FAQ sentence that says the form is coming soon. When each deadline passes, close the external form and update the page/button label; there is no automatic deadline enforcement.

The poster QR code and email link use https://ai-greenhouse.shc-tech-club.workers.dev/. QR assets are saved in the parent project’s `Programme/Assets/` folder.

## Local Preview

From this folder, run `python3 -m http.server 4173` and open `http://localhost:4173`.
