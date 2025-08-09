import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ErrorZoneComponent } from '../../../../shared/components/error-zone/error-zone.component';

@Component({
  selector: 'gt-grant-request',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinner,
    ErrorZoneComponent,
  ],
  templateUrl: './grant-request.component.html',
  styleUrls: ['./grant-request.component.scss']
})
export class GrantRequestComponent {
  form: FormGroup;
  isSubmitting = false;
  submitError: string | null = null;

  // Simple grant types - keeping it clean
  grantTypes = [
    { value: 'research', label: 'Research Grant' },
    { value: 'education', label: 'Education Grant' },
    { value: 'community', label: 'Community Development' },
    { value: 'technology', label: 'Technology Innovation' },
    { value: 'arts', label: 'Arts & Culture' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'environment', label: 'Environmental' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      amountRequested: [null, [Validators.required, Validators.min(100), Validators.max(1000000)]],
      justification: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]],
      grantType: [''], // optional
      submissionDate: [new Date(), Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitError = null;
    console.log('Grant Request Form Data:', this.form.value);

    this.fakeApiCall(this.form.value).then(() => {
      this.isSubmitting = false;
      this.snackBar.open('Grant request submitted successfully!', 'Close', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      this.resetForm();
    }).catch(() => {
      this.isSubmitting = false;
      this.submitError = 'Unable to submit grant request. Please try again later.';
    });
  }

  fakeApiCall(data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.3;
        console.log("isSuccess: " + isSuccess);
        isSuccess ? resolve() : reject();
      }, 2000);
    });
  }

  handleRetry() {
    this.onSubmit();
  }

  handleDismiss() {
    this.submitError = null;
  }

  getFieldError(fieldName: string): string | null {
    const control = this.form.get(fieldName);
    if (!control || (!control.touched && !control.dirty)) return null;

    if (control.hasError('required')) return 'This field is required';
    if (control.hasError('minlength')) return `Minimum ${control.getError('minlength').requiredLength} characters required`;
    if (control.hasError('maxlength')) return `Maximum ${control.getError('maxlength').requiredLength} characters allowed`;
    if (control.hasError('min')) return `Must be at least $${control.getError('min').min.toLocaleString()}`;
    if (control.hasError('max')) return `Must be less than $${control.getError('max').max.toLocaleString()}`;

    return null;
  }

  resetForm() {
    this.form.reset();
    Object.values(this.form.controls).forEach(control => {
      control.setErrors(null);
      control.markAsPristine();
      control.markAsUntouched();
    });
    this.form.patchValue({ submissionDate: new Date() });
    this.submitError = null;
  }
}
