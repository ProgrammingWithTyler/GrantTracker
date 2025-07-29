import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../services/weather-service.service';
import {NgForOf, NgIf} from '@angular/common';
import {WeatherForecast} from '../models/WeatherForecast';

@Component({
  selector: 'gt-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  imports: [
    NgIf,
    NgForOf
  ]
})
export class WeatherForecastComponent implements OnInit {
  forecasts: WeatherForecast[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.getForecast().subscribe((data: WeatherForecast[]) => {
      this.forecasts = data;
    });
  }
}
