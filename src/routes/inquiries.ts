import { Router } from 'express';
import { createInquiry, getMyInquiries } from '../controllers/inquiries';
import { authenticateJWT, authorizeRoles } from '../middleware/auth';

const router = Router();

// Only authenticated users (with role 'user' or 'admin') can make inquiries and retrieve theirs
router.post('/', authenticateJWT, authorizeRoles('user', 'admin'), createInquiry);
router.get('/my-inquiries', authenticateJWT, authorizeRoles('user', 'admin'), getMyInquiries);

export default router;
