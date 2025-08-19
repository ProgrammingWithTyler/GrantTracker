import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { GrantDataService } from '../../services/grant-data.service';
import { Grant } from '../../../../core/models/grant.model';
import { Observable, of } from 'rxjs';
import { catchError, finalize, startWith, map } from 'rxjs/operators';

@Component({
  selector: 'gt-grant-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './grant-list.component.html',
  styleUrls: ['./grant-list.component.scss']
})
export class GrantListComponent {
  grants$!: Observable<Grant[]>;
  isLoading = true;
  errorMessage = '';

  constructor(
    private grantDataService: GrantDataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadGrants();
  }

  loadGrants(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.grants$ = this.grantDataService.getGrants().pipe(
      catchError((err) => {
        console.error('Error loading grants:', err);
        this.errorMessage = 'Unable to load grants. Please try again later.';
        this.showErrorMessage(this.errorMessage);
        return of([]); // fallback to empty list
      }),
      finalize(() => {
        this.isLoading = false;
      })
    );
  }

  onViewDetails(grant: Grant): void {
    if (grant.id) {
      this.router.navigate(['/grants', grant.id]);
    } else {
      this.showErrorMessage('Unable to navigate to grant details.');
    }
  }

  onRetryLoad(): void {
    this.loadGrants();
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 5000 });
  }

  trackByGrantId(index: number, grant: Grant): any {
    return grant.id ?? index;
  }
}
