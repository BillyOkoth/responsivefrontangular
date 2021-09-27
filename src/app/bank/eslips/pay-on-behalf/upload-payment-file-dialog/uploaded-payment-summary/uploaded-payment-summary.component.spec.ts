import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedPaymentSummaryComponent } from './uploaded-payment-summary.component';

describe('UploadedPaymentSummaryComponent', () => {
  let component: UploadedPaymentSummaryComponent;
  let fixture: ComponentFixture<UploadedPaymentSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadedPaymentSummaryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedPaymentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
