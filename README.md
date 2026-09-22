# AI Greenhouse Event Page

A responsive, standalone static website for SHC Tech Club. No installation, build step, external fonts, or third-party scripts are required.

## Publish with Cloudflare Pages

Push this `website` folder as its own repository, or keep it within the existing project. Connect the repository to Cloudflare Pages and choose no framework preset.

- If the repository contains this folder: set **Root directory** to `website`.
- If publishing the contents of this folder as a standalone repository: leave Root directory empty.
- **Build command:** leave empty.
- **Build output directory:** `dist`.

Only `dist` is public. Do not publish the project’s proposal, archives, or private correspondence.

## Update the content

- `dist/index.html`: event copy, dates, FAQs, update notice, and last-updated date.
- `dist/styles.css`: layout and visual styling.
- `dist/config.js`: the two registration form URLs.
- `dist/site.js`: activates form links when valid HTTPS URLs are configured.

Forms have not been created or connected. Until their URLs are added, the two form buttons are disabled and explicitly say **Coming Soon**. The page collects no participant data. Speaker lineup, support-community arrangements, and SHARE date remain Coming Soon. Public funding amounts and funded-team counts are intentionally omitted for now; the funding eligibility rules are included.

When forms open, add their links to `config.js` and update the latest announcement and the FAQ sentence that says the form is coming soon. When each deadline passes, close the external form and update the page/button label; there is no automatic deadline enforcement.

After publishing, use the permanent Pages URL (or custom domain) for the poster QR code and email link. A QR code is intentionally not generated before the final address is known.

## Local Preview

From this folder, run `python3 -m http.server 4173 --directory dist` and open `http://localhost:4173`.
