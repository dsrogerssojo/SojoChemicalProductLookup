# Power Automate Flow Template

Use this same flow for each location. The only things that change are the Excel workbook details and the GitHub CSV path.

## Flow Steps

```text
Recurrence
  ↓
List rows present in a table
  ↓
Create CSV table
  ↓
Get existing GitHub file
  ↓
Update GitHub CSV
```

## Flow Names

Create one flow for each location:

```text
SDS CSV Sync - Langhorne PA
SDS CSV Sync - Whiteland IN
SDS CSV Sync - Temple TX
SDS CSV Sync - Redlands CA
```

## Step 1: Recurrence

Use this while testing:

```text
Interval: 5
Frequency: Minute
```

After testing, you can change it to every 15, 30, or 60 minutes.

## Step 2: List Rows Present In A Table

Action:

```text
Excel Online (Business) -> List rows present in a table
```

Leave these fields blank until the Excel file exists:

```text
Location: ______________________________
Document Library: ______________________
File: _________________________________
Table: SDSInfoTable
```

Recommended Excel table name:

```text
SDSInfoTable
```

The Excel table should use these headers:

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

## Step 3: Create CSV Table

Action:

```text
Data Operations -> Create CSV table
```

Use:

```text
From: value from List rows present in a table
Columns: Custom
```

Map the custom columns to the same SDS headers listed above.

## Step 4: Get Existing GitHub File

Action:

```text
HTTP
```

Use one of these URIs:

```text
Langhorne:
https://api.github.com/repos/dsrogerssojo/SojoChemicalProductLookup/contents/data/langhorne-pa.csv?ref=main

Whiteland:
https://api.github.com/repos/dsrogerssojo/SojoChemicalProductLookup/contents/data/whiteland-in.csv?ref=main

Temple:
https://api.github.com/repos/dsrogerssojo/SojoChemicalProductLookup/contents/data/temple-tx.csv?ref=main

Redlands:
https://api.github.com/repos/dsrogerssojo/SojoChemicalProductLookup/contents/data/redlands-ca.csv?ref=main
```

Settings:

```text
Method: GET
```

Headers:

```text
Accept: application/vnd.github+json
Authorization: Bearer YOUR_GITHUB_TOKEN
X-GitHub-Api-Version: 2022-11-28
```

## Step 5: Update GitHub CSV

Action:

```text
HTTP
```

Use the same location path, but without `?ref=main`:

```text
Langhorne:
https://api.github.com/repos/dsrogerssojo/SojoChemicalProductLookup/contents/data/langhorne-pa.csv

Whiteland:
https://api.github.com/repos/dsrogerssojo/SojoChemicalProductLookup/contents/data/whiteland-in.csv

Temple:
https://api.github.com/repos/dsrogerssojo/SojoChemicalProductLookup/contents/data/temple-tx.csv

Redlands:
https://api.github.com/repos/dsrogerssojo/SojoChemicalProductLookup/contents/data/redlands-ca.csv
```

Settings:

```text
Method: PUT
```

Headers:

```text
Accept: application/vnd.github+json
Authorization: Bearer YOUR_GITHUB_TOKEN
Content-Type: application/json
X-GitHub-Api-Version: 2022-11-28
```

Body:

```json
{
  "message": "Update SDS CSV from SharePoint Excel",
  "content": "@{base64(outputs('Create_CSV_table'))}",
  "sha": "@{body('Get_existing_GitHub_file')?['sha']}",
  "branch": "main"
}
```

If your GET action has a different name, update this part:

```text
body('Get_existing_GitHub_file')
```

For example, if the action is named `Get existing Github file`, Power Automate may show it as:

```text
body('Get_existing_Github_file')
```

## What To Fill In Later

When each Excel workbook exists, fill in only this part of each flow:

```text
Location: SharePoint site
Document Library: document library
File: location SDS workbook
Table: SDSInfoTable
```

Everything else can stay the same except the location-specific GitHub CSV path.
