import React, { useState, ChangeEvent, FormEvent } from "react";
import { AutomovilDB } from "./automovil.types";
import { useGetSegmento } from "../../hooks/segmentos/useGetSegmento";

interface CreateAutomovilProps {
  onCreate: (automovil: AutomovilDB) => void;
}

const CreateAutomoviles: React.FC<CreateAutomovilProps> = ({ onCreate }) => {
  const [automovil, setAutomovil] = useState<AutomovilDB>({
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

  const { segmento, loading, error} = useGetSegmento();

  const handleAutomovilChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAutomovil((prevAutomovil) => ({
      ...prevAutomovil,
      [name]:
        name === "anno"
          ? parseInt(value)
          : name === "costo"
          ? parseFloat(parseFloat(value).toFixed(2)) // Formatea el costo a dos decimales
          : name === "idSegmento"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const automovilData = { ...automovil };

      console.log("Automovil a crear:", automovilData);
      onCreate(automovilData);

      setAutomovil({
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
    } catch (error) {
      console.error("Error creando automovil:", error);
    }
  };

  if (loading) {
    console.log("Cargando segmentos...");
    return null;
  }

  if (error) {
    console.error("Error al cargar segmentos:");
    return null;
  }

  return (
    <section>
      <div>
        <h2 className="ml-3 mt-3 text-xl font-bold text-gray-900">
          Crear un nuevo Automovil
        </h2>
        <form
          onSubmit={handleSubmit}
          className="p-4 border rounded bg-gray-100"
        >
          <div className="space-y-4">
            <h3 className="text-lg font-bold mb-3">Datos del Automovil</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="placa" className="block font-medium">
                  Placa del Automovil
                </label>
                <input
                  type="text"
                  id="placa"
                  name="placa"
                  value={automovil.placa}
                  onChange={handleAutomovilChange}
                  placeholder="Placa del Automovil"
                  className="mt-1 block w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="marca" className="block font-medium">
                  Marca del vehiculo
                </label>
                <input
                  type="text"
                  id="marca"
                  name="marca"
                  value={automovil.marca}
                  onChange={handleAutomovilChange}
                  placeholder="Marca del vehiculo"
                  className="mt-1 block w-full border rounded p-2"
                  required
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
                  value={automovil.modelo}
                  onChange={handleAutomovilChange}
                  placeholder="Modelo del vehiculo"
                  className="mt-1 block w-full border rounded p-2"
                  required
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
                  value={automovil.anno}
                  onChange={handleAutomovilChange}
                  placeholder="Año del vehiculo"
                  className="mt-1 block w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="color" className="block font-medium">
                  Color del vehiculo
                </label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={automovil.color}
                  onChange={handleAutomovilChange}
                  placeholder="Color del vehiculo"
                  className="mt-1 block w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="estilo" className="block font-medium">
                  Estilo del vehiculo
                </label>
                <input
                  type="text"
                  id="estilo"
                  name="estilo"
                  value={automovil.estilo}
                  onChange={handleAutomovilChange}
                  placeholder="Estilo del vehiculo"
                  className="mt-1 block w-full border rounded p-2"
                  required
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
                  value={automovil.carroceria}
                  onChange={handleAutomovilChange}
                  placeholder="Carroceria del vehiculo"
                  className="mt-1 block w-full border rounded p-2"
                  required
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
                  value={automovil.combustible}
                  onChange={handleAutomovilChange}
                  placeholder="Combustible del vehiculo"
                  className="mt-1 block w-full border rounded p-2"
                  required
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
                  value={automovil.cabina}
                  onChange={handleAutomovilChange}
                  placeholder="Cabina del vehiculo"
                  className="mt-1 block w-full border rounded p-2"
                  required
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
                  value={automovil.traccion}
                  onChange={handleAutomovilChange}
                  placeholder="Tracción del vehiculo"
                  className="mt-1 block w-full border rounded p-2"
                  required
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
                  value={automovil.transmision}
                  onChange={handleAutomovilChange}
                  placeholder="Transmision del vehiculo"
                  className="mt-1 block w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="costo" className="block font-medium">
                  Costo
                </label>
                <input
                  type="number"
                  id="costo"
                  name="costo"
                  value={Number(automovil.costo).toFixed(2)}
                  onChange={handleAutomovilChange}
                  placeholder="Costo del vehiculo"
                  className="mt-1 block w-full border rounded p-2"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label htmlFor="idSegmento" className="block font-medium">
                  Segmento
                </label>
                <select
                  id="idSegmento"
                  name="idSegmento"
                  value={automovil.idSegmento}
                  onChange={handleAutomovilChange}
                  className="mt-1 block w-full border rounded p-2"
                  required
                >
                  <option value={0} disabled>
                    Seleccione un segmento
                  </option>
                  {segmento.map((segmento) => (
                    <option
                      key={segmento.idSegmento}
                      value={segmento.idSegmento}
                    >
                      {segmento.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900"
              >
                Crear Automovil
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateAutomoviles;
