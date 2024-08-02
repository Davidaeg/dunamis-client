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
}
