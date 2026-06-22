# ✅ UXI Mobile App - Setup & Launch Checklist

## 📋 Pre-Launch Checklist

### Phase 1: Setup ✨

- [ ] Clone/navigate to `mobile-app` directory
- [ ] Run `npm install` (dependencies)
- [ ] Verify all packages installed successfully
- [ ] Check Node.js version (16+ required): `node -v`
- [ ] Verify Expo CLI installed: `npm list -g eas-cli`

### Phase 2: Local Testing 🧪

**Test on Android:**
- [ ] Run `npm start`
- [ ] Press `a` for Android emulator
- [ ] App launches without crashes
- [ ] All 5 tabs appear in bottom navigation
- [ ] Icons display correctly
- [ ] Dark theme looks good
- [ ] Gradients render properly

**Test on iOS:**
- [ ] Run `npm start`
- [ ] Press `i` for iOS simulator (Mac only)
- [ ] App launches without crashes
- [ ] All 5 tabs appear in bottom navigation
- [ ] Icons display correctly
- [ ] Animations are smooth
- [ ] Safe area handled correctly

**Test on Web:**
- [ ] Run `npm start`
- [ ] Press `w` for web preview
- [ ] Layout is responsive
- [ ] Touch/click interactions work
- [ ] Navigation works

### Phase 3: Screen Testing 🎨

**Home Screen:**
- [ ] Hero section displays
- [ ] UXI logo visible
- [ ] Services grid shows all 8 services
- [ ] Stats display (50+, 100%, 24/7)
- [ ] CTA buttons are clickable
- [ ] Scroll is smooth
- [ ] Images/icons load

**Services Screen:**
- [ ] All 8 services listed
- [ ] Each service has icon and description
- [ ] Feature lists are readable
- [ ] Learn More buttons are interactive
- [ ] Scrolling is smooth

**Portfolio Screen:**
- [ ] 3 projects display
- [ ] Project cards have proper styling
- [ ] Category badges show
- [ ] View Project buttons work
- [ ] Stats section displays
- [ ] Website link works

**About Screen:**
- [ ] Mission statement displays
- [ ] Philosophy items show (01, 02, 03)
- [ ] Stats boxes are styled correctly
- [ ] Process steps display (01-04)
- [ ] Values cards show (Excellence, Collaboration, Innovation)
- [ ] All text is readable

**Contact Screen:**
- [ ] Contact info cards display
- [ ] Contact form fields are visible
- [ ] Form inputs are interactive
- [ ] Send button is clickable
- [ ] Phone icon is clickable (should dial)
- [ ] Email icon works (should open mail)
- [ ] Instagram link works
- [ ] Quick action buttons visible

### Phase 4: Functionality Testing 🔧

**Navigation:**
- [ ] Tab switching is smooth
- [ ] Active tab indicator shows
- [ ] No lag between screens
- [ ] Back gestures work (if available)

**Contact Form:**
- [ ] Can type in all fields
- [ ] Form validates empty fields
- [ ] Success message shows after submit
- [ ] Fields clear after submit

**External Links:**
- [ ] Phone link opens dialer
- [ ] Email link opens mail app
- [ ] Instagram opens correct profile
- [ ] Website links open browser

**Scrolling:**
- [ ] Smooth scroll on all screens
- [ ] No jank or stuttering
- [ ] Pull-to-refresh works (if enabled)

### Phase 5: Performance ⚡

- [ ] App starts in < 3 seconds
- [ ] Screen transitions smooth
- [ ] No memory warnings
- [ ] No console errors
- [ ] Animations at 60 FPS
- [ ] No lag when scrolling

### Phase 6: Design Quality 🎨

**Visual:**
- [ ] Colors match brand (blue #0066ff, cyan #00d4ff)
- [ ] Gradients look smooth
- [ ] Icons are crisp and clear
- [ ] Text is readable
- [ ] Spacing is consistent

**Responsiveness:**
- [ ] Looks good on small phones (320px)
- [ ] Looks good on regular phones (375px)
- [ ] Looks good on large phones (414px+)
- [ ] Tablet layout works (if enabled)

**Dark Mode:**
- [ ] Text contrast is good
- [ ] No harsh bright areas
- [ ] Readable at night
- [ ] Professional appearance

### Phase 7: Pre-Build Review 📝

**Code Quality:**
- [ ] No TypeScript errors: `npm run type-check` (if available)
- [ ] No console warnings (except known)
- [ ] Clean folder structure
- [ ] Comments where needed

**Configuration:**
- [ ] `app.json` configured correctly
- [ ] `package.json` has correct version
- [ ] Correct app name and slug
- [ ] Correct bundle IDs set

**Assets:**
- [ ] App icon exists and is correct size
- [ ] Splash screen exists
- [ ] No missing image errors

### Phase 8: Customization ✏️

**Before Publishing:**
- [ ] [ ] Update phone number if needed: `contact.tsx`
- [ ] [ ] Update email if needed: `contact.tsx`
- [ ] [ ] Update Instagram handle if needed: `contact.tsx`
- [ ] [ ] Review all service descriptions
- [ ] [ ] Review portfolio projects
- [ ] [ ] Update company info in About screen
- [ ] [ ] Verify all links are correct

**App Metadata:**
- [ ] [ ] App name is correct
- [ ] [ ] Slug is correct
- [ ] [ ] Bundle ID is set (for stores)
- [ ] [ ] Version is 1.0.0
- [ ] [ ] Description is set

### Phase 9: Build & Distribution 🚀

**Android Build:**
- [ ] [ ] Run: `eas build --platform android`
- [ ] [ ] Download APK from EAS
- [ ] [ ] Test APK on Android device
- [ ] [ ] Verify app launches
- [ ] [ ] Test all 5 screens
- [ ] [ ] Test contact form
- [ ] [ ] Test external links

**iOS Build:** (requires Mac)
- [ ] [ ] Run: `eas build --platform ios`
- [ ] [ ] Download IPA from EAS
- [ ] [ ] Test IPA on iOS device
- [ ] [ ] Verify app launches
- [ ] [ ] Test all 5 screens
- [ ] [ ] Test contact form
- [ ] [ ] Test external links

**App Store Submission:**
- [ ] [ ] Create developer accounts
- [ ] [ ] Prepare app store metadata
- [ ] [ ] Create app icons (1024x1024)
- [ ] [ ] Take screenshots (min 2 each)
- [ ] [ ] Write compelling description
- [ ] [ ] Set category and keywords
- [ ] [ ] Submit for review

### Phase 10: Launch 🎉

**Pre-Launch:**
- [ ] [ ] Monitor app store submissions
- [ ] [ ] Prepare announcement
- [ ] [ ] Create social media posts
- [ ] [ ] Update website with download links
- [ ] [ ] Prepare email announcement

**Post-Launch:**
- [ ] [ ] Monitor analytics
- [ ] [ ] Check crash reports
- [ ] [ ] Respond to reviews
- [ ] [ ] Collect user feedback
- [ ] [ ] Plan first update

---

## 🐛 Troubleshooting Guide

### "npm install fails"
```bash
# Solution:
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### "App won't start"
```bash
# Solution:
npm start --clear
# or
npm run prebuild --clean
npm install
npm start
```

### "Metro bundler errors"
```bash
# Solution:
npm start
# Press: c (to clear cache)
# Then try again
```

### "TypeScript errors"
```bash
# Most errors are warnings, app still runs
# Check the error messages and adjust if needed
npm start # will still work
```

### "Emulator won't launch"
```bash
# For Android:
emulator -list-avds  # See available devices
emulator -avd <device_name>  # Launch specific device

# For iOS:
xcrun simctl list  # See available simulators
npm start  # Then press i
```

### "Links don't work"
- Check that phone/email/instagram values are correct
- Test on real device (simulator may have limitations)
- Verify deeplinks are enabled in settings

---

## 📊 File Verification

### Required Files Check

```
mobile-app/
├── ✅ app/
│   ├── ✅ (tabs)/
│   │   ├── ✅ _layout.tsx
│   │   ├── ✅ index.tsx
│   │   ├── ✅ services.tsx
│   │   ├── ✅ portfolio.tsx
│   │   ├── ✅ about.tsx
│   │   └── ✅ contact.tsx
│   └── ✅ _layout.tsx
├── ✅ assets/
│   ├── ✅ images/
│   └── ✅ expo.icon/
├── ✅ index.js
├── ✅ app.json
├── ✅ package.json
├── ✅ tsconfig.json
└── ✅ Documentation files

Total: 7 screens + 1 root layout + docs + config
```

---

## 🎯 Success Criteria

✅ **App Launches**
- No crashes on startup
- All screens accessible
- Bottom nav works

✅ **Navigation Works**
- All 5 tabs clickable
- Smooth transitions
- No navigation errors

✅ **Content Displays**
- All text readable
- Images/icons load
- Gradients render

✅ **Interactions Work**
- Form fields editable
- Buttons clickable
- Links open correctly

✅ **Performance Good**
- No lag or stuttering
- Smooth scrolling
- Fast screen transitions

✅ **Looks Professional**
- Brand colors correct
- Spacing consistent
- Typography clean
- Dark theme beautiful

---

## 🔄 Build Commands Reference

```bash
# Development
npm start              # Start dev server
npm run android        # Build for Android
npm run ios           # Build for iOS (Mac only)
npm run web           # Preview on web

# Production
eas build --platform android    # EAS build Android
eas build --platform ios        # EAS build iOS
eas submit --platform android   # Submit to Google Play
eas submit --platform ios       # Submit to App Store

# Utilities
npm run prebuild              # Generate native folders
npm run prebuild --clean      # Clean prebuild
npm run type-check            # Check TypeScript (if available)
npm install                   # Install dependencies
npm update                    # Update packages
```

---

## 📱 Test Devices

**Recommended for testing:**
- iPhone 12/13/14/15 (if you have)
- Samsung Galaxy (if you have)
- Android emulator (Nexus 5X or Pixel 4)
- iOS simulator (if on Mac)

**Screen sizes to test:**
- 320px (small phones)
- 375px (standard phones)
- 414px (large phones)
- 768px+ (tablets)

---

## 🎓 Learning Path (Optional)

If you want to extend the app:

1. **Add a new screen:**
   - Create `app/(tabs)/newscreen.tsx`
   - Add to `_layout.tsx` tabs
   - Follow existing screen structure

2. **Change colors:**
   - Update hex values in `styles.colors`
   - Update `app.json` for theme

3. **Add navigation:**
   - Use Expo Router docs
   - Create new routes under `app/`

4. **Add a chatbot:**
   - Create modal for chat
   - Integrate your chatbot service
   - Add toggle button

---

## ✨ Final Notes

- **Backup your code:** Use git or backup folder
- **Test thoroughly:** Before app store submission
- **Read guidelines:** App store policies before submitting
- **Monitor feedback:** After launch, listen to users
- **Plan updates:** Keep the app fresh with improvements

---

## 📞 Need Help?

- **Documentation:** Read `MOBILE_APP_README.md`
- **Quick Start:** See `QUICK_START.md`
- **Deployment:** Check `DEPLOYMENT_GUIDE.md`
- **Design:** Review `DESIGN_GUIDE.md`
- **Web Developers:** Visit https://docs.expo.dev

---

**You're all set! Happy launching! 🚀**

Print this checklist and check off items as you go!
