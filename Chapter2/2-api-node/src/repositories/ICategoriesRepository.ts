import { Category } from "../model/Category";

// DTO => Data transfer object
// Criar um objeto responsável por transferir os dados entre uma camada e outra
interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name: string): Category;
    list(): Category[];
    create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO };
