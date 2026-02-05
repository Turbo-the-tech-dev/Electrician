import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import InputField from '../components/InputField';
import { calculate } from '../utils/ohmsLaw';

export default function OhmsLawScreen() {
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [resistance, setResistance] = useState('');
  const [power, setPower] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    Keyboard.dismiss();
    const result = calculate({ voltage, current, resistance, power });
    if (result.error) {
      setError(result.error);
      setResults(null);
    } else {
      setError('');
      setResults(result);
    }
  };

  const handleReset = () => {
    setVoltage('');
    setCurrent('');
    setResistance('');
    setPower('');
    setResults(null);
    setError('');
  };

  // Count how many fields have input
  const filledCount = [voltage, current, resistance, power].filter(
    (v) => v !== ''
  ).length;

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ohm's Law</Text>
        <Text style={styles.headerSubtitle}>V = I × R</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.instructions}>
              Enter any 2 values to calculate the rest
            </Text>

            <InputField
              label="Voltage"
              unit="V (Volts)"
              value={results && voltage === '' ? results.voltage : voltage}
              onChangeText={(text) => {
                setVoltage(text);
                setResults(null);
                setError('');
              }}
              isResult={results !== null && voltage === ''}
            />

            <InputField
              label="Current"
              unit="I (Amps)"
              value={results && current === '' ? results.current : current}
              onChangeText={(text) => {
                setCurrent(text);
                setResults(null);
                setError('');
              }}
              isResult={results !== null && current === ''}
            />

            <InputField
              label="Resistance"
              unit="R (Ohms)"
              value={
                results && resistance === '' ? results.resistance : resistance
              }
              onChangeText={(text) => {
                setResistance(text);
                setResults(null);
                setError('');
              }}
              isResult={results !== null && resistance === ''}
            />

            <InputField
              label="Power"
              unit="P (Watts)"
              value={results && power === '' ? results.power : power}
              onChangeText={(text) => {
                setPower(text);
                setResults(null);
                setError('');
              }}
              isResult={results !== null && power === ''}
            />

            {error !== '' && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[
                  styles.calcButton,
                  filledCount < 2 && styles.calcButtonDisabled,
                ]}
                onPress={handleCalculate}
                disabled={filledCount < 2}
                activeOpacity={0.7}
              >
                <Text style={styles.calcButtonText}>Calculate</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleReset}
                activeOpacity={0.7}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formulaCard}>
            <Text style={styles.formulaTitle}>Quick Reference</Text>
            <View style={styles.formulaGrid}>
              <View style={styles.formulaItem}>
                <Text style={styles.formulaSymbol}>V</Text>
                <Text style={styles.formulaText}>= I × R</Text>
              </View>
              <View style={styles.formulaItem}>
                <Text style={styles.formulaSymbol}>I</Text>
                <Text style={styles.formulaText}>= V / R</Text>
              </View>
              <View style={styles.formulaItem}>
                <Text style={styles.formulaSymbol}>R</Text>
                <Text style={styles.formulaText}>= V / I</Text>
              </View>
              <View style={styles.formulaItem}>
                <Text style={styles.formulaSymbol}>P</Text>
                <Text style={styles.formulaText}>= V × I</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  flex: {
    flex: 1,
  },
  header: {
    backgroundColor: '#1565C0',
    paddingTop: 54,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  instructions: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 18,
  },
  errorBox: {
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  errorText: {
    color: '#C62828',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  calcButton: {
    flex: 2,
    backgroundColor: '#1565C0',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#1565C0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  calcButtonDisabled: {
    backgroundColor: '#B0BEC5',
    shadowOpacity: 0,
    elevation: 0,
  },
  calcButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  resetButtonText: {
    color: '#666',
    fontSize: 18,
    fontWeight: '600',
  },
  formulaCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  formulaTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 14,
    textAlign: 'center',
  },
  formulaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  formulaItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  formulaSymbol: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1565C0',
    marginRight: 8,
  },
  formulaText: {
    fontSize: 16,
    color: '#555',
  },
});
