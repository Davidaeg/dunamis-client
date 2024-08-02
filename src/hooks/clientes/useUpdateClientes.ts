import { dunamisApi } from "../../datasources/dunamisApi.service";
import { DireccionDB } from "../../modules/personas/persona.types";

export const useUpdateDirecciones = () => {
  const updateDirecciones = async (idPersona: string, updatedDirecciones: DireccionDB): Promise<DireccionDB> => {
    try {
      const response = await dunamisApi.put<DireccionDB>(`/direccionPersona/${idPersona}`, updatedDirecciones);
      return response.data;
    } catch (error) {
      console.error("Error updating persona:", error);
      throw error;
    }
  };

  return { updateDirecciones };
};

