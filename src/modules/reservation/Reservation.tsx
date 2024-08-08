import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useGetReservacion } from "../../hooks/reservaciones/useGetReservacion";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export const Reservation = () => {
  const { reservas, loading, error, refetch } = useGetReservacion();

  const columns: ColDef[] = [
    { headerName: "ID Reserva", field: "idReservacion" },
    { headerName: "Fecha Inicio", field: "fechaInicio" },
    { headerName: "Fecha Fin", field: "fechaFin" },
    { headerName: "Kilometros iniciales", field: "kmIniciales" },
    { headerName: "Kilometros Finales", field: "kmFinales" },
    { headerName: "Datos del vehiculo", field: "placa" },
    { headerName: "Datos del cliente", field: "idCliente" },
    { headerName: "Estado de la reserva", field: "reservacionActivo" },
    { headerName: "Acciones", field: "" },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="ag-theme-quartz" style={{ height: 600, width: "100%" }}>
      <AgGridReact
        rowData={reservas}
        columnDefs={columns}
        defaultColDef={{ sortable: true, filter: true, resizable: true }}
      />
    </div>
  );
};
