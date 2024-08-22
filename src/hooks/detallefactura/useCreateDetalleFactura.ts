import { dunamisApi } from "../../datasources/dunamisApi.service";
import { DetalleFacturaDB } from "../../modules/facturacion/factura.types";

export const useCreateDetalleFactura = () => {
  const createDetalleFactura = async (newDetalleFactura: DetalleFacturaDB): Promise<DetalleFacturaDB> => {
    try {
      const response = await dunamisApi.post<DetalleFacturaDB>("/detalle-factura", newDetalleFactura);
      return response.data;
    } catch (error) {
      console.error("Error creating Detalle Factura:", error);
      throw error;
    }
  };

  return { createDetalleFactura };
};
