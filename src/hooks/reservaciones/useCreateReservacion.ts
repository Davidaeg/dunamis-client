import { dunamisApi } from "../../datasources/dunamisApi.service";
import { ReservasDB } from "../../modules/reservation/reservas.types";

export const useCreateReservacion = () => {
  const createReservacion = async (newReservacion: ReservasDB): Promise<ReservasDB> => {
    try {
      const response = await dunamisApi.post<ReservasDB>("/reservacion", newReservacion);
      return response.data;
    } catch (error) {
      console.error("Error creating reservacion:", error);
      throw error;
    }
  };

  return { createReservacion };
};
