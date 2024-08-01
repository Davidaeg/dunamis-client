import { useState } from "react";
import { useGetDirecciones } from "../../hooks/direccion/useGetDirecciones";

interface DireccionProps {
  idPersona: string;
}

export const Direccion = ({ idPersona }: DireccionProps) => {
  const { direccion, persona, loading, error } = useGetDirecciones(idPersona);
  const [selectedDireccion, setSelectedDireccion] = useState<any>(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!selectedDireccion && direccion.length > 0) {
    setSelectedDireccion(direccion[0]);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSelectedDireccion((prev: any) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div>
      {selectedDireccion && (
        <form className="p-4 border rounded bg-gray-100">
          <div className="mt-2">
            <label htmlFor="direccion" className="block font-medium">Dirección:</label>
            <input
              id="direccion"
              type="text"
              value={selectedDireccion.direccion}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="provincia" className="block font-medium">Provincia:</label>
            <input
              id="provincia"
              type="text"
              value={selectedDireccion.provincia}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="canton" className="block font-medium">Cantón:</label>
            <input
              id="canton"
              type="text"
              value={selectedDireccion.canton}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="distrito" className="block font-medium">Distrito:</label>
            <input
              id="distrito"
              type="text"
              value={selectedDireccion.distrito}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="">Nombre: {persona.nombre}</label>
          </div>
          <div className="mt-2">
            <label htmlFor="">Cédula: {persona.idPersona}</label>
          </div>
          <div className="sm:col-span-2 mt-2">
            <button type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900">
              Actualizar dirección
            </button>
          </div>
        </form>
      )}
    </div>
  );
};


