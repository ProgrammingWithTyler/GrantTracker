import { Routes } from '@angular/router';
import { GRANT_ROUTES } from './features/grants/grants.routes';
import {AuthGuard} from './core/auth/auth.guard';


export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/grants',
    pathMatch: 'full'
  },
  {
    path: 'grants',
    children: GRANT_ROUTES,
    //canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/login/login.routes').then((m) => m.LOGIN_ROUTES)
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./features/auth/registration/register.routes').then((m) => m.REGISTER_ROUTES)
  },
  {
    path: 'weather',
    loadChildren: () =>
      import('./features/weather/weather.routes').then((m) => m.WEATHER_ROUTES)
  },
  { path: '**', redirectTo: '/grants' }
];
