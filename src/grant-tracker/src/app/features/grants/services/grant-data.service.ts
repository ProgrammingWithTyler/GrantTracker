import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import {Grant} from '../../../core/models/grant.model';

@Injectable({
  providedIn: 'root'
})
export class GrantDataService {

  private mockGrants: Grant[] = [
    {
      id: '1',
      title: 'STEM Education Initiative',
      fundingSource: 'Department of Education',
      amount: 250000,
      status: 'Approved',
      submissionDate: new Date('2024-01-15'),
      dueDate: new Date('2024-12-31'),
      contactEmail: 'stem@school.edu'
    },
    {
      id: '2',
      title: 'Special Education Technology Grant',
      fundingSource: 'State Education Fund',
      amount: 75000,
      status: 'Pending',
      submissionDate: new Date('2024-02-20'),
      dueDate: new Date('2024-06-30'),
      contactEmail: 'speced@school.edu'
    },
    {
      id: '3',
      title: 'Rural School Connectivity',
      fundingSource: 'Federal Communications Commission',
      amount: 180000,
      status: 'Rejected',
      submissionDate: new Date('2024-01-10'),
      dueDate: new Date('2024-05-15'),
      contactEmail: 'tech@ruralschool.edu'
    },
    {
      id: '4',
      title: 'Teacher Professional Development',
      fundingSource: 'Gates Foundation',
      amount: 95000,
      status: 'Approved',
      submissionDate: new Date('2024-03-01'),
      dueDate: new Date('2024-08-31'),
      contactEmail: 'pd@school.edu'
    },
    {
      id: '5',
      title: 'Early Childhood Learning Initiative',
      fundingSource: 'Department of Health and Human Services',
      amount: 320000,
      status: 'Pending',
      submissionDate: new Date('2024-02-28'),
      dueDate: new Date('2024-11-30'),
      contactEmail: 'earlylearn@school.edu'
    }
  ];

  getGrants(): Observable<Grant[]> {
    // Simulate API call delay
    return of(this.mockGrants).pipe(delay(300));
  }

  getGrantById(id: string): Observable<Grant | undefined> {
    const grant = this.mockGrants.find(g => g.id === id);
    return of(grant).pipe(delay(200));
  }
}
