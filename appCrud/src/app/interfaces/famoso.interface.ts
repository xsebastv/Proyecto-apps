export interface Famoso {
  _id?: string;
  nombre: string;
  biografia: string;
  fechaNacimiento: string; // ISO string
  nacionalidad: string;
  ciudad: { _id: string; nombre?: string; pais?: any } | string;
  tipoFama: string;
  imagen?: string;
  obras?: string[];
}