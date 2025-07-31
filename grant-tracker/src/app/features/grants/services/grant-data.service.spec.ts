import { TestBed } from '@angular/core/testing';

import { GrantDataService } from './grant-data.service';

describe('GrantDataService', () => {
  let service: GrantDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrantDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
