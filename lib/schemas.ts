import { z } from 'zod';

const CoordinateSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

const PointOfInformationSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  coordinates: CoordinateSchema,
  imageUrl: z.string().optional(),
  rating: z.number().optional(),
});

const RouteSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  duration: z.string(),
  image: z.string(),
  pointsOfInformation: z.array(PointOfInformationSchema),
  data: z.any().optional(),
});

const LocalStorageDataSchema = z.record(RouteSchema);

export type Coordinate = z.infer<typeof CoordinateSchema>;
export type PointOfInformation = z.infer<typeof PointOfInformationSchema>;
export type Route = z.infer<typeof RouteSchema>;
export type LocalStorageData = z.infer<typeof LocalStorageDataSchema>;

export {
  CoordinateSchema,
  PointOfInformationSchema,
  RouteSchema,
  LocalStorageDataSchema,
};