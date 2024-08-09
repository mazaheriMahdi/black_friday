import {extendZodWithOpenApi} from "@asteasolutions/zod-to-openapi";
import {z} from "zod";

extendZodWithOpenApi(z);

export type ProductModel = z.infer<typeof ProductSchema>;

export const ProductSchema = z.object({
    asin: z.string(),
    boughtInLastMonth: z.number().int(),
    categoryName: z.string(),
    imgUrl: z.string().url(),
    isBestSeller: z.boolean(),
    price: z.number().positive(),
    productUrl: z.string().url(),
    reviews: z.number().int().nonnegative(),
    stars: z.number().min(0).max(5),
    title: z.string(),
});

// Input Validation for 'GET items/:id' endpoint
export const GetProductSchema = z.object({
    params: z.object({id: z.string()}),
});

// Input Validation for 'GET categories/:category' endpoint
export const GetProductByCategorySchema = z.object({
    params: z.object({category: z.string()}),
});
