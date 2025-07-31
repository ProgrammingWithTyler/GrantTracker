import { Routes } from '@angular/router';
import { GRANT_ROUTES } from './features/grants/grants.routes';


export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/grants',
    pathMatch: 'full'
  },
  {
    path: 'grants',
    children: GRANT_ROUTES
  },
  {
    path: 'weather',
    loadChildren: () =>
      import('./features/weather/weather.routes').then((m) => m.WEATHER_ROUTES)
  },
  { path: '**', redirectTo: '/grants' }
];
