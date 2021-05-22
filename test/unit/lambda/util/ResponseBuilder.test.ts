import { RestError } from "../../../../src/errors/apiErrors";
import { ResponseBuilder } from "../../../../src/lambda/util/ResponseBuilder";

describe("ResponseBuilder tests", () => {
    it("buildSuccessResponse creates a response with the provided body and a 200 status", () => {
        const body = {
            name: "Jon",
            message: "This is a test"
        };

        const result = ResponseBuilder.buildSuccessResponse(body);

        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.body)).toEqual(body);
    });

    it("buildErrorResponse creates a response with the error message and appropriate status", () => {
        const error = new RestError(401, "Unauthorized");

        const result = ResponseBuilder.buildErrorResponse(error);

        expect(result.statusCode).toEqual(401);
        expect(JSON.parse(result.body)).toEqual({
            message: error.message
        });
    });
});