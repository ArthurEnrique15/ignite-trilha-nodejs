import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICreateCarDTO } from "../dtos/ICreateCarDTO";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    listAvailableCars(
        category_id?: string,
        brand?: string,
        name?: string
    ): Promise<Car[]>;
    findById(id: string): Promise<Car>;
}

export { ICarsRepository };
