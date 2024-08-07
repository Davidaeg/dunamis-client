import { dunamisApi } from "../../datasources/dunamisApi.service";
import { AutomovilDB } from "../../modules/automovil/automovil.types";

export const useCreateAutomovil = () => {
  const createAutomovil = async (newAutomovil: AutomovilDB): Promise<AutomovilDB> => {
    try {
      const response = await dunamisApi.post<AutomovilDB>("/automovil", newAutomovil);
      return response.data;
    } catch (error) {
      console.error("Error creating automovil:", error);
      throw error;
    }
  };

  return { createAutomovil };
};
