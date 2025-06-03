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
        path: 'platos',
        loadComponent: () =>
          import('../pages/Users/platos/platos.pages').then((m) => m.PlatosComponent),
      },
      {
        path: 'ciudades',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('../pages/Users/ciudades/ciudades.page').then(m => m.CiudadesPage)
          },
          {
            path: ':ciudadId',
            loadComponent: () =>
              import('../components/Components_Ciudad_users/ciudades-view/ciudades-view.component').then(m => m.CiudadesViewComponent)
          },
          {
            path: ':ciudadId/plato/:id',
            loadComponent: () =>
              import('../components/Components_Plato_users/platos-view-page/platos-view-page.component').then(m => m.PlatosViewPageComponent)
          },
          {
            path: ':ciudadId/sitio/:id',
            loadComponent: () =>
              import('../components/Components_Sitio_users/sitios-view/sitios-view.component').then(m => m.SitiosViewComponent)
          }
        ]
      },
      {
        path: 'famosos',
        loadComponent: () =>
          import('../pages/Users/famosos/famosos.page').then((m) => m.FamososPage),
      },
      {
        path: 'favoritos',
        loadComponent: () => import('src/app/pages/Users/favoritos/favoritos.page').then(m => m.FavoritosPage)
      },
      {
        path: 'mis-visitas',
        loadComponent: () =>
          import('../pages/Users/mis-visitas/mis-visitas.page').then((m) => m.MisVisitasPage),
      },
      {
        path: 'estadisticas',
        loadComponent: () =>
          import('../pages/Comun/estadisticas/estadisticas.page').then((m) => m.EstadisticasPage),
      },
      {
        path: 'sitios-admin',
        loadComponent: () =>
          import('../pages/Admins/sitios-admin/sitios-admin/sitios-admin.page').then(m => m.SitiosAdminPage),
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