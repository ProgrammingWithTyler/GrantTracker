import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantRequestComponent } from './grant-request.component';

describe('GrantRequestComponent', () => {
  let component: GrantRequestComponent;
  let fixture: ComponentFixture<GrantRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrantRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrantRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
