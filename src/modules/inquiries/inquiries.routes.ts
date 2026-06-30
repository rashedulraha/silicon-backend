import { Router } from 'express';
import * as inquiriesController from './inquiries.controller';
import { validate } from '../../middleware/validate.middleware';
import { authenticateJWT, authorizeRoles } from '../../middleware/auth.middleware';
import { createInquirySchema, updateInquiryStatusSchema } from './inquiries.validation';
import { Role } from '@prisma/client';

const userRouter = Router();
const adminRouter = Router();

// Client routes
userRouter.post(
  '/',
  authenticateJWT,
  validate({ body: createInquirySchema }),
  inquiriesController.createInquiry
);

userRouter.get(
  '/my-inquiries',
  authenticateJWT,
  inquiriesController.getMyInquiries
);

// Admin routes
adminRouter.get(
  '/',
  authenticateJWT,
  authorizeRoles(Role.admin),
  inquiriesController.getAdminInquiries
);

adminRouter.put(
  '/:id',
  authenticateJWT,
  authorizeRoles(Role.admin),
  validate({ body: updateInquiryStatusSchema }),
  inquiriesController.updateInquiryStatus
);

export { userRouter, adminRouter };
export default userRouter;
