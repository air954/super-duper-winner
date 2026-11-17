DAILY BASICS — iPhone installation

WHAT THIS IS
A lightweight installable web app (PWA). It works in Safari, can be added to your iPhone Home Screen, and stores your habits/goals/notes locally in that browser on that device.

IMPORTANT
To install it as an app on iPhone, it must be hosted at an HTTPS address. The easiest free option is GitHub Pages. You do not need to publish it to the App Store.

PUBLISH FREE WITH GITHUB PAGES
1. On a computer, go to https://github.com and create/sign in to an account.
2. Choose New repository. Name it daily-basics. Set it to Public. Create repository.
3. Open the repository and choose Add file > Upload files.
4. Unzip this project, then upload the CONTENTS of the daily-basics folder (index.html, styles.css, app.js, manifest.webmanifest, service-worker.js, icons folder, README.txt). Do not upload only the ZIP.
5. Choose Commit changes.
6. Open repository Settings > Pages.
7. Under Build and deployment, choose Deploy from a branch. Select branch main and folder /(root), then Save.
8. Wait a minute or two. GitHub Pages will show your website address, usually https://YOUR-USERNAME.github.io/daily-basics/
9. Open that HTTPS address in Safari on your iPhone.
10. Tap the Share button (square with upward arrow) > Add to Home Screen > Add.
11. Open Daily Basics from the new Home Screen icon.

USING IT
- Tap the circle beside a habit to mark it complete.
- Tap + Add to create your own habit.
- Your goal and reflection note save automatically.
- Use the moon/sun button to switch appearance.
- "Reset today's checks" clears only the current day's checkmarks.
- A new date starts with fresh checkmarks when you open the app.

DATA & LIMITATIONS
- Data is stored in Safari's local storage on this iPhone. It does not sync to other devices and may be lost if website data is cleared.
- The streak increments when all current habits are completed for a day. This is a simple on-device tracker, not an account-based service.
- If you edit the app files later, update the service-worker cache version in service-worker.js (e.g. daily-basics-v2) so devices fetch the new version.
