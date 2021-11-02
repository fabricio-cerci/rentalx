import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.findOne({ where: { car_id, end_date: null } });
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({ where: { user_id, end_date: null } });
  }
  async create({
    id,
    car_id,
    user_id,
    expected_return_date,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      id,
      car_id,
      user_id,
      expected_return_date,
      end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    return this.repository.findOne(id);
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    return this.repository.find({ where: { user_id }, relations: ['car'] });
  }
}

export { RentalsRepository };
