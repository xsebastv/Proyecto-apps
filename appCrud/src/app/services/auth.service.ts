import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../config/url.servicios';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static readonly TOKEN_KEY = 'token';
  private static readonly USER_NAME_KEY = 'userName';
  private static readonly USER_IMG_KEY = 'userImg';
  private static readonly USER_ROLE_KEY = 'userRole';

  // BehaviorSubject para el estado de sesión
  private loggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem(AuthService.TOKEN_KEY));
  get isLoggedIn$() {
    return this.loggedIn$.asObservable();
  }

  constructor(private http: HttpClient) {}

  // Método para registrar un nuevo usuario
  register(usuario: any): Observable<any> {
    return this.http.post(`${URL_API}/auth/register`, usuario).pipe(
      catchError((error) => {
        console.error('Error en el registro:', error);
        return throwError(() => new Error('Error al registrar usuario'));
      })
    );
  }

  // Método para iniciar sesión
  login(correo: string, password: string): Observable<any> {
    return this.http.post(`${URL_API}/auth/login`, { correo, password }).pipe(
      catchError((error) => {
        console.error('Error en el login:', error);
        return throwError(() => new Error('Error al iniciar sesión'));
      })
    );
  }

  // Guarda el token en localStorage y actualiza el estado de sesión
  setToken(token: string): void {
    if (token) {
      localStorage.setItem(AuthService.TOKEN_KEY, token);
      this.loggedIn$.next(true);
    }
  }

  // Obtiene el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem(AuthService.TOKEN_KEY);
  }

  // Guarda el nombre del usuario en localStorage
  setUserName(userName: string): void {
    if (userName) {
      localStorage.setItem(AuthService.USER_NAME_KEY, userName);
    }
  }

  // Obtiene el nombre del usuario desde localStorage
  getUserName(): string | null {
    return localStorage.getItem(AuthService.USER_NAME_KEY);
  }

  // Guarda la imagen del usuario en localStorage
  setUserImg(userImg: string): void {
    if (userImg) {
      localStorage.setItem(AuthService.USER_IMG_KEY, userImg);
    }
  }

  // Obtiene la imagen del usuario desde localStorage
  getUserImg(): string | null {
    return (
      localStorage.getItem(AuthService.USER_IMG_KEY) ||
      'https://images-ext-1.discordapp.net/external/8PKEw82fwWr9hL98_twl4z1E6x-cAXkn1MwA3SdlNjQ/https/www.shutterstock.com/image-illustration/blank-whatsapp-profile-photo-cute-260nw-2273582947.jpg?format=webp'
    );
  }

  // Guarda el rol del usuario en localStorage
  setUserRole(role: string): void {
    if (role) {
      localStorage.setItem(AuthService.USER_ROLE_KEY, role);
    }
  }

  // Obtiene el rol del usuario desde localStorage
  getUserRole(): string | null {
    return localStorage.getItem(AuthService.USER_ROLE_KEY);
  }

  // Elimina el token y los datos del usuario de localStorage y actualiza el estado de sesión
  logout(): void {
    localStorage.removeItem(AuthService.TOKEN_KEY);
    localStorage.removeItem(AuthService.USER_NAME_KEY);
    localStorage.removeItem(AuthService.USER_IMG_KEY);
    localStorage.removeItem(AuthService.USER_ROLE_KEY);
    this.loggedIn$.next(false);
  }
}