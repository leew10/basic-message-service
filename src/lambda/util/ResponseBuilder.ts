import { APIGatewayProxyResult } from "aws-lambda";
import { RestError } from "../../errors/apiErrors";

export class ResponseBuilder {

    /**
     * Build a response for a successful API execution.
     * 
     * @param body The payload to be returned in the API response.
     * @returns A well formed API gateway response containing the provided body.
     */
    public static buildSuccessResponse = (body: unknown) : APIGatewayProxyResult => {
        return ResponseBuilder.buildResponse(200, JSON.stringify(body));
    }

    /**
     * Build a response for an unsuccessful API execution based on a thrown RestError.
     * 
     * @param error The RestError thrown by the service
     * @returns A well-formed API Gateway response representing the service error
     */
    public static buildErrorResponse = (error: RestError) : APIGatewayProxyResult => {
        const body = {
            message: error.message
        }
        return ResponseBuilder.buildResponse(error.status, JSON.stringify(body));
    }

    /**
     * Build a response with a given set of attributes.
     * 
     * @param statusCode The desired response status
     * @param body The desired response body
     * @returns A well formed API Gateway response containing the desired attributes
     */
    private static buildResponse = (statusCode: number, body: string) : APIGatewayProxyResult => {
        return {
            body,
            statusCode
        }
    }

}