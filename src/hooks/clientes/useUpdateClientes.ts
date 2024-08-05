import { dunamisApi } from "../../datasources/dunamisApi.service";
import { ClientesDB } from "../../modules/personas/persona.types";

export const useUpdateClientes = () => {
  const updateClientes = async (idPersona: string, updatedClientes: ClientesDB): Promise<ClientesDB> => {
    try {
      const response = await dunamisApi.put<ClientesDB>(`/ClientePorPersona/${idPersona}`, updatedClientes);
      return response.data;
    } catch (error) {
      console.error("Error updating cliente:", error);
      throw error;
    }
  };

  return { updateClientes };
};

