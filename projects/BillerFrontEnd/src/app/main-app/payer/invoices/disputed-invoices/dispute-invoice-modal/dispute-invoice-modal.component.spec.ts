import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisputeInvoiceModalComponent } from './dispute-invoice-modal.component';

describe('DisputeInvoiceModalComponent', () => {
  let component: DisputeInvoiceModalComponent;
  let fixture: ComponentFixture<DisputeInvoiceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisputeInvoiceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisputeInvoiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
