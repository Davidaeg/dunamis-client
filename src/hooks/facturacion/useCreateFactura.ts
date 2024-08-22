import { dunamisApi } from "../../datasources/dunamisApi.service";
import { FacturacionDB } from "../../modules/facturacion/factura.types";

export const useCreateFactura = () => {
  const createFactura = async (newFactura: FacturacionDB): Promise<FacturacionDB> => {
    try {
      const response = await dunamisApi.post<FacturacionDB>("/factura", newFactura);
      return response.data;
    } catch (error) {
      console.error("Error creating factura:", error);
      throw error;
    }
  };

  return { createFactura };
};
