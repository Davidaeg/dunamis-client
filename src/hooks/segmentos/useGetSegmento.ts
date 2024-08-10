import { useState, useEffect } from "react";
import { SegmentoDB } from "../../modules/automovil/automovil.types";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useGetSegmento = () => {
  const [segmento, setSegmento] = useState<SegmentoDB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSegmentos = async () => {
    setLoading(true);
    try {
      const response = await dunamisApi.get<SegmentoDB[]>("/segmentos");
      setSegmento(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching segment data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSegmentos();
  }, []);

  return { segmento, loading, error, refetch: fetchSegmentos };
};

