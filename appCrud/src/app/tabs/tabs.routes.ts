import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        loadComponent: () =>
          import('../pages/Comun/inicio/inicio.page').then((m) => m.Tab1Page),
      },
      {
        path: 'paises',
        loadComponent: () =>
          import('../pages/Users/paises/paises.page').then((m) => m.PaisesPage),
      },
      {
        path: 'ciudades',
        loadComponent: () => import('../pages/Users/ciudades/ciudades.page').then(m => m.CiudadesPage)
      },
      {
        path: 'sitios',
        loadComponent: () =>
          import('../pages/Users/sitios/sitios.page').then((m) => m.SitiosPage),
      },
      {
        path: 'famosos',
        loadComponent: () =>
          import('../pages/Users/famosos/famosos.page').then((m) => m.FamososPage),
      },
      {
        path: 'favoritos',
        loadComponent: () =>
          import('../pages/Users/favoritos/favoritos.page').then((m) => m.FavoritosPage),
      },
      {
        path: 'mis-visitas',
        loadComponent: () =>
          import('../pages/Users/mis-visitas/mis-visitas.page').then((m) => m.MisVisitasPage),
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('../pages/Admins/admin/admin.page').then((m) => m.AdminPage),
      },

      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/inicio',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/tabs/inicio',
    pathMatch: 'full',
  }
];