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
  {
    path: 'sitios',
    loadComponent: () => import('./pages/Users/sitios/sitios.page').then( m => m.SitiosPage)
  },
  {
    path: 'platos',
    loadComponent: () => import('src/app/components/Components_Pais_users/platos/platos.component').then( m => m.PlatosComponent)
  },
  {
    path: 'platos-list',
    loadComponent: () => import('./components/Components_Plato_users/platos-list/platos-list.component').then(m => m.PlatosListComponent)
  },
  {
    path: 'famosos',
    loadComponent: () => import('./pages/Users/famosos/famosos.page').then( m => m.FamososPage)
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./pages/Users/favoritos/favoritos.page').then( m => m.FavoritosPage)
  },
  {
    path: 'visitas',
    loadComponent: () => import('./pages/Users/visitas/visitas.page').then( m => m.VisitasPage)
  },
  {
    path: 'gestion-sitios',
    loadComponent: () => import('./pages/Admins/gestion-sitios/gestion-sitios.page').then( m => m.GestionSitiosPage)
  },
  {
    path: 'consultas',
    loadComponent: () => import('./pages/Users/consultas/consultas.page').then( m => m.ConsultasPage)
  },
  {
    path: 'ciudades',
    loadComponent: () => import('./pages/Users/ciudades/ciudades.page').then( m => m.CiudadesPage)
  },
  {
    path: 'paises',
    loadComponent: () => import('./pages/Users/paises/paises.page').then( m => m.PaisesPage)
  },
  {
    path: 'mis-visitas',
    loadComponent: () => import('./pages/Users/mis-visitas/mis-visitas.page').then( m => m.MisVisitasPage)
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/Admins/admin/admin.page').then( m => m.AdminPage)
  },
  {
    path: 'ciudades-admin',
    loadComponent: () => import('./pages/Admins/ciudades-admin/ciudades-admin.page').then( m => m.CiudadesAdminPage)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];