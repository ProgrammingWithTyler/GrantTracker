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
  ],
  templateUrl: './grant-request.component.html',
  styleUrls: ['./grant-request.component.scss']
})
export class GrantRequestComponent {
  form: FormGroup;
  errorMessage = '';
  isSubmitting = false;

  // Placeholder grant types (not functional yet)
  grantTypes = [
    { value: 'research', label: 'Research Grant' },
    { value: 'education', label: 'Education Grant' },
    { value: 'community', label: 'Community Development' }
  ];

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.form = this.fb.group({

      // Grant Request Details (renamed/updated fields)
      title: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      amountRequested: [null, [Validators.required, Validators.min(100), Validators.max(1000000)]],
      justification: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]],
      grantType: [''],
      submissionDate: [new Date(), Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('Grant Request Form Data:', this.form.value);

    this.isSubmitting = true;
    setTimeout(() => {
      this.isSubmitting = false;
      this.snackBar.open('Grant request submitted successfully!', 'Dismiss', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });
      this.resetForm();

      // Navigate only after showing snackbar
      // this.router.navigate(['/grants']);
    }, 2000);
  }

  resetForm() {
    this.form.reset();
    Object.values(this.form.controls).forEach(control => {
      control.setErrors(null);
      control.markAsPristine();
      control.markAsUntouched();
    });
    this.form.patchValue({ submissionDate: new Date() });
  }


}
