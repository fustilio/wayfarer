import { getDistance as geolibGetDistance } from 'geolib';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Coordinate, LocalStorageData, PointOfInformation, Route } from './schemas';
import { curatedRoutes } from './route-data';
import { StorageInterface } from './storage-interface';

export const STORAGE_KEY = 'wayfarer_routes_v2';

class AsyncStorageService implements StorageInterface {
  async loadRoute(id: string): Promise<Route | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      const data = jsonValue != null ? JSON.parse(jsonValue) : {};
      return data[id] || null;
    } catch (e) {
      console.error('Error loading route from AsyncStorage:', e);
      return null;
    }
  }

  async saveRoute(id: string, route: Route): Promise<void> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      const data = jsonValue != null ? JSON.parse(jsonValue) : {};
      data[id] = route;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving route to AsyncStorage:', e);
    }
  }

  async deleteRoute(id: string): Promise<void> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      const data = jsonValue != null ? JSON.parse(jsonValue) : {};
      delete data[id];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error deleting route from AsyncStorage:', e);
    }
  }
}

const storageService = new AsyncStorageService();

const getRoute = async (routeId: string): Promise<Route | null> => {
  return storageService.loadRoute(routeId);
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
    };
    await storageService.saveRoute(routeId, updatedRoute);
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
    await storageService.saveRoute(routeId, updatedRoute);
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
    };
    await storageService.saveRoute(routeId, updatedRoute);
    return updatedRoute;
  } catch (e) {
    console.error('Error saving route to AsyncStorage:', e);
    return null;
  }
};

const loadRoute = async (routeId: string): Promise<Route | null> => {
    return storageService.loadRoute(routeId);
};

const getDistance = (start: Coordinate, end: Coordinate): number => {
  return geolibGetDistance(start, end);
};

// TODO: refactor this to use the new schema ./lib/schemas.ts
export type { Coordinate, Route, LocalStorageData, PointOfInformation };
export { getRoute, loadRoute, addPoi, editPoi, deletePoi, getDistance };
