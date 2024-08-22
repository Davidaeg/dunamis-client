import { dunamisApi } from "../../datasources/dunamisApi.service";
import { TipoAutoDB } from "../../modules/automovil/automovil.types";

export const useCreateTipoAuto = () => {
  const createTipoAutomovil = async (newTipoAutomovil: TipoAutoDB): Promise<TipoAutoDB> => {
    try {
      const response = await dunamisApi.post<TipoAutoDB>("/tipoAutomovil", newTipoAutomovil);
      return response.data;
    } catch (error) {
      console.error("Error creating tipoAutomovil:", error);
      throw error;
    }
  };

  return { createTipoAutomovil };
};
