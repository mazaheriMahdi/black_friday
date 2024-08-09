import type {Request, RequestHandler, Response} from "express";
import {handleServiceResponse} from "@/common/utils/httpHandlers";
import {productService} from "@/api/products/productService";

class ProductController {
    public getProduct: RequestHandler = async (_req: Request, res: Response) => {
        const serviceResponse = await productService.findByIdAsync(_req.params["id"]);
        return handleServiceResponse(serviceResponse, res);
    };

    public getCategories: RequestHandler = async (_req: Request, res: Response) => {
        const serviceResponse = await productService.getCategories();
        return handleServiceResponse(serviceResponse, res);
    };


    public getCategoryItems: RequestHandler = async (_req: Request, res: Response) => {
        const serviceResponse = await productService.getCategoryItems(_req.params["category"]);
        return handleServiceResponse(serviceResponse, res);
    };

}

export const productController = new ProductController();
