import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  SegmentoDB,
} from "../automovil/automovil.types";
import { Automovil } from "../automovil/Automovil";

interface CreateSegmentoProps {
  onCreate: (
    segmento: SegmentoDB,
  ) => void;
}


const CreateSegmentos: React.FC<CreateSegmentoProps> = ({ onCreate }) => {
  const [segmento, setSegmento] = useState<SegmentoDB>({
    idSegmento:"",
    nombre: "",
    automoviles: [],
  });


  const handleSegmentoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSegmento((prevSegmento) => ({ ...prevSegmento, [name]: value }));
  };



  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const segmentData = { ...segmento};

      console.log("Segmento a crear:", segmentData);
      onCreate(segmentData);

      setSegmento({
        idSegmento: "",
        nombre: "",
        automoviles: [],
      });

    } catch (error) {
      console.error("Error creando persona:", error);
    }
  };
  return (
    <section>
      <div>
        <h2 className="ml-3 mt-3 text-xl font-bold text-gray-900">
          Crear un nuevo Segmento
        </h2>
        <form
          onSubmit={handleSubmit}
          className="p-4 border rounded bg-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="space-y-4">
            <h3 className="text-lg font-bold mb-3">Datos del segmento</h3>
            <div>
              <label htmlFor="nombre" className="block font-medium">
                Nombre del Segmento
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={segmento.nombre}
                onChange={handleSegmentoChange}
                placeholder="Nombre del Segmento"
                className="mt-1 block w-full border rounded p-2"
                required
              />
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

export default CreateSegmentos;
