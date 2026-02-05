import { useState } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import OhmsLawScreen from './src/screens/OhmsLawScreen';
import AmperesLawScreen from './src/screens/AmperesLawScreen';

export default function App() {
  const [screen, setScreen] = useState('home');

  if (screen === 'ohms') {
    return <OhmsLawScreen onBack={() => setScreen('home')} />;
  }
  if (screen === 'amperes') {
    return <AmperesLawScreen onBack={() => setScreen('home')} />;
  }
  return <HomeScreen onNavigate={setScreen} />;
}
