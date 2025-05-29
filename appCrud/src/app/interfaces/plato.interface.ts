export interface Plato {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  disponible: boolean;
  pais: { _id: string } | string;
  ciudad?: { _id: string } | string;
  _id?: string;
}