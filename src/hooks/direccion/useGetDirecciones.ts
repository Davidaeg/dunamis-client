import { useState, useEffect } from "react";
import { DireccionDB } from "../../modules/personas/persona.types";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useGetDirecciones = () => {
  const [direccion, setDirecciones] = useState<DireccionDB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDirecciones = async () => {
    setLoading(true);
    try {
      const response = await dunamisApi.get<DireccionDB[]>("/direcciones");
      setDirecciones(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching user data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirecciones();
  }, []);

  return { direccion, loading, error, refetch: fetchDirecciones };
};

