import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useGetPersonas } from "../../hooks/persona/useGetPersonas";
import { useDeletePersonas } from "../../hooks/persona/useDeletePersonas";
import { useCreatePersona } from "../../hooks/persona/useCreatePersonas";
import { useCreateDirecciones } from "../../hooks/direccion/useCreateDirecciones";
import { useCreateClientes } from "../../hooks/clientes/useCreateClientes";
import { useUpdatePersonas } from "../../hooks/persona/useUpdatePersonas";
import CreatePersona from "./CreatePersonas";
import ActionButtons from "../../components/ActionButtons/ActionButtons";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Swal from "sweetalert2";
import Modal from "../../components/Modal/Modal";
import UpdatePersonas from "./UpdatePersonas";
import { Direccion } from "../direcciones/Direcciones";
import { ClientesDB, DireccionDB, PersonaDB, UsuariosDB } from "./persona.types";
import { Clientes } from "../clientes/Clientes";
import { Usuarios } from "../users/Usuarios";
import { useCreateUsuario } from "../../hooks/user/useCreateUsers";

export const Personas = () => {
  const { personas, loading, error, refetch } = useGetPersonas();
  const { deletePersona } = useDeletePersonas();
  const { createPersona } = useCreatePersona();
  const { createDireccion } = useCreateDirecciones();
  const { createCliente } = useCreateClientes();
  const { createUsuario } = useCreateUsuario();
  const { updatePersona } = useUpdatePersonas();

  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalAddress, setShowModalAddress] = useState(false);
  const [showModalClientes, setShowModalClientes] = useState(false);
  const [showModalUsuario, setShowModalUsuario] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<any>(null);

  const handleCloseModalCreate = () => {
    setShowModalCreate(false);
  };

  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
    setSelectedPersona(null);
  };

  const handleCloseModalAddress = () => {
    setShowModalAddress(false);
  };

  const handleCloseModalClientes = () => {
    setShowModalClientes(false);
  };

  const handleCloseModalUsuarios = () => {
    setShowModalUsuario(false);
  };

  const handleShowModalCreate = () => setShowModalCreate(true);
  const handleShowModalEdit = () => setShowModalEdit(true);
  const handleShowModalAddress = () => setShowModalAddress(true);
  const handleShowModalUsuario = () => setShowModalUsuario(true);
  const handleShowModalClientes = () => setShowModalClientes(true);

  const handleEdit = (persona: any) => {
    setSelectedPersona(persona);
    handleShowModalEdit();
  };

  const handleAddress = (persona: any) => {
    setSelectedPersona(persona);
    handleShowModalAddress();
  };

  const handleClientes = (persona: any) => {
    setSelectedPersona(persona);
    handleShowModalClientes();
  };

  const handleUsuario = (persona: any) => {
    setSelectedPersona(persona);
    handleShowModalUsuario();
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

  const handleCreate = async (
    persona: PersonaDB,
    direccion: DireccionDB,
    clientes?: ClientesDB,
    usuarios?: UsuariosDB
  ) => {
    const isCliente = Boolean(clientes);
    const isUsuario = Boolean(usuarios);
  
    try {
      // Crear persona y dirección siempre
      await createPersona(persona);
      await createDireccion(direccion);
  
      // Crear cliente si se proporcionó
      if (isCliente && clientes) {
        await createCliente(clientes);
      }
  
      // Crear usuario si se proporcionó
      if (isUsuario && usuarios) {
        await createUsuario(usuarios);
      }
  
      Swal.fire(
        "¡Creado!",
        "La persona y su dirección han sido creadas." +
          (isCliente ? " El cliente también ha sido creado." : "") +
          (isUsuario ? " El usuario también ha sido creado." : ""),
        "success"
      );
      refetch();
      handleCloseModalCreate();
    } catch (err) {
      console.error("Error al crear persona y/o dirección:", err);
      Swal.fire(
        "Error",
        "Hubo un error al crear la persona y/o la dirección." +
          (isCliente ? " o el cliente." : "") +
          (isUsuario ? " o el usuario." : ""),
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
        Swal.fire("Error", "Hubo un error al actualizar la persona.", "error");
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
    { headerName: "Dirección",
      field: "direcciones",
      cellRenderer: (params: any) => (
        <button className="underline hover:text-blue-950 text-blue-500" onClick={() => handleAddress(params.data)}>Ver Direcciones</button>
      )
    },
    { headerName: "Rol",
      field: "rol",
      cellRenderer: (params: any) => {
        const { clientes, usuarios } = params.data;
        if (clientes.length > 0) {
          return <button className="underline hover:text-blue-950 text-blue-500" onClick={() => handleClientes(params.data)}>Cliente</button>;
        } else if (usuarios.length > 0) {
          return <button className="underline hover:text-blue-950 text-blue-500" onClick={() => handleUsuario(params.data)}>Personal</button>;
        } else {
          return <span>No definido</span>;
        }
      }
    },
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
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
          }}
        />
      </div>

      <Modal isOpen={showModalCreate} onClose={handleCloseModalCreate}>
        <CreatePersona onCreate={handleCreate} />
      </Modal>
      <Modal isOpen={showModalEdit} onClose={handleCloseModalEdit}>
        <UpdatePersonas persona={selectedPersona} onUpdate={handleUpdate} />
      </Modal>
      <Modal isOpen={showModalAddress} onClose={handleCloseModalAddress}>
        {selectedPersona && (
          <Direccion idPersona={selectedPersona.idPersona} />
        )}
      </Modal>


      <Modal isOpen={showModalClientes} onClose={handleCloseModalClientes}>
        {selectedPersona && (
          <Clientes idPersona={selectedPersona.idPersona} />
        )}
      </Modal>
      <Modal isOpen={showModalUsuario} onClose={handleCloseModalUsuarios}>
        {selectedPersona && (
          <Usuarios idPersona={selectedPersona.idPersona} />
        )}
      </Modal>



    </div>
  );
};

export default Personas;


