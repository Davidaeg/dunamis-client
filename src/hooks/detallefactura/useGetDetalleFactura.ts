import { useState, useEffect } from "react";
import { DetalleFacturaDB } from "../../modules/facturacion/factura.types";
import { dunamisApi } from "../../datasources/dunamisApi.service";

export const useGetDetalleFactura = () => {
  const [detalleFactura, setDetalleFactura] = useState<DetalleFacturaDB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetalleFactura = async () => {
    setLoading(true);
    try {
      const response = await dunamisApi.get<DetalleFacturaDB[]>("/detalle-factura");
      setDetalleFactura(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching segment data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetalleFactura();
  }, []);

  return { detalleFactura, loading, error, refetch: fetchDetalleFactura };
};

