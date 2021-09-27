import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceMapComponent } from './invoice-map.component';

describe('InvoiceMapComponent', () => {
  let component: InvoiceMapComponent;
  let fixture: ComponentFixture<InvoiceMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
