import React, { useEffect, useState } from "react";
import { useGetAutomovilByID } from "../../hooks/automoviles/useGetAutomovilByID";

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
        <form
          onSubmit={handleSubmit}
          className="p-4 border rounded bg-gray-100"
        >
          <div className="mt-2">
            <label htmlFor="placa" className="block font-medium">
              Placa del Vehículo:
            </label>
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
            <label htmlFor="marca" className="block font-medium">
              Marca:
            </label>
            <input
              id="marca"
              type="text"
              value={selectedAutomovil.marca}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              readOnly
            />
          </div>
          <div className="mt-2">
            <label htmlFor="modelo" className="block font-medium">
              Modelo:
            </label>
            <input
              id="modelo"
              type="text"
              value={selectedAutomovil.modelo}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              readOnly
            />
          </div>

          <div className="mt-2">
            <label htmlFor="anno" className="block font-medium">
              Año:
            </label>
            <input
              id="anno"
              type="number"
              value={selectedAutomovil.anno}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              readOnly
            />
          </div>
          <div className="mt-2">
            <label htmlFor="color" className="block font-medium">
              Color:
            </label>
            <input
              id="color"
              type="text"
              value={selectedAutomovil.color}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              readOnly
            />
          </div>
          <div className="mt-2">
            <label htmlFor="estilo" className="block font-medium">
              Estilo:
            </label>
            <input
              id="estilo"
              type="text"
              value={selectedAutomovil.estilo}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              readOnly
            />
          </div>
          <div className="mt-2">
            <label htmlFor="segmentoNombre" className="block font-medium">
              Segmento Nombre:
            </label>
            <input
              id="segmentoNombre"
              type="text"
              value={selectedAutomovil.segmentoNombre}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              readOnly
            />
          </div>
        </form>
      ) : (
        <div>No hay datos del automovil</div>
      )}
    </div>
  );
};
