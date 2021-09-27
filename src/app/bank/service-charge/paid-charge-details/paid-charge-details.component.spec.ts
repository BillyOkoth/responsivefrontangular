import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidChargeDetailsComponent } from './paid-charge-details.component';

describe('PaidChargeDetailsComponent', () => {
  let component: PaidChargeDetailsComponent;
  let fixture: ComponentFixture<PaidChargeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidChargeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidChargeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
