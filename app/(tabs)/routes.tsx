import { useState } from 'react';
import { View, ScrollView, Pressable, Alert, StyleSheet } from 'react-native';
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { Link } from 'expo-router';

import { Text } from '~/components/ui/text';
import { useColorScheme } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/lib/constants';
import { IMAGE } from '~/mocks';

export default function RoutesScreen() {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === 'dark' ? NAV_THEME.dark : NAV_THEME.light;
  const [activeRoute, setActiveRoute] = useState(null);
  const [nextDestinationIndex, setNextDestinationIndex] = useState(0);

  const curatedRoutes = [
    {
      id: '1',
      title: 'Historical Kyoto',
      description: 'Explore Kyoto\'s most iconic temples and shrines.',
      duration: 'Full-day',
      image: IMAGE.KYOTO,
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
      image: IMAGE.BARCELONA,
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
        <Text className="text-center mt-5" style={{color: theme.text}}>
          Select a route to view the map.
        </Text>
      );
    }

    const nextDestination = activeRoute.coordinates[nextDestinationIndex];
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${nextDestination.latitude},${nextDestination.longitude}&zoom=14&size=400x300&maptype=roadmap&markers=color:red%7Clabel:Next%7C${nextDestination.latitude},${nextDestination.longitude}`;

    return (
      <View className="mt-5 p-2 bg-card mx-4 rounded-md">
        <WebView
          style={{ height: 300, width: '100%' }}
          source={{ uri: mapUrl }}
        />
        <Pressable className="bg-sky-500 p-3 rounded-md items-center mt-2" onPress={handleNextDestination}>
          <Text className="text-white text-base">Next Stop</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-5 bg-card mb-2">
        <Text className="text-2xl font-bold" style={{color: theme.text}}>Curated Routes</Text>
        <Text className="text-muted-foreground" style={{color: theme.text}}>
          Explore our hand-picked routes for unforgettable experiences.
        </Text>
      </View>
      {curatedRoutes.map((route) => (
        <Link key={route.id} href={`/route-details?id=${route.id}`} asChild>
          <Pressable className="bg-card p-4 mx-4 mb-2 rounded-md overflow-hidden">
            <Image source={route.image} style={{ width: '100%', height: 200, marginBottom: 10 }} />
            <View>
              <Text className="text-lg font-bold" style={{color: theme.text}}>{route.title}</Text>
              <Text className="text-muted-foreground" style={{color: theme.text}}>{route.description}</Text>
            </View>
          </Pressable>
        </Link>
      ))}
      {renderMap()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  noRouteText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
