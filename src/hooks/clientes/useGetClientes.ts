import { useState, useEffect } from "react";
import { ClientesDB, PersonaDB } from "../../modules/personas/persona.types";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useGetClientes = (idPersona: string) => {
  const [clientes, setClientes] = useState<ClientesDB[]>([]);
  const [persona, setPersona] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClientes = async () => {
    setLoading(true);
    try {
      const response = await dunamisApi.get<ClientesDB[]>(`/clientePersona/${idPersona}`);
      const responsePersona = await dunamisApi.get<PersonaDB[]>(`/persona/${idPersona}`);
      console.log('Datos obtenidos:', response.data);
      setClientes(response.data);
      setPersona(responsePersona.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError("Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idPersona) {
        fetchClientes();
    }
  }, [idPersona]);

  return { clientes, persona, loading, error, refetch: fetchClientes };
};


