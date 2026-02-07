# Electrician

A mobile app for electricians featuring essential electrical calculators. Built with React Native + Expo for Android and iOS.

## Features

### Ohm's Law Calculator
- Enter any **2 values** (Voltage, Current, Resistance, Power) and instantly calculate the remaining values
- Covers all **12 formulas** from the Ohm's Law power wheel
- Full power wheel reference card (V, I, R, P sections with 3 formulas each)
- Input validation and error handling

### Ampere's Law Calculator
- **Straight Wire**: B = μ₀I / 2πr
- **Solenoid**: B = μ₀nI (with turns and length)
- **Toroid**: B = μ₀NI / 2πr (with turns and mean radius)
- Mode selector to switch between configurations
- Quick reference with μ₀ constant

### Voltage Divider Calculator
- Enter any **3 values** (Vin, Vout, R1, R2) and calculate the missing one
- Automatically computes divider current: I = Vin / (R1 + R2)
- Physical constraint validation (Vout cannot exceed Vin)
- ASCII circuit diagram and formula quick reference card

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

# Run tests
npm test
```

## Building for Production

```bash
npx expo build:android
npx expo build:ios
```
