import { useState, useEffect } from "react";
import { DireccionDB, PersonaDB } from "../../modules/personas/persona.types";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useGetDirecciones = (idPersona: string) => {
  const [direccion, setDirecciones] = useState<DireccionDB[]>([]);
  const [persona, setPersona] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDirecciones = async () => {
    setLoading(true);
    try {
      const response = await dunamisApi.get<DireccionDB[]>(`/direccionPersona/${idPersona}`);
      const responsePersona = await dunamisApi.get<PersonaDB[]>(`/persona/${idPersona}`);
      console.log('Datos obtenidos:', response.data);
      setDirecciones(response.data);
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
      fetchDirecciones();
    }
  }, [idPersona]);

  return { direccion, persona, loading, error, refetch: fetchDirecciones };
};


