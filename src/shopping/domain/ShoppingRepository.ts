import { Shopping } from "./Shopping";

export interface ShoppingRepository{
    create(shopping:Shopping):Promise<Shopping | null>
}