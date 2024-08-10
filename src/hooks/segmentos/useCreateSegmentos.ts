import { dunamisApi } from "../../datasources/dunamisApi.service";
import { SegmentoDB } from "../../modules/automovil/automovil.types";

export const useCreateSegmentos = () => {
  const createSegmento = async (newSegmento: SegmentoDB): Promise<SegmentoDB> => {
    try {
      const response = await dunamisApi.post<SegmentoDB>("/segmento", newSegmento);
      return response.data;
    } catch (error) {
      console.error("Error creating segmento:", error);
      throw error;
    }
  };

  return { createSegmento };
};
