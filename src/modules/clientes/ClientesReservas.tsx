import React, { useEffect, useState } from 'react';
import { useGetClienteById } from '../../hooks/clientes/useGetClienteById';

interface ClientesReservasProps {
  idCliente: string;
}

export const ClientesReservas = ({ idCliente }: ClientesReservasProps) => {
  const { clientes, loading, error } = useGetClienteById(idCliente);
  const [selectedCliente, setSelectedCliente] = useState<any>(null);

  useEffect(() => {
    if (clientes) {
      setSelectedCliente(clientes);
    }
  }, [clientes]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSelectedCliente((prev: any) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {selectedCliente ? (
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-gray-100">
          <div className="mt-2">
            <label htmlFor="idCliente" className="block font-medium">Categoría de Licencia:</label>
            <input
              id="idCliente"
              type="text"
              value={selectedCliente.idCliente}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              readOnly
            />
          </div>
          <div className="mt-2">
            <label htmlFor="categoriaLicencia" className="block font-medium">Categoría de Licencia:</label>
            <input
              id="categoriaLicencia"
              type="text"
              value={selectedCliente.categoriaLicencia}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              readOnly
            />
          </div>
          <div className="mt-2">
            <label htmlFor="fechaEmisionLicencia" className="block font-medium">Fecha de Emisión de la Licencia:</label>
            <input
              id="fechaEmisionLicencia"
              type="text"
              value={selectedCliente.fechaEmisionLicencia}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              readOnly
            />
          </div>
          <div className="mt-2">
            <label htmlFor="fechaVencimientoLicencia" className="block font-medium">Fecha de Vencimiento de la Licencia:</label>
            <input
              id="fechaVencimientoLicencia"
              type="text"
              value={selectedCliente.fechaVencimientoLicencia}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              readOnly
            />
          </div>
          <div className="mt-2">
            <label htmlFor="estado" className="block font-medium">Estado:</label>
            <input
              id="estado"
              type="text"
              value={selectedCliente.estado}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              readOnly
            />
          </div>
        </form>
      ) : (
        <div>No hay datos del cliente</div>
      )}
    </div>
  );
};




