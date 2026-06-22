# 📦 Deployment & Distribution Guide

## Pre-Deployment Checklist

- [ ] Test all 5 screens on iOS simulator
- [ ] Test all 5 screens on Android emulator
- [ ] Test contact form validation
- [ ] Test all external links (phone, email, Instagram)
- [ ] Update version number in `app.json`
- [ ] Update app icon and splash screen
- [ ] Test on real devices if possible

## 🤖 Android Deployment

### Step 1: Create EAS Account
```bash
npm install -g eas-cli
eas login
```

### Step 2: Configure Android
```bash
eas build:configure --platform android
```

### Step 3: Build APK
```bash
# For testing on device
eas build --platform android --local

# For Google Play Store
eas build --platform android
```

### Step 4: Upload to Google Play Store
1. Go to [Google Play Console](https://play.google.com/console)
2. Create new app: "UXI Digital Agency"
3. Fill in app details:
   - Description: "Premium digital solutions for your business"
   - Category: Business
   - Content rating: Low-risk content
4. Upload APK/AAB from EAS dashboard
5. Submit for review (takes 24-48 hours)

### Google Play Requirements
- ✅ Privacy policy: https://www.uxitech.in/privacy
- ✅ Contact email: uxitech.in@gmail.com
- ✅ App icon (512x512 PNG)
- ✅ Screenshots (min 2)
- ✅ Feature graphic (1024x500 PNG)
- ✅ Content rating questionnaire

---

## 🍎 iOS Deployment

### Step 1: Create Apple Developer Account
- Go to [Apple Developer Program](https://developer.apple.com)
- Enroll ($99/year)
- Create App ID "com.uxitech.mobile"

### Step 2: Configure iOS
```bash
eas build:configure --platform ios
```

### Step 3: Build IPA
```bash
# For TestFlight (testing)
eas build --platform ios --auto-submit

# Manual submission
eas build --platform ios
```

### Step 4: Upload to App Store
1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Create new app:
   - Name: "UXI"
   - Bundle ID: "com.uxitech.mobile"
   - SKU: "com.uxitech.app"
3. Fill in metadata:
   - Description
   - Keywords
   - Screenshot (min 2 per device type)
   - Category: Business
   - Age rating: 4+
4. Submit for review (takes 24-48 hours)

### App Store Requirements
- ✅ Privacy policy: https://www.uxitech.in/privacy
- ✅ Support URL: https://www.uxitech.in
- ✅ Contact email: uxitech.in@gmail.com
- ✅ App icons (all sizes)
- ✅ Screenshots (1242x2208 for iPhone)
- ✅ Preview video (optional)

---

## 📝 App Store Metadata

### Name
```
UXI - Digital Agency
```

### Subtitle (iOS)
```
Premium Design & Development
```

### Description
```
UXI is your partner for premium digital experiences. We specialize in:

✨ Web Design & Development
✨ UI/UX Design
✨ Branding & Identity
✨ Business Automation
✨ Marketing & Ads
✨ Social Media Management
✨ Video Production
✨ Professional Photography

With 50+ successful projects and 100% client satisfaction, we bring your vision to life.

Contact us:
📞 9391781748
📧 uxitech.in@gmail.com
📸 @uxitech.in
🌐 www.uxitech.in
```

### Keywords
```
design, development, web design, ui ux, branding, automation, digital agency, mobile app, portfolio, services
```

---

## 🔄 Update Management

### Version Numbers
Use semantic versioning: MAJOR.MINOR.PATCH

```json
{
  "version": "1.0.0"  // Initial release
  "version": "1.1.0"  // New features
  "version": "1.0.1"  // Bug fixes
}
```

### Update Steps
1. Update version in `app.json`
2. Update version in `package.json`
3. Build new binary
4. Submit to app stores
5. Monitor for approval

---

## 🖼️ Screenshots & Assets

### Recommended Screenshots (show key features)
1. Home screen with services
2. Portfolio showcase
3. About section
4. Contact form
5. Bottom navigation

### App Icon
- Format: PNG
- Android: 512x512px
- iOS: 1024x1024px
- No rounded corners (system handles)

### Splash Screen
- Format: PNG
- Size: 1125x2436px (iPhone)
- Design: UXI logo on dark background

---

## 📊 After Launch

### Monitor Performance
- Download analytics from app stores
- Track user retention
- Monitor crash reports
- Collect user reviews

### Collect Feedback
- Respond to app store reviews
- Monitor ratings
- Implement requested features
- Fix reported bugs

### Maintenance Schedule
- Weekly: Check crash reports
- Monthly: Review analytics
- Quarterly: Major updates
- As needed: Security patches

---

## 🚀 Marketing Tips

- 📱 Share download links on Instagram
- 🔗 Add app store links to website
- 📧 Email clients about app launch
- 💬 Highlight app-exclusive features
- 🎬 Create demo video
- ⭐ Encourage user reviews

### Share Links

**Google Play:**
```
https://play.google.com/store/apps/details?id=com.uxitech.mobile
```

**App Store:**
```
https://apps.apple.com/app/uxi/id[APP_ID]
```

---

## ❓ Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .expo
rm -rf node_modules
npm install

# Prebuild
eas build:configure
```

### Submit Issues
- Check all required fields
- Verify bundle ID is correct
- Ensure privacy policy exists
- Screenshots must match content

### Rejection Reasons
- ❌ Crashes on launch
- ❌ Missing privacy policy
- ❌ Misleading content
- ❌ External links don't work
- ❌ Contact info incorrect

---

## 📞 Support Contacts

- **EAS Support**: https://docs.expo.dev
- **Google Play**: support@google.com
- **Apple Support**: https://developer.apple.com/support
- **UXI Support**: uxitech.in@gmail.com

---

**Ready to launch? Let's go! 🚀**
