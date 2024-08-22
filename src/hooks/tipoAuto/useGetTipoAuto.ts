import { useState, useEffect } from "react";
import { TipoAutoDB} from "../../modules/automovil/automovil.types";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useGetTipoAuto = () => {
  const [tipoAuto, setTipoAuto] = useState<TipoAutoDB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTipoAutomovil = async () => {
    setLoading(true);
    try {
      const response = await dunamisApi.get<TipoAutoDB[]>("/tipoAutomoviles");
      setTipoAuto(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching typesAut data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTipoAutomovil();
  }, []);

  return { tipoAuto, loading, error, refetch: fetchTipoAutomovil };
};

