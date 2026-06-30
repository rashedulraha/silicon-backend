import prisma from '../../config/db';
import { PropertyStatus } from '@prisma/client';

export interface PropertyFilters {
  page: number;
  limit: number;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  status?: PropertyStatus;
  search?: string;
}

// Helper to generate a unique-ish slug
const generateSlug = async (title: string): Promise<string> => {
  const baseSlug = title
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

  // Append a short random string to guarantee uniqueness
  const suffix = Math.random().toString(36).substring(2, 7);
  return `${baseSlug}-${suffix}`;
};

export const getProperties = async (filters: PropertyFilters) => {
  const { page, limit, city, minPrice, maxPrice, bedrooms, bathrooms, status, search } = filters;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (city) {
    where.city = { contains: city, mode: 'insensitive' };
  }

  if (status) {
    where.status = status;
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) {
      where.price.gte = minPrice;
    }
    if (maxPrice !== undefined) {
      where.price.lte = maxPrice;
    }
  }

  if (bedrooms !== undefined) {
    where.bedrooms = { gte: bedrooms };
  }

  if (bathrooms !== undefined) {
    where.bathrooms = { gte: bathrooms };
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [total, properties] = await prisma.$transaction([
    prisma.property.count({ where }),
    prisma.property.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return { total, properties };
};

export const getPropertyBySlug = async (slug: string) => {
  return prisma.property.findUnique({
    where: { slug },
  });
};

export const getPropertyById = async (id: string) => {
  return prisma.property.findUnique({
    where: { id },
  });
};

export const createProperty = async (data: any) => {
  const { title, description, price, location, features, images } = data;
  const slug = await generateSlug(title);

  return prisma.property.create({
    data: {
      title,
      slug,
      description,
      price,
      address: location.address,
      city: location.city,
      state: location.state || null,
      zipCode: location.zipCode || null,
      latitude: location.coordinates?.lat || null,
      longitude: location.coordinates?.lng || null,
      bedrooms: features.bedrooms,
      bathrooms: features.bathrooms,
      areaSqFt: features.areaSqFt,
      parkingSpaces: features.parkingSpaces ?? 0,
      hasPool: !!features.hasPool,
      hasGarden: !!features.hasGarden,
      yearBuilt: features.yearBuilt || null,
      images,
      status: PropertyStatus.available,
    },
  });
};

export const updateProperty = async (id: string, data: any) => {
  const { title, description, price, location, features, images, status } = data;

  const updateData: any = {};

  if (title !== undefined) {
    updateData.title = title;
    updateData.slug = await generateSlug(title);
  }
  if (description !== undefined) updateData.description = description;
  if (price !== undefined) updateData.price = price;
  if (status !== undefined) updateData.status = status as PropertyStatus;
  if (images !== undefined) updateData.images = images;

  if (location) {
    if (location.address !== undefined) updateData.address = location.address;
    if (location.city !== undefined) updateData.city = location.city;
    if (location.state !== undefined) updateData.state = location.state;
    if (location.zipCode !== undefined) updateData.zipCode = location.zipCode;
    if (location.coordinates) {
      if (location.coordinates.lat !== undefined) updateData.latitude = location.coordinates.lat;
      if (location.coordinates.lng !== undefined) updateData.longitude = location.coordinates.lng;
    }
  }

  if (features) {
    if (features.bedrooms !== undefined) updateData.bedrooms = features.bedrooms;
    if (features.bathrooms !== undefined) updateData.bathrooms = features.bathrooms;
    if (features.areaSqFt !== undefined) updateData.areaSqFt = features.areaSqFt;
    if (features.parkingSpaces !== undefined) updateData.parkingSpaces = features.parkingSpaces;
    if (features.hasPool !== undefined) updateData.hasPool = !!features.hasPool;
    if (features.hasGarden !== undefined) updateData.hasGarden = !!features.hasGarden;
    if (features.yearBuilt !== undefined) updateData.yearBuilt = features.yearBuilt;
  }

  return prisma.property.update({
    where: { id },
    data: updateData,
  });
};

export const deleteProperty = async (id: string) => {
  return prisma.property.delete({
    where: { id },
  });
};
