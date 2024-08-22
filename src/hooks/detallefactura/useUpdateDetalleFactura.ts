import { dunamisApi } from "../../datasources/dunamisApi.service";
import { DetalleFacturaDB } from "../../modules/facturacion/factura.types";

export const useUpdateDetalleFactura = () => {
  const updateDetalleFactura = async (idDetalleFactura: string, updatedDetalleFactura: DetalleFacturaDB): Promise<DetalleFacturaDB> => {
    try {
      const response = await dunamisApi.put<DetalleFacturaDB>(`/detalle-factura/${idDetalleFactura}`, updatedDetalleFactura);
      return response.data;
    } catch (error) {
      console.error("Error updating detalle factura:", error);
      throw error;
    }
  };

  return { updateDetalleFactura };
};

