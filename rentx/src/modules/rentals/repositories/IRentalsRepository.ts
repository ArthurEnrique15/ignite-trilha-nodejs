import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";

interface IRentalsRepository {
    create(data: ICreateRentalDTO): Promise<Rental>;
    findCarOpenRental(car_id: string): Promise<Rental>;
    findUserOpenRental(user_id: string): Promise<Rental>;
}

export { IRentalsRepository };
