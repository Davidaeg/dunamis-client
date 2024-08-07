import { dunamisApi } from "../../datasources/dunamisApi.service";
import { AutomovilDB } from "../../modules/automovil/automovil.types";

export const useUpdateAutomovil = () => {
  const updateAutomovil = async (placa: string, updatedAutomovil: AutomovilDB): Promise<AutomovilDB> => {
    try {
      const response = await dunamisApi.put<AutomovilDB>(`/automovil/${placa}`, updatedAutomovil);
      return response.data;
    } catch (error) {
      console.error("Error updating automovil:", error);
      throw error;
    }
  };

  return { updateAutomovil };
};

