import { useState } from "react";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useDeleteDirecciones = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteDireccion = async (idPersona: string): Promise<boolean> => {
    setLoading(true);
    try {
      await dunamisApi.delete(`/direcciones/${idPersona}`);
      setLoading(false);
      return true;
    } catch (err) {
      setError("Error deleting direccion");
      setLoading(false);
      return false;
    }
  };

  return { deleteDireccion, loading, error };
};


