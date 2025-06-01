import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_API } from '../config/url.servicios';
import { map, throwError } from 'rxjs';
import { Sitio } from '../interfaces/sitio.interface';

@Injectable({
  providedIn: 'root'
})
export class SitiosService {

  constructor(private http: HttpClient) {}

  getSitios() {
    const url = `${URL_API}/sitios`;
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    return this.http.get(url, { headers }).pipe(
      map((data: any) => data.resp || data.sitios || data)
    );
  }

  getUnSitio(id: string) {
    const url = `${URL_API}/sitios/${id}`;
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    return this.http.get(url, { headers }).pipe(
      map((data: any) => data.resp || data.sitio || data)
    );
  }

  getSitiosPorPais(paisId: string) {
    const url = `${URL_API}/sitios/pais/${paisId}`;
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    return this.http.get(url, { headers }).pipe(
      map((data: any) => data.sitios || data.resp || data)
    );
  }

  getSitiosPorCiudad(ciudadId: string) {
    const url = `${URL_API}/sitios/ciudad/${ciudadId}`;
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    return this.http.get(url, { headers }).pipe(
      map((data: any) => data.resp || data.sitios || data)
    );
  }

  crud_Sitio(sitio: Sitio, accion: string) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('x-token', token);
    }

    // Eliminar
    if (accion === 'eliminar') {
      const url = `${URL_API}/sitios/${sitio._id}`;
      return this.http.delete(url, { headers }).pipe(
        map((data: any) => data.resp || data)
      );
    }

    // Insertar
    if (accion === 'insertar') {
      const url = `${URL_API}/sitios`;
      const body = {
        nombre: sitio.nombre,
        descripcion: sitio.descripcion,
        imagen: sitio.imagen,
        pais: typeof sitio.pais === 'object' ? sitio.pais._id : sitio.pais,
        ciudad: sitio.ciudad ? (typeof sitio.ciudad === 'object' ? sitio.ciudad._id : sitio.ciudad) : undefined,
        latitud: sitio.latitud,
        longitud: sitio.longitud
      };
      let postHeaders = headers.set('Content-Type', 'application/json');
      return this.http.post(url, body, { headers: postHeaders }).pipe(
        map((data: any) => data.resp || data)
      );
    }

    // Modificar
    if (accion === 'modificar') {
      const url = `${URL_API}/sitios/${sitio._id}`;
      const body = {
        nombre: sitio.nombre,
        descripcion: sitio.descripcion,
        imagen: sitio.imagen,
        pais: typeof sitio.pais === 'object' ? sitio.pais._id : sitio.pais,
        ciudad: sitio.ciudad ? (typeof sitio.ciudad === 'object' ? sitio.ciudad._id : sitio.ciudad) : undefined,
        latitud: sitio.latitud,
        longitud: sitio.longitud
      };
      let putHeaders = headers.set('Content-Type', 'application/json');
      return this.http.put(url, body, { headers: putHeaders }).pipe(
        map((data: any) => data.resp || data)
      );
    }

    return throwError(() => new Error('Acción no válida en crud_Sitio'));
  }
}