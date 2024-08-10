import { useState, useEffect } from "react";
import { AutomovilDB } from "../../modules/automovil/automovil.types";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useGetAutomovilDisponible = () => {
  const [automovil, setAutomovil] = useState<AutomovilDB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAutomoviles = async () => {
    setLoading(true);
    try {
      const response = await dunamisApi.get<AutomovilDB[]>("/automovilDispoDTO");
      setAutomovil(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching car data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAutomoviles();
  }, []);

  return { automovil, loading, error, refetch: fetchAutomoviles };
};

