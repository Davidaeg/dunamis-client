import { useState, useEffect } from "react";
import { PersonaDB } from "../../modules/personas/persona.types";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useGetPersonas = () => {
  const [personas, setPersonas] = useState<PersonaDB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const response = await dunamisApi.get<PersonaDB[]>("/personas");
        setPersonas(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching user data");
        setLoading(false);
      }
    };

    fetchPersonas();
  }, []);

  return { personas, loading, error };
};
