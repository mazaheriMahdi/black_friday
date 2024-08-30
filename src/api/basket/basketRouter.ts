import {OpenAPIRegistry} from "@asteasolutions/zod-to-openapi";
import express, {Router} from "express";
import {createApiResponse} from "@/api-docs/openAPIResponseBuilders";
import {z} from "zod";
import {basketController} from "./basketController";
import {AddItemToBasketDtoSchema} from "./dto/addItemToBasketDto";
import {CheckoutBasketDtoSchema} from "./dto/checkoutBasketDto";

export const basketRegistry = new OpenAPIRegistry();

export const basketRouter: Router = express.Router();

basketRegistry.registerPath({
    method: "post",
    path: "/add-item-to-basket",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: AddItemToBasketDtoSchema,
                },
            },
        },
    },
    tags: ["Basket"],
    responses: createApiResponse(z.string(), "Success"),
});

basketRegistry.registerPath({
    method: "post",
    path: "/checkout-basket",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: CheckoutBasketDtoSchema,
                },
            },
        },
    },
    tags: ["Basket"],
    responses: createApiResponse(z.string(), "Success"),
});

basketRouter.post("/add-item-to-basket", basketController.addItemToBasket);
basketRouter.post("/checkout-basket", basketController.checkoutBasket);
