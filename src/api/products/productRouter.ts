import {OpenAPIRegistry} from "@asteasolutions/zod-to-openapi";
import express, {Router} from "express";
import {createApiResponse} from "@/api-docs/openAPIResponseBuilders";
import {validateRequest} from "@/common/utils/httpHandlers";
import {z} from "zod";
import {productController} from "@/api/products/productController";
import {GetProductByCategorySchema, GetProductSchema, ProductSchema} from "@/api/products/productModel";

export const productRegistry = new OpenAPIRegistry();
export const categoryRegistry = new OpenAPIRegistry();

export const productRouter: Router = express.Router();
export const categoryRouter: Router = express.Router();

productRegistry.register("Items", ProductSchema);

productRegistry.registerPath({
    method: "get",
    path: "/items/{id}",
    request: {
        params: GetProductSchema.shape.params
    },
    tags: ["Products"],
    responses: createApiResponse(z.array(ProductSchema), "Success"),
});

productRegistry.registerPath({
    method: "get",
    path: "/categories/{category}",
    request: {
        params: GetProductByCategorySchema.shape.params
    },
    tags: ["Products"],
    responses: createApiResponse(z.array(ProductSchema), "Success"),
});

categoryRegistry.registerPath({
    method: "get",
    path: "/categories",
    tags: ["Categories"],
    responses: createApiResponse(z.array(z.string()), "Success")
})

productRouter.get("/:id", validateRequest(GetProductSchema), productController.getProduct);
categoryRouter.get("/", productController.getCategories);
categoryRouter.get("/:category", productController.getCategoryItems);

