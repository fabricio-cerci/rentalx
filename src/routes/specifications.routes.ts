import { Router } from 'express';

import { ensureAutheticated } from '../middlewares/ensureAuthenticated';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
  '/',
  ensureAutheticated,
  createSpecificationController.handle,
);

export { specificationsRoutes };
