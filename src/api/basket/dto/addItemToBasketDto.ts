import { z } from "zod";

export type AddItemToBasketRequestDto = z.infer<typeof AddItemToBasketDtoSchema>;

export const AddItemToBasketDtoSchema = z.object({
  "product-id": z.string(),
  "user-id": z.string(),
  "basket-id": z.string(),
});
