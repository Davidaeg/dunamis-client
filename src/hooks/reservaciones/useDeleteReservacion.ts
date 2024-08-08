import { useState } from "react";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useDeleteReservacion = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteReservacion = async (idReservacion: string): Promise<boolean> => {
    setLoading(true);
    try {
      await dunamisApi.delete(`/reservacion/${idReservacion}`);
      setLoading(false);
      return true;
    } catch (err) {
      setError("Error deleting reservacion");
      setLoading(false);
      return false;
    }
  };

  return { deleteReservacion, loading, error };
};


