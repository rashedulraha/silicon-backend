import { z } from 'zod';

const PropertyStatusEnum = z.enum(['available', 'pending', 'sold', 'rented']);

export const queryPropertiesSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().optional().default(10),
  city: z.string().optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
  bedrooms: z.coerce.number().int().nonnegative().optional(),
  bathrooms: z.coerce.number().int().nonnegative().optional(),
  status: PropertyStatusEnum.optional(),
  search: z.string().optional(),
});

export const createPropertySchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long').max(100, 'Title cannot exceed 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  price: z.coerce.number().positive('Price must be a positive number'),
  location: z.object({
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    coordinates: z.object({
      lat: z.coerce.number(),
      lng: z.coerce.number(),
    }).optional(),
  }),
  features: z.object({
    bedrooms: z.coerce.number().int().nonnegative('Bedrooms must be a non-negative integer'),
    bathrooms: z.coerce.number().int().nonnegative('Bathrooms must be a non-negative integer'),
    areaSqFt: z.coerce.number().positive('Area in square feet must be a positive number'),
    parkingSpaces: z.coerce.number().int().nonnegative().optional().default(0),
    hasPool: z.boolean().optional().default(false),
    hasGarden: z.boolean().optional().default(false),
    yearBuilt: z.coerce.number().int().positive().optional(),
  }),
  images: z.union([z.string(), z.array(z.string())]).transform((val) => (Array.isArray(val) ? val : [val])),
});

export const updatePropertySchema = z.object({
  title: z.string().min(3).max(100).optional(),
  description: z.string().min(10).optional(),
  price: z.coerce.number().positive().optional(),
  status: PropertyStatusEnum.optional(),
  location: z.object({
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    coordinates: z.object({
      lat: z.coerce.number(),
      lng: z.coerce.number(),
    }).optional(),
  }).optional(),
  features: z.object({
    bedrooms: z.coerce.number().int().nonnegative().optional(),
    bathrooms: z.coerce.number().int().nonnegative().optional(),
    areaSqFt: z.coerce.number().positive().optional(),
    parkingSpaces: z.coerce.number().int().nonnegative().optional(),
    hasPool: z.boolean().optional(),
    hasGarden: z.boolean().optional(),
    yearBuilt: z.coerce.number().int().positive().optional(),
  }).optional(),
  images: z.union([z.string(), z.array(z.string())]).transform((val) => (Array.isArray(val) ? val : [val])).optional(),
});
