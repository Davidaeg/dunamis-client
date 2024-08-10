import { useState, useEffect } from "react";
import { ReservasDB } from "../../modules/reservation/reservas.types";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useGetReservacion = () => {
  const [reservas, setReservas] = useState<ReservasDB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReservaciones = async () => {
    setLoading(true);
    try {
      const response = await dunamisApi.get<ReservasDB[]>("/reservacionesDTO");
      setReservas(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching reservas data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservaciones();
  }, []);

  return { reservas, loading, error, refetch: fetchReservaciones };
};

