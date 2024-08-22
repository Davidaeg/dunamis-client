import { useState } from "react";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useDeleteFactura = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteFactura = async (idFactura: string): Promise<{ success: boolean; error: string | null }> => {
    setLoading(true);
    try {
      await dunamisApi.delete(`/factura/${idFactura}`);
      setLoading(false);
      return { success: true, error: null };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "No se puede eliminar la factura";
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  return { deleteFactura, loading};
};


