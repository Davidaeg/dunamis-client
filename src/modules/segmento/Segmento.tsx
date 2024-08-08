import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useGetSegmento } from "../../hooks/segmentos/useGetSegmento";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import ActionButtons from "../../components/ActionButtons/ActionButtons";
import Swal from "sweetalert2";
import CreateSegmentos from "./CreateSegmentos";
import { SegmentoDB } from "../automovil/automovil.types";
import { useCreateSegmentos } from "../../hooks/segmentos/useCreateSegmentos";
import { useDeleteSegmentos } from "../../hooks/segmentos/useDeleteSegmentos";
import { useUpdateSegmento } from "../../hooks/segmentos/useUpdateSegmento";
import Modal from "../../components/Modal/Modal";
import UpdateSegmentos from "./UpdateSegmentos";

export const Segmentos = () => {
  const { segmento, loading, error, refetch } = useGetSegmento();
  const [showModalCreateSegmento, setShowModalCreateSegmento] = useState(false);
  const [selectedSegmento, setSelectedSegmento] = useState<any>(null);
  const [showModalEditSegmento, setShowModalEditSegmento] = useState(false);

  const handleShowModalEditSegmento = () => setShowModalEditSegmento(true);

  const { createSegmento } = useCreateSegmentos();
  const { deleteSegmento } = useDeleteSegmentos();
  const { updateSegmento } = useUpdateSegmento();

  const handleCloseModalCreateSegmento = () => {
    setShowModalCreateSegmento(false);
  };

  const handleCloseModalEditSegmento = () => {
    setShowModalEditSegmento(false);
    setSelectedSegmento(null);
  };

  const handleEdit = (segmento: any) => {
    setSelectedSegmento(segmento);
    handleShowModalEditSegmento();
  };

  const handleShowModalCreateSegmento = () => setShowModalCreateSegmento(true);

  const handleCreate = async (segmento: SegmentoDB) => {
    try {
      await createSegmento(segmento);

      Swal.fire("¡Creado!", "El segmento ha sido creado.", "success");
      refetch();
      handleCloseModalCreateSegmento();
    } catch (err) {
      console.error("Error al crear segmento:", err);
      Swal.fire("Error", "Hubo un error al crear el segmento.", "error");
    }
  };

  const handleDelete = (idSegmento: string) => {
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
        deleteSegmento(idSegmento)
          .then(({ success, error }) => {
            if (success) {
              console.log("Segmento eliminado");
              Swal.fire(
                "¡Eliminado!",
                "El segmento ha sido eliminado.",
                "success"
              );
              refetch();
            } else {
              Swal.fire(
                "Error",
                error || "Hubo un error al eliminar el segmento.",
                "error"
              );
            }
          })
          .catch((err: any) => {
            console.error("Error al eliminar el segmento:", err);
            Swal.fire(
              "Error",
              "Hubo un error al eliminar el segmento.",
              "error"
            );
          });
      }
    });
  };
  

  const handleUpdate = (idSegmento: string, segmento: SegmentoDB) => {
    updateSegmento(idSegmento, segmento)
      .then((updatedSegmento) => {
        console.log("Segmento actualizado", updatedSegmento);
        Swal.fire(
          "¡Actualizado!",
          "El segmento ha sido actualizado.",
          "success"
        );
        refetch();
        handleCloseModalEditSegmento();
      })
      .catch((err: any) => {
        console.error("Error al actualizar segmento:", err);
        Swal.fire("Error", "Hubo un error al actualizar el segmento.", "error");
      });
  };
  
  const columns: ColDef[] = [
    { headerName: "ID Segmento", field: "idSegmento" },
    { headerName: "Nombre del Segmento", field: "nombre" },
    {
      headerName: "Acciones",
      field: "acciones",
      cellRenderer: (params: any) => (
        <ActionButtons
          onEdit={() => handleEdit(params.data)}
          onDelete={() => handleDelete(params.data.idSegmento)}
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
              onClick={handleShowModalCreateSegmento}
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Agregar Segmento
            </button>
          </div>
        </div>
      </div>

      <div className="ag-theme-quartz" style={{ height: 600, width: "100%" }}>
        <AgGridReact
          rowData={segmento}
          columnDefs={columns}
          defaultColDef={{ sortable: true, filter: true, resizable: true }}
        />
      </div>

      <Modal
        isOpen={showModalCreateSegmento}
        onClose={handleCloseModalCreateSegmento}
      >
        <CreateSegmentos onCreate={handleCreate} />
      </Modal>

      <Modal isOpen={showModalEditSegmento} onClose={handleCloseModalEditSegmento}>
        <UpdateSegmentos segmento={selectedSegmento} onUpdate={handleUpdate} />
      </Modal>

    </div>
  );
};

export default Segmentos;
