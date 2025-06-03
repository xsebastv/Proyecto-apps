import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../config/url.servicios';
import { catchError, map } from 'rxjs';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token') || '';
    if (!token) {
      console.error('Token no encontrado en localStorage');
    }
    return new HttpHeaders().set('x-token', token);
  }

  getFavoritos() {
    const url = `${URL_API}/favoritos`;
    const headers = this.getHeaders();

    return this.http.get(url, { headers }).pipe(
      map((data: any) => Array.isArray(data) ? data : (data.favoritos || data.resp || [])),
      catchError((error) => {
        console.error('Error en getFavoritos:', error);
        return throwError(() => new Error('Error al obtener favoritos'));
      })
    );
  }

  agregarFavorito(sitioId: string) {
    const url = `${URL_API}/favoritos/agregar`;
    const headers = this.getHeaders();

    return this.http.post(url, { sitioId }, { headers }).pipe(
      map((data: any) => data),
      catchError((error) => {
        console.error('Error en agregarFavorito:', error);
        return throwError(() => new Error('Error al agregar favorito'));
      })
    );
  }

  quitarFavorito(sitioId: string) {
    const url = `${URL_API}/favoritos/quitar`;
    const headers = this.getHeaders();

    return this.http.post(url, { sitioId }, { headers }).pipe(
      map((data: any) => data),
      catchError((error) => {
        console.error('Error en quitarFavorito:', error);
        return throwError(() => new Error('Error al quitar favorito'));
      })
    );
  }

  getTodosFavoritos() {
    const url = `${URL_API}/favoritos/todos`;
    const headers = this.getHeaders();
    return this.http.get<any>(url, { headers }).pipe(
      map((data: any) => {
        // Devuelve el array correcto
        return Array.isArray(data.favoritos) ? data.favoritos : [];
      }),
      catchError((error) => {
        console.error('Error en getTodosFavoritos:', error);
        return throwError(() => new Error('Error al obtener todos los favoritos'));
      })
    );
  }

  getRankingUsuariosFavoritos() {
    const url = `${URL_API}/favoritos/ranking-usuarios`;
    const headers = this.getHeaders();
    return this.http.get<any>(url, { headers }).pipe(
      map((data: any) => data.ranking || [])
    );
  }
}