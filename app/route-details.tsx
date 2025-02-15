import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function RouteDetailsScreen() {
  const { id } = useLocalSearchParams();

  // Mock curatedRoutes data (replace with actual data fetching)
  const curatedRoutes = [
    {
      id: '1',
      title: 'Historical Kyoto',
      description: "Explore Kyoto's most iconic temples and shrines.",
      duration: 'Full-day',
      image: 'https://images.unsplash.com/photo-1557330311-99d2c80536ca',
      pois: [
        'Kinkaku-ji (Golden Pavilion)',
        'Fushimi Inari Shrine',
        'Kiyomizu-dera Temple',
      ],
      coordinates: [
        { latitude: 34.9916, longitude: 135.7481 }, // Example coordinates for Kinkaku-ji
        { latitude: 34.9670, longitude: 135.7684 }, // Example coordinates for Fushimi Inari Shrine
        { latitude: 34.9851, longitude: 135.7856 }, // Example coordinates for Kiyomizu-dera Temple
      ],
    },
    {
      id: '2',
      title: "Barcelona's Modernist Architecture",
      description: 'Discover the architectural wonders of Antoni Gaudí.',
      duration: 'Full-day',
      image: 'https://images.unsplash.com/photo-1560184845-78c0849ada71',
      pois: [
        'Sagrada Familia',
        'Park Güell',
        'Casa Batlló',
      ],
      coordinates: [
        { latitude: 41.4036, longitude: 2.1744 }, // Example coordinates for Sagrada Familia
        { latitude: 41.4148, longitude: 2.1544 }, // Example coordinates for Park Güell
        { latitude: 41.3919, longitude: 2.1640 }, // Example coordinates for Casa Batlló
      ],
    },
  ];

  // Find the selected route based on the id
  const route = curatedRoutes.find((route) => route.id === id);

  if (!route) {
    return (
      <View style={styles.container}>
        <Text>Route not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: route.image }} style={styles.routeImage} />
      <View style={styles.routeInfo}>
        <Text style={styles.routeTitle}>{route.title}</Text>
        <Text style={styles.routeDescription}>{route.description}</Text>
        <Text style={styles.routeDuration}>Duration: {route.duration}</Text>
        <Text style={styles.routePoisTitle}>Points of Interest:</Text>
        {route.pois.map((poi, index) => (
          <Text key={index} style={styles.routePoi}>- {poi}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  routeImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  routeInfo: {
    padding: 15,
  },
  routeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  routeDescription: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  routeDuration: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  routePoisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  routePoi: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});
