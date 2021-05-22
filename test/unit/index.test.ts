import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { handler } from "../../src/index";

it("Can invoke hello world", async () => {
    const result  = await handler({} as APIGatewayProxyEvent , {} as Context, () => {}) as APIGatewayProxyResult;
    expect(result).toBeTruthy();
    expect(result.statusCode).toEqual(200);
    const parsedBody : { message: string } = JSON.parse(result.body);
    expect(parsedBody.message).toEqual("Hello World!")
});