import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedPaymentDetailsComponent } from './uploaded-payment-details.component';

describe('UploadedPaymentDetailsComponent', () => {
  let component: UploadedPaymentDetailsComponent;
  let fixture: ComponentFixture<UploadedPaymentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadedPaymentDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
