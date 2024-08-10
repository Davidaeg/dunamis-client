import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { ReservasDB } from "./reservas.types";

interface UpdateReservasProps {
  reservas: ReservasDB | null;
  onUpdate: (idReservacion: string, reservas: ReservasDB) => void;
}

const UpdateReservaciones: React.FC<UpdateReservasProps> = ({
  reservas,
  onUpdate,
}) => {
  const [updatedReserva, setUpdatedReserva] = useState<ReservasDB>({
    idReservacion: "",
    fechaInicio: "",
    fechaFin: "",
    kmIniciales: 0,
    kmFinales: 0,
    reservacionActivo: true,
    placa: "",
    idCliente: "",
  });

  useEffect(() => {
    if (reservas) {
      setUpdatedReserva(reservas);
    }
  }, [reservas]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setUpdatedReserva((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      onUpdate(updatedReserva.idReservacion, updatedReserva);
    } catch (error) {
      console.error("Error actualizando reserva:", error);
    }
  };

  return (
    <section>
      <div>
        <h2 className="ml-3 mt-3 text-xl font-bold text-gray-900 ">
          Actualizar Reserva
        </h2>
        <form
          onSubmit={handleSubmit}
          className="p-4 border rounded bg-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fechaFin" className="block font-medium">
                Fecha Final de la Reserva
              </label>
              <input
                type="date"
                id="fechaFin"
                name="fechaFin"
                value={updatedReserva.fechaFin}
                onChange={handleChange}
                placeholder="Placa del Automovil"
                className="mt-1 block w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="kmFinales" className="block font-medium">
                Kilometros Finales
              </label>
              <input
                type="text"
                id="kmFinales"
                name="kmFinales"
                value={updatedReserva.kmFinales}
                onChange={handleChange}
                placeholder="Color del vehiculo"
                className="mt-1 block w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="reservacionActivo" className="block font-medium">
                Disponibilidad
              </label>
              <input
                type="checkbox"
                id="reservacionActivo"
                name="reservacionActivo"
                checked={updatedReserva.reservacionActivo}
                onChange={handleChange}
                className="mt-1 block"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 hover:bg-blue-400"
            >
              Actualizar Reserva
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateReservaciones;
