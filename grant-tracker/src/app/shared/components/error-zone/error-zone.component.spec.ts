import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorZoneComponent } from './error-zone.component';

describe('ErrorZoneComponent', () => {
  let component: ErrorZoneComponent;
  let fixture: ComponentFixture<ErrorZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorZoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
