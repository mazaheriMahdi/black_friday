import { StatusCodes } from "http-status-codes";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { BasketRepository } from "@/api/basket/basketRepository";
import { AddItemToBasketRequestDto } from "@/api/basket/dto/addItemToBasketDto";
import { ProductRepository } from "@/api/products/productRepository";
import { log } from "console";

export class BasketService {
  private basketRepository: BasketRepository;
  private productRepository: ProductRepository;

  constructor(
    repository: BasketRepository = new BasketRepository(),
    productRepository: ProductRepository = new ProductRepository()
  ) {
    this.basketRepository = repository;
    this.productRepository = productRepository;
  }

  async addItemToBasket(
    addToBasketDto: AddItemToBasketRequestDto
  ): Promise<ServiceResponse<undefined | string | null>> {
    try {
      const product = await this.productRepository.findByIdAsync(addToBasketDto["product-id"]);
      if (!product) {
        return ServiceResponse.failure(
          `Item With Id ${addToBasketDto["basket-id"]} Not found!`,
          StatusCodes.BAD_REQUEST
        );
      }

      const basket = await this.basketRepository.findBasketById(addToBasketDto["basket-id"]);
      log(addToBasketDto);
      log(basket);
      if (basket?.ProductId == addToBasketDto["product-id"] && basket?.UserId == addToBasketDto["user-id"]) {
        return ServiceResponse.failure("Basket With Given Product Already Exists", StatusCodes.BAD_REQUEST);
      }

      const productCount = await this.productRepository.getProductCount(addToBasketDto["product-id"]);
      if (productCount == 0) {
        return ServiceResponse.failure("not enough items", StatusCodes.PRECONDITION_FAILED);
      }

      await this.basketRepository.newBasket(addToBasketDto);

      return ServiceResponse.success<string>("done");
    } catch (ex) {
      const errorMessage = `Error while trying to find categories:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("Internal server error", StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export const basketService = new BasketService();
