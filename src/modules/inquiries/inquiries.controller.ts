import { Request, Response, NextFunction } from 'express';
import * as inquiriesService from './inquiries.service';
import * as propertiesService from '../properties/properties.service';
import { mapPrismaInquiryToIInquiry } from '../../utils/mappers';
import { InquiryStatus } from '@prisma/client';



export const createInquiry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { propertyId, message } = req.body;
    const userId = req.user!.id;

    // Check if property exists
    const property = await propertiesService.getPropertyById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property listing not found' });
    }

    const inquiry = await inquiriesService.createInquiry(userId, propertyId, message);

    return res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      inquiry: mapPrismaInquiryToIInquiry(inquiry),
    });
  } catch (error) {
    return next(error);
  }
};

export const getMyInquiries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const inquiries = await inquiriesService.getInquiriesByUserId(userId);

    return res.status(200).json({
      success: true,
      inquiries: inquiries.map(mapPrismaInquiryToIInquiry),
    });
  } catch (error) {
    return next(error);
  }
};

export const getAdminInquiries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.query;
    const inquiries = await inquiriesService.getAllInquiries(status as InquiryStatus);

    return res.status(200).json({
      success: true,
      inquiries: inquiries.map(mapPrismaInquiryToIInquiry),
    });
  } catch (error) {
    return next(error);
  }
};

export const updateInquiryStatus = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const existingInquiry = await inquiriesService.getInquiryById(id);
    if (!existingInquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    const updatedInquiry = await inquiriesService.updateInquiryStatus(id, status as InquiryStatus);

    return res.status(200).json({
      success: true,
      message: 'Inquiry status updated successfully',
      inquiry: mapPrismaInquiryToIInquiry(updatedInquiry),
    });
  } catch (error) {
    return next(error);
  }
};
