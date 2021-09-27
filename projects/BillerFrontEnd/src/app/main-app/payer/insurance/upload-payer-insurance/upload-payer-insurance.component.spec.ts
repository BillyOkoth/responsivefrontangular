import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPayerInsuranceComponent } from './upload-payer-insurance.component';

describe('UploadPayerInsuranceComponent', () => {
  let component: UploadPayerInsuranceComponent;
  let fixture: ComponentFixture<UploadPayerInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPayerInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPayerInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
