import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useGetSegmento } from "../../hooks/segmentos/useGetSegmento";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export const Automovil = () => {
  const { segmento, loading, error } = useGetSegmento();

  const columns: ColDef[] = [
    { headerName: "ID Segmento", field: "idSegmento" },
    { headerName: "Nombre Segmento", field: "nombre" },
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
        rowData={segmento}
        columnDefs={columns}
        defaultColDef={{ sortable: true, filter: true, resizable: true }}
      />
    </div>
  );
};
