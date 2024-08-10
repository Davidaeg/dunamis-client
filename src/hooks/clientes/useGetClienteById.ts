import { useState, useEffect } from "react";
import { ClientesDB} from "../../modules/personas/persona.types";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useGetClienteById = (idCliente: string) => {
  const [clientes, setClientes] = useState<ClientesDB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClientesById = async () => {
    setLoading(true);
    try {
      const response = await dunamisApi.get<ClientesDB[]>(`/cliente/${idCliente}`);
      console.log('Datos obtenidos:', response.data);
      setClientes(response.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError("Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idCliente) {
        fetchClientesById();
    }
  }, [idCliente]);

  return { clientes, loading, error, refetch: fetchClientesById };
};

