import { useState } from "react";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useDeleteReservacion = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteReservacion = async (idReservacion: string): Promise<{ success: boolean; error: string | null }> => {
    setLoading(true);
    try {
      await dunamisApi.delete(`/reservacion/${idReservacion}`);
      setLoading(false);
      return { success: true, error: null };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "No se puede eliminar la reserva";
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  return { deleteReservacion, loading};
};


