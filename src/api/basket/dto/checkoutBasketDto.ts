import { z } from "zod";

export type CheckoutBasketDto = z.infer<typeof CheckoutBasketDtoSchema>;

export const CheckoutBasketDtoSchema = z.object({
  "basket-id": z.string(),
  "user-id": z.string(),
});
