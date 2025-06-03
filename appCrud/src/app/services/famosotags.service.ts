import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../config/url.servicios';

@Injectable({ providedIn: 'root' })
export class FamosotagsService {
  constructor(private http: HttpClient) {}

  getFamosotags() {
    const token = localStorage.getItem('token') || '';
    const headers = { 'x-token': token };
    // Usa la ruta correcta según tu backend
    return this.http.get(`${URL_API}/famosotag`, { headers });
  }
}