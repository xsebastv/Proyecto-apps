import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../config/url.servicios';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static readonly TOKEN_KEY = 'token';
  private static readonly USER_NAME_KEY = 'userName';
  private static readonly USER_IMG_KEY = 'userImg';
  private static readonly USER_ROLE_KEY = 'userRole';
  private static readonly USER_ID_KEY = 'userId';

  private logoutTimeout: any = null;

  // BehaviorSubject para el estado de sesión
  private loggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem(AuthService.TOKEN_KEY));
  get isLoggedIn$() {
    return this.loggedIn$.asObservable();
  }

  constructor(private http: HttpClient) {
    // Al iniciar el servicio, programa el logout si hay token
    this.scheduleAutoLogout();
  }

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
      tap((resp: any) => {
        this.setToken(resp.token);
        // Asegúrate que el backend retorna resp.usuario._id correctamente
        if (resp.usuario && resp.usuario._id) {
          this.setUserId(resp.usuario._id);
          this.setUserName(resp.usuario.nombre);
          this.setUserImg(resp.usuario.img || '');
          this.setUserRole(resp.usuario.rol || '');
        } else {
          // Si no viene el usuario, intenta decodificar el token (si contiene el id)
          const userId = this.decodeUserIdFromToken(resp.token);
          if (userId) {
            this.setUserId(userId);
          }
        }
      }),
      catchError((error) => {
        console.error('Error en el login:', error);
        return throwError(() => new Error('Error al iniciar sesión'));
      })
    );
  }

  // Intenta decodificar el userId del token si el backend no lo retorna explícitamente
  private decodeUserIdFromToken(token: string): string | null {
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      if (!payload) return null;
      const decoded = JSON.parse(atob(payload));
      return decoded.uid || decoded._id || null;
    } catch {
      return null;
    }
  }

  // Guarda el token en localStorage y actualiza el estado de sesión
  setToken(token: string): void {
    if (token) {
      localStorage.setItem(AuthService.TOKEN_KEY, token);
      this.loggedIn$.next(true);
      this.scheduleAutoLogout(); // Programa el logout automático
    }
  }

  // Obtiene el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem(AuthService.TOKEN_KEY);
  }

  // Decodifica el token y obtiene la expiración (en ms)
  getTokenExpiration(): number | null {
    const token = this.getToken();
    if (!token) return null;
    const payload = token.split('.')[1];
    if (!payload) return null;
    try {
      const decoded = JSON.parse(atob(payload));
      return decoded.exp ? decoded.exp * 1000 : null; // exp en segundos, lo pasamos a ms
    } catch {
      return null;
    }
  }

  // Programa el cierre de sesión automático cuando expire el token
  scheduleAutoLogout(): void {
    if (this.logoutTimeout) {
      clearTimeout(this.logoutTimeout);
    }
    const exp = this.getTokenExpiration();
    if (exp) {
      const timeout = exp - Date.now();
      if (timeout > 0) {
        this.logoutTimeout = setTimeout(() => {
          this.logout();
          window.location.href = '/login';
          alert('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
        }, timeout);
      } else {
        // Si ya expiró, cerrar sesión inmediatamente
        this.logout();
        window.location.href = '/login';
      }
    }
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

  // Guarda el ID del usuario en localStorage
  setUserId(userId: string): void {
    if (userId) {
      localStorage.setItem(AuthService.USER_ID_KEY, userId);
    }
  }

  // Obtiene el ID del usuario desde localStorage
  getUserId(): string | null {
    return localStorage.getItem(AuthService.USER_ID_KEY);
  }

  // Elimina el token y los datos del usuario de localStorage y actualiza el estado de sesión
  logout(): void {
    localStorage.removeItem(AuthService.TOKEN_KEY);
    localStorage.removeItem(AuthService.USER_NAME_KEY);
    localStorage.removeItem(AuthService.USER_IMG_KEY);
    localStorage.removeItem(AuthService.USER_ROLE_KEY);
    localStorage.removeItem(AuthService.USER_ID_KEY);
    this.loggedIn$.next(false);
    if (this.logoutTimeout) {
      clearTimeout(this.logoutTimeout);
      this.logoutTimeout = null;
    }
  }
}