import { inject } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entitites/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

// @injectable()
class CreateRentalUseCase {
    constructor(
        // @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ) {}
    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const carWithOpenRental =
            await this.rentalsRepository.findCarOpenRental(car_id);

        if (carWithOpenRental) throw new AppError("Car is not available");

        const userWithOpenRental =
            await this.rentalsRepository.findUserOpenRental(user_id);

        if (userWithOpenRental)
            throw new AppError(
                "There's already a rental in progress for this user"
            );

        const rental = await this.rentalsRepository.create({
            car_id,
            user_id,
            expected_return_date,
        });

        return rental;
    }
}

export { CreateRentalUseCase };
