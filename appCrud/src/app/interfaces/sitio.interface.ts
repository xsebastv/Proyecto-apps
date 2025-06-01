export interface Sitio {
  _id?: string;
  nombre: string;
  descripcion?: string;
  imagen?: string;
  pais: { _id: string } | string;
  ciudad?: { _id: string } | string;
  latitud?: number;
  longitud?: number;
}