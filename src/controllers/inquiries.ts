import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { mapPrismaInquiryToIInquiry } from '../utils/mappers';

export const createInquiry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { propertyId, message } = req.body;

    if (!propertyId || !message) {
      return res.status(400).json({ success: false, message: 'Property ID and message are required' });
    }

    // Check if property exists
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property listing not found' });
    }

    // Retrieve full context
    const inquiry = await prisma.inquiry.create({
      data: {
        userId: req.user!.id,
        propertyId,
        message,
        status: 'pending',
      },
      include: {
        property: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      inquiry: mapPrismaInquiryToIInquiry(inquiry),
    });
  } catch (error) {
    next(error);
  }
};

export const getMyInquiries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;

    const inquiries = await prisma.inquiry.findMany({
      where: { userId },
      include: {
        property: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({
      success: true,
      inquiries: inquiries.map(mapPrismaInquiryToIInquiry),
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminInquiries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.query;

    const where: any = {};
    if (status) {
      where.status = status as any;
    }

    const inquiries = await prisma.inquiry.findMany({
      where,
      include: {
        property: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({
      success: true,
      inquiries: inquiries.map(mapPrismaInquiryToIInquiry),
    });
  } catch (error) {
    next(error);
  }
};

export const updateInquiryStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'reviewed', 'contacted', 'resolved'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid or missing inquiry status' });
    }

    const existingInquiry = await prisma.inquiry.findUnique({
      where: { id },
    });

    if (!existingInquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    const updatedInquiry = await prisma.inquiry.update({
      where: { id },
      data: { status: status as any },
      include: {
        property: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Inquiry status updated successfully',
      inquiry: mapPrismaInquiryToIInquiry(updatedInquiry),
    });
  } catch (error) {
    next(error);
  }
};
