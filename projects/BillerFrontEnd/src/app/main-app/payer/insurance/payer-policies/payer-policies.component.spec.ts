import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayerPoliciesComponent } from './payer-policies.component';

describe('PayerPoliciesComponent', () => {
  let component: PayerPoliciesComponent;
  let fixture: ComponentFixture<PayerPoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayerPoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayerPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
