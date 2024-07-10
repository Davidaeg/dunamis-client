import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useGetPersonas } from "../../hooks/persona/useGetPersonas";
import CreatePersona from "./CreatePersonas";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export const Personas = () => {
  const { personas, loading, error } = useGetPersonas();

  const columns: ColDef[] = [
    { headerName: "ID", field: "idPersona" },
    { headerName: "Nombre", field: "nombre" },
    { headerName: "Primer Apellido", field: "apellido1" },
    { headerName: "Segundo Apellido", field: "apellido2" },
    { headerName: "Fecha Nacimiento", field: "fechaNacimiento" },
    { headerName: "Numero Telefono", field: "numeroTelefono" },
    { headerName: "Numero Celular", field: "numeroCelular" },
    { headerName: "Email", field: "email" },
  ];

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
        <AgGridReact
          rowData={personas}
          columnDefs={columns}
          defaultColDef={{ sortable: true, filter: true, resizable: true }}
        />
      </div>

      <button
        onClick={handleShowModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Agregar Persona
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" onClick={handleCloseModal}></div>
          <div className="relative bg-white rounded-lg border-2 shadow-lg max-w-lg w-full mx-auto p-6">
            <CreatePersona />

            <button
              onClick={handleCloseModal}
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800"
            >
              <svg
                className="h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.293 3.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Personas;





