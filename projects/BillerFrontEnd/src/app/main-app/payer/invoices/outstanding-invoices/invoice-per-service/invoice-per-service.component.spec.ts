import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePerServiceComponent } from './invoice-per-service.component';

describe('InvoicePerServiceComponent', () => {
  let component: InvoicePerServiceComponent;
  let fixture: ComponentFixture<InvoicePerServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicePerServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicePerServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
