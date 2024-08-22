import { useState, useEffect } from "react";
import { FacturacionDB } from "../../modules/facturacion/factura.types";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useGetFactura = () => {
  const [factura, setFactura] = useState<FacturacionDB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFacturacion = async () => {
    setLoading(true);
    try {
      const response = await dunamisApi.get<FacturacionDB[]>("/facturas");
      setFactura(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching segment data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacturacion();
  }, []);

  return { factura, loading, error, refetch: fetchFacturacion };
};

