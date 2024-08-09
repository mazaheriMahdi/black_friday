import type {Request, RequestHandler, Response} from "express";
import {foodService} from "@/api/food/foodService";
import {handleServiceResponse} from "@/common/utils/httpHandlers";

class FoodController {
    public getFoods: RequestHandler = async (_req: Request, res: Response) => {
        const serviceResponse = await foodService.findAll();
        return handleServiceResponse(serviceResponse, res);
    };
}

export const foodController = new FoodController();
