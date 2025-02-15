import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const trips = [
    {
      id: '1',
      destination: 'Kyoto',
      dates: 'Mar 15-22, 2024',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    },
    {
      id: '2',
      destination: 'Barcelona',
      dates: 'May 1-8, 2024',
      image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/300' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Sarah Johnson</Text>
        <Text style={styles.bio}>Travel enthusiast | Culture explorer</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>48</Text>
            <Text style={styles.statLabel}>Places</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Photos</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Trips</Text>
        {trips.map((trip) => (
          <Pressable key={trip.id} style={styles.tripCard}>
            <Image source={{ uri: trip.image }} style={styles.tripImage} />
            <View style={styles.tripInfo}>
              <Text style={styles.tripDestination}>{trip.destination}</Text>
              <Text style={styles.tripDates}>
                <Ionicons name="calendar" size={14} color="#6B7280" />
                {' ' + trip.dates}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={styles.menuSection}>
        <Pressable style={styles.menuItem}>
          <Ionicons name="settings-outline" size={24} color="#111827" />
          <Text style={styles.menuText}>Settings</Text>
          <Ionicons name="chevron-forward" size={24} color="#6B7280" />
        </Pressable>
        <Pressable style={styles.menuItem}>
          <Ionicons name="help-circle-outline" size={24} color="#111827" />
          <Text style={styles.menuText}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={24} color="#6B7280" />
        </Pressable>
        <Pressable style={styles.menuItem}>
          <Ionicons name="log-out-outline" size={24} color="#111827" />
          <Text style={styles.menuText}>Log Out</Text>
          <Ionicons name="chevron-forward" size={24} color="#6B7280" />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  bio: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tripImage: {
    width: '100%',
    height: 150,
  },
  tripInfo: {
    padding: 12,
  },
  tripDestination: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  tripDates: {
    fontSize: 14,
    color: '#6B7280',
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  menuText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
});