import { useState } from "react";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useDeletePersonas = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deletePersona = async (idPersona: string): Promise<boolean> => {
    setLoading(true);
    try {
      await dunamisApi.delete(`/persona/${idPersona}`);
      setLoading(false);
      return true;
    } catch (err) {
      setError("Error deleting persona");
      setLoading(false);
      return false;
    }
  };

  return { deletePersona, loading, error };
};


