import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

import { GrantDataService } from '../../services/grant-data.service';
import { Grant } from '../../../../core/models/grant.model';
import { catchError, finalize } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'gt-grant-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './grant-form.component.html',
  styleUrls: ['./grant-form.component.scss']
})
export class GrantFormComponent implements OnInit {
  grantForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  isSaving = false;
  grantId: string | null = null;
  pageTitle = 'Create New Grant';

  statusOptions = [
    { value: 'Draft', label: 'Draft' },
    { value: 'Submitted', label: 'Submitted' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'Closed', label: 'Closed' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private grantDataService: GrantDataService,
    private snackBar: MatSnackBar
  ) {
    this.grantForm = this.createForm();
  }

  ngOnInit(): void {
    this.grantId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.grantId;
    this.pageTitle = this.isEditMode ? 'Edit Grant' : 'Create New Grant';

    if (this.isEditMode && this.grantId) {
      this.loadGrant();
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      fundingSource: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      amount: [null, [Validators.required, Validators.min(1), Validators.max(999999999)]],
      submissionDate: [null], // Optional field
      dueDate: [null, [Validators.required]],
      contactEmail: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      status: ['Draft', [Validators.required]]
    });
  }

  private loadGrant(): void {
    if (!this.grantId) return;

    this.isLoading = true;

    this.grantDataService.getGrantById(this.grantId)
      .pipe(
        catchError((error) => {
          console.error('Error loading grant:', error);
          this.showErrorMessage('Failed to load grant data. Please try again.');
          this.router.navigate(['/grants']);
          return EMPTY;
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (grant) => {
          this.populateForm(grant);
        }
      });
  }

  private populateForm(grant: Grant): void {
    this.grantForm.patchValue({
      title: grant.title,
      fundingSource: grant.fundingSource,
      amount: grant.amount,
      submissionDate: grant.submissionDate,
      dueDate: grant.dueDate,
      contactEmail: grant.contactEmail,
      status: grant.status
    });
  }

  onSubmit(): void {
    if (this.grantForm.invalid) {
      this.markFormGroupTouched();
      this.showErrorMessage('Please fix the validation errors before submitting.');
      return;
    }

    this.isSaving = true;
    const formValue = this.grantForm.value;

    // Prepare grant data
    const grantData: Partial<Grant> = {
      title: formValue.title,
      fundingSource: formValue.fundingSource,
      amount: Number(formValue.amount),
      submissionDate: formValue.submissionDate,
      dueDate: formValue.dueDate,
      contactEmail: formValue.contactEmail,
      status: formValue.status
    };

    const operation = this.isEditMode && this.grantId
      ? this.grantDataService.updateGrant(this.grantId, grantData)
      : this.grantDataService.createGrant(grantData);

    operation
      .pipe(
        catchError((error) => {
          console.error('Error saving grant:', error);
          const action = this.isEditMode ? 'updating' : 'creating';
          this.showErrorMessage(`Failed to ${action} grant. Please try again.`);
          return EMPTY;
        }),
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: (savedGrant) => {
          const action = this.isEditMode ? 'updated' : 'created';
          this.showSuccessMessage(`Grant ${action} successfully!`);

          // Navigate based on the operation
          if (this.isEditMode && this.grantId) {
            // Use the original grantId from the route, not the response
            this.router.navigate(['/grants', this.grantId]);
          } else if (this.isEditMode && savedGrant?.id) {
            // Fallback: use the response ID if available
            this.router.navigate(['/grants', savedGrant.id]);
          } else if (savedGrant?.id) {
            // For create mode, try to go to the new grant details
            this.router.navigate(['/grants', savedGrant.id]);
          } else {
            // Final fallback: go to grants list
            this.router.navigate(['/grants']);
          }
        }
      });
  }

  onCancel(): void {
    if (this.isEditMode && this.grantId) {
      // Go back to grant details
      this.router.navigate(['/grants', this.grantId]);
    } else {
      // Go back to grants list
      this.router.navigate(['/grants']);
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.grantForm.controls).forEach(key => {
      const control = this.grantForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  // Helper methods for template
  getFieldError(fieldName: string): string {
    const control = this.grantForm.get(fieldName);
    if (!control || !control.touched || !control.errors) {
      return '';
    }

    const errors = control.errors;

    if (errors['required']) {
      return `${this.getFieldDisplayName(fieldName)} is required`;
    }
    if (errors['email']) {
      return 'Please enter a valid email address';
    }
    if (errors['min']) {
      return `${this.getFieldDisplayName(fieldName)} must be at least ${errors['min'].min}`;
    }
    if (errors['max']) {
      return `${this.getFieldDisplayName(fieldName)} must not exceed ${errors['max'].max}`;
    }
    if (errors['minlength']) {
      return `${this.getFieldDisplayName(fieldName)} must be at least ${errors['minlength'].requiredLength} characters`;
    }
    if (errors['maxlength']) {
      return `${this.getFieldDisplayName(fieldName)} must not exceed ${errors['maxlength'].requiredLength} characters`;
    }

    return 'Invalid value';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      title: 'Title',
      fundingSource: 'Funding Source',
      amount: 'Amount',
      submissionDate: 'Submission Date',
      dueDate: 'Due Date',
      contactEmail: 'Contact Email',
      status: 'Status'
    };
    return displayNames[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.grantForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      panelClass: ['success-snackbar']
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}
