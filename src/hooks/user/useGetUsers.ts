import { useState, useEffect } from "react";
import { UsuariosDB, PersonaDB } from "../../modules/personas/persona.types";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useGetUsers = (idPersona: string) => {
  const [users, setUsers] = useState<UsuariosDB[]>([]);
  const [persona, setPersona] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

const fetchUsarios = async () => {
  setLoading(true);
  try {
    const response = await dunamisApi.get<UsuariosDB[]>(`/usuarioPorPersona/${idPersona}`);
    const responsePersona = await dunamisApi.get<PersonaDB[]>(`/persona/${idPersona}`);
    console.log('Datos obtenidos:', response.data);
    setUsers(response.data);
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
    fetchUsarios();
  }
}, [idPersona]);

return { users, persona, loading, error, refetch: fetchUsarios };
};