export interface ReservasDB {
  idReservacion: string;
  fechaInicio: string;
  fechaFin: string;
  kmIniciales: number;
  kmFinales: number;
  reservacionActivo: boolean;
  placa: string;
  idCliente: string;
  cliente?: ClientesDB[];
}

export interface ClientesDB {
  idCliente: string;
  categoriaLicencia: string;
  fechaEmisionLicencia: string;
  fechaVencimientoLicencia: string;
  estado: string;
  idPersona: string;
  
}