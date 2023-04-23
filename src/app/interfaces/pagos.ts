export interface Pagos {
  anho: string;
  mes: string;
  dia: string;
  monto: string;
  foto: string;
}

export interface NuevoPago {
  idUser: number;
  anho: number;
  mes: number;
  dia: number;
  monto: number;
  fechaCompleta: string;
  descripcion: string;
  foto: string;
}
