import { PrismaClient } from "@prisma/client";

export class InvoicesRepository {
  async createInvoices(basketId: string, userId: string, items: string): Promise<void> {
    const client = new PrismaClient();
    await client.$connect();
    await client.invoices.create({
      data: {
        BasketId: basketId,
        Items: items,
        UserId: userId,
      },
    });
    await client.$disconnect();
  }
}
