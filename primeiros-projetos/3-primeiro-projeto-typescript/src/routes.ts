import { Request, Response } from 'express';
import CreateCourseService from './CreateCourseService';

// como o ts precisa da tipagem, é necessário definir os tipos do request e response
export function createCourse(request: Request, response: Response) {
    CreateCourseService.execute({
        name: "NodeJS",
        duration: 10,
        educator: "Arthur"
    });

    return response.send();
}