import {StatusCodes} from "http-status-codes";
import {z} from "zod";

export class ServiceResponse<T = null> {
    readonly responseObject: T;
    readonly statusCode: number;

    private constructor(responseObject: T, statusCode: number) {
        this.responseObject = responseObject;
        this.statusCode = statusCode;
    }

    static success<T>(responseObject: T, statusCode: number = StatusCodes.OK) {
        return new ServiceResponse(responseObject, statusCode);
    }

    static failure<T>(responseObject: T, statusCode: number = StatusCodes.BAD_REQUEST) {
        return new ServiceResponse(responseObject, statusCode);
    }
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => dataSchema.optional();

