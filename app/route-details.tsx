import { useState, useEffect } from 'react';
import { Image, ScrollView, Alert, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

import { Text } from '~/components/ui/text';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { LocalStorageData, Route, getRoute, addPoi, editPoi, deletePoi } from '~/lib/route-data';

const STORAGE_KEY = 'wayfarer_routes';

export default function RouteDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [newPoi, setNewPoi] = useState('');
  const [editingPoiId, setEditingPoiId] = useState<string | null>(null);
  const [editedPoiText, setEditedPoiText] = useState('');
  const [route, setRoute] = useState<Route | null>(null); // Route state

  useEffect(() => {
    const loadRoute = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        const data = jsonValue != null ? JSON.parse(jsonValue) : {};
        setRoute(data[id as string] || null);
      } catch (e) {
        console.error('Error loading route from AsyncStorage:', e);
      }
    };

    loadRoute();
  }, [id]);

  // Initial mock data (for first-time use or if AsyncStorage is empty)
  const initialCuratedRoutes: LocalStorageData = {
    '1': {
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
        { latitude: 34.9916, longitude: 135.7481 },
        { latitude: 34.967, longitude: 135.7684 },
        { latitude: 34.9851, longitude: 135.7856 },
      ],
    },
    '2': {
      id: '2',
      title: "Barcelona's Modernist Architecture",
      description: 'Discover the architectural wonders of Antoni Gaudí.',
      duration: 'Full-day',
      image: 'https://images.unsplash.com/photo-1560184845-78c0849ada71',
      pois: ['Sagrada Familia', 'Park Güell', 'Casa Batlló'],
      coordinates: [
        { latitude: 41.4036, longitude: 2.1744 },
        { latitude: 41.4148, longitude: 2.1544 },
        { latitude: 41.3919, longitude: 2.164 },
      ],
    },
  };

  useEffect(() => {
    const initializeRoute = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        let data = jsonValue != null ? JSON.parse(jsonValue) : {};

        if (!data[id as string]) {
          // If the route doesn't exist in AsyncStorage, initialize it from initialCuratedRoutes
          const initialRoute = initialCuratedRoutes[id as string];
          if (initialRoute) {
            data[id as string] = initialRoute;
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            setRoute(initialRoute);
          }
        }
      } catch (e) {
        console.error('Error initializing route from AsyncStorage:', e);
      }
    };

    initializeRoute();
  }, [id]);

  const handleAddPoi = async () => {
    if (newPoi && route) {
      const updatedRoute = await addPoi(id as string, newPoi, route);
      if (updatedRoute) {
        setRoute(updatedRoute);
        setNewPoi('');
      } else {
        Alert.alert('Error adding POI');
      }
    }
  };

  const handleEditPoi = (poiId: string, poiText: string) => {
    setEditingPoiId(poiId);
    setEditedPoiText(poiText);
  };

  const handleSavePoi = async (index: number) => {
    if (route) {
      const updatedRoute = await editPoi(id as string, index, editedPoiText, route);
      if (updatedRoute) {
        setRoute(updatedRoute);
        setEditingPoiId(null);
        setEditedPoiText('');
      } else {
        Alert.alert('Error saving POI');
      }
    }
  };

  const handleDeletePoi = async (index: number) => {
    Alert.alert(
      'Delete POI',
      'Are you sure you want to delete this point of interest?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            if (route) {
              const updatedRoute = await deletePoi(id as string, index, route);
              if (updatedRoute) {
                setRoute(updatedRoute);
              } else {
                Alert.alert('Error deleting POI');
              }
            }
          },
        },
      ]
    );
  };

  if (!route) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Route not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1">
      <Image source={{ uri: route.image }} className="w-full h-80 mb-4" />
      <View className="p-4">
        <Text className="text-2xl font-bold mb-2">{route.title}</Text>
        <Text className="mb-2">{route.description}</Text>
        <Text className=" mb-4">
          Duration:
          {route.duration}
        </Text>
        <Text className="text-xl font-bold mt-2 mb-2">Points of Interest:</Text>

        {route.pois.map((poi, index) => (
          <Card
            key={index}
            className="flex-row items-center justify-between mb-2 rounded-md shadow-sm"
          >
            {editingPoiId === String(index) ? (
              <Input
                className="flex-1 p-2 border border-gray-300 rounded-md"
                value={editedPoiText}
                onChangeText={setEditedPoiText}
                onBlur={() => handleSavePoi(index)}
              />
            ) : (
              <Text>- {poi}</Text>
            )}

            {editingPoiId === String(index) ? (
              <View className="flex-row">
                <Button
                  onPress={() => handleSavePoi(index)}
                  className=" rounded-md px-3 py-1 ml-2"
                >
                  <Text>Save</Text>
                </Button>
                <Button
                  onPress={() => setEditingPoiId(null)}
                  className=" rounded-md px-3 py-1 ml-2"
                >
                  <Text>Cancel</Text>
                </Button>
              </View>
            ) : (
              <View className="flex-row">
                <Button
                  onPress={() => handleEditPoi(String(index), poi)}
                  className="bg-blue-500 rounded-md px-3 py-1 ml-2"
                >
                  <Text>Edit</Text>
                </Button>
                <Button
                  onPress={() => handleDeletePoi(index)}
                  className="bg-red-500  rounded-md px-3 py-1 ml-2"
                >
                  <Text>Delete</Text>
                </Button>
              </View>
            )}
          </Card>
        ))}

        <View className="flex-row mt-4">
          <Input
            className="flex-1 p-2 border border-gray-300 rounded-md mr-2"
            placeholder="Add a new point of interest"
            value={newPoi}
            onChangeText={setNewPoi}
          />
          <Button
            onPress={handleAddPoi}
            className="bg-green-500  rounded-md px-4 py-2"
          >
            <Text>Add POI</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
