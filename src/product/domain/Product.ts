export class Product {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly costo: number,
    readonly cantidad: number,
    readonly url_imagen: string
  ) {}
}
