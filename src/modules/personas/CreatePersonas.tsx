import React, { useState, ChangeEvent, FormEvent } from "react";
import { PersonaDB, DireccionDB } from "../../modules/personas/persona.types";

interface CreatePersonaProps {
  onCreate: (persona: PersonaDB, direccion: DireccionDB) => void;
}

const CreatePersona: React.FC<CreatePersonaProps> = ({ onCreate }) => {
  const [persona, setPersona] = useState<PersonaDB>({
    idPersona: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    fechaNacimiento: "",
    numeroTelefono: "",
    numeroCelular: "",
    email: "",
    direcciones: [],
  });

  const [direccion, setDireccion] = useState<DireccionDB>({
    Direccion: "",
    Provincia: "",
    Canton: "",
    Distrito: "",
    idPersona: "" 
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersona(prevPersona => {
      const updatedPersona = { ...prevPersona, [name]: value };
      if (name === "idPersona") {
        setDireccion(prevDireccion => ({ ...prevDireccion, idPersona: value }));
      }
      return updatedPersona;
    });
  };

  const handleDireccionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDireccion(prevDireccion => ({ ...prevDireccion, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      console.log("Persona a crear:", { ...persona, direcciones: [direccion] });
      onCreate(persona, direccion);
      setPersona({
        idPersona: "",
        nombre: "",
        apellido1: "",
        apellido2: "",
        fechaNacimiento: "",
        numeroTelefono: "",
        numeroCelular: "",
        email: "",
        direcciones: [],
      });
      setDireccion({
        Direccion: "",
        Provincia: "",
        Canton: "",
        Distrito: "",
        idPersona: ""
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
            <label htmlFor="idPersona" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cédula Cliente</label>
            <input
              type="text"
              id="idPersona"
              name="idPersona"
              value={persona.idPersona}
              onChange={handleChange}
              placeholder="Cédula"
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
              value={persona.nombre}
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
              value={persona.apellido1}
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
              value={persona.apellido2}
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
              value={persona.fechaNacimiento}
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
              value={persona.numeroTelefono}
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
              value={persona.numeroCelular}
              onChange={handleChange}
              placeholder="Número de Celular"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={persona.email}
              onChange={handleChange}
              placeholder="Correo Electrónico"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          {/*  */}
          <div className="hidden">
            <label htmlFor="idPersona" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID</label>
            <input
              type="text"
              id="idPersona"
              name="idPersona"
              value={persona.idPersona}
              onChange={handleChange}
              placeholder="ID"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
              readOnly
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="Direccion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dirección</label>
            <input
              type="text"
              id="Direccion"
              name="Direccion"
              value={direccion.Direccion}
              onChange={handleDireccionChange}
              placeholder="Dirección"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label htmlFor="Provincia" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Provincia</label>
            <input
              type="text"
              id="Provincia"
              name="Provincia"
              value={direccion.Provincia}
              onChange={handleDireccionChange}
              placeholder="Provincia"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label htmlFor="Canton" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cantón</label>
            <input
              type="text"
              id="Canton"
              name="Canton"
              value={direccion.Canton}
              onChange={handleDireccionChange}
              placeholder="Cantón"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label htmlFor="Distrito" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Distrito</label>
            <input
              type="text"
              id="Distrito"
              name="Distrito"
              value={direccion.Distrito}
              onChange={handleDireccionChange}
              placeholder="Distrito"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900">
              Crear persona
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreatePersona;




