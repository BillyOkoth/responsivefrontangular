import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceMapListComponent } from './invoice-map-list.component';

describe('InvoiceMapListComponent', () => {
  let component: InvoiceMapListComponent;
  let fixture: ComponentFixture<InvoiceMapListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceMapListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceMapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
