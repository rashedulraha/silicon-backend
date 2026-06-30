import prisma from '../../config/db';
import { InquiryStatus } from '@prisma/client';

export const getInquiryById = async (id: string) => {
  return prisma.inquiry.findUnique({
    where: { id },
  });
};

export const createInquiry = async (userId: string, propertyId: string, message: string) => {
  return prisma.inquiry.create({
    data: {
      userId,
      propertyId,
      message,
      status: InquiryStatus.pending,
    },
    include: {
      property: true,
    },
  });
};

export const getInquiriesByUserId = async (userId: string) => {
  return prisma.inquiry.findMany({
    where: { userId },
    include: {
      property: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const getAllInquiries = async (status?: InquiryStatus) => {
  const where: any = {};
  if (status) {
    where.status = status;
  }

  return prisma.inquiry.findMany({
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
};

export const updateInquiryStatus = async (id: string, status: InquiryStatus) => {
  return prisma.inquiry.update({
    where: { id },
    data: { status },
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
};
