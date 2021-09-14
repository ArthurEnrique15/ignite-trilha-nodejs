import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}
    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const minimumRentalHours = 24;

        const carWithOpenRental =
            await this.rentalsRepository.findCarOpenRental(car_id);

        if (carWithOpenRental) throw new AppError("Car is not available");

        const userWithOpenRental =
            await this.rentalsRepository.findUserOpenRental(user_id);

        if (userWithOpenRental)
            throw new AppError(
                "There's already a rental in progress for this user"
            );

        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareInHours(
            dateNow,
            expected_return_date
        );

        if (compare < minimumRentalHours)
            throw new AppError("Invalid return time!");

        const rental = await this.rentalsRepository.create({
            car_id,
            user_id,
            expected_return_date,
        });

        return rental;
    }
}

export { CreateRentalUseCase };
