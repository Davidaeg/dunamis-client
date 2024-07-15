import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useUpdatePersonas } from "../../hooks/persona/useUpdatePersonas";
import { PersonaDB } from "./persona.types";
import Swal from "sweetalert2";

interface UpdatePersonasProps {
  persona: PersonaDB | null;
}

const UpdatePersonas: React.FC<UpdatePersonasProps> = ({ persona }) => {
  const { updatePersona } = useUpdatePersonas();
  const [updPersona, setUpdPersona] = useState<PersonaDB>({
    idPersona: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    fechaNacimiento: "",
    numeroTelefono: "",
    numeroCelular: "",
    email: "",
  });

  useEffect(() => {
    if (persona) {
      setUpdPersona(persona);
    }
  }, [persona]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdPersona({ ...updPersona, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await updatePersona(updPersona.idPersona, updPersona);
      Swal.fire({
        title: "¡Éxito!",
        text: "Persona actualizada exitosamente",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema actualizando la persona",
        icon: "error",
      });
      console.error("Error actualizando persona:", error);
    }
  };

  return (
    <section className="dark:bg-gray-700">
      <div className="py-8 px-4 mx-auto max-w-2xl">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Actualizar persona
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 sm:grid-cols-2 sm:gap-6"
        >
          <div className="sm:col-span-2">
            <label
              htmlFor="idPersona"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ID Persona
            </label>
            <input
              type="text"
              id="idPersona"
              name="idPersona"
              value={updPersona.idPersona}
              onChange={handleChange}
              placeholder="ID Persona"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
              readOnly
            />
          </div>
          <div>
            <label
              htmlFor="nombre"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={updPersona.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="apellido1"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Primer Apellido
            </label>
            <input
              type="text"
              id="apellido1"
              name="apellido1"
              value={updPersona.apellido1}
              onChange={handleChange}
              placeholder="Primer Apellido"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="apellido2"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Segundo Apellido
            </label>
            <input
              type="text"
              id="apellido2"
              name="apellido2"
              value={updPersona.apellido2}
              onChange={handleChange}
              placeholder="Segundo Apellido"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="fechaNacimiento"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Fecha Nacimiento
            </label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={updPersona.fechaNacimiento}
              onChange={handleChange}
              placeholder="Fecha Nacimiento"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="numeroTelefono"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Numero Telefono
            </label>
            <input
              type="text"
              id="numeroTelefono"
              name="numeroTelefono"
              value={updPersona.numeroTelefono}
              onChange={handleChange}
              placeholder="Numero Telefono"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="numeroCelular"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Numero Celular
            </label>
            <input
              type="text"
              id="numeroCelular"
              name="numeroCelular"
              value={updPersona.numeroCelular}
              onChange={handleChange}
              placeholder="Numero Celular"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={updPersona.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 hover:bg-blue-400"
            >
              Actualizar Persona
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdatePersonas;

