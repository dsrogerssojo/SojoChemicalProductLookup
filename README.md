# Sojo Chemical Product Lookup

Static, QR-ready chemical product/SDS lookup for an individual Sojo location.

This version uses **Option A**: the public lookup page loads the current Excel workbook directly from a shareable SharePoint/Excel link every time the page opens.

## How it works

```text
User scans QR code
  ↓
Static lookup website opens
  ↓
Browser fetches the configured SharePoint Excel workbook with cache-busting
  ↓
The SDS Info sheet is parsed in the browser
  ↓
Search results render from the latest spreadsheet contents
```

There is no required backend, database, or public submit form.

## Current build

- Location: `Langhorne - PA`
- Live spreadsheet source: configured in `site.config.js`
- Sheet used by the website: `SDS Info`

## Updating the SDS list

A location leader should:

1. Open the shared Excel workbook in SharePoint/Excel.
2. Add or edit products on the `SDS Info` sheet.
3. Keep the column names the same.
4. Save the workbook.
5. Scan the QR code or refresh the page.

The site attempts to fetch the workbook fresh on every load using a timestamped URL, so the browser should not reuse stale cached data.

## Required sheet columns

The app currently looks for these headers on the `SDS Info` sheet:

```text
Product Name
Company Name
Product Code
Use
SDS #
Version #
Issue Date
Revision Date
Supersedes Date
HAZMAT Chemical Composition
HFRP Info
External Link To SDS
```

## Important SharePoint access note

The SharePoint link must allow the public website visitor's browser to download the workbook. If SharePoint returns a Microsoft sign-in page or blocks browser fetching, the app will show an error instead of records. In that case, the link needs to be changed to a direct-download/public workbook link, or the rollout should switch to a small Power Automate publishing bridge.

## Deploying

Recommended free options:

- GitHub Pages from this repo
- Cloudflare Pages connected to this repo

For GitHub Pages:

1. Go to **Settings → Pages**.
2. Set the source to **GitHub Actions**.
3. Push to `main`.
4. Use the deployed URL as the QR-code destination.

## Creating another location build

For another location:

1. Copy/fork this repo or create a new repo from it.
2. Edit `site.config.js`.
3. Change:
   - `LOCATION_NAME`
   - `LOCATION_SLUG`
   - the SharePoint/Excel URL inside `EXCEL_SOURCES`
4. Deploy that copy.
5. Generate that location's QR code from the deployed URL.
