import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancePayerComponent } from './insurance-payer.component';

describe('InsurancePayerComponent', () => {
  let component: InsurancePayerComponent;
  let fixture: ComponentFixture<InsurancePayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurancePayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancePayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
