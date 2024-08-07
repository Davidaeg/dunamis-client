import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useGetAutomovil } from "../../hooks/automoviles/useGetAutomovil";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import ActionButtons from "../../components/ActionButtons/ActionButtons";
import Swal from "sweetalert2";


export const Automovil = () => {
  const { automovil, loading, error } = useGetAutomovil();

  const handleEdit = (persona: any) => {
  };


  const handleDelete = (idPersona: string) => {
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
            ((err: any) => {
            console.error("Error al eliminar persona:", err);
            Swal.fire(
              "Error",
              "Hubo un error al eliminar la persona.",
              "error"
            );
          });
      }
    });
  };

  
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
    {
      headerName: "Acciones",
      field: "acciones",
      cellRenderer: (params: any) => (
        <ActionButtons
          onEdit={() => handleEdit(params.data)}
          onDelete={() => handleDelete(params.data.idPersona)}
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
    <div className="ag-theme-quartz" style={{ height: 600, width: "100%" }}>
      <AgGridReact
        rowData={automovil}
        columnDefs={columns}
        defaultColDef={{ sortable: true, filter: true, resizable: true , flex: 1 }}
      />
    </div>
  );
};
