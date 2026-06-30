import { Request, Response, NextFunction } from 'express';
import * as propertiesService from './properties.service';
import { mapPrismaPropertyToIProperty } from '../../utils/mappers';

export const getProperties = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = req.query as any;
    const { total, properties } = await propertiesService.getProperties(filters);

    return res.status(200).json({
      success: true,
      pagination: {
        total,
        page: Number(filters.page),
        limit: Number(filters.limit),
        totalPages: Math.ceil(total / Number(filters.limit)),
      },
      properties: properties.map(mapPrismaPropertyToIProperty),
    });
  } catch (error) {
    return next(error);
  }
};

export const getPropertyBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const property = await propertiesService.getPropertyBySlug(slug);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property listing not found' });
    }

    return res.status(200).json({
      success: true,
      property: mapPrismaPropertyToIProperty(property),
    });
  } catch (error) {
    return next(error);
  }
};

export const createProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const property = await propertiesService.createProperty(req.body);

    return res.status(201).json({
      success: true,
      message: 'Property created successfully',
      property: mapPrismaPropertyToIProperty(property),
    });
  } catch (error) {
    return next(error);
  }
};

export const updateProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const existingProperty = await propertiesService.getPropertyById(id);
    if (!existingProperty) {
      return res.status(404).json({ success: false, message: 'Property listing not found' });
    }

    const updatedProperty = await propertiesService.updateProperty(id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Property updated successfully',
      property: mapPrismaPropertyToIProperty(updatedProperty),
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const existingProperty = await propertiesService.getPropertyById(id);
    if (!existingProperty) {
      return res.status(404).json({ success: false, message: 'Property listing not found' });
    }

    await propertiesService.deleteProperty(id);

    return res.status(200).json({
      success: true,
      message: 'Property listing deleted successfully',
    });
  } catch (error) {
    return next(error);
  }
};
