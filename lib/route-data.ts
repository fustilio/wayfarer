import { getDistance as geolibGetDistance } from 'geolib';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface Route {
  id: string;
  title: string;
  description: string;
  duration: string;
  image: string;
  pointsOfInformation: PointOfInformation[];
  coordinates: Coordinate[];
  data?: any;
}

interface PointOfInformation {
  name: string;
  description?: string;
  coordinates: Coordinate;
  imageUrl?: string;
  rating?: number;
}


interface Coordinate {
  latitude: number;
  longitude: number;
}

interface Route {
  id: string;
  title: string;
  description: string;
  duration: string;
  image: string;
  pois: string[];
  coordinates: Coordinate[];
  data?: any;
}

interface LocalStorageData {
  [routeId: string]: Route;
}

const STORAGE_KEY = 'wayfarer_routes';

const getRoute = async (routeId: string): Promise<Route | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    const data = jsonValue != null ? JSON.parse(jsonValue) : {};
    return data[routeId] || null;
  } catch (e) {
    console.error('Error loading route from AsyncStorage:', e);
    return null;
  }
};

const addPoi = async (
  routeId: string,
  newPointOfInformation: PointOfInformation,
  route: Route
): Promise<Route | null> => {
  try {
    const updatedRoute: Route = {
      ...route,
      pointsOfInformation: [...route.pointsOfInformation, newPointOfInformation],
      coordinates: [...route.coordinates, { latitude: 0, longitude: 0 }], // TODO: add coordinate input
    };

    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    const data = jsonValue != null ? JSON.parse(jsonValue) : {};
    data[routeId] = updatedRoute;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return updatedRoute;
  } catch (e) {
    console.error('Error saving route to AsyncStorage:', e);
    return null;
  }
};

const editPoi = async (
  routeId: string,
  index: number,
  editedPointOfInformation: PointOfInformation,
  route: Route
): Promise<Route | null> => {
  try {
    const updatedRoute: Route = {
      ...route,
      pointsOfInformation: route.pointsOfInformation.map((pointOfInformation, i) => (i === index ? editedPointOfInformation : pointOfInformation)),
    };

    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    const data = jsonValue != null ? JSON.parse(jsonValue) : {};
    data[routeId] = updatedRoute;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return updatedRoute;
  } catch (e) {
    console.error('Error saving route to AsyncStorage:', e);
    return null;
  }
};

const deletePoi = async (
  routeId: string,
  index: number,
  route: Route
): Promise<Route | null> => {
  try {
    const updatedRoute: Route = {
      ...route,
      pointsOfInformation: route.pointsOfInformation.filter((_, i) => i !== index),
      coordinates: route.coordinates.filter((_, i) => i !== index),
    };

    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    const data = jsonValue != null ? JSON.parse(jsonValue) : {};
    data[routeId] = updatedRoute;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return updatedRoute;
  } catch (e) {
    console.error('Error saving route to AsyncStorage:', e);
    return null;
  }
};

const loadRoute = async (routeId: string): Promise<Route | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    const data = jsonValue != null ? JSON.parse(jsonValue) : {};
    return data[routeId] || null;
  } catch (e) {
    console.error('Error loading route from AsyncStorage:', e);
    return null;
  }
};

const getDistance = (start: Coordinate, end: Coordinate): number => {
  return geolibGetDistance(start, end);
};

export type { Coordinate, Route, LocalStorageData, PointOfInformation };
export { getRoute, loadRoute, addPoi, editPoi, deletePoi, getDistance };
