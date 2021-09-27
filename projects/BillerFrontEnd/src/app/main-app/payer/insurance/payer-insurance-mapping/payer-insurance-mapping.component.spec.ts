import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayerInsuranceMappingComponent } from './payer-insurance-mapping.component';

describe('PayerInsuranceMappingComponent', () => {
  let component: PayerInsuranceMappingComponent;
  let fixture: ComponentFixture<PayerInsuranceMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayerInsuranceMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayerInsuranceMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
