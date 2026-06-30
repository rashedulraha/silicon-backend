import { Router } from 'express';
import { getAdminInquiries, updateInquiryStatus } from '../controllers/inquiries';
import { authenticateJWT, authorizeRoles } from '../middleware/auth';

const router = Router();

// Strictly Admin access
router.get('/', authenticateJWT, authorizeRoles('admin'), getAdminInquiries);
router.put('/:id', authenticateJWT, authorizeRoles('admin'), updateInquiryStatus);

export default router;
