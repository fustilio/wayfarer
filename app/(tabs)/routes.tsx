import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { Link } from 'expo-router';

export default function RoutesScreen() {
  const [activeRoute, setActiveRoute] = useState(null);
  const [nextDestinationIndex, setNextDestinationIndex] = useState(0);

  const curatedRoutes = [
    {
      id: '1',
      title: 'Historical Kyoto',
      description: 'Explore Kyoto\'s most iconic temples and shrines.',
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
      title: 'Barcelona\'s Modernist Architecture',
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

  const handleRoutePress = (route) => {
    setActiveRoute(route);
    setNextDestinationIndex(0);
  };

  const handleNextDestination = () => {
    if (activeRoute && nextDestinationIndex < activeRoute.coordinates.length - 1) {
      setNextDestinationIndex(nextDestinationIndex + 1);
    } else {
      Alert.alert("You've reached the end of the route!");
    }
  };

  const renderMap = () => {
    if (!activeRoute) {
      return (
        <Text style={styles.noRouteText}>
          Select a route to view the map.
        </Text>
      );
    }

    const nextDestination = activeRoute.coordinates[nextDestinationIndex];
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${nextDestination.latitude},${nextDestination.longitude}&zoom=14&size=400x300&maptype=roadmap&markers=color:red%7Clabel:Next%7C${nextDestination.latitude},${nextDestination.longitude}`;

    return (
      <View style={styles.mapContainer}>
        <WebView
          style={styles.map}
          source={{ uri: mapUrl }}
        />
        <Pressable onPress={handleNextDestination} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next Stop</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Curated Routes</Text>
        <Text style={styles.subtitle}>
          Explore our hand-picked routes for unforgettable experiences.
        </Text>
      </View>
      {curatedRoutes.map((route) => (
        <Link key={route.id} href={`/route-details?id=${route.id}`} asChild>
          <Pressable style={styles.routeItem}>
            <Image source={{ uri: route.image }} style={styles.routeImage} />
            <View style={styles.routeInfo}>
              <Text style={styles.routeTitle}>{route.title}</Text>
              <Text style={styles.routeDescription}>{route.description}</Text>
            </View>
          </Pressable>
        </Link>
      ))}
      {renderMap()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
  routeItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  routeImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  routeInfo: {
    flexDirection: 'column',
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  routeDescription: {
    fontSize: 14,
    color: 'gray',
  },
  mapContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 8,
  },
  map: {
    height: 300,
    width: '100%',
  },
  nextButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  noRouteText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
