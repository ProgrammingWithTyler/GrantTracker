import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'gt-error-zone',
  imports: [
    CommonModule,
    MatCard,
    MatCardContent,
    MatIcon,
    MatButtonModule,
  ],
  templateUrl: './error-zone.component.html',
  styleUrl: './error-zone.component.scss'
})
export class ErrorZoneComponent implements OnInit, OnDestroy {
  @Input() errorMessage: string | null = null;
  @Input() autoDismiss: boolean = false;
  @Input() dismissDelayMs: number = 5000;
  @Input() showRetry: boolean = false;

  @Output() retry = new EventEmitter<void>();
  @Output() dismiss = new EventEmitter<void>();

  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    if (this.autoDismiss && this.errorMessage) {
      this.timeoutId = setTimeout(() => {
        this.dismiss.emit();
        this.timeoutId = null;
      }, this.dismissDelayMs);
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  onRetry(): void {
    this.retry.emit();
  }

  onDismiss(event: MouseEvent): void {
    event.stopPropagation();
    this.dismiss.emit();
  }
}
