import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { AutomovilDB } from "./automovil.types";

interface UpdateAutomovilProps {
  automovil: AutomovilDB | null;
  onUpdate: (placa: string, automovil: AutomovilDB) => void;
}

const UpdateAutomoviles: React.FC<UpdateAutomovilProps> = ({
  automovil,
  onUpdate,
}) => {
  const [updatedAutomovil, setUpdatedAutomovil] = useState<AutomovilDB>({
    placa: "",
    marca: "",
    modelo: "",
    anno: 0,
    color: "",
    estilo: "",
    carroceria: "",
    combustible: "",
    cabina: "",
    traccion: "",
    transmision: "",
    costo: 0.0,
    automovilActivo: true,
    idSegmento: 0,
  });

  useEffect(() => {
    if (automovil) {
      setUpdatedAutomovil(automovil);
    }
  }, [automovil]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === "checkbox" ? checked : value;
  
    setUpdatedAutomovil((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      onUpdate(updatedAutomovil.placa, updatedAutomovil);
    } catch (error) {
      console.error("Error actualizando automovil:", error);
    }
  };

  return (
    <section>
      <div>
        <h2 className="ml-3 mt-3 text-xl font-bold text-gray-900 ">
          Actualizar automovil
        </h2>
        <form
          onSubmit={handleSubmit}
          className="p-4 border rounded bg-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="placa" className="block font-medium">
                Placa del Automovil
              </label>
              <input
                type="text"
                id="placa"
                name="placa"
                value={updatedAutomovil.placa}
                onChange={handleChange}
                placeholder="Placa del Automovil"
                className="mt-1 block w-full border rounded p-2 bg-slate-300 font-bold"
                required
                readOnly
              />
            </div>
            {/* <div>
                <label htmlFor="marca" className="block font-medium">
                  Marca del vehiculo
                </label>
                <input
                  type="text"
                  id="marca"
                  name="marca"
                  value={updatedAutomovil.marca}
                  onChange={handleChange}
                  placeholder="Marca del vehiculo"
                  className="mt-1 block w-full border rounded p-2"
                  required
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="modelo" className="block font-medium">
                  Modelo del vehiculo
                </label>
                <input
                  type="text"
                  id="modelo"
                  name="modelo"
                  value={updatedAutomovil.modelo}
                  onChange={handleChange}
                  placeholder="Modelo del vehiculo"
                  className="mt-1 block w-full border rounded p-2"
                  required
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="anno" className="block font-medium">
                  Año del vehiculo
                </label>
                <input
                  type="text"
                  id="anno"
                  name="anno"
                  value={updatedAutomovil.anno}
                  onChange={handleChange}
                  placeholder="Año del vehiculo"
                  className="mt-1 block w-full border rounded p-2"
                  required
                  readOnly
                />
              </div> */}
            <div>
              <label htmlFor="color" className="block font-medium">
                Color del vehiculo
              </label>
              <input
                type="text"
                id="color"
                name="color"
                value={updatedAutomovil.color}
                onChange={handleChange}
                placeholder="Color del vehiculo"
                className="mt-1 block w-full border rounded p-2"
                required
              />
            </div>
            {/* <div>
                <label htmlFor="estilo" className="block font-medium">
                  Estilo del vehiculo
                </label>
                <input
                  type="text"
                  id="estilo"
                  name="estilo"
                  value={updatedAutomovil.estilo}
                  onChange={handleChange}
                  placeholder="Estilo del vehiculo"
                  className="mt-1 block w-full border rounded p-2"
                  required
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="carroceria" className="block font-medium">
                  Carroceria
                </label>
                <input
                  type="text"
                  id="carroceria"
                  name="carroceria"
                  value={updatedAutomovil.carroceria}
                  onChange={handleChange}
                  placeholder="Carroceria del vehiculo"
                  className="mt-1 block w-full border rounded p-2"
                  required
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="combustible" className="block font-medium">
                  Combustible
                </label>
                <input
                  type="text"
                  id="combustible"
                  name="combustible"
                  value={updatedAutomovil.combustible}
                  onChange={handleChange}
                  placeholder="Combustible del vehiculo"
                  className="mt-1 block w-full border rounded p-2"
                  required
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="cabina" className="block font-medium">
                  Cabina
                </label>
                <input
                  type="text"
                  id="cabina"
                  name="cabina"
                  value={updatedAutomovil.cabina}
                  onChange={handleChange}
                  placeholder="Cabina del vehiculo"
                  className="mt-1 block w-full border rounded p-2"
                  required
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="traccion" className="block font-medium">
                  Tracción
                </label>
                <input
                  type="text"
                  id="traccion"
                  name="traccion"
                  value={updatedAutomovil.traccion}
                  onChange={handleChange}
                  placeholder="Tracción del vehiculo"
                  className="mt-1 block w-full border rounded p-2"
                  required
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="transmision" className="block font-medium">
                  Transmision
                </label>
                <input
                  type="text"
                  id="transmision"
                  name="transmision"
                  value={updatedAutomovil.transmision}
                  onChange={handleChange}
                  placeholder="Transmision del vehiculo"
                  className="mt-1 block w-full border rounded p-2"
                  required
                  readOnly
                />
              </div> */}
            <div>
              <label htmlFor="costo" className="block font-medium">
                Costo
              </label>
              <input
                type="number"
                id="costo"
                name="costo"
                value={Number(updatedAutomovil.costo).toFixed(2)}
                onChange={handleChange}
                placeholder="Costo del vehiculo"
                className="mt-1 block w-full border rounded p-2"
                step="0.01"
                required
              />
            </div>
            <div>
              <label htmlFor="automovilActivo" className="block font-medium">
                Disponibilidad
              </label>
              <input
                type="checkbox"
                id="automovilActivo"
                name="automovilActivo"
                checked={updatedAutomovil.automovilActivo}
                onChange={handleChange}
                className="mt-1 block"
              />
            </div>
            {/* <div>
                <label htmlFor="idSegmento" className="block font-medium">
                  ID Segmento
                </label>
                <input
                  type="text"
                  id="idSegmento"
                  name="idSegmento"
                  value={updatedAutomovil.idSegmento}
                  onChange={handleChange}
                  placeholder="ID Segmento"
                  className="mt-1 block w-full border rounded p-2"
                  required
                  readOnly
                />
              </div> */}
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 hover:bg-blue-400"
            >
              Actualizar Automovil
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateAutomoviles;
