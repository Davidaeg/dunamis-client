import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  PersonaDB,
  DireccionDB,
  ClientesDB,
} from "../../modules/personas/persona.types";

interface CreatePersonaProps {
  onCreate: (
    persona: PersonaDB,
    direccion: DireccionDB,
    clientes: ClientesDB
  ) => void;
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
    idDireccion: "",
    Direccion: "",
    Provincia: "",
    Canton: "",
    Distrito: "",
    idPersona: "",
  });

  const [clientes, setClientes] = useState<ClientesDB>({
    idCliente: "",
    categoriaLicencia: "",
    fechaEmisionLicencia: "",
    fechaVencimientoLicencia: "",
    estado: "",
    idPersona: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersona((prevPersona) => {
      const updatedPersona = { ...prevPersona, [name]: value };
      if (name === "idPersona") {
        setDireccion((prevDireccion) => ({
          ...prevDireccion,
          idPersona: value,
        }));
      }
      if (name === "idPersona") {
        setClientes((prevCliente) => ({ ...prevCliente, idPersona: value }));
      }
      return updatedPersona;
    });
  };

  const handleDireccionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDireccion((prevDireccion) => ({ ...prevDireccion, [name]: value }));
  };

  const handleClienteChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientes((prevCliente) => ({ ...prevCliente, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      console.log("Persona a crear:", {
        ...persona,
        direcciones: [direccion],
        clientes: [clientes],
      });
      onCreate(persona, direccion, clientes);
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
        idDireccion: "",
        Direccion: "",
        Provincia: "",
        Canton: "",
        Distrito: "",
        idPersona: "",
      });
      setClientes({
        idCliente: "",
        categoriaLicencia: "",
        fechaEmisionLicencia: "",
        fechaVencimientoLicencia: "",
        estado: "",
        idPersona: "",
      });
    } catch (error) {
      console.error("Error creando persona:", error);
    }
  };

  return (
    <section>
      <div className="max-w-4xl mx-auto">
        <h2 className="ml-3 mt-3 text-xl font-bold text-gray-900">
          Crear una nueva persona
        </h2>
        <form
          onSubmit={handleSubmit}
          className="p-4 border rounded bg-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <h3 className="text-lg font-bold mb-3">Datos de Persona</h3>
            <div>
              <label htmlFor="idPersona" className="block font-medium">
                Cédula Cliente
              </label>
              <input
                type="text"
                id="idPersona"
                name="idPersona"
                value={persona.idPersona}
                onChange={handleChange}
                placeholder="Cédula"
                className="mt-1 block w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="nombre" className="block font-medium mt-4">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={persona.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                className="mt-1 block w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="apellido1" className="block font-medium mt-4">
                Apellido 1
              </label>
              <input
                type="text"
                id="apellido1"
                name="apellido1"
                value={persona.apellido1}
                onChange={handleChange}
                placeholder="Apellido 1"
                className="mt-1 block w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="apellido2" className="block font-medium mt-4">
                Apellido 2
              </label>
              <input
                type="text"
                id="apellido2"
                name="apellido2"
                value={persona.apellido2}
                onChange={handleChange}
                placeholder="Apellido 2"
                className="mt-1 block w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="fechaNacimiento"
                className="block font-medium mt-4"
              >
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                id="fechaNacimiento"
                name="fechaNacimiento"
                value={persona.fechaNacimiento}
                onChange={handleChange}
                placeholder="Fecha de Nacimiento"
                className="mt-1 block w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="numeroTelefono"
                className="block font-medium mt-4"
              >
                Número de Teléfono
              </label>
              <input
                type="text"
                id="numeroTelefono"
                name="numeroTelefono"
                value={persona.numeroTelefono}
                onChange={handleChange}
                placeholder="Número de Teléfono"
                className="mt-1 block w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="numeroCelular" className="block font-medium mt-4">
                Número de Celular
              </label>
              <input
                type="text"
                id="numeroCelular"
                name="numeroCelular"
                value={persona.numeroCelular}
                onChange={handleChange}
                placeholder="Número de Celular"
                className="mt-1 block w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-medium mt-4">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={persona.email}
                onChange={handleChange}
                placeholder="Correo Electrónico"
                className="mt-1 block w-full border rounded p-2"
                required
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Datos de Dirección</h3>
            <div>
              <label htmlFor="Direccion" className="block font-medium ">
                Dirección
              </label>
              <input
                type="text"
                id="Direccion"
                name="Direccion"
                value={direccion.Direccion}
                onChange={handleDireccionChange}
                placeholder="Dirección"
                className="mt-1 block w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="Provincia" className="block font-medium mt-4">
                Provincia
              </label>
              <input
                type="text"
                id="Provincia"
                name="Provincia"
                value={direccion.Provincia}
                onChange={handleDireccionChange}
                placeholder="Provincia"
                className="mt-1 block w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="Canton" className="block font-medium mt-4">
                Cantón
              </label>
              <input
                type="text"
                id="Canton"
                name="Canton"
                value={direccion.Canton}
                onChange={handleDireccionChange}
                placeholder="Cantón"
                className="mt-1 block w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="Distrito" className="block font-medium mt-4">
                Distrito
              </label>
              <input
                type="text"
                id="Distrito"
                name="Distrito"
                value={direccion.Distrito}
                onChange={handleDireccionChange}
                placeholder="Distrito"
                className="mt-1 block w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <h3 className="text-lg font-bold mt-4">Datos de Cliente</h3>
              <div>
                <label htmlFor="idCliente" className="block font-medium mt-2">
                  ID Cliente
                </label>
                <input
                  type="text"
                  id="idCliente"
                  name="idCliente"
                  value={clientes.idCliente}
                  onChange={handleClienteChange}
                  placeholder="ID Cliente"
                  className="mt-1 block w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="categoriaLicencia" className="block font-medium mt-4">
                  Categoria Licencia
                </label>
                <input
                  type="text"
                  id="categoriaLicencia"
                  name="categoriaLicencia"
                  value={clientes.categoriaLicencia}
                  onChange={handleClienteChange}
                  placeholder="Categoria Licencia"
                  className="mt-1 block w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="fechaEmisionLicencia" className="block font-medium mt-4">
                  Fecha Emision Licencia
                </label>
                <input
                  type="date"
                  id="fechaEmisionLicencia"
                  name="fechaEmisionLicencia"
                  value={clientes.fechaEmisionLicencia}
                  onChange={handleClienteChange}
                  placeholder="Fecha Emision Licencia"
                  className="mt-1 block w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="fechaVencimientoLicencia" className="block font-medium mt-4">
                  Fecha Vencimiento Licencia
                </label>
                <input
                  type="date"
                  id="fechaVencimientoLicencia"
                  name="fechaVencimientoLicencia"
                  value={clientes.fechaVencimientoLicencia}
                  onChange={handleClienteChange}
                  placeholder="Fecha Vencimiento Licencia"
                  className="mt-1 block w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="estado" className="block font-medium mt-4">
                  Estado
                </label>
                <input
                  type="text"
                  id="estado"
                  name="estado"
                  value={clientes.estado}
                  onChange={handleClienteChange}
                  placeholder="Estado"
                  className="mt-1 block w-full border rounded p-2"
                  required
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900"
              >
                Crear persona
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreatePersona;
