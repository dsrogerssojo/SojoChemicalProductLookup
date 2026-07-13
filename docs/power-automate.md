# Power Automate Setup

This site reads CSV files from GitHub Pages. Power Automate keeps those CSV files in sync with the private SharePoint Excel workbooks for each location.

## Data Flow

```text
SharePoint Excel workbook
  -> Power Automate flow
  -> location CSV in this repository
  -> GitHub Pages deployment
  -> SDS lookup website
```

The website never reads SharePoint directly. That keeps the public lookup simple and avoids Microsoft 365 login, preview-page, and browser CORS issues.

## Location CSV Targets

```text
Langhorne - PA  -> data/langhorne-pa.csv
Whiteland - IN  -> data/whiteland-in.csv
Temple - TX     -> data/temple-tx.csv
Redlands - CA   -> data/redlands-ca.csv
Flight          -> data/flight.csv
```

Use one flow per location. Each flow should update only its matching CSV file.

## Standard Flow

Use this flow when the SDS links are plain URL values in the Excel table.

```text
Recurrence or Manually trigger a flow
  -> List rows present in a table
  -> Create CSV table
  -> Get existing GitHub file
  -> Update GitHub CSV
```

### 1. Trigger

Use **Manually trigger a flow** while testing. After it works, use **Recurrence** every 15, 30, or 60 minutes.

### 2. List Rows Present In A Table

Action name:

```text
Excel Online (Business) -> List rows present in a table
```

Fill in the location's workbook details:

```text
Location: SharePoint site containing the workbook
Document Library: document library containing the workbook
File: location SDS workbook
Table: Excel table name
```

The table name can be different for each workbook. Use the name that exists in that workbook.

### 3. Create CSV Table

Action name:

```text
Data Operations -> Create CSV table
```

Use:

```text
From: value from List rows present in a table
Columns: Automatic
```

Automatic columns are preferred because the site can display spreadsheet-specific field names.

### 4. Get Existing GitHub File

Action name:

```text
HTTP
```

Rename the action to:

```text
Get existing GitHub file
```

Use the matching location URL:

```text
Method: GET
URI: https://api.github.com/repos/dsrogerssojo/SojoChemicalProductLookup/contents/data/LOCATION-FILE.csv?ref=main
```

Headers:

```text
Accept: application/vnd.github+json
Authorization: Bearer YOUR_GITHUB_TOKEN
X-GitHub-Api-Version: 2022-11-28
```

### 5. Update GitHub CSV

Action name:

```text
HTTP
```

Rename the action to:

```text
Update GitHub CSV
```

Use the same location URL without `?ref=main`:

```text
Method: PUT
URI: https://api.github.com/repos/dsrogerssojo/SojoChemicalProductLookup/contents/data/LOCATION-FILE.csv
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
  "content": "@{base64(body('Create_CSV_table'))}",
  "sha": "@{body('Get_existing_GitHub_file')?['sha']}",
  "branch": "main"
}
```

If Power Automate gives either action a different internal name, update the expression to match that action name.

## Hyperlink Flow

Use this option when Excel cells show text like `SDS Link` but the real URL is stored as a hyperlink. The normal **List rows present in a table** action often returns only the visible text, not the hyperlink URL.

```text
Recurrence or Manually trigger a flow
  -> Run script
  -> Get existing GitHub file
  -> Update GitHub CSV
```

In **Update GitHub CSV**, use the script result as the file content:

```json
{
  "message": "Update SDS CSV from SharePoint Excel",
  "content": "@{base64(outputs('Run_script')?['body/result'])}",
  "sha": "@{body('Get_existing_GitHub_file')?['sha']}",
  "branch": "main"
}
```

The Office Script should return a complete CSV string, including headers. Keep the script in the workbook or in the Office Scripts library, not in this public repository if it includes private workbook details.

## Testing Checklist

1. Run the flow manually.
2. Open the matching CSV file in `data/`.
3. Confirm the CSV contains the newest workbook rows.
4. Wait for the GitHub Pages deployment to finish.
5. Open the SDS lookup site.
6. Choose the matching location.
7. Confirm the new or edited row appears.

If the CSV updates in GitHub but the website does not show the change, check the selected location and confirm the flow updated the matching file path.
