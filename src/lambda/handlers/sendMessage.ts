import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoMessageRepository } from "../../data/DynamoMessageRepository";
import { BadRequestError } from "../../errors/apiErrors";
import { Message } from "../../service/Message";
import { MessageService } from "../../service/MessageService";
import { ErrorHandler } from "../util/ErrorHandler";
import { ResponseBuilder } from "../util/ResponseBuilder";

type SendRequest = {
    recipient: string;
    sender: string;
    message: string;
};

let service : MessageService = new DynamoMessageRepository();

/**
 * Handle a request to retrieve a set of messages for a given user.
 * 
 * @param event An API Gateway event
 * @returns The sent message
 */
export const handler : APIGatewayProxyHandler = async (event : APIGatewayProxyEvent) => {
    let response : APIGatewayProxyResult;
    try {
        const message = extractRequest(event);
        await service.sendMessage(message);
        response = ResponseBuilder.buildSuccessResponse(message);
    } catch (error) {
        response = ErrorHandler.handleServiceError(error);
    }
    
    return response;
}

/**
 * Validate the incoming request and extract it as a Message object.
 * @param event The incoming API Gateway Request
 * @returns A well formed message object
 */
const  extractRequest = (event: APIGatewayProxyEvent) : Message => {
    const parsedBody = event.body ? JSON.parse(event.body) : {};

    const request = {
        recipient: event.pathParameters?.recipient,
        ...parsedBody
    };

    if (isRequestValid(request)) {
        return new Message(request.message, request.sender, request.recipient);
    }else{
        throw new BadRequestError('Missing Required Field(s). Please confirm you provided the following fields: recipient, sender, message');
    }
}

/**
 * Validate the set of parameteers required by the send request.
 * 
 * @param request The incoming request
 * @returns Confirms the parameters match the incoming type definition
 */
const isRequestValid = (request: { [key: string]: string | undefined }) : request is SendRequest => {
    return typeof request.recipient === 'string' 
            && typeof request.sender === 'string' 
            && typeof request.message === 'string';
}
