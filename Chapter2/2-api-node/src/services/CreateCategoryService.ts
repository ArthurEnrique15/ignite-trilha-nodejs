import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

// Classe com a responsabilidade única de criar uma categoria
class CreateCategoryService {
    // Princípio de substituição de Liskov: utilizando a interface aqui, podemos passar qualquer classe que implementar essa interface, então ao criar uma categoria, não precisamos nos preocupar com como os dados são salvos, ou qual o tipo de banco de dados.
    constructor(private categoriesRepository: ICategoriesRepository) {}

    execute({ description, name }: IRequest): void {
        const categoryAlreadyExists =
            this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) throw new Error("Category already exists!");

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryService };
