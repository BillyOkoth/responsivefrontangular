import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceAccountsComponent } from './invoice-accounts.component';

describe('InvoiceAccountsComponent', () => {
  let component: InvoiceAccountsComponent;
  let fixture: ComponentFixture<InvoiceAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
