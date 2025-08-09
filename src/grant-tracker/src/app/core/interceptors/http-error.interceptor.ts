import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Customize messages based on status
        let userMessage = 'An unexpected error occurred.';
        if (!navigator.onLine) {
          userMessage = 'No Internet Connection. Please check your network.';
        } else if (error.status === 0) {
          userMessage = 'Cannot reach server. Try again later.';
        } else if (error.status >= 500) {
          userMessage = 'Server error. Please try again later.';
        } else if (error.status === 401) {
          userMessage = 'Unauthorized. Please log in again.';
          // Optionally, redirect to login here
        } else if (error.status === 403) {
          userMessage = 'You do not have permission to perform this action.';
        } else if (error.status === 404) {
          userMessage = 'Requested resource not found.';
        } else if (error.error && error.error.message) {
          // Sometimes backend sends a custom message
          userMessage = error.error.message;
        }

        this.errorService.showError(userMessage);

        // Optional: log error for diagnostics here

        return throwError(() => error); // Pass error downstream if needed
      })
    );
  }
}
