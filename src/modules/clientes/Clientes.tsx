import { useState } from "react";
import { useGetClientes } from "../../hooks/clientes/useGetClientes";
import Swal from "sweetalert2";
import { useUpdateClientes } from "../../hooks/clientes/useUpdateClientes";


interface ClientesProps {
  idPersona: string;
}

export const Clientes = ({ idPersona }: ClientesProps) => {
  const { clientes, persona, loading, error } = useGetClientes(idPersona);
  const [selectedClientes, setSelectedClientes] = useState<any>(null);
  const { updateClientes } = useUpdateClientes();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!selectedClientes && clientes.length > 0) {
    setSelectedClientes(clientes[0]);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSelectedClientes((prev: any) => ({
      ...prev,
      [id]: value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateClientes(idPersona, selectedClientes);
      Swal.fire(
        "¡Actualizado!",
        "La dirección a sido actualizada.",
        "success"
      );
    } catch (error) {
      console.error("Error updating direccion:", error);
      Swal.fire(
        "Error",
        "Hubo un error al actualizar la dirección.",
        "error"
      );
    }
  };


  return (
    <div>
      {selectedClientes && (
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-gray-100">
          <div className="mt-2">
            <label htmlFor="idCliente" className="block font-medium">ID Cliente:</label>
            <input
              id="idCliente"
              type="text"
              value={selectedClientes.idCliente}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              readOnly
            />
          </div>
          <div className="mt-2">
            <label htmlFor="categoriaLicencia" className="block font-medium">Categoria Licencia:</label>
            <input
              id="categoriaLicencia"
              type="text"
              value={selectedClientes.categoriaLicencia}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="fechaEmisionLicencia" className="block font-medium">Fecha de Emision de la Licencia:</label>
            <input
              id="fechaEmisionLicencia"
              type="date"
              value={selectedClientes.fechaEmisionLicencia}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="fechaVencimientoLicencia" className="block font-medium">Fecha de Vencimiento de la Licencia:</label>
            <input
              id="fechaVencimientoLicencia"
              type="date"
              value={selectedClientes.fechaVencimientoLicencia}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="estado" className="block font-medium">Estado:</label>
            <input
              id="estado"
              type="text"
              value={selectedClientes.estado}
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
              Actualizar Clientes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};


