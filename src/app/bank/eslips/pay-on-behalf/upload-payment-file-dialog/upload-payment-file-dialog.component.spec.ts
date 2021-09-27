import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPaymentFileDialogComponent } from './upload-payment-file-dialog.component';

describe('UploadPaymentFileDialogComponent', () => {
  let component: UploadPaymentFileDialogComponent;
  let fixture: ComponentFixture<UploadPaymentFileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPaymentFileDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPaymentFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
