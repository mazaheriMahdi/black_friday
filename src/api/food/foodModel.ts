import {extendZodWithOpenApi} from "@asteasolutions/zod-to-openapi";
import {z} from "zod";

import {commonValidations} from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type FoodModel = z.infer<typeof FoodSchema>;
export const FoodSchema = z.object({
    id: z.number(),
    name: z.string(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetFoodSchema = z.object({
    params: z.object({id: commonValidations.id}),
});
