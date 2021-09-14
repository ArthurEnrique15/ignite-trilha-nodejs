import { Rental } from "@modules/rentals/infra/typeorm/entitites/Rental";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
    rentals: Rental[] = [];

    async findCarOpenRental(car_id: string): Promise<Rental> {
        return this.rentals.find(
            (rental) => rental.car_id === car_id && rental.end_date === null
        );
    }
    async findUserOpenRental(user_id: string): Promise<Rental> {
        return this.rentals.find(
            (rental) => rental.user_id === user_id && rental.end_date === null
        );
    }
}

export { RentalsRepositoryInMemory };
