import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CaptureScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Capture Moments</Text>
        <Text style={styles.subtitle}>
          Take photos of museum panels, landmarks, or anything interesting
        </Text>
      </View>

      <Pressable style={styles.captureButton}>
        <Ionicons name="camera" size={32} color="#FFFFFF" />
        <Text style={styles.captureText}>Take Photo</Text>
      </Pressable>

      <View style={styles.featuresContainer}>
        <View style={styles.featureItem}>
          <Ionicons name="text" size={24} color="#2563EB" />
          <Text style={styles.featureTitle}>Text Recognition</Text>
          <Text style={styles.featureDescription}>
            Automatically extract text from photos
          </Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="language" size={24} color="#2563EB" />
          <Text style={styles.featureTitle}>Translation</Text>
          <Text style={styles.featureDescription}>
            Translate captured text to your language
          </Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="bookmark" size={24} color="#2563EB" />
          <Text style={styles.featureTitle}>Save & Organize</Text>
          <Text style={styles.featureDescription}>
            Keep your captures organized by location
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  captureButton: {
    backgroundColor: '#2563EB',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  captureText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 12,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});