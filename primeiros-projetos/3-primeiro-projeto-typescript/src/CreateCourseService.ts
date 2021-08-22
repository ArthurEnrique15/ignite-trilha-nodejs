/**
 * Informações para a criação do curso
 * name - string
 * duration - number
 * educator - string
 */

// interface com as informações necessárias para a criação do curso
// o ?: define o atributo como opcional
interface Course {
    name: string;
    duration?: number;
    educator: string;
}

// serviço para criação de um curso, a função recebe alguns dados para criar o curso
class CreateCourseService {
    /*
    recebendo os dados dessa forma, eles sempre precisariam estar na mesma ordem
    execute(name: string, duration: number, educator: string) {
        console.log(name, duration, educator);
    }
    */

    // já dessa forma, fazendo a desestruturação do Course, não importa a ordem dos dados
    // pois ele recebe um course, e não 3 parâmetros separados
    // a atribuição na duration é para um valor default, caso o atributo não seja recebido
    execute({ duration = 8, educator, name }: Course) {
        console.log(name, duration, educator);
    }
}

export default new CreateCourseService();