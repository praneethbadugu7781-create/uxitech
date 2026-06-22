# Build APK for website download (not Play Store)

This project is set up to produce an **`.apk`** file you host on your site (e.g. `https://www.uxitech.in/downloads/uxi-tech.apk`).

## Fastest: local build (no Expo account)

Requires **Android SDK** (Android Studio) and ~6 GB free disk space.

```powershell
cd mobile-app
npm run build:apk:local
```

Copies the APK to `../downloads/uxi-tech.apk` for your website.

---

## Cloud build (Expo EAS)

## One-time setup

1. Create a free account: https://expo.dev/signup  
2. Install EAS CLI and log in:

```bash
cd mobile-app
npm install -g eas-cli
eas login
```

3. Link the project (first time only):

```bash
eas init
```

Accept creating a project on Expo when prompted. This adds `extra.eas.projectId` to `app.json`.

## Build the APK

```bash
cd mobile-app
npm run build:apk
```

Or:

```bash
eas build --platform android --profile preview
```

- Build runs on Expo’s servers (free tier has limits).  
- When finished, open the build URL from the terminal or https://expo.dev → your project → **Builds**.  
- Click **Download** to get the `.apk` file.

## Put the APK on your website

1. Copy the downloaded file to the site repo:

```
uxi/downloads/uxi-tech.apk
```

2. Deploy your website so the file is live at:

```
https://www.uxitech.in/downloads/uxi-tech.apk
```

3. The homepage already links to that path (“Download Android App”).

> **Tip:** After each release, bump `version` in `app.json` and increment `android.versionCode` (e.g. `1` → `2`), rebuild, and replace `uxi-tech.apk` on the server.

## Updates (new APK version)

| File | Change |
|------|--------|
| `app.json` | `"version": "1.0.1"` |
| `app.json` | `"android": { "versionCode": 2 }` |

Then run `npm run build:apk` again and upload the new APK.

## Optional: build on your PC (no Expo cloud)

Requires Android SDK. On Windows this is more work; cloud build is easier.

```bash
eas build --platform android --profile preview --local
```

## Users installing from your link

Android will ask to allow installs from the browser (unknown sources). Steps:

1. Tap **Download Android App** on your site.  
2. Open the downloaded APK.  
3. Allow install if prompted.  
4. Open **UXI Tech** from the home screen.

You do **not** need Google Play for this flow.
