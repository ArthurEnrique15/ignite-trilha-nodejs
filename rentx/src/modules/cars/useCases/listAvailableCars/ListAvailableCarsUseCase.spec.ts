import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List available cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });

    it("Should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car test",
            description: "Description of the car test",
            daily_rate: 1000,
            license_plate: "ABC-1234",
            fine_amount: 1500,
            brand: "Brand test",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car test",
            description: "Description of the car test",
            daily_rate: 1000,
            license_plate: "ABC-1234",
            fine_amount: 1500,
            brand: "Brand test",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car test",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car test",
            description: "Description of the car test",
            daily_rate: 1000,
            license_plate: "ABC-1234",
            fine_amount: 1500,
            brand: "Brand test",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Brand test",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car test",
            description: "Description of the car test",
            daily_rate: 1000,
            license_plate: "ABC-1234",
            fine_amount: 1500,
            brand: "Brand test",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "category_id",
        });

        expect(cars).toEqual([car]);
    });
});
