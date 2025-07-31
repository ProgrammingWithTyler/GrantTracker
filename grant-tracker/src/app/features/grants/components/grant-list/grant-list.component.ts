import {Component, OnInit} from '@angular/core';
import {GrantDataService} from '../../services/grant-data.service';
import {Observable} from 'rxjs';
import {Grant} from '../../../../core/models/grant.model';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'gt-grant-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './grant-list.component.html',
  styleUrl: './grant-list.component.scss'
})
export class GrantListComponent implements OnInit {
  grants$!: Observable<Grant[]>;

  constructor(private grantDataService: GrantDataService) {}

  ngOnInit(): void {
    this.grants$ = this.grantDataService.getGrants();
  }
}
