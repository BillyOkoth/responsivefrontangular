import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeInvoiceComponent } from './customize-invoice.component';

describe('CustomizeInvoiceComponent', () => {
  let component: CustomizeInvoiceComponent;
  let fixture: ComponentFixture<CustomizeInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizeInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizeInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
