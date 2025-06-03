import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_API } from '../config/url.servicios';

@Injectable({ providedIn: 'root' })
export class FamosotagsService {
  constructor(private http: HttpClient) {}

  // Obtener todos los tags de todos los famosos (para estadísticas)
  getFamosotags() {
    return this.http.get<{ tags: any[] }>(`${URL_API}/famosotags`);
  }

  getTagsDeFamoso(famosoId: string) {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders().set('x-token', token);
  return this.http.get<{ tags: any[] }>(`${URL_API}/famosotags/famoso/${famosoId}`, { headers });
  }

  agregarTagAFamoso(famosoId: string, tag: { comentario: string }) {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('x-token', token);
    return this.http.post(`${URL_API}/famosotags`, { ...tag, famoso: famosoId }, { headers });
  }
}