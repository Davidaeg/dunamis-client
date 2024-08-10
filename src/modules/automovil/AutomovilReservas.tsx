import React, { useEffect, useState } from 'react';
import { useGetAutomovilByID } from '../../hooks/automoviles/useGetAutomovilByID';

interface AutomovilReservasProps {
  placa: string;
}

export const AutomovilReservas = ({ placa }: AutomovilReservasProps) => {
  const { automovil, loading, error } = useGetAutomovilByID(placa);
  const [selectedAutomovil, setSelectedAutomovil] = useState<any>(null);

  useEffect(() => {
    if (automovil) {
      setSelectedAutomovil(automovil);
    }
  }, [automovil]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSelectedAutomovil((prev: any) => ({
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
      {selectedAutomovil ? (
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-gray-100">
          <div className="mt-2">
            <label htmlFor="placa" className="block font-medium">Categoría de Licencia:</label>
            <input
              id="placa"
              type="text"
              value={selectedAutomovil.placa}
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
              value={selectedAutomovil.categoriaLicencia}
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
              value={selectedAutomovil.fechaEmisionLicencia}
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
              value={selectedAutomovil.fechaVencimientoLicencia}
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
              value={selectedAutomovil.estado}
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




