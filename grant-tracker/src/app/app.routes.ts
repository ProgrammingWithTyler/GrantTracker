import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'weather',
    pathMatch: 'full'
  },
  {
    path: 'weather',
    loadChildren: () =>
      import('./features/weather/weather.routes').then((m) => m.WEATHER_ROUTES)
  }
];
