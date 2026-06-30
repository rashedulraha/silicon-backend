import { z } from 'zod';

const InquiryStatusEnum = z.enum(['pending', 'reviewed', 'contacted', 'resolved']);

export const createInquirySchema = z.object({
  propertyId: z.string().uuid('Invalid property ID format (must be a UUID)'),
  message: z.string().min(5, 'Message must be at least 5 characters long').max(1000, 'Message cannot exceed 1000 characters'),
});

export const updateInquiryStatusSchema = z.object({
  status: InquiryStatusEnum,
});
