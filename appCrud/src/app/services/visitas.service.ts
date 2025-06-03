import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../config/url.servicios';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class VisitasService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  registrarVisita(sitioId: string) {
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    const usuario = this.authService.getUserId();
    return this.http.post(`${URL_API}/visita`, {
      sitio: sitioId,
      usuario,
      fecha_visita: new Date()
    }, { headers });
  }

  obtenerVisitaUsuarioSitio(sitioId: string) {
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    const usuario = this.authService.getUserId();
    return this.http.get(`${URL_API}/visita?sitio=${sitioId}&usuario=${usuario}`, { headers });
  }

  obtenerVisitasUsuario() {
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    const usuario = this.authService.getUserId();
    return this.http.get(`${URL_API}/visita?usuario=${usuario}`, { headers });
  }

  obtenerVisitaPorId(idVisita: string) {
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    return this.http.get(`${URL_API}/visita/${idVisita}`, { headers });
  }

  eliminarVisitaPorId(idVisita: string) {
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    return this.http.delete(`${URL_API}/visita/${idVisita}`, { headers });
  }

  // Método para obtener TODAS las visitas (para estadísticas globales)
  getVisitas() {
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    return this.http.get(`${URL_API}/visita`, { headers });
  }
}