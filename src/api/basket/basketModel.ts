import { z } from "zod";

export type BasketModel = z.infer<typeof AddItemToBasketSchema>;
// Input Validation for 'GET items/:id' endpoint
export const AddItemToBasketSchema = z.object({
  BasketId: z.string(),
  ProductId: z.string(),
  UserId: z.string(),
  IsCheckedOut: z.boolean(),
});
