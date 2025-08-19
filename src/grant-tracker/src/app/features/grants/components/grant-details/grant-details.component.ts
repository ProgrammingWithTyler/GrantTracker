import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

import { GrantDataService } from '../../services/grant-data.service';
import { Grant } from '../../../../core/models/grant.model';
import { Observable, EMPTY } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'gt-grant-details',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  templateUrl: './grant-details.component.html',
  styleUrl: './grant-details.component.scss'
})
export class GrantDetailsComponent implements OnInit {
  grant: Grant | null = null;
  isLoading = false;
  hasError = false;
  errorMessage = '';
  grantId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private grantDataService: GrantDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.grantId = this.route.snapshot.paramMap.get('id');

    if (this.grantId) {
      this.loadGrant();
    } else {
      this.hasError = true;
      this.errorMessage = 'No grant ID provided';
    }
  }

  loadGrant(): void {
    if (!this.grantId) return;

    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';

    // Use fallback method that handles both real API and mock data
    this.grantDataService.getGrantById(this.grantId)
      .pipe(
        catchError((error) => {
          console.error('Error loading grant:', error);
          this.hasError = true;
          this.errorMessage = 'Unable to load grant details. Please try again later.';
          this.showErrorMessage('Failed to load grant details.');
          return EMPTY;
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (grant) => {
          this.grant = grant;
        }
      });
  }

  onBack(): void {
    this.router.navigate(['/grants']);
  }

  onApply(): void {
    if (this.grant) {
      // TODO: Implement apply functionality
      this.showInfoMessage(`Apply functionality for "${this.grant.title}" will be implemented in future missions.`);
    }
  }

  onSave(): void {
    if (this.grant) {
      // TODO: Implement save functionality
      this.showInfoMessage(`Save functionality for "${this.grant.title}" will be implemented in future missions.`);
    }
  }

  onEdit(): void {
    if (this.grant?.id) {
      // TODO: Navigate to edit page when implemented
      this.showInfoMessage('Edit functionality will be implemented in future missions.');
    }
  }

  onDelete(): void {
    if (this.grant) {
      // TODO: Implement delete functionality with confirmation dialog
      this.showInfoMessage('Delete functionality will be implemented in future missions.');
    }
  }

  onRetryLoad(): void {
    this.loadGrant();
  }

  getStatusIcon(): string {
    if (!this.grant) return 'help';

    switch (this.grant.status.toLowerCase()) {
      case 'approved': return 'check_circle';
      case 'pending': return 'schedule';
      case 'rejected': return 'cancel';
      case 'closed': return 'lock';
      default: return 'help';
    }
  }

  getStatusColor(): string {
    if (!this.grant) return '';

    switch (this.grant.status.toLowerCase()) {
      case 'approved': return 'status-approved';
      case 'pending': return 'status-pending';
      case 'rejected': return 'status-rejected';
      case 'closed': return 'status-closed';
      default: return '';
    }
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  private showInfoMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['info-snackbar']
    });
  }
}
