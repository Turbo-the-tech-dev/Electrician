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
import BendVisual from '../components/BendVisual';
import {
  BEND_TYPES,
  OFFSET_TABLE,
  STUB_DEDUCTS,
  calcStub,
  calcOffset,
  calcKick,
  calcSaddle3,
  calcSaddle4,
  toFraction,
} from '../utils/conduitBending';

export default function ConduitBendingScreen({ onBack }) {
  const [bendType, setBendType] = useState('stub');
  const [fields, setFields] = useState({});
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const updateField = (key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setResults(null);
    setError('');
  };

  const setPickerField = (key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setResults(null);
    setError('');
  };

  const handleCalculate = () => {
    Keyboard.dismiss();
    let result;
    switch (bendType) {
      case 'stub':
        result = calcStub({
          stubLength: fields.stubLength || '',
          conduitSize: fields.conduitSize || '',
        });
        break;
      case 'offset':
        result = calcOffset({
          offsetDepth: fields.offsetDepth || '',
          bendAngle: parseFloat(fields.bendAngle) || 0,
        });
        break;
      case 'kick':
        result = calcKick({
          kickDepth: fields.kickDepth || '',
          kickDistance: fields.kickDistance || '',
        });
        break;
      case 'saddle3':
        result = calcSaddle3({
          saddleDepth: fields.saddleDepth || '',
          centerAngle: parseFloat(fields.centerAngle) || 0,
        });
        break;
      case 'saddle4':
        result = calcSaddle4({
          saddleDepth: fields.saddleDepth || '',
          saddleWidth: fields.saddleWidth || '',
          bendAngle: parseFloat(fields.bendAngle) || 0,
        });
        break;
    }

    if (result?.error) {
      setError(result.error);
      setResults(null);
    } else {
      setError('');
      setResults(result);
    }
  };

  const handleReset = () => {
    setFields({});
    setResults(null);
    setError('');
  };

  const handleBendTypeChange = (type) => {
    setBendType(type);
    setFields({});
    setResults(null);
    setError('');
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          {onBack && (
            <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
              <Text style={styles.backText}>{'<'} Back</Text>
            </TouchableOpacity>
          )}
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>Conduit Bending</Text>
            <Text style={styles.headerSubtitle}>
              {BEND_TYPES.find((b) => b.key === bendType)?.description}
            </Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Bend type selector */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.typeRow}
          >
            {BEND_TYPES.map((b) => (
              <TouchableOpacity
                key={b.key}
                style={[styles.typeButton, bendType === b.key && styles.typeButtonActive]}
                onPress={() => handleBendTypeChange(b.key)}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.typeText, bendType === b.key && styles.typeTextActive]}
                >
                  {b.shortLabel}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Visual preview */}
          <BendVisual bendType={bendType} results={results} />

          {/* Input card */}
          <View style={styles.card}>
            <BendInputs
              bendType={bendType}
              fields={fields}
              updateField={updateField}
              setPickerField={setPickerField}
            />

            {error !== '' && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.calcButton}
                onPress={handleCalculate}
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

          {/* Results card */}
          {results && (
            <View style={styles.resultsCard}>
              <Text style={styles.resultsTitle}>Results</Text>
              <BendResults bendType={bendType} results={results} />
            </View>
          )}

          {/* Reference card */}
          <ReferenceCard bendType={bendType} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ── Dynamic Inputs per bend type ──────────────────────────────

function BendInputs({ bendType, fields, updateField, setPickerField }) {
  switch (bendType) {
    case 'stub':
      return (
        <>
          <InputField
            label="Stub Length"
            unit="inches"
            value={fields.stubLength || ''}
            onChangeText={(t) => updateField('stubLength', t)}
          />
          <Text style={styles.pickerLabel}>Conduit Size (EMT)</Text>
          <View style={styles.chipRow}>
            {STUB_DEDUCTS.map((d) => (
              <TouchableOpacity
                key={d.size}
                style={[
                  styles.chip,
                  fields.conduitSize === d.size && styles.chipActive,
                ]}
                onPress={() => setPickerField('conduitSize', d.size)}
              >
                <Text
                  style={[
                    styles.chipText,
                    fields.conduitSize === d.size && styles.chipTextActive,
                  ]}
                >
                  {d.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      );

    case 'offset':
      return (
        <>
          <InputField
            label="Offset Depth"
            unit="inches"
            value={fields.offsetDepth || ''}
            onChangeText={(t) => updateField('offsetDepth', t)}
          />
          <Text style={styles.pickerLabel}>Bend Angle</Text>
          <View style={styles.chipRow}>
            {OFFSET_TABLE.map((r) => (
              <TouchableOpacity
                key={r.angle}
                style={[
                  styles.chip,
                  parseFloat(fields.bendAngle) === r.angle && styles.chipActive,
                ]}
                onPress={() => setPickerField('bendAngle', String(r.angle))}
              >
                <Text
                  style={[
                    styles.chipText,
                    parseFloat(fields.bendAngle) === r.angle && styles.chipTextActive,
                  ]}
                >
                  {r.angle}°
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      );

    case 'kick':
      return (
        <>
          <InputField
            label="Kick Depth"
            unit="inches (lateral shift)"
            value={fields.kickDepth || ''}
            onChangeText={(t) => updateField('kickDepth', t)}
          />
          <InputField
            label="Kick Distance"
            unit="inches (run along wall)"
            value={fields.kickDistance || ''}
            onChangeText={(t) => updateField('kickDistance', t)}
          />
        </>
      );

    case 'saddle3':
      return (
        <>
          <InputField
            label="Saddle Depth"
            unit="inches (obstacle height)"
            value={fields.saddleDepth || ''}
            onChangeText={(t) => updateField('saddleDepth', t)}
          />
          <Text style={styles.pickerLabel}>Center Bend Angle</Text>
          <View style={styles.chipRow}>
            {[
              { angle: 22.5, label: '22.5°' },
              { angle: 45, label: '45°' },
              { angle: 60, label: '60°' },
            ].map((opt) => (
              <TouchableOpacity
                key={opt.angle}
                style={[
                  styles.chip,
                  parseFloat(fields.centerAngle) === opt.angle && styles.chipActive,
                ]}
                onPress={() => setPickerField('centerAngle', String(opt.angle))}
              >
                <Text
                  style={[
                    styles.chipText,
                    parseFloat(fields.centerAngle) === opt.angle && styles.chipTextActive,
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      );

    case 'saddle4':
      return (
        <>
          <InputField
            label="Saddle Depth"
            unit="inches (obstacle height)"
            value={fields.saddleDepth || ''}
            onChangeText={(t) => updateField('saddleDepth', t)}
          />
          <InputField
            label="Obstacle Width"
            unit="inches"
            value={fields.saddleWidth || ''}
            onChangeText={(t) => updateField('saddleWidth', t)}
          />
          <Text style={styles.pickerLabel}>Bend Angle</Text>
          <View style={styles.chipRow}>
            {OFFSET_TABLE.map((r) => (
              <TouchableOpacity
                key={r.angle}
                style={[
                  styles.chip,
                  parseFloat(fields.bendAngle) === r.angle && styles.chipActive,
                ]}
                onPress={() => setPickerField('bendAngle', String(r.angle))}
              >
                <Text
                  style={[
                    styles.chipText,
                    parseFloat(fields.bendAngle) === r.angle && styles.chipTextActive,
                  ]}
                >
                  {r.angle}°
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      );

    default:
      return null;
  }
}

// ── Results display per bend type ─────────────────────────────

function BendResults({ bendType, results }) {
  const rows = [];

  switch (bendType) {
    case 'stub':
      rows.push(
        { label: 'Mark from end of conduit', value: `${results.mark}"`, frac: toFraction(results.mark) },
        { label: 'Deduct', value: `${results.deduct}"` },
        { label: 'Conduit size', value: results.conduitSize },
      );
      break;
    case 'offset':
      rows.push(
        { label: 'Distance between bends', value: `${results.distanceBetweenBends}"`, frac: toFraction(results.distanceBetweenBends) },
        { label: 'Shrinkage', value: `${results.shrinkage}"`, frac: toFraction(results.shrinkage) },
        { label: 'Multiplier used', value: `×${results.multiplier}` },
        { label: 'Bend angle', value: `${results.bendAngle}°` },
      );
      break;
    case 'kick':
      rows.push(
        { label: 'Bend angle', value: `${results.bendAngle}°` },
        { label: 'Travel (conduit length)', value: `${results.travel}"`, frac: toFraction(results.travel) },
        { label: 'Kick depth', value: `${results.kickDepth}"` },
        { label: 'Kick distance', value: `${results.kickDistance}"` },
      );
      break;
    case 'saddle3':
      rows.push(
        { label: 'Center bend', value: `${results.centerAngle}°` },
        { label: 'Outer bends', value: `${results.outerAngle}° each` },
        { label: 'Center → Outer distance', value: `${results.distCenterToOuter}"`, frac: toFraction(results.distCenterToOuter) },
        { label: 'Total span', value: `${results.totalSpan}"`, frac: toFraction(results.totalSpan) },
        { label: 'Shrinkage', value: `${results.shrinkage}"`, frac: toFraction(results.shrinkage) },
      );
      break;
    case 'saddle4':
      rows.push(
        { label: 'Offset distance (per side)', value: `${results.offsetDistance}"`, frac: toFraction(results.offsetDistance) },
        { label: 'Obstacle width', value: `${results.saddleWidth}"` },
        { label: 'Total span', value: `${results.totalSpan}"`, frac: toFraction(results.totalSpan) },
        { label: 'Shrinkage (per offset)', value: `${results.shrinkagePerOffset}"`, frac: toFraction(results.shrinkagePerOffset) },
        { label: 'Total shrinkage', value: `${results.totalShrinkage}"`, frac: toFraction(results.totalShrinkage) },
      );
      break;
  }

  return (
    <View style={styles.resultsList}>
      {rows.map((row, i) => (
        <View key={i} style={styles.resultRow}>
          <Text style={styles.resultLabel}>{row.label}</Text>
          <View style={styles.resultValues}>
            <Text style={styles.resultValue}>{row.value}</Text>
            {row.frac && <Text style={styles.resultFrac}>{row.frac}</Text>}
          </View>
        </View>
      ))}
    </View>
  );
}

// ── Reference Card ────────────────────────────────────────────

function ReferenceCard({ bendType }) {
  if (bendType === 'stub') {
    return (
      <View style={styles.refCard}>
        <Text style={styles.refTitle}>EMT Deduct Chart</Text>
        {STUB_DEDUCTS.map((d) => (
          <View key={d.size} style={styles.refRow}>
            <Text style={styles.refLabel}>{d.size} conduit</Text>
            <Text style={styles.refValue}>Deduct {d.deduct}"</Text>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.refCard}>
      <Text style={styles.refTitle}>Offset Multipliers & Shrink</Text>
      <View style={styles.refHeaderRow}>
        <Text style={[styles.refLabel, styles.refHeaderText]}>Angle</Text>
        <Text style={[styles.refLabel, styles.refHeaderText]}>Multiplier</Text>
        <Text style={[styles.refLabel, styles.refHeaderText]}>Shrink/in</Text>
      </View>
      {OFFSET_TABLE.map((r) => (
        <View key={r.angle} style={styles.refRow}>
          <Text style={styles.refLabel}>{r.angle}°</Text>
          <Text style={styles.refValue}>×{r.multiplier}</Text>
          <Text style={styles.refValue}>{toFraction(r.shrinkPerInch)}</Text>
        </View>
      ))}
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F5F5' },
  flex: { flex: 1 },
  header: {
    backgroundColor: '#2E7D32',
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
  headerTop: { flexDirection: 'row', alignItems: 'flex-start' },
  backButton: { marginRight: 12, paddingTop: 4 },
  backText: { color: 'rgba(255,255,255,0.9)', fontSize: 16, fontWeight: '600' },
  headerTitleWrap: { flex: 1 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#fff' },
  headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  scrollContent: { padding: 16, paddingBottom: 40 },

  // Type selector
  typeRow: { gap: 8, marginBottom: 16, paddingRight: 16 },
  typeButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  typeButtonActive: { backgroundColor: '#2E7D32', borderColor: '#2E7D32' },
  typeText: { fontSize: 13, fontWeight: '600', color: '#666' },
  typeTextActive: { color: '#fff' },

  // Card
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

  // Picker chips
  pickerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
    marginTop: 4,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  chipActive: { backgroundColor: '#2E7D32', borderColor: '#2E7D32' },
  chipText: { fontSize: 14, fontWeight: '600', color: '#555' },
  chipTextActive: { color: '#fff' },

  // Error
  errorBox: { backgroundColor: '#FFEBEE', borderRadius: 8, padding: 12, marginBottom: 12 },
  errorText: { color: '#C62828', fontSize: 14, textAlign: 'center' },

  // Buttons
  buttonRow: { flexDirection: 'row', gap: 12, marginTop: 6 },
  calcButton: {
    flex: 2,
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  calcButtonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  resetButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  resetButtonText: { color: '#666', fontSize: 18, fontWeight: '600' },

  // Results
  resultsCard: {
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
  resultsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 12,
  },
  resultsList: { gap: 10 },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  resultLabel: { fontSize: 14, color: '#555', flex: 1 },
  resultValues: { alignItems: 'flex-end' },
  resultValue: { fontSize: 16, fontWeight: '700', color: '#222' },
  resultFrac: { fontSize: 12, color: '#2E7D32', fontWeight: '600', marginTop: 1 },

  // Reference
  refCard: {
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
  refTitle: { fontSize: 16, fontWeight: '700', color: '#333', textAlign: 'center', marginBottom: 12 },
  refHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 6,
    borderBottomWidth: 1.5,
    borderBottomColor: '#E0E0E0',
    marginBottom: 6,
  },
  refHeaderText: { fontWeight: '700', color: '#333' },
  refRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  refLabel: { fontSize: 14, color: '#555', flex: 1 },
  refValue: { fontSize: 14, fontWeight: '600', color: '#222', flex: 1, textAlign: 'right' },
});
