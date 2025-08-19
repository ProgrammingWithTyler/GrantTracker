import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantDetailComponent } from './grant-details.component';

describe('GrantDetailComponent', () => {
  let component: GrantDetailComponent;
  let fixture: ComponentFixture<GrantDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrantDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
