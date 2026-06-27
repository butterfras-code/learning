# LDE Survey Deployment

This survey is split into two parts:

- `index.html` is the public survey page. Host this file with GitHub Pages.
- `Code.gs` is the Apps Script web app endpoint. It only writes submitted survey data to Google Sheets.

The Apps Script URL should not be the page users open anymore.

## Apps Script Setup

1. Go to https://script.google.com/.
2. Create a new project.
3. Rename the default server file to `Code.gs` if needed.
4. Paste the full contents of `Code.gs`.
5. Save the project.

Do not add an Apps Script HTML file. `Code.gs` is only the data endpoint.

## Apps Script Deploy

1. Click `Deploy > New deployment`.
2. Click the gear icon and choose `Web app`.
3. Set:
   - Description: `LDE Survey submissions`
   - Execute as: `Me`
   - Who has access: `Anyone`
4. Click `Deploy`.
5. Approve the permissions prompt.
6. Copy the deployed `/exec` URL.

The script writes responses into:

`https://docs.google.com/spreadsheets/d/1Ofw9JNH8mOFKwmS72QTMzRRz98rNXarvet3NQEeL9Go/edit`

It creates a `Survey Responses` tab automatically if it does not already exist.

## Connect GitHub Pages to Apps Script

1. Open `index.html`.
2. Replace this placeholder near the top of the script:

   ```js
   const SCRIPT_URL = 'PASTE_YOUR_APPS_SCRIPT_EXEC_URL_HERE';
   ```

   with the Apps Script `/exec` URL from the deployment step.

3. Commit and push `index.html`, `Code.gs`, and `DEPLOYMENT.md`.

## GitHub Pages Setup

If this repository already has GitHub Pages enabled from the repo root, the survey page will be available at:

`https://<github-user-or-org>.github.io/<repo-name>/other/lde-survey/`

If Pages is not enabled yet:

1. Go to the repository on GitHub.
2. Open `Settings > Pages`.
3. Set `Source` to `Deploy from a branch`.
4. Choose the branch that contains this folder.
5. Choose the folder GitHub Pages should serve from.
6. Save.

## Updating Later

After editing `Code.gs`:

1. Save the Apps Script project.
2. Click `Deploy > Manage deployments`.
3. Select the existing web app deployment.
4. Click the pencil/edit icon.
5. Change `Version` to `New version`.
6. Click `Deploy`.

After editing `index.html`, commit and push the file. GitHub Pages will update the public survey page.

## Important Behavior

The page submits to Apps Script with a simple `text/plain` POST and `no-cors` fetch mode. This avoids browser preflight requests that Apps Script web apps do not handle cleanly. Because the browser receives an opaque response in this mode, the page treats a completed network request as submitted and then shows the thank-you screen.
