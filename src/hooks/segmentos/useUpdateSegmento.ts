import { dunamisApi } from "../../datasources/dunamisApi.service";
import { SegmentoDB } from "../../modules/automovil/automovil.types";

export const useUpdateSegmento = () => {
  const updateSegmento = async (idSegmento: string, updatedSegmento: SegmentoDB): Promise<SegmentoDB> => {
    try {
      const response = await dunamisApi.put<SegmentoDB>(`/segmento/${idSegmento}`, updatedSegmento);
      return response.data;
    } catch (error) {
      console.error("Error updating segmento:", error);
      throw error;
    }
  };

  return { updateSegmento };
};

