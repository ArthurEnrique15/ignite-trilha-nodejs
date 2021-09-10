import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    // list(): Promise<User[]>;
    // findByName(name: string): Promise<User>;
}

export { IUsersRepository };
