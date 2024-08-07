import { useState } from "react";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useDeleteAutomovil = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteAutomovil = async (placa: string): Promise<boolean> => {
    setLoading(true);
    try {
      await dunamisApi.delete(`/automovil/${placa}`);
      setLoading(false);
      return true;
    } catch (err) {
      setError("Error deleting automovil");
      setLoading(false);
      return false;
    }
  };

  return { deleteAutomovil, loading, error };
};


