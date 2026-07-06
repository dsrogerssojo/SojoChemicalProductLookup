# Langhorne SDS System

The Langhorne lookup is fed by this CSV:

```text
data/langhorne-pa.csv
```

Power Automate should overwrite that CSV from the Langhorne SDS Excel table. The website then reads the CSV and shows a Langhorne-specific detail popup.

## Expected Langhorne Columns

Keep these columns in the Langhorne Excel table and CSV feed:

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

The website uses these exact fields for the Langhorne popup sections:

```text
Product Information:
Product Name, Company Name, Product Code, Use

SDS Document Details:
SDS #, Version #, Issue Date, Revision Date, Supersedes Date

Safety Reference:
HAZMAT Chemical Composition, HFRP Info

Official SDS:
External Link To SDS
```

## Power Automate Setup

Use a dedicated Langhorne flow.

```text
Recurrence
  -> List rows present in a table, or Run script if SDS links are Excel hyperlinks
  -> Create CSV table, unless Run script already returns CSV
  -> Get existing GitHub file
  -> Update GitHub CSV
```

The GitHub API path for Langhorne is:

```text
contents/data/langhorne-pa.csv
```

If the SDS link column contains visible text such as `SDS Link` instead of the real URL, use the Office Script hyperlink flow from `docs/power-automate.md`. Plain `List rows present in a table` will usually copy only the visible cell text, not the hidden hyperlink URL.

## Website Behavior

Langhorne uses a custom detail popup instead of the generic spreadsheet field popup. The rest of the locations still use the generic popup so their slightly different spreadsheet fields continue to display automatically.
