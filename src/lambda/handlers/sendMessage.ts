import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { BadRequestError } from "../../errors/apiErrors";
import { Message } from "../../service/Message";
import { MessageService } from "../../service/MessageService";
import { MockMessageService } from "../../service/MockMessageService";
import { ErrorHandler } from "../util/ErrorHandler";
import { ResponseBuilder } from "../util/ResponseBuilder";

type SendRequest = {
    recipient: string;
    sender: string;
    message: string;
};

let service : MessageService = new MockMessageService();

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

const isRequestValid = (request: { [key: string]: string | undefined }) : request is SendRequest => {
    return typeof request.recipient === 'string' 
            && typeof request.sender === 'string' 
            && typeof request.message === 'string';
}
