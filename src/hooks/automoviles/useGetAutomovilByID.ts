import { useState, useEffect } from "react";
import { AutomovilDB } from "../../modules/automovil/automovil.types";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useGetAutomovilByID = (placa: string) => {
  const [automovil, setAutomovil] = useState<AutomovilDB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAutomovilesById = async () => {
    setLoading(true);
    try {
      const response = await dunamisApi.get<AutomovilDB[]>(`/automovilDTO/${placa}`);
      setAutomovil(response.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError("Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (placa) {
      fetchAutomovilesById();
    }
  }, [placa]);

  return { automovil, loading, error, refetch: fetchAutomovilesById };
};

