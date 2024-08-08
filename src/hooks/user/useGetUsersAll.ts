import { useState, useEffect } from "react";
import { dunamisApi } from "../../datasources/dunamisApi.service";
import { UsuarioDTO } from "../../modules/personas/persona.types";

export const useGetUsersAll = () => {
  const [usersAll, setusersAll] = useState<UsuarioDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsersAll = async () => {
    setLoading(true);
    try {
      const response = await dunamisApi.get<UsuarioDTO[]>("/users");
      setusersAll(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching segment data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersAll();
  }, []);

  return { usersAll, loading, error, refetch: fetchUsersAll };
};

