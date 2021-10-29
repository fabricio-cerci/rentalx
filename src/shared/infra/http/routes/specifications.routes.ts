import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAutheticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
  '/',
  ensureAutheticated,
  ensureAdmin,
  createSpecificationController.handle,
);

export { specificationsRoutes };
