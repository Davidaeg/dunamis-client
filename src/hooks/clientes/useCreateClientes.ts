import { dunamisApi } from "../../datasources/dunamisApi.service";
import { ClientesDB } from "../../modules/personas/persona.types";

export const useCreateClientes = () => {
  const createCliente = async (newCliente: ClientesDB): Promise<ClientesDB> => {
    try {
      const response = await dunamisApi.post<ClientesDB>("/cliente", newCliente);
      return response.data;
    } catch (error) {
      console.error("Error creating Cliente:", error);
      throw error;
    }
  };

  return { createCliente };
};
