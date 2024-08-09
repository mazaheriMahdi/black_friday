import {FoodModel} from "@/api/food/foodModel";

export const foods: FoodModel[] = [
    {
        id: 1,
        name: "Alice",

    },
    {
        id: 2,
        name: "Robert",
    },
];

export class FoodRepository {
    async findAllAsync(): Promise<FoodModel[]> {
        return foods;
    }

    async findByIdAsync(id: number): Promise<FoodModel | null> {
        return foods.find((user) => user.id === id) || null;
    }
}
