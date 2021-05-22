import { APIGatewayProxyResult } from "aws-lambda";
import { InternalServerError, RestError } from "../../errors/apiErrors";
import { ResponseBuilder } from "./ResponseBuilder";

export class ErrorHandler {
    /**
     * Handle errors thrown by the service and construct an appropriate API Gateway response.
     * @param error The thrown error
     * @returns A well-formed API Gateway response representing the error.
     */
    public static handleServiceError = (error: unknown): APIGatewayProxyResult => {
        let response: APIGatewayProxyResult;

        if (error instanceof RestError) {
            response = ResponseBuilder.buildErrorResponse(error);
        } else if (error instanceof Error) {
            response = ResponseBuilder.buildErrorResponse(new InternalServerError(error.message));
        } else {
            response = ResponseBuilder.buildErrorResponse(new InternalServerError(`An unknown error ocurred: ${JSON.stringify(error)}`));
        }

        return response;
    }
}