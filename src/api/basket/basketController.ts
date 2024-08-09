import type { Request, RequestHandler, Response } from "express";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { productService } from "@/api/products/productService";
import { basketService } from "@/api/basket/basketService";
import { log } from "console";

class BasketController {
  public addItemToBasket: RequestHandler = async (_req: Request, res: Response) => {
    log(_req.body);
    const serviceResponse = await basketService.addItemToBasket(_req.body);
    return handleServiceResponse(serviceResponse, res);
  };

    public checkoutBasket: RequestHandler = async (_req: Request, res: Response) => {
      log(_req.body);
      const serviceResponse = await basketService.checkoutBasket(_req.body);
      return handleServiceResponse(serviceResponse, res);
  };
}

export const basketController = new BasketController();
