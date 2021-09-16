import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        dayjsDateProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            carsRepositoryInMemory,
            dayjsDateProvider
        );
    });

    it("Should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car test",
            description: "description car test",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 50,
            brand: "Brand test",
            category_id: "1",
        });

        const rental = await createRentalUseCase.execute({
            user_id: "1",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should be able to update the 'available' property of the car when creating a rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car test",
            description: "description car test",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 50,
            brand: "Brand test",
            category_id: "1",
        });

        await createRentalUseCase.execute({
            user_id: "1",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        expect(car.available).toBe(false);
    });

    it("Should not be able to create a new rental to a user that already have an open rental", async () => {
        await rentalsRepositoryInMemory.create({
            user_id: "1",
            car_id: "1",
            expected_return_date: dayAdd24Hours,
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "1",
                car_id: "2",
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(
            new AppError("There's already a rental in progress for this user")
        );
    });

    it("Should not be able to create a new rental to a car that is not available", async () => {
        await rentalsRepositoryInMemory.create({
            user_id: "1",
            car_id: "1",
            expected_return_date: dayAdd24Hours,
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "2",
                car_id: "1",
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppError("Car is not available"));
    });

    it("Should not be able to create a new rental with invalid return time", async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: "1",
                car_id: "1",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppError("Invalid return time!"));
    });
});
