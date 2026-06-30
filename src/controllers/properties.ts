import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { mapPrismaPropertyToIProperty } from '../utils/mappers';

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

export const getProperties = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      page = 1,
      limit = 10,
      city,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      status,
      search,
    } = req.query;

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    if (city) {
      where.city = { contains: city as string, mode: 'insensitive' };
    }

    if (status) {
      where.status = status as any;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) {
        where.price.gte = Number(minPrice);
      }
      if (maxPrice) {
        where.price.lte = Number(maxPrice);
      }
    }

    if (bedrooms) {
      where.bedrooms = { gte: Number(bedrooms) };
    }

    if (bathrooms) {
      where.bathrooms = { gte: Number(bathrooms) };
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [total, properties] = await prisma.$transaction([
      prisma.property.count({ where }),
      prisma.property.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return res.status(200).json({
      success: true,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
      properties: properties.map(mapPrismaPropertyToIProperty),
    });
  } catch (error) {
    next(error);
  }
};

export const getPropertyBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;

    const property = await prisma.property.findUnique({
      where: { slug },
    });

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property listing not found' });
    }

    return res.status(200).json({
      success: true,
      property: mapPrismaPropertyToIProperty(property),
    });
  } catch (error) {
    next(error);
  }
};

export const createProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, price, location, features, images } = req.body;

    if (!title || !description || price === undefined || !location || !features || !images) {
      return res.status(400).json({ success: false, message: 'All listing fields are required' });
    }

    const slug = await generateSlug(title);

    const property = await prisma.property.create({
      data: {
        title,
        slug,
        description,
        price: Number(price),
        address: location.address,
        city: location.city,
        state: location.state || null,
        zipCode: location.zipCode || null,
        latitude: location.coordinates?.lat || null,
        longitude: location.coordinates?.lng || null,
        bedrooms: Number(features.bedrooms),
        bathrooms: Number(features.bathrooms),
        areaSqFt: Number(features.areaSqFt),
        parkingSpaces: features.parkingSpaces ? Number(features.parkingSpaces) : 0,
        hasPool: !!features.hasPool,
        hasGarden: !!features.hasGarden,
        yearBuilt: features.yearBuilt ? Number(features.yearBuilt) : null,
        images: Array.isArray(images) ? images : [images],
        status: 'available',
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Property created successfully',
      property: mapPrismaPropertyToIProperty(property),
    });
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, description, price, location, features, images, status } = req.body;

    const existingProperty = await prisma.property.findUnique({
      where: { id },
    });

    if (!existingProperty) {
      return res.status(404).json({ success: false, message: 'Property listing not found' });
    }

    const updateData: any = {};

    if (title !== undefined) {
      updateData.title = title;
      // We regenerate slug if the title changes
      updateData.slug = await generateSlug(title);
    }
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = Number(price);
    if (status !== undefined) updateData.status = status;
    if (images !== undefined) updateData.images = Array.isArray(images) ? images : [images];

    // Map nested location updates if provided
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

    // Map nested features updates if provided
    if (features) {
      if (features.bedrooms !== undefined) updateData.bedrooms = Number(features.bedrooms);
      if (features.bathrooms !== undefined) updateData.bathrooms = Number(features.bathrooms);
      if (features.areaSqFt !== undefined) updateData.areaSqFt = Number(features.areaSqFt);
      if (features.parkingSpaces !== undefined) updateData.parkingSpaces = Number(features.parkingSpaces);
      if (features.hasPool !== undefined) updateData.hasPool = !!features.hasPool;
      if (features.hasGarden !== undefined) updateData.hasGarden = !!features.hasGarden;
      if (features.yearBuilt !== undefined) updateData.yearBuilt = Number(features.yearBuilt);
    }

    const updatedProperty = await prisma.property.update({
      where: { id },
      data: updateData,
    });

    return res.status(200).json({
      success: true,
      message: 'Property updated successfully',
      property: mapPrismaPropertyToIProperty(updatedProperty),
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const existingProperty = await prisma.property.findUnique({
      where: { id },
    });

    if (!existingProperty) {
      return res.status(404).json({ success: false, message: 'Property listing not found' });
    }

    await prisma.property.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: 'Property listing deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
