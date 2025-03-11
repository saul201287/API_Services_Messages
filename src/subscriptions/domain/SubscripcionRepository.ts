import { Subscripcion } from "./Subscription";

export interface SubscripcionRepository {
  subscripcion(subscripcion: Subscripcion): Promise<Subscripcion | null>;
  desubscripcion(id: number, id_user: number): Promise<Boolean>;
  getByUser(id_user: number): Promise<{tokens:string[], subscripcions:Subscripcion[] }| null>;
  updateEstado(id:number, estado:string):Promise<Boolean>
}
