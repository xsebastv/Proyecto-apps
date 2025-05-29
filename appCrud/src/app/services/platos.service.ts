import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_API } from '../config/url.servicios';
import { map, throwError } from 'rxjs';
import { Plato } from 'src/app/interfaces/plato.interface';

@Injectable({
  providedIn: 'root'
})
export class PlatosService {

  constructor(private http: HttpClient) {}

  getPlatos() {
    const url = `${URL_API}/platos`;
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    return this.http.get(url, { headers }).pipe(
      map((data: any) => data.resp || data.platos || data)
    );
  }

  getUnPlato(id: string) {
    const url = `${URL_API}/platos/${id}`;
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    return this.http.get(url, { headers }).pipe(
      map((data: any) => data.resp || data.plato || data)
    );
  }

  // Usa la ruta correcta del backend para obtener platos por país
  getPlatosPorPais(paisId: string) {
    const url = `${URL_API}/platos/pais/${paisId}`;
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    return this.http.get(url, { headers }).pipe(
      map((data: any) => data.platos || data.resp || data)
    );
  }

  getPlatosPorCiudad(ciudadId: string) {
    const url = `${URL_API}/platos/ciudad/${ciudadId}`;
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    return this.http.get(url, { headers }).pipe(
      map((data: any) => data.resp || data.platos || data)
    );
  }

  crud_Plato(plato: Plato, accion: string) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('x-token', token);
    }

    // Eliminar
    if (accion === 'eliminar') {
      const url = `${URL_API}/platos/${plato._id}`;
      return this.http.delete(url, { headers }).pipe(
        map((data: any) => data.resp || data)
      );
    }

    // Insertar
    if (accion === 'insertar') {
      const url = `${URL_API}/platos`;
      const body = {
        nombre: plato.nombre,
        descripcion: plato.descripcion,
        precio: plato.precio,
        imagen: plato.imagen,
        disponible: plato.disponible,
        pais: typeof plato.pais === 'object' ? plato.pais._id : plato.pais,
        ciudad: plato.ciudad ? (typeof plato.ciudad === 'object' ? plato.ciudad._id : plato.ciudad) : undefined
      };
      let postHeaders = headers.set('Content-Type', 'application/json');
      return this.http.post(url, body, { headers: postHeaders }).pipe(
        map((data: any) => data.resp || data)
      );
    }

    // Modificar
    if (accion === 'modificar') {
      const url = `${URL_API}/platos/${plato._id}`;
      const body = {
        nombre: plato.nombre,
        descripcion: plato.descripcion,
        precio: plato.precio,
        imagen: plato.imagen,
        disponible: plato.disponible,
        pais: typeof plato.pais === 'object' ? plato.pais._id : plato.pais,
        ciudad: plato.ciudad ? (typeof plato.ciudad === 'object' ? plato.ciudad._id : plato.ciudad) : undefined
      };
      let putHeaders = headers.set('Content-Type', 'application/json');
      return this.http.put(url, body, { headers: putHeaders }).pipe(
        map((data: any) => data.resp || data)
      );
    }

    return throwError(() => new Error('Acción no válida en crud_Plato'));
  }
}