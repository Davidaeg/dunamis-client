import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useGetUsers } from "../../hooks/user/useGetUsers";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export const Users = () => {
  const { users, loading, error } = useGetUsers();

  const columns: ColDef[] = [
    { headerName: "ID", field: "idUsuario" },
    { headerName: "Nombre", field: "nombreUsuario" },
    { headerName: "Contraseña", field: "contrasenna" },
    { headerName: "Rol", field: "idRol" },
    { headerName: "idPersona", field: "idPersona" },
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
        rowData={users}
        columnDefs={columns}
        defaultColDef={{ sortable: true, filter: true, resizable: true }}
      />
    </div>
  );
};
