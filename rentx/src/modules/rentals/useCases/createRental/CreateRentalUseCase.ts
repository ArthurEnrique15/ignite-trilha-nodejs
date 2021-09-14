import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entitites/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

dayjs.extend(utc);

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

        const expectedReturnDateFormat = dayjs(expected_return_date)
            .utc()
            .local()
            .format();

        const dateNow = dayjs().utc().local().format();

        const compare = dayjs(expectedReturnDateFormat).diff(dateNow, "hours");

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
