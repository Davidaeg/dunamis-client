import { useState, useEffect } from "react";
import { dunamisApi } from "../../datasources/dunamisApi.service";
import { ClientesDB} from "../../modules/personas/persona.types";

export const useGetClientesAll = () => {
  const [clientesAll, setclientesAll] = useState<ClientesDB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClientesAll = async () => {
    setLoading(true);
    try {
      const response = await dunamisApi.get<ClientesDB[]>("/clientesSinReserva");
      setclientesAll(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching segment data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientesAll();
  }, []);

  return { clientesAll, loading, error, refetch: fetchClientesAll };
};

