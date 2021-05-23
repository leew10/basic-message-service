import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { DynamoMessageRepository } from "../../data/DynamoMessageRepository";
import { BadRequestError } from "../../errors/apiErrors";
import { MessageService } from "../../service/MessageService";
import { ErrorHandler } from "../util/ErrorHandler";
import { ResponseBuilder } from "../util/ResponseBuilder";

type RetrieveRequest = {
    recipient: string;
    sender?: string;
}

let service : MessageService = new DynamoMessageRepository();

/**
 * Handle a request to retrieve a set of messages for a given user.
 * 
 * @param event An API Gateway event
 * @returns The list of messages that match the criteria
 */
export const handler : APIGatewayProxyHandler = async (event : APIGatewayProxyEvent) => {
    let response : APIGatewayProxyResult;
    try {
        const request = extractRequest(event);
        const result = await service.getMessages(request.recipient, request.sender);
        response = ResponseBuilder.buildSuccessResponse(result);
    } catch (error) {
        response = ErrorHandler.handleServiceError(error);
    }
    
    return response;
}

/**
 * Validate the incoming request and extract the parameters into a formatted type.
 * 
 * @param event The incomming API Gateway request
 * @returns A RetrieveRequest object containing the request parameters
 */
const  extractRequest = (event: APIGatewayProxyEvent) : RetrieveRequest => {
    const request = {
        recipient: event.pathParameters?.recipient,
        sender: event.queryStringParameters?.sender
    };

    if (isRequestValid(request)) {
        return request;
    }else{
        throw new BadRequestError('Missing Required Field: recipient');
    }
    
}

/**
 * Validate a set of parameters for the retrieve messages request.
 * 
 * @param request The parameters extracted from the API Gateway event
 * @returns Confirms the parameters match the expected type definition
 */
const isRequestValid = (request: { [key: string]: string | undefined }) : request is RetrieveRequest => {
    return typeof request.recipient === 'string';
}


