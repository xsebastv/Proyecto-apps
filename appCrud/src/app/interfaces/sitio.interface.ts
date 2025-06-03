export interface Sitio {
  _id?: string;
  nombre: string;
  descripcion?: string;
  imagen?: string;
  pais: { _id: string } | string;
  ciudad?: { _id: string } | string;
  direccion?: string;
  latitud?: number;
  longitud?: number;
  tipo?: string;
}