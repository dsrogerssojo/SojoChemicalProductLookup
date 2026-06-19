# Power Automate Setup: SharePoint Excel To GitHub CSV

This setup keeps each location's SharePoint Excel workbook as the source of truth while letting the public GitHub Pages website load simple CSV files from this repository.

## Final Data Flow

```text
Location leader edits Excel in SharePoint
  ↓
Power Automate reads the Excel table
  ↓
Power Automate converts rows to CSV
  ↓
Power Automate updates that location's CSV in GitHub
  ↓
GitHub Pages redeploys
  ↓
The website loads the selected location's CSV
```

## Location CSV Files

Use these GitHub file paths for the four flows:

```text
Langhorne - PA  -> data/langhorne-pa.csv
Whiteland - IN  -> data/whiteland-in.csv
Temple - TX     -> data/temple-tx.csv
Redlands - CA   -> data/redlands-ca.csv
```

The GitHub API `contents` paths are:

```text
contents/data/langhorne-pa.csv
contents/data/whiteland-in.csv
contents/data/temple-tx.csv
contents/data/redlands-ca.csv
```

## Step 1: Turn Each SDS Sheet Into An Excel Table

Power Automate reads Excel most reliably when rows are inside a named table.

1. Open the location's SharePoint workbook in Excel.
2. Go to the `SDS Info` sheet.
3. Click inside the SDS list.
4. Press `Ctrl + T` or choose **Insert -> Table**.
5. Confirm that **My table has headers** is checked.
6. With the table selected, go to **Table Design**.
7. Rename the table to:

```text
SDSInfoTable
```

Keep these column headers:

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

## Step 2: Create A GitHub Token

Power Automate needs permission to update the CSV files.

1. In GitHub, open **Settings -> Developer settings -> Personal access tokens**.
2. Create a fine-grained token for this repository only.
3. Give it **Contents: Read and write** permission.
4. Copy the token once and store it securely.

Do not paste the token into the public repo.

## Step 3: Create One Flow Per Location

Recommended trigger for testing:

```text
Manually trigger a flow
```

Recommended trigger after testing:

```text
Recurrence -> every 5 minutes
```

You can also use a SharePoint file-modified trigger, but recurrence is often simpler and more reliable for early testing.

## Step 4: Add The Excel Action

Add this action:

```text
Excel Online (Business) -> List rows present in a table
```

Configure it for the location's SharePoint workbook:

```text
Location: SharePoint Site
Document Library: the library containing the workbook
File: that location's SDS workbook
Table: SDSInfoTable
```

## Step 5: Create CSV Table

Add this action:

```text
Data Operations -> Create CSV table
```

Set **From** to the `value` output from **List rows present in a table**.

Choose **Custom columns** and map the required SDS columns exactly.

## Step 6: Get The Existing GitHub CSV

Add an HTTP action.

For Langhorne:

```text
Method: GET
URI: https://api.github.com/repos/dsrogerssojo/SojoChemicalProductLookup/contents/data/langhorne-pa.csv?ref=main
```

For another location, replace `data/langhorne-pa.csv` with that location's CSV path.

Headers:

```text
Accept: application/vnd.github+json
Authorization: Bearer YOUR_GITHUB_TOKEN
X-GitHub-Api-Version: 2022-11-28
```

## Step 7: Update The GitHub CSV

Add another HTTP action.

For Langhorne:

```text
Method: PUT
URI: https://api.github.com/repos/dsrogerssojo/SojoChemicalProductLookup/contents/data/langhorne-pa.csv
```

For another location, replace `data/langhorne-pa.csv` with that location's CSV path.

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

Important: the action name inside the expression must match your actual previous HTTP action name. If your GET step is named something else, update `Get_existing_GitHub_file` in the expression.

## Step 8: Test

1. Run the flow manually.
2. Open this repo and check the location CSV.
3. Confirm the file contains the SharePoint Excel rows.
4. Wait for GitHub Pages to redeploy.
5. Open the QR website.
6. Choose the matching location from the popup.
7. Add a test row in SharePoint Excel.
8. Run the flow again.
9. Refresh the QR website and choose the location again.

## Notes

- The website reads CSV files from `data/`, not SharePoint directly.
- The website adds a timestamp to CSV requests so browsers do not reuse old cached data.
- GitHub Pages may take a short time to redeploy after a CSV file is committed.
- After testing works, change each flow from manual to recurrence or a SharePoint trigger.
