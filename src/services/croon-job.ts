import cron from "node-cron";
import admin from "./faribase";
import { GetByUserUseCase } from "../subscriptions/app/GetByUserUseCase";
import { UpdateEstadoUseCase } from "../subscriptions/app/UpdateEstadoUseCase";
import { Subscripcion } from "../subscriptions/domain/Subscription";

export class ServicesCroonJob {
  constructor(
    private readonly getDatas: GetByUserUseCase,
    readonly updateEstado: UpdateEstadoUseCase
  ) {}

  async run() {
    console.log("🚀 Servicio de Cron Job iniciado...");

    cron.schedule("*/1 * * * *", async () => {
      console.log("⏳ Ejecutando actualización de estados de envío...");

      try {
        const pendingShipments = await this.getDatas.run(1);
        console.log(pendingShipments);
        
        if (
          !pendingShipments?.subscripcions ||
          !pendingShipments.tokens?.length
        ) {
          console.log("⚠️ No hay envíos pendientes para actualizar.");
          return;
        }
        for (let i = 0; i < pendingShipments.tokens.length; i++) {
          const newStatus = await this.updateShippingStatus(
            pendingShipments.subscripcions[i]
          );
          console.log(
            `📦 Envío ${pendingShipments.subscripcions[i].id} actualizado a: ${newStatus}`
          );
          if (newStatus) {
            await this.sendNotification(pendingShipments.tokens[i], newStatus);
          }
        }
        console.log("✅ Tarea programada finalizada.");
      } catch (error) {
        console.error("❌ Error en la tarea programada:", error);
      }
    });
  }

  
  private async updateShippingStatus(
    sub: Subscripcion
  ): Promise<string | null> {
    const statusOptions = ["Pendiente"];
    const estado = sub.estado == "Pendiente" ? "En tránsito" : "Entregado";
    const status = await this.updateEstado.run(sub.id, estado);
    if (status) {
      return estado;
    }
    return null;
  }


  private async sendNotification(token: string, status: string) {
    const message = {
      notification: {
        title: "Actualización de Envío",
        body: `Tu pedido ahora está en estado: ${status}`,
      },
      token: token,
    };

    try {
      await admin.messaging().send(message);
      console.log(`📩 Notificación enviada al token: ${token}`);
    } catch (error) {
      console.error("❌ Error al enviar la notificación:", error);
    }
  }
}
