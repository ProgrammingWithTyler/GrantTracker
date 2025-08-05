import { Component, Input } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gt-error-zone',
  imports: [
    CommonModule,
    MatCard,
    MatCardContent,
    MatIcon,
  ],
  templateUrl: './error-zone.component.html',
  styleUrl: './error-zone.component.scss'
})
export class ErrorZoneComponent {
  @Input() errorMessage: string | null = null;
}
