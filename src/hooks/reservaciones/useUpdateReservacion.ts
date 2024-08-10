import { dunamisApi } from "../../datasources/dunamisApi.service";
import { ReservasDB } from "../../modules/reservation/reservas.types";

export const useUpdateReservacion = () => {
  const updateReservacion = async (idReservacion: string, updatedReserva: ReservasDB): Promise<ReservasDB> => {
    try {
      const response = await dunamisApi.put<ReservasDB>(`/reservacion/${idReservacion}`, updatedReserva);
      return response.data;
    } catch (error) {
      console.error("Error updating reserva:", error);
      throw error;
    }
  };

  return { updateReservacion };
};

