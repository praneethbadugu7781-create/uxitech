# ⚡ Command Reference Card

## 🚀 Essential Commands

```bash
# Navigate to app folder
cd c:\uxi\mobile-app

# Install dependencies (do once)
npm install

# Start development server
npm start

# Choose platform after npm start:
# Press: a (Android emulator)
# Press: i (iOS simulator - Mac only)
# Press: w (Web browser)
# Press: c (Clear cache)
# Press: j (toggle warnings)
```

---

## 📱 Build Commands

```bash
# Build for Android
npm run android

# Build for iOS (Mac only)
npm run ios

# Build for Web
npm run web

# Build with Expo (production)
eas build --platform android
eas build --platform ios
```

---

## 📦 Package Management

```bash
# Check dependencies
npm list

# Update packages
npm update

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

---

## 🧹 Cleaning Commands

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Expo cache
rm -rf .expo
npm start  # Then press 'c'
```

---

## 🌐 Deployment Commands

```bash
# Login to EAS (one time)
eas login

# Configure for Android
eas build:configure --platform android

# Configure for iOS
eas build:configure --platform ios

# Build Android APK
eas build --platform android --local

# Build Android for Google Play
eas build --platform android

# Build iOS for App Store
eas build --platform ios

# Submit to Google Play
eas submit --platform android

# Submit to App Store
eas submit --platform ios
```

---

## 📊 Testing Commands

```bash
# Check TypeScript (if configured)
npm run type-check

# Lint code (if configured)
npm run lint

# Format code (if configured)
npm run format
```

---

## 🔍 Debugging Commands

```bash
# See what's running
npm list

# Show installed packages globally
npm list -g

# Check Node version
node -v

# Check npm version
npm -v

# Check Expo version
eas --version
```

---

## 🎯 Common Workflows

### First Time Setup
```bash
cd c:\uxi\mobile-app
npm install
npm start
# Press 'a' or 'i' to run
```

### Daily Development
```bash
npm start
# Choose platform
# Make code changes
# App reloads automatically
```

### Before Deployment
```bash
npm audit
npm update
npm start  # Test everything
eas build:configure --platform android
eas build --platform android
```

### Troubleshooting
```bash
npm start
# Press 'c' to clear cache
# Press 'r' to reload
# If still stuck: Ctrl+C and repeat
```

### Full Reset
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm start
```

---

## 🔑 Important Paths

```
App folder:     c:\uxi\mobile-app\
Source code:    c:\uxi\mobile-app\app\
Config:         c:\uxi\mobile-app\app.json
Assets:         c:\uxi\mobile-app\assets\
Documentation:  c:\uxi\mobile-app\*.md
```

---

## 📱 Running on Device

### Android Device
```bash
npm start
# Keep running
# On phone: adb devices (check connected)
# App auto-installs on connected device
```

### iOS Device (Mac only)
```bash
npm start
# Keep running
# On simulator: auto-opens
```

### Expo Go (Any Phone)
```bash
npm start
# Scan QR code with phone camera
# Opens in Expo Go app
# Easiest for quick testing
```

---

## 🆘 Quick Fixes

**App won't start?**
```bash
npm start
# Press 'c' to clear cache
# If still broken:
rm -rf .expo
npm start
```

**Dependencies broken?**
```bash
npm install
```

**Stuck on loading?**
```bash
# Stop: Ctrl+C
npm start
# Press 'c' to clear
```

**Weird errors?**
```bash
# Full reset:
rm -rf node_modules package-lock.json
npm install
npm start
```

---

## 📞 Getting Help

**Common issues:**
- Check MOBILE_APP_README.md troubleshooting
- Check DEPLOYMENT_GUIDE.md (for deploy issues)
- Check Expo docs: https://docs.expo.dev

**External resources:**
- React Native: https://reactnative.dev
- Expo: https://docs.expo.dev
- Stack Overflow: Search your error

---

## ✅ Command Checklist

- [ ] `cd c:\uxi\mobile-app`
- [ ] `npm install`
- [ ] `npm start`
- [ ] Press 'a' or 'i'
- [ ] See your app running!

---

## 📋 Reference Sheet

Keep this handy for quick commands:

| What | Command |
|------|---------|
| Start app | `npm start` |
| Run Android | `npm run android` |
| Run iOS | `npm run ios` |
| Install deps | `npm install` |
| Update deps | `npm update` |
| Clear cache | `npm start` → press 'c' |
| Build APK | `eas build --platform android` |
| Build IPA | `eas build --platform ios` |
| Full reset | `rm -rf node_modules && npm install` |

---

**Print this page for quick reference!** 🖨️
