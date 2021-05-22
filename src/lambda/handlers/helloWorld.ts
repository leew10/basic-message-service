import { APIGatewayProxyHandler } from "aws-lambda";

const response = {
    message: "Hello World!"
};

export const handler : APIGatewayProxyHandler = async () => {
    return {
        statusCode: 200,
        body: JSON.stringify(response)
    };
}