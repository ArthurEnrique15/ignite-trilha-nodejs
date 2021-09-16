import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Car test",
            description: "Description of the test car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand test",
            category_id: "Category test",
        });

        expect(car).toHaveProperty("id");
    });

    it("Should be able to create a car with property available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car test",
            description: "Description of the test car",
            daily_rate: 100,
            license_plate: "CBA-1234",
            fine_amount: 60,
            brand: "Brand test",
            category_id: "Category test",
        });

        expect(car.available).toBe(true);
    });

    it("Should not be able to create a new car with an existing license plate", async () => {
        await createCarUseCase.execute({
            name: "Car test 1",
            description: "Description of the test car",
            daily_rate: 100,
            license_plate: "ABCD-1234",
            fine_amount: 60,
            brand: "Brand test",
            category_id: "Category test",
        });

        await expect(
            createCarUseCase.execute({
                name: "Car test 2",
                description: "Description of the test car",
                daily_rate: 100,
                license_plate: "ABCD-1234",
                fine_amount: 60,
                brand: "Brand test",
                category_id: "Category test",
            })
        ).rejects.toEqual(new AppError("Car already exists"));
    });
});
