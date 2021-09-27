import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmInvoiceEslipComponent } from './confirm-invoice-eslip.component';

describe('ConfirmInvoiceEslipComponent', () => {
  let component: ConfirmInvoiceEslipComponent;
  let fixture: ComponentFixture<ConfirmInvoiceEslipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmInvoiceEslipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmInvoiceEslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
