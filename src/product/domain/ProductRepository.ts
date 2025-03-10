import { Product } from "./Product";

export interface ProductRepository {
  create(product: Product): Promise<Product | null>;
  getAll(): Promise<Product[] | null>;
  getById(id: number): Promise<Product | null>;
  getByIdUser(id_user: number): Promise<Product[] | null>;
  update(
    id: number,
    cantidad: number
  ): Promise<{ producto: Product; tokens: string[] } | null>;
}
