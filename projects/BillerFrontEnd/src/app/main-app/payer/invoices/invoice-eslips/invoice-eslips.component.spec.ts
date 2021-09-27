import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceEslipsComponent } from './invoice-eslips.component';

describe('InvoiceEslipsComponent', () => {
  let component: InvoiceEslipsComponent;
  let fixture: ComponentFixture<InvoiceEslipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceEslipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceEslipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
