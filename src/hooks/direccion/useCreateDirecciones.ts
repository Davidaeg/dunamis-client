import { dunamisApi } from "../../datasources/dunamisApi.service";
import { DireccionDB } from "../../modules/personas/persona.types";

export const useCreateDirecciones = () => {
  const createDireccion = async (newDireccion: DireccionDB): Promise<DireccionDB> => {
    try {
      const response = await dunamisApi.post<DireccionDB>("/direccion", newDireccion);
      return response.data;
    } catch (error) {
      console.error("Error creating direccion:", error);
      throw error;
    }
  };

  return { createDireccion };
};
