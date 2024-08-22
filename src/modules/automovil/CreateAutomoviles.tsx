import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { AutomovilDB, TipoAutoDB } from "./automovil.types";
import { useGetSegmento } from "../../hooks/segmentos/useGetSegmento";
import { useGetTipo } from "../../hooks/tipo/useGetTipo";

interface CreateAutomovilProps {
  onCreate: (automovil: AutomovilDB, tipoAuto: TipoAutoDB) => void;
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

  const [TipoAuto, setTipoAuto] = useState<TipoAutoDB>({
    id: "",
    tipo: "",
    automovil: "",
  });

  const { segmento, loading, error } = useGetSegmento();
  const { tipoCarro, loading: Load, error: Err } = useGetTipo();

  useEffect(() => {
    setTipoAuto((prevTipoAuto) => ({
      ...prevTipoAuto,
      automovil: automovil.placa,
    }));
  }, [automovil.placa]);

  const handleAutomovilChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAutomovil((prevAutomovil) => ({
      ...prevAutomovil,
      [name]:
        name === "anno" || name === "idSegmento"
          ? parseInt(value)
          : name === "costo"
          ? parseFloat(parseFloat(value).toFixed(2))
          : value,
    }));
  };

  const handleTipoAutoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTipoAuto((prevTipoAuto) => ({
      ...prevTipoAuto,
      [name]: name === "tipo" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const automovilData = { ...automovil };
      const tipoAutomovilData = { ...TipoAuto };

      console.log("Automovil a crear:", automovilData);
      console.log("Tipo de automovil a crear:", tipoAutomovilData);

      onCreate(automovilData, tipoAutomovilData);

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

      setTipoAuto({
        id: "",
        tipo: "",
        automovil: "",
      });
    } catch (error) {
      console.error("Error creando automovil:", error);
    }
  };

  if (loading || Load) {
    return <p>Cargando segmentos y tipos...</p>;
  }

  if (error || Err) {
    console.error("Error al cargar segmentos o tipos:");
    return <p>Error al cargar los datos.</p>;
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
              <div>
                <label htmlFor="tipo" className="block font-medium">
                  Tipo de Automovil
                </label>
                <select
                  id="tipo"
                  name="tipo"
                  value={TipoAuto.tipo || ""} // Asegúrate de que "" sea el valor inicial adecuado
                  onChange={handleTipoAutoChange}
                  className="mt-1 block w-full border rounded p-2"
                  required
                >
                  <option value="" disabled>
                    Seleccione un tipo
                  </option>
                  {tipoCarro.map((tipo) => (
                    <option key={tipo.idTipo} value={tipo.idTipo}>
                      {tipo.nombre}
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
