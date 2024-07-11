import { dunamisApi } from "../../datasources/dunamisApi.service";
import { PersonaDB } from "../../modules/personas/persona.types";

export const useCreatePersona = () => {
  const createPersona = async (newPersona: PersonaDB): Promise<PersonaDB> => {
    try {
      const response = await dunamisApi.post<PersonaDB>("/persona", newPersona);
      return response.data;
    } catch (error) {
      console.error("Error creating persona:", error);
      throw error;
    }
  };

  return { createPersona };
};
