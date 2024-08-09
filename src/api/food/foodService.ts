import {StatusCodes} from "http-status-codes";

import type {User} from "@/api/user/userModel";
import {ServiceResponse} from "@/common/models/serviceResponse";
import {logger} from "@/server";
import {FoodRepository} from "@/api/food/foodRepository";
import {FoodModel} from "@/api/food/foodModel";

export class FoodService {
    private foodRepository: FoodRepository;

    constructor(repository: FoodRepository = new FoodRepository()) {
        this.foodRepository = repository;
    }

    // Retrieves all users from the database
    async findAll(): Promise<ServiceResponse<FoodModel[] | null>> {
        try {
            const users = await this.foodRepository.findAllAsync();
            if (!users || users.length === 0) {
                return ServiceResponse.failure("No Users found", null, StatusCodes.NOT_FOUND);
            }
            return ServiceResponse.success<FoodModel[]>("Users found", users);
        } catch (ex) {
            const errorMessage = `Error finding all users: $${(ex as Error).message}`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while retrieving users.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
        }
    }

}

export const foodService = new FoodService();
