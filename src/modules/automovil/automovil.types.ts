export interface SegmentoDB {
  idSegmento: string;
  nombre: string;
  automoviles?: AutomovilDB[];
}

export interface AutomovilDB {
  placa: string;
  marca: string;
  modelo: string;
  anno: number;
  color: string;
  estilo: string;
  carroceria: string;
  combustible: string;
  cabina: string;
  traccion: string;
  transmision: string;
  costo: number;
  automovilActivo: boolean;
  idSegmento:number;
}

export interface TipoDB {
  idTipo: string;
  nombre: string;
}

export interface TipoAutoDB {
  id: string;
  tipo: string;
  automovil: string;
}
