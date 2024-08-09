import { PrismaClient } from "@prisma/client";
import { AddItemToBasketRequestDto } from "@/api/basket/dto/addItemToBasketDto";
import { BasketModel } from "@/api/basket/basketModel";
import { date } from "zod";

export class BasketRepository {
  async findBasketById(basketId: string): Promise<BasketModel | null> {
    const client = new PrismaClient();
    await client.$connect();
    const basket = await client.baskets.findFirst({
      where: {
        BasketId: basketId,
      },
    });
    await client.$disconnect();
    return basket;
  }

  async newBasket(addItemToBasketDto: AddItemToBasketRequestDto): Promise<void> {
    const client = new PrismaClient();
    await client.$connect();
    await client.baskets.create({
      data: {
        BasketId: addItemToBasketDto["basket-id"],
        ProductId: addItemToBasketDto["product-id"],
        UserId: addItemToBasketDto["user-id"],
        IsCheckedOut: false,
      },
    });
    await client.$disconnect();
  }
}
