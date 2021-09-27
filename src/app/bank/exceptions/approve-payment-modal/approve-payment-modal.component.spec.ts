import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePaymentModalComponent } from './approve-payment-modal.component';

describe('ApprovePaymentModalComponent', () => {
  let component: ApprovePaymentModalComponent;
  let fixture: ComponentFixture<ApprovePaymentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovePaymentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovePaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
