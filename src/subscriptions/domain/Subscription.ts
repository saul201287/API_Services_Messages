export class Subscripcion {
  constructor(
    readonly id: number,
    readonly topic: string,
    readonly tipo: string,
    readonly status: boolean,
    readonly estado:string,
    readonly id_user: number,
    readonly id_product: number
  ) {}
}
