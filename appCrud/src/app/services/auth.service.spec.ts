import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { URL_API } from '../config/url.servicios';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería llamar a la API de login', () => {
    const respuestaDummy = { token: '123' };
    service.login('correo@prueba.com', '1234').subscribe(res => {
      expect(res).toEqual(respuestaDummy);
    });
    const req = httpMock.expectOne(`${URL_API}/usuarios`);
    expect(req.request.method).toBe('POST');
    req.flush(respuestaDummy);
  });

  it('debería llamar a la API de registro', () => {
    const respuestaDummy = { ok: true };
    const usuario = {
      nombre: 'Sebastian Rios',
      correo: 'correo@prueba.com',
      password: '1234',
      img: 'Sin Imagen',
      rol: 'USER_ROLE'
    };
    service.register(usuario).subscribe(res => {
      expect(res).toEqual(respuestaDummy);
    });
    const req = httpMock.expectOne(`${URL_API}/usuarios`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(usuario); // Verifica que el body sea correcto
    req.flush(respuestaDummy);
  });

  it('debería guardar, obtener y eliminar el token', () => {
    service.setToken('abc');
    expect(service.getToken()).toBe('abc');
    service.logout();
    expect(service.getToken()).toBeNull();
  });
});