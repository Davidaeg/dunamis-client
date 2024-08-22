import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useGetFactura } from "../../hooks/facturacion/useGetFactura";
import { useDeleteFactura } from "../../hooks/facturacion/useDeleteFactura";
import { useCreateFactura } from "../../hooks/facturacion/useCreateFactura";
import { useCreateDetalleFactura } from "../../hooks/detallefactura/useCreateDetalleFactura";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Modal from "../../components/Modal/Modal";
import Swal from "sweetalert2";
import ActionButtons from "../../components/ActionButtons/ActionButtons";
import CreateFacturacion from "./CreateFacturacion";
import { DetalleFacturaDB, FacturacionDB } from "./factura.types";
import { useGetDetalleFactura } from "../../hooks/detallefactura/useGetDetalleFactura";
import { useDeleteDetalleFactura } from "../../hooks/detallefactura/useDeleteDetalleFactura";

export const Facturacion = () => {
  const { detalleFactura, loading, error, refetch } = useGetDetalleFactura();
  const [showModalCreateFactura, setShowModalCreateFactura] = useState(false);

  const { createFactura } = useCreateFactura();
  const { createDetalleFactura } = useCreateDetalleFactura();
  const { deleteDetalleFactura } = useDeleteDetalleFactura();

  const handleShowModalCreateFactura = () => setShowModalCreateFactura(true);
  const handleCloseModalCreateFactura = () => setShowModalCreateFactura(false);

  const handleEdit = (facturacion: any) => {

  };

  const handleCreate = async (facturacion: FacturacionDB, detalleFactura: DetalleFacturaDB) => {
    try {
      const createdFactura = await createFactura(facturacion);
      const facturaId = createdFactura?.idFactura;
  
      if (facturaId) {
        const detalleFacturaWithId = {
          ...detalleFactura,
          idFactura: facturaId,
        };
        await createDetalleFactura(detalleFacturaWithId);
  
        Swal.fire("¡Creado!", "La factura y su detalle han sido creados.", "success");
        refetch();
        handleCloseModalCreateFactura();
      } else {
        throw new Error("No se pudo obtener el ID de la factura creada.");
      }
    } catch (err) {
      console.error("Error al crear la factura o el detalle:", err);
      Swal.fire("Error", "Hubo un error al crear la factura o el detalle.", "error");
    }
  };

  const handleDelete = (idDetalleFactura: string) => {
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
        deleteDetalleFactura(idDetalleFactura)
          .then(({ success, error }) => {
            if (success) {
              Swal.fire(
                "¡Eliminado!",
                "La factura ha sido eliminada.",
                "success"
              );
              refetch();
            } else if (error) {
              Swal.fire("Error", error, "error");
            }
          })
          .catch((err: any) => {
            console.error("Error al eliminar la factura:", err);
            Swal.fire(
              "Error",
              "Hubo un error al eliminar la factura.",
              "error"
            );
          });
      }
    });
  };


  const columns: ColDef[] = [
    { headerName: "ID Detalle Factura", field: "idDetalleFactura" },
    { headerName: "Subtotal", field: "subtotal" },
    { headerName: "Precio Km Automovil", field: "precioKmAutomovil" },
    { headerName: "Cantidad Dias", field: "cantidadDias" },
    { headerName: "Cantidad Km Recorridos", field: "cantidadKmRecorridos" },
    { headerName: "Fecha Factura", field: "facturaFecha" },
    { headerName: "N° Reserva Asociada", field: "reservacionId" },
    {
      headerName: "Acciones",
      field: "acciones",
      cellRenderer: (params: any) => (
        <ActionButtons
          onEdit={() => handleEdit(params.data)}
          onDelete={() => handleDelete(params.data.idDetalleFactura)}
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
              onClick={handleShowModalCreateFactura}
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Agregar Nueva Factura
            </button>
          </div>
        </div>
      </div>
      <div className="ag-theme-quartz" style={{ height: 600, width: "100%" }}>
        <AgGridReact
          rowData={detalleFactura}
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
        isOpen={showModalCreateFactura}
        onClose={handleCloseModalCreateFactura}
      >
        <CreateFacturacion onCreate={handleCreate} />
      </Modal>
    </div>
  );
};
