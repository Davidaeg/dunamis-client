import React, { useState, ChangeEvent, FormEvent } from "react";
import { useCreatePersona } from "../../hooks/persona/useCreatePersonas";
import { PersonaDB } from "../../modules/personas/persona.types";

const CreatePersona: React.FC = () => {
  const { createPersona } = useCreatePersona();
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
      await createPersona(newPersona);
      alert("Persona creada exitosamente");
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
      alert("Error creando persona");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mt-4">
        <input
          type="text"
          name="idPersona"
          value={newPersona.idPersona}
          onChange={handleChange}
          placeholder="ID Persona"
          className="block w-full border-b-2 border-gray-400 focus:outline-none focus:ring-2"
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="nombre"
          value={newPersona.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="block w-full border-b-2 border-gray-400 focus:outline-none focus:ring-2"
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="apellido1"
          value={newPersona.apellido1}
          onChange={handleChange}
          placeholder="Apellido 1"
          className="block w-full border-b-2 border-gray-400 focus:outline-none focus:ring-2"
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="apellido2"
          value={newPersona.apellido2}
          onChange={handleChange}
          placeholder="Apellido 2"
          className="block w-full border-b-2 border-gray-400 focus:outline-none focus:ring-2"
          required
        />
      </div>
      <div>
        <input
          type="date"
          name="fechaNacimiento"
          value={newPersona.fechaNacimiento}
          onChange={handleChange}
          placeholder="Fecha de Nacimiento"
          className="block w-full border-b-2 border-gray-400 focus:outline-none focus:ring-2"
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="numeroTelefono"
          value={newPersona.numeroTelefono}
          onChange={handleChange}
          placeholder="Número de Teléfono"
          className="block w-full border-b-2 border-gray-400 focus:outline-none focus:ring-2"
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="numeroCelular"
          value={newPersona.numeroCelular}
          onChange={handleChange}
          placeholder="Número de Celular"
          className="block w-full border-b-2 border-gray-400 focus:outline-none focus:ring-2"
          required
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          value={newPersona.email}
          onChange={handleChange}
          placeholder="Email"
          className="block w-full border-b-2 border-gray-400 focus:outline-none focus:ring-2"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Crear Persona
        </button>
      </div>
    </form>
  );
};

export default CreatePersona;
