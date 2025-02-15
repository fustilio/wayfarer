import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ExploreScreen() {
  const featuredDestinations = [
    {
      id: '1',
      name: 'Kyoto, Japan',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
      description: 'Ancient temples, traditional gardens, and cultural experiences',
    },
    {
      id: '2',
      name: 'Barcelona, Spain',
      image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
      description: 'Modernist architecture, vibrant culture, and Mediterranean charm',
    },
  ];

  const localExperiences = [
    {
      id: '1',
      title: 'Traditional Tea Ceremony',
      location: 'Kyoto',
      image: 'https://images.unsplash.com/photo-1545048702-79362697d413',
      price: '$45',
    },
    {
      id: '2',
      title: 'Tapas Walking Tour',
      location: 'Barcelona',
      image: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b',
      price: '$35',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning</Text>
        <Text style={styles.title}>Where to next?</Text>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#6B7280" />
        <Text style={styles.searchText}>Search destinations</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Destinations</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredDestinations.map((destination) => (
            <Pressable key={destination.id} style={styles.destinationCard}>
              <Image
                source={{ uri: destination.image }}
                style={styles.destinationImage}
              />
              <View style={styles.destinationInfo}>
                <Text style={styles.destinationName}>{destination.name}</Text>
                <Text style={styles.destinationDescription}>
                  {destination.description}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Local Experiences</Text>
        {localExperiences.map((experience) => (
          <Link key={experience.id} href="/modal" asChild>
            <Pressable style={styles.experienceCard}>
              <Image
                source={{ uri: experience.image }}
                style={styles.experienceImage}
              />
              <View style={styles.experienceInfo}>
                <Text style={styles.experienceTitle}>{experience.title}</Text>
                <Text style={styles.experienceLocation}>
                  <Ionicons name="location" size={14} color="#6B7280" />
                  {' ' + experience.location}
                </Text>
                <Text style={styles.experiencePrice}>{experience.price}</Text>
              </View>
            </Pressable>
          </Link>
        ))}
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
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
  },
  greeting: {
    fontSize: 16,
    color: '#6B7280',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 4,
  },
  searchBar: {
    margin: 20,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchText: {
    marginLeft: 8,
    color: '#6B7280',
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 20,
    marginBottom: 12,
  },
  destinationCard: {
    width: 280,
    marginLeft: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  destinationImage: {
    width: '100%',
    height: 160,
  },
  destinationInfo: {
    padding: 16,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  destinationDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  experienceCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  experienceImage: {
    width: 100,
    height: 100,
  },
  experienceInfo: {
    flex: 1,
    padding: 12,
  },
  experienceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  experienceLocation: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  experiencePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563EB',
  },
});