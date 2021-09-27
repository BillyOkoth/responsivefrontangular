import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPayerInsuranceUploadComponent } from './confirm-payer-insurance-upload.component';

describe('ConfirmPayerInsuranceUploadComponent', () => {
  let component: ConfirmPayerInsuranceUploadComponent;
  let fixture: ComponentFixture<ConfirmPayerInsuranceUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmPayerInsuranceUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPayerInsuranceUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
