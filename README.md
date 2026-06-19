# Sojo SDS Lookup

Static, QR-ready SDS lookup for Sojo locations.

The site opens with a Sojo location popup. After the user chooses a location, the browser loads that location's separate CSV data feed and displays the SDS lookup in the same format as the current Langhorne lookup.

## Locations

Locations are configured in `site.config.js`.

```text
Langhorne - PA  -> data/langhorne-pa.csv
Whiteland - IN  -> data/whiteland-in.csv
Temple - TX     -> data/temple-tx.csv
Redlands - CA   -> data/redlands-ca.csv
```

Each CSV should be updated by its own Power Automate flow from that location's SharePoint Excel workbook.

## How It Works

```text
User opens the website
  ↓
Location popup appears
  ↓
User chooses a location
  ↓
Browser fetches that location's CSV with cache-busting
  ↓
Search results render from the latest published location CSV
```

The public website does not fetch SharePoint directly. Power Automate publishes the Excel table data into GitHub as CSV files, which avoids SharePoint login, preview-page, and browser CORS issues.

## Required Columns

Each location CSV should use these headers:

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

## Updating SDS Lists

A location leader should:

1. Open the shared Excel workbook in SharePoint/Excel.
2. Add or edit products on the `SDS Info` sheet.
3. Save the workbook.
4. Power Automate updates that location's CSV in GitHub.
5. GitHub Pages redeploys.
6. The website shows the updated list after the location is selected.

## Power Automate CSV Targets

Use one flow per location, or one shared flow with a location-specific CSV path.

```text
Langhorne - PA  -> contents/data/langhorne-pa.csv
Whiteland - IN  -> contents/data/whiteland-in.csv
Temple - TX     -> contents/data/temple-tx.csv
Redlands - CA   -> contents/data/redlands-ca.csv
```

Detailed setup steps are in `docs/power-automate-sharepoint-to-github.md`.

## Deploying

For GitHub Pages:

1. Go to **Settings -> Pages**.
2. Set the source to **GitHub Actions**.
3. Push to `main`.
4. Use the deployed URL as the QR-code destination.
