import { dunamisApi } from "../../datasources/dunamisApi.service";
import { UsuariosDB } from "../../modules/personas/persona.types";

export const useCreateUsuario = () => {
  const createUsuario = async (newUsuario: UsuariosDB): Promise<UsuariosDB> => {
    try {
      const response = await dunamisApi.post<UsuariosDB>("/user", newUsuario);
      return response.data;
    } catch (error) {
      console.error("Error creating Usuario:", error);
      throw error;
    }
  };

  return { createUsuario };
};
