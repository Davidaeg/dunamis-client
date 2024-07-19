import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useGetPersonas } from "../../hooks/persona/useGetPersonas";
import { useDeletePersonas } from "../../hooks/persona/useDeletePersonas";
import { useCreatePersona } from "../../hooks/persona/useCreatePersonas";
import { useCreateDirecciones } from "../../hooks/direccion/useCreateDirecciones";
import { useUpdatePersonas } from "../../hooks/persona/useUpdatePersonas";
import CreatePersona from "./CreatePersonas";
import ActionButtons from "../../components/ActionButtons/ActionButtons";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Swal from "sweetalert2";
import Modal from "../../components/Modal/Modal";
import UpdatePersonas from "./UpdatePersonas";
import { DireccionDB, PersonaDB } from "./persona.types";

export const Personas = () => {
  const { personas, loading, error, refetch } = useGetPersonas();
  const { deletePersona } = useDeletePersonas();
  const { createPersona } = useCreatePersona();
  const { createDireccion } = useCreateDirecciones();
  const { updatePersona } = useUpdatePersonas();

  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);

  const handleCloseModalCreate = () => {
    setShowModalCreate(false);
  };

  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
    setSelectedPersona(null);
  };

  const handleShowModalCreate = () => setShowModalCreate(true);
  const handleShowModalEdit = () => setShowModalEdit(true);

  const handleEdit = (persona: any) => {
    setSelectedPersona(persona);
    handleShowModalEdit();
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
        deletePersona(idPersona)
          .then((success) => {
            if (success) {
              console.log("Persona eliminada");
              Swal.fire(
                "¡Eliminado!",
                "La persona ha sido eliminada.",
                "success"
              );
              refetch();
            }
          })
          .catch((err: any) => {
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

  const handleCreate = async (persona: PersonaDB, direccion: DireccionDB) => {
    try {

      await createPersona(persona);
      await createDireccion(direccion);

      Swal.fire(
        "¡Creado!",
        "La persona y su dirección han sido creadas.",
        "success"
      );
      refetch();
      handleCloseModalCreate();
    } catch (err) {
      console.error("Error al crear persona y/o dirección:", err);
      Swal.fire(
        "Error",
        "Hubo un error al crear la persona y/o la dirección.",
        "error"
      );
    }
  };
  

  const handleUpdate = (idPersona: string, persona: PersonaDB) => {
    updatePersona(idPersona, persona)
      .then((updatedPersona) => {
        console.log("Persona actualizada", updatedPersona);
        Swal.fire(
          "¡Actualizado!",
          "La persona ha sido actualizada.",
          "success"
        );
        refetch();
        handleCloseModalEdit();
      })
      .catch((err: any) => {
        console.error("Error al actualizar persona:", err);
        Swal.fire(
          "Error",
          "Hubo un error al actualizar la persona.",
          "error"
        );
      });
  };

  const columns: ColDef[] = [
    { headerName: "ID", field: "idPersona" },
    { headerName: "Nombre", field: "nombre" },
    { headerName: "Primer Apellido", field: "apellido1" },
    { headerName: "Segundo Apellido", field: "apellido2" },
    { headerName: "Fecha Nacimiento", field: "fechaNacimiento" },
    { headerName: "Numero Telefono", field: "numeroTelefono" },
    { headerName: "Numero Celular", field: "numeroCelular" },
    { headerName: "Email", field: "email" },
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
    <div>
      <div className="bg-white dark:bg-gray-200 relative shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <button
              onClick={handleShowModalCreate}
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Agregar Persona
            </button>
          </div>
        </div>
      </div>

      <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
        <AgGridReact
          rowData={personas}
          columnDefs={columns}
          defaultColDef={{ sortable: true, filter: true, resizable: true }}
        />
      </div>

      <Modal isOpen={showModalCreate} onClose={handleCloseModalCreate}>
        <CreatePersona onCreate={handleCreate} />
      </Modal>
      <Modal isOpen={showModalEdit} onClose={handleCloseModalEdit}>
        <UpdatePersonas persona={selectedPersona} onUpdate={handleUpdate} />
      </Modal>
    </div>
  );
};

export default Personas;


