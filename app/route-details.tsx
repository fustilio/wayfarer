import { useState, useEffect, useCallback } from 'react';
import {
  Image,
  ScrollView,
  Alert,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { Feather } from '@expo/vector-icons';
import { Text } from '~/components/ui/text';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import PoiForm from '~/components/poi-form';
import {
  LocalStorageData,
  Route,
  getRoute,
  addPoi,
  editPoi,
  deletePoi,
  Coordinate,
  loadRoute,
  getDistance,
  PointOfInformation,
  STORAGE_KEY,
} from '~/lib/route-crud';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ButtonWithIcon } from '~/components/ui/button-with-icon';
import { Pencil, Trash } from '~/lib/icons';
import { useColorScheme } from '~/lib/useColorScheme';
                                                                                                                             
export default function RouteDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { colorScheme } = useColorScheme();
  const [newPoi, setNewPoi] = useState<PointOfInformation>({
    name: '',
    coordinates: { latitude: 0, longitude: 0 },
  });
  const [editingPoiId, setEditingPoiId] = useState<string | null>(null);
  const [editedPoiText, setEditedPoiText] = useState<PointOfInformation>({
    name: '',
    coordinates: { latitude: 0, longitude: 0 },
  });
  const [route, setRoute] = useState<Route | null>(null);
  const [distances, setDistances] = useState<number[]>([]);

  const loadRouteData = useCallback(async () => {
    try {
      const data = await loadRoute(id as string);
      setRoute(data || null);
    } catch (e) {
      console.error('Error loading route from AsyncStorage:', e);
    }
  }, [id]);
                                                                                                                             
  useEffect(() => {
    loadRouteData();
  }, [loadRouteData, id]);
                                                                                                                             
  useEffect(() => {
    if (route && route.pointsOfInformation.length > 1) {
      const calculatedDistances: number[] = [];
      for (let i = 0; i < route.pointsOfInformation.length - 1; i++) {
        const distance = getDistance(
          {
            latitude: route.pointsOfInformation[i].coordinates.latitude,
            longitude: route.pointsOfInformation[i].coordinates.longitude,
          },
          {
            latitude: route.pointsOfInformation[i + 1].coordinates.latitude,
            longitude: route.pointsOfInformation[i + 1].coordinates.longitude,
          }
        );
        calculatedDistances.push(distance);
      }
      setDistances(calculatedDistances);
    } else {
      setDistances([]);
    }
  }, [route]);
                                                                                                                             
  const handleMovePoiUp = async (index: number) => {
    if (route && index > 0) {
      const newPois = [...route.pointsOfInformation];
                                                                                                                             
      // Swap POIs
      [newPois[index], newPois[index - 1]] = [
        newPois[index - 1],
        newPois[index],
      ];
                                                                                                                             
      const updatedRoute: Route = {
        ...route,
        pointsOfInformation: newPois,
      };

      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        const data = jsonValue != null ? JSON.parse(jsonValue) : {};
        data[id as string] = updatedRoute;
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setRoute(updatedRoute);
      } catch (e) {
        console.error('Error saving route to AsyncStorage:', e);
      }
    }
  };
                                                                                                                             
  const handleMovePoiDown = async (index: number) => {
    if (route && index < route.pointsOfInformation.length - 1) {
      const newPois = [...route.pointsOfInformation];
                                                                                                                             
      // Swap POIs
      [newPois[index], newPois[index + 1]] = [
        newPois[index + 1],
        newPois[index],
      ];
                                                                                                                             
      const updatedRoute: Route = {
        ...route,
        pointsOfInformation: newPois,
      };
                                                                                                                             
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        const data = jsonValue != null ? JSON.parse(jsonValue) : {};
        data[id as string] = updatedRoute;
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setRoute(updatedRoute);
      } catch (e) {
        console.error('Error saving route to AsyncStorage:', e);
      }
    }
  };
                                                                                                                             
  const handleAddPoi = async (poi: PointOfInformation) => {
    if (poi.name && route) {
      try {
        const updatedRoute = await addPoi(id as string, poi, route);
        if (updatedRoute) {
          setRoute(updatedRoute);
          setNewPoi({ name: '', description: '', coordinates: { latitude: 0, longitude: 0 } });
          Alert.alert('Point of Information added successfully!');
        } else {
          Alert.alert('Error adding Point of Information');
        }
      } catch (error) {
        console.error('Error adding Point of Information:', error);
        Alert.alert('Error adding Point of Information');
      }
    }
  };
                                                                                                                             
  const handleEditPoi = (
    poiId: string,
    pointOfInformation: PointOfInformation
  ) => {
    setEditingPoiId(poiId);
    setEditedPoiText(pointOfInformation);
  };
                                                                                                                             
  const handleSavePoi = async (index: number) => {
    if (route) {
      const updatedRoute = await editPoi(
        id as string,
        index,
        editedPoiText,
        route
      );
      if (updatedRoute) {
        setRoute(updatedRoute);
        setEditingPoiId(null);
        setEditedPoiText({
          name: '',
          coordinates: { latitude: 0, longitude: 0 },
        });
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView className="flex-1">
        <Image source={{ uri: route.image }} className="w-full h-80 mb-4" />
        <View className="p-4">
          <Text className="text-2xl font-bold mb-2">{route.title}</Text>
          <Text className="mb-2">{route.description}</Text>
          <Text className=" mb-4">
            Duration:
            {route.duration}
          </Text>
          <Text className="text-xl font-bold mt-2 mb-2">
            Points of Information:
          </Text>
          {route.pointsOfInformation &&
            route.pointsOfInformation.map((pointOfInformation, index) => {
              const distance = distances[index > 0 ? index - 1 : index];
              return (
                <Card
                  key={index}
                  className="flex-row items-center justify-between mb-2 rounded-md shadow-sm"
                >
                  <View className="flex-row items-center flex-1">
                    {editingPoiId === String(index) ? (
                      <Input
                        className="flex-1 p-2 border border-gray-300 rounded-md"
                        value={editedPoiText.name}
                        onChangeText={(text) =>
                          setEditedPoiText({ ...editedPoiText, name: text })
                        }
                        onBlur={() => handleSavePoi(index)}
                      />
                    ) : (
                      <Text className="flex-1">
                        - {pointOfInformation.name}{' '}
                        {index > 0 && distance !== undefined
                          ? `(${distance}m)`
                          : ''}
                      </Text>
                    )}
                  </View>
                  <View className="flex-row">
                    <Pressable
                      onPress={() => handleMovePoiUp(index)}
                      disabled={index === 0}
                      className="px-2"
                    >
                      <Feather
                        name="arrow-up"
                        size={20}
                        color={
                          index === 0
                            ? 'gray'
                            : colorScheme === 'dark'
                            ? 'white'
                            : 'black'
                        }
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => handleMovePoiDown(index)}
                      disabled={index === route.pointsOfInformation.length - 1}
                      className="px-2"
                    >
                      <Feather
                        name="arrow-down"
                        size={20}
                        color={
                          index === route.pointsOfInformation.length - 1
                            ? 'gray'
                            : colorScheme === 'dark'
                            ? 'white'
                            : 'black'
                        }
                      />
                    </Pressable>
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
                          onPress={() =>
                            handleEditPoi(String(index), pointOfInformation)
                          }
                          className="bg-blue-500 rounded-md px-3 py-1 ml-2"
                        >
                          <Pencil size={16} color="white" />
                        </Button>
                                                                                                                             
                        <Button
                          onPress={() => handleDeletePoi(index)}
                          className="bg-red-500 rounded-md px-3 py-1 ml-2"
                        >
                          <Trash size={16} color="white" />
                        </Button>
                      </View>
                    )}
                  </View>
                </Card>
              );
            })}
          <PoiForm
            onSubmit={(poi) => {
              handleAddPoi(poi);
            }}
          />
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
                                                                                                                             
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
});
