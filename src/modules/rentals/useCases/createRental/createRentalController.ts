import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRentalUseCase } from '@modules/rentals/useCases/createRental/createRentalUseCase';

class CreateRentalController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { car_id, expected_return_date } = request.body;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      car_id,
      user_id,
      expected_return_date,
    });

    return response.status(201).json(rental);
  }
}

export { CreateRentalController };
