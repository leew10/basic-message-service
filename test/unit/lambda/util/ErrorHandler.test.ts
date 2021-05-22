import { BadRequestError, InternalServerError } from "../../../../src/errors/apiErrors";
import { ErrorHandler } from "../../../../src/lambda/util/ErrorHandler";

describe("ErrorHandler tests", () => {
    it("ErrorHandler returns result with 500 status code and matching message for InternalServerError", () => {
        const error = new InternalServerError("Test InternalServerError");
        const result = ErrorHandler.handleServiceError(error);

        expect(result.statusCode).toEqual(500);
        expect(JSON.parse(result.body)).toMatchObject({
            message: error.message
        });
    });

    it("ErrorHandler returns result with 400 status code and matching message for BadRequestError", () => {
        const error = new BadRequestError("Test BadRequestError");
        const result = ErrorHandler.handleServiceError(error);

        expect(result.statusCode).toEqual(400);
        expect(JSON.parse(result.body)).toMatchObject({
            message: error.message
        });
    });
    it("ErrorHandler returns result with 500 status code and matching message for general Error", () => {
        const error = new Error("Test Error");
        const result = ErrorHandler.handleServiceError(error);

        expect(result.statusCode).toEqual(500);
        expect(JSON.parse(result.body)).toMatchObject({
            message: error.message
        });
    });
    it("ErrorHandler returns result with 500 status code and serialized error message for unknown type", () => {
        const error = {}
        const result = ErrorHandler.handleServiceError(error);

        expect(result.statusCode).toEqual(500);
        expect(JSON.parse(result.body)).toMatchObject({
            message: `An unknown error ocurred: ${JSON.stringify(error)}`
        });
    });
});