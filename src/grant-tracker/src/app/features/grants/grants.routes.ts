import { Routes } from '@angular/router';

export const GRANT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/grant-list/grant-list.component')
      .then(c => c.GrantListComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./components/grant-form/grant-form.component')
      .then(c => c.GrantFormComponent)
  },
  {
    path: 'request',
    loadComponent: () => import('./components/grant-request/grant-request.component')
      .then(g => g.GrantRequestComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./components/grant-form/grant-form.component')
      .then(c => c.GrantFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./components/grant-details/grant-details.component')
      .then(c => c.GrantDetailsComponent)
  }
];
