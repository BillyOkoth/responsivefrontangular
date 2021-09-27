import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInvoiceComponent } from './test-invoice.component';

describe('TestInvoiceComponent', () => {
  let component: TestInvoiceComponent;
  let fixture: ComponentFixture<TestInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
