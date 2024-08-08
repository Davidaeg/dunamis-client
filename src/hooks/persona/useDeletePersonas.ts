import { useState } from "react";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useDeletePersonas = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deletePersona = async (idPersona: string): Promise<{ success: boolean; error: string | null }> => {
    setLoading(true);
    try {
      await dunamisApi.delete(`/persona/${idPersona}`);
      setLoading(false);
      return { success: true, error: null };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "No se puede eliminar la persona porque tiene reservas asociadas";
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  return { deletePersona, loading};
};


