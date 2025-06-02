import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_API } from '../config/url.servicios';
import { map, throwError } from 'rxjs';
import { Famoso } from '../interfaces/famoso.interface';
import { FamosoTag } from '../interfaces/famoso-tag.interface';

@Injectable({
  providedIn: 'root'
})
export class FamososService {

  constructor(private http: HttpClient) {}

  getFamosos() {
    const url = `${URL_API}/famosos`;
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    return this.http.get(url, { headers }).pipe(
      map((data: any) => data.resp || data.famosos || data)
    );
  }

  getUnFamoso(id: string) {
    const url = `${URL_API}/famosos/${id}`;
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    return this.http.get(url, { headers }).pipe(
      map((data: any) => data.resp || data.famoso || data)
    );
  }

  getFamososPorPais(paisId: string) {
    const url = `${URL_API}/famosos/pais/${paisId}`;
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    return this.http.get(url, { headers }).pipe(
      map((data: any) => data.famosos || data.resp || data)
    );
  }

  getFamososPorCiudad(ciudadId: string) {
    const url = `${URL_API}/famosos/ciudad/${ciudadId}`;
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    return this.http.get(url, { headers }).pipe(
      map((data: any) => data.resp || data.famosos || data)
    );
  }

  crud_Famoso(famoso: Famoso, accion: string) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('x-token', token);
    }

    // Eliminar
    if (accion === 'eliminar') {
      const url = `${URL_API}/famosos/${famoso._id}`;
      return this.http.delete(url, { headers }).pipe(
        map((data: any) => data.resp || data)
      );
    }

    // Insertar
    if (accion === 'insertar') {
      const url = `${URL_API}/famosos`;
      const body = {
        nombre: famoso.nombre,
        biografia: famoso.biografia,
        fechaNacimiento: famoso.fechaNacimiento,
        nacionalidad: famoso.nacionalidad,
        ciudad: typeof famoso.ciudad === 'object' ? famoso.ciudad._id : famoso.ciudad,
        tipoFama: famoso.tipoFama,
        imagen: famoso.imagen,
        obras: famoso.obras
      };
      let postHeaders = headers.set('Content-Type', 'application/json');
      return this.http.post(url, body, { headers: postHeaders }).pipe(
        map((data: any) => data.resp || data)
      );
    }

    // Modificar
    if (accion === 'modificar') {
      const url = `${URL_API}/famosos/${famoso._id}`;
      const body = {
        nombre: famoso.nombre,
        biografia: famoso.biografia,
        fechaNacimiento: famoso.fechaNacimiento,
        nacionalidad: famoso.nacionalidad,
        ciudad: typeof famoso.ciudad === 'object' ? famoso.ciudad._id : famoso.ciudad,
        tipoFama: famoso.tipoFama,
        imagen: famoso.imagen,
        obras: famoso.obras
      };
      let putHeaders = headers.set('Content-Type', 'application/json');
      return this.http.put(url, body, { headers: putHeaders }).pipe(
        map((data: any) => data.resp || data)
      );
    }

    return throwError(() => new Error('Acción no válida en crud_Famoso'));
  }

  // Métodos para tags/comentarios de famosos

  getTagsDeFamoso(famosoId: string) {
  const url = `${URL_API}/famoso_tag/famoso/${famosoId}`;
  const token = localStorage.getItem('token') || '';
  const headers = { 'x-token': token };
  return this.http.get(url, { headers }).pipe(
    map((data: any) => data.tags || data.resp || data)
  );
}

agregarTagAFamoso(famosoId: string, tag: Partial<FamosoTag>) {
  const url = `${URL_API}/famoso_tag/`;
  const token = localStorage.getItem('token') || '';
  const headers = { 'x-token': token, 'Content-Type': 'application/json' };
  // El backend espera el id del famoso en el body
  return this.http.post(url, { ...tag, famoso: famosoId }, { headers }).pipe(
    map((data: any) => data.tag || data.resp || data)
  );
}
}
