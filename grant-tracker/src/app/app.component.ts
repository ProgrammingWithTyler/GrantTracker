import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainLayoutComponent} from './core/layout/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'grant-tracker';
}
