export interface FamosoTag {
  _id?: string;
  famoso: string;
  usuario: string | { nombre: string };
  comentario: string;
  fecha: Date;
  imagen?: string;
  ubicacion?: { lat: number; lng: number };
}