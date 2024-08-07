import { useState, useEffect } from "react";
import { AutomovilDB } from "../../modules/automovil/automovil.types";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useGetAutomovil = () => {
  const [automovil, setAutomovil] = useState<AutomovilDB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAutomoviles = async () => {
    setLoading(true);
    try {
      const response = await dunamisApi.get<AutomovilDB[]>("/automoviles");
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

