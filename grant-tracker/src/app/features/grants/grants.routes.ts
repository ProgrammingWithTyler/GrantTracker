import { Routes } from '@angular/router';

export const GRANT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/grant-list/grant-list.component')
      .then(c => c.GrantListComponent)
  }
];
