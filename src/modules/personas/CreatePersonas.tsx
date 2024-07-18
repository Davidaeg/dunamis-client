import React, { useState, ChangeEvent, FormEvent } from "react";
import { PersonaDB } from "../../modules/personas/persona.types";

interface CreatePersonaProps {
  onCreate: (persona: PersonaDB) => void;
}

const CreatePersona: React.FC<CreatePersonaProps> = ({ onCreate }) => {
  const [newPersona, setNewPersona] = useState<PersonaDB>({
    idPersona: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    fechaNacimiento: "",
    numeroTelefono: "",
    numeroCelular: "",
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPersona({ ...newPersona, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      onCreate(newPersona);
      setNewPersona({
        idPersona: "",
        nombre: "",
        apellido1: "",
        apellido2: "",
        fechaNacimiento: "",
        numeroTelefono: "",
        numeroCelular: "",
        email: "",
      });
    } catch (error) {
      console.error("Error creando persona:", error);
    }
  };

  return (
    <section className="dark:bg-gray-700">
      <div className="py-8 px-4 mx-auto max-w-2xl">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Crear una nueva persona</h2>
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="sm:col-span-2">
            <label htmlFor="idPersona" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Persona</label>
            <input
              type="text"
              id="idPersona"
              name="idPersona"
              value={newPersona.idPersona}
              onChange={handleChange}
              placeholder="ID Persona"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={newPersona.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label htmlFor="apellido1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido 1</label>
            <input
              type="text"
              id="apellido1"
              name="apellido1"
              value={newPersona.apellido1}
              onChange={handleChange}
              placeholder="Apellido 1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label htmlFor="apellido2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido 2</label>
            <input
              type="text"
              id="apellido2"
              name="apellido2"
              value={newPersona.apellido2}
              onChange={handleChange}
              placeholder="Apellido 2"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label htmlFor="fechaNacimiento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de Nacimiento</label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={newPersona.fechaNacimiento}
              onChange={handleChange}
              placeholder="Fecha de Nacimiento"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label htmlFor="numeroTelefono" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número de Teléfono</label>
            <input
              type="text"
              id="numeroTelefono"
              name="numeroTelefono"
              value={newPersona.numeroTelefono}
              onChange={handleChange}
              placeholder="Número de Teléfono"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label htmlFor="numeroCelular" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número de Celular</label>
            <input
              type="text"
              id="numeroCelular"
              name="numeroCelular"
              value={newPersona.numeroCelular}
              onChange={handleChange}
              placeholder="Número de Celular"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newPersona.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 hover:bg-blue-400">
              Crear Persona
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreatePersona;


