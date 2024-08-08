export interface ReservasDB {
  idReservacion: string;
  fechaInicio: Date;
  fechaFin: Date;
  kmIniciales: number;
  kmFinales: number;
  reservacionActivo: boolean;
  placa: string;
  idCliente: string;
}