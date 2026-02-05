# Electrician

A mobile app for electricians featuring essential electrical calculators.

## Features

### Ohm's Law Calculator
- Enter any **2 values** (Voltage, Current, Resistance, Power) and instantly calculate the remaining values
- Supports all Ohm's Law relationships: V=IR, P=VI, and derived formulas
- Input validation and error handling
- Clean, professional UI

## Tech Stack

- **React Native** with **Expo** — cross-platform for Android and iOS
- No external dependencies beyond Expo defaults

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npx expo start

# Run on specific platform
npm run android
npm run ios
npm run web
```

## Building for Production

```bash
# Build for Android (APK/AAB)
npx expo build:android

# Build for iOS
npx expo build:ios
```
