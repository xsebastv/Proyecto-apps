export interface Pais {
  _id: string;
  nombre: string;
}

export interface Ciudad {
  _id: string;
  nombre: string;
  pais: Pais;
  imagen?: string; // URL o nombre de archivo de la imagen
  latitud: number;
  longitud: number;
  poblacion: number;
}