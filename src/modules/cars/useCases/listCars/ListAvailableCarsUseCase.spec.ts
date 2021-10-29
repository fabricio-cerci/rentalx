import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi A1',
      description: 'carro bonito',
      daily_rate: 140.0,
      license_plate: 'ABC1234',
      fine_amount: 100,
      brand: 'Audi',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi S1',
      description: 'carro bonito',
      daily_rate: 140.0,
      license_plate: 'ABC1234',
      fine_amount: 100,
      brand: 'Audi',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Audi S1',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: '500',
      description: 'carro feio',
      daily_rate: 140.0,
      license_plate: 'ABC1234',
      fine_amount: 100,
      brand: 'Fiat',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Fiat',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: '500',
      description: 'carro feio',
      daily_rate: 140.0,
      license_plate: 'ABC1234',
      fine_amount: 100,
      brand: 'Fiat',
      category_id: 'category_id2',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'category_id2',
    });

    expect(cars).toEqual([car]);
  });
});
