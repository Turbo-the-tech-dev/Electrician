import { useState } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import OhmsLawScreen from './src/screens/OhmsLawScreen';
import AmperesLawScreen from './src/screens/AmperesLawScreen';
import ConduitBendingScreen from './src/screens/ConduitBendingScreen';
import TermsScreen from './src/screens/TermsScreen';
import PrivacyScreen from './src/screens/PrivacyScreen';

export default function App() {
  const [screen, setScreen] = useState('home');

  const goHome = () => setScreen('home');

  if (screen === 'ohms') return <OhmsLawScreen onBack={goHome} />;
  if (screen === 'amperes') return <AmperesLawScreen onBack={goHome} />;
  if (screen === 'bending') return <ConduitBendingScreen onBack={goHome} />;
  if (screen === 'terms') return <TermsScreen onBack={goHome} />;
  if (screen === 'privacy') return <PrivacyScreen onBack={goHome} />;
  return <HomeScreen onNavigate={setScreen} />;
}
