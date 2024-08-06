import { dunamisApi } from "../../datasources/dunamisApi.service";
import { UsuarioDTO } from "../../modules/personas/persona.types";

export const useUpdateUsuarios = () => {
  const updateUsuarios = async (idPersona: string, updatedUsuarios: UsuarioDTO): Promise<UsuarioDTO> => {
    try {
      const response = await dunamisApi.put<UsuarioDTO>(`/usuariosPersona/${idPersona}`, updatedUsuarios);
      return response.data;
    } catch (error) {
      console.error("Error updating persona:", error);
      throw error;
    }
  };

  return { updateUsuarios };
};

