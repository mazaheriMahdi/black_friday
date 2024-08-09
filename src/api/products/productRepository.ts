import { ProductModel } from "@/api/products/productModel";
import { PrismaClient } from "@prisma/client";

export class ProductRepository {
  async findByIdAsync(asin: string): Promise<ProductModel | null> {
    const client = new PrismaClient();
    await client.$connect();
    const product = await client.products.findFirst({
      where: {
        asin: asin,
      },
    });
    await client.$disconnect();
    return product;
  }

  async filterByCategoryAsync(categoryName: string): Promise<ProductModel[] | null> {
    const client = new PrismaClient();
    await client.$connect();
    const product = await client.products.findMany({
      where: {
        categoryName: categoryName,
      },
    });
    await client.$disconnect();
    return product;
  }

  async findCategoriesAsync(): Promise<string[] | null> {
    const client = new PrismaClient();
    await client.$connect();
    const product = await client.products.groupBy({ by: "categoryName" });
    await client.$disconnect();
    return (product as { categoryName: string }[]).map((x) => x.categoryName);
  }

  async getProductCount(asin: string): Promise<number> {
    const client = new PrismaClient();
    await client.$connect();
    const productCount = await client.productCounts.findFirst({
      where: {
        Asin: asin,
      },
    });
    await client.$disconnect();
    return productCount?.Count as number;
  }
}
