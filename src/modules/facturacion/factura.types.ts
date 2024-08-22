export interface FacturacionDB {
  idFactura: string;
  fecha: string;
}

export interface DetalleFacturaDB {
  idDetalleFactura: string;
  subtotal: number;
  precioKmAutomovil: number;
  cantidadDias: number;
  cantidadKmRecorridos: number;
  factura: number;
  reservacion: number;
}