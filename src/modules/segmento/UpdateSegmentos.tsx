import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { SegmentoDB } from "../automovil/automovil.types";

interface UpdateSegmentoProps {
  segmento: SegmentoDB | null;
  onUpdate: (idSegmento: string, segmento: SegmentoDB) => void;
}

const UpdateSegmentos: React.FC<UpdateSegmentoProps> = ({ segmento, onUpdate }) => {
  const [updatedSegmento, setUpdatedSegmento] = useState<SegmentoDB>({
    idSegmento:"",
    nombre: "",
  });

  useEffect(() => {
    if (segmento) {
      setUpdatedSegmento(segmento);
    }
  }, [segmento]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedSegmento({ ...updatedSegmento, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      onUpdate(updatedSegmento.idSegmento, updatedSegmento);
    } catch (error) {
      console.error("Error actualizando persona:", error);
    }
  };

  return (
    <section>
      <div>
        <h2 className="ml-3 mt-3 text-xl font-bold text-gray-900 ">Actualizar segmento</h2>
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-gray-100">
          <div>
            <label htmlFor="nombre" className="block font-medium">Nombre del segmento</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={updatedSegmento.nombre}
              onChange={handleChange}
              placeholder="ID Persona"
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

export default UpdateSegmentos;


