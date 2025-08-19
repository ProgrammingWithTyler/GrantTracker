import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, delay } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Grant } from '../../../core/models/grant.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrantDataService {
  private readonly apiUrl = `${environment.apiUrl}/grants`;

  constructor(private http: HttpClient) {}

  /**
   * Get all grants from the backend API
   * Falls back to mock data if environment.mockData is true
   */
  getGrants(): Observable<Grant[]> {
    // Use mock data during development if backend isn't ready
    if (environment.production === false && !this.isBackendAvailable()) {
      console.log('Using mock data - backend not available');
      return this.getMockGrants();
    }

    return this.http.get<Grant[]>(this.apiUrl)
      .pipe(
        catchError((error) => {
          console.warn('Backend API failed, falling back to mock data:', error);
          return this.getMockGrants();
        })
      );
  }

  /**
   * Check if backend is available (simple check)
   */
  private isBackendAvailable(): boolean {
    // Use environment setting to determine if we should use real API
    return !environment.useMockData;
  }

  /**
   * Get a specific grant by ID
   */
  getGrantById(id: string): Observable<Grant> {
    // Use mock data during development if backend isn't ready
    if (environment.production === false && !this.isBackendAvailable()) {
      console.log('Using mock data for grant details - backend not available');
      return this.getMockGrantById(id);
    }

    return this.http.get<Grant>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error) => {
          console.warn('Backend API failed for grant details, falling back to mock data:', error);
          return this.getMockGrantById(id);
        })
      );
  }

  /**
   * Create a new grant
   */
  createGrant(grant: Partial<Grant>): Observable<Grant> {
    return this.http.post<Grant>(this.apiUrl, grant)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Update an existing grant
   */
  updateGrant(id: string, grant: Partial<Grant>): Observable<Grant> {
    return this.http.put<Grant>(`${this.apiUrl}/${id}`, grant)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Delete a grant
   */
  deleteGrant(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get mock data for development/testing purposes
   * Remove this method once you have a real backend
   */
  getMockGrants(): Observable<Grant[]> {
    const mockGrants: Grant[] = [
      {
        id: '1',
        title: 'STEM Education Innovation Grant',
        fundingSource: 'National Science Foundation',
        amount: 150000,
        status: 'Approved',
        submissionDate: new Date('2024-01-15'),
        dueDate: new Date('2024-12-31'),
        contactEmail: 'grants@nsf.gov',
      },
      {
        id: '2',
        title: 'Arts Integration Fellowship',
        fundingSource: 'Department of Education',
        amount: 75000,
        status: 'Pending',
        submissionDate: new Date('2024-02-01'),
        dueDate: new Date('2024-11-30'),
        contactEmail: 'arts@education.gov',
      },
      {
        id: '3',
        title: 'Technology Access Initiative',
        fundingSource: 'Gates Foundation',
        amount: 200000,
        status: 'Rejected',
        submissionDate: new Date('2023-11-10'),
        dueDate: new Date('2024-10-15'),
        contactEmail: 'tech@gates.org',
      },
      {
        id: '4',
        title: 'Teacher Professional Development',
        fundingSource: 'Carnegie Corporation',
        amount: 85000,
        status: 'Closed',
        submissionDate: new Date('2023-09-20'),
        dueDate: new Date('2024-09-20'),
        contactEmail: 'pd@carnegie.org',
      }
    ];

    // Simulate API delay
    return of(mockGrants).pipe(
      delay(1500) // 1.5 second delay to simulate network call
    );
  }

  /**
   * Get mock grant by ID for development/testing
   */
  getMockGrantById(id: string): Observable<Grant> {
    return this.getMockGrants().pipe(
      map(grants => {
        const grant = grants.find(g => g.id === id);
        if (!grant) {
          throw new Error(`Grant with ID ${id} not found`);
        }
        return grant;
      })
    );
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unexpected error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 0:
          errorMessage = 'Unable to connect to the server. Please check your internet connection.';
          break;
        case 404:
          errorMessage = 'The requested resource was not found.';
          break;
        case 500:
          errorMessage = 'Internal server error. Please try again later.';
          break;
        case 403:
          errorMessage = 'Access denied. You do not have permission to access this resource.';
          break;
        default:
          errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
      }
    }

    console.error('GrantDataService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
