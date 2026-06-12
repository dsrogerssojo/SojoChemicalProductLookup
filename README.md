# Sojo Chemical Product Lookup

Static, QR-ready chemical product/SDS lookup for individual Sojo locations.

This repo is designed so a location leader can maintain the lookup by replacing a spreadsheet instead of using backend forms or a database.

## How it works

```text
QR code
  ↓
Static lookup site
  ↓
Browser fetches latest spreadsheet with cache-busting
  ↓
Spreadsheet is parsed in the browser
  ↓
Search results appear for anyone who scanned the QR
```

There is no required backend and no public submit form.

## Current build

- Location: `Langhorne - PA`
- Initial live data: `data/langhorne-sds.csv`
- Preferred live spreadsheet path: `data/current-sds-list.xlsx`

The CSV file was generated from the uploaded Langhorne SDS workbook. The website will use `data/current-sds-list.xlsx` automatically once that file is uploaded to this repo.

## Updating the SDS list

A location leader should:

1. Open the latest location workbook in Excel.
2. Add/edit products on the `SDS Info` sheet.
3. Keep the column names the same.
4. In GitHub, upload/replace the workbook at:

```text
data/current-sds-list.xlsx
```

5. Commit the change.

The next QR scan or page refresh will fetch the spreadsheet again with a timestamped URL so the browser does not reuse stale cached data.

## Important note about instant updates

The page is built to refresh from the spreadsheet every time it opens. Once the workbook has been replaced at the same public path, the next QR scan should show the new product without a backend deployment.

If you use GitHub Pages and upload the spreadsheet to the repo, GitHub may still take a short moment to publish the changed file. To reduce delay, `site.config.js` also checks the raw GitHub file URL.

## Deploying

Recommended free options:

- GitHub Pages from this repo
- Cloudflare Pages connected to this repo

If using GitHub Pages with the included workflow:

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
   - raw GitHub URL inside `EXCEL_SOURCES`, if needed
4. Replace `data/current-sds-list.xlsx` with that location's workbook.
5. Deploy and generate that location's QR code.

See `docs/leader-update-guide.md` for the exact workbook format.
