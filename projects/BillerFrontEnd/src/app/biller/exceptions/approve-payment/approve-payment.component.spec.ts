import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePaymentComponent } from './approve-payment.component';

describe('ApprovePaymentComponent', () => {
  let component: ApprovePaymentComponent;
  let fixture: ComponentFixture<ApprovePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
