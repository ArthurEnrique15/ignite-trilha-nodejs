import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
// import { User } from "../entities/User";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    // list(): Promise<User[]>;
    // findByName(name: string): Promise<User>;
}

export { IUsersRepository };
