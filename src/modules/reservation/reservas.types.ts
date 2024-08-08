export interface ReservasDB {
  idReservacion: string;
  fechaInicio: string;
  fechaFin: string;
  kmIniciales: number;
  kmFinales: number;
  reservacionActivo: boolean;
  placa: string;
  idCliente: string;
}