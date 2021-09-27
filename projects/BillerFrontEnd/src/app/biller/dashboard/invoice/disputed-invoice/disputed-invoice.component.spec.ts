import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisputedInvoiceComponent } from './disputed-invoice.component';

describe('DisputedInvoiceComponent', () => {
  let component: DisputedInvoiceComponent;
  let fixture: ComponentFixture<DisputedInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisputedInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisputedInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
