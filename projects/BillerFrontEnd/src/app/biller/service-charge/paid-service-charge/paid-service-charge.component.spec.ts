import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidServiceChargeComponent } from './paid-service-charge.component';

describe('PaidServiceChargeComponent', () => {
  let component: PaidServiceChargeComponent;
  let fixture: ComponentFixture<PaidServiceChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidServiceChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidServiceChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
