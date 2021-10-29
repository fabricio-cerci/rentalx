import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificiationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificiationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificiationsRepositoryInMemory: SpecificiationsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    specificiationsRepositoryInMemory = new SpecificiationsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificiationsRepositoryInMemory,
    );
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name car',
      description: 'description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const specification = await specificiationsRepositoryInMemory.create({
      name: 'test',
      description: 'test description',
    });

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });

  it('should not be able to add a new specification to a non-existent car', async () => {
    await expect(
      createCarSpecificationUseCase.execute({
        car_id: '1234',
        specifications_id: ['12345'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
