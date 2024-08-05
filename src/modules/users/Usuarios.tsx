import { useState } from "react";
import { useGetUsers } from "../../hooks/user/useGetUsers";
import Swal from "sweetalert2";
import {useUpdateUsuarios } from "../../hooks/user/useUpdateUsers";


interface UsuariosProps {
  idPersona: string;
}

export const Usuarios = ({ idPersona }: UsuariosProps) => {
  const { users, persona, loading, error } = useGetUsers(idPersona);
  const [selectedUsuarios, setSelectedUsuarios] = useState<any>(null);
  const { updateUsuarios } = useUpdateUsuarios();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!selectedUsuarios && users.length > 0) {
    setSelectedUsuarios(users[0]);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSelectedUsuarios((prev: any) => ({
      ...prev,
      [id]: value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUsuarios(idPersona, selectedUsuarios);
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
      {selectedUsuarios && (
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-gray-100">
          <div className="mt-2">
            <label htmlFor="idUsuario" className="block font-medium">ID Usuario:</label>
            <input
              id="idUsuario"
              type="text"
              value={selectedUsuarios.idUsuario}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              readOnly
            />
          </div>
          <div className="mt-2">
            <label htmlFor="nombreUsuario" className="block font-medium">Nombre de Usuario:</label>
            <input
              id="nombreUsuario"
              type="text"
              value={selectedUsuarios.nombreUsuario}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="contrasenna" className="block font-medium">Contraseña:</label>
            <input
              id="contrasenna"
              type="text"
              value={selectedUsuarios.contrasenna}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="idRol" className="block font-medium">Rol:</label>
            <input
              id="idRol"
              type="text"
              value={selectedUsuarios.idRol}
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


