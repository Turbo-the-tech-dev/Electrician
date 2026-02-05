import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function PrivacyScreen({ onBack }) {
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
          <Text style={styles.headerTitle}>Privacy Policy</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.updated}>Last updated: February 2026</Text>

        <View style={styles.highlightBox}>
          <Text style={styles.highlightTitle}>The short version</Text>
          <Text style={styles.highlightBody}>
            We don't collect, store, or share any of your data. Period.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.body}>
          None. The Electrician app does not collect any personal information, usage data, analytics, or telemetry. All calculations are performed locally on your device.
        </Text>

        <Text style={styles.sectionTitle}>2. Data Storage</Text>
        <Text style={styles.body}>
          All data you enter into the App (calculation inputs, values) exists only in your device's memory while the App is running. Nothing is saved to disk, sent to a server, or stored in the cloud.
        </Text>

        <Text style={styles.sectionTitle}>3. Third-Party Services</Text>
        <Text style={styles.body}>
          The App does not use any third-party analytics, advertising, tracking, or data collection services. There are no ads in this App.
        </Text>

        <Text style={styles.sectionTitle}>4. Internet Access</Text>
        <Text style={styles.body}>
          The App does not require an internet connection to function. All calculations are performed offline on your device.
        </Text>

        <Text style={styles.sectionTitle}>5. Permissions</Text>
        <Text style={styles.body}>
          The App does not request access to your camera, microphone, contacts, location, files, or any other device features beyond what is needed to display the App interface.
        </Text>

        <Text style={styles.sectionTitle}>6. Children's Privacy</Text>
        <Text style={styles.body}>
          Since we collect no data from any users, this includes children. The App is safe for users of all ages.
        </Text>

        <Text style={styles.sectionTitle}>7. Changes to This Policy</Text>
        <Text style={styles.body}>
          If we ever change this policy, we will update this screen within the App. However, our core commitment remains: we do not collect your data.
        </Text>

        <Text style={styles.sectionTitle}>8. Contact</Text>
        <Text style={styles.body}>
          For questions about this Privacy Policy, please reach out through the App's repository on GitHub.
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
  highlightBox: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2E7D32',
  },
  highlightTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 6,
  },
  highlightBody: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
    lineHeight: 22,
  },
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
