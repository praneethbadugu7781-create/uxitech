# UXI Mobile App

A beautiful, feature-rich mobile application for UXI Digital Agency built with React Native and Expo. Works seamlessly on both iOS and Android devices.

## Features

✨ **Beautiful Dark UI** - Premium dark theme with gradient accents  
📱 **Responsive Design** - Optimized for all screen sizes  
🧭 **Bottom Tab Navigation** - Easy access to all main sections  
⚡ **Smooth Animations** - Polished user experience  
🎨 **Gradient Effects** - Modern visual design  
📝 **Contact Form** - Direct messaging capability  
🔗 **Social Links** - Connect via phone, email, Instagram  
📊 **Service Showcase** - Browse all 8 services  
🎯 **Portfolio Display** - View featured projects  
ℹ️ **About Section** - Company philosophy and process  

## Sections

### 1. **Home** 🏠
- Hero section with UXI branding
- Quick stats (50+ projects, 100% satisfaction)
- Services preview grid
- Why UXI highlights
- Call-to-action buttons

### 2. **Services** 🛠️
- All 8 services with descriptions
- Feature lists for each service
- Icons and gradients
- Learn more buttons

### 3. **Portfolio** 🎨
- Featured projects showcase
- Project cards with descriptions
- Client satisfaction stats
- Link to full website portfolio

### 4. **About** ℹ️
- Company mission and values
- Philosophy statements
- Process breakdown
- Team values
- Key achievements

### 5. **Contact** 📞
- Direct contact information
- Contact form
- Quick action links
- Email, phone, Instagram links
- Response time info

## Tech Stack

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform for React Native
- **Expo Router** - File-based routing
- **Expo Linear Gradient** - Gradient effects
- **Ionicons** - Beautiful icon library
- **TypeScript** - Type safety
- **React Native Gesture Handler** - Touch interactions

## Setup & Installation

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Expo CLI: `npm install -g eas-cli`

### Installation Steps

```bash
# Navigate to mobile-app directory
cd mobile-app

# Install dependencies
npm install

# Or with yarn
yarn install
```

## Running the App

### Development Mode

```bash
# Start Expo development server
npm start
# or
npm run start

# Then press:
# a - open Android emulator
# i - open iOS simulator (macOS only)
# w - open web preview
```

### Build for Distribution

```bash
# Android APK
npm run android

# iOS (macOS only)
npm run ios

# Web
npm run web

# Production build with EAS
eas build --platform android
eas build --platform ios
```

## Project Structure

```
mobile-app/
├── app/
│   ├── (tabs)/              # Bottom tab navigation layout
│   │   ├── _layout.tsx      # Tab navigation configuration
│   │   ├── index.tsx        # Home screen
│   │   ├── services.tsx     # Services screen
│   │   ├── portfolio.tsx    # Portfolio screen
│   │   ├── about.tsx        # About screen
│   │   └── contact.tsx      # Contact screen
│   └── _layout.tsx          # Root layout
├── components/              # Reusable components (for future)
├── constants/               # App constants and colors
├── assets/
│   ├── images/              # App images
│   └── fonts/               # Custom fonts
├── app.json                 # Expo configuration
├── package.json             # Dependencies
├── index.js                 # Entry point
└── tsconfig.json            # TypeScript config
```

## Customization

### Colors & Branding
Edit the color values in each screen file (styles.ts files). Current theme:
- **Primary Blue**: `#0066ff`
- **Accent Cyan**: `#00d4ff`
- **Background**: `#0f0f16`
- **Card Background**: `#1a1a24`

### Contact Information
Update the contact details in `/app/(tabs)/contact.tsx`:
- Phone number
- Email address
- Instagram handle

### Services
Modify the services list in `/app/(tabs)/services.tsx` to add or remove services.

### Portfolio
Update portfolio projects in `/app/(tabs)/portfolio.tsx`.

## Icons

The app uses Ionicons. Browse available icons at:
https://ionic.io/ionicons

Change icons by modifying the `name` prop in `<Ionicons>` components.

## Performance Tips

- The app uses Expo Router for optimized navigation
- Images should be optimized before adding
- Use React Native built-in optimization for long lists
- Cache static data when possible

## Deployment

### For Android:
1. Build APK: `eas build --platform android`
2. Download from EAS dashboard
3. Upload to Google Play Store

### For iOS:
1. Build IPA: `eas build --platform ios`
2. Download from EAS dashboard
3. Upload to Apple App Store

## Troubleshooting

### App won't start
```bash
# Clear cache and reinstall
npm run prebuild --clean
npm install
npm start
```

### Dependencies issues
```bash
# Update all packages
npm update

# Clear node_modules
rm -rf node_modules
npm install
```

### Emulator/Simulator issues
- Android: Make sure Android emulator is running before `npm run android`
- iOS: Only works on macOS with Xcode installed

## Future Enhancements

- 🔔 Push notifications
- 💬 In-app AI chatbot (like website)
- 🎥 Video demonstrations
- 📱 App-exclusive features
- 🌐 Offline content
- 🔐 User authentication
- 💼 Project tracking dashboard

## Support

For issues or questions:
- 📧 Email: uxitech.in@gmail.com
- 📞 Phone: 9391781748
- 📸 Instagram: @uxitech.in
- 🌐 Website: www.uxitech.in

## License

This project is proprietary to UXI Digital Agency.

---

**Built with ❤️ by UXI Digital Agency**
