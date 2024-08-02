import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { PersonaDB } from "../../modules/personas/persona.types";

interface UpdatePersonasProps {
  persona: PersonaDB | null;
  onUpdate: (idPersona: string, persona: PersonaDB) => void;
}

const UpdatePersonas: React.FC<UpdatePersonasProps> = ({ persona, onUpdate }) => {
  const [updatedPersona, setUpdatedPersona] = useState<PersonaDB>({
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
      setUpdatedPersona(persona);
    }
  }, [persona]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedPersona({ ...updatedPersona, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      onUpdate(updatedPersona.idPersona, updatedPersona);
    } catch (error) {
      console.error("Error actualizando persona:", error);
    }
  };

  return (
    <section>
      <div>
        <h2 className="ml-3 mt-3 text-xl font-bold text-gray-900 ">Actualizar persona</h2>
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-gray-100">
          <div>
            <label htmlFor="idPersona" className="block font-medium">ID Persona</label>
            <input
              type="text"
              id="idPersona"
              name="idPersona"
              value={updatedPersona.idPersona}
              onChange={handleChange}
              placeholder="ID Persona"
              className="mt-1 block w-full border rounded p-2"
              required
              readOnly
            />
          </div>
          <div>
            <label htmlFor="nombre" className="block font-medium mt-3">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={updatedPersona.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="apellido1" className="block font-medium mt-3">Apellido 1</label>
            <input
              type="text"
              id="apellido1"
              name="apellido1"
              value={updatedPersona.apellido1}
              onChange={handleChange}
              placeholder="Apellido 1"
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="apellido2" className="block font-medium mt-3">Apellido 2</label>
            <input
              type="text"
              id="apellido2"
              name="apellido2"
              value={updatedPersona.apellido2}
              onChange={handleChange}
              placeholder="Apellido 2"
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="fechaNacimiento" className="block font-medium mt-3">Fecha de Nacimiento</label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={updatedPersona.fechaNacimiento}
              onChange={handleChange}
              placeholder="Fecha de Nacimiento"
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="numeroTelefono" className="block font-medium mt-3">Número de Teléfono</label>
            <input
              type="text"
              id="numeroTelefono"
              name="numeroTelefono"
              value={updatedPersona.numeroTelefono}
              onChange={handleChange}
              placeholder="Número de Teléfono"
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="numeroCelular" className="block font-medium mt-3">Número de Celular</label>
            <input
              type="text"
              id="numeroCelular"
              name="numeroCelular"
              value={updatedPersona.numeroCelular}
              onChange={handleChange}
              placeholder="Número de Celular"
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mt-3">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={updatedPersona.email}
              onChange={handleChange}
              placeholder="Email"
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 hover:bg-blue-400">
              Actualizar Persona
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdatePersonas;


