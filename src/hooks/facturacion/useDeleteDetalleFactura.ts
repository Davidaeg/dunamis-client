import { useState } from "react";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useDeleteDetalleFactura = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteDetalleFactura = async (idDetalleFactura: string): Promise<{ success: boolean; error: string | null }> => {
    setLoading(true);
    try {
      await dunamisApi.delete(`/detalle-factura/${idDetalleFactura}`);
      setLoading(false);
      return { success: true, error: null };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "No se puede eliminar la factura";
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  return { deleteDetalleFactura, loading};
};


