import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceMappingComponent } from './invoice-mapping.component';

describe('InvoiceMappingComponent', () => {
  let component: InvoiceMappingComponent;
  let fixture: ComponentFixture<InvoiceMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
