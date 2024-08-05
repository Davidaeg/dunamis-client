import { dunamisApi } from "../../datasources/dunamisApi.service";
import { UsuariosDB } from "../../modules/personas/persona.types";

export const useUpdateUsuarios = () => {
  const updateUsuarios = async (idPersona: string, updatedUsuarios: UsuariosDB): Promise<UsuariosDB> => {
    try {
      const response = await dunamisApi.put<UsuariosDB>(`/usuariosPersona/${idPersona}`, updatedUsuarios);
      return response.data;
    } catch (error) {
      console.error("Error updating persona:", error);
      throw error;
    }
  };

  return { updateUsuarios };
};

