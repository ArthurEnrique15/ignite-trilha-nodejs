import { Rental } from "@modules/rentals/infra/typeorm/entitites/Rental";

interface IRentalsRepository {
    findCarOpenRental(car_id: string): Promise<Rental>;
    findUserOpenRental(user_id: string): Promise<Rental>;
}

export { IRentalsRepository };
