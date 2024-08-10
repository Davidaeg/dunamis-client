import { useState } from "react";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useDeleteSegmentos = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteSegmento = async (idSegmento: string): Promise<{ success: boolean; error: string | null }> => {
    setLoading(true);
    try {
      await dunamisApi.delete(`/segmento/${idSegmento}`);
      setLoading(false);
      return { success: true, error: null };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "No se puede eliminar el segmento porque tiene automoviles asociados";
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  return { deleteSegmento, loading};
};


