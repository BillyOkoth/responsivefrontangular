import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedInvoiceDetailsComponent } from './uploaded-invoice-details.component';

describe('UploadedInvoiceDetailsComponent', () => {
  let component: UploadedInvoiceDetailsComponent;
  let fixture: ComponentFixture<UploadedInvoiceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadedInvoiceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedInvoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
