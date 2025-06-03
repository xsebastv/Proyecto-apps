import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/Comun/Pages_Auth/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/Comun/Pages_Auth/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.routes').then(m => m.routes)
  },
  // RUTAS GENERALES (NO detalles, solo páginas principales)
  {
    path: 'platos',
    loadComponent: () => import('./pages/Users/platos/platos.pages').then(m => m.PlatosComponent)
  },
  {
    path: 'famosos',
    loadComponent: () => import('./pages/Users/famosos/famosos.page').then(m => m.FamososPage)
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./pages/Users/favoritos/favoritos.page').then(m => m.FavoritosPage)
  },
  {
    path: 'consultas',
    loadComponent: () => import('./pages/Users/consultas/consultas.page').then(m => m.ConsultasPage)
  },
  {
    path: 'paises',
    loadComponent: () => import('./pages/Users/paises/paises.page').then(m => m.PaisesPage)
  },
  {
    path: 'mis-visitas',
    loadComponent: () => import('./pages/Users/mis-visitas/mis-visitas.page').then(m => m.MisVisitasPage)
  },
  {
    path: 'estadisticas',
    loadComponent: () => import('./pages/Comun/estadisticas/estadisticas.page').then(m => m.EstadisticasPage)
  },
  {
    path: 'sitios-admin',
    loadComponent: () => import('./pages/Admins/sitios-admin/sitios-admin/sitios-admin.page').then(m => m.SitiosAdminPage)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];