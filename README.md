# Sojo SDS Lookup

Static SDS lookup site for Sojo locations. The site opens with a location picker, then loads the selected location's CSV feed and renders searchable SDS records.

## Locations

Locations are configured in `site.config.js`.

```text
Langhorne - PA  -> data/langhorne-pa.csv
Whiteland - IN  -> data/whiteland-in.csv
Temple - TX     -> data/temple-tx.csv
Redlands - CA   -> data/redlands-ca.csv
Flight          -> data/flight.csv
```

Each CSV is updated by a location-specific Power Automate flow from that location's SharePoint Excel workbook.

## Architecture

```text
SharePoint Excel workbook
  -> Power Automate
  -> CSV file in data/
  -> GitHub Pages
  -> Browser lookup
```

The website does not fetch SharePoint directly. It only reads the public CSV files in `data/`, which keeps the lookup fast and avoids Microsoft 365 authentication issues for QR-code users.

## Spreadsheet Fields

The location spreadsheets can use slightly different column names. The app normalizes the common search fields and also preserves the original spreadsheet field names for the record detail view.

Recognized common fields include product name, company, product code, use, storage location, review dates, SDS availability, and SDS link. Any additional populated spreadsheet columns are still displayed in the detail modal.

## Local Development

Serve the folder with any static file server:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

The site uses plain HTML, CSS, and JavaScript. There is no build step.

## Power Automate

Power Automate setup is documented in `docs/power-automate.md`.
Langhorne-specific setup is documented in `docs/langhorne-sds-system.md`.

Use these GitHub API content paths:

```text
contents/data/langhorne-pa.csv
contents/data/whiteland-in.csv
contents/data/temple-tx.csv
contents/data/redlands-ca.csv
contents/data/flight.csv
```

## New Chemical Requests

The lightweight request process is documented in `docs/new-chemical-request.md`.

## Deployment

Deployment uses GitHub Pages from `.github/workflows/deploy-pages.yml`.

For a new repository setup:

1. Go to **Settings -> Pages**.
2. Set the source to **GitHub Actions**.
3. Push to `main`.
4. Use the deployed GitHub Pages URL or a custom domain as the QR-code destination.
