import { Routes } from '@angular/router';

export const GRANT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/grant-list/grant-list.component')
      .then(c => c.GrantListComponent)
  },
  {
    path: 'request',
    loadComponent: () => import('./components/grant-request/grant-request.component')
      .then(g => g.GrantRequestComponent)
  }
];
