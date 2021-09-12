export class AppError {
    public readonly message: string;
    public readonly statusCode: number;

    // o statusCode default é 400
    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
