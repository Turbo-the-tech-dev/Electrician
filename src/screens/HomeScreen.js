import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const CALCULATORS = [
  {
    key: 'ohms',
    title: "Ohm's Law",
    subtitle: 'V = I × R',
    description: 'Voltage, Current, Resistance & Power',
    color: '#1565C0',
    icon: 'Ω',
  },
  {
    key: 'voltageDrop',
    title: 'Voltage Drop',
    subtitle: 'Vdrop = 2 × K × I × D / CMA',
    description: 'Wire sizing & NEC compliance calculator',
    color: '#558B2F',
    icon: 'Δ',
  },
  {
    key: 'amperes',
    title: "Ampere's Law",
    subtitle: 'B = μ₀I / 2πr',
    description: 'Magnetic fields for wires, solenoids & toroids',
    color: '#6A1B9A',
    icon: 'B',
  },
  {
    key: 'divider',
    title: 'Voltage Divider',
    subtitle: 'Vout = Vin × R2 / (R1 + R2)',
    description: 'Calculate voltage, resistances & divider current',
    color: '#00796B',
    icon: 'V',
  },
  {
    key: 'residential',
    title: 'Residential Wiring',
    subtitle: 'NEC Article 220 & Table 310.16',
    description: 'Load calculations & wire ampacity charts',
    color: '#E65100',
    icon: 'W',
  },
  {
    key: 'transformers',
    title: 'Transformers',
    subtitle: 'V1/V2 = N1/N2 = I2/I1',
    description: 'Turns ratio, voltage, current & kVA rating',
    color: '#283593',
    icon: 'T',
  },
];

export default function HomeScreen({ onNavigate }) {
  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Electrician</Text>
        <Text style={styles.headerSubtitle}>Electrical Calculators</Text>
      </View>

      <View style={styles.content}>
        {CALCULATORS.map((calc) => (
          <TouchableOpacity
            key={calc.key}
            style={styles.card}
            onPress={() => onNavigate(calc.key)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconCircle, { backgroundColor: calc.color }]}>
              <Text style={styles.iconText}>{calc.icon}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{calc.title}</Text>
              <Text style={styles.cardFormula}>{calc.subtitle}</Text>
              <Text style={styles.cardDesc}>{calc.description}</Text>
            </View>
            <Text style={styles.chevron}>{'>'}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    backgroundColor: '#212121',
    paddingTop: 60,
    paddingBottom: 28,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  headerTitle: { fontSize: 32, fontWeight: '800', color: '#fff' },
  headerSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.6)', marginTop: 4 },
  content: { padding: 16, gap: 14, marginTop: 8 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  iconText: { fontSize: 26, fontWeight: '800', color: '#fff' },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#222' },
  cardFormula: { fontSize: 14, color: '#666', marginTop: 2 },
  cardDesc: { fontSize: 12, color: '#999', marginTop: 2 },
  chevron: { fontSize: 22, color: '#ccc', fontWeight: '300' },
});
