import { Router } from 'express';
import {
  getProperties,
  getPropertyBySlug,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/properties';
import { authenticateJWT, authorizeRoles } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getProperties);
router.get('/:slug', getPropertyBySlug);

// Admin-only routes
router.post('/', authenticateJWT, authorizeRoles('admin'), createProperty);
router.put('/:id', authenticateJWT, authorizeRoles('admin'), updateProperty);
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), deleteProperty);

export default router;
