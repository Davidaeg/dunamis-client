import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useGetReservacion } from "../../hooks/reservaciones/useGetReservacion";
import { useCreateReservacion } from "../../hooks/reservaciones/useCreateReservacion";
import { useDeleteReservacion } from "../../hooks/reservaciones/useDeleteReservacion";
import { useUpdateReservacion } from "../../hooks/reservaciones/useUpdateReservacion";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ReservasDB } from "./reservas.types";
import Modal from "../../components/Modal/Modal";
import Swal from "sweetalert2";
import ActionButtons from "../../components/ActionButtons/ActionButtons";
import CreateReservaciones from "./CreateReservaciones";
import UpdateReservaciones from "./UpdateReservaciones";
import { ClientesReservas } from "../clientes/ClientesReservas";
import { AutomovilReservas } from "../automovil/AutomovilReservas";

export const Reservation = () => {
  const { reservas, loading, error, refetch } = useGetReservacion();
  const [showModalCreateReserva, setShowModalCreateReserva] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState<any>(null);
  const [showModalEditReserva, setShowModalEditReserva] = useState(false);

  const { createReservacion } = useCreateReservacion();
  const { deleteReservacion } = useDeleteReservacion();
  const { updateReservacion } = useUpdateReservacion();

  const [showModalEditCliente, setShowModalEditCliente] = useState(false);
  const [showModalEditAutomovil, setShowModalEditAutomovil] = useState(false);
  const [selectedClienteId, setSelectedClienteId] = useState<string | null>(null);
  const [selectedAutomovilId, setSelectedAutomovilId] = useState<string | null>(null);

  const handleShowModalCreateReserva = () => setShowModalCreateReserva(true);
  const handleShowModalEditReserva = () => setShowModalEditReserva(true);
  const handleCloseModalCreateReserva = () => setShowModalCreateReserva(false);
  const handleCloseModalEditReserva = () => {
    setShowModalEditReserva(false);
    setSelectedReserva(null);
  };

  const handleShowModalWithCliente = (idCliente: string) => {
    setSelectedClienteId(idCliente);
    setShowModalEditCliente(true);
  };

  const handleShowModalWithAutomovil = (placa: string) => {
    setSelectedAutomovilId(placa);
    setShowModalEditAutomovil(true);
  };

  const handleCloseModalWithCliente = () => {
    setShowModalEditCliente(false);
    setSelectedClienteId(null);
  };

  const handleCloseModalWithAutomovil = () => {
    setShowModalEditAutomovil(false);
    setSelectedAutomovilId(null);
  };

  const handleEdit = (reservas: any) => {
    setSelectedReserva(reservas);
    handleShowModalEditReserva();
  };

  const handleCreate = async (reservas: ReservasDB) => {
    try {
      await createReservacion(reservas);
      Swal.fire("¡Creado!", "La reserva ha sido creada.", "success");
      refetch();
      handleCloseModalCreateReserva();
    } catch (err) {
      console.error("Error al crear reserva:", err);
      Swal.fire("Error", "Hubo un error al crear la reserva.", "error");
    }
  };

  const handleDelete = (idReservacion: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReservacion(idReservacion)
          .then(({ success, error }) => {
            if (success) {
              Swal.fire("¡Eliminado!", "La reserva ha sido eliminada.", "success");
              refetch();
            } else if (error) {
              Swal.fire("Error", error, "error");
            }
          })
          .catch((err: any) => {
            console.error("Error al eliminar la reserva:", err);
            Swal.fire("Error", "Hubo un error al eliminar la reserva.", "error");
          });
      }
    });
  };

  const handleUpdate = (idReservacion: string, reservas: ReservasDB) => {
    updateReservacion(idReservacion, reservas)
      .then((updatedReserva) => {
        console.log("Reserva actualizada", updatedReserva);
        Swal.fire("¡Actualizado!", "La reserva ha sido actualizada.", "success");
        refetch();
        handleCloseModalEditReserva();
      })
      .catch((err: any) => {
        console.error("Error al actualizar reserva:", err);
        Swal.fire("Error", "Hubo un error al actualizar la reserva.", "error");
      });
  };

  const columns: ColDef[] = [
    { headerName: "ID Reserva", field: "idReservacion" },
    { headerName: "Fecha Inicio", field: "fechaInicio" },
    { headerName: "Fecha Fin", field: "fechaFin" },
    { headerName: "Kilometros iniciales", field: "kmIniciales" },
    { headerName: "Kilometros Finales", field: "kmFinales" },
    { headerName: "Datos del vehiculo", field: "autoPlaca",
      cellRenderer: (params: any) => (
        <span
          style={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
          }}
          onClick={() => handleShowModalWithAutomovil(params.value)}
        >
          {params.value}
        </span>
      ),
     },
    {
      headerName: "Datos del cliente",
      field: "idCliente",
      cellRenderer: (params: any) => (
        <span
          style={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
          }}
          onClick={() => handleShowModalWithCliente(params.value)}
        >
          {params.value}
        </span>
      ),
    },
    { headerName: "Estado de la reserva", field: "reservacionActivo" },
    {
      headerName: "Acciones",
      field: "acciones",
      minWidth: 155,
      cellRenderer: (params: any) => (
        <ActionButtons
          onEdit={() => handleEdit(params.data)}
          onDelete={() => handleDelete(params.data.idReservacion)}
        />
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="bg-white dark:bg-gray-200 relative shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <button
              onClick={handleShowModalCreateReserva}
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Agregar Nueva Reserva
            </button>
          </div>
        </div>
      </div>
      <div className="ag-theme-quartz" style={{ height: 600, width: "100%" }}>
        <AgGridReact
          rowData={reservas}
          columnDefs={columns}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
          }}
        />
      </div>
      <Modal
        isOpen={showModalCreateReserva}
        onClose={handleCloseModalCreateReserva}
      >
        <CreateReservaciones onCreate={handleCreate} />
      </Modal>

      <Modal
        isOpen={showModalEditReserva}
        onClose={handleCloseModalEditReserva}
      >
        <UpdateReservaciones
          reservas={selectedReserva}
          onUpdate={handleUpdate}
        />
      </Modal>

      <Modal
        isOpen={showModalEditCliente}
        onClose={handleCloseModalWithCliente}
      >
        {selectedClienteId && <ClientesReservas idCliente={selectedClienteId} />}
      </Modal>

      <Modal
        isOpen={showModalEditAutomovil}
        onClose={handleCloseModalWithAutomovil}
      >
        {selectedAutomovilId && <AutomovilReservas placa={selectedAutomovilId} />}
      </Modal>
    </div>
  );
};

