import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WeatherForecastComponent} from './features/weather/components/weather-forecast.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WeatherForecastComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'grant-tracker';
}
