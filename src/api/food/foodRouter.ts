import {OpenAPIRegistry} from "@asteasolutions/zod-to-openapi";
import express, {Router} from "express";
import {FoodSchema, GetFoodSchema} from "@/api/food/foodModel";
import {createApiResponse} from "@/api-docs/openAPIResponseBuilders";
import {validateRequest} from "@/common/utils/httpHandlers";
import {foodController} from "@/api/food/foodController";
import {z} from "zod";

export const foodRegistary = new OpenAPIRegistry();
export const foodRouter: Router = express.Router();

foodRegistary.register("Food", FoodSchema);

foodRegistary.registerPath({
    method: "get",
    path: "/foods",
    tags: ["Food"],
    responses: createApiResponse(z.array(FoodSchema), "Success"),
});

foodRouter.get("/", foodController.getFoods);

// foodRegistary.registerPath({
//     method: "get",
//     path: "/foods/{id}",
//     tags: ["User"],
//     request: {params: GetFoodSchema.shape.params},
//     responses: createApiResponse(FoodSchema, "Success"),
// });

foodRouter.get("/:id", validateRequest(GetFoodSchema), foodController.getFoods);
