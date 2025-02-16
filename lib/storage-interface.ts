import { Route } from './schemas';

export interface StorageInterface {
  loadRoute(id: string): Promise<Route | null>;
  saveRoute(id: string, route: Route): Promise<void>;
  deleteRoute(id: string): Promise<void>;
}
