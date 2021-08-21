import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

// Classe com a responsabilidade única de criar uma categoria
class CreateCategoryUseCase {
    // Princípio de substituição de Liskov: utilizando a interface aqui, podemos passar qualquer classe que implementar essa interface, então ao criar uma categoria, não precisamos nos preocupar com como os dados são salvos, ou qual o tipo de banco de dados.

    // O private é usado para ter acesso ao this
    constructor(private categoriesRepository: ICategoriesRepository) {}

    // desestruturação do IRequest
    execute({ description, name }: IRequest): void {
        const categoryAlreadyExists =
            this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) throw new Error("Category already exists!");

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
