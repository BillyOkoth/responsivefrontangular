import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidChargeComponent } from './paid-charge.component';

describe('PaidChargeComponent', () => {
  let component: PaidChargeComponent;
  let fixture: ComponentFixture<PaidChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
