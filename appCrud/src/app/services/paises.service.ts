import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../config/url.servicios';
import { map, throwError } from 'rxjs';
import { Pais } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(private http: HttpClient) {}

  getPaises() {
    const url = `${URL_API}/paises`;
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    return this.http.get(url, { headers }).pipe(
      map((data: any) => data.resp || data.paises || data)
    );
  }

  getUnPais(id: string) {
    const url = `${URL_API}/paises/${id}`;
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    return this.http.get(url, { headers }).pipe(
      map((data: any) => data.resp || data.pais || data)
    );
  }

  crud_Pais(pais: Pais, accion: string) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('x-token', token);
    }

    // Eliminar
    if (accion === 'eliminar') {
      const url = `${URL_API}/paises/${pais._id}`;
      return this.http.delete(url, { headers: headers }).pipe(
        map((data: any) => data.resp || data)
      );
    }

    // Insertar
    if (accion === 'insertar') {
      const url = `${URL_API}/paises`;
      const body = {
        nombre: pais.nombre,
        codigo: pais.codigo,
        continente: pais.continente,
        imagen: pais.imagen,
        poblacion: pais.poblacion
      };
      let postHeaders = headers.set('Content-Type', 'application/json');
      return this.http.post(url, body, { headers: postHeaders }).pipe(
        map((data: any) => data.resp || data)
      );
    }

    // Modificar
    if (accion === 'modificar') {
      const url = `${URL_API}/paises/${pais._id}`;
      const body = {
        nombre: pais.nombre,
        codigo: pais.codigo,
        continente: pais.continente,
        imagen: pais.imagen,
        poblacion: pais.poblacion
      };
      let putHeaders = headers.set('Content-Type', 'application/json');
      return this.http.put(url, body, { headers: putHeaders }).pipe(
        map((data: any) => data.resp || data)
      );
    }

    // Acción no válida
    return throwError(() => new Error('Acción no válida en crud_Pais'));
  }
}