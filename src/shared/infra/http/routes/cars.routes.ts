import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listCars/ListAvailableCarsController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAutheticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post(
  '/',
  ensureAutheticated,
  ensureAdmin,
  createCarController.handle,
);

export { carsRoutes };
