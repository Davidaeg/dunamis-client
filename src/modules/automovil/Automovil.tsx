import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useGetAutomovil } from "../../hooks/automoviles/useGetAutomovil";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import ActionButtons from "../../components/ActionButtons/ActionButtons";
import Swal from "sweetalert2";
import CreateAutomoviles from "./CreateAutomoviles";
import Modal from "../../components/Modal/Modal";
import { AutomovilDB } from "./automovil.types";
import { useCreateAutomovil } from "../../hooks/automoviles/useCreateAutomovil";
import { useDeleteAutomovil } from "../../hooks/automoviles/useDeleteAutomovil";
import { useUpdateAutomovil } from "../../hooks/automoviles/useUpdateAutomovil";
import UpdateAutomoviles from "./UpdateAutomoviles";

export const Automovil = () => {
  const { automovil, loading, error, refetch } = useGetAutomovil();
  const [showModalCreateAuto, setShowModalCreateAuto] = useState(false);
  const [selectedAuto, setSelectedAuto] = useState<any>(null);
  const [showModalEditAuto, setShowModalEditAuto] = useState(false);

  const { createAutomovil } = useCreateAutomovil();
  const { deleteAutomovil } = useDeleteAutomovil();
  const { updateAutomovil } = useUpdateAutomovil();

  const handleShowModalCreateAuto = () => setShowModalCreateAuto(true);
  const handleShowModalEditAuto = () => setShowModalEditAuto(true);

  const handleCloseModalCreateAuto = () => {
    setShowModalCreateAuto(false);
  };

  const handleCloseModalEditAutomovil = () => {
    setShowModalEditAuto(false);
    setSelectedAuto(null);
  };

  const handleCreate = async (automovil: AutomovilDB) => {
    try {
      await createAutomovil(automovil);

      Swal.fire("¡Creado!", "El segmento ha sido creado.", "success");
      refetch();
      handleCloseModalCreateAuto();
    } catch (err) {
      console.error("Error al crear segmento:", err);
      Swal.fire("Error", "Hubo un error al crear el segmento.", "error");
    }
  };

  const handleEdit = (automovil: any) => {
    setSelectedAuto(automovil);
    handleShowModalEditAuto();
  };

  const handleDelete = (placa: string) => {
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
        deleteAutomovil(placa)
          .then((success) => {
            if (success) {
              console.log("Automovil eliminado");
              Swal.fire(
                "¡Eliminado!",
                "El automovil ha sido eliminado.",
                "success"
              );
              refetch();
            }
          })
          .catch((err: any) => {
            console.error("Error al eliminar el automovil:", err);
            Swal.fire(
              "Error",
              "Hubo un error al eliminar el automovil.",
              "error"
            );
          });
      }
    });
  };

  const handleUpdate = (placa: string, automovil: AutomovilDB) => {
    updateAutomovil(placa, automovil)
      .then((updatedAutomovil) => {
        console.log("Automovil actualizado", updatedAutomovil);
        Swal.fire(
          "¡Actualizado!",
          "El segmento ha sido actualizado.",
          "success"
        );
        refetch();
        handleCloseModalEditAutomovil();
      })
      .catch((err: any) => {
        console.error("Error al actualizar segmento:", err);
        Swal.fire("Error", "Hubo un error al actualizar el segmento.", "error");
      });
  };

  const columns: ColDef[] = [
    { headerName: "Placa del vehiculo", field: "placa" },
    { headerName: "Marca", field: "marca" },
    { headerName: "Modelo", field: "modelo" },
    { headerName: "Año", field: "anno" },
    { headerName: "Color", field: "color" },
    { headerName: "Estilo", field: "estilo" },
    { headerName: "Combustible", field: "combustible" },
    { headerName: "Cabina", field: "cabina" },
    { headerName: "Traccion", field: "traccion" },
    { headerName: "Transmision", field: "transmision" },
    { headerName: "Costo", field: "costo" },
    { headerName: "Disponible", field: "automovilActivo" },
    { headerName: "Segmento", field: "segmentoNombre" },
    {
      headerName: "Acciones",
      field: "acciones",
      minWidth: 155,
      cellRenderer: (params: any) => (
        <ActionButtons
          onEdit={() => handleEdit(params.data)}
          onDelete={() => handleDelete(params.data.placa)}
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
              onClick={handleShowModalCreateAuto}
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Agregar Automovil
            </button>
          </div>
        </div>
      </div>
      <div className="ag-theme-quartz" style={{ height: 600, width: "100%" }}>
        <AgGridReact
          rowData={automovil}
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
        isOpen={showModalCreateAuto}
        onClose={handleCloseModalCreateAuto}
      >
        <CreateAutomoviles onCreate={handleCreate} />
      </Modal>

      <Modal isOpen={showModalEditAuto} onClose={handleCloseModalEditAutomovil}>
        <UpdateAutomoviles automovil={selectedAuto} onUpdate={handleUpdate} />
      </Modal>
    </div>
  );
};
