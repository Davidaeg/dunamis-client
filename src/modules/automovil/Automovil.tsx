import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useGetAutomovil } from "../../hooks/automoviles/useGetAutomovil";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export const Automovil = () => {
  const { automovil, loading, error } = useGetAutomovil();

  const columns: ColDef[] = [
    { headerName: "Placa del vehiculo", field: "placa" },
    { headerName: "Marca", field: "marca" },
    { headerName: "Modelo", field: "modelo" },
    { headerName: "Año", field: "anno" },
    { headerName: "Color", field: "color" },
    { headerName: "Estilo", field: "estilo" },
    { headerName: "combustible", field: "combustible" },
    { headerName: "Cabina", field: "cabina" },
    { headerName: "Traccion", field: "traccion" },
    { headerName: "Transmision", field: "transmision" },
    { headerName: "Costo", field: "costo" },
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
        rowData={automovil}
        columnDefs={columns}
        defaultColDef={{ sortable: true, filter: true, resizable: true , flex: 1 }}
      />
    </div>
  );
};
