import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancePayerMapComponent } from './insurance-payer-map.component';

describe('InsurancePayerMapComponent', () => {
  let component: InsurancePayerMapComponent;
  let fixture: ComponentFixture<InsurancePayerMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurancePayerMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancePayerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
