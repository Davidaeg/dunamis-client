import { useState, useEffect } from "react";
import { User } from "../../modules/users/user.types";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useGetUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await dunamisApi.get<User[]>("/users");
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching user data");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};
