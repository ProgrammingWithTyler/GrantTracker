import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/auth/auth.service';

@Component({
  standalone: true,
  selector: 'gt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class LoginComponent {
  form: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const credentials = this.form.value;

    this.authService.login(credentials).subscribe({
      next: (token) => {
        // Store token handled by AuthService or here, then navigate
        this.router.navigate(['/grants']); // or your dashboard route
      },
      error: (err) => {
        // Show some UI feedback about the error
        this.errorMessage = 'Invalid email or password. Please try again.';
      }
    });
  }
}
