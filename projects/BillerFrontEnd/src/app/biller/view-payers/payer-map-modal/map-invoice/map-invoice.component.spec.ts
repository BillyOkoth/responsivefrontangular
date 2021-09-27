import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapInvoiceComponent } from './map-invoice.component';

describe('MapInvoiceComponent', () => {
  let component: MapInvoiceComponent;
  let fixture: ComponentFixture<MapInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
