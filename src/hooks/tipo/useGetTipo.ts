import { useState, useEffect } from "react";
import { TipoDB } from "../../modules/automovil/automovil.types";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useGetTipo = () => {
  const [tipoCarro, setTipoCarro] = useState<TipoDB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTipos = async () => {
    setLoading(true);
    try {
      const response = await dunamisApi.get<TipoDB[]>("/tipos");
      setTipoCarro(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching typesAut data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTipos();
  }, []);

  return { tipoCarro, loading, error, refetch: fetchTipos };
};

