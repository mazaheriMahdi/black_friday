import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { Router } from "express";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";
import { z } from "zod";
import { productController } from "@/api/products/productController";
import { GetProductByCategorySchema, GetProductSchema, ProductSchema } from "@/api/products/productModel";
import { basketController } from "./basketController";
import { AddItemToBasketSchema } from "./basketModel";
import { AddItemToBasketDtoSchema } from "./dto/addItemToBasketDto";

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

basketRouter.post("/add-item-to-basket", basketController.addItemToBasket);
