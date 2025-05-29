import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../config/url.servicios';
import { map, throwError } from 'rxjs';
import { Ciudad } from '../interfaces/ciudad.interface';

@Injectable({
  providedIn: 'root'
})
export class CiudadesBDService {

  constructor(private http: HttpClient) {}

  getCiudades() {
    const url = `${URL_API}/ciudades`;
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    return this.http.get(url, { headers }).pipe(
      map((data) => data)
    );
  }

  getUnaCiudad(id: string) {
    const url = `${URL_API}/ciudades/${id}`;
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    return this.http.get(url, { headers }).pipe(
      map((data: any) => data)
    );
  }

  getCiudadesPorPais(paisId: string) {
    const url = `${URL_API}/ciudades/pais/${paisId}`;
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    return this.http.get(url, { headers }).pipe(
      map((data) => data)
    );
  }

  crud_Ciudad(ciudad: Ciudad, accion: string) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('x-token', token);
    }

    if (accion === 'eliminar') {
      const url = `${URL_API}/ciudades/${ciudad._id}`;
      return this.http.delete(url, { headers: headers }).pipe(
        map((data) => data)
      );
    }

    // Incluye todas las propiedades del modelo
    const body = {
      nombre: ciudad.nombre,
      pais: typeof ciudad.pais === 'object' ? ciudad.pais._id : ciudad.pais,
      imagen: ciudad.imagen,
      latitud: ciudad.latitud,
      longitud: ciudad.longitud,
      poblacion: ciudad.poblacion
    };

    if (accion === 'insertar') {
      const url = `${URL_API}/ciudades`;
      let postHeaders = headers.set('Content-Type', 'application/json');
      return this.http.post(url, body, { headers: postHeaders }).pipe(
        map((data) => data)
      );
    }

    if (accion === 'modificar') {
      const url = `${URL_API}/ciudades/${ciudad._id}`;
      let putHeaders = headers.set('Content-Type', 'application/json');
      return this.http.put(url, body, { headers: putHeaders }).pipe(
        map((data) => data)
      );
    }

    return throwError(() => new Error('Acción no válida en crud_Ciudad'));
  }
}