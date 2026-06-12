# Sojo Chemical Product Lookup

Static, QR-ready chemical product/SDS lookup for an individual Sojo location.

This version uses the **Power Automate CSV bridge** workaround: SharePoint Excel remains the editable source of truth, while Power Automate publishes the current rows to `data/sds.csv` in this repo.

## How it works

```text
User scans QR code
  ↓
Static lookup website opens
  ↓
Browser fetches data/sds.csv with cache-busting
  ↓
Search results render from the latest published CSV
```

The public website no longer tries to fetch SharePoint directly. That avoids SharePoint login, preview-page, and browser CORS issues.

## Current build

- Location: `Langhorne - PA`
- Website data source: `data/sds.csv`
- SharePoint publishing bridge: Power Automate
- Setup guide: `docs/power-automate-sharepoint-to-github.md`

## Updating the SDS list

A location leader should:

1. Open the shared Excel workbook in SharePoint/Excel.
2. Add or edit products on the `SDS Info` sheet.
3. Save the workbook.
4. Power Automate updates `data/sds.csv` in GitHub.
5. GitHub Pages redeploys.
6. The QR website shows the updated list.

## Required columns

The app currently looks for these headers:

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

## Deploying

For GitHub Pages:

1. Go to **Settings → Pages**.
2. Set the source to **GitHub Actions**.
3. Push to `main`.
4. Use the deployed URL as the QR-code destination.

## Creating another location build

For another location:

1. Copy/fork this repo or create a new repo from it.
2. Edit `site.config.js`.
3. Change `LOCATION_NAME` and `LOCATION_SLUG`.
4. Create a Power Automate flow for that location's SharePoint workbook.
5. Deploy that copy.
6. Generate that location's QR code from the deployed URL.
