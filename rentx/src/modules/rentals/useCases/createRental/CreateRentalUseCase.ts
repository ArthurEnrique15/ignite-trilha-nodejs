import { inject } from "tsyringe";

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
    }: IRequest): Promise<void> {
        const carWithOpenRental =
            await this.rentalsRepository.findCarOpenRental(car_id);

        if (carWithOpenRental) throw new AppError("Car is not available");

        const userWithOpenRental =
            await this.rentalsRepository.findUserOpenRental(user_id);

        if (userWithOpenRental)
            throw new AppError(
                "There's already a rental in progress for this user"
            );
    }
}

export { CreateRentalUseCase };
