# QWEN.md — Electrician App Context Guide

> **Project:** Electrician ⚡ — Mobile Electrical Calculator App  
> **Framework:** React Native 0.81.5 + Expo SDK 54  
> **Location:** `/root/Electrician/`  
> **GitHub:** [@Turbo-the-tech-dev/Electrician](https://github.com/Turbo-the-tech-dev/Electrician)  
> **Last Updated:** 2026-02-21

---

## 📱 Project Overview

**Electrician** is a comprehensive cross-platform mobile app for electricians featuring essential electrical calculators and NEC compliance reference tools. Built with React Native + Expo for Android, iOS, and Web deployment.

### Core Features

| Calculator | Description |
|------------|-------------|
| **Ohm's Law** | Calculate V, I, R, P from any 2 values (12 formulas) |
| **Voltage Drop** ⭐ | NEC-compliant voltage drop with wire sizing recommendations |
| **Ampere's Law** | Magnetic field calculations (straight wire, solenoid, toroid) |
| **Voltage Divider** | Calculate missing resistor or voltage values |
| **Residential Wiring** | NEC Article 220 load calculations + Table 310.16 ampacity |
| **Transformers** | Turns ratio, voltage, current, kVA calculations |
| **Ladder Logic** | PLC ladder diagram calculations |
| **Conduit Fill** | NEC Article 314 box fill calculations |

---

## 🛠️ Building & Running

### Prerequisites
- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- For mobile: Expo Go app on device

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Platform-specific runs
npm run android    # Android device/emulator
npm run ios        # iOS device/simulator (macOS only)
npm run web        # Web browser
```

### Testing

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage

# Single test file
npm test -- tests/ohmsLaw.test.js
```

---

## 📂 Project Structure

```
Electrician/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CalculatorButton.js
│   │   ├── ErrorMessage.js
│   │   ├── InfoSection.js
│   │   ├── InputField.js
│   │   ├── ResultCard.js
│   │   ├── ScreenHeader.js
│   │   └── index.js         # Barrel export
│   │
│   ├── screens/             # Calculator screens
│   │   ├── HomeScreen.js
│   │   ├── OhmsLawScreen.js
│   │   ├── VoltageDropScreen.js
│   │   ├── AmperesLawScreen.js
│   │   ├── VoltageDividerScreen.js
│   │   ├── ResidentialWiringScreen.js
│   │   ├── TransformersScreen.js
│   │   ├── LadderLogicScreen.js
│   │   └── ConduitFillScreen.js
│   │
│   ├── utils/               # Calculation logic (PURE functions)
│   │   ├── ohmsLaw.js
│   │   ├── voltageDrop.js
│   │   ├── amperesLaw.js
│   │   ├── voltageDivider.js
│   │   ├── necCalculations.js
│   │   ├── transformerCalculations.js
│   │   ├── ladderLogic.js
│   │   └── conduitFill.js
│   │
│   ├── theme/               # Centralized design system
│   │   ├── index.js         # Colors, typography, spacing
│   │   └── ThemeContext.js  # Theme provider
│   │
│   └── data/                # Reference data
│       └── ampacityCharts.js
│
├── tests/                   # Jest unit tests (utils only)
│   ├── ohmsLaw.test.js
│   ├── voltageDrop.test.js
│   ├── amperesLaw.test.js
│   ├── voltageDivider.test.js
│   ├── necCalculations.test.js
│   ├── transformerCalculations.test.js
│   ├── ladderLogic.test.js
│   └── conduitFill.test.js
│
├── assets/                  # Icons, images
├── App.js                   # Root navigation (state-based)
├── app.json                 # Expo configuration
├── package.json
└── README.md
```

---

## 🏗️ Architecture

### Three-Layer Pattern

Each calculator follows the same architecture:

```
┌─────────────────────────────────────────────────┐
│  SCREEN (src/screens/)                          │
│  - React Native UI                              │
│  - useState for local state                     │
│  - Calls util.calculate()                       │
│  - Receives onBack prop from App.js             │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│  UTIL (src/utils/)                              │
│  - Pure calculation functions                   │
│  - No React dependencies                        │
│  - Accepts string inputs (form fields)          │
│  - Returns { error } or { results }             │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│  TEST (tests/)                                  │
│  - Jest tests for utils only                    │
│  - CommonJS require() imports                   │
│  - String inputs match UI behavior              │
└─────────────────────────────────────────────────┘
```

### Navigation

`App.js` uses a simple `useState`-based screen switcher:

```javascript
const [screen, setScreen] = useState('home');

// Screens receive onBack={() => setScreen('home')}
// HomeScreen receives onNavigate={setScreen}
```

No React Navigation library — manual screen management via conditional rendering.

---

## 📝 Development Conventions

### Adding a New Calculator

1. **Create utility** (`src/utils/yourCalc.js`):
```javascript
export function calculate(inputs) {
  // Parse string inputs
  // Validate
  // Calculate
  return { result1, result2 }; // or { error: 'message' }
}
```

2. **Create tests** (`tests/yourCalc.test.js`):
```javascript
const { calculate } = require('../src/utils/yourCalc');

describe('Your Calculator', () => {
  test('calculates correctly', () => {
    const r = calculate({ input1: '10', input2: '20' });
    expect(parseFloat(r.result)).toBeCloseTo(30, 4);
  });
});
```

3. **Create screen** (`src/screens/YourCalcScreen.js`):
```javascript
import { ScreenHeader, CalculatorButton, InputField } from '../components';
import { calculate } from '../utils/yourCalc';

export default function YourCalcScreen({ onBack }) {
  // Use components, call calculate, render results
}
```

4. **Register in App.js**:
```javascript
if (screen === 'yourKey') {
  content = <YourCalcScreen onBack={() => setScreen('home')} />;
}
```

5. **Add to HomeScreen.js** `CALCULATORS` array with matching `key`.

### Code Style

- **Imports**: Use ES modules (`import/export`) in source, CommonJS (`require`) in tests
- **Inputs**: Utils accept **string** values (matching form field behavior)
- **Returns**: Always return `{ error: string }` on failure, `{ results }` on success
- **Pure functions**: No React imports in `src/utils/`
- **Theme**: Import from `src/theme/index.js` — do not hardcode hex values

### Theme System

```javascript
import { colors, spacing, typography, borderRadius } from '../theme';

// Calculator-specific colors
colors.calculators.ohms      // #1565C0
colors.calculators.voltageDrop // #558B2F

// Light/dark mode colors
colors.light.surface
colors.dark.background
```

### Component Usage

```javascript
import {
  ScreenHeader,      // Header with back button
  CalculatorButton,  // Primary/secondary/danger buttons
  InputField,        // Styled text input
  ResultCard,        // Formatted result display
  ErrorMessage,      // Error/warning/info messages
  InfoSection,       // Collapsible reference sections
} from '../components';
```

---

## 🧪 Testing Practices

### Test Convention

- **Target**: Utils only (not screens)
- **Import**: `require()` for CommonJS compatibility
- **Inputs**: Strings (e.g., `'10'` not `10`)
- **Assertions**: `toBeCloseTo()` for floats, `toBe()` for strings

### Example Test Structure

```javascript
const { calculate } = require('../src/utils/ohmsLaw');

describe('Calculator Name', () => {
  describe('given X and Y → calculates Z', () => {
    test('specific case description', () => {
      const r = calculate({ input1: '10', input2: '20' });
      expect(parseFloat(r.result)).toBeCloseTo(30, 4);
    });
  });

  describe('validation', () => {
    test('invalid input returns error', () => {
      const r = calculate({ input1: '', input2: '' });
      expect(r.error).toBe('Enter required values.');
    });
  });
});
```

---

## 📊 Key Files Reference

| File | Purpose |
|------|---------|
| `App.js` | Root navigation, screen imports |
| `src/screens/HomeScreen.js` | Calculator menu (`CALCULATORS` array) |
| `src/theme/index.js` | Design tokens (colors, spacing, typography) |
| `src/components/index.js` | Barrel export for reusable components |
| `src/utils/ohmsLaw.js` | Example util pattern |
| `tests/ohmsLaw.test.js` | Example test pattern |
| `CLAUDE.md` | Additional development notes |
| `README.md` | Full feature documentation |

---

## 🔧 Common Commands

```bash
# Development
npx expo start              # Dev server
npx expo start --tunnel     # Behind firewall

# Testing
npm test                    # Run Jest
npm test -- --coverage      # With coverage
npm test -- --watch         # Watch mode

# Build (requires credentials)
eas build --platform android
eas build --platform ios

# Submit to stores
eas submit --platform android
eas submit --platform ios
```

---

## 📖 NEC References

This app references **NEC 2023**:

- **Article 210.19(A)(1)** — Branch circuit voltage drop
- **Article 215.2(A)(1)** — Feeder voltage drop
- **Article 220** — Branch-circuit and feeder calculations
- **Table 310.16** — Ampacity ratings
- **Article 314** — Box fill calculations

---

## 🚀 Roadmap

### High Priority
- [ ] Three-Phase Power Calculator
- [ ] Wire Ampacity Calculator (comprehensive derating)
- [ ] Dark Mode (infrastructure ready)

### Medium Priority
- [ ] React Navigation migration
- [ ] TypeScript migration
- [ ] Calculation history/favorites

### Low Priority
- [ ] PDF export
- [ ] Multi-language support
- [ ] Unit conversion tools

---

## ⚠️ Important Notes

1. **No native toolchain**: Development on Termux (Android) — no Xcode/Android Studio
2. **Test utils only**: Screens are not tested, only pure utility functions
3. **String inputs**: Utils receive strings from form fields, parse internally
4. **CommonJS in tests**: Use `require()` since no Jest ESM transform
5. **Navigation**: Simple state-based routing, no React Navigation library

---

*"May the Force be with your calculations."* ⚡
