import React, { useState, ChangeEvent, FormEvent } from "react";
import { DetalleFacturaDB, FacturacionDB } from "./factura.types";
import { useCreateFactura } from "../../hooks/facturacion/useCreateFactura";

interface CreateFacturacionProps {
  onCreate: (
    facturacion: FacturacionDB,
    detalleFactura: DetalleFacturaDB
  ) => void;
}

const CreateFacturacion: React.FC<CreateFacturacionProps> = ({ onCreate }) => {
  const [facturacion, setFacturacion] = useState<FacturacionDB>({
    idFactura: "",
    fecha: "",
  });

  const { createFactura } = useCreateFactura();

  const [detalleFactura, setDetalleFactura] = useState<DetalleFacturaDB>({
    idDetalleFactura: "",
    subtotal: 0.0,
    precioKmAutomovil: 0.0,
    cantidadDias: 0,
    cantidadKmRecorridos: 0,
    factura: 0,
    reservacion: 0,
  });

  const [error, setError] = useState<string | null>(null);

  const handleFacturaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFacturacion((prevFactura) => ({ ...prevFactura, [name]: value }));
  };

  const handleDetalleFacturaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetalleFactura((prevDetalleFactura) => ({
      ...prevDetalleFactura,
      [name]:
        name === "subtotal" || name === "precioKmAutomovil"
          ? parseFloat(value)
          : parseInt(value, 10),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    try {
      // Crear la factura
      const facturaData = { ...facturacion };
      const createdFactura = await createFactura(facturaData); 
  
      const detallefacturaData = {
        ...detalleFactura,
        factura: Number(createdFactura.idFactura), 
      };
  
      console.log("Factura a crear:", facturaData);
      console.log("Detalle a crear:", detallefacturaData);
      onCreate(createdFactura, detallefacturaData);
  
      // Reiniciar el formulario
      setFacturacion({
        idFactura: "",
        fecha: "",
      });
  
      setDetalleFactura({
        idDetalleFactura: "",
        subtotal: 0,
        precioKmAutomovil: 0,
        cantidadDias: 0,
        cantidadKmRecorridos: 0,
        factura: 0,
        reservacion: 0,
      });
  
      setError(null);
    } catch (error) {
      console.error("Error creando la factura:", error);
      setError("Hubo un error al crear la factura.");
    }
  };
  

  return (
    <section>
      <div>
        <h2 className="ml-3 mt-3 text-xl font-bold text-gray-900">
          Crear una nueva factura
        </h2>
        <form
          onSubmit={handleSubmit}
          className="p-4 border rounded bg-gray-100"
        >
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="space-y-4">
            <h3 className="text-lg font-bold mb-3">Datos de la Factura</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="subtotal" className="block font-medium">
                  Subtotal de la factura
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="subtotal"
                  name="subtotal"
                  value={detalleFactura.subtotal}
                  onChange={handleDetalleFacturaChange}
                  placeholder="Subtotal de la factura"
                  className="mt-1 block w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="precioKmAutomovil"
                  className="block font-medium"
                >
                  Precio Km Automovil
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="precioKmAutomovil"
                  name="precioKmAutomovil"
                  value={detalleFactura.precioKmAutomovil}
                  onChange={handleDetalleFacturaChange}
                  placeholder="Precio Km Automovil"
                  className="mt-1 block w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="cantidadDias" className="block font-medium">
                  Cantidad de días
                </label>
                <input
                  type="number"
                  id="cantidadDias"
                  name="cantidadDias"
                  value={detalleFactura.cantidadDias}
                  onChange={handleDetalleFacturaChange}
                  placeholder="Cantidad de días"
                  className="mt-1 block w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="cantidadKmRecorridos"
                  className="block font-medium"
                >
                  Cantidad Kilómetros recorridos
                </label>
                <input
                  type="number"
                  id="cantidadKmRecorridos"
                  name="cantidadKmRecorridos"
                  value={detalleFactura.cantidadKmRecorridos}
                  onChange={handleDetalleFacturaChange}
                  placeholder="Cantidad Kilómetros recorridos"
                  className="mt-1 block w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="reservacion" className="block font-medium">
                  Reserva Asociada
                </label>
                <input
                  type="text"
                  id="reservacion"
                  name="reservacion"
                  value={detalleFactura.reservacion}
                  onChange={handleDetalleFacturaChange}
                  placeholder="Reserva Asociada"
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
                Crear Factura
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateFacturacion;
