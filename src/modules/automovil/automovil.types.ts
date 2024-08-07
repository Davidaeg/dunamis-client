export interface SegmentoDB {
  idSegmento: string;
  nombre: string;
  automoviles?: AutomovilDB[];
}

export interface AutomovilDB {
  placa: string;
  marca: string;
  modelo: string;
  anno: string;
  color: string;
  estilo: string;
  carroceria: string;
  combustible: string;
  cabina: string;
  traccion: string;
  Transmision: string;
  costo: string;
  automovilActivo: boolean;
}
