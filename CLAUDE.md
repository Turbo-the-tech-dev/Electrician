# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Test Commands

```bash
npm install                    # Install dependencies
npx expo start                 # Start Expo dev server
npm run android                # Run on Android
npm run ios                    # Run on iOS
npm run web                    # Run in browser

npm test                       # Run all Jest tests
npm test -- --watch            # Watch mode
npm test -- --coverage         # Coverage report
npm test -- tests/ohmsLaw.test.js  # Run a single test file
```

Development happens on **Termux (Android)**. No native build toolchain (Xcode/Android Studio) is available locally.

## Architecture

This is a React Native + Expo SDK 54 electrical calculator app (React 19, RN 0.81.5). There is no router library — `App.js` uses a `useState`-based screen switcher with `onBack` callbacks passed as props.

### Three-Layer Pattern

Each calculator follows the same structure:

1. **Util** (`src/utils/<name>.js`) — Pure calculation functions. These accept an object of string inputs (from form fields), parse them, validate, and return either `{ error: string }` or a results object. No React dependencies. This is what tests cover.

2. **Screen** (`src/screens/<Name>Screen.js`) — React Native UI. Manages local state with `useState`, calls the util's `calculate()`, and renders results. Each screen receives an `onBack` prop from `App.js`.

3. **Test** (`tests/<name>.test.js`) — Jest tests for the util only. Tests import with `require()` (CommonJS) since there's no Jest ESM transform configured. Test inputs use string values to match how the UI passes data (e.g., `voltage: '10'` not `voltage: 10`).

### Navigation Registration

`App.js` maps string keys to screen components via if-statements. `HomeScreen.js` has a `CALCULATORS` array that defines the home screen cards — each entry's `key` must match the string used in `App.js`.

### Adding a New Calculator

1. Create `src/utils/yourCalc.js` — export a `calculate(inputs)` function
2. Create `tests/yourCalc.test.js`
3. Create `src/screens/YourCalcScreen.js` — accept `{ onBack }` prop
4. Add an `if (screen === 'yourKey')` block in `App.js` with the import
5. Add an entry to the `CALCULATORS` array in `HomeScreen.js` with a matching `key`

### Shared UI

Reusable components are in `src/components/` and exported from `src/components/index.js`. Import as: `import { ScreenHeader, CalculatorButton } from '../components'`.

The theme system in `src/theme/index.js` exports `colors`, `spacing`, `typography`, `borderRadius`, and `elevation` tokens. `ThemeContext` wraps the app in `App.js`; screens can use `useTheme()` or import tokens directly. Each screen defines a `PRIMARY_COLOR` constant from `colors.calculators.*`.

## Conventions

- Conventional commits: `feat:`, `fix:`, `docs:`, etc.
- Utility functions must be pure and testable — no React imports in `src/utils/`
- Calculator-specific colors live in `colors.calculators` in the theme; screens reference them via a `PRIMARY_COLOR` const — do not hardcode hex values
