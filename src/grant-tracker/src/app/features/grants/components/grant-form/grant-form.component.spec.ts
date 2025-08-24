import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantFormComponent } from './grant-form.component';

describe('GrantFormComponent', () => {
  let component: GrantFormComponent;
  let fixture: ComponentFixture<GrantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrantFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
