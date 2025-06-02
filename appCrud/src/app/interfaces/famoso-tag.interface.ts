export interface FamosoTag {
  _id?: string;
  famoso: string; // o Famoso
  usuario: string; // o Usuario
  comentario: string;
  fecha: Date;
  imagen?: string;
  ubicacion?: {
    lat: number;
    lng: number;
  };
}