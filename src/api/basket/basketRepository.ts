import { PrismaClient } from "@prisma/client";
import { AddItemToBasketRequestDto } from "@/api/basket/dto/addItemToBasketDto";
import { BasketModel } from "@/api/basket/basketModel";
import { date } from "zod";

export class BasketRepository {
  async getBasket(basketId: string, userId: string, productId: string): Promise<BasketModel | null> {
    const client = new PrismaClient();
    await client.$connect();
    const basket = await client.baskets.findFirst({
      where: {
        BasketId: basketId,
        UserId: userId,
        ProductId: productId,
      },
    });
    await client.$disconnect();
    return basket;
  }
  async getBasketItems(basketId: string, userId: string): Promise<BasketModel[]> {
    const client = new PrismaClient();
    await client.$connect();
    const basket = await client.baskets.findMany({
      where: {
        BasketId: basketId,
        UserId: userId,
      },
    });
    await client.$disconnect();
    return basket;
  }
  async checkoutBasket(basketId: string, userId: string): Promise<void> {
    const client = new PrismaClient();
    await client.$connect();
    await client.baskets.updateMany({
      data: {
        IsCheckedOut: true,
      },
      where: {
        BasketId: basketId,
        UserId: userId,
      },
    });
    await client.$disconnect();
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
