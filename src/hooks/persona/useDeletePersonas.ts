import { useState } from "react";
import { dunamisApi } from "../../datasources/dunamisApi.service";


export const useDeletePersonas = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deletePersona = async (idPersona: string): Promise<void> => {
    setLoading(true);
    try {
      await dunamisApi.delete(`/persona/${idPersona}`);
      setLoading(false);
    } catch (err) {
      setError("Error deleting persona");
      setLoading(false);
    }
  };

  return { deletePersona, loading, error };
};

