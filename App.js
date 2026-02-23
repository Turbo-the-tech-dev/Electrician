import { useState } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import OhmsLawScreen from './src/screens/OhmsLawScreen';
import AmperesLawScreen from './src/screens/AmperesLawScreen';
import VoltageDividerScreen from './src/screens/VoltageDividerScreen';
import ResidentialWiringScreen from './src/screens/ResidentialWiringScreen';
import TransformersScreen from './src/screens/TransformersScreen';

export default function App() {
  const [screen, setScreen] = useState('home');

  if (screen === 'ohms') {
    return <OhmsLawScreen onBack={() => setScreen('home')} />;
  }
  if (screen === 'amperes') {
    return <AmperesLawScreen onBack={() => setScreen('home')} />;
  }
  if (screen === 'divider') {
    return <VoltageDividerScreen onBack={() => setScreen('home')} />;
  }
  if (screen === 'residential') {
    return <ResidentialWiringScreen onBack={() => setScreen('home')} />;
  }
  if (screen === 'transformers') {
    return <TransformersScreen onBack={() => setScreen('home')} />;
  }
  return <HomeScreen onNavigate={setScreen} />;
}
