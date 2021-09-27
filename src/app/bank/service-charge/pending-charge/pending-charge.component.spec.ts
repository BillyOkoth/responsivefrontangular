import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingChargeComponent } from './pending-charge.component';

describe('PendingChargeComponent', () => {
  let component: PendingChargeComponent;
  let fixture: ComponentFixture<PendingChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
