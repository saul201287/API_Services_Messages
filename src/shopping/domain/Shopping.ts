export class Shopping {
  constructor(
    readonly id: number,
    readonly total: number,
    readonly cantidad: number,
    readonly status: string,
    readonly id_user: number,
    readonly id_product: number
  ) {}
}
