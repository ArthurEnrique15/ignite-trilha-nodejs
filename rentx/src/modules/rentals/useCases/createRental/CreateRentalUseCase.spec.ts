import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory
        );
    });

    it("Should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "1",
            car_id: "1",
            expected_return_date: new Date(),
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental to a user that already have an open rental", () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "1",
                car_id: "1",
                expected_return_date: new Date(),
            });

            await createRentalUseCase.execute({
                user_id: "1",
                car_id: "2",
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new rental to a car that in not available", () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "1",
                car_id: "1",
                expected_return_date: new Date(),
            });

            await createRentalUseCase.execute({
                user_id: "2",
                car_id: "1",
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
