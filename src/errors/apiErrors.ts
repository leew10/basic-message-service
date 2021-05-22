export class RestError {
    constructor(public status: number, public message: string){}
}

export class BadRequestError extends RestError {
    constructor(message: string){
        super(400, message);
    }
}

export class InternalServerError extends RestError {
    constructor(message: string){
        super(500, message);
    }
}