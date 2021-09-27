import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidInvoiceComponent } from './paid-invoice.component';

describe('PaidInvoiceComponent', () => {
  let component: PaidInvoiceComponent;
  let fixture: ComponentFixture<PaidInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
