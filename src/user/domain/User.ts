export class User {
  constructor(
    readonly id: string,
    readonly nombre: string,
    readonly apellidos: string,
    readonly email: string,
    readonly password: string,
    readonly tipo_user: string,
    readonly id_divece:string
  ) {}
}
