import { Router } from 'express';
import * as propertiesController from './properties.controller';
import { validate } from '../../middleware/validate.middleware';
import { authenticateJWT, authorizeRoles } from '../../middleware/auth.middleware';
import { Role } from '@prisma/client';
import {
  queryPropertiesSchema,
  createPropertySchema,
  updatePropertySchema,
} from './properties.validation';


const router = Router();

// Public routes
router.get(
  '/',
  validate({ query: queryPropertiesSchema }),
  propertiesController.getProperties
);
router.get('/:slug', propertiesController.getPropertyBySlug);

// Admin-only routes
router.post(
  '/',
  authenticateJWT,
  authorizeRoles(Role.ADMIN),
  validate({ body: createPropertySchema }),
  propertiesController.createProperty
);

router.put(
  '/:id',
  authenticateJWT,
  authorizeRoles(Role.ADMIN),
  validate({ body: updatePropertySchema }),
  propertiesController.updateProperty
);

router.delete(
  '/:id',
  authenticateJWT,
  authorizeRoles(Role.ADMIN),
  propertiesController.deleteProperty
);

export default router;
