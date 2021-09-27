import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingPoliciesComponent } from './outstanding-policies.component';

describe('OutstandingPoliciesComponent', () => {
  let component: OutstandingPoliciesComponent;
  let fixture: ComponentFixture<OutstandingPoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutstandingPoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
