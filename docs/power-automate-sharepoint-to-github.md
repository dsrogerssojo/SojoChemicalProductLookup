# Power Automate setup: SharePoint Excel to GitHub Pages CSV

This workaround keeps SharePoint Excel as the source of truth while letting the public QR website load a simple CSV file from the same GitHub Pages site.

## Final data flow

```text
Location leader edits Excel in SharePoint
  ↓
Power Automate reads the Excel table
  ↓
Power Automate converts rows to CSV
  ↓
Power Automate updates data/sds.csv in this GitHub repo
  ↓
GitHub Pages redeploys
  ↓
QR website loads data/sds.csv on every page load
```

## Step 1: Turn the SDS sheet into an Excel table

Power Automate reads Excel most reliably when the rows are inside a named table.

1. Open the SharePoint workbook in Excel.
2. Go to the `SDS Info` sheet.
3. Click anywhere inside the SDS list.
4. Press `Ctrl + T` or choose **Insert → Table**.
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

## Step 2: Create a GitHub token

Power Automate needs permission to update `data/sds.csv`.

1. In GitHub, open **Settings → Developer settings → Personal access tokens**.
2. Create a fine-grained token for this repository only.
3. Give it **Contents: Read and write** permission.
4. Copy the token once and store it securely.

Do not paste the token into the public repo.

## Step 3: Create the Power Automate flow

Recommended trigger for testing:

```text
Manually trigger a flow
```

Recommended trigger after testing:

```text
Recurrence → every 5 minutes
```

You can also use a SharePoint file-modified trigger, but recurrence is often simpler and more reliable for early testing.

## Step 4: Add Excel action

Add this action:

```text
Excel Online (Business) → List rows present in a table
```

Configure:

```text
Location: SharePoint Site
Document Library: the library containing the workbook
File: your SDS workbook
Table: SDSInfoTable
```

## Step 5: Create CSV table

Add this action:

```text
Data Operations → Create CSV table
```

Set **From** to the `value` output from **List rows present in a table**.

Choose **Custom columns** and map these columns exactly:

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

## Step 6: Get the existing GitHub file

Add an HTTP action:

```text
Method: GET
URI: https://api.github.com/repos/dsrogerssojo/SojoChemicalProductLookup/contents/data/sds.csv?ref=main
```

Headers:

```text
Accept: application/vnd.github+json
Authorization: Bearer YOUR_GITHUB_TOKEN
X-GitHub-Api-Version: 2022-11-28
```

## Step 7: Update the GitHub CSV file

Add another HTTP action:

```text
Method: PUT
URI: https://api.github.com/repos/dsrogerssojo/SojoChemicalProductLookup/contents/data/sds.csv
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

Important: the action name inside the expression must match your actual previous HTTP action name. If your GET step is named something else, update `Get_existing_GitHub_file` in the expression.

## Step 8: Test

1. Run the flow manually.
2. Open this repo and check `data/sds.csv`.
3. Confirm the file now contains the SharePoint Excel rows.
4. Wait for GitHub Pages to redeploy.
5. Open the QR website.
6. Add a test row in SharePoint Excel.
7. Run the flow again.
8. Refresh the QR website.

## Notes

- The QR website now reads `data/sds.csv`, not SharePoint directly.
- The website adds a timestamp to the CSV request so browsers do not reuse old cached data.
- GitHub Pages may take a short time to redeploy after the CSV file is committed.
- After testing works, change the trigger from manual to recurrence.
