export interface DireccionDB {
  idDireccion: string;
  Direccion: string;
  Provincia: string;
  Canton: string;
  Distrito: string;
  idPersona: string;
}

export interface PersonaDB {
  idPersona: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  fechaNacimiento: string;
  numeroTelefono: string;
  numeroCelular: string;
  email: string;
  direcciones?: DireccionDB[];
  clientes?: ClientesDB[];
  usuarios?: UsuariosDB[];
}

export interface ClientesDB {
  idCliente: string;
  categoriaLicencia: string;
  fechaEmisionLicencia: string;
  fechaVencimientoLicencia: string;
  estado: string;
  idPersona: string;
}
export interface UsuariosDB {
  idUsuario: string;
  nombre: string;
  contrasenna: string;
  idRol: string;
  idPersona: string;
}