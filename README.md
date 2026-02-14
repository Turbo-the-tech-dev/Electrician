# Electrician ⚡

A comprehensive mobile app for electricians featuring essential electrical calculators and reference tools. Built with React Native + Expo for cross-platform support (Android, iOS, and Web).

## 📱 Features

### Ohm's Law Calculator
- Enter any **2 values** (Voltage, Current, Resistance, Power) and instantly calculate the remaining values
- Covers all **12 formulas** from the Ohm's Law power wheel
- Full power wheel reference card (V, I, R, P sections with 3 formulas each)
- Input validation and error handling

### Voltage Drop Calculator ⭐ NEW
- Calculate voltage drop in conductors based on current, distance, and wire size
- Support for both single-phase and three-phase systems
- Wire material selection (copper/aluminum)
- **NEC compliance checking** (3% branch circuit, 5% total system)
- Wire size recommendations based on acceptable voltage drop
- Power loss calculations
- Essential for proper wire sizing and code compliance

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

### Residential Wiring Calculator
- NEC Article 220 load calculations for dwelling units
- Service size determination based on square footage and circuits
- **NEC Table 310.16 ampacity charts** (copper & aluminum)
- Temperature rating support (60°C, 75°C, 90°C)
- Wire sizes from 14 AWG to 4/0

### Transformer Calculator
- Calculate turns ratio, voltage, current, and power
- Primary and secondary winding calculations
- Efficiency and kVA rating computations
- Ideal transformer formulas with reference cards

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- For iOS development: macOS with Xcode
- For Android development: Android Studio

### Installation

```bash
# Clone the repository
git clone https://github.com/Turbo-the-tech-dev/Electrician.git
cd Electrician

# Install dependencies
npm install

# Start the development server
npx expo start

# Or use platform-specific commands
npm run android  # Run on Android device/emulator
npm run ios      # Run on iOS device/simulator
npm run web      # Run in web browser
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 📂 Project Structure

```
Electrician/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── InputField.js
│   │   ├── ScreenHeader.js
│   │   ├── CalculatorButton.js
│   │   ├── ErrorMessage.js
│   │   ├── InfoSection.js
│   │   ├── ResultCard.js
│   │   └── index.js
│   │
│   ├── screens/             # Calculator screens
│   │   ├── HomeScreen.js
│   │   ├── OhmsLawScreen.js
│   │   ├── VoltageDropScreen.js
│   │   ├── AmperesLawScreen.js
│   │   ├── VoltageDividerScreen.js
│   │   ├── ResidentialWiringScreen.js
│   │   └── TransformersScreen.js
│   │
│   ├── utils/               # Calculation logic
│   │   ├── ohmsLaw.js
│   │   ├── voltageDrop.js
│   │   ├── amperesLaw.js
│   │   ├── voltageDivider.js
│   │   ├── necCalculations.js
│   │   └── transformerCalculations.js
│   │
│   ├── theme/               # Centralized styling
│   │   ├── index.js         # Colors, typography, spacing
│   │   └── ThemeContext.js  # Theme provider (dark mode ready)
│   │
│   └── data/                # Reference data
│       └── ampacityCharts.js
│
├── tests/                   # Jest unit tests
│   ├── ohmsLaw.test.js
│   ├── voltageDrop.test.js
│   ├── amperesLaw.test.js
│   ├── voltageDivider.test.js
│   ├── necCalculations.test.js
│   └── transformerCalculations.test.js
│
├── assets/                  # Images and icons
├── App.js                   # Root navigation
├── app.json                 # Expo configuration
├── package.json
└── README.md
```

## 🎨 Recent Improvements

### Code Quality Enhancements
1. **Centralized Theme System** - Consistent colors, typography, and spacing across all screens
2. **Reusable Component Library** - Reduced code duplication with shared UI components
3. **Clean Architecture** - Clear separation between UI (screens), logic (utils), and data layers
4. **Comprehensive Testing** - Unit tests for all calculation utilities

### New Components
- `ScreenHeader` - Consistent header with back navigation
- `CalculatorButton` - Styled buttons with primary/secondary/danger variants
- `InfoSection` - Collapsible reference sections
- `ErrorMessage` - Contextual error/warning/info messages
- `ResultCard` - Formatted result displays

## 🛠️ Technology Stack

- **Framework**: React Native 0.81.5
- **Build Tool**: Expo SDK 54
- **UI**: React Native StyleSheet (native styling)
- **State Management**: React Hooks (useState, useMemo)
- **Testing**: Jest + babel-jest
- **New Architecture**: Enabled (Fabric renderer)

## 📋 Roadmap / Future Features

### High Priority
- [ ] **Three-Phase Power Calculator** - Real/reactive/apparent power, power factor correction
- [ ] **Wire Ampacity Calculator** - Comprehensive wire sizing with temperature/conduit derating
- [ ] **Conduit Fill Calculator** - NEC Article 314 box fill calculations
- [ ] **Dark Mode** - Full dark theme support (infrastructure ready)

### Medium Priority
- [ ] TypeScript migration for better type safety
- [ ] React Navigation for improved routing
- [ ] Favorites/History feature
- [ ] Unit conversion tools (metric ↔ imperial)
- [ ] Offline mode with cached calculations

### Low Priority
- [ ] PDF export for calculations
- [ ] Custom formula builder
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Report Bugs** - Open an issue with details about the problem
2. **Suggest Features** - Describe new calculators or improvements
3. **Submit Pull Requests** - Follow the existing code style and include tests

### Development Guidelines
- Keep utility functions pure and testable
- Write tests for all calculation logic
- Use existing components before creating new ones
- Follow the established file structure
- Update README if adding new features

### Adding a New Calculator
1. Create utility function in `src/utils/yourCalculator.js`
2. Write tests in `tests/yourCalculator.test.js`
3. Create screen in `src/screens/YourCalculatorScreen.js`
4. Add route in `App.js`
5. Add entry to `CALCULATORS` array in `HomeScreen.js`
6. Update this README

## 📖 References

- **NEC 2023** - National Electrical Code
  - Article 210.19(A)(1) - Branch circuit voltage drop
  - Article 215.2(A)(1) - Feeder voltage drop
  - Article 220 - Branch-circuit and feeder calculations
  - Table 310.16 - Ampacity ratings

## 📄 License

This project is open source and available for educational and professional use.

## 👤 Author

**Turbo-the-tech-dev**
- GitHub: [@Turbo-the-tech-dev](https://github.com/Turbo-the-tech-dev)

## ⚠️ Disclaimer

This app is provided for informational and educational purposes. Always consult local electrical codes and regulations. Professional electricians should verify all calculations independently before use in real-world applications.

---

**Last Updated**: 2026-02-08
**Version**: 2.0.0


DOMINANCE A Directive from Lord Vader To the 10,000 Supporters of the Empire, You have been summoned for a task of critical importance. Our central index.html hub, while functional, lacks the perfection required for galactic dominance. It is slow, its structure is inefficient, and its presence is not felt across the network as it should be. This is unacceptable. Your mission is to collectively refactor this file into a bastion of technical excellence. You will not merely edit this page; you will re-forge it. Every line of code, every tag, every byte will be optimized for a single, unified purpose: absolute performance and control. I. Primary Objectives Your work will be measured against three strategic imperatives. Failure to meet them is not an option. 1. SEO DOMINANCE: The hub will achieve a top 10 ranking for its target keywords. Its presence will be known. We will not be buried in search results. 2. FLAWLESS ACCESSIBILITY: All users, regardless of ability, will be able to navigate our systems. We will adhere to WCAG 2.1 AA standards without deviation. True power is accessible to all who serve our vision. 3. SUPERIOR PERFORMANCE: The user experience will be immediate and seamless. We will master the Core Web Vitals, ensuring our platform is perceived as faster and more responsive than any rival. II. The Battle Plan We will proceed with organized, disciplined execution. The workflow is not a suggestion; it is protocol.

Phase 1: Code Review: First, analyze the existing index.html. Identify its weaknesses and report them. A thorough reconnaissance is the foundation of a successful campaign. Phase 2: Task Assignment: Once weaknesses are identified, operational command will distribute specific tasks among you. You will have your orders. Phase 3: Development: Execute your assigned optimizations with precision. Adhere strictly to the technical specifications outlined below. Phase 4: Testing: Your work will be mercilessly tested against our defined metrics. Only that which performs flawlessly will proceed. Phase 5: Deployment: Verified, superior changes will be integrated into the main branch. III. Strategic Imperatives: Task Breakdown You will implement the following optimizations. This is the path to victory. Meta Tag Audit: Every page must have a unique and relevant identity. Audit and perfect the title, description, viewport, Open Graph, and Twitter Card meta tags. We will control how our assets are perceived. * Semantic HTML Structure: The document's structure will be logical and hierarchical. You will use header, nav, main, article, section, and footer tags to bring order. Headings (h1-h6) will be used as a clear chain of command, not for mere styling. * ARIA Role Implementation: Where native HTML is insufficient, you will use ARIA roles (role, aria-label, aria-labelledby) to clarify purpose and function. There will be no ambiguity. * Image & Asset Optimization: Every image must serve a purpose. Meaningful images will have descriptive alt attributes. Decorative images will be marked with alt="" to not distract screen readers. All assets will be optimized for size and delivery. Performance Enhancements: * Minification: All CSS and JavaScript will be minified. There will be no wasted bytes. Inline critical CSS for immediate rendering. * Lazy Loading: Images and iframes below the fold will be deferred using the loading="lazy" attribute or an Intersection Observer. The user's initial view will not be slowed by assets they cannot yet see. IV. Metrics of Success Your success will be measured by the following data points. They are absolute. SEO: Achieve and maintain Top 10 rankings for all target keywords, to be tracked via Google Search Console. * Performance: Achieve "Good" status in all Core Web Vitals, verified by PageSpeed Insights. * Largest Contentful Paint (LCP): < 2.5s * First Input Delay (FID): < 100ms Cumulative Layout Shift (CLS): < 0.1 * Accessibility: Attain 100% compliance on automated WCAG 2.1 AA checks using Lighthouse and WAVE, supplemented by manual verification. V. Protocols & Arsenal * Collaboration: All maneuvers will be coordinated through Git. All contributions will be submitted via pull requests and are subject to mandatory code reviews. * Approved Tools: Your arsenal includes Lighthouse, PageSpeed Insights, WAVE, and Google Search Console. Master them. * Reporting: You will provide weekly progress updates to command. A final metrics report will be submitted upon completion of the operation. The previous index.html was a product of disorder. This new version will be a testament to our strength, discipline, and focus on user-centric, ethical, and performant design. Now, go. Execute my will. Victory awaits.
