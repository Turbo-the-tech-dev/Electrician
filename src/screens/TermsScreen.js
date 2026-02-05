import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function TermsScreen({ onBack }) {
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
          <Text style={styles.headerTitle}>Terms of Service</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.updated}>Last updated: February 2026</Text>

        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.body}>
          By downloading, installing, or using the Electrician app ("the App"), you agree to these Terms of Service. If you do not agree, do not use the App.
        </Text>

        <Text style={styles.sectionTitle}>2. Free to Use</Text>
        <Text style={styles.body}>
          The App is provided free of charge. There are no subscriptions, in-app purchases, or hidden fees. All features are available to all users at no cost.
        </Text>

        <Text style={styles.sectionTitle}>3. Purpose</Text>
        <Text style={styles.body}>
          The App provides electrical calculation tools including Ohm's Law, Ampere's Law, and conduit bending calculators. These tools are intended as reference aids for educational and professional use.
        </Text>

        <Text style={styles.sectionTitle}>4. No Warranty</Text>
        <Text style={styles.body}>
          The App is provided "as is" without warranty of any kind. While we strive for accuracy in all calculations, the App should not be used as the sole basis for electrical work decisions. Always verify calculations independently and follow applicable electrical codes (NEC, local codes) and safety standards.
        </Text>

        <Text style={styles.sectionTitle}>5. Limitation of Liability</Text>
        <Text style={styles.body}>
          The developers and contributors of the App shall not be held liable for any damages, injuries, or losses arising from the use of this App or reliance on its calculations. Electrical work should only be performed by qualified, licensed electricians in accordance with local regulations.
        </Text>

        <Text style={styles.sectionTitle}>6. Intellectual Property</Text>
        <Text style={styles.body}>
          The App and its original content, features, and functionality are the property of the App's developers. The electrical formulas and standards referenced are publicly available knowledge.
        </Text>

        <Text style={styles.sectionTitle}>7. User Responsibility</Text>
        <Text style={styles.body}>
          You are solely responsible for how you use the calculations and information provided by this App. Always follow proper safety procedures and consult relevant electrical codes before performing any electrical work.
        </Text>

        <Text style={styles.sectionTitle}>8. Changes to Terms</Text>
        <Text style={styles.body}>
          We reserve the right to update these Terms at any time. Continued use of the App after changes constitutes acceptance of the new Terms.
        </Text>

        <Text style={styles.sectionTitle}>9. Contact</Text>
        <Text style={styles.body}>
          For questions about these Terms, please reach out through the App's repository on GitHub.
        </Text>

        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    backgroundColor: '#37474F',
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
  headerTop: { flexDirection: 'row', alignItems: 'center' },
  backButton: { marginRight: 12 },
  backText: { color: 'rgba(255,255,255,0.9)', fontSize: 16, fontWeight: '600' },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#fff' },
  content: { padding: 20, paddingBottom: 40 },
  updated: { fontSize: 13, color: '#888', marginBottom: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  spacer: { height: 40 },
});
