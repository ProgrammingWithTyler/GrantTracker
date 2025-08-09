import { Routes } from '@angular/router';
import { WeatherForecastComponent } from './components/weather-forecast.component';

export const WEATHER_ROUTES: Routes = [
  {
    path: '',
    component: WeatherForecastComponent,
    title: 'Weather Forecast'
  }
];
