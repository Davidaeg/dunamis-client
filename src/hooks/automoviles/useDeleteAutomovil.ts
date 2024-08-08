import { useState } from "react";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useDeleteAutomovil = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteAutomovil = async (placa: string): Promise<{ success: boolean; error: string | null }> => {
    setLoading(true);
    try {
      await dunamisApi.delete(`/automovil/${placa}`);
      setLoading(false);
      return { success: true, error: null };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "No se puede eliminar el automóvil porque tiene reservas asociadas";
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  return { deleteAutomovil, loading };
};



