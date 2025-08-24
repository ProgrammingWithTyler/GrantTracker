import { Component, OnInit } from '@angular/core';
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
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { catchError, finalize, map, shareReplay } from 'rxjs/operators';

interface GrantListState {
  grants: Grant[];
  isLoading: boolean;
  errorMessage: string;
}

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
export class GrantListComponent implements OnInit {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string>('');
  private grantsSubject = new BehaviorSubject<Grant[]>([]);

  // Combined state observable
  state$: Observable<GrantListState> = combineLatest([
    this.grantsSubject,
    this.loadingSubject,
    this.errorSubject
  ]).pipe(
    map(([grants, isLoading, errorMessage]) => ({
      grants,
      isLoading,
      errorMessage
    })),
    shareReplay(1)
  );

  constructor(
    private grantDataService: GrantDataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadGrants();
  }

  loadGrants(): void {
    this.loadingSubject.next(true);
    this.errorSubject.next('');

    this.grantDataService.getGrants().pipe(
      catchError((err) => {
        console.error('Error loading grants:', err);
        const errorMessage = 'Unable to load grants. Please try again later.';
        this.errorSubject.next(errorMessage);
        this.showErrorMessage(errorMessage);
        return [];
      }),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(grants => {
      this.grantsSubject.next(grants);
    });
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

  onCreateNew(): void {
    this.router.navigate(['/grants/new']);
  }


  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 5000 });
  }

  trackByGrantId(index: number, grant: Grant): any {
    return grant.id ?? index;
  }
}
