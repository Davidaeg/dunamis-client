import { useState } from "react";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useDeleteSegmentos = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteSegmento = async (idSegmento: string): Promise<boolean> => {
    setLoading(true);
    try {
      await dunamisApi.delete(`/segmento/${idSegmento}`);
      setLoading(false);
      return true;
    } catch (err) {
      setError("Error deleting persona");
      setLoading(false);
      return false;
    }
  };

  return { deleteSegmento, loading, error };
};


