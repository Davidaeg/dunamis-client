import React, { useState, ChangeEvent, FormEvent } from "react";
import { ReservasDB } from "./reservas.types";
import { useGetAutomovilDisponible } from "../../hooks/automoviles/useGetAutomovilDisponible";
import { useGetClientesAll } from "../../hooks/clientes/useGetClientesAll";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";

interface CreateReservaProps {
  onCreate: (reservas: ReservasDB) => void;
}

const CreateReservaciones: React.FC<CreateReservaProps> = ({ onCreate }) => {
  const [reservas, setReservas] = useState<ReservasDB>({
    idReservacion: "",
    fechaInicio: "",
    fechaFin: "",
    kmIniciales: 0,
    kmFinales: 0,
    reservacionActivo: true,
    placa: "",
    idCliente: "",
  });

  const [selectedAuto, setSelectedAuto] = useState<any>(null);
  const [selectedCliente, setSelectedCliente] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    automovil,
    loading: LoadReserva,
    error: errReserva,
  } = useGetAutomovilDisponible();
  const {
    clientesAll,
    loading: LoadClientes,
    error: errClientes,
  } = useGetClientesAll();

  const handleReservaChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setReservas((prevReservas) => {
      if (name === "kmIniciales" || name === "kmFinales") {
        return { ...prevReservas, [name]: parseInt(value) };
      }
      return { ...prevReservas, [name]: value };
    });
  };

  const handleAutoSelection = (autoPlaca: string) => {
    setSelectedAuto(autoPlaca);
    setReservas((prevReservas) => ({ ...prevReservas, placa: autoPlaca }));
  };

  const handleClienteSelection = (Cliente: string) => {
    setSelectedCliente(Cliente);
    setReservas((prevReservas) => ({ ...prevReservas, idCliente: Cliente }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedAuto) {
      setError(" Seleccionar vehículo para agregar la nueva reserva");
      return;
    }
  
    if (!selectedCliente) {
      setError(" Seleccionar cliente para agregar la nueva reserva");
      return;
    }

    try {
      const reservaData = { ...reservas };

      console.log("Reserva a crear:", reservaData);
      onCreate(reservaData);

      setReservas({
        idReservacion: "",
        fechaInicio: "",
        fechaFin: "",
        kmIniciales: 0,
        kmFinales: 0,
        reservacionActivo: true,
        placa: "",
        idCliente: "",
      });
      setSelectedAuto(null);
      setSelectedCliente(null);
      setError(null);
    } catch (error) {
      console.error("Error creando la reserva:", error);
    }
  };

  if (LoadReserva || LoadClientes) {
    console.log("Cargando...");
    return null;
  }

  if (errReserva || errClientes) {
    console.error("Error al cargar:");
    return null;
  }

  const autoColumns: ColDef[] = [
    { headerName: "Placa", field: "placa" },
    { headerName: "Marca", field: "marca" },
    { headerName: "Modelo", field: "modelo" },
    { headerName: "Segmento", field: "segmentoNombre" },
  ];

  const clienteColumns: ColDef[] = [
    { headerName: "N° Licencia", field: "idCliente" },
    { headerName: "Categoria Licencia", field: "categoriaLicencia" },
    { headerName: "Estado", field: "estado" },
  ];

  return (
    <section>
      <div>
        <h2 className="ml-3 mt-3 text-xl font-bold text-gray-900">
          Crear una nueva Reserva
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
            <h3 className="text-lg font-bold mb-3">Datos de la Reserva</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fechaInicio" className="block font-medium">
                  Fecha Inicio de la reserva
                </label>
                <input
                  type="date"
                  id="fechaInicio"
                  name="fechaInicio"
                  value={reservas.fechaInicio}
                  onChange={handleReservaChange}
                  placeholder="Placa del Automovil"
                  className="mt-1 block w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="fechaFin" className="block font-medium">
                  Fecha Final de la reserva
                </label>
                <input
                  type="date"
                  id="fechaFin"
                  name="fechaFin"
                  value={reservas.fechaFin}
                  onChange={handleReservaChange}
                  placeholder="Marca del vehiculo"
                  className="mt-1 block w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="kmIniciales" className="block font-medium">
                  Kilometros Iniciales del automovil
                </label>
                <input
                  type="text"
                  id="kmIniciales"
                  name="kmIniciales"
                  value={reservas.kmIniciales}
                  onChange={handleReservaChange}
                  placeholder="Modelo del vehiculo"
                  className="mt-1 block w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="kmFinales" className="block font-medium">
                  Kilometros Finales del automovil
                </label>
                <input
                  type="text"
                  id="kmFinales"
                  name="kmFinales"
                  value={reservas.kmFinales}
                  onChange={handleReservaChange}
                  placeholder="Año del vehiculo"
                  className="mt-1 block w-full border rounded p-2"
                  required
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="placa" className="block font-medium">
                  Automovil Disponible
                </label>
                <div
                  className="ag-theme-alpine"
                  style={{ height: 200, width: "100%" }}
                >
                  <AgGridReact
                    rowData={automovil}
                    columnDefs={autoColumns}
                    defaultColDef={{
                      sortable: true,
                      filter: true,
                      resizable: true,
                      flex: 1,
                    }}
                    rowSelection="single"
                    onSelectionChanged={(event) => {
                      const selectedNodes = event.api.getSelectedNodes();
                      const selectedData = selectedNodes.map(
                        (node) => node.data
                      );
                      if (selectedData.length > 0) {
                        const selectedPlaca = selectedData[0].placa;
                        handleAutoSelection(selectedPlaca);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label htmlFor="idCliente" className="block font-medium">
                  Cliente Disponible
                </label>
                <div
                  className="ag-theme-alpine"
                  style={{ height: 200, width: "100%" }}
                >
                  <AgGridReact
                    rowData={clientesAll}
                    columnDefs={clienteColumns}
                    defaultColDef={{
                      sortable: true,
                      filter: true,
                      resizable: true,
                      flex: 1,
                    }}
                    rowSelection="single"
                    onSelectionChanged={(event) => {
                      const selectedClienteNodes = event.api.getSelectedNodes();
                      const selectedClienteData = selectedClienteNodes.map(
                        (node) => node.data
                      );
                      if (selectedClienteData.length > 0) {
                        const selectedCliente = selectedClienteData[0].idCliente;
                        handleClienteSelection(selectedCliente);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900"
              >
                Crear Reserva
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateReservaciones;
