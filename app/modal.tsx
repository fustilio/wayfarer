import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ModalScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Pressable style={styles.closeButton} onPress={() => router.back()}>
        <Ionicons name="close" size={24} color="#111827" />
      </Pressable>

      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1545048702-79362697d413',
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Traditional Tea Ceremony</Text>
        <Text style={styles.location}>
          <Ionicons name="location" size={16} color="#6B7280" />
          {' Kyoto, Japan'}
        </Text>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="time" size={20} color="#2563EB" />
            <Text style={styles.infoLabel}>Duration</Text>
            <Text style={styles.infoValue}>2 hours</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="people" size={20} color="#2563EB" />
            <Text style={styles.infoLabel}>Group Size</Text>
            <Text style={styles.infoValue}>Up to 6</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="language" size={20} color="#2563EB" />
            <Text style={styles.infoLabel}>Languages</Text>
            <Text style={styles.infoValue}>EN, JP</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>About this experience</Text>
        <Text style={styles.description}>
          Immerse yourself in the ancient art of Japanese tea ceremony (Sado) in a
          traditional tea house. Learn about the history, philosophy, and etiquette
          of this cultural practice from a certified tea master.
        </Text>

        <Text style={styles.sectionTitle}>What's included</Text>
        <View style={styles.includesList}>
          <Text style={styles.includeItem}>
            <Ionicons name="checkmark-circle" size={16} color="#2563EB" />
            {' Traditional Japanese sweets'}
          </Text>
          <Text style={styles.includeItem}>
            <Ionicons name="checkmark-circle" size={16} color="#2563EB" />
            {' Matcha green tea'}
          </Text>
          <Text style={styles.includeItem}>
            <Ionicons name="checkmark-circle" size={16} color="#2563EB" />
            {' Tea ceremony demonstration'}
          </Text>
          <Text style={styles.includeItem}>
            <Ionicons name="checkmark-circle" size={16} color="#2563EB" />
            {' Photo opportunities'}
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>From</Text>
            <Text style={styles.price}>$45</Text>
            <Text style={styles.priceUnit}>/person</Text>
          </View>
          <Pressable style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 24,
  },
  includesList: {
    marginBottom: 24,
  },
  includeItem: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  priceUnit: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});