import { useState, useEffect } from "react";
import { RolesDB } from "../../modules/personas/persona.types";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useGetRol = () => {
  const [rol, setRoles] = useState<RolesDB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await dunamisApi.get<RolesDB[]>("/personas");
      setRoles(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching user data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return { rol, loading, error, refetch: fetchRoles };
};

